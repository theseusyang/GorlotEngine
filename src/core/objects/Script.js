class Script extends THREE.Object3D {
	constructor(code_init, code_loop) {
		super()

		// Set default name and object type
		this.name = "script"
		this.type = "Script"

		// Disable auto matrix updates
		this.rotationAutoUpdate = false
		this.matrixAutoUpdate = false

		// Script code
		this.code_loop = "//ADD LOOP CODE HERE"
		this.code_init = "//ADD INITIALIZATION CODE HERE"

		// Compile init and loop code
		if (code_init !== undefined) {
			this.setInitCode(code_init)
		}
		if (code_loop !== undefined) {
			this.setLoopCode(code_loop)
		}

		// Script functions
		this.setLoopCode(this.code_loop)
		this.setInitCode(this.code_init)

		this.components = []
		
		this.defaultComponents = []
		this.defaultComponents.push(new ElementComponent())
	}

	addComponent(component) {
		if (component instanceof Component) {
			this.components.push(component)
		}
	}

	initialize() {
		// Run script
		try {
			this.func_init()
		} catch(e) {}

		for(var i = 0; i < this.children.length; i++) {
			if (this.children[i].initialize != undefined) {
				this.children[i].initialize()
			}
		}
	}

	setInitCode(code) {
		try {
			this.code_init = code
			this.func_init = Function(this.code_init)
		} catch(e) {}
	}

	setLoopCode(code) {
		try {
			this.code_loop = code
			this.func_loop = Function(this.code_loop)
		} catch(e) {console.error(e)}
	}

	update() {
		// Run script
		try {
			this.func_loop()
		} catch (e) {

		}

		for(var i = 0; i < this.children.length; i++) {
			if (this.children[i].update != undefined) {
				this.children[i].update()
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

		object.code_init = this.code_init
		object.code_loop = this.code_loop

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