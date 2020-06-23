class ObjectInspector {
	
	constructor() {
		EditorUI.form.clear()
	
		this.object = Editor.selected_object

	    EditorUI.form.addString("Name", this.object.name)
	    EditorUI.form.addString("UUID", this.object.uuid, {disabled: true})

	    this.addComponentButton()

	    EditorUI.form.addSeparator()
	}

	addComponentButton() {
		EditorUI.form.addSeparator()

		this.i = 0

		if (Editor.selected_object.components.length > 0) {
	    	for(var i = 0; i < Editor.selected_object.components.length; i++) {
	    		Editor.selected_object.components[i].initUI()
	    		EditorUI.form.addSeparator()
	    	}
	    }

		var addComponentBtn = EditorUI.form.addButton(null, "Add Component")
		var self = this
	    addComponentBtn.onclick = function(e) {
	    	self.createComponentDialog(e)
	    }
	}

	updateInfo(name, value, widget) {
		var str = value + ""
		var val = str.split(",")

		if (str === "true") {
			str = true
		} if (str === "false") {
			str = false
		}

		if (name === "Name") {
			Editor.renameObject(Editor.selected_object, str)
		}

		if(Editor.selected_object.components.length > 0) {
			for(var i = 0; i < Editor.selected_object.components.length; i++) {
				Editor.selected_object.components[i].updateInfo(name, value, widget)
			}
		}
	}

	createComponentDialog(e) {

		var arr = []
    	var obj = Editor.selected_object

    	var context = new LiteGUI.ContextMenu(Editor.components, {
    		title: "Add Component",
    		event: e
    	})

	}

}