function GetRunningScene() {
	this.addOutput("Scene", "Scene")
}

GetRunningScene.title = "Get Running Scene"

GetRunningScene.prototype.onExecute = function() {
	this.setOutputData(0, Editor.program_running.scene)
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