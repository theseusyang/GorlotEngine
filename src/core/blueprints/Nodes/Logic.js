function IfEqualsNode() {
	this.addInput("Input 1", null)
	this.addInput("Input 2", null)

	this.addOutput("Output", "Boolean")
}
IfEqualsNode.title = "If Equals"
IfEqualsNode.prototype.onExecute = function() {
	var i1 = this.getInputData(0)
	var i2 = this.getInputData(1)

	this.setOutputData(0, i1 === i2)
}

LiteGraph.registerNodeType("Logic/IfEquals", IfEqualsNode)