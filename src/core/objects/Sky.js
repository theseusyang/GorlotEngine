class Sky extends THREE.DirectionalLight {
	constructor() {
		super(0xffffaa, 0.3)

		this.name = "sky"

		this.castShadow = true

		// Sun
		this.distance = 200
		this.day_time = 10

		// Runtime stuff 
		this.time = 0

	}

	initialize() {
		for(var i = 0; i < this.children.length; i++) {
			if (this.children[i].initialize != undefined) {
				this.children[i].initialize()
			}
		}
	}

	update() {
		this.time += App.delta_time / 1000

		// Update position
		this.position.x = this.distance * Math.cos(this.time)
		this.position.y = this.distance * Math.sin(this.time)

		// Update children
		for(var i = 0; i < this.children.length; i++) {
			if (this.children[i].update) {
				this.children[i].update
			}
		}
	}
}