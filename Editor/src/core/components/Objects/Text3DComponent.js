class Text3DComponent extends Component {
	constructor() {
		super("Text 3D", "Text3DComponent")
	}

	initUI() {
		super.initUI()

		if (Editor.selected_object instanceof Text3D) {
			EditorUI.form.addString("Text", Editor.selected_object.text, {name_width: 150})
		} else {
			// TODO: Create a child which is a text
			EditorUI.form.addInfo(null, "The selected object ain't text. This component won't work :'(")
		}

		this.addRemoveButton(this)
	}

	updateInfo(name, value, widget) {
		if (name === "Text") {
			Editor.selected_object.setText(value)
		}
	}
}