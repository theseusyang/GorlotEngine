// TODO: Move all the component system to "src/editor"

class Object3DComponent extends Component {
	constructor() {
		super("Object 3D")

		this.defaultVisible = true
		this.defaultCastShadow = true
		this.defaultReceiveShadow = true
	}

	initUI() {
		super.initUI()
	
		EditorUI.form.addCheckbox("Visible", Editor.selected_object.visible)
		EditorUI.form.addCheckbox("Cast Shadow", Editor.selected_object.castShadow)
		EditorUI.form.addCheckbox("Receive Shadow", Editor.selected_object.receiveShadow)

		var self = this
		EditorUI.form.addButtons(null, ["Remove Component", "Reset Defaults"], {callback: function(name) {
			if (name === "Remove Component") {
				// TODO: Remove Component
				console.log("Remove pressed")
			} else if (name === "Reset Defaults") {
				Editor.selected_object.visible = self.defaultVisible
				Editor.selected_object.castShadow = self.defaultCastShadow
				Editor.selected_object.receiveShadow = self.defaultReceiveShadow

				EditorUI.updateInspector()
			}
		}})
	}

	updateInfo(name, value, widget) {

		console.log("name: " + name)

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