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

		EditorUI.form.addCombo("Type", type_str, {values: ["Static", "Dynamic", "Kinematic"], name_width: 150})
		EditorUI.form.addNumber("Mass", Editor.selected_object.body.mass, {name_width: 150})
		EditorUI.form.addNumber("Linear Damping", Editor.selected_object.body.linearDamping, {name_width: 150})
		EditorUI.form.addNumber("Angular Damping", Editor.selected_object.body.angularDamping, {name_width: 150})
		EditorUI.form.addCheckbox("Allow Sleep", Editor.selected_object.body.allowSleep, {name_width: 150})
		EditorUI.form.addNumber("Sleep Speed Limit", Editor.selected_object.body.sleepSpeedLimit, {name_width: 150})
		EditorUI.form.addNumber("Sleep Time Limit", Editor.selected_object.body.sleepTimeLimit, {name_width: 150})
		EditorUI.form.addNumber("Collision Group", Editor.selected_object.body.collisionFilterGroup, {name_width: 150})
	}

	updateInfo(name, value, widget) {
	
		if (value === "true") {
			value = true
		} else if (value === "false") {
			value = false
		}

		if (name === "Type") {
			if (value === "Static") {
				Editor.selected_object.body.type = CANNON.Body.STATIC
			} else if (value === "Dynamic") {
				Editor.selected_object.body.type = CANNON.Body.DYNAMIC
			} else if (value === "Kinematic") {
				Editor.selected_object.body.type = CANNON.Body.KINEMATIC
			}
		} else if (name === "Mass") {
			Editor.selected_object.body.mass = value
		} else if (name === "Linear Damping") {
			Editor.selected_object.body.linearDamping = value
		} else if (name === "Angular Damping") {
			Editor.selected_object.body.angularDamping = value
		} else if (name === "Allow Sleep") {
			Editor.selected_object.body.allowSleep = value
		} else if (name === "Sleep Speed Limit") {
			Editor.selected_object.body.sleepSpeedLimit = value
		} else if (name === "Sleep Time Limit") {
			Editor.selected_object.body.sleepTimeLimit = value
		} else if (name === "Collision Group") {
			Editor.selected_object.body.collisionFilterGroup = value
		}

	}
}