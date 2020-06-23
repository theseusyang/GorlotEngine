class Model3DInspector {

	constructor(object) {
		// TODO: Make this to function

		// IMPORTANT: Clear the form
		EditorUI.form.clear()
	
	    EditorUI.form.addString("Name", object.name)
	    EditorUI.form.addSeparator()
	
	    EditorUI.form.addVector3("Position", [object.position.x, object.position.y, object.position.z])
	    EditorUI.form.addVector3("Rotation", [object.rotation.x, object.rotation.y, object.rotation.z])
	}

	// Update the editing object info
	updateInfo(name, value, widget) {
		var val = value + ""
		console.log(val)
	}

}
