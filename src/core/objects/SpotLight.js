class SpotLight extends THREE.SpotLight {
	constructor(hex, intensity, distance, angle, exponent, decay) {
		super(hex, intensity, distance, angle, exponent, decay)
		this.updateable = true
		this.name = "spot_light"
	}

	update() {
		for(var i = 0; i < this.children.length; i++) {
			if (this.children[i].updateable) {
				this.children[i].update()
			}
		}
	}
}