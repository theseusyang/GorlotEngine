class Text3D extends THREE.Mesh {
	constructor(text, material, font) {
		
		if (font === undefined) {
			var font = new FontLoader().parse(App.readFile("data/fonts/helvetiker_bold.typeface.js"))
		} else {
			var font = new FontLoader().parse(font)
		}

		super(new THREE.TextGeometry(text, {font: font}), material)
		
		this.font = font

		this.name = "TEXT"
		this.type = "Text3D"

		this.scale.set(0.01, 0.01, 0.01)
		this.text = text

		this.components = []

		this.defaultComponents = []
		this.defaultComponents.push(new ElementComponent())
		this.defaultComponents.push(new Object3DComponent())
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
		// Backup Geometry and set to undefined, to avoid being stored
		var geometry = this.geometry
		this.geometry = undefined

		// Generate JSON
		var data = THREE.Object3D.prototype.toJSON.call(this, meta)

		data.object.text = this.text
		data.object.font = JSON.stringify(this.font)
		data.object.components = this.components

		// Restore Geometry
		this.geometry = geometry

		return data
	}
}