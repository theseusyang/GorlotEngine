"use strict"

// Directional light class
class DirectionalLight extends THREE.DirectionalLight {
	constructor(hex, intensity) {
		super(hex, intensity)
		this.name = "directional_light"

		this.castShadow = true

		this.shadow.camera.near = 1
		this.shadow.camera.far = 5000
		this.shadow.camera.left = -10
		this.shadow.camera.right = 10
		this.shadow.camera.top = 10
		this.shadow.camera.bottom = -10

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