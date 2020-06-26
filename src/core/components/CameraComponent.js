class CameraComponent extends Component {
	constructor() {
		super("Camera", "CameraComponent")

		this.objectType = null
		this.object = null
	}

	initUI() {
		super.initUI()

		this.object = Editor.selected_object

		if (this.object instanceof PerspectiveCamera) {
			this.objectType = "Perspective"
		} else if (this.object instanceof OrthographicCamera) {
			this.objectType = "Orthographic"
		}

		EditorUI.form.addCombo("Type", this.objectType, {values: ["Perspective","Orthographic"], disabled: true})
		EditorUI.form.addSeparator()

		if (this.objectType === "Perspective") {
			EditorUI.form.addSlider("FOV", Editor.selected_object.fov, {min: 1, max: 100, step: 1})
		} else if (this.objectType === "Orthographic") {
			EditorUI.form.addSlider("Size", Editor.selected_object.size, {min: 1, max: 10, step: 0.5})

			var modeStr = [
				{
					"title": "Resize Horizontal"
				},
				{
					"title": "Resize Vertical"
				}
			]

			EditorUI.form.addList("Mode", modeStr, {height: 55, /*TODO: Set selected selected: "Resize Horizontal"*/})
		}
	}

	updateInfo(name, value, widget) {

		if (name === "FOV") {
			Editor.selected_object.fov = value
			Editor.selected_object.updateProjectionMatrix()
		} else if (name === "Size") {
			Editor.selected_object.size = value
			Editor.selected_object.updateProjectionMatrix()
		} else if (name === "Mode") {
			if (value === "Resize Horizontal") {
				Editor.selected_object.mode = 0 // OrthographicCamera.VERTICAL
			} else if (value === "Resize Vertical") {
				Editor.selected_object.mode = 1 // OrthographicCamera.HORIZONTAL
			}
		}
	}
}