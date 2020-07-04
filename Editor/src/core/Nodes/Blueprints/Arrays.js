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

function PushNode() {
	this.addInput("Array", "Array")
	this.addInput("Element")
	this.addOutput("Array")
}
PushNode.title = "Push"
PushNode.prototype.onExecute = function() {
	var a = this.getInputData(0)
	a.push(this.getInputData(1))
	this.setOutputData(0, a)
}

function RemoveFirstNode() {
	this.addInput("Array", "Array")
	this.addOutput("Array", "Array")
}
RemoveFirstNode.title = "Remove First"
RemoveFirstNode.prototype.onExecute = function() {
	var a = this.getInputData(0)
	if (a !== undefined) {
		a.shift()
		this.setOutputData(0, a)
	}
}

function RemoveLastNode() {
	this.addInput("Array", "Array")
	this.addOutput("Array", "Array")
}
RemoveLastNode.title = "Remove Last"
RemoveLastNode.prototype.onExecute = function() {
	var a = this.getInputData(0)

	if (a !== undefined) {
		a.pop()
		this.setOutputData(0, a)
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

function GetLastItemNode() {
	this.addInput("Array", "Array")
	this.addOutput("Item")
}
GetLastItemNode.title = "Get Last Item"
GetLastItemNode.prototype.onExecute = function() {
	var a = this.getInputData(0)
	if (a !== undefined && a.length > 0) {
		this.setOutputData(0, a[a.length - 1])
	}
}

function SetValueAtPositionNode() {
	this.addInput("Array", "Array")
	this.addInput("Position", "number")
	this.addInput("Value")
}
SetValueAtPositionNode.title = "Set At Position"
SetValueAtPositionNode.prototype.onExecute = function() {
	var a = this.getInputData(0)
	var p = this.getInputData(1)
	var v = this.getInputData(2)

	if (a !== undefined && p !== undefined && v !== undefined) {
		if (a.length > p) {
			a[p] = v
		} else {
			return
		}
	}
}

function IsArrayNode() {
	this.addInput("Item")
	this.addOutput("Out", "Boolean")
}
IsArrayNode.title = "Is Array"
IsArrayNode.prototype.onExecute = function() {
	var i = this.getInputData(0)
	this.setOutputData(0, Array.isArray(i))
}

function ToStringNode() {
	this.addInput("Array", "Array")
	this.addOutput("String", "Text")
}
ToStringNode.title = "To String"
ToStringNode.prototype.onExecute = function() {
	var a = this.getInputData(0)
	if (a !== undefined) {
		this.setOutputData(0, a.toString())
	}
}

function JoinNode() {
	this.addInput("Array", "Array")
	this.addInput("Separator", "Text")
	this.addOutput("Out", "Text")
}
JoinNode.title = "Join"
JoinNode.prototype.onExecute = function() {
	var a = this.getInputData(0)
	var s = this.getInputData(1)

	if (a !== undefined && s !== undefined) {
		this.setOutputData(0, a.join(s))
	}
}

function MergeNode() {
	this.addInput("Array", "Array")
	this.addInput("Array", "Array")
	this.addOutput("Array", "Array")
}
MergeNode.title = "Merge"
MergeNode.prototype.onExecute = function() {
	var a1 = this.getInputData(0)
	var a2 = this.getInputData(1)
	if (a1 !== undefined && a2 !== undefined) {
		var n = a1.concat(a2)
		this.setOutputData(0, n)
	}
}

function registerArrayNodes() {
	LiteGraph.registerNodeType("Array/Array", ArrayNode)
	LiteGraph.registerNodeType("Array/Push", PushNode)
	LiteGraph.registerNodeType("Array/RemoveFirst", RemoveFirstNode)
	LiteGraph.registerNodeType("Array/RemoveLast", RemoveLastNode)
	LiteGraph.registerNodeType("Array/GetArrayLength", GetArrayLengthNode)
	LiteGraph.registerNodeType("Array/GetArrayPositionItem", GetArrayPositionItemNode)
	LiteGraph.registerNodeType("Array/GetLastItem", GetLastItemNode)
	LiteGraph.registerNodeType("Array/SetValueAtPosition", SetValueAtPositionNode)
	LiteGraph.registerNodeType("Array/IsArray", IsArrayNode)
	LiteGraph.registerNodeType("Array/ToString", ToStringNode)
	LiteGraph.registerNodeType("Array/Join", JoinNode)
	LiteGraph.registerNodeType("Array/Merge", MergeNode)
}