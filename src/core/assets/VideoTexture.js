class VideoTexture {
	constructor(url) {
		// Creates video element
		this.video = document.createElement("video")
		this.video.width = 320
		this.video.height = 240
		this.video.autoplay = true
		this.video.loop = true
		this.video.src = url

		// Create the texture
		this.texture = new THREE.Texture(video)
	}

	update() {
		// Update texture state
		if (this.video.readyState !== this.video.HAVE_ENOUGH_DATA) {
			return
		}
		this.texture.needsUpdate = true
	}

	dispose() {
		// Dispose texture
		this.video.pause()
	}
}