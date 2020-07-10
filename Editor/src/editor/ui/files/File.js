"use strict"

// File class
class File {
	constructor(name, parent) {

		if (parent === undefined) {
			this.parent = document.body
		} else {
			this.parent = parent
		}

		this.name = name
		this.attachedTo = null

		this.elm = document.createElement("li")
		this.elm.className = "item"
		var s = Settings.general.file_preview_size
		this.elm.style = "width: " + s + "px; max-width: " + s + "px; display: inline-block; text-align: center; margin-right: 10px; cursor: pointer;"

		this.img = document.createElement("img")
		this.img.style.width = s + "px"
		this.img.style.height = s + "px"
		this.elm.appendChild(this.img)

		this.nameText = document.createElement("p")
		this.nameText.innerHTML = this.name
		this.nameText.style.position = "relative"
		this.nameText.style.bottom = "12"
		this.elm.appendChild(this.nameText)

		this.elm.ondrop = function(e) {
			e.preventDefault()
		}

		this.elm.ondragover = function(e) {
			e.preventDefault()
		}
	}

	attachAsset(asset) {
		if (asset.icon !== undefined) {
			this.img.src = asset.icon
		}

		this.attachedTo = asset
		this.elm.innerHTML = this.elm.innerHTML
	}

	show() {
		this.parent.appendChild(this.elm)
	}
}