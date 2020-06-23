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

	addRemoveButton() {
		EditorUI.form.addButtons(null, ["Remove Component", "Reset Defaults"], {callback: function(name) {
			if (name === "Remove Component") {
				// TODO: Remove Component
				for(var i = 0; i < Editor.selected_object.components.length; i++) {
					if (Editor.selected_object.components[i] === this) {
						console.log(Editor.selected_object.components[i].name)
					}
				}
			} else if (name === "Reset Defaults") {
				// TODO: Reset Defaults
			}

		}})

	}
}