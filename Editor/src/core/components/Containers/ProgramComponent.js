class ProgramComponent extends Component {
	constructor() {
		super("Program", "ProgramComponent")
	}

	initUI() {
		super.initUI()
		EditorUI.form.addString("Author", Editor.selected_object.author, {name_width: 150})
		EditorUI.form.addString("Version", Editor.selected_object.version, {name_width: 150})
		EditorUI.form.addTextarea("Description", Editor.selected_object.description, {immediate: true, callback: (v) => {
			Editor.selected_object.description = v
		}, name_width: 150})
		EditorUI.form.addCheckbox("Lock pointer", Editor.program.lock_pointer, {name_width: 150})
	}

	updateInfo(name, value, widget) {

		if (value === "true") {
			value = true
		} else if (value === "false") {
			value = false
		}

		if (name === "Author") {
			Editor.selected_object.author = value
			EditorUI.updateInspector()
		} else if (name === "Version") {
			Editor.selected_object.version = value
			EditorUI.updateInspector()
		} else if (name === "Lock pointer") {
			Editor.program.lock_pointer = value
		}
	}
}