class AssetExplorerImportWindow {
	constructor() {
		// TODO: Icons
		
		this.dialog = new LiteGUI.Dialog( {id: "dialog_import", title: "Import", close: true, minize: true, width: 324, height: 300, scroll: false, draggable: true} )
		this.dialog.on_close = function() {
			Editor.clickable = true
		}

		this.selected_object = null

		this.objects = [
			{
				name: "Wavefront",
			},
			{
				name: "DAE"
			},
			{
				name: "JSON"
			},
			{
				name: "GLTF"
			},
			{
				name: "VRML"
			},
			{
				name: "FBX"
			},
			{
				name: "Texture"
			},
			{
				name: "Video Texture"
			},
			{
				name: "Webcam Texture"
			},
			{
				name: "Font"
			},
			{
				name: "Audio"
			}
		]

		var self = this

		this.widgets = new LiteGUI.Inspector()

		this.objectList = this.widgets.addList(null, this.objects, {height: this.dialog.height-20, callback_dblclick: function(v) {
			self.selected_object = v.name
			self.add()
			self.close()
		}})

		this.dialog.add(this.widgets)
		this.dialog.center()
	}

	add() {
		var o = this.selected_object

		if (o === "Wavefront") {

			App.chooseFile((f) => {
				try {
					var loader = new THREE.OBJLoader()
					var obj = loader.parse(App.readFile(f))

					Editor.addToScene(obj)
				} catch(e) {
					console.error("Error importing Object: " + e)
				}
			}, ".obj")

		}
		else if (o === "DAE") {

			App.chooseFile((f) => {
				try {
					var loader = new THREE.ColladaLoader()
					loader.options.convertUpAxis = true
					var collada = loader.parse(App.readFile(f))
					var scene = collada.scene

					Editor.addToScene(scene)
				} catch(e) {
					console.error("Error importing Object: " + e)
				}
			}, ".dae")

		}
		else if (o === "JSON") {

			App.chooseFile((f) => {
				try {
					var loader = new THREE.JSONLoader()
					loader.load(f, (g, m) => {
						var material = new MeshStandardMaterial()
						var obj = new AnimatedModel(g, material)
						Editor.addToScene(obj)
					})
				} catch (e) {
					console.error("Error importing Object: " + e)
				}
			}, ".json")

		}
		else if (o === "GLTF") {

			App.chooseFile((f) => {
				try {
					var loader = new THREE.GLTFLoader()
					var gltf = loader.parse(App.readFile(f))
					var scene = gltf.scene
					if (scene !== undefined) {
						Editor.addToScene(scene)
					}
				} catch (e) {
					console.error("Error importing Object: " + e)
				}
			}, ".gltf")

		}
		else if (o === "VRML") {

			App.chooseFile((f) => {
				try {
					var loader = new THREE.VRMLLoader()
					var scene = loader.parse(App.readFile(f))

					for(var i = 0; i < scene.children.length; i++) {
						Editor.addToScene(scene.children[i])
					}
				} catch(e) {
					console.error("Error importing Object: " + e)
				}
			}, ".wrl, .vrml")

		}
		else if (o === "FBX") {

			App.chooseFile((f) => {
				try {
					var loader = new THREE.FBXLoader()
					var obj = loader.parse(App.readFile(f))

					Editor.addToScene(obj)
				} catch(e) {
					console.error("Error importing Object: " + e)
				}
			}, ".fbx")

		}
		else if (o === "Texture") {

			App.chooseFile((f) => {
				try {
					var texture = new Texture(f)
					texture.name = "texture"
					var material = new MeshPhongMaterial({map: texture, color: 0xffffff})
					material.name = "texture"
					Editor.program.addMaterial(material)
					Editor.updateObjectViews()
				} catch(e) {
					console.error("Error loading Texture: " + e)
				}
			}, "image/*")

		}
		else if (o === "Video") {

			App.chooseFile((f) => {
				try {
					var texture = new VideoTexture(f)
					texture.name = "video"
					var material = new MeshPhongMaterial({map: texture, color: 0xffffff})
					material.name = "video"
					Editor.program.addMaterial(material)
					Editor.updateObjectViews()
				} catch(e) {
					console.error("Error loading Video: " + e)
				}
			}, "video/*")

		}
		else if (o === "Webcam Texture") {

			var texture = new WebcamTexture()
			texture.name = "webcam"
			var material = new MeshPhongMaterial({map: texture, color: 0xffffff})
			material.name = "webcam"
			Editor.program.addMaterial(material)
			Editor.updateObjectViews()

		}
		else if (o === "Font") {

			App.chooseFile((f) => {
				try {
					// TODO: This
				} catch(e) {
					console.error("Error loading font: " + e)
				}
			}, ".json, .ttf, .otf")

		}
		else if (o === "Audio") {

			App.chooseFile((f) => {
				try {
					// TODO: This
				} catch(e) {
					console.error("Error loading audio: " + e)
				}
			}, "audio/*")

		}
	}

	show() {
		this.dialog.show("fade")
		Editor.clickable = false
	}

	close() {
		this.dialog.close()
	}
}