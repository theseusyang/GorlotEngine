class CodeEditor {
	constructor(parent) {

		// Parent
		if (parent === undefined) {
			this.parent = document.body
		} else {
			this.parent = parent
		}

		// ID
		var id = "code" + CodeEditor.id
		CodeEditor.id++

		this.element = document.createElement("div")
		this.element.style.position = "relative"

		// CodeMirror editor
		this.code = new CodeMirror(this.element, {
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
			hintOptions:
			{
				hint: CodeMirror.hint.anyword
			}
		})
		this.code.setOption("theme", Settings.code.theme)
		this.code.setOption("mode", "javascript")

		// Key pressed event
		this.code.on("keydown", (code, event) => {
			var key = event.keyCode
			if (!Keyboard.isKeyPressed(Keyboard.CTRL) && key >= Keyboard.A && key <= Keyboard.Z) {
				if (!code.state.completionActive) {
					CodeMirror.commands.autocomplete(code, null, {completeSingle: false})
				}
			}
		})

		// Context menu event
		this.element.oncontextmenu = function(e) {
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
				title: "Code Editor",
				event: e
			})
		}

		// Self pointer
		var self = this

		this.parent.appendChild(this.element)
	}

	setMode(mode) {
		this.code.setOption("mode", mode)
	}

	setOnChange(callback) {
		this.code.on("change", callback)
	}

	setValue(text) {
		this.code.setValue(text)
	}

	getValue() {
		return this.code.getValue()
	}

	setSize(w, h) {
		this.code.setSize(w, h)
	}
}

CodeEditor.id = 0