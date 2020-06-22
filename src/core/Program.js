/*function Program()
{
	//Program Info
	this.name = "program";
	this.description = "";
	this.author = "";
	this.version = "0";

	//Screens
	this.scenes = [];

	//Runtime variables
	this.actual_scene = null;
}

//Function prototypes
//Add scene to program
Program.prototype.addScene = function(scene)
{
	this.scenes.push(scene);
}*/

class Program {
	constructor() {
		//Program Info
		this.name = "program";
		this.description = "";
		this.author = "";
		this.version = "0";
	
		//Screens
		this.scenes = [];
	
		//Runtime variables
		this.actual_scene = null;
	}

	addScene(scene) {
		this.scenes.push(scene)
	}

	addDefaultScene() {
		var scene = new Scene()
		scene.add(new AmbientLight(0x202020))

		var light = new PointLight(0xaaaaaa)
		light.position.set(0, 5, -5)
		scene.add(light)

		this.addScene(scene)
	
		// If first scene set as actual scene
		if (this.actual_scene == null) {
			this.actual_scene = this.scenes[0]
		}
	}

	removeScene(scene) {
		var index = this.scenes.indexOf(scene)
		if (index > -1) {
			this.scenes.splice(index, 1)
		}

		// If no scene on program, set actual scene to null
		if (this.scenes.length === 0) {
			this.actual_scene = null
		}
	}
}
