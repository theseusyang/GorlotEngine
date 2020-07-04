class CodeEditor {
	constructor(parent) {

		this.id = "Code Editor " + CodeEditor.id
		this.tab = EditorUI.tabs_widget.addTab(this.id, {selected: true, closable: true, onclose: () => {
			clearInterval(self.interval)
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
		this.code.setOption("theme", Settings.code_theme)
		this.code.setOption("mode", "javascript")

		// Font size
		this.font_size = Settings.code_font_size
		this.setFontSize(this.font_size)

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
					title: "Copy",
					callback: () => {
						var text = self.code.getSelection()
						if (text !== "") {
							App.clipboard.set(text, "text")
						}
					}
				},
				{
					title: "Cut",
					callback: () => {
						var text = self.code.getSelection()
						if (text !== "") {
							App.clipboard.set(text, "text")
							self.code.replaceSelection("")
						}
					}
				},
				{
					title: "Paste",
					callback: () => {
						self.code.replaceSelection(App.clipboard.get("text"))
					}
				},
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

		this.interval = setInterval(() => {
			self.update()
		}, 1000/60)

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

	setFontSize(size) {
		// Set code editor font size
		this.font_size = size
		this.code.display.wrapper.style.fontSize = size + "px"
		this.code.refresh()
		Settings.code_font_size = this.font_size
	}

	updateInterface() {
		this.code.setSize(EditorUI.mainarea.getSection(0).getWidth() - 2, EditorUI.mainarea.getSection(0).getHeight()-EditorUI.assetEx_height)
	}

	update() {
		if (Keyboard.isKeyPressed(Keyboard.CTRL)) {
			if (Mouse.wheel !== 0) {
				this.font_size -= Mouse.wheel/100
				if (this.font_size < 5) {
					this.font_size = 5
				}
				this.setFontSize(this.font_size)
			}
		}

	}
}

CodeEditor.id = 0