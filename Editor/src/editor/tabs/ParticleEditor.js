class ParticleEditor {
	constructor(particleEmitter) {
		var self = this

		this.id = "Particle Editor " + ParticleEditor.id
		this.tab = EditorUI.tabs_widget.addTab(this.id, {selected: true, closable: true, onclose: () => {
			self.graph.stop()
			clearInterval(self.interval)

			ParticleEditor.id--
			self.updateParticle()

			self.particle = null
			self.particle_runtime = null
			EditorUI.selectPreviousTab()
		}, callback: () => {
			if (self.preview !== undefined) {
				Mouse.canvas = self.preview
			}

			// This is useful when handling different types of editors and one single Graph library <3
			unregisterNodes()
			registerBaseNodes()
			registerParticleNodes()

			Editor.setState(Editor.STATE_IDLE)
			Editor.resetEditingFlags()
		}})

		this.parent = EditorUI.tabs_widget.getTabContent(this.id)
		Editor.setState(Editor.STATE_IDLE)

		// Particle Preview
		this.preview = document.createElement("canvas")
		this.preview.id = "ParticlePreview" + ParticleEditor.id
		this.parent.appendChild(this.preview)

		// Particle Editor
		this.canvas = document.createElement("canvas")
		this.canvas.id = "ParticleEditor" + ParticleEditor.id
		this.parent.appendChild(this.canvas)
		
		// Particle Preview Camera
		this.camera = new PerspectiveCamera(90, this.preview.width/this.preview.height, 0.1, 1000000)
		this.camera_rotation = new THREE.Vector2(0, 0.5)
		this.camera_distance = 5
		this.updateCamera()

		// Particle Preview Scene
		this.scene = new Scene()
		this.container = new Empty()
		this.scene.add(this.container)

		// Particle Preview Lights and Helpers
		this.scene.add(new PointLight(0x666666))
		this.scene.add(new AmbientLight(0x444444))
		this.scene.add(new THREE.GridHelper(50, 1))
		this.scene.add(new THREE.AxisHelper(50))

		// Particle
		this.particle = particleEmitter
		this.particle_runtime = new ObjectLoader().parse(this.particle.toJSON())
		this.particle_runtime.initialize()
		this.container.add(this.particle_runtime)

		if(this.particle.nodes === {}) {
			// When an editor is opened, the particle.nodes is overwritten by this one
			this.nodes = {
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
						order: 0,
						outputs: [
							{
								links: null,
								name: "Particles",
								type: "Particles"
							}
						],
						pos: [130, 130],
						properties: {
							uuid: this.particle.uuid
						},
						size: [140, 26],
						type: "Particles/Particles"
					}
				],
				version: 0.4
			}
		} else {
			this.nodes = this.particle.nodes
		}

		// Particle Preview renderer
		this.renderer = new THREE.WebGLRenderer({canvas: this.preview, alpha: false, antialias: true})
		this.renderer.setSize((EditorUI.mainarea.getSection(0).getWidth()/2)-5, EditorUI.mainarea.getSection(0).getHeight() - EditorUI.assetEx_height)
		this.renderer.shadowMap.enabled = false

		// Initialize LiteGraph
		this.graph = new LGraph(this.nodes)
		this.graphcanvas = new LGraphCanvas("#ParticleEditor"+ParticleEditor.id, this.graph)

		EditorUI.mainarea.onresize = function(e) {
			self.updateInterface()
		}

		this.graph.start(1000/60)

		this.interval = setInterval(() => {
			self.updateParticle()
			self.update()
		}, 1000/60)

		Mouse.canvas = this.preview

		ParticleEditor.id++
	}

	updateParticle() {
		if (this.particle.nodes !== undefined) {
			this.particle.updateNodes(this.graph.serialize())
		}
	}

	updateInterface() {
		this.graphcanvas.resize(EditorUI.mainarea.getSection(0).getWidth()/2, EditorUI.mainarea.getSection(0).getHeight() - EditorUI.assetEx_height)
		this.renderer.setSize((EditorUI.mainarea.getSection(0).getWidth()/2)-5, EditorUI.mainarea.getSection(0).getHeight() - EditorUI.assetEx_height)
		this.camera.aspect = this.preview.width / (this.preview.height/2)
	}

	// Update camera position and rotation
	updateCamera() {
		// Calculate direction vector
		var cos_angle_y = Math.cos(this.camera_rotation.y)
		var position = new THREE.Vector3(this.camera_distance * Math.cos(this.camera_rotation.x)*cos_angle_y, this.camera_distance * Math.sin(this.camera_rotation.y), this.camera_distance * Math.sin(this.camera_rotation.x)*cos_angle_y)
		this.camera.position.copy(position)
		this.camera.lookAt(new THREE.Vector3(0, 0, 0))
	}

	update() {

		// Get mouse input
		if (Mouse.insideCanvas()) {
			// Move camera
			if (Mouse.buttonPressed(Mouse.LEFT)) {
				this.camera_rotation.x -= 0.003 * Mouse.delta.x
				this.camera_rotation.y -= 0.003 * Mouse.delta.y

				// Limit Vertical Rotation to 90 degrees
				var pid2 = 1.57
				if (this.camera_rotation.y < -pid2) {
					this.camera_rotation.y = -pid2
				} else if (this.camera_rotation.y > pid2) {
					this.camera_rotation.y = pid2
				}
			}

			// Camera zoom
			this.camera_distance += Mouse.wheel * 0.005
			if (this.camera_distance > 20) {
				this.camera_distance = 20
			} else if (this.camera_distance < 0.1) {
				this.camera_distance = 0.1
			}

			this.updateCamera()
		}

		// Update particle
		this.particle_runtime.update()

		// Render editor scene
		this.renderer.render(this.scene, this.camera)
	}
}

ParticleEditor.id = 0