class BlueprintsEditor {
	constructor(parent, blueprints) {

		var self = this
		this.id = "Blueprints Editor " + BlueprintsEditor.id
		this.tab = EditorUI.tabs_widget.addTab(this.id, {selected: true, closable: true, onclose: () => {
			self.updateBlueprints()
			EditorUI.selectSceneEditor()
		}})

		if (parent !== undefined) {
			this.parent = parent
		} else {
			this.parent = EditorUI.tabs_widget.getTabContent(this.id)
		}

		this.canvas = document.createElement("canvas")
		this.canvas.id = "BlueprintsEditor" + Editor.nameId

		this.parent.appendChild(this.canvas)

		// Blueprints attached to the editor
		this.blueprints = blueprints ? blueprints : null

		this.graph = new LGraph(blueprints.getData())
		this.graphcanvas = new LGraphCanvas("#BlueprintsEditor"+Editor.nameId, this.graph)
		
		if (parent === undefined) {
			EditorUI.mainarea.onresize = function(e) {
				self.updateInterface()
			}
		}

		BlueprintsEditor.id++
	}

	updateBlueprints() {
		if (this.blueprints !== null) {
			this.graphcanvas.clear()
			this.blueprints.setData(this.graph.serialize())
		}
	}

	toJSON() {
	}

	updateInterface() {
		this.graphcanvas.resize(EditorUI.mainarea.getSection(0).getWidth() - 2, EditorUI.mainarea.getSection(0).getHeight() - EditorUI.assetEx_height)

		//this.canvas.width = EditorUI.mainarea.getSection(0).getWidth() - 2
		//this.canvas.height = EditorUI.mainarea.getSection(0).getHeight() - EditorUI.assetEx_height
	}
}

BlueprintsEditor.id = 0