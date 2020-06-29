class MaterialEditor {
	constructor(parent, material) {

		var self = this
		this.id = "Material Editor " + MaterialEditor.id
		this.tab = EditorUI.tabs_widget.addTab(this.id, {selected: true, closable: true, onclose: () => {
			self.graph.stop()
			clearInterval(self.interval)

			MaterialEditor.id--
			self.updateMaterial()
			self.material = null
			EditorUI.selectPreviousTab()
		}, callback: () => {
			if(self.preview !== undefined) {
				Mouse.canvas = self.preview
			}

			// This is useful when handling different types of editors and one single Graph library <3
			unregisterNodes()
			registerBaseNodes()
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

		Mouse.canvas = this.preview

		// Material preview renderer
		this.renderer = new THREE.WebGLRenderer({canvas: this.preview, alpha: true})
		this.renderer.setSize(200, 200)
		this.renderer.shadowMap.ebaled = true
		this.renderer.shadowMap.type = THREE.PCFShadowMap

		// Material preview camera
		this.camera = new PerspectiveCamera(50, 200/200, 0.1, 1000000)

		// Material Preview Scene
		this.scene = new Scene()

		// Light
		this.scene.add(new PointLight(0x444444))
		this.scene.add(new AmbientLight(0x333333))

		// Material attached to the editor
		this.material = material
		EditorUI.editingMaterial = this.material

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
					inputs: [
						{
							name: "Colour",
							type: "Color",
							link: null
						},
						{
							name: "Emissive",
							type: "number",
							link: null
						},
						{
							name: "Reflectivity",
							type: "number",
							link: null
						},
						{
							name: "Shininess",
							type: "number",
							link: null
						},
						{
							name: "Specular",
							type: "Color",
							link: null
						},
						{
							name: "Wireframe",
							type: "Boolean",
							link: null
						}
					],
					outputs: [{
						name: "Material",
						type: "Material",
						links: null
					}],
					pos: [208, 140],
					properties: {
						//mat: this.material
					},
					size: [178, 126],
					type: "Material/MeshPhongMaterial"
				}
			],
			version: 0.4
		}

		this.nodes = this.material.nodes

		if (JSON.stringify(this.nodes) === '{}') {
			this.graph = new LGraph(defaultNodes)
		} else {
			this.graph = new LGraph(this.nodes)
		}

		this.genesisNode = undefined

		// Sphere
		this.sphere = new Model3D(new THREE.SphereBufferGeometry(1, 32, 32), this.material)
		this.sphere.position.set(0, 0, -2.5)
		this.scene.add(this.sphere)
		
		this.graphcanvas = new LGraphCanvas("#MaterialEditor"+MaterialEditor.id, this.graph)

		if (parent === undefined) {
			EditorUI.mainarea.onresize = function(e) {
				self.updateInterface()
			}
		}

		this.graph.start(1000/60)

		this.interval = setInterval(() => {
			self.updateMaterial()
			self.update()
		}, 1000/60)

		MaterialEditor.id++
	
	}

	updateMaterial() {

		var genesis = null

		if(this.nodes.nodes !== undefined) {
			for(var i = 0; i < this.nodes.nodes.length; i++) {
				if (this.nodes.nodes[i].type === "Material/MeshPhongMaterial") {
					this.genesis = this.nodes.nodes[i]
					
					delete this.nodes.nodes[i].properties.mat.metadata
					
					this.material.setValues(this.nodes.nodes[i].properties.mat)
				}
			}
		}

		if (this.material.nodes !== undefined) {
			this.material.updateNodes(this.graph.serialize(), null)
		}
	}

	updateInterface(canvas) {
		this.graphcanvas.resize(EditorUI.mainarea.getSection(0).getWidth(), EditorUI.mainarea.getSection(0).getHeight(0) - EditorUI.assetEx_height)
	}

	update() {
		this.renderer.render(this.scene, this.camera)
	
		if (Mouse.insideCanvas()) {
			if (Mouse.buttonPressed(Mouse.LEFT)) {
				var delta = new THREE.Quaternion()
				delta.setFromEuler(new THREE.Euler(Mouse.pos_diff.y * 0.005, Mouse.pos_diff.x * 0.005, 0, 'XYZ'))
				this.sphere.quaternion.multiplyQuaternions(delta, this.sphere.quaternion)
			}
		}
	}
}

MaterialEditor.id = 0