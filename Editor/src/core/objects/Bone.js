"use strict"

// Bone class
class Bone extends THREE.Bone {
	constructor() {
		super()

		this.name = "bone"
		this.components = []

		this.defaultComponents = []
		this.defaultComponents.push(new ElementComponent())
		this.defaultComponents.push(new Object3DComponent())
	}

	addComponent(compo) {
		if (compo instanceof Component) {
			this.components.push(compo())
		}
	}
}