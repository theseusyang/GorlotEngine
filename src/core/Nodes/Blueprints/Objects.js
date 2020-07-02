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
	if (Editor.program_running === undefined || Editor.program_running === null) {
		if (Main.program === null || Main.program === undefined) {
			return
		} else {
			this.setOutputData(0, Main.program.scene.getObjectByName(n))
		}
	} else {
		this.setOutputData(0, Editor.program_running.scene.getObjectByName(n))
	}
}

function GetObjectByUUIDNode() {
	this.properties = {uuid: ""}
	this.addOutput("Object", "Object3D")
}
GetObjectByUUIDNode.title = "Get Object By UUID"
GetObjectByUUIDNode.prototype.onExecute = function() {
	var uuid = this.properties.uuid
	if (uuid !== undefined || uuid !== "") {
		//var obj = THREE.Object3D.prototype.getObjectByProperty("uuid", uuid)
		//this.setOutputData(0, obj)
		//var obj = Editor.program_running.getObjectByProperty("uuid", uuid)
		if (Editor.program_running === undefined || Editor.program_running === null) {
			if (Main.program === null || Main.program === undefined) {
				return
			} else {
				var obj = Main.program.getObjectByProperty("uuid", uuid)
			}
		} else {
			var obj = Editor.program_running.getObjectByProperty("uuid", uuid)
		}
		this.setOutputData(0, obj)
	}
}

function GetObjectPositionNode() {
	this.addInput("Object", "Object3D")
	this.addOutput("Position", "Vector")
}
GetObjectPositionNode.title = "Get Position"
GetObjectPositionNode.prototype.onExecute = function() {
	var o = this.getInputData(0)

	if (o !== undefined) {
		this.setOutputData(0, o.position)
	}
}

function GetObjectRotationNode() {
	this.addInput("Object", "Object3D")
	this.addOutput("Rotation", "Euler")
}
GetObjectRotationNode.title = "Get Rotation"
GetObjectRotationNode.prototype.onExecute = function() {
	var o = this.getInputData(0)

	if (o !== undefined) {
		this.setOutputData(0, o.rotation)
	}
}

function GetObjectScaleNode() {
	this.addInput("Object", "Object3D")
	this.addOutput("Scale", "Vector")
}
GetObjectScaleNode.title = "Get Scale"
GetObjectScaleNode.prototype.onExecute = function() {
	var o = this.getInputData(0)

	if (o !== undefined) {
		this.setOutputData(0, o.scale)
	}
}

function registerObjectNodes() {
	LiteGraph.registerNodeType("Objects/Element", ElementNode)
	LiteGraph.registerNodeType("Objects/GetObjectByName", GetObjectByNameNode)
	LiteGraph.registerNodeType("Objects/GetObjectByUUID", GetObjectByUUIDNode)
	LiteGraph.registerNodeType("Objects/GetObjectPosition", GetObjectPositionNode)
	LiteGraph.registerNodeType("Objects/GetObjectRotation", GetObjectRotationNode)
	LiteGraph.registerNodeType("Objects/GetObjectScale", GetObjectScaleNode)
}
