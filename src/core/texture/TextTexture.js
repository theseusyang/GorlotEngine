class TextTexture extends THREE.CanvasTexture {
	constructor() {
		var span = document.createElement("span")
		span.innerHTML = "text"
		
		super()
		
		this.text = "text"
		this.span = span
	}

	update() {
		// Update Texture
	}
}