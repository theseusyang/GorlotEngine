class LightComponent extends Component {
	constructor() {
		super("Light", "LightComponent")

		this.objectType = null
	}

	initUI() {
		super.initUI()

		// Every kind of Light can have this component, if some special value is required, we can create more components and call them from here, and not be added in the component manager
		if(Editor.selected_object instanceof THREE.Light) {

			if (Editor.selected_object instanceof AmbientLight) {
				this.objectType = "Ambient"
			} else if (Editor.selected_object instanceof DirectionalLight) {
				this.objectType = "Directional"
			} else if (Editor.selected_object instanceof HemisphereLight) {
				this.objectType = "Hemisphere"
			} else if (Editor.selected_object instanceof PointLight) {
				this.objectType = "Point"
			} else if (Editor.selected_object instanceof SpotLight) {
				this.objectType = "Spot"
			}

			// TODO: Selecting another kind of light from the Combo, will change the selected light's kind of
			EditorUI.form.addCombo("Type", this.objectType, {values: ["Ambient", "Directional", "Hemisphere", "Point", "Spot"], disabled: true})
			EditorUI.form.addSeparator()

			if(this.objectType === "Ambient") {
				EditorUI.form.addTitle("Ambient Light")
				EditorUI.addSeparator()
			} else if(this.objectType === "Directional") {
				EditorUI.form.addTitle("Directional Light")
				EditorUI.form.addTitle("Shadow")

				EditorUI.form.addString("Left", Editor.selected_object.shadow.camera.left)
				EditorUI.form.addString("Right", Editor.selected_object.shadow.camera.right)
				EditorUI.form.addString("Top", Editor.selected_object.shadow.camera.top)
				EditorUI.form.addString("Bottom", Editor.selected_object.shadow.camera.bottom)

				EditorUI.form.addString("Near", Editor.selected_object.shadow.camera.near)
				EditorUI.form.addString("Far", Editor.selected_object.shadow.camera.far)

				EditorUI.form.addString("Zoom", Editor.selected_object.shadow.camera.zoom)
				EditorUI.form.addVector2("Map Size", [Editor.selected_object.shadow.mapSize.x, Editor.selected_object.shadow.mapSize.y])

				EditorUI.form.addString("Bias", Editor.selected_object.shadow.bias)
				EditorUI.form.addString("Radius", Editor.selected_object.shadow.radius)

				EditorUI.form.addSeparator()
			} else if (this.objectType === "Hemisphere") {
				EditorUI.form.addTitle("Hemisphere")

				// TODO: Include jsColor here
				EditorUI.form.addString("Ground Color", Editor.selected_object.groundColor.getStyle())
				EditorUI.form.addString("Sky Color", Editor.selected_object.color.getStyle())

				EditorUI.form.addSeparator()
			} else if (this.objectType === "Point") {
				EditorUI.form.addTitle("Point Light")
				EditorUI.form.addTitle("Shadow")

				EditorUI.form.addString("Near", Editor.selected_object.shadow.camera.near)
				EditorUI.form.addString("Far", Editor.selected_object.shadow.camera.far)
				EditorUI.form.addVector2("Map Size", [Editor.selected_object.shadow.mapSize.x, Editor.selected_object.shadow.mapSize.y])

				EditorUI.form.addString("Bias", Editor.selected_object.shadow.bias)
				EditorUI.form.addString("Radius", Editor.selected_object.shadow.radius)

				EditorUI.form.addSeparator()
			} else if (this.objectType === "Spot") {
				EditorUI.form.addTitle("Spot Light")

				EditorUI.form.addSlider("Distance", Editor.selected_object.distance, {min: 1, max: 100, step: 1})
				EditorUI.form.addSlider("Angle", Editor.selected_object.angle, {min: 0, max: 1.5, step: 0.1})
				EditorUI.form.addSlider("Penumbra", Editor.selected_object.penumbra, {min: 0, max: 1.5, step: 0.1})
				EditorUI.form.addSlider("Decay", Editor.selected_object.decay, {min: 0, max: 2, step: 0.1})

				EditorUI.form.addSeparator()

				EditorUI.form.addTitle("Shadow")
				EditorUI.form.addString("Near", Editor.selected_object.shadow.camera.near)
				EditorUI.form.addString("Far", Editor.selected_object.shadow.camera.far)
				EditorUI.form.addVector2("Map Size", [Editor.selected_object.shadow.mapSize.x, Editor.selected_object.shadow.mapSize.y])


				EditorUI.form.addSeparator()
			}

			EditorUI.form.addSlider("Intensity", Editor.selected_object.intensity, {min: 0, max: 1, step: 0.01})

			EditorUI.form.addColor("Color", [Editor.selected_object.color.r, Editor.selected_object.color.g, Editor.selected_object.color.b])

			EditorUI.form.addString("Color Hex", "0x" + Editor.selected_object.color.getHexString())
			EditorUI.form.addString("Color RGB", Editor.selected_object.color.getStyle())
			EditorUI.form.addCheckbox("Cast Shadow", Editor.selected_object.castShadow)
		} else {
			// TODO: Create a child which is a light source
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

		if (name === "Left") {
			Editor.selected_object.shadow.camera.left = value
			// TODO: Make this to function
			EditorUI.updateInspector()
		} else if (name === "Right") {
			Editor.selected_object.shadow.camera.right = value
			// TODO: Make this to function
			EditorUI.updateInspector()
		} else if (name === "Top") {
			Editor.selected_object.shadow.camera.top = value
			// TODO: Make this to function
			EditorUI.updateInspector()
		} else if (name === "Bottom") {
			Editor.selected_object.shadow.camera.bottom = value
			// TODO: Make this to function
			EditorUI.updateInspector()
		} else if (name === "Zoom") {
			Editor.selected_object.shadow.camera.zoom = value
			// TODO: Make this to function
			EditorUI.updateInspector()
		} 

		else if (name === "Ground Color") {
			Editor.selected_object.groundColor.setStyle(value)
			EditorUI.updateInspector()
		} else if (name === "Sky Color") {
			Editor.selected_object.color.setStyle(value)
			EditorUI.updateInspector()
		}

		else if (name === "Bias") {
			Editor.selected_object.shadow.bias = value
		} else if (name === "Radius") {
			Editor.selected_object.shadow.radius = value
		}

		else if (name === "Distance") {
			Editor.selected_object.distance = value
		} else if (name === "Angle") {
			Editor.selected_object.angle = value
		} else if (name === "Penumbra") {
			Editor.selected_object.penumbra = value
		} else if (name === "Decay") {
			Editor.selected_object.decay = value
		}

		else if (name === "Near") {
			Editor.selected_object.shadow.camera.near = value
			// TODO: Make this to function
			EditorUI.updateInspector()
		} else if (name === "Far") {
			Editor.selected_object.shadow.camera.far = value
			// TODO: Make this to function
			EditorUI.updateInspector()
		} else if (name === "Map Size") {
			Editor.selected_object.shadow.mapSize.set(value[0], value[1])
			// TODO: Make this to function
			EditorUI.updateInspector()
		}

		else if (name === "Intensity") {
			Editor.selected_object.intensity = value
		} else if (name === "Color") {
			Editor.selected_object.color.setRGB(value[0], value[1], value[2])
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