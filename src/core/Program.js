/*function Program()
{
	//Program Info
	this.name = "program";
	this.description = "";
	this.author = "";
	this.version = "0";

	//Screens
	this.scenes = [];

	//Runtime variables
	this.actual_scene = null;
}

//Function prototypes
//Add scene to program
Program.prototype.addScene = function(scene)
{
	this.scenes.push(scene);
}*/

class Program extends THREE.Object3D {
	constructor(name, description, author, version, vr) {
		super()

		// Program type
		this.type = "Program"

		// Disable auto matrix updates
		this.rotationAutoUpdate = false
		this.matrixAutoUpdate = false

		//Program Info
		this.name = "program";
		this.description = "";
		this.author = "";
		this.version = "0";
		this.vr = false
	
		// Collect arguments
		if (name !== undefined) {
			this.name = name
		}
		if (description !== undefined) {
			this.description = description
		}
		if (author !== undefined) {
			this.author = author
		}
		if (version !== undefined) {
			this.version = version
		}
		if (vr !== undefined) {
			this.vr = vr
		}
	
		//Runtime variables
		this.scene = null;
		this.scenes = []

		// Components
		this.components = []
		this.defaultComponents = []
	}

	addDefaultScene() {
		var scene = new Scene()

		// Sky
		var sky = new Sky()
		sky.auto_update = false
		if (Editor.renameObject !== undefined) {
			Editor.renameObject(sky, sky.name)
		}
		scene.add(sky)

		// Box
		var material = new THREE.MeshPhongMaterial()
		var geometry = new THREE.BoxGeometry(2, 2, 2)
		var model = new Model3D(geometry, material)
		model.receiveShadow = true
		model.castShadow = true
		model.name = "box"
		if (Editor.renameObject !== undefined) {
			Editor.renameObject(model, model.name)
		}
		scene.add(model)

		// Ground
		material = new THREE.MeshPhongMaterial()
		geometry = new THREE.BoxGeometry(20, 1, 20)
		model = new Model3D(geometry, material)
		model.position.set(0, -1.5, 0)
		model.receiveShadow = true
		model.castShadow = true
		model.name = "ground"
		if (Editor.renameObject !== undefined) {
			Editor.renameObject(model, model.name)
		}
		scene.add(model)

		// Add scene to program
		this.add(scene)
		return scene
	}

	remove(scene) {
		if(scene instanceof Scene) {
			var index = this.children.indexOf(scene)
			if (index > -1) {
				this.children.splice(index, 1)
				scene.parent = null
			}

			// If no scene on program, set actual scene to null
			if (this.scenes.length === 0) {
				this.scene = null
			}
		}
	}

	add(scene) {
		if (scene instanceof Scene) {
			this.children.push(scene)
			scene.parent = this

			// If first scene, set as actual scene
			if (this.children.length === 1) {
				this.scene = this.children[0]
			}
		}
	}

	addComponent(compo) {
		return false
	}

	toJSON(meta) {
		var isRootObject = (meta === undefined)
		var output = {}

		// If root object initialize base structure
		if (isRootObject) {
			meta = {
				geometries: {},
				materials: {},
				textures: {},
				images: {}
			}

			output = {
				version: 4.4,
				type: 'Object',
				generator: 'Object3D.toJSON'
			}
		}

		// Program serialization
		var object = {}
		object.uuid = this.uuid
		object.type = this.type
		object.description = this.description
		object.author = this.author
		object.version = this.version
		object.vr = this.vr

		if (this.name !== '') {
			object.name = this.name
		}
		if (JSON.stringify(this.userData) !== '{}') {
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
