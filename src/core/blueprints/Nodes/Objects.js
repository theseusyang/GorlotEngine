function ElementNode() {
	this.addInput("Object", "Object3D")

	this.addInput("Position", "Vector")
	this.addInput("Rotation", "Eular")
	this.addInput("Scale", "Vector")

	this.addOutput("Position", "Vector")
	this.addOutput("Rotation", "Euler")
	this.addOutput("Scale", "Vector")
}
ElementNode.title = "Element"
ElementNode.prototype.onExecute = function() {
	
	var o, p, r, s

	o = this.getInputData(0)

	p = this.getInputData(1)
	r = this.getInputData(2)
	s = this.getInputData(3)

	if (p === undefined || p === null && o !== undefined) {
		p = o.position
	}
	// TODO: r = euler
	if (s === undefined || s === null && o !== undefined) {
		s = o.scale
	}

	o.position.set(p.x, p.y, p.z)

	o.scale.set(s.x, s.y, s.z)

	this.setOutputData(0, o.position)
	this.setOutputData(1, o.rotation)
	this.setOutputData(2, o.scale)

}

function GetObjectByNameNode() {
	this.addInput("Name", "Text")

	this.addOutput("Object", "Object3D")
}

GetObjectByNameNode.title = "Get Object By Name"
GetObjectByNameNode.prototype.onExecute = function() {
	var n = this.getInputData(0)
	if (n === undefined) {
		return
	}
	if (Editor.program_running === null) {
		return
	}
	this.setOutputData(0, Editor.program_running.scene.getObjectByName(n))
}

function GetObjectByUUIDNode() {
	this.addInput("UUID", "Text")
	this.addOutput("Object", "Object3D")
}
GetObjectByUUIDNode.title = "Get Object By UUID"
GetObjectByUUIDNode.prototype.onExecute = function() {
	var uuid = this.getInputData(0)
	if (uuid !== undefined) {
		//var obj = THREE.Object3D.prototype.getObjectByProperty("uuid", uuid)
		//this.setOutputData(0, obj)
		var obj = Editor.program_running.getObjectByProperty("uuid", uuid)
		this.setOutputData(0, obj)
	}
}

function ThisNode() {
	this.addOutput("This", "Object3D")
	this.properties = {uuid: ""}
}
ThisNode.title = "This"
ThisNode.prototype.onExecute = function() {
	if (this.properties.uuid !== "" && this.properties.uuid !== undefined) {
		var obj = Editor.program_running.getObjectByProperty("uuid", this.properties.uuid)
		this.setOutputData(0, obj)
	}
}

LiteGraph.registerNodeType("Objects/Element", ElementNode)
LiteGraph.registerNodeType("Objects/GetObjectByName", GetObjectByNameNode)
LiteGraph.registerNodeType("Objects/GetObjectByUUID", GetObjectByUUIDNode)
LiteGraph.registerNodeType("Objects/This", ThisNode)