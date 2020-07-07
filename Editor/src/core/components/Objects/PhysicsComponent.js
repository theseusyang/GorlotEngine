class PhysicsComponent extends Component {
	constructor() {
		super("Physics Object", "PhysicsComponent")
	}

	initUI() {
		super.initUI()

		var type = Editor.selected_object.body.type
		var type_str = "Static"

		if (type === CANNON.Body.STATIC) {
			type_str = "Static"
		} else if (type === CANNON.Body.DYNAMIC) {
			type_str = "Dynamic"
		} else if (type === CANNON.Body.KINEMATIC) {
			type_str = "Kinematic"
		}

		EditorUI.form.addCombo("Type", type_str, {values: ["Static", "Dynamic", "Kinematic"]})
	}

	updateInfo(name, value, widget) {
	
		if (name === "Type") {
			if (value === "Static") {
				Editor.selected_object.body.type = CANNON.Body.STATIC
			} else if (value === "Dynamic") {
				Editor.selected_object.body.type = CANNON.Body.DYNAMIC
			} else if (value === "Kinematic") {
				Editor.selected_object.body.type = CANNON.Body.KINEMATIC
			}
		}

	}
}