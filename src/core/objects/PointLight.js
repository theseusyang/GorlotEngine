class PointLight extends THREE.PointLight {
	constructor(hex, intensity, distance, decay) {
		super(hex, intensity, distance, decay)

		this.name = "point_light"
	}

	update() {
		for(var i = 0; i < this.children.length; i++) {
			if (this.children[i].update != undefined) {
				this.children[i].update()
			}
		}
	}
}