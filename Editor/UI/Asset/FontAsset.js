"use strict"

function FontAsset(parent) {
	Asset.call(this, parent)

	this.font = null

	// Self pointer
	var self = this

	// Context menu event
	this.element.oncontextmenu = function(e) {
		var context = new ContextMenu()
		context.size.set(130, 20)
		context.position.set(e.clientX - 5, e.clientY - 5)

		context.addOption("Rename", () => {
			if (self.font !== null) {
				self.font.name = prompt("Rename font", self.font.name)
				Editor.updateObjectViews()
			}
		})

		context.addOption("Delete", () => {
			if (self.font !== null) {
				if (confirm("Delete font?")) {
					self.font.dispose()
					// TODO: This
				}
			}
		})

		context.addOption("Copy", () => {
			if (self.font !== null) {
				try {
					Editor.clipboard.set(JSON.stringify(self.font.toJSON()), "text")
				} catch(e) {}
			}
		})
	}
}

FontAsset.prototype = Object.create(Asset.prototype)

// Set object to file
FontAsset.prototype.setFont = function(font) {
	if (font instanceof Font) {
		this.font = font
		this.updateMetadata()
	}
}

// Update font preview
FontAsset.prototype.updateMetadata = function() {
	if (this.font !== null) {
		this.image.src = Interface.file_dir + "Icons/Assets/Font.png"
		this.setText(this.font.name)
	}
}