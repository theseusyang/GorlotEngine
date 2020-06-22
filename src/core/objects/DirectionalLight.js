class DirectionalLight extends THREE.DirectionalLight {
	constructor(hex, intensity) {
		super(hex, intensity)
		this.updateable = true
		this.name = "directional_light"
	}

	update() {
		for(var i = 0; i < this.children.length; i++) {
			if (this.children[i].updateable) {
				this.children[i].update()
			}
		}
	}
}