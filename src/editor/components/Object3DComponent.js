// TODO: Move all the component system to "src/editor"

class Object3DComponent extends Component {
	constructor() {
		super("Object 3D", "Object3DComponent")
	}

	initUI() {
		super.initUI()
	
		EditorUI.form.addCheckbox("Visible", Editor.selected_object.visible)
		EditorUI.form.addCheckbox("Cast Shadow", Editor.selected_object.castShadow)
		EditorUI.form.addCheckbox("Receive Shadow", Editor.selected_object.receiveShadow)

		var self = this
		this.addRemoveButton(this)
	}

	updateInfo(name, value, widget) {

		var str = value + ""
		if (str === "true") {
			str = true
		} if (str === "false") {
			str = false
		}

		if (name === "Visible") {
			Editor.selected_object.visible = str
		} if (name === "Cast Shadow") {
			Editor.selected_object.castShadow = str
		} if (name === "Receive Shadow") {
			Editor.selected_object.receiveShadow = str
		}
	}
}