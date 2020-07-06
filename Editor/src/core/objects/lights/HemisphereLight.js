"use strict"

// Hemisphere light class
class HemisphereLight extends THREE.HemisphereLight {
	constructor(skyColorHex, groundColorHex, intensity) {
		super(skyColorHex, groundColorHex, intensity)

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
}