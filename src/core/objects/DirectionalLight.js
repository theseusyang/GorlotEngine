class DirectionalLight extends THREE.DirectionalLight {
	constructor(hex, intensity) {
		super(hex, intensity)
		this.name = "directional_light"
	}

	update() {
		for(var i = 0; i < this.children.length; i++) {
			if (this.children[i].update != undefined) {
				this.children[i].update()
			}
		}
	}
}