class AbsButton {
	constructor(parent, text, zIndex, callback) {

		this.button = document.createElement("button")
		this.button.id = "button"
		this.button.className = "litebutton"
		this.button.innerHTML = text
		this.button.style.zIndex = zIndex
		this.button.style.position = "absolute"
		this.button.onclick = callback

		this.position = new THREE.Vector2(0,0)
		this.size = new THREE.Vector2(1, 1)
		this.visible = true

		parent.appendChild(this.button)
	}

	updateInterface() {
		if (this.visible) {
			this.button.style.visibility = "visible"
		} else {
			this.button.style.visibility = "hidden"
		}

		this.button.style.top = this.position.y + "px"
		this.button.style.left = this.position.x + "px"

		this.button.style.width = this.size.x + "px"
		this.button.style.height = this.size.y + "px"
	}
}