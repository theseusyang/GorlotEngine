"use strict";

function MaterialEditor(parent)
{
	//Parent
	if(parent === undefined)
	{
		this.parent = document.body;
	}
	else
	{
		this.parent = parent;
	}
	
	this.registerNodes()

	//ID
	var id = "material_editor" + MaterialEditor.id;
	MaterialEditor.id++;

	//Create element
	this.element = document.createElement("div");
	this.element.id = id;
	this.element.style.position = "absolute";

	//Prevent Drop event
	this.element.ondrop = function(event)
	{
		event.preventDefault();
	};

	//Prevent deafault when object dragged over
	this.element.ondragover = function(event)
	{
		event.preventDefault();
	};

	// Graph canvas
	this.graph_canvas = new Canvas(this.element)
	this.graph_canvas.updateInterface()
	this.graph_canvas.element.style.position = "absolute"

	//Canvas
	this.canvas = new Canvas(this.element);
	this.canvas.updateInterface();
	this.canvas.element.style.position = "relative"

	this.graph = null

	//Element atributes
	this.children = [];
	this.fit_parent = false;
	this.size = new THREE.Vector2(0,0);
	this.position = new THREE.Vector2(0,0);
	this.visible = true;
	
	//Material UI File element
	this.material_file = null;

	//Attached material
	this.material = null;
	this.nodes = null

	//Material renderer and scene
	this.renderer = new THREE.WebGLRenderer({canvas: this.canvas.element, antialias: Settings.render.antialiasing, alpha: true});
	this.renderer.setSize(this.canvas.size.x, this.canvas.size.y);
	this.renderer.shadowMap.enabled = Settings.render.shadows;
	this.renderer.shadowMap.type = Settings.render.shadows_type;

	//Material camera
	this.camera = new PerspectiveCamera(90, this.canvas.size.x/this.canvas.size.y, 0.1, 10000000);

	//Material preview scene
	this.scene = new Scene();
	this.scene.add(new PointLight(0x666666));
	this.scene.add(new AmbientLight(0x555555));
	this.obj = new Model3D(new THREE.SphereBufferGeometry(1, 64, 64), null);
	this.obj.position.set(0, 0, -2.5);
	this.obj.visible = false;
	this.scene.add(this.obj);
	this.sprite = new Sprite(null);
	this.sprite.position.set(0, 0, -1.5);
	this.sprite.visible = false;
	this.scene.add(this.sprite);

	//Add element to document
	this.parent.appendChild(this.element);
}

//Material editor counter
MaterialEditor.id = 0;

//Attach material to material editor
MaterialEditor.prototype.attachMaterial = function(material, material_file)
{
	//Check is if sprite material and ajust preview
	if(material instanceof THREE.SpriteMaterial)
	{
		this.sprite.material = material;
		this.sprite.visible = true;
		this.obj.visible = false;
	}
	else
	{
		this.obj.material = material;
		this.obj.visible = true;
		this.sprite.visible = false;
	}

	//Store material file pointer
	if(material_file !== undefined)
	{
		this.material_file = material_file;
	}

	//Store material
	this.material = material;
	this.nodes = this.material.nodes

	this.initNodeEditor()
}

// Initialise node editor
MaterialEditor.prototype.initNodeEditor = function() {
	this.graph = new LGraph(this.nodes)

	var self = this
	this.graph.onNodeConnectionChange = function() {
		self.material.needsUpdate = true
	}

	this.graphCanvas = new LGraphCanvas(this.graph_canvas.element, this.graph)
	this.graph.start(1000/60)
}

// Register material nodes
MaterialEditor.prototype.registerNodes = function() {
	unregisterNodes()
	registerBaseNodes()
	registerMaterialNodes()
}

//Activate code editor
MaterialEditor.prototype.activate = function()
{	
	this.registerNodes()

	Editor.setState(Editor.STATE_IDLE);
	Editor.resetEditingFlags();
	Mouse.canvas = this.canvas.element;
}

//Remove element
MaterialEditor.prototype.destroy = function()
{
	try
	{
		this.parent.removeChild(this.element);
	}
	catch(e){}
}

// On close
MaterialEditor.prototype.close = function() {
	if (this.graph !== null) {
		this.graph.stop()
		this.material.updateNodes(this.graph.serialize())
	}
}

//Update container object data
MaterialEditor.prototype.updateMetadata = function(container)
{
	if(this.material !== null)
	{
		var material = this.material;

		//Set container name
		if(material.name !== undefined)
		{
			container.setName(material.name);
		}

		//Check if scene exists in program
		var found = false;
		var materials = Editor.program.materials;
		for(var i in materials)
		{
			if(materials[i].uuid === material.uuid)
			{
				found = true;
				break;
			}
		}

		//If not found close tab
		if(!found)
		{
			container.close();
		}
	}
}

// Update the attached material
MaterialEditor.prototype.updateMaterial = function() {
	this.material_file.updateMetadata()

	if (this.nodes.nodes !== undefined) {
		for(var i = 0; i < this.nodes.nodes.length; i++) {
			if (this.nodes.nodes[i].type === "Material/MeshPhongMaterial") {
				var genesis = this.nodes.nodes[i].properties.mat
				this.material.setValues(Editor.getAssetByUUID(genesis))
			}
		}
	}

	this.material.updateNodes(this.graph.serialize())
}

//Update material editor
MaterialEditor.prototype.update = function()
{
	//Render Material
	if(this.material !== null)
	{
		if(this.material.needsUpdate) {
			this.updateMaterial()
		}

		//Render scene
		this.renderer.render(this.scene, this.camera);
	}

	//Move material view
	if(Mouse.insideCanvas())
	{
		//Rotate object
		if(Mouse.buttonPressed(Mouse.LEFT))
		{
			var delta = new THREE.Quaternion();
			delta.setFromEuler(new THREE.Euler(Mouse.delta.y * 0.005, Mouse.delta.x * 0.005, 0, 'XYZ'));
			this.obj.quaternion.multiplyQuaternions(delta, this.obj.quaternion);
		}

		//Zoom
		this.camera.position.z += Mouse.wheel * 0.003;
		if(this.camera.position.z > 5)
		{
			this.camera.position.z = 5;
		}
		else if(this.camera.position.z < -1.5)
		{
			this.camera.position.z = -1.5;
		}
	}
}

//Update division Size
MaterialEditor.prototype.updateInterface = function()
{
	//Fit parent
	if(this.fit_parent)
	{
		this.size.x = this.parent.offsetWidth;
		this.size.y = this.parent.offsetHeight; 
	}
	
	//Set visibility
	if(this.visible)
	{
		this.element.style.visibility = "visible";
	}
	else
	{
		this.element.style.visibility = "hidden";
	}

	// Update graph canvas
	this.graph_canvas.visible = this.visible
	this.graph_canvas.size.set(this.size.x, this.size.y)
	this.graph_canvas.updateInterface()

	//Update canvas
	this.canvas.visible = this.visible;
	this.canvas.size.set(200, 200);
	this.canvas.updateInterface();

	//Update renderer and canvas
	this.renderer.setSize(this.canvas.size.x, this.canvas.size.y);
	this.camera.aspect = this.canvas.size.x/this.canvas.size.y
	this.camera.updateProjectionMatrix();
}
