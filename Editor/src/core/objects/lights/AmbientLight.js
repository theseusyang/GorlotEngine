"use strict"

// Ambient light class
class AmbientLight extends THREE.AmbientLight {
	constructor(hex) {
		super(hex)
		this.name = "ambient_light"

		this.matrixAutoUpdate = false

		this.components = []

		this.defaultComponents = []
		this.defaultComponents.push(new ElementComponent())
		this.defaultComponents.push(new Object3DComponent())
		this.defaultComponents.push(new LightComponent())
	}

	addComponent(component) {
		if (component instanceof Component) {
			this.components.push(component)
		}
	}
}