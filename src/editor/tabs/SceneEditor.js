class SceneEditor {
	constructor(parent) {

		this.id = "Scene Editor " + SceneEditor.id
		this.tab = EditorUI.tabs_widget.addTab(this.id, {selected: true, closable: true})
		
		if (parent !== undefined) {
			this.parent = parent
		} else {
			this.parent = EditorUI.tabs_widget.getTabContent("Scene Editor " + SceneEditor.id)
		}

		this.element = document.createElement("canvas")
		this.element.id = "scene_editor" + SceneEditor.id
		this.element.style.position = "absolute"
		this.element.style.top = "0px"
		this.element.style.left = "0px"

		this.scene = null

		this.parent.appendChild(this.element)
		
		SceneEditor.id++	
	}

	activate() {
		Editor.program.scene = this.scene
		Editor.setRenderCanvas(this.element)
		Editor.resize()
	}

	setScene(scene) {
		if (scene instanceof Scene) {
			this.scene = scene
		}
	}

	updateInterface() {
		this.element.width = EditorUI.left_area.getWidth() - 2
    	this.element.height= EditorUI.left_area.getHeight() - (EditorUI.assetEx_height + 26) // - left_area.getSection().getHeight()
		
		Editor.resizeCamera()

	}
}

SceneEditor.id = 0
