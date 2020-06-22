class Model3D extends THREE.Mesh {
	constructor(geometry, material) {
		super(geometry, material)

		this.updateable = true
		this.name = "model"
	}

	update() {
		for(var i = 0; i < this.children.length; i++) {
			if (this.children[i].updateable) {
				this.children[i].update()
			}
		}
	}
}