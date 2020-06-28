class MaterialEditor {
	constructor(parent, material) {

		var self = this
		this.id = "Material Editor " + MaterialEditor.id
		this.tab = EditorUI.tabs_widget.addTab(this.id, {selected: true, closable: true, onclose: () => {
			clearInterval(self.interval)
			
			MaterialEditor.id--
			
			self.updateMaterial()
			EditorUI.selectPreviousTab()
		}, callback: () => {
			// This is useful when handling different types of editors and one single Graph library <3
			unregisterNodes()
			registerMaterialNodes()
		}})

		if (parent !== undefined) {
			this.parent = parent
		} else {
			this.parent = EditorUI.tabs_widget.getTabContent(this.id)
		}

		this.canvas = document.createElement("canvas")
		this.canvas.id = "MaterialEditor"+MaterialEditor.id

		this.parent.appendChild(this.canvas)

		Editor.setState(Editor.STATE_IDLE)

		// Material attached to the editor
		this.material = material ? material : null

		// TODO: Store the nodes of a material
		this.graph = new LGraph()

		this.graphcanvas = new LGraphCanvas("#MaterialEditor"+MaterialEditor.id, this.graph)

		if (parent === undefined) {
			EditorUI.mainarea.onresize = function(e) {
				self.updateInterface()
			}
		}

		this.interval = setInterval(() => {
			// Every second, the material is gonna be saved
			self.updateMaterial()
		}, 1000)

		MaterialEditor.id++
	}

	updateMaterial() {
		// TODO: Store the nodes of the material
	}

	updateInterface() {
		this.graphcanvas.resize(EditorUI.mainarea.getSection(0).getWidth() - 2, EditorUI.mainarea.getSection(0).getHeight(0) - EditorUI.assetEx_height)
	}
}

MaterialEditor.id = 0