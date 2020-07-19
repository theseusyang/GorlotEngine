"use strict"

function Panel(parent) {
	// Parent
	if (parent === undefined) {
		this.parent = document.body
	} else {
		this.parent = parent
	}

	// ID
	Panel.id++

	// Create Element
	this.element = document.createElement("div")
	this.element.style.position = "absolute"
	this.element.style.overflow = "auto"
	this.element.style.cursor = "default"
	this.element.style.backgroundColor = Editor.theme.panel_color

	// Prevent Drop event
	this.element.ondrop = function(e) {
		e.preventDefault()
	}

	// Prevent default when object dragged over
	this.element.ondragover = function(e) {
		e.preventDefault()
	}

	// Element attributes
	this.components = []
	this.children_pos = new THREE.Vector2(5, 10)
	this.fit_parent = true
	this.size = new THREE.Vector2(0, 0)
	this.position = new THREE.Vector2(0, 0)
	this.visible = true

	// Object attached
	this.obj = null

	//Add element to document
	this.parent.appendChild(this.element)
}

// Panel counter
Panel.id = 0

// Update Components with object data
Panel.prototype.updatePanel = function() {
	if (this.obj !== null) {
		for(var i = 0; i < this.components.length; i++) {
			this.components[i].updateData(this.obj)
		}
	}
}

// Attach object to Panel
Panel.prototype.attachObject = function(obj) {
	if (obj instanceof THREE.Object3D) {
		this.obj = obj

		this.components = this.obj.defaultComponents
		this.components.concat(this.obj.components)

		for(var i = 0; i < this.components.length; i++) {
			this.element.appendChild(this.components[i].initUI(this.children_pos, this.obj))

			// Add a little separation between components
			this.children_pos.y += 10
		}

		// Add component
		this.add = new Button(this.element)
		this.add.setText("Add Component")
		this.add.setCallback((e) => {
			console.log("Oniichan, >w< you clicked me nwn *moans", e)
		})
		this.add.updateInterface()
		this.updateInterface()

		this.updatePanel()
	}
}

// Remove element
Panel.prototype.destroy = function() {
	try {
		this.parent.removeChild(this.element)
	} catch(e) {}
}

// Update Panel
Panel.prototype.update = function() {}

// Update division Size
Panel.prototype.updateInterface = function() {
	if (this.fit_parent) {
		this.size.x = this.parent.offsetWidth
		this.size.y = this.parent.offsetHeight
	}

	for(var i = 0; i < this.components.length; i++) {
		this.components[i].updateInterface(this.size)
	}

	if (this.visible) {
		this.element.style.visiblility = "visible"
	} else {
		this.element.style.visiblility = "hidden"
	}

	if(this.add !== undefined) {
		this.add.size.set(this.size.x - 30, 20)
		this.add.position.copy(this.children_pos)
		this.add.updateInterface()
	}

	this.element.style.top = this.position.y + "px"
	this.element.style.left = this.position.x + "px"
	this.element.style.width = this.size.x + "px"
	this.element.style.height = this.size.y + "px"
}