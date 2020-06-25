// TODO: make this useful, I mean, when you can code (using scripts) add all the available functions to the blueprints system

class Blueprints extends THREE.Object3D {
	constructor() {
		super()

		this.name = "blueprints"
		this.type = "Blueprints"

		// Data
		this.data = ""

		// Components
		this.components = []

		this.defaultComponents = []
		this.defaultComponents.push(new ElementComponent())
	}

	initialize() {
		for(var i = 0; i < this.children.length; i++) {
			if (this.children[i].initialize != undefined) {
				this.children[i].initialize()
			}
		}
	}

	update() {
		// TODO: Compile  (Using LGraph without LGraphcanvas)

		for(var i = 0; i < this.children.length; i++) {
			if (this.children[i].update !== undefined) {
				this.children[i].update()
			}
		}
	}

	setData(data) {
		this.data = data
	}

	getData() {
		return this.data
	}

	toJSON(meta) {
		// TODO: This
	}
}