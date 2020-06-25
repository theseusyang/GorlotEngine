// TODO: make this useful, I mean, when you can code (using scripts) add all the available functions to the blueprints system

class Blueprints extends THREE.Object3D {
	constructor(blueprints) {
		super()

		this.name = "blueprints"
		this.type = "Blueprints"

		// Disable auto matrix updates
		this.rotationAutoUpdate = false
		this.matrixAutoUpdate = false

		// Data
		if(blueprints !== undefined) {
			this.data = blueprints
		}

		// Components
		this.components = []

		this.defaultComponents = []
		this.defaultComponents.push(new ElementComponent())
	}

	initialize() {
		for(var i = 0; i < this.children.length; i++) {
			if (this.children[i].initialize != undefined) {
				this.children[i].initialize()
			}
		}
	}

	update() {
		// TODO: Compile  (Using LGraph without LGraphcanvas)

		for(var i = 0; i < this.children.length; i++) {
			if (this.children[i].update !== undefined) {
				this.children[i].update()
			}
		}
	}

	setData(data) {
		this.data = data
	}

	getData() {
		return this.data
	}

	toJSON(meta) {
		var isRootObject = (meta === undefined)
		var output = {}

		// If root object, initialise base structure
		if (isRootObject) {
			meta = {
				geometry: {},
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

		// Blueprints serialisation
		var object = {}
		object.uuid = this.uuid
		object.type = this.type

		object.blueprints = this.data

		if (this.name !== "") {
			object.name = this.name
		}
		if (JSON.stringify(this.userData) !== "{}") {
			object.userData = this.userData
		}

		object.castShadow = (this.castShadow === true)
		object.receiveShadow = (this.receiveShadow === true)
		object.visible = !(this.visible === false)

		object.matrix = this.matrix.toArray()

		object.components = this.components

		if (this.geometry !== undefined) {
			if (meta.geometries[this.geometry.uuid] === undefined) {
				meta.geometries[this.geometry.uuid] = this.geometry.toJSON(meta)
			}

			object.geometry = this.geometry.uuid
		}

		if (this.material !== undefined) {
			if (meta.geometries[this.geometry.uuid] === undefined) {
				meta.geometries[this.geometry.uuid] = this.geometry.toJSON(meta)
			}

			object.geometry = this.geometry.uuid
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
			var material = extractFromCache(meta.materials)
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

		// Extract data from cache hash, remove metadata on each item and return as array
		function extractFromCache(cache) {
			var values = []
			for(key in cache) {
				var data = cache[key]
				delete data.metadata
				values.push(data)
			}

			return values
		}
	}
}