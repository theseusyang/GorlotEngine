function ColorNode() {
	this.addInput("Colour", "Text")
	this.addOutput("Colour", "Color")
}
ColorNode.title = "Colour"
ColorNode.prototype.onExecute = function() {
	var h = this.getInputData(0)
	if (h !== undefined) {
		this.setOutputData(0, new THREE.Color(h))
	}
}

function registerMaterialNodeColor() {
	LiteGraph.registerNodeType("Color/Color", ColorNode)
}