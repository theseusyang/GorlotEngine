"use strict"

// Material File class
class MaterialFile extends File {
	constructor(name, parent) {
		super(name, parent)

		// Self pointer
		var self = this

		// Used to store original material colour on highlight
		this.material_color = new THREE.Color(0, 0, 0)
		this.material_highlighted = false

		// Mouse over event
		this.elm.onmouseenter = function() {
			self.highlightMaterial()
		}

		// Mouse leave event
		this.elm.onmouseleave = function() {
			self.restoreMaterial()
		}

		// Open Material Editor
		this.elm.ondblclick = function() {
			if (self.attachedTo !== undefined) {
				EditorUI.matEd = new MaterialEditor(undefined, self.attachedTo, self)
	            EditorUI.matEd.updateInterface()
			}
		}

		// Context menu event
		this.elm.oncontextmenu = function(e) {
			var context = new LiteGUI.ContextMenu([
        	    {
        	        title: "Rename",
        	        callback: () => {
        	            if (self.attachedTo !== undefined || self.attachedTo !== null) {
        	                var p = LiteGUI.prompt("Rename: " + self.attachedTo.name, (value) => {
        	                    if (value !== null) {
        	                        //Editor.renameObject(self.attachedTo, value)
        	                        self.attachedTo.name = value
        	                        Editor.updateObjectViews()
        	                    }
        	                }, {title: "Rename", value: self.attachedTo.name})
        	            }
        	        }
        	    },
        	    {
        	        title: "Delete",
        	        callback: () => {
        	            if (self.attachedTo !== undefined || self.attachedTo !== null) {
        	            	Editor.program.removeMaterial(self.attachedTo, Editor.default_material, Editor.default_sprite_material)
        	            	Editor.updateObjectViews()
        	            }
        	        }
        	    },
        	    {
        	        title: "Copy",
        	        callback: () => {
        	            if (self.attachedTo !== undefined || self.attachedTo !== null) {
        	                try {
        	                    App.clipboard.set(JSON.stringify(self.attachedTo.toJSON()), "text")
        	                } catch(e) {
        	                    console.log(e)
        	                }
        	            }
        	        }
        	    }
        	], {title: self.attachedTo.name, event: e})
		}

		// Drag start
		this.elm.ondragstart = function(e) {
            // Restore material color
            self.restoreMaterial()

			// Insert material into drag buffer
			if (self.attachedTo !== null) {
				e.dataTransfer.setData("uuid", self.attachedTo.uuid)
				DragBuffer.pushDragElement(self.attachedTo)
			}

			// To avoid camera movement
			Mouse.updateKey(Mouse.LEFT, Key.KEY_UP)
		}

		// Drag end (Called after of ondrop)
		this.elm.ondragend = function(e) {
			// Try to remove material from drag buffer
			var uuid = e.dataTransfer.getData("uuid")
			var obj = DragBuffer.popDragElement(uuid)
		}

		// Drop event
		this.elm.ondrop = function(e) {
			e.preventDefault()
		}

		// Prevent default when dragged over
		this.elm.ondragover = function(e) {
			e.preventDefault()
		}
	}

	highlightMaterial() {
		if (this.attachedTo !== undefined) {
			if (this.attachedTo.color !== undefined) {
				this.material_color.copy(this.attachedTo.color)
				this.attachedTo.color.setRGB(0.5, 0.75, 0)
				this.material_highlighted = true
			}
		}
	}

	restoreMaterial() {
		if (this.material_highlighted) {
			if (this.attachedTo instanceof THREE.Material) {
				if (this.attachedTo.color !== undefined) {
					this.attachedTo.color.copy(this.material_color)
					this.material_highlighted = false
				}
			}
		}
	}

	attachAsset(asset) {
		if (asset instanceof THREE.Material) {
			if (Editor.material_renderer !== undefined) {
				Editor.material_renderer.renderMaterial(asset, this.img)
			}

			this.attachedTo = asset
		}
	}

	// Update Material preview
	updatePreview() {
		if (this.material !== null) {
			Editor.material_renderer.renderMaterial(this.material, this.img)
		}
	}
}
