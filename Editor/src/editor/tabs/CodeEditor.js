"use strict"

// Code Editor class
class CodeEditor {
	constructor(parent) {

		var self = this
		this.id = "Code Editor " + CodeEditor.id
		this.tab = EditorUI.tabs_widget.addTab(this.id, {selected: true, closable: true, onclose: () => {
			clearInterval(self.interval)
			CodeEditor.id--
			EditorUI.selectPreviousTab()

			// TODO: Delete this
			self.updateScript()
		}, callback: () => {
			if(this.script !== undefined) {
				self.activate()
			}
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
		this.code = new CodeMirror(this.element,
			{
				value: "",
				lineNumbers: Settings.code.line_numbers,
				lineWrapping: Settings.code.line_wrapping,
				keyMap: Settings.code.keymap,
				autoCloseBrackets: Settings.code.auto_close_brackets,
				styleActiveLine: Settings.code.highlight_active_line,
				matchBrackets: true,
				dragDrop: true,
				indentWithTabs: true,
				indentUnit: 4,
				tabSize: 4,
				hintOptions: {
					hint: CodeMirror.hint.anyword
				}
			}
		)
		this.code.setOption("theme", Settings.code.theme)
		this.code.setOption("mode", "javascript")

		// Set editor font size
		this.setFontSize(Settings.code.font_size)

		// Self pointer
		var self = this

		// Keyup
		this.code.on("keydown", (code, event) => {
			var key = event.keyCode
			if (key >= Keyboard.A && key <= Keyboard.Z) {
				if (!code.state.completionActive) {
					CodeMirror.commands.autocomplete(code, null, {completeSingle: false})
				}
			}
		})

		// Script attached to the editor
		this.script = null

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
		this.activate()
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

	activate() {
		// Set editor state
		Editor.setState(Editor.STATE_IDLE)
		Editor.resetEditingFlags()

		// Update code and set font size
		this.updateScript()
		this.setFontSize(Settings.code.font_size)

		// Update editor settings
		this.code.setOption("theme", Settings.code.theme)
		this.code.setOption("lineNumbers", Settings.code.line_numbers)
		this.code.setOption("lineWrapping", Settings.code.line_wrapping)
		this.code.setOption("keyMap", Settings.code.keymap)
		this.code.setOption("autoCloseBrackets", Settings.code.auto_close_brackets)
		this.code.setOption("styleActiveLine")
	}

	setFontSize(size) {

		if (size < 5) {
			size = 5
		}

		Settings.code.font_size = size

		this.code.display.wrapper.style.fontSize = size + "px"
		this.code.refresh()
	}

	updateInterface() {
		this.code.setSize(EditorUI.mainarea.getSection(0).getWidth() - 2, EditorUI.mainarea.getSection(0).getHeight()-EditorUI.assetEx_height)
	}

	update() {
		if (Keyboard.isKeyPressed(Keyboard.CTRL)) {
			if (Mouse.wheel !== 0) {
				this.setFontSize(Settings.code.font_size - Mouse.wheel/1000)
			}
		}

	}
}

CodeEditor.id = 0