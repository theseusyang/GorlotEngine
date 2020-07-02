class Audio extends THREE.Audio {
	constructor() {
		super(Audio.listener)

		this.name = "audio"
		this.type = "Audio"

		this.autoplay = false
		this.file = "data/test.ogg"

		this.components = []
		this.defaultComponents = []

		this.defaultComponents.push(new ElementComponent())
		this.defaultComponents.push(new Object3DComponent())
	}

	addComponent(compo) {
		if (compo instanceof Component) {
			this.components.push(compo)
		}
	}

	initialize() {
		// Load audio file
		var self = this
		var loader = new THREE.AudioLoader()
		loader.load(this.file, function(buffer) {
			self.setBuffer(buffer)
			if (self.autoplay) {
				self.play()
			}
		})

		// Initialize children
		for(var i = 0; i < this.children.length; i++) {
			this.children[i].initialize()
		}
	}

	update() {
		for(var i = 0; i < this.children.length; i++) {
			this.children[i].update()
		}
	}

	stop() {
		for(var i = 0; i < this.children.length; i++) {
			this.children[i].stop()
		}
	}

	toJSON(meta) {
		// Create JSON for object
		var data = THREE.Object3D.prototype.toJSON.call(this, meta)

		data.autoplay = this.autoplay
		data.startTime = this.startTime
		data.playbackRate = this.playbackRate

		return data
	}
}

Audio.listener = new THREE.AudioListener()