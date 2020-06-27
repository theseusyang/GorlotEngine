class FontLoader {
	constructor(manager) {
		this.manager = (manager !== undefined) ? manager : THREE.DefaultLoaderManager
	}

	parse(data) {
		var font = new THREE.Font(JSON.parse(data.substring(65, data.length - 2)))
		return font
	}

	load(url, onLoad, onProgress, onError) {
		var loader = new THREE.XHRLoader(this.manager)
		loader.load(url, function(text) {
			onLoad(new THREE.Font(JSON.parse(text.substring(65, text.length - 2))))
		}, onProgress, onError)
	}
}