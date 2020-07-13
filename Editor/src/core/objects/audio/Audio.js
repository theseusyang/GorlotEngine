"use strict"

// Audio class
class Audio extends THREE.Audio {
	constructor() {
		super(Audio.listener)

		this.name = "audio"
		this.type = "Audio"

		this.autoplay = true
		this.playbackRate = 1
		this.startTime = 0
		this.source.loop = true

		this.file = "data/test.ogg"

		this.components = []
		this.defaultComponents = []

		this.defaultComponents.push(new ElementComponent())
		this.defaultComponents.push(new Object3DComponent())
		this.defaultComponents.push(new AudioComponent())
	}

	addComponent(compo) {
		if (compo instanceof Component) {
			this.components.push(compo)
		}
	}

	initialize() {
		var self = this

		// Load audio file
		var loader = new THREE.XHRLoader(this.manager)
		loader.setResponseType("arraybuffer")
		loader.load(this.file, (d) => {
			// Code audio data
			THREE.AudioContext.decodeAudioData(d, function(b) {
				self.setBuffer(b)
			})
		})

		// Initialize children
		for(var i = 0; i < this.children.length; i++) {
			this.children[i].initialize()
		}
	}

	// Dispose music
	dispose() {
		if (this.isPlaying) {
			this.stop()
			this.disconnect()
		}

		// Dispose children
		for(var i = 0; i < this.children.length; i++) {
			this.children[i].dispose()
		}
	}

	toJSON(meta) {
		// Create JSON for object
		var data = THREE.Object3D.prototype.toJSON.call(this, meta)

		data.object.autoplay = this.autoplay
		data.object.startTime = this.startTime
		data.object.playbackRate = this.playbackRate

		data.object.source = {}
		data.object.source.loop = this.source.loop

		return data
	}
}

Audio.listener = new THREE.AudioListener()