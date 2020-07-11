"use strict"

// Blueprints Editor class
class BlueprintsEditor {
	constructor(parent, blueprints, type) {

		var self = this
		this.id = "Blueprints Editor " + BlueprintsEditor.id
		this.tab = EditorUI.tabs_widget.addTab(this.id, {selected: true, closable: true, onclose: () => {
			clearInterval(self.interval)

			BlueprintsEditor.id--

			self.updateBlueprints()
			EditorUI.selectPreviousTab()
		}, callback: () => {
			// This is useful when handling different types of editors and one single Graph library <3
			unregisterNodes()
			registerBlueprintsNodes()

			Editor.setState(Editor.STATE_IDLE)
			Editor.resetEditingFlags()
		}})

		if (parent !== undefined) {
			this.parent = parent
		} else {
			this.parent = EditorUI.tabs_widget.getTabContent(this.id)
		}

		this.canvas = document.createElement("canvas")
		this.canvas.id = "BlueprintsEditor" + BlueprintsEditor.id

		this.parent.appendChild(this.canvas)

		Editor.setState(Editor.STATE_IDLE)

		// Blueprints attached to the editor
		this.blueprints = blueprints ? blueprints : null
		this.type = type

		if(this.type === "Init") {
			this.graph = new LGraph(blueprints.getInit())
		} else if (type === "Loop") {
			this.graph = new LGraph(blueprints.getLoop())
		}

		this.graphcanvas = new LGraphCanvas("#BlueprintsEditor"+BlueprintsEditor.id, this.graph)
		this.graphcanvas.onShowMenuNodeProperties = null
		
		if (parent === undefined) {
			EditorUI.mainarea.onresize = function(e) {
				self.updateInterface()
			}
		}

		this.interval = setInterval(() => {
			// Every second, the blueprints are gonna save
			self.updateBlueprints()
		}, 1000)

		BlueprintsEditor.id++
	}

	updateBlueprints() {
		if (this.blueprints !== null) {

			if (this.type === "Init") {
				this.blueprints.setInit(this.graph.serialize())
			} else if (this.type === "Loop") {
				this.blueprints.setLoop(this.graph.serialize())
			}
			
		}
	}

	updateInterface() {
		this.graphcanvas.resize(EditorUI.mainarea.getSection(0).getWidth() - 2, EditorUI.mainarea.getSection(0).getHeight() - EditorUI.assetEx_height)

		//this.canvas.width = EditorUI.mainarea.getSection(0).getWidth() - 2
		//this.canvas.height = EditorUI.mainarea.getSection(0).getHeight() - EditorUI.assetEx_height
	}
}

BlueprintsEditor.id = 0