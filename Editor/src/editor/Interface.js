"use strict"

function Interface() {}

// Initialise interface
Interface.initialize = function() {
	// File directory
	Interface.file_dir = "src/editor/files/"

	// ------------------------------------ Tab Container ------------------------------------
	Interface.tab = new TabGroup()

	// ------------------------------------ Asset Manager ------------------------------------
	Interface.asset_explorer_div = new DivisionResizable()
	Interface.asset_explorer_div.resizable_side = DivisionResizable.TOP
	Interface.asset_explorer_div.size.y = 200
	Interface.asset_explorer_div.resize_size_min = 100
	Interface.asset_explorer_div.resize_size_max = 400

	// Asset Explorer
	Interface.asset_explorer = new AssetExplorer(Interface.asset_explorer_div.element)
	Interface.asset_explorer.files_size.set(Settings.general.file_preview_size, Settings.general.file_preview_size)

	// Asset Explorer menu bar
	Interface.asset_explorer_bar = new Bar(Interface.asset_explorer_div.element)
	Interface.asset_explorer_bar.position.set(0, 0)
	Interface.asset_explorer_bar.size.y = 20

	// Create an asset
	Interface.asset_new = new DropdownMenu(Interface.asset_explorer_bar.element)
	Interface.asset_new.setText("Add New")
	Interface.asset_new.size.set(100, Interface.asset_explorer_bar.size.y)
	Interface.asset_new.position.set(0, 0)

	// Create materials
	var asset_material = Interface.asset_new.addMenu("Materials", Interface.file_dir + "icons/misc/material.png")

	asset_material.addOption("Standard Material", () => {
		var material = new MeshStandardMaterial()
		material.name = "standard"
		Editor.program.addMaterial(material)
		Editor.updateObjectViews()
	})

	asset_material.addOption("Phong Material", () => {
		var material = new MeshPhongMaterial()
		material.name = "phong"
		Editor.program.addMaterial(material)
		Editor.updateObjectViews()
	})

	asset_material.addOption("Basic Material", () => {
		var material = new MeshBasicMaterial()
		material.name = "basic"
		Editor.program.addMaterial(material)
		Editor.updateObjectViews()
	})

	asset_material.addOption("Lambert Material", () => {
		var material = new MeshLambertMaterial()
		material.name = "lambert"
		Editor.program.addMaterial(material)
		Editor.updateObjectViews()
	})

	asset_material.addOption("Sprite Material", () => {
		var material = new THREE.SpriteMaterial({color: 0xffffff})
		material.name = "sprite"
		Editor.program.addMaterial(material)
		Editor.updateObjectViews()
	})

	var asset_material_others = asset_material.addMenu("Others")
	asset_material_others.addOption("Shader Material", () => {
		var material = new MeshShaderMaterial()
		material.name = "shader"
		Editor.program.addMaterial(material)
		Editor.updateObjectViews()
	})

	asset_material_others.addOption("Normal Material", () => {
		var material = new MeshNormalMaterial()
		material.name = "normal"
		Editor.program.addMaterial(material)
		Editor.updateObjectViews()
	})

	asset_material_others.addOption("Depth Material", () => {
		var material = new MeshDepthMaterial()
		material.name = "depth"
		Editor.program.addMaterial(material)
		Editor.updateObjectViews()
	})

	Interface.asset_new.addOption("Class Blocks", () => {
		var obj = new BlockScript(undefined, undefined, "class")
		obj.name = "class"
		Editor.program.addObject(obj)
		Editor.updateAssetExplorer()
	})

	// Import a file
	Interface.asset_file = new DropdownMenu(Interface.asset_explorer_bar.element)
	Interface.asset_file.setText("Import")
	Interface.asset_file.size.set(100, Interface.asset_explorer_bar.size.y)
	Interface.asset_file.position.set(100, 0)

	var import_models = Interface.asset_file.addMenu("3D Models", Interface.file_dir + "icons/models/models.png")

	// Import an OBJ file
	import_models.addOption("Wavefront", () => {
		App.chooseFile((files) => {
			if (files.length > 0) {
				var file = files[0].path
				var loader = new THREE.OBJLoader()
				var obj = loader.parse(FileSystem.readFile(file))
				Editor.addToScene(obj)
			}
		}, ".obj")
	})

	// Import a collada file
	import_models.addOption("Collada", () => {
		App.chooseFile((files) => {
			if (files.length > 0) {
				var file = files[0].path
				var loader = new THREE.ColladaLoader()
				loader.options.convertUpAxis = true
				var collada = loader.parse(FileSystem.readFile(file))
				var scene = collada.scene
				Editor.addToScene(scene)
			}
		}, ".dae")
	})

	// ThreeJS file format menu
	var import_models_three = import_models.addMenu("three.js")

	// ThreeJS Object Loader
	import_models_three.addOption("Object Loader", () => {
		App.chooseFile((files) => {
			if (files.length > 0) {
				var file = files[0].path
				var loader = new THREE.ObjectLoader()
				var object = loader.parse(JSON.parse(FileSystem.readFile(file)))
				Editor.addToScene(object)
			}
		}, ".json")
	})

	// ThreeJS JSON Loader
	import_models_three.addOption("JSON Loader", () => {
		App.chooseFile((files) => {
			if (files.length > 0) {
				var file = files[0].path
				var loader = new THREE.JSONLoader()
				var data = loader.parse(JSON.parse(FileSystem.readFile(file)))
				var materials = data.materials
				var geometry = data.geometry

				// Create material object
				var material = null
				if (material === undefined || material.length === 0) {
					material = new MeshStandardMaterial()
					material.name = "standard"
				} else if (materials.length === 1) {
					material = material[0]
				} else if (materials.length > 1) {
					material = new THREE.MultiMaterial(materials)
				}

				// Create model
				var model = null
				if (geometry.bones.length > 0) {
					model = new SkinnedMesh(geometry, material)
				} else {
					model = new Mesh(geometry, material)
				}

				Editor.addToScene(model)
			}
		}, ".json")
	})

	// GLTF File Loader
	import_models.addOption("GLTF", () => {
		App.chooseFile((files) => {
			if (files.length > 0) {
				var file = files[0].path
				var loader = new THREE.GLTFLoader()
				var gltf = loader.parse(FileSystem.readFile(file))

				if (gltf.scene !== undefined) {
					Editor.addToScene(gltf.scene)
				}
			}
		}, ".gltf")
	})

	// AWD File Loader
	import_models.addOption("AWD", () => {
		App.chooseFile((files) => {
			if (files.length > 0) {
				var file = files[0].path
				var loader = new THREE.AWDLoader()
				var awd = loader.parse(FileSystem.readFileArrayBuffer(file))
				Editor.addToScene(awd)
			}
		}, ".awd")
	})

	// PLY File Loader
	import_models.addOption("PLY", () => {
		App.chooseFile((files) => {
			if (files.length > 0) {
				var file = files[0].path
				var loader = new THREE.PLYLoader()
				var geometry = loader.parse(FileSystem,readFile(file))
				Editor.addToScene(new Mesh(geometry))
			}
		}, ".ply")
	})

	// VTK File loader
	import_models.addOption("VTK", () => {
		App.chooseFile((files) => {
			if (files.length > 0) {
				var file = files[0].path
				var loader = new THREE.VTKLoader()
				var geometry = loader.parse(FileSystem.readFileArrayBuffer(file))
				Editor.addToScene(new Mesh(geometry))
			}
		}, ".vtk, .vtp")
	})

	// VRML File Loader
	import_models.addOption("VRML", () => {
		App.chooseFile((files) => {
			if (files.length > 0) {
				var file = files[0].path
				var loader = new THREE.VRMLLoader()
				var scene = loader.parse(FileSystem.readFile(file))

				for(var i = 0; i < scene.children.length; i++) {
					Editor.addToScene(scene.children[i])
				}

			}
		}, ".wrl, .vrml")
	})

	// FBX
	import_models.addOption("FBX", () => {
		App.chooseFile((files) => {
			if (files.length > 0) {
				var file = files[0].path
				var loader = new THREE.FBXLoader()
				var obj = loader.parse(FileSystem.readFile(file))
				Editor.addToScene(obj)
			}
		}, ".fbx")
	})

	// Load Spine Animation
	Interface.asset_file.addOption("Spine Animation", () => {
		App.chooseFile((files) => {
			if (files.length > 0) {
				var file = files[0].path

				var json = FileSystem.readFile(file)
				var atlas = FileSystem.readFile(file.replace("json", "atlas"))
				var path = file.substring(0, file.lastIndexOf("/"))

				var animation = new SpineAnimation(json, atlas, path)

				Editor.addToScene(animation)
				Editor.updateObjectViews()
			}
		}, ".json")
	}, Interface.file_dir + "icons/animation/spine.png")

	// Texture
	Interface.asset_file.addOption("Texture", () => {
		App.chooseFile((files) => {
			if (files.length > 0) {
				var file = files[0].path
				var texture = new Texture(new GORLOT.Image(file))
				texture.name = "texture"
				var material = new MeshPhongMaterial({map: texture, color: 0xffffff})
				material.name = "texture"
				Editor.program.addMaterial(material)
				Editor.updateObjectViews()
			}
		}, "image/*")
	}, Interface.file_dir + "icons/assets/image.png")

	// Video Texture
	Interface.asset_file.addOption("Video Texture", () => {
		App.chooseFile((files) => {
			if (files.length > 0) {
				var file = files[0].path
				var texture = new VideoTexture(new Video(file))
				var material = new MeshPhongMaterial({map: texture, color: 0xffffff})
				material.name = "video"
				Editor.program.addMaterial(material)
				Editor.updateObjectViews()
			}
		}, "video/*")
	}, Interface.file_dir + "icons/assets/video.png")

	// Webcam Texture
	Interface.asset_file.addOption("Webcam Texture", () => {
		var texture = new WebcamTexture()
		var material = new MeshPhongMaterial({map: texture, color: 0xffffff})
		material.name = "webcam"
		Editor.program.addMaterial(material)
		Editor.updateObjectViews()
	}, Interface.file_dir + "icons/hw/webcam.png")

	// Load font
	Interface.asset_file.addOption("Font", () => {
		App.chooseFile((files) => {
			if (files.length > 0) {
				var file = files[0].path
				Editor.addToScene(new Text3D("Text", Editor.default_material, new Font(file)))
				Editor.updateObjectViews()
			}
		}, ".json, ttf, .otf")
	}, Interface.file_dir + "icons/assets/font.png")

	// Load audio file
	Interface.asset_file.addOption("Audio", () => {
		App.chooseFile((files) => {
			if (files.length > 0) {
				var file = files[0].path
				var audio = new AudioEmitter(new Audio(file))
				Editor.addToScene(audio)
				Editor.updateObjectViews()
			}
		}, "audio/*")
	}, Interface.file_dir + "icons/assets/audio.png")

	// ------------------------------------ Explorer ------------------------------------
	Interface.explorer = new DivisionResizable()
	Interface.explorer.size.x = 300
	Interface.explorer.resize_size_min = 100

	Interface.explorer_resizable = new DualDivisionResizable(Interface.explorer.element)
	Interface.explorer_resizable.orientation = DualDivisionResizable.VERTICAL
	Interface.explorer_resizable.tab_position = 0.4

	// Project Explorer
	Interface.tree_view = new TreeView(Interface.explorer_resizable.div_a)

	// Object Components
	Interface.panel = new Panel(Interface.explorer_resizable.div_b)

	// ------------------------------------ Left Div ------------------------------------
	Interface.left_div = new DivisionResizable()
	Interface.left_div.resizable_side = DivisionResizable.RIGHT
	Interface.left_div.size.x = 350
	Interface.left_div.resize_size_min = 300
	Interface.left_div.resize_size_max = 400
	Interface.left_div.element.style.pointerEvents = "auto"

	Interface.left_tabs = new TabGroup(Interface.left_div.element)
	Interface.left_tabs.button_size.set(120, 30)
	Interface.left_tabs.element.style.cursor = "default"
	Interface.left_tabs.element.style.backgroundColor = Editor.theme.bar_color
	Interface.left_tabs.mode = TabGroup.LEFT
	Interface.left_tabs.updateInterface()

	Interface.basic_tab = Interface.left_tabs.addTab("Basic", Interface.file_dir + "icons/models/models.png", false)
	Interface.basic_tab.element.style.backgroundColor = Editor.theme.bar_color
	Interface.basic_tab.element.style.overflowY = "auto"

	Interface.lights_tab = Interface.left_tabs.addTab("Lights", Interface.file_dir + "icons/lights/point.png", false)
	Interface.lights_tab.element.style.backgroundColor = Editor.theme.bar_color
	Interface.lights_tab.element.style.overflowY = "auto"

	Interface.cinematic_tab = Interface.left_tabs.addTab("Cinematic", Interface.file_dir + "icons/camera/camera.png", false)
	Interface.cinematic_tab.element.style.backgroundColor = Editor.theme.bar_color
	Interface.cinematic_tab.element.style.overflowY = "auto"

	Interface.effects_tab = Interface.left_tabs.addTab("Effects", Interface.file_dir + "icons/effects/particles.png", false)
	Interface.effects_tab.element.style.backgroundColor = Editor.theme.bar_color
	Interface.effects_tab.element.style.overflowY = "auto"

	Interface.physics_tab = Interface.left_tabs.addTab("Physics", Interface.file_dir + "icons/physics/physics.png", false)
	Interface.physics_tab.element.style.backgroundColor = Editor.theme.bar_color
	Interface.physics_tab.element.style.overflowY = "auto"

	Interface.hw_tab = Interface.left_tabs.addTab("Device", Interface.file_dir + "icons/hw/hw.png", false)
	Interface.hw_tab.element.style.backgroundColor = Editor.theme.bar_color
	Interface.hw_tab.element.style.overflowY = "auto"


	// By default the "basic" tab is selected
	Interface.left_tabs.selectTab(0)
	var sizex = 270 //Interface.left_tabs.options_size.x)//(Interface.left_div.size.x-Interface.left_tabs.options_size.x)

	// ------------------------------------ Basic ------------------------------------
	Interface.basic_form = new Form(Interface.basic_tab.element)
	Interface.basic_form.position.set(0, 0)
	Interface.basic_form.spacing.set(0, 0)
	Interface.basic_tab.attachComponent(Interface.basic_form)

	// Cube
	var cube = new Button(Interface.basic_form.element)
	cube.position.set(0, 0)
	cube.size.set(sizex, 45)
	cube.setText("Cube")
	cube.setCallback(() => {
		var geometry = new THREE.BoxBufferGeometry(1, 1, 1)
		var model = new Mesh(geometry, Editor.default_material)
		model.name = "cube"
		Editor.addToScene(model)
	})
	cube.updateInterface()

	var cubeIcon = new ImageBox(cube.element)
	cubeIcon.size.set(40, 40)
	cubeIcon.position.set(5, 2)
	cubeIcon.setImage(Interface.file_dir + "icons/models/cube.png")
	cubeIcon.updateInterface()

	Interface.basic_form.add(cube)
	Interface.basic_form.nextRow()

	// Cylinder
	var cylinder = new Button(Interface.basic_form.element)
	cylinder.size.set(sizex, 45)
	cylinder.setText("Cylinder")
	cylinder.setCallback(() => {
		var geometry = new THREE.CylinderBufferGeometry(1, 1, 2, 32)
		var model = new Mesh(geometry, Editor.default_material)
		model.name = "cylinder"
		Editor.addToScene(model)
	})
	cylinder.updateInterface()

	var cylinderIcon = new ImageBox(cylinder.element)
	cylinderIcon.size.set(40, 40)
	cylinderIcon.position.set(5, 2)
	cylinderIcon.setImage(Interface.file_dir + "icons/models/cylinder.png")
	cylinderIcon.updateInterface()

	Interface.basic_form.add(cylinder)
	Interface.basic_form.nextRow()

	// Sphere
	var sphere = new Button(Interface.basic_form.element)
	sphere.size.set(sizex, 45)
	sphere.setText("Sphere")
	sphere.setCallback(() => {
		var geometry = new THREE.SphereBufferGeometry(1, 32, 32)
		var model = new Mesh(geometry, Editor.default_material)
		model.name = "sphere"
		Editor.addToScene(model)
	})
	sphere.updateInterface()

	var sphereIcon = new ImageBox(sphere.element)
	sphereIcon.size.set(40, 40)
	sphereIcon.position.set(5, 2)
	sphereIcon.setImage(Interface.file_dir + "icons/models/sphere.png")
	sphereIcon.updateInterface()

	Interface.basic_form.add(sphere)
	Interface.basic_form.nextRow()

	// Torus
	var torus = new Button(Interface.basic_form.element)
	torus.size.set(sizex, 45)
	torus.setText("Torus")
	torus.setCallback(() => {
		var geometry = new THREE.TorusBufferGeometry(1, 0.5, 16, 96)
		var model = new Mesh(geometry, Editor.default_material)
		model.name = "cone"
		Editor.addToScene(model)
	})
	torus.updateInterface()

	var torusIcon = new ImageBox(torus.element)
	torusIcon.size.set(40, 40)
	torusIcon.position.set(5, 2)
	torusIcon.setImage(Interface.file_dir + "icons/models/torus.png")
	torusIcon.updateInterface()

	Interface.basic_form.add(torus)
	Interface.basic_form.nextRow()

	// Pyramid
	var pyramid = new Button(Interface.basic_form.element)
	pyramid.size.set(sizex, 45)
	pyramid.setText("Cone")
	pyramid.setCallback(() => {
		var geometry = new THREE.ConeBufferGeometry(1, 2, 32)
		var model = new Mesh(geometry, Editor.default_material)
		model.name = "cone"
		Editor.addToScene(model)
	})

	var pyramidIcon = new ImageBox(pyramid.element)
	pyramidIcon.size.set(40, 40)
	pyramidIcon.position.set(5, 2)
	pyramidIcon.setImage(Interface.file_dir + "icons/models/cone.png")
	pyramidIcon.updateInterface()

	Interface.basic_form.add(pyramid)
	Interface.basic_form.nextRow()

	// Text
	var text = new Button(Interface.basic_form.element)
	text.size.set(sizex, 45)
	text.setText("3D Text")
	text.setCallback(() => {
		var model = new Text3D("text", Editor.default_material, Editor.default_font)
		Editor.addToScene(model)
	})

	var textIcon = new ImageBox(text.element)
	textIcon.size.set(40, 40)
	textIcon.position.set(5, 2)
	textIcon.setImage(Interface.file_dir + "icons/models/text.png")
	textIcon.updateInterface()

	Interface.basic_form.add(text)
	Interface.basic_form.nextRow()

	// Plane
	var plane = new Button(Interface.basic_form.element)
	plane.size.set(sizex, 45)
	plane.setText("Plane")
	plane.setCallback(() => {
		var geometry = new THREE.PlaneBufferGeometry(1, 1)
		var model = new Mesh(geometry, Editor.default_material)
		model.receiveShadow = true
		model.castShadow = true
		model.name = "plane"
		Editor.addToScene(model)
	})

	var planeIcon = new ImageBox(plane.element)
	planeIcon.size.set(40, 40)
	planeIcon.position.set(5, 2)
	planeIcon.setImage(Interface.file_dir + "icons/models/plane.png")
	planeIcon.updateInterface()

	Interface.basic_form.add(plane)
	Interface.basic_form.nextRow()

	// ------------------------------------ Lights ------------------------------------
	Interface.lights_form = new Form(Interface.lights_tab.element)
	Interface.lights_form.position.set(0, 0)
	Interface.lights_form.spacing.set(0, 0)
	Interface.lights_tab.attachComponent(Interface.lights_form)

	// Point
	var point = new Button(Interface.lights_form.element)
	point.size.set(sizex, 45)
	point.setText("Point")
	point.setCallback(() => {
		Editor.addToScene(new PointLight(0x444444))
	})

	var pointIcon = new ImageBox(point.element)
	pointIcon.size.set(40, 40)
	pointIcon.position.set(5, 2)
	pointIcon.setImage(Interface.file_dir + "icons/lights/point.png")
	pointIcon.updateInterface()

	Interface.lights_form.add(point)
	Interface.lights_form.nextRow()

	// Ambient
	var ambient = new Button(Interface.lights_form.element)
	ambient.size.set(sizex, 45)
	ambient.setText("Ambient")
	ambient.setCallback(() => {
		Editor.addToScene(new AmbientLight(0x444444))
	})

	var ambientIcon = new ImageBox(ambient.element)
	ambientIcon.size.set(40, 40)
	ambientIcon.position.set(5, 2)
	ambientIcon.setImage(Interface.file_dir + "icons/lights/ambient.png")
	ambientIcon.updateInterface()

	Interface.lights_form.add(ambient)
	Interface.lights_form.nextRow()

	// Spot
	var spot = new Button(Interface.lights_form.element)
	spot.size.set(sizex, 45)
	spot.setText("Spot")
	spot.setCallback(() => {
		Editor.addToScene(new SpotLight(0x444444))
	})

	var spotIcon = new ImageBox(spot.element)
	spotIcon.size.set(40, 40)
	spotIcon.position.set(5, 2)
	spotIcon.setImage(Interface.file_dir + "icons/lights/spot.png")
	spotIcon.updateInterface()

	Interface.lights_form.add(spot)
	Interface.lights_form.nextRow()

	// Directional
	var directional = new Button(Interface.lights_form.element)
	directional.size.set(sizex, 45)
	directional.setText("Directional")
	directional.setCallback(() => {
		Editor.addToScene(new DirectionalLight(0x444444))
	})

	var directionalIcon = new ImageBox(directional.element)
	directionalIcon.size.set(40, 40)
	directionalIcon.setImage(Interface.file_dir + "icons/lights/directional.png")
	directionalIcon.updateInterface()

	Interface.lights_form.add(directional)
	Interface.lights_form.nextRow()

	// Hemisphere
	var hemisphere = new Button(Interface.lights_form.element)
	hemisphere.size.set(sizex, 45)
	hemisphere.setText("Hemisphere")
	hemisphere.setCallback(() => {
		Editor.addToScene(new HemisphereLight(0x444444))
	})

	var hemisphereIcon = new ImageBox(hemisphere.element)
	hemisphereIcon.size.set(40, 40)
	hemisphereIcon.position.set(5, 2)
	hemisphereIcon.setImage(Interface.file_dir + "icons/lights/hemisphere.png")
	hemisphereIcon.updateInterface()

	Interface.lights_form.add(hemisphere)
	Interface.lights_form.nextRow()

	// Sky
	var sky = new Button(Interface.lights_form.element)
	sky.size.set(sizex, 45)
	sky.setText("Sky")
	sky.setCallback(() => {
		Editor.addToScene(new Sky())
	})

	var skyIcon = new ImageBox(sky.element)
	skyIcon.size.set(40, 40)
	skyIcon.position.set(5, 2)
	skyIcon.setImage(Interface.file_dir + "icons/lights/sky.png")
	skyIcon.updateInterface()

	Interface.lights_form.add(sky)
	Interface.lights_form.nextRow()

	// ------------------------------------ Cinematic ------------------------------------
	Interface.cinematic_form = new Form(Interface.cinematic_tab.element)
	Interface.cinematic_form.position.set(0, 0)
	Interface.cinematic_form.spacing.set(0, 0)
	Interface.cinematic_tab.attachComponent(Interface.cinematic_form)

	// Perspective
	var perspective = new Button(Interface.cinematic_form.element)
	perspective.size.set(sizex, 45)
	perspective.setText("Perspective")
	perspective.setCallback(() => {
		Editor.addToScene(new PerspectiveCamera(60, Editor.canvas.width/Editor.canvas.height))
	})

	var perspectiveIcon = new ImageBox(perspective.element)
	perspectiveIcon.size.set(40, 40)
	perspectiveIcon.position.set(5, 2)
	perspectiveIcon.setImage(Interface.file_dir + "icons/camera/perspective.png")
	perspectiveIcon.updateInterface()

	Interface.cinematic_form.add(perspective)
	Interface.cinematic_form.nextRow()

	// Orthographic
	var orthographic = new Button(Interface.cinematic_form.element)
	orthographic.size.set(sizex, 45)
	orthographic.setText("Orthographic")
	orthographic.setCallback(() => {
		Editor.addToScene(new OrthographicCamera(3, 2, OrthographicCamera.FIXED_VERTICAL))
	})

	var orthographicIcon = new ImageBox(orthographic.element)
	orthographicIcon.size.set(40, 40)
	orthographicIcon.position.set(5, 2)
	orthographicIcon.setImage(Interface.file_dir + "icons/camera/orthographic.png")
	orthographicIcon.updateInterface()

	Interface.cinematic_form.add(orthographic)
	Interface.cinematic_form.nextRow()

	// ------------------------------------ Effects ------------------------------------
	Interface.effects_form = new Form(Interface.effects_tab.element)
	Interface.effects_form.position.set(0, 0)
	Interface.effects_form.spacing.set(0, 0)
	Interface.effects_tab.attachComponent(Interface.effects_form)

	// Scene blocks
	var blocks = new Button(Interface.effects_form.element)
	blocks.size.set(sizex, 45)
	blocks.setText("Scene Blocks")
	blocks.setCallback(() => {
		Editor.addToScene(new BlockScript())
	})

	var blocksIcon = new ImageBox(blocks.element)
	blocksIcon.size.set(40, 40)
	blocksIcon.position.set(5, 2)
	blocksIcon.setImage(Interface.file_dir + "icons/script/blocks.png")
	blocksIcon.updateInterface()

	Interface.effects_form.add(blocks)
	Interface.effects_form.nextRow()

	// Class blocks
//	blocks = new Button(Interface.effects_form.element)
//	blocks.size.set(sizex, 45)
//	blocks.setText("Class Blocks")
//	blocks.setCallback(() => {
//		var obj = new BlockScript(undefined, undefined, "class")
//		obj.name = "class"
//		Editor.program.addObject(obj)
//		Editor.updateAssetExplorer()
//	})
//
//	blocksIcon = new ImageBox(blocks.element)
//	blocksIcon.size.set(40, 40)
//	blocksIcon.position.set(5, 2)
//	blocksIcon.setImage(Interface.file_dir + "icons/script/blocks.png")
//	blocksIcon.updateInterface()
//
//	Interface.effects_form.add(blocks)
//	Interface.effects_form.nextRow()

	// Script
	var script = new Button(Interface.effects_form.element)
	script.size.set(sizex, 45)
	script.setText("Script")
	script.setCallback(() => {
		Editor.addToScene(new Script())
	})

	var scriptIcon = new ImageBox(script.element)
	scriptIcon.size.set(40, 40)
	scriptIcon.position.set(5, 2)
	scriptIcon.setImage(Interface.file_dir + "icons/script/script.png")
	scriptIcon.updateInterface()

	Interface.effects_form.add(script)
	Interface.effects_form.nextRow()

	// Sprite
	var sprite = new Button(Interface.effects_form.element)
	sprite.size.set(sizex, 45)
	sprite.setText("Sprite")
	sprite.setCallback(() => {
		Editor.addToScene(new Sprite(Editor.default_sprite_material))
	})

	var spriteIcon = new ImageBox(sprite.element)
	spriteIcon.size.set(40, 40)
	spriteIcon.position.set(5, 2)
	spriteIcon.setImage(Interface.file_dir + "icons/effects/sprite.png")
	spriteIcon.updateInterface()

	Interface.effects_form.add(sprite)
	Interface.effects_form.nextRow()

	// Particle Emitter
	var particle = new Button(Interface.effects_form.element)
	particle.size.set(sizex, 45)
	particle.setText("Particles")
	particle.setCallback(() => {
		Editor.addToScene(new ParticleEmitter())
	})

	var particleIcon = new ImageBox(particle.element)
	particleIcon.size.set(40, 40)
	particleIcon.position.set(5, 2)
	particleIcon.setImage(Interface.file_dir + "icons/effects/particles.png")
	particleIcon.updateInterface()

	Interface.effects_form.add(particle)
	Interface.effects_form.nextRow()

	// Empty
	var empty = new Button(Interface.effects_form.element)
	empty.size.set(sizex, 45)
	empty.setText("Empty")
	empty.setCallback(() => {
		Editor.addToScene(new Container())
	})

	var emptyIcon = new ImageBox(empty.element)
	emptyIcon.size.set(40, 40)
	emptyIcon.position.set(5, 2)
	emptyIcon.setImage(Interface.file_dir + "icons/effects/container.png")
	emptyIcon.updateInterface()

	Interface.effects_form.add(empty)
	Interface.effects_form.nextRow()

	// Audio
	var audio = new Button(Interface.effects_form.element)
	audio.size.set(sizex, 45)
	audio.setText("Audio")
	audio.setCallback(() => {
		Editor.addToScene(new AudioEmitter(Editor.default_audio))
	})

	var audioIcon = new ImageBox(audio.element)
	audioIcon.size.set(40, 40)
	audioIcon.position.set(5, 2)
	audioIcon.setImage(Interface.file_dir + "icons/assets/audio.png")
	audioIcon.updateInterface()

	Interface.effects_form.add(audio)
	Interface.effects_form.nextRow()

	// ------------------------------------ Physics ------------------------------------
	Interface.physics_form = new Form(Interface.physics_tab.element)
	Interface.physics_form.position.set(0, 0)
	Interface.physics_form.spacing.set(0, 0)
	Interface.physics_tab.attachComponent(Interface.physics_form)

	// Box
	cube = new Button(Interface.physics_form.element)
	cube.size.set(sizex, 45)
	cube.setText("Cube")
	cube.setCallback(() => {
		var obj = new PhysicsObject()
		obj.body.addShape(new CANNON.Box(new CANNON.Vec3(0.5, 0.5, 0.5)))
		obj.name = "box"
		Editor.addToScene(obj)
	})

	cubeIcon = new ImageBox(cube.element)
	cubeIcon.size.set(40, 40)
	cubeIcon.position.set(5, 2)
	cubeIcon.setImage(Interface.file_dir + "icons/models/cube.png")
	cubeIcon.updateInterface()

	Interface.physics_form.add(cube)
	Interface.physics_form.nextRow()

	// Sphere
	sphere = new Button(Interface.physics_form.element)
	sphere.size.set(sizex, 45)
	sphere.setText("Sphere")
	sphere.setCallback(() => {
		var obj = new PhysicsObject()
		obj.body.addShape(new CANNON.Sphere(1.0))
		obj.name = "sphere"
		Editor.addToScene(obj)
	})

	sphereIcon = new ImageBox(sphere.element)
	sphereIcon.size.set(40, 40)
	sphereIcon.position.set(5, 2)
	sphereIcon.setImage(Interface.file_dir + "icons/models/sphere.png")
	sphereIcon.updateInterface()

	Interface.physics_form.add(sphere)
	Interface.physics_form.nextRow()

	// Cylinder
	cylinder = new Button(Interface.physics_form.element)
	cylinder.size.set(sizex, 45)
	cylinder.setText("Cylinder")
	cylinder.setCallback(() => {
		var obj = new PhysicsObject()
		obj.body.addShape(new CANNON.Cylinder(1.0, 1.0, 2.0, 8))
		obj.name = "cylinder"
		Editor.addToScene(obj)
	})

	cylinderIcon = new ImageBox(cylinder.element)
	cylinderIcon.size.set(40, 40)
	cylinderIcon.position.set(5, 2)
	cylinderIcon.setImage(Interface.file_dir + "icons/models/cylinder.png")
	cylinderIcon.updateInterface()

	Interface.physics_form.add(cylinder)
	Interface.physics_form.nextRow()

	// Plane
	plane = new Button(Interface.physics_form.element)
	plane.size.set(sizex, 45)
	plane.setText("Ground")
	plane.setCallback(() => {
		var obj = new PhysicsObject()
		obj.rotation.x = -1.57
		obj.body.addShape(new CANNON.Plane())
		obj.body.type = CANNON.Body.KINEMATIC
		obj.name = "ground"
		Editor.addToScene(obj)
	})

	planeIcon = new ImageBox(plane.element)
	planeIcon.size.set(40, 40)
	planeIcon.position.set(5, 2)
	planeIcon.setImage(Interface.file_dir + "icons/models/plane.png")
	planeIcon.updateInterface()

	Interface.physics_form.add(plane)
	Interface.physics_form.nextRow()

	// Point
	var point = new Button(Interface.physics_form.element)
	point.size.set(sizex, 45)
	point.setText("Point")
	point.setCallback(() => {
		var obj = new PhysicsObject()
		obj.body.addShape(new CANNON.Particle())
		obj.name = "particle"
		Editor.addToScene(obj)
	})

	var pointIcon = new ImageBox(point.element)
	pointIcon.size.set(40, 40)
	pointIcon.position.set(5, 2)
	pointIcon.setImage(Interface.file_dir + "icons/models/point.png")
	pointIcon.updateInterface()

	Interface.physics_form.add(point)
	Interface.physics_form.nextRow()

	// ------------------------------------ HW ------------------------------------
	Interface.hw_form = new Form(Interface.hw_tab.element)
	Interface.hw_form.position.set(0, 0)
	Interface.hw_form.spacing.set(0, 0)
	Interface.hw_tab.attachComponent(Interface.hw_form)

	// Leap Motion
	var leap = new Button(Interface.hw_form.element)
	leap.size.set(sizex, 45)
	leap.setText("Leap")
	leap.setCallback(() => {
		Editor.addToScene(new LeapMotion())
	})

	var leapIcon = new ImageBox(leap.element)
	leapIcon.size.set(40, 40)
	leapIcon.position.set(5, 2)
	leapIcon.setImage(Interface.file_dir + "icons/hw/leap.png")
	leapIcon.updateInterface()

	Interface.hw_form.add(leap)
	Interface.hw_form.nextRow()

	// Kinect
	var kinect = new Button(Interface.hw_form.element)
	kinect.size.set(sizex, 45)
	kinect.setText("Kinect")
	kinect.setCallback(() => {
		Editor.addToScene(new KinectDevice())
	})

	var kinectIcon = new ImageBox(kinect.element)
	kinectIcon.size.set(40, 40)
	kinectIcon.position.set(5, 2)
	kinectIcon.setImage(Interface.file_dir + "icons/hw/kinect.png")
	kinectIcon.updateInterface()

	Interface.hw_form.add(kinect)
	Interface.hw_form.nextRow()

	// ------------------------------------ Top Bar ------------------------------------
	Interface.top_bar = new Bar()
	Interface.top_bar.size.y = 25

	// Editor Logo
	Interface.image = new ImageBox()
	Interface.image.setImage("src/editor/files/logo.png")
	Interface.image.size.set(108, 18)
	Interface.image.updateInterface()

	// File
	Interface.file = new DropdownMenu()
	Interface.file.setText("File")
	Interface.file.size.set(120, Interface.top_bar.size.y)
	Interface.file.position.set(0, 0)

	// New Project
	Interface.file.addOption("New", () => {
		Interface.newProgram()
	}, Interface.file_dir + "icons/misc/new.png")

	// Save Project
	Interface.file.addOption("Save", () => {
		Interface.saveProgram()
	}, Interface.file_dir + "icons/misc/save.png")

	// Load Project
	Interface.file.addOption("Load", () => {
		Interface.loadProgram()
	})

	var publish = Interface.file.addMenu("Export")

	publish.addOption("Web", () => {
		App.chooseFile((files) => {
			try {
				Editor.exportWebProject(files[0].path)
			} catch(e) {
				alert("Error exporting project (" + e + ")")
			}
		}, "", Editor.program.name)
	}, Interface.file_dir + "icons/platform/web.png")

	publish.addOption("Windows", () => {
		App.chooseFile((files) => {
			try {
				Editor.exportWindowsProject(files[0].path)
			} catch(e) {
				alert("Error exporting project (" + e + ")")
			}
		}, "", Editor.program.name)
	}, Interface.file_dir + "icons/platform/windows.png")

	publish.addOption("Linux", () => {
		alert("TODO: This")
	}, Interface.file_dir + "icons/platform/linux.png")

	publish.addOption("macOS", () => {
		alert("TODO: This")
	}, Interface.file_dir + "icons/platform/osx.png")

	Interface.file.addOption("Exit", () => {
		if (confirm("All unsaved changes to the project will be lost! Do you really want to exit?")) {
			Editor.exit()
		}
	}, Interface.file_dir + "icons/misc/exit.png")

	// Edit
	Interface.editor = new DropdownMenu()
	Interface.editor.setText("Edit")
	Interface.editor.size.set(100, Interface.top_bar.size.y)
	Interface.editor.position.set(120, 0)

	Interface.editor.addOption("Undo", () => {
		Editor.undo()
	}, Interface.file_dir + "icons/misc/undo.png")

	Interface.editor.addOption("Redo", () => {
		Editor.redo()
	}, Interface.file_dir + "icons/misc/redo.png")

	Interface.editor.addOption("Copy", () => {
		Editor.copyObject()
	}, Interface.file_dir + "icons/misc/copy.png")

	Interface.editor.addOption("Cut", () => {
		Editor.cutObject()
	}, Interface.file_dir + "icons/misc/cut.png")

	Interface.editor.addOption("Paste", () => {
		Editor.pasteObject()
	}, Interface.file_dir + "icons/misc/paste.png")

	Interface.editor.addOption("Delete", () => {
		Editor.deleteObject()
	}, Interface.file_dir + "icons/misc/delete.png")

	Interface.editor.addOption("Settings", () => {
		// Check if there is already a settings tab
		var found = false
		for(var i = 0; i < Interface.tab.options.length; i++) {
			if (Interface.tab.options[i].component instanceof SettingsTab) {
				found = true
				Interface.tab.options[i].select()
				break
			}
		}

		// If not, create one
		if (!found) {
			var tab = Interface.tab.addTab("Settings", Interface.file_dir + "icons/tab/settings.png", true)
			var settings = new SettingsTab(tab.element)
			tab.attachComponent(settings)
			tab.select()
		}
	}, Interface.file_dir + "icons/tab/settings.png")

	// Project
	Interface.project = new DropdownMenu()
	Interface.project.setText("Project")
	Interface.project.size.set(100, Interface.top_bar.size.y)
	Interface.project.position.set(220, 0)

	Interface.project.addOption("Create Scene", () => {
		Editor.program.addDefaultScene()
		Editor.updateObjectViews()
	}, Interface.file_dir + "icons/misc/add.png")

	Interface.project.addOption("Execute Script", () => {
		App.chooseFile((files) => {
			try {
				if (files.length > 0) {
					var code = FileSystem.readFile(files[0].path)
					var func = Function(code)
					func()
				}
			} catch(e) {
				alert("Error: " + e)
			}
		}, ".js")
	}, Interface.file_dir + "icons/script/script.png")

	// About
	Interface.about = new Button()
	Interface.about.setText("About")
	Interface.about.size.set(100, Interface.top_bar.size.y)
	Interface.about.position.set(320, 0)
	Interface.about.updateInterface()
	Interface.about.setCallback(() => {
		// Check if there is already an about tab
		var found = false
		for(var i = 0; i < Interface.tab.options.length; i++) {
			if (Interface.tab.options[i].component instanceof AboutTab) {
				found = true
				Interface.tab.options[i].select()
				break
			}
		}

		// If not, create one
		if (!found) {
			var tab = Interface.tab.addTab("About", Interface.file_dir + "icons/misc/about.png", true)
			var about = new AboutTab(tab.element)
			tab.attachComponent(about)
			tab.select()
		}
	})

	// Run
	Interface.run = new Button()
	Interface.run.setText("Run")
	Interface.run.size.set(100, Interface.top_bar.size.y)
	Interface.run.position.set(420, 0)
	Interface.run.updateInterface()
	Interface.run.setCallback(() => {
		if (Editor.state === Editor.STATE_EDITING) {
			Editor.setState(Editor.STATE_TESTING)
		} else if (Editor.state === Editor.STATE_TESTING) {
			Editor.setState(Editor.STATE_EDITING)
		}
	})
}

// Loop pdate elements
Interface.update = function() {
	Interface.left_div.update()
	Interface.explorer.update()
	Interface.asset_explorer_div.update()
	Interface.explorer_resizable.update()
	Interface.tab.update()
}

// Update interface
Interface.updateInterface = function() {
	// Window size
	var size = new THREE.Vector2(window.innerWidth, window.innerHeight)

	// ------------------------------------ Menu Top Bar ------------------------------------
	Interface.top_bar.size.x = size.x
	Interface.top_bar.updateInterface()

	// Logo
	Interface.image.position.set(size.x - Interface.image.size.x, 3)
	Interface.image.updateInterface()

	// ------------------------------------ Project Explorer ------------------------------------
	Interface.explorer.size.y = (size.y - Interface.top_bar.size.y)
	Interface.explorer.position.set(size.x - Interface.explorer.size.x, Interface.top_bar.size.y)
	Interface.explorer.resize_size_max = size.x * 0.7
	Interface.explorer.updateInterface()

	Interface.explorer_resizable.size.set(Interface.explorer.size.x - Interface.explorer.resize_tab_size, Interface.explorer.size.y)
	Interface.explorer_resizable.updateInterface()

	Interface.tree_view.updateInterface()
	Interface.panel.updateInterface()

	// ------------------------------------ Asset Explorer ------------------------------------
	Interface.asset_explorer_div.size.x = size.x - Interface.explorer.size.x
	Interface.asset_explorer_div.position.set(0, size.y - Interface.asset_explorer_div.size.y)
	Interface.asset_explorer_div.resize_size_max = size.y * 0.6
	Interface.asset_explorer_div.updateInterface()

	Interface.asset_explorer_bar.size.x = Interface.asset_explorer_div.size.x
	Interface.asset_explorer_bar.updateInterface()

	Interface.asset_explorer.size.x = Interface.asset_explorer_div.size.x
	Interface.asset_explorer.position.y = Interface.asset_explorer_bar.size.y
	Interface.asset_explorer.size.y = Interface.asset_explorer_div.size.y - Interface.asset_explorer.position.y
	Interface.asset_explorer.updateInterface()

	// ------------------------------------ Left Div ------------------------------------
	Interface.left_div.position.set(0, Interface.top_bar.size.y)
	Interface.left_div.size.y = size.y - Interface.asset_explorer_div.size.y - Interface.top_bar.size.y //size.y - Interface.top_bar.size.y
	Interface.left_div.updateInterface()

	Interface.left_tabs.size.copy(Interface.left_div.size)
	Interface.left_tabs.updateInterface()

	// ------------------------------------ Tab Container ------------------------------------
	Interface.tab.position.set(Interface.left_div.size.x, Interface.top_bar.size.y)
	Interface.tab.size.x = (size.x - Interface.left_div.size.x - Interface.explorer.size.x)
	Interface.tab.size.y = (size.y - Interface.top_bar.size.y - Interface.asset_explorer_div.size.y)
	Interface.tab.updateInterface()

	// Resize editor camera
	Editor.resizeCamera()
}

// Open the save program window
Interface.saveProgram = function() {
	App.chooseFile((files) => {
		try {
			Editor.saveProgram(files[0].path)
			alert("Program saved")
		} catch(e) {
			alert("Error saving file\n(" + e + ")")
		}
	}, ".isp", true)
}

// Open the load program window
Interface.loadProgram = function() {
	if (confirm("All unsaved changes to the project will be lost! Load file?")) {
		App.chooseFile((files) => {
			try {
				Editor.loadProgram(files[0].path)
				Editor.resetEditingFlags()
				Editor.updateObjectViews()
				alert("Project loaded")
			} catch(e) {
				alert("Error loading file\n(" + e + ")")
			}
		}, ".isp")
	}
}

// Interface element to create new program
Interface.newProgram = function() {
	if (confirm("All unsaved changes to the project will be lost! Create new file?")) {
		Editor.createNewProgram()
		Editor.updateObjectViews()
	}
}