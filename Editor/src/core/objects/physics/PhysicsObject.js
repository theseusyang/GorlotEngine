"use strict"

// Physics Object class
class PhysicsObject extends THREE.Object3D {
	constructor() {
		super()

		this.name = "physics"
		this.type = "Physics"

		// Body
		this.body = new CANNON.Body({mass: 0.5})
		this.body.type = CANNON.Body.DYNAMIC
		this.body.mass = 1
		// Shape
		//this.body.addShape(new CANNON.Sphere(1.0))
		//this.body.addShape(new CANNON.Particle())
		//this.body.addShape(new CANNON.Box(new CANNON.Vec3(0.5, 0.5, 0.5)))
		//this.body.addShape(new CANNON.Cylinder(1.0, 1.0, 2.0, 8))
		//this.body.addShape(new CANNON.ConvexPolyhedron(points, faces))
		//this.body.addShape(new CANNON.Plane())

		// World pointer
		this.world = null
	
		// Components system
		this.components = []
		this.defaultComponents = []
		this.defaultComponents.push(new ElementComponent())
		this.defaultComponents.push(new Object3DComponent())
		this.defaultComponents.push(new PhysicsComponent())
	}

	addComponent(compo) {
		if (compo instanceof Component) {
			this.components.push(compo)
		}
	}

	// Initialize physics object
	initialize() {
		// Update body to world position
		this.body.position.copy(this.position)
		this.body.quaternion.copy(this.quaternion)

		// Get physics world
		var node = this
		while(node.parent !== null) {
			node = node.parent
			if (node instanceof Scene) {
				this.world = node.world
				this.world.addBody(this.body)
			}
		}

		// Initialize children
		for(var i = 0; i < this.children.length; i++) {
			this.children[i].initialize()
		}
	}

	// Update physics object
	update() {
		this.position.copy(this.body.position)
		this.quaternion.copy(this.body.quaternion)

		for(var i = 0; i < this.children.length; i++) {
			this.children[i].update()
		}
	}

	// Create JSON for object
	toJSON(meta) {
		var data = THREE.Object3D.prototype.toJSON.call(this, meta)

		// Body
		data.object.body = {}

		data.object.body.type = this.body.type
		data.object.body.mass = this.body.mass
		data.object.body.linearDamping = this.body.linearDamping
		data.object.body.angularDamping = this.body.angularDamping
		data.object.body.allowSleep = this.body.allowSleep
		data.object.body.sleepSpeedLimit = this.body.sleepSpeedLimit
		data.object.body.sleepTimeLimit = this.body.sleepTimeLimit
		data.object.body.collisionFilterGroup = this.body.collisionFilterGroup
		data.object.body.collisionFilterMask = this.body.collisionFilterMask
		data.object.body.fixedRotation = this.body.fixedRotation
		data.object.body.shapes = []

		// shapes
		var shapes = this.body.shapes
		for(var i = 0; i < shapes.length; i++) {
			var shape = shapes[i]
			var shape_data = {}

			shape_data.type = shape.type

			if (shape.type === CANNON.Shape.types.SPHERE) {
				shape_data.radius = shape.radius
			} else if (shape.type === CANNON.Shape.types.PLANE) {
				// TODO: This
			} else if (shape.type === CANNON.Shape.types.BOX) {
				shape_data.halfExtents = {}
				shape_data.halfExtents.x = shape.halfExtents.x
				shape_data.halfExtents.y = shape.halfExtents.y
				shape_data.halfExtents.z = shape.halfExtents.z
			} else if (shape.type === CANNON.Shape.types.CYLINDER) {
				// TODO: This
			}

			// Add shape
			data.object.body.shapes[i] = shape_data
		}

		return data
	}
}