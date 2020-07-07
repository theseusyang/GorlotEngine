"use strict"

// Font Loader class
class FontLoader {
	constructor(manager) {
		this.manager = (manager !== undefined) ? manager : THREE.DefaultLoaderManager
	}

	parse(data) {
		return new THREE.Font(JSON.parse(data.substring(65, data.length - 2)))
	}

	load(url, onLoad, onProgress, onError) {
		var loader = new THREE.XHRLoader(this.manager)
		loader.load(url, function(text) {
			onLoad(new THREE.Font(JSON.parse(text.substring(65, text.length - 2))))
		}, onProgress, onError)
	}
}