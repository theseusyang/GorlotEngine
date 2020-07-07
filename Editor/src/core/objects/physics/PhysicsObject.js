"use strict"

// Physics Object class
class PhysicsObject extends THREE.Object3D {
	constructor() {
		super()

		this.name = "physics"
		this.type = "Physics"

		this.shape = new CANNON.Sphere(1.0)
		this.body = new CANNON.Body({mass: 0.5})
		this.body.type = CANNON.Body.DYNAMIC
		this.body.addShape(this.shape)

		this.world = null
	
		this.components = []
		this.defaultComponents = []
		this.defaultComponents.push(new ElementComponent())
		this.defaultComponents.push(new Object3DComponent())
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

		return data
	}
}