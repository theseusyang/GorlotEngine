"use strict"

// Hemisphere light class
class HemisphereLight extends THREE.HemisphereLight {
	constructor(skyColour, groundColour, intensity) {
		super(skyColour, groundColour, intensity)

		this.name = "hemisphere_light"

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