"use strict"

// Webcam texture constructor
class WebcamTexture extends THREE.Texture {
	constructor() {
		// Check if webcam available
		if (navigator.webkitGetUserMedia || navigator.mozGetUserMedia ? true : false) {
			console.log("Webcam available")
		}

		// Create the video element
		var video = document.createElement("video")
		video.width = 256
		video.height = 256
		video.autoplay = true
		video.loop = true

		// Create Texture part of object
		super(video)

		this.video = video

		if (navigator.webkitGetUserMedia) {
			navigator.webkitGetUserMedia({video: true}, function(stream) {
				this.video.src = URL.createObjectURL(stream)
			}, (error) => {
				console.warn("No webcam available")
			})
		} else if (navigator.mozGetUserMedia) {
			navigator.mozGetUserMedia({video: true}, (stream) => {
				this.video.src = URL.createObjectURL(stream)
			}, (error) => {
				console.warn("No webcam available")
			})
		}
	}

	update() {
		if (this.video.readyState >= this.video.HAVE_CURRENT_DATA) {
			this.texture.needsUpdate = true
		}
	}

	dispose() {
		this.video.pause()
		THREE.Texture.prototype.toJSON.call(this)
	}
}