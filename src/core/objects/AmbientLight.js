class AmbientLight extends THREE.AmbientLight {
	constructor(hex) {
		super(hex)
		this.name = "ambient_light"
	}

	update() {
		for(var i = 0; i < this.children.length; i++) {
			if (this.children[i].update != undefined) {
				this.children[i].update()
			}
		}
	}
}