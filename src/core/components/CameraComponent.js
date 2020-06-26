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
		}

		EditorUI.form.addCombo("Type", this.objectType, {values: ["Perspective","Orthographic"], disabled: true})
		EditorUI.form.addSeparator()

		if (this.objectType === "Perspective") {
			EditorUI.form.addSlider("FOV", Editor.selected_object.fov, {min: 1, max: 100, step: 1})
		}
	}

	updateInfo(name, value, widget) {
		if (name === "FOV") {
			Editor.selected_object.fov = value
			Editor.selected_object.updateProjectionMatrix()
		}
	}
}