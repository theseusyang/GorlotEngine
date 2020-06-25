class LightComponent extends Component {
	constructor() {
		super("Light", "LightComponent")

		this.objectType = null
		this.object = Editor.selected_selected
	}

	initUI() {
		super.initUI()

		// Every kind of Light can have this component, if some special value is required, we can create more components and call them from here, and not be added in the component manager
		if(this.object instanceof THREE.Light) {

			if (this.object instanceof AmbientLight) {
				this.objectType = "Ambient"
			} else if (this.object instanceof DirectionalLight) {
				this.objectType = "Directional"
			} else if (this.object instanceof HemisphereLight) {
				this.objectType = "Hemisphere"
			} else if (this.object instanceof PointLight) {
				this.objectType = "Point"
			} else if (this.object instanceof SpotLight) {
				this.objectType = "Spot"
			} else {
				// TODO: create a light in the selected object child and assign "this.object" the value of the newly created only
			}

			// TODO: Selecting another kind of light from the Combo, will change the selected light's kind of
			EditorUI.form.addCombo("Type", this.objectType, {values: ["Ambient", "Directional", "Hemisphere", "Point", "Spot"], disabled: true})
			EditorUI.form.addSeparator()

			if(this.objectType === "Ambient") {
				EditorUI.form.addTitle("Ambient Light")
				EditorUI.form.addSeparator()
			} else if(this.objectType === "Directional") {
				EditorUI.form.addTitle("Directional Light")
				EditorUI.form.addTitle("Shadow")

				EditorUI.form.addString("Left", this.object.shadow.camera.left)
				EditorUI.form.addString("Right", this.object.shadow.camera.right)
				EditorUI.form.addString("Top", this.object.shadow.camera.top)
				EditorUI.form.addString("Bottom", this.object.shadow.camera.bottom)

				EditorUI.form.addString("Near", this.object.shadow.camera.near)
				EditorUI.form.addString("Far", this.object.shadow.camera.far)

				EditorUI.form.addString("Zoom", this.object.shadow.camera.zoom)
				EditorUI.form.addVector2("Map Size", [this.object.shadow.mapSize.x, this.object.shadow.mapSize.y])

				EditorUI.form.addString("Bias", this.object.shadow.bias)
				EditorUI.form.addString("Radius", this.object.shadow.radius)

				EditorUI.form.addSeparator()
			} else if (this.objectType === "Hemisphere") {
				EditorUI.form.addTitle("Hemisphere")

				// TODO: Include jsColor here
				EditorUI.form.addString("Ground Color", this.object.groundColor.getStyle())
				EditorUI.form.addString("Sky Color", this.object.color.getStyle())

				EditorUI.form.addSeparator()
			} else if (this.objectType === "Point") {
				EditorUI.form.addTitle("Point Light")
				EditorUI.form.addTitle("Shadow")

				EditorUI.form.addString("Near", this.object.shadow.camera.near)
				EditorUI.form.addString("Far", this.object.shadow.camera.far)
				EditorUI.form.addVector2("Map Size", [this.object.shadow.mapSize.x, this.object.shadow.mapSize.y])

				EditorUI.form.addString("Bias", this.object.shadow.bias)
				EditorUI.form.addString("Radius", this.object.shadow.radius)

				EditorUI.form.addSeparator()
			} else if (this.objectType === "Spot") {
				EditorUI.form.addTitle("Spot Light")

				EditorUI.form.addSlider("Distance", this.object.distance, {min: 1, max: 100, step: 1})
				EditorUI.form.addSlider("Angle", this.object.angle, {min: 0, max: 1.5, step: 0.1})
				EditorUI.form.addSlider("Penumbra", this.object.penumbra, {min: 0, max: 1.5, step: 0.1})
				EditorUI.form.addSlider("Decay", this.object.decay, {min: 0, max: 2, step: 0.1})

				EditorUI.form.addSeparator()

				EditorUI.form.addTitle("Shadow")
				EditorUI.form.addString("Near", this.object.shadow.camera.near)
				EditorUI.form.addString("Far", this.object.shadow.camera.far)
				EditorUI.form.addVector2("Map Size", [this.object.shadow.mapSize.x, this.object.shadow.mapSize.y])


				EditorUI.form.addSeparator()
			}

			EditorUI.form.addSlider("Intensity", this.object.intensity, {min: 0, max: 1, step: 0.01})

			EditorUI.form.addColor("Color", [this.object.color.r, this.object.color.g, this.object.color.b])

			EditorUI.form.addString("Color Hex", "0x" + this.object.color.getHexString())
			EditorUI.form.addString("Color RGB", this.object.color.getStyle())
			EditorUI.form.addCheckbox("Cast Shadow", this.object.castShadow)
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
			this.object.shadow.camera.left = value
			// TODO: Make this to function
			EditorUI.updateInspector()
		} else if (name === "Right") {
			this.object.shadow.camera.right = value
			// TODO: Make this to function
			EditorUI.updateInspector()
		} else if (name === "Top") {
			this.object.shadow.camera.top = value
			// TODO: Make this to function
			EditorUI.updateInspector()
		} else if (name === "Bottom") {
			this.object.shadow.camera.bottom = value
			// TODO: Make this to function
			EditorUI.updateInspector()
		} else if (name === "Zoom") {
			this.object.shadow.camera.zoom = value
			// TODO: Make this to function
			EditorUI.updateInspector()
		} 

		else if (name === "Ground Color") {
			this.object.groundColor.setStyle(value)
			EditorUI.updateInspector()
		} else if (name === "Sky Color") {
			this.object.color.setStyle(value)
			EditorUI.updateInspector()
		}

		else if (name === "Bias") {
			this.object.shadow.bias = value
		} else if (name === "Radius") {
			this.object.shadow.radius = value
		}

		else if (name === "Distance") {
			this.object.distance = value
		} else if (name === "Angle") {
			this.object.angle = value
		} else if (name === "Penumbra") {
			this.object.penumbra = value
		} else if (name === "Decay") {
			this.object.decay = value
		}

		else if (name === "Near") {
			this.object.shadow.camera.near = value
			// TODO: Make this to function
			EditorUI.updateInspector()
		} else if (name === "Far") {
			this.object.shadow.camera.far = value
			// TODO: Make this to function
			EditorUI.updateInspector()
		} else if (name === "Map Size") {
			this.object.shadow.mapSize.set(value[0], value[1])
			// TODO: Make this to function
			EditorUI.updateInspector()
		}

		else if (name === "Intensity") {
			this.object.intensity = value
		} else if (name === "Color") {
			this.object.color.setRGB(value[0], value[1], value[2])
		} else if (name === "Color Hex") {
			this.object.color.setHex(value)
			EditorUI.updateInspector()
		} else if (name === "Color RGB") {
			this.object.color.setStyle(value)
			EditorUI.updateInspector()
		} else if (name === "Cast Shadow") {
			this.object.intensity = value
			EditorUI.updateInspector()
		}
	}
}