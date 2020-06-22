class PointLight extends THREE.PointLight {
	constructor(hex, intensity, distance, decay) {
		super(hex, intensity, distance, decay)
		this.updateable = true
		this.name = "point_light"
	}

	update() {
		for(var i = 0; i < this.children.length; i++) {
			if (this.children[i].updateable) {
				this.children[i].update()
			}
		}
	}
}