class Text3D extends THREE.Mesh {
	constructor(text, font, material) {
		super(new THREE.TextGeometry(text, {font: font}), material)

		this.name = "text"
		this.type = "Text3D"

		this.font = font
		this.text = text

		this.scale.set(0.01, 0.01, 0.01)

		this.components = []

		this.defaultComponents = []
		this.defaultComponents.push(new ElementComponent())
		this.defaultComponents.push(new Text3DComponent())
	}

	addComponent(component) {
		if (component instanceof Component) {
			this.components.push(component)
		}
	}

	initialize() {
		for(var i = 0; i < this.children.length; i++) {
			if (this.children[i].initialize !== undefined) {
				this.children[i].initialize()
			}
		}
	}

	setText(text) {
		this.text = text
		this.geometry = new THREE.TextGeometry(this.text, {font: this.font})
	}

	update() {
		for(var i = 0; i < this.children.length; i++) {
			if (this.children[i].update !== undefined) {
				this.children[i].update
			}
		}
	}

	stop() {
		for(var i = 0; i < this.children.length; i++) {
			if (this.children[i].stop !== undefined) {
				this.children[i].stop()
			}
		}
	}

	toJSON(meta) {
		var isRootObject = (meta === undefined)
		var output = {}

		// If root object, initialize base structure
		if (isRootObject) {
			meta = {
				geometries: {},
				materials: {},
				textures: {},
				images: {}
			}

			output.metadata = {
				version: 4.4,
				type: 'Object',
				generator: 'Object3D.toJSON'
			}
		}

		// Text Serialization
		var object = {}
		object.uuid = this.uuid
		object.type = this.type

		object.text = this.text
		object.components = this.components

		if (this.name !== "") {
			object.name = this.name
		}
		if (JSON.stringify(this.userData) !== "{}") {
			object.userData = this.userData
		}

		object.castShadow = (this.castShadow === true)
		object.receiveShadow = (this.receiveShadow === true)
		object.visible = !(this.visible === false)

		object.matrix = this.matrix.toArray

		if (this.geometry !== undefined) {
			if (meta.geometries[this.geometry.uuid] === undefined) {
				meta.geometries[this.geometry.uuid] = this.geometry.toJSON(meta)
			}

			object.geometry = this.geometry.uuid
		}

		if (this.material !== undefined) {
			if (meta.materials[this.material.uuid] === undefined) {
				meta.materials[this.material.uuid] = this.material.toJSON(meta)
			}

			object.material = this.material.uuid
		}

		// Collect children data
		if (this.children.length > 0) {
			object.children = []

			for(var i = 0; i < this.children.length; i++) {
				object.children.push(this.children[i].toJSON(meta).object)
			}
		}

		if (isRootObject) {
			var geometries = extractFromCache(meta.geometries)
			var materials = extractFromCache(meta.materials)
			var textures = extractFromCache(meta.textures)
			var images = extractFromCache(meta.images)

			if (geometries.length > 0) {
				output.geometries = geometries
			}
			if (materials.length > 0) {
				output.materials = materials
			}
			if (textures.length > 0) {
				output.textures = textures
			}
			if (images.length > 0) {
				output.images = images
			}
		}

		output.object = object
		return output

		// Extract data from the cache hash, remove metadata on each item and return as array
		function extractFromCache(cache) {
			var values = []
			for(var key in cache) {
				var data = cache[key]
				delete data.metadata
				values.push(data)
			}

			return values
		}
	}
}