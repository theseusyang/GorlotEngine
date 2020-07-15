"use strict"

function Image() {
	this.name = "image"
	this.uuid = THREE.Math.generateUUID()

	this.encoding = Image.PNG
	this.data = null
}

// Image encoding
Image.PNG = 0
Image.JPEG = 1
Image.TGA = 2

// Create JSON description
Image.prototype.toJSON = function() {
	// TODO: This
}