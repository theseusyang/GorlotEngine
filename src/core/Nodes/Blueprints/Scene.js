function GetRunningScene() {
	this.addInput("Object", "Object3D")
	this.addOutput("Scene", "Scene")
}

GetRunningScene.title = "Get Running Scene"

GetRunningScene.prototype.onExecute = function() {
	var obj = this.getInputData(0)	

	if(obj !== undefined && obj instanceof THREE.Object3D) {
		var scene = ObjectUtils.getScene(obj)
		this.setOutputData(0, scene)
	}
	// This output doesn't work :'(.this.setOutputData(0, Editor.program_running.scene)
}

function addObjectToScene() {
	this.addInput("Object", "Object3D")
	this.addInput("Scene", "Scene")
	this.addInput("Name", "Text")
}

addObjectToScene.title = "Add Object To Scene"

addObjectToScene.prototype.onExecute = function() {
	var object3d = this.getInputData(0)
	var scene = this.getInputData(1)
	var name = this.getInputData(2)

	object3d.name = name

	if (object3d === undefined) {
		return
	}
	if (scene === undefined) {
		return
	}
	var obj = scene.add(object3d)
}

function registerSceneNodes() {
	LiteGraph.registerNodeType("Scenes/GetRunningScene", GetRunningScene)
	LiteGraph.registerNodeType("Scenes/AddObjectToScene", addObjectToScene)
}