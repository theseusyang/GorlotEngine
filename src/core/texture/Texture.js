class Texture extends THREE.Texture {
	constructor(url) {
		// Create image element
		var img = document.createElement("img")
		img.src = url
		super(img)

		this.img = img
		
		// Source URL
		this.url = url

		// Update texture content
		this.needsUpdate = true
	}

	update() {

	}

	toJSON(meta) {
		// Create JSON description

		if(meta.textures !== undefined) {
			if (meta.textures[this.uuid] !== undefined) {
				return meta.textures[this.uuid]
			}
		}

		function getDataURL(image) {
			var canvas

			if (image.toDataURL !== undefined) {
				canvas = image
			} else {
				canvas = document.createElement("canvas")
				canvas.width = image.width
				canvas.height = image.height
				canvas.getContext("2d").drawImage(image, 0, 0, image.width, image.height)
			}

			if (canvas.width > 1024 || canvas.height > 1024) {
				return canvas.toDataURL("image/jpeg", 0.6)
			} else {
				return canvas.toDataURL("image/jpg")
			}
		}

		var output = {
			metadata: {
				version: 1.0,
				type: "GorlotTexture"
			},

			uuid: this.uuid,
			name: this.name,

			mapping: this.mapping,

			repeat: [this.repeat.x, this.repeat.y],
			offset: [this.offset.x, this.offset.y],
			wrap: [this.wrapS, this.wrapT],

			minFilter: this.minFilter,
			magFilter: this.magFilter,
			ansiotropy: this.ansiotropy
		}

		if (this.image !== undefined) {
			var image = this.image

			if (image.uuid === undefined) {
				image.uuid = THREE.Math.generateUUID()
			}

			if(meta.images !== undefined) {
				if (meta.images[image.uuid] === undefined) {
					meta.images[image.uuid] = {
						uuid: image.uuid,
						url: getDataURL(image)
					}
				}
			}

			output.image = image.uuid
		}

		if(meta.textures !== undefined) {
			meta.textures[this.uuid] = output
		}
		
		return output
	}
}