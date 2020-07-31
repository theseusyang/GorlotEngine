"use strict"

function BlockAsset(parent) {
	Asset.call(this, parent)

	// Block
	this.blocks = null
	this.image.src = ObjectIcons.icons["BlockScript"]

	// Self pointer
	var self = this

	// Context menu event
	this.element.oncontextmenu = function(e) {
		var context = new ContextMenu()
		context.size.set(130, 20)
		context.position.set(event.clientX - 5, event.clientY - 5)

		context.addOption("Rename", () => {
			if (self.blocks !== null) {
				self.blocks.name = prompt("Rename blocks", self.blocks.name)
				self.updateMetadata()
			}
		})

		context.addOption("Delete", () => {
			if (self.blocks !== null) {
				if (confirm("Delete Blocks?")) {
					Editor.program.removeObject(self.blocks)
					Editor.updateObjectViews()
				}
			}
		})
	}

	// Drag start
	this.element.ondragstart = function(e) {
		// Insert blocks into drag buffer
		if (self.blocks !== null) {
			e.dataTransfer.setData("uuid", self.blocks.uuid)
			DragBuffer.pushDragElement(self.blocks)
		}

		// To avoid camera movement
		Mouse.updateKey(Mouse.LEFT, Key.KEY_UP)
	}

	// Drag end (called after ondrop)
	this.element.ondragend = function(e) {
		// Try to remove blocks from drag buffer
		var uuid = event.dataTransfer.getData("uuid")
		var obj = DragBuffer.popDragElement(uuid)
	}

	// Double click
	this.element.ondblclick = function() {
		if (self.blocks instanceof BlockScript) {
			var wind = Editor.openWindow({title: "Blocks Editor", width: 1280, height: 720})
			var blocks = new BlockEditor(wind.document.body)
			blocks.fit_parent = true
			blocks.attachBlocks(self.blocks)

			wind.window.component = blocks

			wind.window.onload = function() {
				wind.window.component.updateInterface()
				
				wind.window.onresize = function() {
					wind.window.component.updateInterface()
				}

				wind.window.onblur = function() {
					wind.window.component.updateBlocks()
				}

				wind.window.onfocus = function() {
					Register.registerBlocksNodes()
					wind.window.component.updateBlocks()
				}

				wind.window.onbeforeunload = function() {
					wind.window.component.updateBlocks()		
				}
			}

		}
	}
}

// Super prototypes
BlockAsset.prototype = Object.create(Asset.prototype)

// Destroy material file
BlockAsset.prototype.destroy = function() {
	Asset.prototype.destroy.call(this)
}

// Set blocks to this file
BlockAsset.prototype.setBlocks = function(blocks) {
	if (blocks instanceof BlockScript) {
		this.setText(blocks.name)
		this.blocks = blocks
	}
}

// Update metadata
BlockAsset.prototype.updateMetadata = function() {
	if (this.blocks !== null) {
		this.setText(this.blocks.name)
	}
}