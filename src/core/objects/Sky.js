class Sky extends THREE.DirectionalLight {
	constructor() {
		super(0xffffaa, 0.3)

		this.name = "sky"

		this.castShadow = true

		this.angle = 0
		this.distance = 0
		this.day_time = 0

		this.updateable = true
	}

	update() {
		for(var i = 0; i < this.children.length; i++) {
			if (this.children[i].updateable) {
				this.children[i].update
			}
		}
	}
}