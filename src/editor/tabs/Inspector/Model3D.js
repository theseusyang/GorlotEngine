class Model3DInspector extends ObjectInspector {

	constructor() {
		super()

		// IMPORTANT: Clear the form
		EditorUI.form.clear()
	
		this.object = Editor.selected_object

	    EditorUI.form.addString("Name", this.object.name)
	    EditorUI.form.addSeparator()
	
	    EditorUI.form.addVector3("Position", [this.object.position.x, this.object.position.y, this.object.position.z])
	    EditorUI.form.addVector3("Rotation", [this.object.rotation.x, this.object.rotation.y, this.object.rotation.z])
	    EditorUI.form.addVector3("Scale",    [this.object.scale.x, this.object.scale.y, this.object.scale.z])

	    EditorUI.form.addSeparator()

	    EditorUI.form.addCheckbox("Visible", this.object.visible)
	    EditorUI.form.addCheckbox("Cast Shadow", this.object.castShadow)
	    EditorUI.form.addCheckbox("Receive Shadow", this.object.receiveShadow)

	    this.addComponentButton()

	    EditorUI.form.addSeparator()

	}

	// Update the editing object info
	updateInfo(name, value, widget) {
		console.log("Name: " + name + ", Value: " + value)

		var str = value + ""
		var val = str.split(",")

		if (str === "true") {
			str = true
		} if (str === "false") {
			str = false
		}

		if (name === "Name") {
			Editor.selected_object.name = str
			Editor.updateTreeView()
		} else if (name ===  "Position") {
			Editor.selected_object.position.set(val[0], val[1], val[2])
		} else if (name === "Rotation") {
			Editor.selected_object.rotation.set(val[0], val[1], val[2])
		} else if (name === "Scale") {
			Editor.selected_object.scale.set(val[0], val[1], val[2])
		}

		else if (name === "Visible") {
			Editor.selected_object.visible = str
		} else if (name === "Cast Shadow") {
			Editor.selected_object.castShadow = str
		} else if (name === "Receive Shadow") {
			Editor.selected_object.receiveShadow = str
		}
	}

}
