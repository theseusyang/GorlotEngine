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
			var obj = new Model3D(geometry, material)
			obj.receiveShadow = true
			obj.castShadow = true
			obj.name = "cube"
			Editor.addToActualScene(obj)
		} else if (o === "Cylinder") {
			var geometry = new THREE.CylinderGeometry(1, 1, 2, 32)
        	var material = new THREE.MeshPhongMaterial()
        	var obj = new Model3D(geometry, material)
        	obj.receiveShadow = true
        	obj.castShadow = true
        	obj.name = "Cylinder"
        	Editor.addToActualScene(obj)
		} else if (o === "Sphere") {
			var geometry = new THREE.SphereGeometry(0.6, 16, 16)
        	var material = new THREE.MeshPhongMaterial()
        	var obj = new Model3D(geometry, material)
        	obj.receiveShadow = true
        	obj.castShadow = true
        	obj.name = "Sphere"
        	Editor.addToActualScene(obj)
		} else if (o === "Torus") {
			var geometry = new THREE.TorusGeometry(1, 0.5, 16, 100)
        	var material = new THREE.MeshPhongMaterial()
        	var obj = new Model3D(geometry, material)
        	obj.receiveShadow = true
        	obj.castShadow = true
        	obj.name = "Torus"
        	Editor.addToActualScene(obj)
		} else if (o === "Pyramid") {
			var geometry = new THREE.CylinderGeometry(0, 1, 2, 32)
        	var material = new THREE.MeshPhongMaterial()
        	var obj = new Model3D(geometry, model)
        	obj.receiveShadow = true
        	obj.castShadow = true
        	obj.name = "Cone"
        	Editor.addToActualScene(obj)
		} else if (o === "Empty") {
			var obj = new Empty()
			Editor.addToActualScene(obj)
		} else if (o === "Text") {
			var obj = null
			var loader = new THREE.FontLoader().load("data/fonts/helvetiker_bold.typeface.js", function(font) {
        	    var material = new THREE.MeshPhongMaterial()
        	    var obj = new Text3D("text", font, material)
        	    obj.receiveShadow = true
        	    obj.castShadow = true
        	    Editor.addToActualScene(obj)
        	})
		} else if (o === "Point Light") {
			var obj = new PointLight()
        	Editor.addToActualScene(obj)
		} else if (o === "Ambient Light") {
			var obj = new AmbientLight()
        	Editor.addToActualScene(obj)
		} else if (o === "Spot Light") {
			var obj = new SpotLight()
        	obj.castShadow = true
        	Editor.addToActualScene(obj)
		} else if (o === "Directional Light") {
			var obj = new DirectionalLight()
        	obj.castShadow = true
        	Editor.addToActualScene(obj)
		} else if (o === "Hemisphere Light") {
			var obj = new HemisphereLight()
        	obj.castShadow = true
        	Editor.addToActualScene(obj)
		} else if (o === "Sky") {
			var obj = new Sky()
       		Editor.addToActualScene(obj)
		} else if (o === "Perspective Camera") {
			var obj = new PerspectiveCamera()
			Editor.addToActualScene(obj)
		} else if (o === "Orthographic Camera") {
			var obj = new OrthographicCamera(3, 3, 3, 3, 3, 3)
			Editor.addToActualScene(obj)
		} else if (o === "Script") {
			var obj = new Script()
			Editor.addToActualScene(obj)
		} else if (o === "Blueprints") {
			var obj = new Blueprints()
			Editor.addToActualScene(obj)
		} else if (o === "Sprite") {
			var map = new THREE.TextureLoader().load("data/sample.png")
        	var material = new THREE.SpriteMaterial({map: map, color: 0xffffff})
        	var obj = new Sprite(material)
        	Editor.addToActualScene(obj)
		} else if (o === "Particles") {
			// TODO: This
		}

		if(obj !== undefined && obj !== null) {
			Editor.selectObject(obj)
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