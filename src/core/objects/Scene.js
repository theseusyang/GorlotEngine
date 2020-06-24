/*function Scene()
{
	//Objects that compose the scene
	this.objects = [];
	
	//Create three scene
	this.scene = new THREE.Scene();
	
	//Create world with default settings
	this.world = new CANNON.World();
	this.world.broadphase = new CANNON.NaiveBroadphase();
	this.world.gravity.set(0,-10,0);
	this.world.solver.tolerance = 0.05;

	//Runtime variables
	this.camera = null;
}

//Functions prototypes
Scene.prototype.update = function()
{
	this.world.step(1/60);
	
	for(var i = 0; i < this.objects.length; i++)
	{
		this.objects[i].update();
	}
}

//Add object to scene
Scene.prototype.add = function(object)
{
	this.object.parent = this;
	this.scene.add(object.mesh);
	if(object.body != null)
	{
		this.world.add(object.world);
	}
}*/

class Scene extends THREE.Scene {
	constructor() {
		super()

		// Disable auto updates
		this.rotationAutoUpdate = false
		this.matrixAutoUpdate = false
		
		//Create CANNON world
		this.world = new CANNON.World();
		this.world.broadphase = new CANNON.NaiveBroadphase();
		this.world.gravity.set(0,-9.82,0);
		this.world.solver.iterations = 10;
	}

	initialize() {
		for(var i = 0; i < this.children.length; i++) {
			if (this.children[i].initialize != undefined) {
				this.children[i].initialize()
			}
		}
	}

	update() {
		this.world.step(1/60);
	
		for(var i = 0; i < this.children.length; i++)
		{
			if (this.children[i].update != undefined) {
				this.children[i].update()
			}
		}
	}
}
