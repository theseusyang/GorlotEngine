class ScriptComponent extends Component {

	// TODO: You can add this component to every object and set them an script to execute

	constructor() {
		super("Script", "ScriptComponent")
		this.mode = ""
	}

	initUI() {
		super.initUI()

		if (Editor.selected_object instanceof Script) {
			if (Editor.selected_object.mode == Script.INIT) {
				this.mode = "Initialization"
			} else if (Editor.selected_object.mode === Script.LOOP) {
				this.mode = "Loop"
			}
		}

		EditorUI.form.addCombo("Mode", this.mode, {values: [
			"Initialization",
			"Loop"
		]})
	}

	updateInfo(name, value, widget) {
		console.log(name + " " + value)

		if (name === "Mode") {
			if (value === "Initialization") {
				Editor.selected_object.mode = Script.INIT
			} else if (value === "Loop") {
				Editor.selected_object.mode = Script.LOOP
			}
		}
	}
}