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
		this.scene = null;
	}

	addScene(scene) {
		this.scenes.push(scene)
	}

	addDefaultScene() {
		var scene = new Scene()
		scene.add(new Sky())

		var material = new THREE.MeshPhongMaterial()
		var geometry = new THREE.BoxGeometry(2, 2, 2)
		var model = new Model3D(geometry, material)
		model.receiveShadow = true
		model.castShadow = true
		model.name = "box"
		scene.add(model)

		material = new THREE.MeshPhongMaterial()
		geometry = new THREE.BoxGeometry(10, 0.1, 10)
		model = new Model3D(geometry, material)
		model.position.set(0, -1.05, 0)
		model.receiveShadow = true
		model.castShadow = true
		model.name = "ground"
		scene.add(model)

		this.addScene(scene)
	
		// If first scene set as actual scene
		if (this.scene == null) {
			this.scene = this.scenes[0]
		}
	}

	removeScene(scene) {
		var index = this.scenes.indexOf(scene)
		if (index > -1) {
			this.scenes.splice(index, 1)
		}

		// If no scene on program, set actual scene to null
		if (this.scenes.length === 0) {
			this.scene = null
		}
	}
}
