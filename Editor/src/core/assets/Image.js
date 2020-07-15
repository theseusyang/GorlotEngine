"use strict"

function Image() {
	this.name = "image"
	this.uuid = THREE.Math.generateUUID()

	this.encoding = ""
	this.data = null
}

// Create JSON description
Image.prototype.toJSON = function(meta) {
	// TODO: This
}