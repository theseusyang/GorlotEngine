class TextureLoader {
	constructor(manager) {
		//this.manager = (manager !== undefined) ? manager : THREE.DefaultLoadingManager
		if (this.manager !== undefined) {
			this.manager = manager
		} else {
			this.manager = THREE.DefaultLoadingManager
		}

		this.path = null
		this.crossOrigin = null
	}

	load(url, onLoad, onProgress, onError) {
		// Load texture async

		if (this.path !== null) {
			url = this.path + url
		}
	
		// Self pointer
		var self = this
		var cached = Cache.get(url)

		if (cached !== undefined) {
			self.manager.itemStart(url)

			if (onLoad) {
				setTimeout(() => {
					onLoad(cached)
					self.manager.itemEnd(url)
				}, 0)
			} else {
				self.manager.itemEnd(url)
			}

			return cached
		}

		var image = document.createElement("img")

		image.addEventListener("load", (event) => {
			Cache.add(url, this)
			if (onLoad) {
				onLoad(this)
			}
			self.manager.itemEnd(url)
		}, false)

		if (onProgress !== undefined) {
			image.addEventListener("progress", (event) => {
				onProgress(event)
			}, false)
		}

		image.addEventListener("error", (event) => {
			if (onError) {
				onError(event)
			}

			self.manager.itemError(url)
		}, false)

		if (this.crossOrigin !== null) {
			image.crossOrigin = this.crossOrigin
		}

		self.manager.itemStart(url)
		image.src = url

		return image
	}

	setCrossOrigin(value) {
		// Set cross origin directory
		this.crossOrigin = value
	}

	setPath(value) {
		// Set working path for this loader
		this.path = value
	}
}

// Load texture sync
TextureLoader.load = function(url, mapping, onLoad, onError) {
	var loader = new THREE.TextureLoader()
	var texture = loader.load(url, onLoad, undefined, onError)

	if (mapping) {
		texture.mapping = mapping
	}

	return texture
}