class SettingsTab {
	constructor(parent) {

		var self = this
		this.id = "Settings Tab " + SettingsTab.id
		this.tab = EditorUI.tabs_widget.addTab(this.id, {selected: true, closable: true, onclose: () => {
			self.applyChanges()
			SettingsTab.id--
			EditorUI.selectPreviousTab()
		}, callback: () => {
			Editor.setState(Editor.STATE_IDLE)
		}})

		Editor.setState(Editor.STATE_IDLE)

		if (parent !== undefined) {
			this.parent = parent
		} else {
			this.parent = EditorUI.tabs_widget.getTabContent(this.id)
		}

		this.panel = new LiteGUI.Panel({title: "Projects Settings", closable: true, scroll: true, width: EditorUI.mainarea.getSection(0).getWidth()-2})
		this.parent.appendChild(this.panel.root)

		if (parent === undefined) {
			EditorUI.mainarea.onresize = function(e) {
				self.updateInterface()
			}
		}

		SettingsTab.id++
	}

	applyChanges() {
		
	}

	updateInterface() {
		this.panel.root.style.width = EditorUI.left_area.getWidth() - 2
    	this.panel.root.style.height = EditorUI.left_area.getHeight() - EditorUI.assetEx_height
	}
}

SettingsTab.id = 0