class Text3D extends THREE.Mesh {
	constructor(geometry, material) {
		super()

		this.updateable = true
		this.name = "text"
	}

	update() {
		for(var i = 0; i < this.children.length; i++) {
			if (this.children[i].updateable) {
				this.children[i].update
			}
		}
	}
}