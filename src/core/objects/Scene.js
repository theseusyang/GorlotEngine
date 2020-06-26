class Scene extends THREE.Scene {
	constructor() {
		super()

		this.name = "scene"

		// Disable auto matrix updates
		this.rotationAutoUpdate = false
		this.matrixAutoUpdate = false
		
		//Create CANNON world
		this.world = new CANNON.World();
		this.world.broadphase = new CANNON.NaiveBroadphase();
		this.world.gravity.set(0,-9.82,0);
		this.world.solver.iterations = 10;

		// Initialization variables
		this.initial_camera = null

		// Runtime variables
		this.camera = null

		// Components
		this.components = []

		this.defaultComponents = []
		this.defaultComponents.push(new SceneComponent())
	}

	initialize() {
		// Initialize children and select camera
		for(var i = 0; i < this.children.length; i++) {
			if (this.initial_camera === this.children[i].uuid) {
				this.camera = this.children[i]
			}

			if (this.children[i].initialize !== undefined) {
				this.children[i].initialize()
			}
		}
	}

	update() {
		this.world.step(1/60);
	
		for(var i = 0; i < this.children.length; i++)
		{
			if (this.children[i].update !== undefined) {
				this.children[i].update()
			}
		}
	}

	stop() {
		for(var i = 0; i < this.children.length; i++) {
			if (this.children[i].stop !== undefined) {
				this.children[i].stop()
			}
		}
	}

	addComponent(compo) {
		if (compo instanceof Component) {
			this.component.push(compo)
		}
	}

	toJSON(meta) {
		// Create JSON for object
		var data = THREE.Scene.prototype.toJSON.call(this, meta)

		if (this.initial_camera !== null) {
			data.object.initial_camera = this.initial_camera
		}

		return data
	}
}
