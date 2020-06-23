class Model3DInspector {

	constructor() {
		// IMPORTANT: Clear the form
		EditorUI.form.clear()
	
		this.object = Editor.selected_object

	    EditorUI.form.addString("Name", this.object.name)
	    EditorUI.form.addSeparator()
	
	    EditorUI.form.addVector3("Position", [this.object.position.x, this.object.position.y, this.object.position.z])
	    EditorUI.form.addVector3("Rotation", [this.object.rotation.x, this.object.rotation.y, this.object.rotation.z])
	    EditorUI.form.addVector3("Scale",    [this.object.scale.x, this.object.scale.y, this.object.scale.z])
	}

	// Update the editing object info
	updateInfo(name, value, widget) {
		var str = value + ""
		var val = str.split(",")


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
	}

}
