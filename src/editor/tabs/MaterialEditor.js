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
		this.nodes = this.material.nodes
		var mat = this.material
		mat.nodes = {}

		this.graph = new LGraph(this.nodes)

		// Material preview object
		this.obj = new Model3D(new THREE.SphereBufferGeometry(1, 64, 64), this.material)
		this.obj.position.set(0, 0, -2.5)
		this.scene.add(this.obj)
		this.prevIn = 0 // Preview Index
		
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
					var genesis = this.nodes.nodes[i]
					delete genesis.properties.mat.metadata
					this.material.setValues(genesis.properties.mat)
				}
			}
		}

		if (this.material.nodes !== undefined) {
			this.material.updateNodes(this.graph.serialize())
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
				this.obj.quaternion.multiplyQuaternions(delta, this.obj.quaternion)
			}
			if (Mouse.buttonPressed(Mouse.RIGHT)) {

				if (this.prevIn < 3) {
					this.prevIn++
				} else {
					this.prevIn = 0
				}

				if (this.prevIn === 0) {
					// Sphere
					this.obj.geometry = new THREE.SphereBufferGeometry(1, 64, 64)
				} else if (this.prevIn === 1) {
					// Torus
					this.obj.geometry = new THREE.TorusBufferGeometry(0.8, 0.4, 64, 128)
				} else if (this.prevIn === 2) {
					// Cube
					this.obj.geometry = new THREE.BoxBufferGeometry(1, 1, 1, 32, 32, 32)
				} else if (this.prevIn === 3) {
					// Torus Knot
					this.obj.geometry = new THREE.TorusKnotBufferGeometry(0.7, 0.3, 128, 32)
				}

			}
		}
	}
}

MaterialEditor.id = 0