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

		if (Editor.selected_object.defaultComponents.length > 0) {
			for(var i = 0; i < Editor.selected_object.defaultComponents.length; i++) {
				Editor.selected_object.defaultComponents[i].initUI()
				EditorUI.form.addSeparator()
			}
		}

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

		if (Editor.selected_object.defaultComponents.length > 0) {
			for(var i = 0; i < Editor.selected_object.defaultComponents.length; i++) {
				Editor.selected_object.defaultComponents[i].updateInfo(name, value, widget)
			}
		}

		if(Editor.selected_object.components.length > 0) {
			for(var i = 0; i < Editor.selected_object.components.length; i++) {
				Editor.selected_object.components[i].updateInfo(name, value, widget)
			}
		}
	}

	createComponentDialog(e) {

		//var dialog = new LiteGUI.Dialog({title: "Components", closable: true, scroll: true, scrollable: true})
		//dialog.dockTo(EditorUI.inspector, "full")
		//dialog.show()

		//var inspector = new LiteGUI.Inspector({width: dialog.width, height: dialog.height})
		//dialog.add(inspector)

		//Editor.components.forEach((item, index) => {
		//	inspector.addButton(null, item.name, {callback: () => {
		//		Editor.selected_object.addComponent(item)
		//		EditorUI.updateInspector()
		//		dialog.close()
		//	}})
		//})

		// TODO: Add icons

		var dialog = new LiteGUI.Dialog( {id: "dialog_components", title: "Components", close: true, minimize: true, width: 400, scroll: false, draggable: true } )
		dialog.on_close = function() {
			Editor.clickable = true
		}
		dialog.show("fade")
		Editor.clickable = false

		var selected_component = null
		var widgets = new LiteGUI.Inspector()
		var list_widget = widgets.addList(null, Editor.components, {height: 364, callback_dblclick: function(v) {
			Editor.selected_object.addComponent(v)
			EditorUI.updateInspector()
			dialog.close()
		}})

		dialog.add(widgets)
		dialog.center()

	}

}