class PerspectiveCamera extends THREE.PerspectiveCamera {
	constructor(fov, aspect, near, far) {
		super(fov, aspect, near, far)

		this.updateable = true
		this.name = "perspective_camera"
	}

	update() {
		for(var i = 0; i < this.children.length; i++) {
			if (this.children[i].updateable) {
				this.children[i].update()
			}
		}
	}
}