"use strict"

// Particle Emitter class
class ParticleEmitter extends THREE.Object3D {
	constructor(texture, group, emitter) {
		super()

		this.type = "ParticleEmitter"
		this.name = "particle"

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
						uuid: this.uuid,
						uuid_runtime: ""
					},
					size: [140, 26],
					type: "Particles/Particles"
				}
			],
			version: 0.4
		}

		this.clock = new THREE.Clock()

		// Create group
		if (group !== undefined) {
			// TODO: This
		} else {
			this.group = new SPE.Group({
				texture: {
					value: (texture !== undefined) ? texture : new Texture("data/particle.png")
				},
				blending: THREE.AdditiveBlending,
				maxParticleCount: 10000
			})
		}


		// Disable frustum culling
		this.group.mesh.frustumCulled = false

		if(emitter !== undefined) {
			// TODO: This
		} else {
			this.emitter = new SPE.Emitter({
				
				particleCount: 2000,
				direction: 1,
				duration: null,
	            type: SPE.distributions.BOX,
	
				maxAge: {
					value: 2,
					spread: 0
				},
	
	            drag: {
	                value: 0,
	                spread: 0
	            },
	
				position: {
					value: new THREE.Vector3(0, 0, 0),
					spread: new THREE.Vector3(0, 0, 0)
				},
	
				velocity: {
					value: new THREE.Vector3(0, 25, 0),
					spread: new THREE.Vector3(10, 7.5, 10)
				},
	
				acceleration: {
					value: new THREE.Vector3(0, -10, 0),
					spread: new THREE.Vector3(10, 0, 10)
				},
	
				wiggle: {
					value: 0,
					spread: 0
				},
	
				color: {
					value: [new THREE.Color(1, 1, 1), new THREE.Color(1, 0, 0)],
					spread: [new THREE.Color(0, 0, 0), new THREE.Color(0.1, 0.1, 0.1)]
				},
	
				opacity: {
					value: 1,
					spread: 0
				},
	
				size: {
					value: 1,
					spread: 0
				},
	
				angle: {
					value: 0,
					spread: 0
				}
			})
		}

		// Add emitter to group
		this.group.addEmitter(this.emitter)

		this.components = []

		this.defaultComponents = []
		this.defaultComponents.push(new ElementComponent())
		this.defaultComponents.push(new Object3DComponent())
	}

	updateValues() {
		// Update particle group and emitter runtime values
		this.group.material.uniforms.texture.value = this.group.texture
		this.group.material.blending = this.group.blending
		this.group.material.needsUpdate = true
	}

	updateNodes(nodes) {
		this.nodes = nodes
	}

	initialize() {
		// Initialize children
		for(var i = 0; i < this.children.length; i++) {
			this.children[i].initialize()
		}
		
		// Add particle group to self
		this.add(this.group.mesh)
	}

	update() {
		// Update state
		this.group.tick(this.clock.getDelta())

		// Update children
		for(var i = 0; i < this.children.length; i++) {
			this.children[i].update()
		}
	}

	stop() {
		for(var i = 0; i < this.children.length; i++) {
			this.children[i].stop()
		}
	}

	addComponent(compo) {
		if (compo instanceof Component) {
			this.components.push(compo)
		}
	}

	// Dispose particle emitter
	dispose() {
		// Dispose particle group
		this.group.dispose()

		// Dispose children
		for(var i = 0; i < this.children.length; i++) {
			this.children[i].dispose()
		}
	}

	toJSON(meta) {
		var self = this

		var data = THREE.Object3D.prototype.toJSON.call(this, meta, (meta, object) => {
			self.group.texture.toJSON(meta)
		})
	
		data.object.components = this.components
		data.object.nodes = this.nodes

		//Group attributes
		data.object.group = {}
		data.object.group.texture = this.group.texture.uuid
		data.object.group.textureFrames = this.group.textureFrames
		data.object.group.textureFrameCount = this.group.textureFrameCoun
		data.object.group.textureLoop = this.group.textureLoop
		data.object.group.hasPerspective = this.group.hasPerspective
		data.object.group.colorize = this.group.colorize
		data.object.group.maxParticleCount = this.group.maxParticleCount
		data.object.group.blending = this.group.blending
	
		//Emitter attributes
		data.object.emitter = {}
		data.object.emitter.uuid = this.emitter.uuid
		data.object.emitter.direction = this.emitter.direction
		data.object.emitter.particleCount = this.emitter.particleCount
		data.object.emitter.duration = this.emitter.duration
		data.object.emitter.type = this.emitter.type
	
		//Max age
		data.object.emitter.maxAge = {}
		data.object.emitter.maxAge.value = this.emitter.maxAge.value
		data.object.emitter.maxAge.spread = this.emitter.maxAge.spread
	
		//Position
		data.object.emitter.position = {}
		data.object.emitter.position.value = this.emitter.position.value
		data.object.emitter.position.spread = this.emitter.position.spread
	
		//Velocity
		data.object.emitter.velocity = {}
		data.object.emitter.velocity.value = this.emitter.velocity.value
		data.object.emitter.velocity.spread = this.emitter.velocity.spread
	
		//Acceleration
		data.object.emitter.acceleration = {}
		data.object.emitter.acceleration.value = this.emitter.acceleration.value
		data.object.emitter.acceleration.spread = this.emitter.acceleration.spread
	
		//Wiggle
		data.object.emitter.wiggle = {}
		data.object.emitter.wiggle.value = this.emitter.wiggle.value
		data.object.emitter.wiggle.spread = this.emitter.wiggle.spread
	
		//Opacity
		data.object.emitter.opacity = {}
		data.object.emitter.opacity.value = this.emitter.opacity.value
		data.object.emitter.opacity.spread = this.emitter.opacity.spread

		//Size
		data.object.emitter.size = {}
		data.object.emitter.size.value = this.emitter.size.value
		data.object.emitter.size.spread = this.emitter.size.spread
	
		//Angle
		data.object.emitter.angle = {}
		data.object.emitter.angle.value = this.emitter.angle.value
		data.object.emitter.angle.spread = this.emitter.angle.spread
	
		//Color
		data.object.emitter.color = {}
		data.object.emitter.color.value = this.emitter.color.value
		data.object.emitter.color.spread = this.emitter.color.spread

		return data
	}
}
