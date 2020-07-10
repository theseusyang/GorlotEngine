"use strict"

// Model 3D Class
class Model3D extends THREE.Mesh {
	constructor(geometry, material) {
		super(geometry, material)

		this.name = "model"

		this.receiveShadow = true
		this.castShadow = true

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

	// Dispose model
	dispose() {
		// Dispose material and geometry
		if (this.material.dispose !== undefined) {
			this.material.dispose()
		}
		this.geometry.dispose()

		// Dispose children
		for(var i = 0; i < this.children.length; i++) {
			this.children[i].dispose()
		}
	}
}