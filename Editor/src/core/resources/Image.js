"use strict"

// Image constructor
function Image(url) {
	this.name = "image"
	this.uuid = THREE.Math.generateUUID()
	this.type = "Image"

	this.encoding = ""
	this.data = null
        this.format = ""

	if (url !== undefined) {
		var file = new XMLHttpRequest()
		file.open("GET", url, false)
		file.overrideMimeType("text/plain; charset=x-user-defined")
		file.send(null)

		this.encoding = url.split(".").pop()
            this.data = "data:image/" + this.encoding + ";base64," + base64BinaryString(file.response)
            this.format = "base64"
	}

	this.encoding = ""
	this.data = null
}

// Choose proper encoding for image data
Image.prototype.compressData = function() { 
}

// JSON Serialisation
Image.prototype.toJSON = function(meta) {
	
	if (meta.images[this.uuid] !== undefined) {
		return meta.images[this.uuid]
	}

	var data = {}

	data.name = this.name
	data.uuid = this.uuid
	data.type = this.type
	data.encoding = this.encoding
        data.format = this.format
        data.data = this.data

	meta.images[this.uuid] = data

	return data
}
