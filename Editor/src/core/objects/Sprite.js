"use strict"

// Sprite class
class Sprite extends THREE.Sprite {
	constructor(material) {
		super(material)

		this.name = "sprite"
		this.type = "Sprite"

		this.components = []

		this.defaultComponents = []
		this.defaultComponents.push(new ElementComponent())
		this.defaultComponents.push(new Object3DComponent())
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

	update() {
		for(var i = 0; i < this.children.length; i++) {
			this.children[i].update()
		}
	}

	stop() {
		for(var i = 0; i < this.children.length; i++) {
			this.children[i].stop()
		}
	}

	// Dispose sprite
	dispose() {
		// Dispose material
		this.material.dispose()

		// Dispose children
		for(var i = 0;  i < this.children.length; i++) {
			this.children[i].dispose()
		}
	}
}