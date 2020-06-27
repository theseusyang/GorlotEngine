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

	this.addOutput("Object", "Object3D")
}

addObjectToScene.title = "Add Object To Scene"

addObjectToScene.prototype.onExecute = function() {
	var object3d = this.getInputData(0)
	if (object3d === undefined) {
		return
	}
	var scene = this.getInputData(1)
	if (scene === undefined) {
		return
	}
	scene.add(object3d)
}

LiteGraph.registerNodeType("Scenes/GetRunningScene", GetRunningScene)
LiteGraph.registerNodeType("Scenes/AddObjectToScene", addObjectToScene)