class PerspectiveCamera extends THREE.PerspectiveCamera {
	constructor(fov, aspect, near, far) {
		super(fov, aspect, near, far)

		this.name = "perspective_camera"
	}

	update() {
		for(var i = 0; i < this.children.length; i++) {
			if (this.children[i].update != undefined) {
				this.children[i].update()
			}
		}
	}
}