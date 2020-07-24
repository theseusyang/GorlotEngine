"use strict"

function BlockAsset(parent) {
	Asset.call(this, parent)

	// Block
	this.blocks = null
	this.image.src = ObjectIcons.icons["BlockScript"]

	// Self pointer
	var self = this

	// Double click
	this.element.ondblclick = function() {
		if (self.blocks instanceof BlockScript) {
			// Check if there's already a tab with these blocks attached to
			var found = false
			for(var i = 0; i < Interface.tab.options.length; i++) {
				if (Interface.tab.options[i].component instanceof BlockEditor) {
					if (Interface.tab.options[i].component.blocks === self.blocks) {
						found = true
						Interface.tab.selectTab()
						break
					}
				}
			}

			// If not found, open new tab
			if (!found) {
				var tab = Interface.tab.addTab(self.blocks.name, Interface.file_dir + "icons/script/blocks.png", true)
				
				var blocks_editor = new BlockEditor()
				blocks_editor.attachBlocks(self.blocks)
				
				tab.attachComponent(blocks_editor)
				tab.select()
			}
		}
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
		this.setText(this.material.name)
	}
}