function ElementNode() {
	this.addInput("Object", "Object3D")

	this.addInput("Position", "Vector")
	this.addInput("Rotation", "Vector")
	this.addInput("Scale", "Vector")

	this.addOutput("Position", "Vector")
	this.addOutput("Rotation", "Vector")
	this.addOutput("Scale", "Vector")
}
ElementNode.title = "Element"
ElementNode.prototype.onExecute = function() {
	// TODO: Set and get

	var o, p, r, s

	o = this.getInputData(0)

	console.log(o)

//	p = this.getInputData(1)
//	r = this.getInputData(2)
//	s = this.getInputData(3)
//
//	if (o === undefined) {
//		return
//	}
//	if (p === undefined) {
//		p = o.position
//	}
//	if (r === undefined) {
//		r = o.rotation
//	}
//	if (s === undefined) {
//		s = o.scale
//	}
//
//	o.position.set(p.x, p.y, p.z)
//	o.rotation.set(r.x, r.y, r.z)
//	o.scale.set(s.x, s.y, s.z)

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
	if (Editor.program.scene === undefined) {
		return
	}
	this.setOutputData(0, Editor.program.scene.getObjectByName(n))
}

LiteGraph.registerNodeType("Objects/Element", ElementNode)
LiteGraph.registerNodeType("Objects/GetObjectByName", GetObjectByNameNode)