"use strict"

// Webcam texture constructor
class WebcamTexture extends THREE.Texture {
	constructor() {
		// Check if webcam available
		if (navigator.webkitGetUserMedia || navigator.mediaDevices.getUserMedia) {
			console.log("Webcam available")
		}

		// Create the video element
		var video = document.createElement("video")
		video.width = 512
		video.height = 512
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
		} else if (navigator.mediaDevices.getUserMedia) {
			navigator.mediaDevices.getUserMedia({video: true}, (stream) => {
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