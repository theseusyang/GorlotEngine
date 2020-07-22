"use strict"

function BlocksComponent() {
	Component.call(this)

	this.component_name = "Blocks"
	this.className = "BlocksComponent"

	this.values = {}
}

BlocksComponent.prototype = Object.create(Component.prototype)

BlocksComponent.prototype.onCreate = function(obj) {
	this.obj = obj

	if (this.obj !== undefined || this.obj !== null) {
		this.blocks = new BlockScript(undefined, this.obj.uuid)
		this.blocks.hidden = true

		if (this.obj instanceof THREE.Light) {
			this.blocks.blocks_type = "light"
		} else if (this.obj instanceof THREE.Camera) {
			this.blocks.blocks_type = "camera"
		} else if (this.obj instanceof PhysicsObject) {
			this.blocks.blocks_type = "physics"
		}

		this.values["blocks"] = this.blocks.uuid
		this.obj.add(this.blocks)
	}
}

BlocksComponent.prototype.initUI = function(pos, obj) {
	// Clear the element
	this.clearElement()

	this.widgetsPos = pos

	// Self pointer
	var self = this
	this.obj = obj

	// Blocks
	this.obj.traverse((child) => {
		if (child.uuid === self.values["blocks"]) {
			self.blocks = child
		}
	})

	// Form
	this.form = new Form(this.element)
	this.form.spacing.set(5, 5)

	// Displays this component name
	this.form.addText(this.component_name)
	this.form.nextRow()

	// Edit blocks
	this.edit = new Button(this.form.element)
	this.edit.setText("Edit blocks")
	this.edit.size.set(200, 20)
	this.edit.setCallback(() => {
		// Check if there's already a tab with this block script attached
		var found = false

		for(var i = 0; i < Interface.tab.options.length; i++) {
			if (Interface.tab.options[i].component instanceof BlockScript) {
				if (Interface.tab.options[i].component.blocks === self.blocks) {
					found = true
					Interface.tab.selectOption(i)
					break
				}
			}
		}

		// If not found, open new tab
		if (!found) {
			// Open the Block editor
			var tab = Interface.tab.addOption(self.obj.name, Interface.file_dir + "icons/script/blocks.png", true)
			var blocks = new BlockEditor()
			blocks.attachBlocks(self.blocks)
			tab.attachComponent(blocks)

			// Select added tab
			tab.select()
		}
	})
	this.form.add(this.edit)
	this.form.nextRow()

	this.form.position.copy(this.widgetsPos)
	this.form.updateInterface()

	this.widgetsPos.y += this.form.size.y

	this.addDeleteButton()

	return this.element
}

BlocksComponent.prototype.onDelete = function() {
	if (this.blocks !== undefined) {
		if (this.blocks.parent === this.obj) {
			Editor.deleteObject(this.blocks)

			for(var i = 0; i < this.obj.components.length; i++) {
				if (this.obj.components[i] === this) {
					this.obj.components.splice(i, 1)
				}
			}

			this.clearElement()
			Interface.panel.updateComponents()
		}
	}
}

App.componentManager.push(new BlocksComponent())