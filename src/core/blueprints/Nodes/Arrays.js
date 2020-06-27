function ArrayNode() {
	this.addOutput("Array", "Array")
}
ArrayNode.title = "Array"
ArrayNode.prototype.onGetInputs = function() {
	return [["Element", null]]
}
ArrayNode.prototype.onExecute = function() {
	var arr = []
	if(this.inputs) {
		for(var i = 0; i < this.inputs.length; i++) {
			var input = this.inputs[i]
			var value = this.getInputData(i)
			arr.push(value)
		}
		if (arr.length > 0) {
			this.setOutputData(0, arr)
		}
	}
}

function GetArrayLengthNode() {
	this.addInput("Array", "Array")
	this.addOutput("Length", "number")
}
GetArrayLengthNode.title = "Length"
GetArrayLengthNode.prototype.onExecute = function() {
	var ar = this.getInputData(0)
	if (ar instanceof Array) {
		this.setOutputData(0, ar.length)
	}
}

function GetArrayPositionItemNode() {
	this.addInput("Array", "Array")
	this.addInput("Position", "number")
	this.addOutput("Item")
}
GetArrayPositionItemNode.title = "Get Position Item"
GetArrayPositionItemNode.prototype.onExecute = function() {
	var ar = this.getInputData(0)
	var pos = this.getInputData(1)

	if (ar !== undefined && ar instanceof Array && pos !== undefined) {
		this.setOutputData(0, ar[pos])
	}
}

LiteGraph.registerNodeType("Array/Array", ArrayNode)
LiteGraph.registerNodeType("Array/GetArrayLength", GetArrayLengthNode)
LiteGraph.registerNodeType("Array/GetArrayPositionItem", GetArrayPositionItemNode)