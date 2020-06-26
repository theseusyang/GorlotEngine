class Script extends THREE.Object3D {
	constructor(code, mode) {
		super()

		// Set default name and object type
		this.name = "script"
		this.type = "Script"

		// Disable auto matrix updates
		this.rotationAutoUpdate = false

		// Script code
		this.code = "//ADD CODE HERE"
		this.func = null
		this.mode = Script.INIT

		// Get arguments
		if (code !== undefined) {
			this.code = code
		}
		if (mode !== undefined) {
			this.mode = mode
		}

		// Script functions
		this.setCode(this.code)

		this.components = []
		
		this.defaultComponents = []
		this.defaultComponents.push(new ElementComponent())
		this.defaultComponents.push(new ScriptComponent())

	}

	addComponent(component) {
		if (component instanceof Component) {
			this.components.push(component)
		}
	}

	initialize() {
		// Run script
		if(this.mode === Script.INIT) {
			try {
				this.func()
			} catch(e) {}
		}

		for(var i = 0; i < this.children.length; i++) {
			if (this.children[i].initialize !== undefined) {
				this.children[i].initialize()
			}
		}
	}

	update() {
		// Run script
		if(this.mode === Script.LOOP) {
			try {
				this.func()
			} catch (e) {}
		}

		for(var i = 0; i < this.children.length; i++) {
			if (this.children[i].update !== undefined) {
				this.children[i].update()
			}
		}
	}

	setCode(code) {
		try {
			this.code = code
			this.func = Function(this.code)
		} catch(e) {}
	}

	setMode(mode) {
		// Set mode
		this.mode = mode
	}

	stop() {
		for(var i = 0; i < this.children.length; i++) {
			if (this.children[i].stop !== undefined) {
				this.children[i].stop()
			}
		}
	}

	toJSON(meta) {
		// TODO: This should be in every object, so we can store and save their components
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

		// Script serialization
		var object = {}
		object.uuid = this.uuid
		object.type = this.type

		object.code = this.code
		object.mode = this.mode

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
			var materials = extractFromCache(meta.materials)
			var textures = extractFromCache(name.textures)
			var images = extractFromCache(meta.images)

			if (geometries.lenght > 0) {
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
			for(var key in cache) {
				var data = cache[key]
				delete data.metadata
				values.push(data)
			}

			return values
		}
	}
}

// Script modes
Script.INIT = 0
Script.LOOP = 1