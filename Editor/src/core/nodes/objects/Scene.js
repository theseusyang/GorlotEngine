function GetRunningScene() {
	this.addInput("Object", "Object3D")
	this.addOutput("Scene", "Scene")
}
GetRunningScene.title_color = NodesHelper.colours.red[0]
GetRunningScene.title_color1 = NodesHelper.colours.red[1]
GetRunningScene.title_color2 = NodesHelper.colours.red[1]
GetRunningScene.title_text_color = NodesHelper.title_colours.white
GetRunningScene.title = "Get Running Scene"
GetRunningScene.prototype.onExecute = function() {
	var obj = this.getInputData(0)	

	if (obj == undefined || !(obj instanceof THREE.Object3D))
		return

	var scene = ObjectUtils.getScene(obj)
	this.setOutputData(0, scene)
}

function addObjectToScene() {
	this.addInput("Object", "Object3D")
	this.addInput("Scene", "Scene")
	this.addInput("Name", "Text")
}
addObjectToScene.title_color = NodesHelper.colours.red[0]
addObjectToScene.title_color1 = NodesHelper.colours.red[1]
addObjectToScene.title_color2 = NodesHelper.colours.red[1]
addObjectToScene.title_text_color = NodesHelper.title_colours.white
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