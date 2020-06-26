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
			// TODO: A view from here and a set from view button
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

			EditorUI.form.addSlider("Turn", Editor.selected_object.rotation.z, {min: -3.14, max: 3.14, step: 1.7})
			EditorUI.form.addList("Mode", modeStr, {height: 55, /*TODO: Set selected selected: "Resize Horizontal"*/})
		}

		var scene = ObjectUtils.getScene(Editor.selected_object)
		var amiInitialcamera = scene.initial_camera === Editor.selected_object.uuid

		EditorUI.form.addCheckbox("Default Camera", amiInitialcamera, {callback: () => {
			if (amiInitialcamera) {
				scene.initial_camera = null
			} else {
				scene.initial_camera = Editor.selected_object.uuid
			}
			EditorUI.updateInspector()
		}})
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
		} else if (name === "Turn") {
			Editor.selected_object.rotation.z = value
		}
	}
}