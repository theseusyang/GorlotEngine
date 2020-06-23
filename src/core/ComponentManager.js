class ComponentManager {
	constructor() {
	}

	addComponent(component, ui) {
		Editor.components.push({title: component.name, callback: () => {
			Editor.selected_object.addComponent(component)
			
			if(ui) {
				EditorUI.updateInspector(Editor.selected_object)
			}
		
		}})
	}
}