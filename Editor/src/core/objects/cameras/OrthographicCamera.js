"use strict"

// Orthographic Camera class
class OrthographicCamera extends THREE.OrthographicCamera {
	constructor(size, aspect, mode, near, far) {
		super(-1, 1, 1, -1, near, far)

		this.name = "camera"

		this.size = size
		this.aspect = aspect
		this.mode = OrthographicCamera.FIXED_VERTICAL

		if (mode !== undefined) {
			this.mode = mode
		}

		this.components = []

		this.defaultComponents = []
		this.defaultComponents.push(new ElementComponent())
		this.defaultComponents.push(new Object3DComponent())
		this.defaultComponents.push(new CameraComponent())

		this.updateProjectionMatrix()
	}

	addComponent(compo) {
		if (compo instanceof Component) {
			this.components.push(compo)
		}
	}

	initialize() {
		this.scale.set(1, 1, 1)

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

	updateProjectionMatrix() {
		// Update left right, top and bottom values from aspect and size
		if (this.mode === OrthographicCamera.FIXED_VERTICAL) {
			this.top = this.size / 2
			this.bottom = - this.top

			this.right = this.top * this.aspect
			this.left = -this.right
		} else if (this.mode === OrthographicCamera.FIXED_HORITZONTAL) {
			this.right = this.size / 2
			this.left = -this.right

			this.top = this.right / this.aspect
			this.bottom = -this.top
		}

		THREE.OrthographicCamera.prototype.updateProjectionMatrix.call(this)
	}

	toJSON(meta) {
		// Create JSON for object
		var data = THREE.Object3D.prototype.toJSON.call(this, meta)

		data.object.zoom = this.zoom
		data.object.left = this.left
		data.object.right = this.right
		data.object.top = this.top
		data.object.bottom = this.bottom
		data.object.near = this.near
		data.object.far = this.far

		data.object.size = this.size
		data.object.aspect = this.aspect
		data.object.mode = this.mode

		data.object.components = this.components

		return data
	}
}

// Camera scale mode
OrthographicCamera.FIXED_VERTICAL = 0
OrthographicCamera.FIXED_HORITZONTAL = 1