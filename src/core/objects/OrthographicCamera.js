class OrthographicCamera extends THREE.OrthographicCamera {
	constructor(left, right, top, bottom, near, far) {
		super(left, right, top, bottom, near, far)

		this.updateable = true
		this.name = "orthographic_camera"
	}

	update() {
		for(var i = 0; i < this.children.length; i++) {
			if (this.children[i].updateable) {
				this.children[i].update()
			}
		}
	}
}