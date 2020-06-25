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
		this.initial_camera_uuid = null

		// Runtime variables
		this.camera = null

		// Components
		this.components = []
		this.defaultComponents = []
	}

	addComponent(compo) {
		// For now, you can't add components to the scenes
		return false
	}

	initialize() {
		for(var i = 0; i < this.children.length; i++) {
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
}
