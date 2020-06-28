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
}