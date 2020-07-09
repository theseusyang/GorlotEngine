"use strict"

// Video Texture class
class VideoTexture extends THREE.VideoTexture {
	constructor(url) {
		// Creates video element
		var video = document.createElement("video")
		video.width = 256
		video.height = 256
		video.autoplay = true
		video.loop = true

		// Create Texture part of the object
		super(video)
		this.video = video

		// Set filtering
		this.minFilter = THREE.LinearFilter
		this.magFilter = THREE.LinearFilter
		this.format = THREE.RGBFormat

		// Name
		this.name = "video"
	}

	dispose() {
		// Dispose texture
		if (!this.video.paused) {
			this.video.pause()
		}
		THREE.Texture.prototype.toJSON.call(this)
	}
}