"use strict"

// Settings Tab Class
class SettingsTab {
	constructor(parent) {

		var self = this
		this.id = "Settings Tab " + SettingsTab.id
		this.tab = EditorUI.tabs_widget.addTab(this.id, {selected: true, closable: true, onclose: () => {
			SettingsTab.id--
			Settings.store()
			EditorUI.selectPreviousTab()
		}, callback: () => {
			self.updateInspector()
			Editor.setState(Editor.STATE_IDLE)
			Editor.resetEditingFlags()
		}})

		Editor.setState(Editor.STATE_IDLE)

		if (parent !== undefined) {
			this.parent = parent
		} else {
			this.parent = EditorUI.tabs_widget.getTabContent(this.id)
		}

		this.panel = new LiteGUI.Panel({title: "Projects Settings", closable: true, scroll: true, width: EditorUI.mainarea.getSection(0).getWidth()-2})
		this.parent.appendChild(this.panel.root)

		this.inspector = new LiteGUI.Inspector({full: true, onchange: this.applyChanges})
		this.panel.content.appendChild(this.inspector.root)

		if (parent === undefined) {
			EditorUI.mainarea.onresize = function(e) {
				self.updateInterface()
			}
		}

		this.initUI()

		SettingsTab.id++
	}

	initUI() {
		this.inspector.addTitle("General")
		this.inspector.addCheckbox("Show stats", Settings.show_stats, {name_width: 150})
		this.inspector.addSeparator()

		this.inspector.addTitle("Rendering Quality")
		this.inspector.addCheckbox("Show Grid", Settings.grid_enabled, {name_width: 150})
		this.inspector.addNumber("Grid Size", Settings.grid_size, {name_width: 150})
		this.inspector.addNumber("Grid Spacing", Settings.grid_spacing, {name_width: 150})
		this.inspector.addCheckbox("Show Axis", Settings.axis_enabled, {name_width: 150})
		this.inspector.addCheckbox("Camera Preview", Settings.camera_preview_enabled, {name_width: 150})
		this.inspector.addSlider("Preview Size", Settings.camera_preview_percentage, {min: 0.05, max: 0.7, step: 0.05,name_width: 150})
		this.inspector.addCheckbox("Antialiasing", Settings.antialiasing, {name_width: 150, name_width: 150})
		this.inspector.addCombo("Shadows Type", undefined, {values: ["Basic", "PCF", "PCF Soft"], name_width: 150})
		this.inspector.addSeparator()

		this.inspector.addTitle("Code Editor")

		var themes = []
		var files = App.getFilesDirectory("libs/codemirror/theme/")
		for(var i = 0; i < files.length; i++) {
			var theme = files[i].replace(".css", "")
			themes.push(theme)
		}

		this.inspector.addCombo("Code Theme", Settings.code_theme,{values: themes, name_width: 150})
		this.inspector.addNumber("Font Size", Settings.code_font_size, {name_width: 150})
		this.inspector.addCheckbox("Line Numbers", Settings.code_line_numbers, {name_width: 150})
		this.inspector.addSeparator()

	}

	updateInspector() {
		
		if (this.inspector !== undefined) {
			this.inspector.clear()
			this.initUI()
		}

	}

	applyChanges(name, value) {

		if (value === "true") {
			value = true
		} else if (value === "false") {
			value = false
		}

		if (name === "Show stats") {
			Settings.show_stats = value
		} else if (name === "Antialiasing") {
			Settings.antialiasing = value
		} else if (name === "Shadows Type") {
			if (value === "Basic") {
				Settings.shadows_type = THREE.BasicShadowMap
			} else if (value === "PCF") {
				Settings.shadows_type = THREE.PCFShadowMap
			} else if (value === "PCF Soft") {
				Settings.shadows_type = THREE.PCFSoftShadowMap
			}
		} else if (name === "Show Grid") {
			Settings.grid_enabled = value
		} else if (name === "Grid Size") {
			Settings.grid_size = value
		} else if (name === "Grid Spacing") {
			Settings.grid_spacing = value
		} else if (name === "Camera Preview") {
			Settings.camera_preview_enabled = value
		} else if (name === "Preview Size") {
			Settings.camera_preview_percentage = value
		} else if (name === "Show Axis") {
			Settings.axis_enabled = value
		} else if (name === "Font Size") {
			Settings.code_font_size = value
		} else if (name === "Code Theme") {
			Settings.code_theme = value
		} else if (name === "Line Numbers") {
			Settings.code_line_numbers = value
		}
	}

	updateInterface() {
		this.panel.root.style.width = EditorUI.left_area.getWidth() - 4
    	this.panel.root.style.height = EditorUI.left_area.getHeight() - EditorUI.assetEx_height
	}
}

SettingsTab.id = 0