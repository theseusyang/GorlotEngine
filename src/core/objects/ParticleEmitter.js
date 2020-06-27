class ParticleEmitter extends THREE.Object3D {
	constructor() {
		super()

		this.type = "ParticleEmitter"
		this.name = "particle"

		this.clock = new THREE.Clock()

		this.group = new SPE.Group({
			texture: {
				value: THREE.ImageUtils.loadTexture("./data/particle.png")
			}
		})

		this.emitter = new SPE.Emitter({
			maxAge: {
				value: 2
			},
			position: {
				value: new THREE.Vector3(0, 0, 0),
				spread: new THREE.Vector3(0, 0, 0)
			},
			acceleration: {
				value: new THREE.Vector3(0, -10, 0),
				spread: new THREE.Vector3(10, 0, 10)
			},
			velocity: {
				value: new THREE.Vector3(0, 25, 0),
				spread: new THREE.Vector3(10, 7.5, 10)
			},
			color: {
				value: [new THREE.Color('white'), new THREE.Color('red')]
			},
			size: {
				value: 1
			},
			particleCount: 2000
		})

		this.group.addEmitter(this.emitter)
	}

	initialize() {
		// Initialize
		this.add(this.group.mesh)

		// Initialize children
		for(var i = 0; i < this.children.length; i++) {
			this.children[i].initialize()
		}
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