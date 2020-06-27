class WebcamTexture {
	constructor() {
		// Check if webcam available
		if (navigator.webkitGetUserMedia || navigator.mozGetUserMedia ? true : false) {
			console.log("Webcam available")
		}

		// Create the video element
		this.video = document.createElement("video")
		this.video.width = 320
		this.video.height = 240
		this.video.autoplay = true
		this.video.loop = true

		if (navigator.webkitGetUserMedia) {
			navigator.webkitGetUserMedia({video: true}, function(stream) {
				video.src = URL.createObjectURL(stream)
			}, (error) => {
				console.warn("No webcam available")
			})
		} else if (navigator.mozGetUserMedia) {
			navigator.mozGetUserMedia({video: true}, (stream) => {
				video.src = URL.createObjectURL(stream)
			}, (error) => {
				console.warn("No webcam available")
			})
		}

		// Create the texture
		this.texture = new THREE.Texture(video)
	}

	update(delta, now) {
		if (this.video.readyState !== this.video.HAVE_ENOUGH_DATA) {
			return
		}
		this.texture.needsUpdate = true
	}

	dispose() {
		this.video.pause()
	}
}