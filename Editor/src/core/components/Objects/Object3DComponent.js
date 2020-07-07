class Object3DComponent extends Component {
	constructor() {
		super("Object 3D", "Object3DComponent")
	}

	initUI() {
		super.initUI()
	
		EditorUI.form.addCheckbox("Visible", Editor.selected_object.visible, {name_width: 150})
		EditorUI.form.addCheckbox("Dynamic", Editor.selected_object.matrixAutoUpdate, {name_width: 150})
		EditorUI.form.addCheckbox("Cast Shadow", Editor.selected_object.castShadow, {name_width: 150})
		EditorUI.form.addCheckbox("Receive Shadow", Editor.selected_object.receiveShadow, {name_width: 150})
		EditorUI.form.addCheckbox("Rotation Auto Update", Editor.selected_object.rotationAutoUpdate, {name_width: 150})

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