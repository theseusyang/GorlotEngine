class SkyComponent extends Component {
	constructor() {
		super("Sky", "SkyComponent")
	}

	initUI() {
		super.initUI()

		EditorUI.form.addCheckbox("Auto Update", Editor.selected_object.auto_update)
		EditorUI.form.addString("Day duration(s)", Editor.selected_object.day_time)
	}

	updateInfo(name, value, widget) {
		console.log(name + " " + value)

		if (value === "true") {
			value = true
		} if (value === "false") {
			value = false
		}

		if (name === "Auto Update") {
			Editor.selected_object.auto_update = value
		} else if (name === "Day duration(s)") {
			Editor.selected_object.day_time = value
		}
	}
}