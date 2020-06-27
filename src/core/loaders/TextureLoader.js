class TextureLoader {
	constructor(manager) {
		this.manager = (manager !== undefined) ? manager : THREE.DefaultLoadingManager
	}

	parse(data) {
		// Load image sync
		//TODO: This
	}

	load(url, onLoad, onProgress, onError) {
		if (this.path !== undefined) {url = this.path + url}
	
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

		if (this.crossOrigin !== undefined) {
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