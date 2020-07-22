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
EulerNode.title_color = NodesHelper.colours.chocolate[0]
EulerNode.title_color1 = NodesHelper.colours.chocolate[1]
EulerNode.title_color2 = NodesHelper.colours.chocolate[1]
EulerNode.title_text_color = NodesHelper.title_colours.white
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
EulerGetXNode.title_color = NodesHelper.colours.lightpink[0]
EulerGetXNode.title_color1 = NodesHelper.colours.lightpink[1]
EulerGetXNode.title_color2 = NodesHelper.colours.lightpink[1]
EulerGetXNode.title_text_color = NodesHelper.title_colours.white
EulerGetXNode.title = "Get X"
EulerGetXNode.prototype.onExecute = function() {
	var e = this.getInputData(0)

	if (e === undefined) 
		return

	this.setOutputData(0, e.x)
}

function EulerGetYNode() {
	this.addInput("Euler", "Euler")
	this.addOutput("Y", "number")
}
EulerGetYNode.title_color = NodesHelper.colours.lightpink[0]
EulerGetYNode.title_color1 = NodesHelper.colours.lightpink[1]
EulerGetYNode.title_color2 = NodesHelper.colours.lightpink[1]
EulerGetYNode.title_text_color = NodesHelper.title_colours.white
EulerGetYNode.title = "Get Y"
EulerGetYNode.prototype.onExecute = function() {
	var e = this.getInputData(0)

	if (e === undefined) 
		return

	this.setOutputData(0, e.y)
}

function EulerGetZNode() {
	this.addInput("Euler", "Euler")
	this.addOutput("Z", "number")
}
EulerGetZNode.title_color = NodesHelper.colours.lightpink[0]
EulerGetZNode.title_color1 = NodesHelper.colours.lightpink[1]
EulerGetZNode.title_color2 = NodesHelper.colours.lightpink[1]
EulerGetZNode.title_text_color = NodesHelper.title_colours.white
EulerGetZNode.title = "Get Z"
EulerGetZNode.prototype.onExecute = function() {
	var e = this.getInputData(0)

	if (e === undefined) 
		return

	this.setOutputData(0, e.z)
}

function EulerGetOrderNode() {
	this.addInput("Euler", "Euler")
	this.addOutput("Order", "Text")
}
EulerGetOrderNode.title_color = NodesHelper.colours.lightpink[0]
EulerGetOrderNode.title_color1 = NodesHelper.colours.lightpink[1]
EulerGetOrderNode.title_color2 = NodesHelper.colours.lightpink[1]
EulerGetOrderNode.title_text_color = NodesHelper.title_colours.white
EulerGetOrderNode.title = "Get Order"
EulerGetOrderNode.prototype.onExecute = function() {
	var e = this.getInputData(0)

	if (e === undefined) 
		return

	this.setOutputData(0, e.order)
}

function EulerCopyNode() {
	this.addInput("Input", "Euler")
	this.addInput("Euler", "Euler")
}
EulerCopyNode.title_color = NodesHelper.colours.lightpink[0]
EulerCopyNode.title_color1 = NodesHelper.colours.lightpink[1]
EulerCopyNode.title_color2 = NodesHelper.colours.lightpink[1]
EulerCopyNode.title_text_color = NodesHelper.title_colours.white
EulerCopyNode.title = "Copy"
EulerCopyNode.prototype.onExecute = function() {
	var i = this.getInputData(0)
	var e = this.getInputData(1)

	if (i === undefined || e === undefined) 
		return

	i.copy(e)
}

function EulerCloneNode() {
	this.addInput("Input", "Euler")
	this.addOutput("Output", "Euler")
}
EulerCloneNode.title_color = NodesHelper.colours.lightpink[0]
EulerCloneNode.title_color1 = NodesHelper.colours.lightpink[1]
EulerCloneNode.title_color2 = NodesHelper.colours.lightpink[1]
EulerCloneNode.title_text_color = NodesHelper.title_colours.white
EulerCloneNode.title = "Clone"
EulerCloneNode.prototype.onExecute = function() {
	var i = this.getInputData(0)

	if (i === undefined) 
		return

	this.setOutputData(0, i.clone())
}

function EulerEqualsNode() {
	this.addInput("Input", "Euler")
	this.addInput("Euler", "Euler")

	this.addOutput("Equals", "Boolean")
}
EulerEqualsNode.title_color = NodesHelper.colours.lightpink[0]
EulerEqualsNode.title_color1 = NodesHelper.colours.lightpink[1]
EulerEqualsNode.title_color2 = NodesHelper.colours.lightpink[1]
EulerEqualsNode.title_text_color = NodesHelper.title_colours.white
EulerEqualsNode.title = "Equals"
EulerEqualsNode.prototype.onExecute = function() {
	var i = this.getInputData(0)
	var e = this.getInputData(1)

	if (i === undefined || e === undefined) 
		return

	var eq = i.equals(e)
	this.setOutputData(0, eq)
}

function EulerReorderNode() {
	this.addInput("Euler", "Euler")
	this.addInput("Order", "Text")
}
EulerReorderNode.title_color = NodesHelper.colours.lightpink[0]
EulerReorderNode.title_color1 = NodesHelper.colours.lightpink[1]
EulerReorderNode.title_color2 = NodesHelper.colours.lightpink[1]
EulerReorderNode.title_text_color = NodesHelper.title_colours.white
EulerReorderNode.title = "Reorder"
EulerReorderNode.prototype.onExecute = function() {
	var e = this.getInputData(0)
	var o = this.getInputData(1)

	if (e === undefined || o === undefined) 
		return

	e.reorder(o)
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
EulerSetNode.title_color = NodesHelper.colours.lightpink[0]
EulerSetNode.title_color1 = NodesHelper.colours.lightpink[1]
EulerSetNode.title_color2 = NodesHelper.colours.lightpink[1]
EulerSetNode.title_text_color = NodesHelper.title_colours.white
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
EulerSetFromQuaternionNode.title_color = NodesHelper.colours.lightpink[0]
EulerSetFromQuaternionNode.title_color1 = NodesHelper.colours.lightpink[1]
EulerSetFromQuaternionNode.title_color2 = NodesHelper.colours.lightpink[1]
EulerSetFromQuaternionNode.title_text_color = NodesHelper.title_colours.white
EulerSetFromQuaternionNode.title = "From Quaternion"
EulerSetFromQuaternionNode.prototype.onExecute = function() {
	var e = this.getInputData(0)
	var q = this.getInputData(1)
	var o = this.getInputData(2)

	if (q === undefined) 
		return

	e.setFromQuaternion(q, o)
}

function EulerSetFromVector3Node() {
	this.addInput("Euler", "Euler")
	this.addInput("Vector3", "Vector")
	this.addInput("Order", "Text")
}
EulerSetFromVector3Node.title_color = NodesHelper.colours.lightpink[0]
EulerSetFromVector3Node.title_color1 = NodesHelper.colours.lightpink[1]
EulerSetFromVector3Node.title_color2 = NodesHelper.colours.lightpink[1]
EulerSetFromVector3Node.title_text_color = NodesHelper.title_colours.white
EulerSetFromVector3Node.title = "From Vector3"
EulerSetFromVector3Node.prototype.onExecute = function() {
	var e = this.getInputData(0)
	var v = this.getInputData(1)
	var o = this.getInputData(2)

	if (v === undefined) 
		return

	e.setFromVector3(v, o)
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