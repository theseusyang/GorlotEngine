class CodeEditor {
	constructor(parent) {
		this.parent = parent

		this.element = document.createElement("div")
		this.element.id = "code"
		this.element.style.position = "absolute"

		// CodeMirror Editor
		this.code = new CodeMirror(this.element, {value: "", lineNumbers: true, mode: "javascript"})
		this.code.setOption("theme", "monokai")
		this.code.setOption("mode", "javascript")

		// Code changed event
		var self = this
		this.code.on("change", function() {
			self.updateScript()
		})

		// Script attached to the editor
		this.script = null

		this.parent.appendChild(this.element)
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
		this.setText(script.code_loop)
	}

	updateScript() {
		if (this.script != null) {
			console.log("Updating to the script")
			this.script.setLoopCode(this.code.getValue())
		}
	}

	updateInterface() {
		this.code.setSize(EditorUI.mainarea.getSection(0).getWidth(), EditorUI.mainarea.getSection(0).getHeight()-EditorUI.assetEx_height-24)

		this.element.style.top = this.parent.style.top
		this.element.style.left = this.parent.style.left
		this.element.style.width = this.parent.style.width
		this.element.style.height= this.parent.style.height
	}
}