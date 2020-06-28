class Program extends THREE.Object3D {
	constructor(name, description, author, version, vr) {
		super()

		// Program type
		this.name = "Program"
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

		// Initial values
		this.initial_scene = null
		this.default_camera = null

		//Runtime variables
		this.renderer = null
		this.scene = null;
		this.data = function(){}

		this.components = []
		
		this.defaultComponents = []
		this.defaultComponents.push(new ProgramComponent())
	}

	resize(x, y) {
		// Screen resize
		if (this.scene !== null) {
			this.scene.camera.aspect = x/y
			this.scene.camera.updateProjectionMatrix()
		}
	}

	initialize() {
		// Select starting scene and initialize that scene
		if (this.initial_scene !== null) {
			console.log("not null uwu")
			for(var i = 0; i < this.children.length; i++) {
				if (this.children[i].uuid === this.initial_scene) {
					this.setScene(this.children[i])
					break
				}
			}
		} else {
			this.setScene(this.children[0])
		}
	}

	setScene(scene) {
		if (scene instanceof Scene) {
			this.scene = scene
			this.scene.initialize()
			
			if (this.scene.camera === null) {
				this.scene.camera = this.default_camera
			}
		}
	}

	setInitialScene(scene) {
		this.initial_scene = scene.uuid
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

		var material = new THREE.MeshPhongMaterial({color: 0xffffff, specular: 0x333333, shininess: 60})
		var geometry = new THREE.BoxBufferGeometry(2, 2, 2)

		// Box
		var model = new Model3D(geometry, material)
		model.position.set(0, 2, 0)
		model.receiveShadow = true
		model.castShadow = true
		model.name = "box"
		if (Editor.renameObject !== undefined) {
			Editor.renameObject(model, model.name)
		}
		scene.add(model)

		// Ground
		model = new Model3D(geometry, material)
		model.scale.set(20, 1, 20)
		model.position.set(0, 0, 0)
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
		// Remove Scene
		var index = this.children.indexOf(scene)
		if (index > -1) {
			this.children.splice(index, 1)
			scene.parent = null
		}

		// If no scene on program, set actual scene to null
		if (this.children.length === 0) {
			this.scene = null
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

	clone() {
		// Clone program, keep uuid and everything else
		var data = this.toJSON()
		var loader = new ObjectLoader()
		return loader.parse(data)
	}

	dispose() {
		// Dispose program data (to avoid memory leaks)
		// TODO: This
	}

	toJSON(meta) {
		var isRootObject = (meta === undefined);
		var output = {};

		//If root object initialize base structure
		if(isRootObject)
		{
			meta =
			{
				geometries: {},
				materials: {},
				textures: {},
				images: {}
			};

			output.metadata =
			{
				version: 4.4,
				type: 'Object',
				generator: 'Object3D.toJSON'
			};
		}

		var object = {};

		object.uuid = this.uuid;
		object.type = this.type;
		object.description = this.description;
		object.author = this.author;
		object.version = this.version;
		object.vr = this.vr;
		object.components = this.components;
		object.name = this.name;

		if(this.initial_scene !== null)
		{
			object.initial_scene = this.initial_scene;
		}
		if(JSON.stringify(this.userData) !== '{}')
		{
			object.userData = this.userData;
		}

		object.castShadow = (this.castShadow === true);
		object.receiveShadow = (this.receiveShadow === true);
		object.visible = !(this.visible === false);

		object.matrix = this.matrix.toArray();

		if(this.geometry !== undefined)
		{
			if(meta.geometries[ this.geometry.uuid ] === undefined)
			{
				meta.geometries[ this.geometry.uuid ] = this.geometry.toJSON( meta );
			}

			object.geometry = this.geometry.uuid;
		}

		if(this.material !== undefined)
		{
			if(meta.materials[this.material.uuid] === undefined)
			{
				meta.materials[this.material.uuid] = this.material.toJSON(meta);
			}

			object.material = this.material.uuid;
		}

		//Collect children data
		if(this.children.length > 0)
		{
			object.children = [];

			for(var i = 0; i < this.children.length; i ++)
			{
				object.children.push( this.children[ i ].toJSON(meta).object);
			}
		}

		if(isRootObject)
		{
			var geometries = extractFromCache(meta.geometries);
			var materials = extractFromCache(meta.materials);
			var textures = extractFromCache(meta.textures);
			var images = extractFromCache(meta.images);

			if(geometries.length > 0)
			{
				output.geometries = geometries;
			}
			if(materials.length > 0)
			{
				output.materials = materials;
			}
			if(textures.length > 0)
			{
				output.textures = textures;
			}
			if(images.length > 0)
			{
				output.images = images;
			}
		}

		output.object = object;
		return output;

		//Extract data from the cache hash remove metadata on each item and return as array
		function extractFromCache(cache)
		{
			var values = [];
			for(var key in cache)
			{
				var data = cache[ key ];
				delete data.metadata;
				values.push( data );
			}

			return values;
		}
	}
}
