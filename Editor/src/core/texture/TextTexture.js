class TextTexture extends THREE.CanvasTexture {
	constructor() {

		var canvas = document.createElement("canvas")
		canvas.width = 256
		canvas.height = 256
		
		super(canvas)
		
		this.canvas = canvas

		this.context2d = this.canvas.getContext("2d")
		this.context2d.font = "Normal 60px Arial"
		this.context2d.textAlign = "center"
		this.context2d.fillStyle = "rgba(255, 255, 255, 1)"
		this.context2d.fillText("text", this.canvas.width/2, this.canvas.height/2)

		this.text = "TEXT"
		this.needsUpdate = true
	}

	update() {
		// Update Texture
	}
}
