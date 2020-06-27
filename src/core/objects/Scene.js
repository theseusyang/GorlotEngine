class Scene extends THREE.Scene {
	constructor() {
		super()

		this.name = "scene"

		// Disable auto matrix updates
		this.rotationAutoUpdate = false
		this.matrixAutoUpdate = false

		// Fog
		this.fog_color = "#ffffff"
		this.fog_near = 2
		this.fog_far = 30
		this.fog_density = 0.001
		this.fog_mode = Scene.FOG_NONE
		
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
		// Get initial camera
		var camera = this.getInitialCamera()
		if (camera !== null) {
			this.camera = camera
		}

		for(var i = 0; i < this.children.length; i++) {
			this.children[i].initialize()
		}
	}

	update() {
		// Update physics
		this.world.step(1/60);
	
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

	getInitialCamera(obj) {
		// Get default camera
		if (obj === undefined) {
			obj = this
		}

		if (this.initial_camera === obj.uuid) {
			return obj
		}

		for(var i = 0; i < obj.children.length; i++) {
			var camera = this.getInitialCamera(obj.children[i])
			if (camera !== null) {
				return camera
			}
		}

		return null
	}

	addComponent(compo) {
		if (compo instanceof Component) {
			this.component.push(compo)
		}
	}

	setFogMode(mode) {
		// Set fog mode
		this.fog_mode = mode

		if (mode === Scene.FOG_LINEAR) {
			this.fog = new THREE.Fog(this.fog_color, this.fog_near, this.fog_far)
		} else if (mode === Scene.FOG_EXPONENTIAL) {
			this.fog = new THREE.FogExp2(this.fog_color, this.fog_density)
		} else {
			this.fog = null
		}
	}

	updateFog() {
		// Update fog from stored value
		if (this.fog instanceof THREE.Fog) {
			this.fog.color.setHex(this.fog_color)
			this.fog.far = this.fog_far
			this.fog_near = this.fog_near
		} else if (this.fog instanceof THREE.FogExp2) {
			this.fog.color.setHex(this.fog_color)
			this.fog.density = this.fog_density
		}
	}

	toJSON(meta) {
		// Create JSON for object
		var data = THREE.Scene.prototype.toJSON.call(this, meta)

		data.object.fog_color = this.fog_color
		data.object.fog_density = this.fog_density
		data.object.fog_near = this.fog_near
		data.object.fog_far = this.fog_far
		data.object.fog_mode = this.fog_mode

		if (this.initial_camera !== null) {
			data.object.initial_camera = this.initial_camera
		}

		return data
	}
}

// Fog modes
Scene.FOG_NONE = 0
Scene.FOG_LINEAR = 1
Scene.FOG_EXPONENTIAL = 2