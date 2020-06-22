class Empty extends THREE.Object3D {
	constructor() {
		super()

		this.updateable = true
		this.name = "empty"
	}

	update() {
		for(var i = 0; i < this.children.length; i++) {
			if (this.children[i].updateable) {
				this.children[i].update()
			}
		}
	}
}