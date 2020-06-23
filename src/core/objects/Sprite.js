class Sprite extends THREE.Sprite {
	constructor(material) {
		super(material)

		this.name = "sprite"

		this.components = []
	}

	addComponent(component) {
		if (component instanceof Component) {
			this.components.push(component)
		}
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