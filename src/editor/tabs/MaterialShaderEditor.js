class MaterialShaderEditor {
	constructor(material, vertex, fragment) {
		this.id = "ShaderMaterial Editor " + MaterialShaderEditor.id
		this.tab = EditorUI.tabs_widget.addTab(this.id, {selected: true, closable: true, onclose: () => {
			MaterialShaderEditor.id--
			EditorUI.selectPreviousTab()
		}, callback: () => {
			Editor.setState(Editor.STATE_IDLE)
			Editor.resetEditingFlags()
		}})

		this.parent = EditorUI.tabs_widget.getTabContent(this.id)
		Editor.setState(Editor.STATE_IDLE)

		var w = EditorUI.mainarea.getSection(0).getWidth()/2

		this.area = new LiteGUI.Area()
		this.area.split("horizontal", [w, null], false)
		this.area.onresize = this.updateInterface
		this.tab.add(this.area)

		this.vertex_area = this.area.getSection(0)
		this.fragment_area = this.area.getSection(1)

		this.vertex = new CodeMirror(this.vertex_area.content, {value: vertex, lineNumbers: true, indentWithTabs: true, indentUnit: 4, tabSize: 4, mode: "glsl"})
		this.vertex.setOption("theme", "monokai")
		this.vertex.setOption("mode", "glsl")

		this.fragment = new CodeMirror(this.fragment_area.content, {value: fragment, lineNumbers: true, indentWithTabs: true, indentUnit: 4, tabSize: 4, mode: "glsl"})
		this.fragment.setOption("theme", "monokai")
		this.fragment.setOption("mode", "glsl")

		this.updateInterface()
	}

	updateInterface() {
		this.vertex.setSize(EditorUI.mainarea.getSection(0).getWidth()/2, EditorUI.mainarea.getSection(0).getSection(0).getHeight()-28)
		this.fragment.setSize(EditorUI.mainarea.getSection(0).getWidth()/2, EditorUI.mainarea.getSection(0).getSection(0).getHeight()-28)
	}
}

MaterialShaderEditor.id = 0