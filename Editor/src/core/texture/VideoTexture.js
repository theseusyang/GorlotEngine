class VideoTexture extends THREE.Texture {
	constructor(url) {
		// Creates video element
		var video = document.createElement("video")
		video.width = 256
		video.height = 256
		video.autoplay = true
		video.loop = true
		video.src = url

		// Create Texture part of the object
		super(video)
		this.video = video

		// Source URL
		this.url = url

		// Don't generate mipmaps
		this.generateMipmaps = false
	}

	update() {
		// Update texture state
		if (this.video.readyState >= this.video.HAVE_CURRENT_DATA) {
			this.texture.needsUpdate = true
		}
	}

	dispose() {
		// Dispose texture
		this.video.pause()
		THREE.Texture.prototype.toJSON.call(this)
	}
}