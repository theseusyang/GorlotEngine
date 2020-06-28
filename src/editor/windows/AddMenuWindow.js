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
				"name": "Plane",
				"icon": "data/icons/models/plane.png"
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
			},
			{
				"name": "Audio",
				"icon": "data/icons/assets/audio_12x12.png"
			}
		]

		var self = this

		this.widgets = new LiteGUI.Inspector()

		this.objectList = this.widgets.addList(null, this.objects, {height: this.dialog.height-20,callback_dblclick: function(v) {
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

			var geometry = new THREE.BoxBufferGeometry(1, 1, 1)
			var obj = new Model3D(geometry, Editor.default_material)
			obj.receiveShadow = true
			obj.castShadow = true
			obj.name = "cube"
			Editor.addToActualScene(obj)

		}
		else if (o === "Cylinder") {

			var geometry = new THREE.CylinderBufferGeometry(1, 1, 2, 32)
        	var obj = new Model3D(geometry, Editor.default_material)
        	obj.receiveShadow = true
        	obj.castShadow = true
        	obj.name = "Cylinder"
        	Editor.addToActualScene(obj)

		}
		else if (o === "Sphere") {

			var geometry = new THREE.SphereBufferGeometry(0.6, 16, 16)
        	var obj = new Model3D(geometry, Editor.default_material)
        	obj.receiveShadow = true
        	obj.castShadow = true
        	obj.name = "Sphere"
        	Editor.addToActualScene(obj)

		}
		else if (o === "Torus") {

			var geometry = new THREE.TorusBufferGeometry(1, 0.5, 16, 100)
        	var obj = new Model3D(geometry, Editor.default_material)
        	obj.receiveShadow = true
        	obj.castShadow = true
        	obj.name = "Torus"
        	Editor.addToActualScene(obj)

		}
		else if (o === "Pyramid") {

			var geometry = new THREE.CylinderBufferGeometry(0, 1, 2, 32)
        	var obj = new Model3D(geometry, Editor.default_material)
        	obj.receiveShadow = true
        	obj.castShadow = true
        	obj.name = "Cone"
        	Editor.addToActualScene(obj)

		}
		else if (o === "Plane") {

			var geometry = new THREE.PlaneBufferGeometry(1, 1)
			var obj = new Model3D(geometry, Editor.default_material)
			obj.receiveShadow = true
			obj.castShadow = true
			obj.name = "plane"
			Editor.addToActualScene(obj)

		}
		else if (o === "Empty") {

			Editor.addToActualScene(new Empty())

		}
		else if (o === "Text") {

			var obj = new Text3D("text", Editor.default_material)
			obj.receiveShadow = true
			obj.castShadow = true
			Editor.addToActualScene(obj)

		}
		else if (o === "Point Light") {

        	Editor.addToActualScene(new PointLight())

		}
		else if (o === "Ambient Light") {

        	Editor.addToActualScene(new AmbientLight())

		}
		else if (o === "Spot Light") {

        	Editor.addToActualScene(new SpotLight())

		}
		else if (o === "Directional Light") {

        	Editor.addToActualScene(new DirectionalLight())

		}
		else if (o === "Hemisphere Light") {

        	Editor.addToActualScene(new HemisphereLight())

		}
		else if (o === "Sky") {

       		Editor.addToActualScene(new Sky())

		}
		else if (o === "Perspective Camera") {

			var obj = new PerspectiveCamera(60, Editor.canvas.width/Editor.canvas.height, 0.1, 1000000)
			Editor.addToActualScene(obj)

		}
		else if (o === "Orthographic Camera") {

			var obj = new OrthographicCamera(3, 2, undefined, 1, 1000000)
			Editor.addToActualScene(obj)

		}
		else if (o === "Script") {

			var obj = new Script()
			Editor.addToActualScene(obj)

		}
		else if (o === "Blueprints") {

			var obj = new Blueprints()
			Editor.addToActualScene(obj)

		}
		else if (o === "Sprite") {

			var map = new Texture("data/sample.png")
        	var material = new THREE.SpriteMaterial({map: map, color: 0xffffff})
        	var obj = new Sprite(material)
        	Editor.addToActualScene(obj)

		}
		else if (o === "Particles") {

			Editor.addToActualScene(new ParticleEmitter())

		} else if (o === "Audio") {

			Editor.addToActualScene(new Audio())

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