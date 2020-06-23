class ObjectInspector {
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
	
	addComponent(component) {
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