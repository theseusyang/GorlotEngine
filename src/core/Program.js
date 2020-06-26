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

		// Initialization variables
		this.initial_scene = null
	
		//Runtime variables
		this.scene = null;
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
				this.setInitialScene(this.scene)
			}
		}
	}

	clone() {
		// Clone program, keep uuid and everything else
		var data = this.toJSON()
		var loader = new ObjectLoader()
		return loader.parse(data)
	}

	toJSON(meta) {
		var data = THREE.Object3D.prototype.toJSON.call(this, meta)

		data.description = this.description
		data.author = this.author
		data.version = this.version
		data.vr = this.vr

		if (this.initial_scene !== null) {
			data.initial_scene = this.initial_scene
		}

		return data
	}
}
