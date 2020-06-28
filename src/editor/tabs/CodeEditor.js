class CodeEditor {
	constructor(parent) {

		this.id = "Code Editor " + CodeEditor.id
		this.tab = EditorUI.tabs_widget.addTab(this.id, {selected: true, closable: true, onclose: () => {
			CodeEditor.id--
			EditorUI.selectPreviousTab()
		}, callback: () => {
			Editor.setState(Editor.STATE_IDLE)
			Editor.resetEditingFlags()
		}})

		if (parent !== undefined) {
			this.parent = parent
		} else {
			this.parent = EditorUI.tabs_widget.getTabContent(this.id)
		}

		Editor.setState(Editor.STATE_IDLE)

		this.element = document.createElement("div")
		this.element.id = "code"
		this.element.style.position = "absolute"

		// CodeMirror Editor
		this.code = new CodeMirror(this.element, {value: "", lineNumbers: true, indentWithTabs: true, indentUnit: 4, tabSize: 4, mode: "javascript"})
		this.code.setOption("theme", "monokai")
		this.code.setOption("mode", "javascript")

		// Code changed event
		var self = this
		this.code.on("change", function() {
			self.updateScript()
		})

		// Script attached to the editor
		this.script = null

		var self = this
		if (parent === undefined) {
			// This means, we've created the parent
			EditorUI.mainarea.onresize = function(e) {
				self.updateInterface()
			}
		}

		this.content = this.tab.content

		// Context menu event
		this.content.oncontextmenu = function(e) {
			var context = new LiteGUI.ContextMenu([
				{
					title: "Auto indent",
					callback: () => {
						self.code.execCommand("indentAuto")
					}
				},
				{
					title: "Select all",
					callback: () => {
						self.code.execCommand("selectAll")
					}
				},
				{
					title: "Undo",
					callback: () => {
						self.code.execCommand("undo")
					}
				},
				{
					title: "Redo",
					callback: () => {
						self.code.execCommand("redo")
					}
				}
			], {
				title: "Script Editor",
				event: e
			})
		} 

		this.parent.appendChild(this.element)
		CodeEditor.id++
	}

	setMode(mode) {
		this.code.setOption("mode", mode)
	}

	getText() {
		return this.code.getValue()
	}

	setText(text) {
		this.code.setValue(text)
	}

	attachScript(script) {
		this.script = script
		this.setText(script.code)
	}

	updateScript() {
		if (this.script != null) {
			this.script.setCode(this.code.getValue())
		}
	}

	updateInterface() {
		this.code.setSize(EditorUI.mainarea.getSection(0).getWidth() - 2, EditorUI.mainarea.getSection(0).getHeight()-EditorUI.assetEx_height)
	}
}

CodeEditor.id = 0