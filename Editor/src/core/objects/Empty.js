"use strict"

// Empty class
class Empty extends THREE.Object3D {
	constructor() {
		super()

		this.name = "empty"
		this.type = "Group"

		this.components = []

		this.defaultComponents = []
		this.defaultComponents.push(new ElementComponent())
		this.defaultComponents.push(new Object3DComponent())
		
		this.rotationAutoUpdate = false
		this.matrixAutoUpdate = false
	}

	addComponent(component) {
		if (component instanceof Component) {
			this.components.push(component)
		}
	}
}