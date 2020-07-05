"use strict"

// Program class
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
		this.geometries = []

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

	// Screen resize
	resize(x, y) {
		if (this.scene !== null) {
			this.scene.camera.aspect = x/y
			this.scene.camera.updateProjectionMatrix()
		}
	}

	// Select starting scene and initialize that scene
	initialize() {
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

	// Add material to materials list
	addMaterial(material) {
		if (material instanceof THREE.Material) {
			this.materials[material.uuid] = material
		}
	}

	// Remove material from materials list (also receives default, used to replace)
	removeMaterial(material, default_material, default_material_sprite) {
		if (material instanceof THREE.Material) {
		    delete this.materials[material.uuid]

            this.traverse((child) => {
                if(child.material !== undefined) {
                	if (child.material.uuid === material.uuid) {
                		if (child instanceof THREE.Sprite) {
                			child.material = default_material_sprite
                		} else {
                			child.material = default_material
                		}
                	}
                }
            })
        }
	}

	// Add texture to texture list
	addTexture(texture) {
		this.textures[texture.uuid] = texture
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

	// Set as initial scene (from uuid reference)
	setInitialScene(scene) {
		this.initial_scene = scene.uuid
	}

	addDefaultScene(material) {
		
		if (material === undefined) {
			material = new MeshPhongMaterial()
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

	// Remove Scene from program
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

	// Add children to program (Only Scenes allowed)
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

	// Clone program, keep uuid and everything else
	clone() {
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

		// Dispose children
		for(var i = 0; i < this.children.length; i++) {
			this.children[i].dispose()
		}
	}

	toJSON(meta) {
		var self = this

		var data = THREE.Object3D.prototype.toJSON.call(this, meta, (meta, object) => {
    		var textures = self.textures
	    	var materials = self.materials
            var geometries = self.geometries

			// Store textures
			for(var i in textures) {
				var texture = textures[i]
				if (meta.textures[texture.uuid] === undefined) {
					meta.textures[texture.uuid] = texture.toJSON(meta)
				}
			}

			// Store materials
			for(var i in materials) {
				var material = materials[i]
				if (meta.materials[material.uuid] === undefined) {
					meta.materials[material.uuid] = material.toJSON(meta)
				}
			}

            // Store geometries
            for(var i in geometries) {
                var geometry = geometries[i]
                if(meta.geometries[geometry.uuid] === undefined) {
                    meta.geometries[geometry.uuid] = geometry.toJSON(meta)
                }
            }
		})

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
