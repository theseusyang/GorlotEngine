function Element() {
	this.addInput("Object", "Object3D")

	this.addInput("Position", "Vector")
	this.addInput("Rotation", "Vector")
	this.addInput("Scale", "Vector")

	this.addOutput("Position", "Vector")
	this.addOutput("Rotation", "Vector")
	this.addOutput("Scale", "Vector")
}
Element.title = "Element"
Element.prototype.onExecute = function() {
	var p, r, s
}

LiteGraph.registerNodeType("Objects/Element", Element)