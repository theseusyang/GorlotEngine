class SceneComponent extends Component {
	constructor() {
		super("Scene", "SceneComponent")
	}

	initUI() {
		super.initUI()

		var program = Editor.selected_object.parent
		var obj = Editor.selected_object
		this.ami = obj.uuid === program.initial_scene
		EditorUI.form.addCheckbox("Default Scene", this.ami)
		EditorUI.form.addSeparator()
		
		EditorUI.form.addList("Fog", ["Off", "Linear", "Exponential"], {height: 70})

		if(Editor.selected_object.fog !== null) {
			EditorUI.form.addTitle("Fog")
			const hexToRgb = hex =>
  				hex.replace(/^#?([a-f\d])([a-f\d])([a-f\d])$/i
  				        ,(m, r, g, b) => '#' + r + r + g + g + b + b)
  				  	.substring(1).match(/.{2}/g)
  				  	.map(x => parseInt(x, 16))

			var col = hexToRgb(Editor.selected_object.fog_color)
			EditorUI.form.addColor("Color", col)
			EditorUI.form.addNumber("Near", Editor.selected_object.fog_near)
			EditorUI.form.addNumber("Density", Editor.selected_object.fog_density)
			EditorUI.form.addNumber("Far", Editor.selected_object.fog_far)
		}
	}

	updateInfo(name, value, widget) {

		if (name === "Default Scene") {

			if (this.ami) {
				Editor.selected_object.parent.initial_scene = null
			} else {
				Editor.selected_object.parent.initial_scene = Editor.selected_object.uuid
			}

		} else if (name === "Fog") {

			if (value === "Off") {
				Editor.selected_object.setFogMode(Scene.FOG_NONE)
				EditorUI.updateInspector()
			} else if (value === "Linear") {
				Editor.selected_object.setFogMode(Scene.FOG_LINEAR)
				EditorUI.updateInspector()
			} else if (value === "Exponential") {
				Editor.selected_object.setFogMode(Scene.FOG_EXPONENTIAL)
				EditorUI.updateInspector()
			}

		} else if (name === "Color") {
			var col = (r, g, b) => '#' + [r, g, b].map(x => {
				const hex = x.toString(16)
				return hex.length === 1 ? '0' + hex : hex
			}).join('')

			var color = col(Math.floor(value[0]*255), Math.floor(value[1]*255), Math.floor(value[2]*255))
			Editor.selected_object.fog_color = color
			Editor.selected_object.updateFog()
		} else if (name === "Near") {
			Editor.selected_object.fog_near = value
			Editor.selected_object.updateFog()
		} else if (name === "Density") {
			Editor.selected_object.fog_density = value
			Editor.selected_object.updateFog()
		} else if (name === "Far") {
			Editor.selected_object.fog_far = value
			Editor.selected_object.updateFog()
		}
	}
}