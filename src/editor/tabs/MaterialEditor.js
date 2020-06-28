class MaterialEditor {
	constructor(parent, material) {

		// TODO: Create an area with an horizontal split, in the left will be an sphere with the editing material, and in the left, the material node editor

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
		this.material = material ? material : new THREE.MeshPhongMaterial

		var defaultNodes = {
			config: {},
			groups: [],
			last_link_id: 0,
			last_node_id: 1,
			links: [],
			nodes: [
				{
					flags: {},
					id: 1,
					mode: 0,
					outputs: [{

					}],
					pos: [184, 189],
					properties: {
						mat: this.material
					},
					size: [140, 26],
					type: "Material/Material"
				}
			],
			version: 0.4
		}

		this.nodes = this.material.nodes
		console.log(this.nodes)

		if (JSON.stringify(this.nodes) === '{}') {
			this.graph = new LGraph(defaultNodes)
		} else {
			this.graph = new LGraph(this.nodes)
		}

		this.graphcanvas = new LGraphCanvas("#MaterialEditor"+MaterialEditor.id, this.graph)

		if (parent === undefined) {
			EditorUI.mainarea.onresize = function(e) {
				self.updateInterface()
			}
		}

		this.interval = setInterval(() => {
			// Every second, the material is saved
			self.updateMaterial()
		}, 1000)

		MaterialEditor.id++
	}

	updateMaterial() {
		if (this.material.updateNodes !== undefined) {
			this.material.updateNodes(this.graph.serialize())
		}
	}

	updateInterface() {
		this.graphcanvas.resize(EditorUI.mainarea.getSection(0).getWidth() - 2, EditorUI.mainarea.getSection(0).getHeight(0) - EditorUI.assetEx_height)
	}
}

MaterialEditor.id = 0