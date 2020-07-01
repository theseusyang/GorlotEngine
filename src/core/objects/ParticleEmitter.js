class ParticleEmitter extends THREE.Object3D {
	constructor() {
		super()

		this.type = "ParticleEmitter"
		this.name = "particle"

		this.clock = new THREE.Clock()

		this.group = new SPE.Group({
			texture: {
				value: new Texture("data/particle.png")
			},
			blending: THREE.AdditiveBlending
		})

		// Disable frustum culling
		this.group.mesh.frustumCulled = false

		this.emitter = new SPE.Emitter({
			
			particleCount: 2000,
			direction: 1,
			duration: null,

			maxAge: {
				value: 2,
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

		this.group.addEmitter(this.emitter)
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
}