function ColorNode() {
	this.addInput("Red", "number")
	this.addInput("Green", "number")
	this.addInput("Blue", "number")

	this.addOutput("Colour", "Color")
}
ColorNode.title = "Colour"
ColorNode.prototype.onExecute = function() {
	var r = this.getInputData(0)
	var g = this.getInputData(1)
	var b = this.getInputData(2)
	if (r === undefined) {
		r = 1
	}
	if (g === undefined) {
		g = 1
	}
	if (b === undefined) {
		b = 1
	}
	this.setOutputData(0, new THREE.Color(`rgb(${r},${g},${b})`))
}

// TODO: Add every THREE.Color method and colours

function registerMaterialNodeColor() {
	LiteGraph.registerNodeType("Color/Color", ColorNode)
}