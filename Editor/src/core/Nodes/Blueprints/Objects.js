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

	if(o !== undefined && o !== null) {
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

}

function GetObjectByNameNode() {
	this.addProperty("name", "")
	this.widget = this.addWidget("text", "Name", "", "name")
	this.widgets_up = true

	this.addOutput("Object", "Object3D")
}
GetObjectByNameNode.title = "Object By Name"
GetObjectByNameNode.prototype.onExecute = function() {

	var n = this.properties.name

	if(n !== "") {
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
}

function GetObjectByUUIDNode() {
	this.addProperty("uuid", "")
	this.widget = this.addWidget("text", "UUID", "", "uuid")
	this.widgets_up = true

	this.addOutput("Object", "Object3D")
}
GetObjectByUUIDNode.title = "Get Object By UUID"
GetObjectByUUIDNode.prototype.onExecute = function() {

	var uuid = this.properties.uuid

	if (uuid !== undefined || uuid !== "") {
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

	if (o !== undefined && o !== null) {
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

	if (o !== undefined && o !== null) {
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

	if (o !== undefined && o !== null) {
		this.setOutputData(0, o.scale)
	}
}

function SetObjectPositionNode() {
	this.addInput("Object", "Object3D")
	this.addInput("Position", "Vector")
}
SetObjectPositionNode.title = "Set Position"
SetObjectPositionNode.prototype.onExecute = function() {
	var o = this.getInputData(0)
	var p = this.getInputData(1)

	if (o !== undefined && o !== null) {
		if(p !== undefined) {
			o.position.copy(p)
		}
	}
}

function SetObjectRotationNode() {
	this.addInput("Object", "Object3D")
	this.addInput("Rotation", "Euler")
}
SetObjectRotationNode.title = "Set Rotation"
SetObjectRotationNode.prototype.onExecute = function() {
	var o = this.getInputData(0)
	var r = this.getInputData(1)

	if (o !== undefined) {
		if (r !== undefined) {
			o.rotation.copy(r)
		}
	}
}

function SetObjectScaleNode() {
	this.addInput("Object", "Object3D")
	this.addInput("Scale", "Vector")
}
SetObjectScaleNode.title = "Set Scale"
SetObjectScaleNode.prototype.onExecute = function() {
	var o = this.getInputData(0)
	var s = this.getInputData(1)

	if (o !== undefined && o !== null) {
		if (s !== undefined) {
			o.scale.copy(s)
		}
	}
}

function registerObjectNodes() {
	LiteGraph.registerNodeType("Objects/Element", ElementNode)
	LiteGraph.registerNodeType("Objects/GetObjectByName", GetObjectByNameNode)
	LiteGraph.registerNodeType("Objects/GetObjectByUUID", GetObjectByUUIDNode)
	LiteGraph.registerNodeType("Objects/GetObjectPosition", GetObjectPositionNode)
	LiteGraph.registerNodeType("Objects/GetObjectRotation", GetObjectRotationNode)
	LiteGraph.registerNodeType("Objects/GetObjectScale", GetObjectScaleNode)
	LiteGraph.registerNodeType("Objects/SetObjectPosition", SetObjectPositionNode)
	LiteGraph.registerNodeType("Objects/SetObjectRotation", SetObjectRotationNode)
	LiteGraph.registerNodeType("Objects/SetObjectScale", SetObjectScaleNode)
}
