class ElementComponent extends Component {
	constructor() {
		super("Element", "ElementComponent")
	}

	initUI() {
		super.initUI()

		// TODO: Copy & Paste these values
		EditorUI.form.addVector3("Position", [Editor.selected_object.position.x, Editor.selected_object.position.y, Editor.selected_object.position.z])
		EditorUI.form.addVector3("Rotation", [Editor.selected_object.rotation.x, Editor.selected_object.rotation.y, Editor.selected_object.rotation.z])
		EditorUI.form.addVector3("Scale", [Editor.selected_object.scale.x, Editor.selected_object.scale.y, Editor.selected_object.scale.z])
	}

	updateInfo(name, value, widgets) {
		var str = value + ""
		var val = str.split(",")

		if (name === "Position") {
			Editor.selected_object.position.set(val[0], val[1], val[2])
		} else if (name === "Rotation") {
			Editor.selected_object.rotation.set(val[0], val[1], val[2])
		} else if (name === "Scale") {
			Editor.selected_object.scale.set(val[0], val[1], val[2])
		}
	}
}