class Object3DComponent extends Component {
	constructor() {
		super("Object 3D", "Object3DComponent")
	}

	initUI() {
		super.initUI()
	
		EditorUI.form.addCheckbox("Visible", Editor.selected_object.visible)
		EditorUI.form.addCheckbox("Static", Editor.selected_object.matrixAutoUpdate)
		EditorUI.form.addCheckbox("Cast Shadow", Editor.selected_object.castShadow)
		EditorUI.form.addCheckbox("Receive Shadow", Editor.selected_object.receiveShadow)
		EditorUI.form.addCheckbox("Rotation Auto Update", Editor.selected_object.rotationAutoUpdate)

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
		} else if (name === "Cast Shadow") {
			ObjectUtils.setShadowCasting(Editor.selected_object, str)
		} else if (name === "Receive Shadow") {
			ObjectUtils.setShadowReceiving(Editor.selected_object, str)
		} else if (name === "Static") {
			Editor.selected_object.matrixAutoUpdate = str
		}

	}
}