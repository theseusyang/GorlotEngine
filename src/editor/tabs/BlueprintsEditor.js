class BlueprintsEditor {
	constructor(parent) {
		this.parent = parent

		this.canvas = document.createElement("canvas")
		this.canvas.id = "BlueprintsEditor" + Editor.nameId

		this.parent.appendChild(this.canvas)

		this.graph = new LGraph()

		this.graphcanvas = new LGraphCanvas("#BlueprintsEditor"+Editor.nameId, this.graph)
	}

	updateInterface() {
		this.canvas.width = EditorUI.mainarea.getSection(0).getWidth()
		this.canvas.height = EditorUI.mainarea.getSection(0).getHeight() - EditorUI.assetEx_height-24
	}
}