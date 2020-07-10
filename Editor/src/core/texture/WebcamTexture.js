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

		// Self pointer
		var self = this

		if (navigator.webkitGetUserMedia) {
			navigator.webkitGetUserMedia({video: true}, function(stream) {
				self.video.src = URL.createObjectURL(stream)
			}, (error) => {
				console.warn("No webcam available")
			})
		} else if (navigator.mozGetUserMedia) {
			navigator.mozGetUserMedia({video: true}, (stream) => {
				self.video.src = URL.createObjectURL(stream)
			}, (error) => {
				console.warn("No webcam available")
			})
		}

		// Set filtering
		this.minFilter = THREE.LinearFilter
		this.magFilter = THREE.LinearFilter
		this.format = THREE.RGBFormat

		// Name
		this.name = "webcam"
	}
}