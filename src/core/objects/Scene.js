class Scene extends THREE.Scene {
	constructor() {
		super()

		this.name = "scene"

		// Disable auto matrix updates
		this.rotationAutoUpdate = false
		this.matrixAutoUpdate = false

		// Fog
		this.fog = null//new THREE.Fox(0x0000ff, 1, 100)
		
		//Create CANNON world
		this.world = new CANNON.World();
		this.world.broadphase = new CANNON.NaiveBroadphase();
		this.world.gravity.set(0, -9.8, 0);
		this.world.solver.iterations = 10;

		// Initialization variables
		this.initial_camera = null

		// Runtime variables
		this.data = function() {}
		this.camera = null
		this.listener = new THREE.AudioListener()

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

			this.children[i].initialize()
		}
	}

	update() {
		//this.world.step(1/60);
	
		for(var i = 0; i < this.children.length; i++)
		{
			this.children[i].update()
		}
	}

	stop() {
		for(var i = 0; i < this.children.length; i++) {
			this.children[i].stop()
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
