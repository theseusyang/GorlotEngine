class AddMenuWindow {
	constructor() {
		// TODO: Add Icons
		this.dialog = new LiteGUI.Dialog( {id: "dialog_add", title: "Add Objects", close: true, minimize: true, width: 400, height: 463, scroll: false, draggable: true} )
		this.dialog.on_close = function() {
			Editor.clickable = true
		}

		this.selected_object = null

		this.objects = [
			{
				"name": "Cube",
				"icon": "data/icons/models/cube.png"
			},
			{
				"name": "Cylinder",
				"icon": "data/icons/models/cylinder.png"
			},
			{
				"name": "Sphere",
				"icon": "data/icons/models/sphere.png"
			},
			{
				"name": "Torus",
				"icon": "data/icons/models/torus.png"
			},
			{
				"name": "Pyramid",
				"icon": "data/icons/models/pyramid.png"
			},
			{
				"name": "Empty",
				"icon": "data/icons/models/squares.png"
			},
			{
				"name": "Text",
				"icon": "data/icons/models/text.png"
			},
			{
				"name": "Point Light",
				"icon": "data/icons/lights/point.png"
			},
			{
				"name": "Ambient Light",
				"icon": "data/icons/lights/ambient.png"
			},
			{
				"name": "Spot Light",
				"icon": "data/icons/lights/spot.png"
			},
			{
				"name": "Directional Light",
				"icon": "data/icons/lights/directional.png"
			},
			{
				"name": "Hemisphere Light",
				"icon": "data/icons/lights/hemisphere.png"
			},
			{
				"name": "Sky",
				"icon": "data/icons/lights/sky.png"
			},
			{
				"name": "Perspective Camera",
				"icon": "data/icons/camera/perspective.png"
			},
			{
				"name": "Orthographic Camera",
				"icon": "data/icons/camera/orthographic.png"
			},
			{
				"name": "Script",
				"icon": "data/icons/script/script.png"
			},
			{
				"name": "Blueprints",
				"icon": "data/icons/script/blueprints.png"
			},
			{
				"name": "Sprite",
				"icon": "data/icons/effects/sprite.png"
			},
			{
				"name": "Particles",
				"icon": "data/icons/effects/particles.png"
			}
		]

		var self = this

		this.widgets = new LiteGUI.Inspector()

		this.objectList = this.widgets.addList(null, this.objects, {height: this.dialog.height,callback_dblclick: function(v) {
			self.selected_object = v.name
			self.add()
			self.close()
		}})

		this.dialog.add(this.widgets)
		this.dialog.center()
	}

	add() {
		var o = this.selected_object

		if (o === "Cube") {
			var geometry = new THREE.BoxGeometry(1, 1, 1)
			var material = new THREE.MeshPhongMaterial()
			var model = new Model3D(geometry, material)
			model.receiveShadow = true
			model.castShadow = true
			model.name = "cube"
			Editor.addToActualScene(model)
		} else if (o === "Cylinder") {
			var geometry = new THREE.CylinderGeometry(1, 1, 2, 32)
        	var material = new THREE.MeshPhongMaterial()
        	var model = new Model3D(geometry, material)
        	model.receiveShadow = true
        	model.castShadow = true
        	model.name = "Cylinder"
        	Editor.addToActualScene(model)
		} else if (o === "Sphere") {
			var geometry = new THREE.SphereGeometry(0.6, 16, 16)
        	var material = new THREE.MeshPhongMaterial()
        	var model = new Model3D(geometry, material)
        	model.receiveShadow = true
        	model.castShadow = true
        	model.name = "Sphere"
        	Editor.addToActualScene(model)
		} else if (o === "Torus") {
			var geometry = new THREE.TorusGeometry(1, 0.5, 16, 100)
        	var material = new THREE.MeshPhongMaterial()
        	var model = new Model3D(geometry, material)
        	model.receiveShadow = true
        	model.castShadow = true
        	model.name = "Torus"
        	Editor.addToActualScene(model)
		} else if (o === "Pyramid") {
			var geometry = new THREE.CylinderGeometry(0, 1, 2, 32)
        	var material = new THREE.MeshPhongMaterial()
        	var model = new Model3D(geometry, model)
        	model.receiveShadow = true
        	model.castShadow = true
        	model.name = "Cone"
        	Editor.addToActualScene(model)
		} else if (o === "Empty") {
			Editor.addToActualScene(new Empty())
		} else if (o === "Text") {
			var loader = new THREE.FontLoader().load("data/fonts/helvetiker_bold.typeface.js", function(font) {
        	    var material = new THREE.MeshPhongMaterial()
        	    var model = new Text3D("text", font, material)
        	    model.receiveShadow = true
        	    model.castShadow = true
        	    Editor.addToActualScene(model)
        	})
		} else if (o === "Point Light") {
			var light = new PointLight()
        	light.castShadow = true
        	light.shadow.camera.near = 1
        	light.shadow.camera.far = 1
        	light.shadow.bias = 0.01
        	Editor.addToActualScene(light)
		} else if (o === "Ambient Light") {
			var light = new AmbientLight()
        	Editor.addToActualScene(light)
		} else if (o === "Spot Light") {
			var light = new SpotLight()
        	light.castShadow = true
        	Editor.addToActualScene(light)
		} else if (o === "Directional Light") {
			var light = new DirectionalLight()
        	light.castShadow = true
        	Editor.addToActualScene(light)
		} else if (o === "Hemisphere Light") {
			var light = new HemisphereLight()
        	light.castShadow = true
        	Editor.addToActualScene(light)
		} else if (o === "Sky") {
			var light = new Sky()
       		Editor.addToActualScene(light)
		} else if (o === "Perspective Camera") {
			Editor.addToActualScene(new PerspectiveCamera())
		} else if (o === "Orthographic Camera") {
			Editor.addToActualScene(new OrthographicCamera(3, 3, 3, 3, 3, 3))
		} else if (o === "Script") {
			Editor.addToActualScene(new Script())
		} else if (o === "Blueprints") {
			Editor.addToActualScene(new Blueprints())
		} else if (o === "Sprite") {
			var map = new THREE.TextureLoader().load("data/sample.png")
        	var material = new THREE.SpriteMaterial({map: map, color: 0xffffff})
        	var sprite = new Sprite(material)
        	Editor.addToActualScene(sprite)
		} else if (o === "Particles") {
			// TODO: This
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