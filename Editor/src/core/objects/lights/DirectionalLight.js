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

	toJSON(meta) {
		// Create JSON for this object
		var data = THREE.Object3D.prototype.toJSON.call(this, meta)

		data.object.components = this.components
		data.shadow_left = this.shadow.camera.left
		data.shadow_right = this.shadow.camera.right
		data.shadow_top = this.shadow.camera.top
		data.shadow_bottom = this.shadow.camera.bottom

		return data
	}
}