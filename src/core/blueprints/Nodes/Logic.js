function IfEqualsNode() {
	this.addInput("Input 1")
	this.addInput("Input 2")

	this.addOutput("Output", "Boolean")
}
IfEqualsNode.title = "Equals"
IfEqualsNode.prototype.onExecute = function() {
	var i1 = this.getInputData(0)
	var i2 = this.getInputData(1)

	if(i1 !== undefined && i2 !== undefined) {
		this.setOutputData(0, i1 === i2)
	}
}

function IfNotEqualsNode() {
	this.addInput("Input 1")
	this.addInput("Input 2")

	this.addOutput("Output", "Boolean")
}
IfNotEqualsNode.title = "Not Equals"
IfNotEqualsNode.prototype.onExecute = function() {
	var i1 = this.getInputData(0)
	var i2 = this.getInputData(1)

	if (i1 !== undefined && i2 !== undefined) {
		this.setOutputData(0, i1 !== i2)
	}
}

function IfGreaterThanNode() {
	this.addInput("Input")
	this.addInput("Value", "number")
	this.addOutput("Output", "Boolean")
}
IfGreaterThanNode.title = "Greater Than"
IfGreaterThanNode.prototype.onExecute = function() {
	var i = this.getInputData(0)
	var v = this.getInputData(1)

	if (i !== undefined && v !== undefined) {
		this.setOutputData(0, i > v)
	}
}

function IfLessThanNode() {
	this.addInput("Input")
	this.addInput("Value", "number")
	this.addOutput("Output", "Boolean")
}
IfLessThanNode.title = "Less Than"
IfLessThanNode.prototype.onExecute = function() {
	var i = this.getInputData(0)
	var v = this.getInputData(1)

	if (i !== undefined && v !== undefined) {
		this.setOutputData(0, i < v)
	}
}

LiteGraph.registerNodeType("Logic/IfEquals", IfEqualsNode)
LiteGraph.registerNodeType("Logic/IfNotEquals", IfNotEqualsNode)
LiteGraph.registerNodeType("Logic/IfGreaterThan", IfGreaterThanNode)
LiteGraph.registerNodeType("Logic/IfLessThan", IfLessThanNode)