"use strict"

// Text texture class
class TextTexture extends THREE.CanvasTexture {
	constructor() {

		// Text canvas
		var canvas = document.createElement("canvas")
		canvas.width = 256
		canvas.height = 256
		
		super(canvas)
		
		// Assign this.canvas to canvas
		this.canvas = canvas

		this.context = this.canvas.getContext("2d")
		this.context.font = "Normal 60px Arial"
		this.context.textAlign = "center"
		this.context.fillStyle = "rgba(255, 255, 255, 1)"
		this.context.fillText("text", this.canvas.width/2, this.canvas.height/2)

		this.text = "text"
		this.needsUpdate = true
	}
}
