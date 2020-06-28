class MaterialEditor {
	constructor(parent, material) {

		// TODO: Create an area with an horizontal split, in the left will be an sphere with the editing material, and in the left, the material node editor

		var self = this
		this.id = "Material Editor " + MaterialEditor.id
		this.tab = EditorUI.tabs_widget.addTab(this.id, {selected: true, closable: true, onclose: () => {
			this.graph.stop()
			clearInterval(self.interval)
			MaterialEditor.id--
			
			self.updateMaterial()
			EditorUI.selectPreviousTab()
		}, callback: () => {
			// This is useful when handling different types of editors and one single Graph library <3
			unregisterNodes()
			registerMaterialNodes()

			Editor.setState(Editor.STATE_IDLE)
			Editor.resetEditingFlags()
		}})

		if (parent !== undefined) {
			this.parent = parent
		} else {
			this.parent = EditorUI.tabs_widget.getTabContent(this.id)
		}

		Editor.setState(Editor.STATE_IDLE)

		this.canvas = document.createElement("canvas")
		this.canvas.id = "MaterialEditor"+MaterialEditor.id
		this.canvas.style.position = "absolute"

		this.parent.appendChild(this.canvas)

		// Material preview canvas
		this.preview = document.createElement("canvas")
		this.preview.id = "MaterialPreview"+MaterialEditor.id
		this.preview.width = this.canvas.width
		this.preview.height = this.canvas.height
		this.preview.style.position = "relative"
		this.parent.appendChild(this.preview)

		// Material preview renderer
		this.renderer = new THREE.WebGLRenderer({canvas: this.preview, alpha: true})
		this.renderer.setSize(200, 200)
		this.renderer.shadowMap.ebaled = true
		this.renderer.shadowMap.type = THREE.PCFShadowMap

		// Material preview camera
		this.camera = new PerspectiveCamera(60, 200/200, 0.1, 1000000)

		// Material Preview Scene
		this.scene = new Scene()

		// Light
		this.scene.add(new PointLight(0x555555))

		// Material attached to the editor
		this.material = material
		
		// Sphere
		var sphere = new Model3D(new THREE.SphereBufferGeometry(1, 32, 32), this.material)
		sphere.position.set(0, 0, -2.5)
		this.scene.add(sphere)

		var defaultNodes = {
			config: {},
			groups: [],
			last_link_id: 0,
			last_node_id: 1,
			links: [],
			nodes: [
				{
					flags: {},
					id: 1,
					mode: 0,
					outputs: [{

					}],
					pos: [184, 189],
					properties: {
						mat: this.material
					},
					size: [140, 26],
					type: "Material/Material"
				}
			],
			version: 0.4
		}

		this.nodes = this.material.nodes
		console.log(this.nodes)

		if (JSON.stringify(this.nodes) === '{}') {
			this.graph = new LGraph(defaultNodes)
		} else {
			this.graph = new LGraph(this.nodes)
		}

		this.graphcanvas = new LGraphCanvas("#MaterialEditor"+MaterialEditor.id, this.graph)

		if (parent === undefined) {
			EditorUI.mainarea.onresize = function(e) {
				self.updateInterface()
			}
		}

		this.graph.start(1000/60)

		this.interval = setInterval(() => {
			// Every second, the material is saved
			self.updateMaterial()
			self.update()
		}, 1000/120)

		MaterialEditor.id++
	
	}

	updateMaterial() {
		if (this.material.updateNodes !== undefined) {
			this.material.updateNodes(this.graph.serialize())
		}
	}

	updateInterface(canvas) {
		this.graphcanvas.resize(EditorUI.mainarea.getSection(0).getWidth(), EditorUI.mainarea.getSection(0).getHeight(0) - EditorUI.assetEx_height)
	}

	update() {
		this.renderer.render(this.scene, this.camera)
	}
}

MaterialEditor.id = 0