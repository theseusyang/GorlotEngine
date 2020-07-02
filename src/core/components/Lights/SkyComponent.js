class SkyComponent extends Component {
	constructor() {
		super("Sky", "SkyComponent")
	}

	initUI() {
		super.initUI()

		EditorUI.form.addCheckbox("Auto Update", Editor.selected_object.auto_update)
		EditorUI.form.addNumber("Day duration(s)", Editor.selected_object.day_time)
		EditorUI.form.addNumber("Time(s)", Editor.selected_object.time)
		EditorUI.form.addNumber("Sun distance", Editor.selected_object.sun_distance)
	}

	updateInfo(name, value, widget) {
		if (value === "true") {
			value = true
		} if (value === "false") {
			value = false
		}

		if (name === "Auto Update") {
			Editor.selected_object.auto_update = value
		} else if (name === "Day duration(s)") {
			// Check and set day time
			var day_time = value

			if (day_time < 0) {
				day_time = 0
			}
			Editor.selected_object.day_time = day_time

			// Check actual time
			if (Editor.selected_object.time > day_time) {
				Editor.selected_object.time = day_time
			}
			Editor.selected_object.updateSky()
			EditorUI.updateInspector()

		} else if (name === "Time(s)") {
			if (value < 0) {
				value = 0
			} else if (value > Editor.selected_object.day_time) {
				value = Editor.selected_object.day_time
			}

			Editor.selected_object.time = value
			Editor.selected_object.updateSky()
			
			EditorUI.updateInspector()
		} else if (name === "Sun distance") {
			Editor.selected_object.sun_distance = value
			Editor.selected_object.updateSky()
		}
	}
}