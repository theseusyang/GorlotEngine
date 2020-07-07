"use strict"

// Font Loader class
class FontLoader {
	constructor(manager) {
		this.manager = (manager !== undefined) ? manager : THREE.DefaultLoaderManager
	}

	parse(data) {
		return new THREE.Font(JSON.parse(data))
	}

	load(url, onLoad, onProgress, onError) {
		var loader = new THREE.XHRLoader(this.manager)
		loader.load(url, function(text) {
			onLoad(new THREE.Font(JSON.parse(text)))
		}, onProgress, onError)
	}
}