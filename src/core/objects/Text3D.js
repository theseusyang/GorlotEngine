class Text3D extends THREE.Mesh {
	constructor(text, font, material) {
		super(new THREE.TextGeometry(text, {font: font}), material)

		this.name = "text"

		this.font = font
		this.text = text

		this.scale.set(0.01, 0.01, 0.01)

		this.components = []

		this.defaultComponents = []
		this.defaultComponents.push(new ElementComponent())
		this.defaultComponents.push(new Text3DComponent())
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

	setText(text) {
		this.text = text
		this.geometry = new THREE.TextGeometry(this.text, {font: this.font})
	}

	update() {
		for(var i = 0; i < this.children.length; i++) {
			if (this.children[i].update != undefined) {
				this.children[i].update
			}
		}
	}
}