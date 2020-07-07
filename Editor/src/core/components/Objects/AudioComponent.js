class AudioComponent extends Component {
	constructor() {
		super("Audio", "AudioComponent")
	}

	initUI() {
		super.initUI()

		EditorUI.form.addCheckbox("Autoplay", Editor.selected_object.autoplay, {name_width: 150})
		EditorUI.form.addCheckbox("Loop", Editor.selected_object.source.loop, {name_width: 150})
		EditorUI.form.addNumber("Playback Speed", Editor.selected_object.playbackRate, {name_width: 150})
	}

	updateInfo(name, value, widget) {
		if (value === "true") {
			value = true
		} else if (value === "false") {
			value = false
		}

		if (name === "Autoplay") {
			Editor.selected_object.autoplay = value
		} else if (name === "Loop") {
			Editor.selected_object.source.loop = value
		} else if (name === "Playback Speed") {
			Editor.selected_object.playbackRate
		}
	}
}