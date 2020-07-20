"use strict"

function CameraComponent() {
	Component.call(this)

	this.component_name = "Camera"
	this.className = "CameraComponent"

	this.values = {
		fov: 60,
		default: false,
		near: 0.1,
		far: 100000,
		size: 3,
		mode: 0
	}
}

CameraComponent.prototype = Object.create(Component.prototype)

CameraComponent.prototype.initUI = function(pos, obj) {
	// Clear the element
	this.clearElement()

	this.widgetsPos = pos

	// Self pointer
	var self = this
	this.obj = obj

	// Form
	this.form = new Form(this.element)
	this.form.spacing.set(5, 5)

	// Displays the component name
	this.form.addText(this.component_name)
	this.form.nextRow()

	if(this.obj instanceof PerspectiveCamera) {

		// Field of View
		this.form.addText("FOV")
		this.fov = new Slider(this.form.element)
		this.fov.size.set(160, 18)
		this.fov.setRange(30, 160)
		this.fov.setOnChange(() => {
			if (self.obj !== null) {
				self.obj.fov = self.fov.getValue()
				self.obj.updateProjectionMatrix()
			}
		})
		this.form.add(this.fov)
		this.form.nextRow()

	} else if (this.obj instanceof OrthographicCamera) {

		// Size
		this.form.addText("Size")
		this.size = new NumberBox(this.form.element)
		this.size.size.set(80, 18)
		this.size.setOnChange(() => {
			if (self.obj !== null) {
				self.obj.size = self.size.getValue()
				self.obj.updateProjectionMatrix()
			}
		})
		this.form.add(this.size)
		this.form.nextRow()

		// Camera resize mode
		this.form.addText("Resize Mode")
		this.mode = new DropdownList(this.form.element)
		this.mode.size.set(130, 18)
		this.mode.addValue("Horizontal", OrthographicCamera.FIXED_VERTICAL)
		this.mode.addValue("Vertical", OrthographicCamera.FIXED_HORIZONTAL)
		this.mode.setOnChange(() => {
			if (self.obj !== null) {
				self.obj.mode = self.mode.getSelectedIndex()
			}
		})
		this.form.add(this.mode)
		this.form.nextRow()
	}

	// Rendering distance
	this.form.addText("Distance")
	this.form.nextRow()

	// Near
	this.form.addText("Near")
	this.near = new NumberBox(this.form.element)
	this.near.size.set(60, 18)
	this.near.setStep(0.1)
	this.near.setRange(0, Number.MAX_SAFE_INTEGER)
	this.near.setOnChange(() => {
		if (self.obj !== null) {
			self.obj.near = self.near.getValue()
		}
	})
	this.form.add(this.near)
	this.form.nextRow()

	// Far
	this.form.addText("Far")
	this.far = new NumberBox(this.form.element)
	this.far.size.set(80, 18)
	this.far.setRange(0, Number.MAX_SAFE_INTEGER)
	this.far.setOnChange(() => {
		if (self.obj !== null) {
			self.obj.far = self.far.getValue()
		}
	})
	this.form.add(this.far)
	this.form.nextRow()

	// Select camera as scene default
	this.default = new CheckBox(this.form.element)
	this.default.setText("Default camera")
	this.default.size.set(200, 15)
	this.default.setOnChange(() => {
		if (self.obj !== null) {
			var scene = ObjectUtils.getScene(self.obj)
			if (scene !== null) {
				if (self.default.getValue()) {
					scene.initial_camera = self.obj.uuid
				} else {
					scene.initial_camera = null
				}
			}
		}
	})
	this.form.add(this.default)
	this.form.nextRow()

	this.form.position.copy(this.widgetsPos)
	this.form.updateInterface()

	this.widgetsPos.y += this.form.size.y
	this.addResetButton()

	return this.element
}

CameraComponent.prototype.updateData = function() {
	if (this.obj instanceof PerspectiveCamera) {
		this.fov.setValue(this.obj.fov)
	} else if (this.obj instanceof OrthographicCamera) {
		this.size.setValue(this.obj.size)
		this.mode.setSelectedIndex(this.obj.mode)
	}

	this.near.setValue(this.obj.near)
	this.far.setValue(this.obj.far)

	var scene = ObjectUtils.getScene(this.obj)
	if (scene !== null) {
		this.default.setValue(scene.initial_camera === this.obj.uuid)
	} else {
		this.default.setValue(false)
	}
}

CameraComponent.prototype.onReset = function() {
	if (this.obj instanceof PerspectiveCamera) {
		this.obj.fov = this.values.fov

		this.obj.near = this.values.near
		this.obj.far = this.values.far
	} else if (this.obj instanceof OrthographicCamera) {
		this.obj.size = this.values.size
		this.obj.mode = this.values.mode
	}

	var scene = ObjectUtils.getScene(this.obj)
	if (scene !== null) {
		// By default there is no initial camera
		scene.initial_camera = null
	}

	Editor.updateObjectViews()
	this.updateData()
}