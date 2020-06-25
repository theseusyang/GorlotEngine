class BlueprintsEditor {
	constructor(parent, blueprints) {
		this.parent = parent

		this.canvas = document.createElement("canvas")
		this.canvas.id = "BlueprintsEditor" + Editor.nameId

		this.parent.appendChild(this.canvas)

		// Blueprints attached to the editor
		this.blueprints = blueprints ? blueprints : null

		this.graph = new LGraph(blueprints.getData())
		this.graphcanvas = new LGraphCanvas("#BlueprintsEditor"+Editor.nameId, this.graph)
	}

	updateBlueprints() {
		if (this.blueprints !== null) {
			this.blueprints.setData(this.graph.serialize())
		}
	}

	toJSON() {
	}

	updateInterface() {
		this.canvas.width = EditorUI.mainarea.getSection(0).getWidth()
		this.canvas.height = EditorUI.mainarea.getSection(0).getHeight() - EditorUI.assetEx_height-24
	}
}