class OrthographicCamera extends THREE.OrthographicCamera {
	constructor(left, right, top, bottom, near, far) {
		super(left, right, top, bottom, near, far)

		this.name = "orthographic_camera"

		this.rotationAutoUpdate = true

		this.components = []

		this.defaultComponents = []
		this.defaultComponents.push(new ElementComponent())
	}

	addComponent(compo) {
		if (compo instanceof Component) {
			this.components.push(compo)
		}
	}

	initialize() {
		for(var i = 0; i < this.children.length; i++) {
			if (this.children[i].initialize != undefined) {
				this.children[i].initialize()
			}
		}
	}

	update() {
		for(var i = 0; i < this.children.length; i++) {
			if (this.children[i].update != undefined) {
				this.children[i].update()
			}
		}
	}

	stop() {
		for(var i = 0; i < this.children.length; i++) {
			if (this.children[i].stop !== undefined) {
				this.children[i].stop()
			}
		}
	}
}