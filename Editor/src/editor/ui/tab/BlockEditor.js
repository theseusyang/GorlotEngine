"use strict"

function BlockEditor(parent) {
	// Parent
	if (parent === undefined) {
		this.parent = document.body
	} else {
		this.parent = parent
	}


	// ID
	var id = "block_editor" + BlockEditor.id
	BlockEditor.id++

	// Create element
	this.element = document.createElement("div")
	this.element.id = id
	this.element.style.position = "absolute"

	// Prevent Drop event
	this.element.ondrop = function(e) {
		e.preventDefault()
	}

	// Prevent default when object dragged
	this.element.ondragover = function(e) {
		e.preventDefault()
	}

	// Canvas
	this.canvas = new Canvas(this.element)
	this.canvas.updateInterface()
	this.canvas.element.style.position = "absolute"

	this.graph = null

	// Element attributes
	this.children = []
	this.fit_parent = false
	this.size = new THREE.Vector2(0, 0)
	this.position = new THREE.Vector2(0, 0)
	this.visible = true

	// Blocks file
	this.blocks = null
	this.nodes = null

	this.parent.appendChild(this.element)
}

BlockEditor.id = 0

// Attach Blocks to the editor
BlockEditor.prototype.attachBlocks = function(blocks) {
	// Store Blocks
	this.blocks = blocks
	this.nodes = this.blocks.nodes

	this.initNodeEditor()
}

// Initialise node editor
BlockEditor.prototype.initNodeEditor = function() {
	this.graph = new LGraph(this.nodes)

	LiteGraph.NODE_TITLE_COLOR = "#FFF"

	this.graphCanvas = new LGraphCanvas(this.canvas.element, this.graph)
	this.graphCanvas.use_gradients = true
	this.graphCanvas.title_text_font = "bold 10px Verdana,Arial,sans serif"
	LiteGraph.NODE_TITLE_HEIGHT = 20
	LiteGraph.NODE_TITLE_TEXT_Y = 15
}

// Activate code editor
BlockEditor.prototype.activate = function() {
	Editor.setState(Editor.STATE_IDLE)
	Editor.resetEditingFlags()
}

// Remove element
BlockEditor.prototype.destroy = function() {
	try {
		this.parent.removeChild(this.element)
	} catch(e) {}
}

// On close
BlockEditor.prototype.close = function() {
	this.updateBlocks()
}

// Update container metadata
BlockEditor.prototype.updateMetadata = function(container) {
	if (this.blocks !== null) {
		var blocks = this.blocks

		// Set container name
		container.setName(blocks.name)

		// Check if particle exists in program
		var found = false
		Editor.program.traverse((obj) => {
			if (obj.uuid === blocks.uuid) {
				found = true
			}
		})

		// If not found, close tab
		if (!found) {
			container.close()
		}
	}
}

// Update the attached blocks
BlockEditor.prototype.updateBlocks = function() {
	if (this.blocks !== null) {
		this.blocks.updateNodes(this.graph.serialize())
	}
}

// Update Block Editor
BlockEditor.prototype.update = function() {
	if (this.blocks !== null) {
		this.updateBlocks()
	}
}

// Update interface
BlockEditor.prototype.updateInterface = function() {
	// Fit parent
	if (this.fit_parent) {
		this.size.x = this.parent.offsetWidth
		this.size.y = this.parent.offsetHeight
	}

	// Set visibility
	if (this.visible) {
		this.element.style.visibility = "visible"
	} else {
		this.element.style.visibility = "hidden"
	}

	// Update canvas
	this.canvas.visible = this.visible
	this.canvas.size.set(this.size.x, this.size.y)
	this.canvas.updateInterface()
}