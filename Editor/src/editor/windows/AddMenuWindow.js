"use strict"

// Add Menu Window class
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
				"icon": "data/icons/models/cube.png",
				"icon_style": "width: 12px"
			},
			{
				"name": "Cylinder",
				"icon": "data/icons/models/cylinder.png",
				"icon_style": "width: 12px"
			},
			{
				"name": "Sphere",
				"icon": "data/icons/models/sphere.png",
				"icon_style": "width: 12px"
			},
			{
				"name": "Torus",
				"icon": "data/icons/models/torus.png",
				"icon_style": "width: 12px"
			},
			{
				"name": "Pyramid",
				"icon": "data/icons/models/pyramid.png",
				"icon_style": "width: 12px"
			},
			{
				"name": "Plane",
				"icon": "data/icons/models/plane.png",
				"icon_style": "width: 12px"
			},
			{
				"name": "Empty",
				"icon": "data/icons/models/squares.png",
				"icon_style": "width: 12px"
			},
			{
				"name": "Text",
				"icon": "data/icons/models/text.png",
				"icon_style": "width: 12px"
			},
			{
				"name": "Point Light",
				"icon": "data/icons/lights/point.png",
				"icon_style": "width: 12px"
			},
			{
				"name": "Ambient Light",
				"icon": "data/icons/lights/ambient.png",
				"icon_style": "width: 12px"
			},
			{
				"name": "Spot Light",
				"icon": "data/icons/lights/spot.png",
				"icon_style": "width: 12px"
			},
			{
				"name": "Directional Light",
				"icon": "data/icons/lights/directional.png",
				"icon_style": "width: 12px"
			},
			{
				"name": "Hemisphere Light",
				"icon": "data/icons/lights/hemisphere.png",
				"icon_style": "width: 12px"
			},
			{
				"name": "Sky",
				"icon": "data/icons/lights/sky.png",
				"icon_style": "width: 12px"
			},
			{
				"name": "Perspective Camera",
				"icon": "data/icons/camera/perspective.png",
				"icon_style": "width: 12px"
			},
			{
				"name": "Orthographic Camera",
				"icon": "data/icons/camera/orthographic.png",
				"icon_style": "width: 12px"
			},
			{
				"name": "Physics - Cube",
				"icon": "data/icons/models/cube.png",
				"icon_style": "width: 12px"
			},
			{
				"name": "Physics - Sphere",
				"icon": "data/icons/models/sphere.png",
				"icon_style": "width: 12px"
			},
			{
				"name": "Physics - Cylinder",
				"icon": "data/icons/models/cylinder.png",
				"icon_style": "width: 12px"
			},
			{
				"name": "Physics - Plane",
				"icon": "data/icons/models/plane.png",
				"icon_style": "width: 12px"
			},
			{
				"name": "Physics - Point",
				"icon": "data/icons/models/point.png",
				"icon_style": "width: 12px"
			},
			{
				"name": "Leap Hand",
				"icon": "data/icons/hw/leap.png",
				"icon_style": "width: 12px"
			},
			{
				"name": "Script",
				"icon": "data/icons/script/script.png",
				"icon_style": "width: 12px"
			},
			{
				"name": "Blueprints",
				"icon": "data/icons/script/blueprints.png",
				"icon_style": "width: 12px"
			},
			{
				"name": "Sprite",
				"icon": "data/icons/effects/sprite.png",
				"icon_style": "width: 12px"
			},
			{
				"name": "Particles",
				"icon": "data/icons/effects/particles.png",
				"icon_style": "width: 12px"
			},
			{
				"name": "Audio",
				"icon": "data/icons/assets/audio.png",
				"icon_style": "width: 12px"
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
			obj.name = "cube"
			Editor.addToActualScene(obj)

		}
		else if (o === "Cylinder") {

			var geometry = new THREE.CylinderBufferGeometry(1, 1, 2, 32)
        	var obj = new Model3D(geometry, Editor.default_material)
        	obj.name = "cylinder"
        	Editor.addToActualScene(obj)

		}
		else if (o === "Sphere") {

			var geometry = new THREE.SphereBufferGeometry(0.6, 32, 32)
        	var obj = new Model3D(geometry, Editor.default_material)
        	obj.name = "sphere"
        	Editor.addToActualScene(obj)

		}
		else if (o === "Torus") {

			var geometry = new THREE.TorusBufferGeometry(1, 0.5, 16, 96)
        	var obj = new Model3D(geometry, Editor.default_material)
        	obj.name = "torus"
        	Editor.addToActualScene(obj)

		}
		else if (o === "Pyramid") {

			var geometry = new THREE.ConeBufferGeometry(1, 2, 32)
        	var obj = new Model3D(geometry, Editor.default_material)
        	obj.name = "cone"
        	Editor.addToActualScene(obj)

		}
		else if (o === "Plane") {

			var geometry = new THREE.PlaneBufferGeometry(1, 1)
			var obj = new Model3D(geometry, Editor.default_material)
			obj.name = "plane"
			Editor.addToActualScene(obj)

		}
		else if (o === "Empty") {

			Editor.addToActualScene(new Empty())

		}
		else if (o === "Text") {

			var obj = new Text3D("text", Editor.default_material)
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
		else if (o === "Physics - Cube") {

			var obj = new PhysicsObject()
			obj.body.addShape(new CANNON.Box(new CANNON.Vec3(0.5, 0.5, 0.5)))
			Editor.addToActualScene(obj)

		}
		else if (o === "Physics - Sphere") {

			var obj = new PhysicsObject()
			obj.body.addShape(new CANNON.Sphere(1.0))
			Editor.addToActualScene(obj)

		} else if (o === "Physics - Cylinder") {

			var obj = new PhysicsObject()
			obj.body.addShape(new CANNON.Cylinder(1.0, 1.0, 2.0, 8))
			Editor.addToActualScene(obj)

		}
		else if (o === "Physics - Plane") {

			var obj = new PhysicsObject()
			obj.body.addShape(new CANNON.Plane())
			Editor.addToActualScene(obj)

		}
		else if (o === "Physics - Point") {

			var obj = new PhysicsObject()
			obj.body.addShape(new CANNON.Particle())
			Editor.addToActualScene(obj)

		}
		else if (o === "Leap Hand") {
			Editor.addToActualScene(new LeapHand())
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

			Editor.addToActualScene(new Sprite(Editor.default_sprite_material))

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