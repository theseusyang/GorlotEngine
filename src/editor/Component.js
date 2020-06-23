class Component {
	// To create a new component, you should extend this class

	constructor(name) {
		this.name = name
	}

	initUI() {
		// All the UI function will be here
		EditorUI.form.addTitle(this.name)
	}

	initialize() {
		// This method will be called at the very first frame
	}

	update() {
		// This method will be called every frame
	}

	addRemoveButton(component) {
		EditorUI.form.addButtons(null, ["Remove Component", "Reset Defaults"], {callback: function(name) {
			if (name === "Remove Component") {
				for(var i = 0; i < Editor.selected_object.components.length; i++) {
					if (Editor.selected_object.components[i] == component) {
						// TODO: Delete Editor.selected_object.components[i] from the array
						//console.log(Editor.selected_object.components[i].name)
						Editor.selected_object.components.splice(i, 1)
						EditorUI.updateInspector()
					}
				}
			} else if (name === "Reset Defaults") {
				// TODO: Reset Defaults
			}

		}})

	}
}