class BlueprintsComponent extends Component {
	constructor() {
		super("Blueprints", "BlueprintsComponent")
	}

	initUI() {
		super.initUI()

		var init = EditorUI.form.addButton(null, "Edit Init")
		var loop = EditorUI.form.addButton(null, "Edit Loop")

		init.onclick = function(e) {

            var id = BlueprintsEditor.id-1
            EditorUI.tabs_widget.removeTab("Blueprints Editor " + id)

			EditorUI.blue = new BlueprintsEditor(undefined, Editor.selected_object, "Init")
			EditorUI.blue.updateInterface()
		}

		loop.onclick = function(e) {
            var id = BlueprintsEditor.id-1
            EditorUI.tabs_widget.removeTab("Blueprints Editor " + id)

			EditorUI.blue = new BlueprintsEditor(undefined, Editor.selected_object, "Loop")
			EditorUI.blue.updateInterface()
		}

	}

	updateInfo(name, value, widget) {

	}
}