class Model3D extends THREE.Mesh {
	constructor(geometry, material) {
		super(geometry, material)

		this.name = "model"

		this.components = []
		this.addComponent(new ElementComponent())
		this.addComponent(new Object3DComponent())
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