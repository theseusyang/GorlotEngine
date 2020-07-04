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
		this.vr_scale = 1
	
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

		// Assets
		this.materials = []
		this.textures = []

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

	addDefaultScene(material) {
		
		if (material === undefined) {
			material = new MeshPhongMaterial({color: 0xffffff, specular: 0x333333, shininess: 30})
			material.name = "default"
		}

		// Create new scene
		var scene = new Scene()

		// Sky
		var sky = new Sky()
		sky.auto_update = false
		if (Editor.renameObject !== undefined) {
			Editor.renameObject(sky, sky.name)
		}
		scene.add(sky)


		// Box
		var geometry = new THREE.BoxBufferGeometry(2, 2, 2)
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
		return new ObjectLoader().parse(this.toJSON())
	}

	// Dispose program data (to avoid memory leaks)
	dispose() {
		// Dispose Materials
		for(var i = 0; i < this.materials.length; i++) {
			this.materials[i].dispose()
		}

		// Dispose Textures
		for(var i = 0; i < this.textures.length; i++) {
			this.textures[i].dispose()
		}
	}

	toJSON(meta) {
		var data = THREE.Object3D.prototype.toJSON.call(this, meta)

		data.object.author = this.author
		data.object.description = this.description
		data.object.version = this.version
		data.object.vr = this.vr
		data.object.vr_scale = this.vr_scale
		data.object.components = this.components

		if (this.initial_scene !== null) {
			data.object.initial_scene = this.initial_scene
		}

		return data
	}
}
