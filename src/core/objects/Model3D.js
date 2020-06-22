class Model3D extends THREE.Mesh {
	constructor(geometry, material) {
		super(geometry, material)

		this.name = "model"
	}

	update() {
		for(var i = 0; i < this.children.length; i++) {
			if (this.children[i].update != undefined) {
				this.children[i].update()
			}
		}
	}
}