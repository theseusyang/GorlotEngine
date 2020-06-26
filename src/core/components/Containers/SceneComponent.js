class SceneComponent extends Component {
	constructor() {
		super("Scene", "SceneComponent")
	}

	initUI() {
		super.initUI()

		var program = Editor.selected_object.parent
		var obj = Editor.selected_object
		this.ami = obj.uuid === program.initial_scene
		EditorUI.form.addCheckbox("Default Scene", this.ami)
	}

	updateInfo(name, value, widget) {
		if (name === "Default Scene") {
			if (this.ami) {
				Editor.selected_object.parent.initial_scene = null
			} else {
				Editor.selected_object.parent.initial_scene = Editor.selected_object.uuid
			}
		}
	}
}