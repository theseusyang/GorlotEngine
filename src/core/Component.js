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
}