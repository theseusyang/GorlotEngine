class LightComponent extends Component {
	constructor() {
		super("Light", "LightComponent")
	}

	initUI() {
		super.initUI()

		// Every kind of Light can have this component, if some special value is required, we can create more components and call them from here, and not be added in the component manager
		if(Editor.selected_object instanceof THREE.Light) {
			EditorUI.form.addSlider("Intensity", Editor.selected_object.intensity, {min: 0.1, max: 1, step: 0.01})
			// TODO: Include jsColor here
			EditorUI.form.addString("Color Hex", "0x" + Editor.selected_object.color.getHexString())
			EditorUI.form.addString("Color RGB", Editor.selected_object.color.getStyle())
			EditorUI.form.addCheckbox("Cast Shadow", Editor.selected_object.castShadow)
		} else {
			EditorUI.form.addInfo(null, "This selected object ain't a light. This component won't work :'(")
		}

		this.addRemoveButton(this)
	}

	updateInfo(name, value, widget) {

		if (value === "true") {
			value = true
		} if (value === "false") {
			value = false
		}

		if (name === "Intensity") {
			Editor.selected_object.intensity = value
		} else if (name === "Color Hex") {
			Editor.selected_object.color.setHex(value)
			EditorUI.updateInspector()
		} else if (name === "Color RGB") {
			Editor.selected_object.color.setStyle(value)
			EditorUI.updateInspector()
		} else if (name === "Cast Shadow") {
			Editor.selected_object.intensity = value
			EditorUI.updateInspector()
		}
	}
}