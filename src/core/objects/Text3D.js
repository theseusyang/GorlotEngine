class Text3D extends THREE.Mesh {
	constructor(text, material, font) {
		
		if (font === undefined) {
			var font = new FontLoader().parse(App.readFile("data/fonts/helvetiker_bold.typeface.js"))
		} else {
			var font = new FontLoader().parse(font)
		}

		super(new THREE.TextGeometry(text, {font: font}), material)
		
		this.font = font

		this.name = "text"
		this.type = "Text3D"

		this.scale.set(0.01, 0.01, 0.01)
		this.text = text

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
			this.children[i].initialize()
		}
	}

	setText(text) {
		this.text = text
		this.geometry.dispose()
		this.geometry = new THREE.TextGeometry(this.text, {font: this.font})
	}

	update() {
		for(var i = 0; i < this.children.length; i++) {
			this.children[i].update
		}
	}

	stop() {
		for(var i = 0; i < this.children.length; i++) {
			this.children[i].stop()
		}
	}

	toJSON(meta) {
		var data = THREE.Object3D.prototype.toJSON.call(this, meta)

		data.object.components = this.components
		data.object.text = this.text

		return data
	}
}