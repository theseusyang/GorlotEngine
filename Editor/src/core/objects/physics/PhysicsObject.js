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

		if (!this.body.fixedRotation) {
			this.quaternion.copy(this.body.quaternion)
		}

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

		// Shapes array
		var shapes = this.body.shapes
		for(var i = 0; i < shapes.length; i++) {
			var shape = shapes[i]
			var values = {}

			// Shape type
			values.type = shape.type

			if (shape.type === CANNON.Shape.types.SPHERE) {
				values.radius = shape.radius
			} else if (shape.type === CANNON.Shape.types.BOX) {
				values.halfExtents = {}
				values.halfExtents.x = shape.halfExtents.x
				values.halfExtents.y = shape.halfExtents.y
				values.halfExtents.z = shape.halfExtents.z
			} else if (shape.type === CANNON.Shape.types.CONVEXPOLYHEDRON) {
				values.vertices = shape.vertices
				values.faces = shape.faces
			}

			// Add shape
			data.object.body.shapes[i] = values
		}

		return data
	}
}