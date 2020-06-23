class Empty extends THREE.Object3D {
	constructor() {
		super()

		this.name = "empty"

		this.components = []
		this.addComponent(new ElementComponent())
		
		this.rotationAutoUpdate = false
		this.matrixAutoUpdate = false
	}

	addComponent(component) {
		if (component instanceof Component) {
			this.components.push(component)
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
}