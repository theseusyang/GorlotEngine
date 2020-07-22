function ThisNode() {
	this.addOutput("Object", "Object3D")
}
ThisNode.title_color = NodesHelper.colours.red[0]
ThisNode.title_color1 = NodesHelper.colours.red[1]
ThisNode.title_color2 = NodesHelper.colours.red[1]
ThisNode.title_text_color = NodesHelper.title_colours.white
ThisNode.title = "this"
ThisNode.prototype.onExecute = function() {

	if (this.graph === undefined) 
		return

	if (this.graph.config.attachedTo !== undefined) {
		var u = this.graph.config.attachedTo

		if (Editor.program_running === undefined || Editor.program_running === null) {
			if (Main.program === null || Main.program === undefined) {
				return
			} else {
				this.setOutputData(0, Main.program.scene.getObjectByProperty("uuid", u))
			}
		} else {
			this.setOutputData(0, Editor.program_running.scene.getObjectByProperty("uuid", u))
		}

	}
}

function ElementNode() {
	this.addInput("Object", "Object3D")

	this.addInput("Position", "Vector")
	this.addInput("Rotation", "Eular")
	this.addInput("Scale", "Vector")

	this.addOutput("Position", "Vector")
	this.addOutput("Rotation", "Euler")
	this.addOutput("Scale", "Vector")
}
ElementNode.title_color = NodesHelper.colours.red[0]
ElementNode.title_color1 = NodesHelper.colours.red[1]
ElementNode.title_color2 = NodesHelper.colours.red[1]
ElementNode.title_text_color = NodesHelper.title_colours.white
ElementNode.title = "Element"
ElementNode.prototype.onExecute = function() {
	
	var o, p, r, s

	o = this.getInputData(0)

	if(o !== undefined || o !== null) {
		p = this.getInputData(1)
		r = this.getInputData(2)
		s = this.getInputData(3)
	
		if (o === undefined) 
			return

		if (p === undefined) {
			p = o.position
		}
		// TODO: r = euler
		if (s === undefined) {
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
	this.addInput("Name", "Text")
	this.addProperty("name", "")
	this.widget = this.addWidget("text", "Name", "", "name")

	this.addOutput("Object", "Object3D")
}
GetObjectByNameNode.title_color = NodesHelper.colours.red[0]
GetObjectByNameNode.title_color1 = NodesHelper.colours.red[1]
GetObjectByNameNode.title_color2 = NodesHelper.colours.red[1]
GetObjectByNameNode.title_text_color = NodesHelper.title_colours.white
GetObjectByNameNode.title = "Object By Name"
GetObjectByNameNode.prototype.onExecute = function() {

	var n = this.getInputData(0)

	if (n === undefined) 
		n = this.properties.name

	if (n === "") 
		return

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
	this.addInput("UUID", "Text")
	this.addProperty("uuid", "")
	this.widget = this.addWidget("text", "UUID", "", "uuid")

	this.addOutput("Object", "Object3D")
}
GetObjectByUUIDNode.title_color = NodesHelper.colours.red[0]
GetObjectByUUIDNode.title_color1 = NodesHelper.colours.red[1]
GetObjectByUUIDNode.title_color2 = NodesHelper.colours.red[1]
GetObjectByUUIDNode.title_text_color = NodesHelper.title_colours.white
GetObjectByUUIDNode.title = "Get Object By UUID"
GetObjectByUUIDNode.prototype.onExecute = function() {

	var uuid = this.getInputData(0)

	if (uuid === undefined) 
		uuid = this.properties.UUID

	if (uuid === "") 
		return

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

function GetObjectPositionNode() {
	this.addInput("Object", "Object3D")
	this.addOutput("Position", "Vector")
}
GetObjectPositionNode.title_color = NodesHelper.colours.red[0]
GetObjectPositionNode.title_color1 = NodesHelper.colours.red[1]
GetObjectPositionNode.title_color2 = NodesHelper.colours.red[1]
GetObjectPositionNode.title_text_color = NodesHelper.title_colours.white
GetObjectPositionNode.title = "Get Position"
GetObjectPositionNode.prototype.onExecute = function() {
	var o = this.getInputData(0)

	if (o === undefined || o === null) 
		return

	this.setOutputData(0, o.position)
}

function GetObjectRotationNode() {
	this.addInput("Object", "Object3D")
	this.addOutput("Rotation", "Euler")
}
GetObjectRotationNode.title_color = NodesHelper.colours.red[0]
GetObjectRotationNode.title_color1 = NodesHelper.colours.red[1]
GetObjectRotationNode.title_color2 = NodesHelper.colours.red[1]
GetObjectRotationNode.title_text_color = NodesHelper.title_colours.white
GetObjectRotationNode.title = "Get Rotation"
GetObjectRotationNode.prototype.onExecute = function() {
	var o = this.getInputData(0)

	if (o === undefined || o === null) 
		return

	this.setOutputData(0, o.rotation)
}

function GetObjectScaleNode() {
	this.addInput("Object", "Object3D")
	this.addOutput("Scale", "Vector")
}
GetObjectScaleNode.title_color = NodesHelper.colours.red[0]
GetObjectScaleNode.title_color1 = NodesHelper.colours.red[1]
GetObjectScaleNode.title_color2 = NodesHelper.colours.red[1]
GetObjectScaleNode.title_text_color = NodesHelper.title_colours.white
GetObjectScaleNode.title = "Get Scale"
GetObjectScaleNode.prototype.onExecute = function() {
	var o = this.getInputData(0)

	if (o === undefined || o === null) 
		return

	this.setOutputData(0, o.scale)
}

function SetObjectPositionNode() {
	this.addInput("Object", "Object3D")
	this.addInput("Position", "Vector")
}
SetObjectPositionNode.title_color = NodesHelper.colours.red[0]
SetObjectPositionNode.title_color1 = NodesHelper.colours.red[1]
SetObjectPositionNode.title_color2 = NodesHelper.colours.red[1]
SetObjectPositionNode.title_text_color = NodesHelper.title_colours.white
SetObjectPositionNode.title = "Set Position"
SetObjectPositionNode.prototype.onExecute = function() {
	var o = this.getInputData(0)
	var p = this.getInputData(1)

	if (p === undefined || o === null || p === undefined) 
		return

	o.position.copy(p)
}

function SetObjectRotationNode() {
	this.addInput("Object", "Object3D")
	this.addInput("Rotation", "Euler")
}
SetObjectRotationNode.title_color = NodesHelper.colours.red[0]
SetObjectRotationNode.title_color1 = NodesHelper.colours.red[1]
SetObjectRotationNode.title_color2 = NodesHelper.colours.red[1]
SetObjectRotationNode.title_text_color = NodesHelper.title_colours.white
SetObjectRotationNode.title = "Set Rotation"
SetObjectRotationNode.prototype.onExecute = function() {
	var o = this.getInputData(0)
	var r = this.getInputData(1)

	if (o === undefined || o === null || r === undefined) 
		return

	o.rotation.copy(r)
}

function SetObjectScaleNode() {
	this.addInput("Object", "Object3D")
	this.addInput("Scale", "Vector")
}
SetObjectScaleNode.title_color = NodesHelper.colours.red[0]
SetObjectScaleNode.title_color1 = NodesHelper.colours.red[1]
SetObjectScaleNode.title_color2 = NodesHelper.colours.red[1]
SetObjectScaleNode.title_text_color = NodesHelper.title_colours.white
SetObjectScaleNode.title = "Set Scale"
SetObjectScaleNode.prototype.onExecute = function() {
	var o = this.getInputData(0)
	var s = this.getInputData(1)

	if (o === undefined || o == null || s === undefined) 
		return

	o.scale.copy(s)
}

function registerObjectNodes() {
	LiteGraph.registerNodeType("Objects/This", ThisNode)
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
