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

		EditorUI.form.addCombo("Type", this.objectType, {values: ["Perspective","Orthographic"], disabled: true, name_width: 150})
		EditorUI.form.addSeparator()

		if (this.objectType === "Perspective") {
			EditorUI.form.addSlider("FOV", Editor.selected_object.fov, {min: 1, max: 100, step: 1, name_width: 150})
			// TODO: A view from here and a set from view button
		} else if (this.objectType === "Orthographic") {
			EditorUI.form.addSlider("Size", Editor.selected_object.size, {min: 1, max: 10, step: 0.5, name_width: 150})

			var modeStr = [
				{
					"title": "Resize Horizontal"
				},
				{
					"title": "Resize Vertical"
				}
			]

			EditorUI.form.addSlider("Turn", Editor.selected_object.rotation.z, {min: -3.14, max: 3.14, step: 1.7, name_width: 150})
			EditorUI.form.addList("Mode", modeStr, {height: 55, /*TODO: Set selected selected: "Resize Horizontal"*/ name_width: 150})
		}

		this.scene = ObjectUtils.getScene(Editor.selected_object)
		this.amiInitialcamera = this.scene.initial_camera === Editor.selected_object.uuid

		EditorUI.form.addCheckbox("Default Camera", this.amiInitialcamera, {callback: () => {
			if (this.amiInitialcamera) {
				this.scene.initial_camera = null
			} else {
				this.scene.initial_camera = Editor.selected_object.uuid
			}
			EditorUI.updateInspector()
		}, name_width: 150})
	}

	updateInfo(name, value, widget) {

		this.amiInitialcamera = this.scene.initial_camera === Editor.selected_object.uuid

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
		} else if (name === "Turn") {
			Editor.selected_object.rotation.z = value
		}
	}
}