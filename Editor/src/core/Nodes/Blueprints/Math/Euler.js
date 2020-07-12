function EulerNode() {
	this.addInput("X", "number")
	this.addInput("Y", "number")
	this.addInput("Z", "number")
	this.addInput("Order", "Text")

	this.setProperty("x", 0)
	this.setProperty("y", 0)
	this.setProperty("z", 0)
	this.setProperty("order", "XYZ")

	this.widget_x = this.addWidget("number", "X", 0, "x")
	this.widget_y = this.addWidget("number", "Y", 0, "y")
	this.widget_z = this.addWidget("number", "Z", 0, "z")
	this.widget_order = this.addWidget("text", "Order", "XYZ", "order")

	this.addOutput("Euler", "Euler")
}
EulerNode.title = "Euler"
EulerNode.prototype.onExecute = function() {
	var x = this.getInputData(0)
	var y = this.getInputData(1)
	var z = this.getInputData(2)
	var order = this.getInputData(3)

	if (x === undefined) {
		x = this.properties["x"]
	}
	if (y === undefined) {
		y = this.properties["y"]
	}
	if (z === undefined) {
		z = this.properties["z"]
	}
	if (order === undefined) {
		order = this.properties["order"]
	}

	this.setOutputData(0, new THREE.Euler(x, y, z, order))
}
EulerNode.prototype.onPropertyChanged = function() {
	if (this.graph && this.graph.onNodeConnectionChange) {
       this.graph.onNodeConnectionChange()
    }
}

function EulerGetXNode() {
	this.addInput("Euler", "Euler")
	this.addOutput("X", "number")
}
EulerGetXNode.title = "Get X"
EulerGetXNode.prototype.onExecute = function() {
	var e = this.getInputData(0)

	if (e !== undefined) {
		this.setOutputData(0, e.x)
	}
}

function EulerGetYNode() {
	this.addInput("Euler", "Euler")
	this.addOutput("Y", "number")
}
EulerGetYNode.title = "Get Y"
EulerGetYNode.prototype.onExecute = function() {
	var e = this.getInputData(0)

	if (e !== undefined) {
		this.setOutputData(0, e.y)
	}
}

function EulerGetZNode() {
	this.addInput("Euler", "Euler")
	this.addOutput("Z", "number")
}
EulerGetZNode.title = "Get Z"
EulerGetZNode.prototype.onExecute = function() {
	var e = this.getInputData(0)

	if (e !== undefined) {
		this.setOutputData(0, e.z)
	}
}

function EulerGetOrderNode() {
	this.addInput("Euler", "Euler")
	this.addOutput("Order", "Text")
}
EulerGetOrderNode.title = "Get Order"
EulerGetOrderNode.prototype.onExecute = function() {
	var e = this.getInputData(0)

	if (e !== undefined) {
		this.setOutputData(0, e.order)
	}
}

function EulerCopyNode() {
	this.addInput("Input", "Euler")
	this.addInput("Euler", "Euler")
}
EulerCopyNode.title = "Copy"
EulerCopyNode.prototype.onExecute = function() {
	var i = this.getInputData(0)
	var e = this.getInputData(1)

	if (i !== undefined && e !== undefined) {
		i.copy(e)
	}
}

function EulerCloneNode() {
	this.addInput("Input", "Euler")
	this.addOutput("Output", "Euler")
}
EulerCloneNode.title = "Clone"
EulerCloneNode.prototype.onExecute = function() {
	var i = this.getInputData(0)

	if (i !== undefined) {
		this.setOutputData(0, i.clone())
	}
}

function EulerEqualsNode() {
	this.addInput("Input", "Euler")
	this.addInput("Euler", "Euler")

	this.addOutput("Equals", "Boolean")
}
EulerEqualsNode.title = "Equals"
EulerEqualsNode.prototype.onExecute = function() {
	var i = this.getInputData(0)
	var e = this.getInputData(1)

	if (i !== undefined && e !== undefined) {
		var eq = i.equals(e)
		this.setOutputData(0, eq)
	}
}

function EulerReorderNode() {
	this.addInput("Euler", "Euler")
	this.addInput("Order", "Text")
}
EulerReorderNode.title = "Reorder"
EulerReorderNode.prototype.onExecute = function() {
	var e = this.getInputData(0)
	var o = this.getInputData(1)

	if (e !== undefined && o !== undefined) {
		e.reorder(o)
	}
}

function EulerSetNode() {
	this.addInput("Euler", "Euler")
	this.addInput("X", "number")
	this.addInput("Y", "number")
	this.addInput("Z", "number")
	this.addInput("Order", "Text")

	this.setProperty("x", 0)
	this.setProperty("y", 0)
	this.setProperty("z", 0)
	this.setProperty("order", "XYZ")

	this.widget_x = this.addWidget("number", "X", 0, "x")
	this.widget_y = this.addWidget("number", "Y", 0, "y")
	this.widget_z = this.addWidget("number", "Z", 0, "z")
	this.widget_order = this.addWidget("text", "Order", "XYZ", "order")
}
EulerSetNode.title = "Set"
EulerSetNode.prototype.onExecute = function() {
	var e = this.getInputData(0)

	var x = this.getInputData(1)
	var y = this.getInputData(2)
	var z = this.getInputData(3)
	var o = this.getInputData(4)

	if (x === undefined) {
		x = this.properties["x"]
	}
	if (y === undefined) {
		y = this.properties["y"]
	}
	if (z === undefined) {
		z = this.properties["z"]
	}
	if (o === undefined) {
		o = this.properties["order"]
	}

	e.set(x, y, z, o)
}
EulerSetNode.prototype.onPropertyChanged = function() {
	if (this.graph && this.graph.onNodeConnectionChange) {
       this.graph.onNodeConnectionChange()
    }
}

function EulerSetFromQuaternionNode() {
	this.addInput("Euler", "Euler")
	this.addInput("Quaternion", "Quaternion")
	this.addInput("Order", "Text")
}
EulerSetFromQuaternionNode.title = "From Quaternion"
EulerSetFromQuaternionNode.prototype.onExecute = function() {
	var e = this.getInputData(0)
	var q = this.getInputData(1)
	var o = this.getInputData(2)

	if (q !== undefined) {
		e.setFromQuaternion(q, o)
	}
}

function EulerSetFromVector3Node() {
	this.addInput("Euler", "Euler")
	this.addInput("Vector3", "Vector")
	this.addInput("Order", "Text")
}
EulerSetFromVector3Node.title = "From Vector3"
EulerSetFromVector3Node.prototype.onExecute = function() {
	var e = this.getInputData(0)
	var v = this.getInputData(1)
	var o = this.getInputData(2)

	if (v !== undefined) {
		e.setFromVector3(v, o)
	}
}

function registerEulerNodes() {
	LiteGraph.registerNodeType("Euler/Euler", EulerNode)
	LiteGraph.registerNodeType("Euler/EulerGetX", EulerGetXNode)
	LiteGraph.registerNodeType("Euler/EulerGetY", EulerGetYNode)
	LiteGraph.registerNodeType("Euler/EulerGetZ", EulerGetZNode)
	LiteGraph.registerNodeType("Euler/EulerGetOrder", EulerGetOrderNode)
	LiteGraph.registerNodeType("Euler/EulerCopy", EulerCopyNode)
	LiteGraph.registerNodeType("Euler/EulerClone", EulerCloneNode)
	LiteGraph.registerNodeType("Euler/EulerEquals", EulerEqualsNode)
	LiteGraph.registerNodeType("Euler/EulerReorder", EulerReorderNode)
	LiteGraph.registerNodeType("Euler/EulerSet", EulerSetNode)
	LiteGraph.registerNodeType("Euler/EulerSetFromQuaternion", EulerSetFromQuaternionNode)
	LiteGraph.registerNodeType("Euler/EulerSetFromVector3", EulerSetFromVector3Node)
}