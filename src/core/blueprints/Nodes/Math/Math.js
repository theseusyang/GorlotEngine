function ENode() {
	this.addOutput("E", "number")
}
ENode.title = "Euler"
ENode.onExecute = function() {
	this.setOutputData(0, Math.E)
}


function LN2Node() {
	this.addOutput("LN2", "number")
}
LN2Node.title = "LN2"
LN2Node.onExecute = function() {
	this.setOutputData(0, Math.LN2)
}


function LN10Node() {
	this.addOutput("LN10", "number")
}
LN10Node.title = "LN10"
LN10Node.onExecute = function() {
	this.setOutputData(0, Math.LN10)
}


function AbsNode() {
	this.addInput("X", "number")
	this.addOutput("Result", "number")
}
AbsNode.title = "Abs"
AbsNode.onExecute = function() {
	var x = this.getInputData(0)
	if (x === undefined) {
		x = 0
	}
	this.setOutputData(0, Math.abs(x))
}


function AcosNode() {
	this.addInput("X", "number")
	this.addOutput("Result", "number")
}
AcosNode.title = "Arccosine"
AcosNode.onExecute = function() {
	var x = this.getInputData(0)
	if (x === undefined) {
		x = 0
	}
	this.setOutputData(0, Math.acos(x))
}


function AcoshNode() {
	this.addInput("X", "number")
	this.addOutput("Result", "number")
}
AcoshNode.title = "Hyperbolic Arccosine"
AcoshNode.onExecute = function() {
	var x = this.getInputData(0)
	if (x === undefined) {
		x = 0
	}
	this.setOutputData(0, Math.acosh(x))
}


function AsinNode() {
	this.addInput("X", "number")
	this.addOutput("Result", "number")
}
AsinNode.title = "Arcsine"
AsinNode.onExecute = function() {
	var x = this.getInputData(0)
	if (x === undefined) {
		x = 0
	}
	this.setOutputData(0, Math.asin(x))
}


function AsinhNode() {
	this.addInput("X", "number")
	this.addOutput("Result", "number")
}
AsinhNode.title = "Hyperbolic Arcsine"
AsinhNode.onExecute = function() {
	var x = this.getInputData(0)
	if (x === undefined) {
		x = 0
	}
	this.setOutputData(0, Math.asinh(x))
}


function AtanNode() {
	this.addInput("X", "number")
	this.addOutput("Result", "number")
}
AtanNode.title = "Arctangent"
AtanNode.onExecute = function() {
	var x = this.getInputData(0)
	if (x === undefined) {
		x = 0
	}
	this.setOutputData(0, Math.atan(x))
}


function AtanhNode() {
	this.addInput("X", "number")
	this.addOutput("Result", "number")
}
AtanhNode.title = "Hyperbolic Arctangent"
AtanhNode.onExecute = function() {
	var x = this.getInputData(0)
	if (x === undefined) {
		x = 0
	}
	this.setOutputData(0, Math.atanh(x))
}


function Atan2Node() {
	this.addInput("X", "number")
	this.addInput("Y", "number")
	this.addOutput("Result", "number")
}
Atan2Node.title = "Arctangent 2"
Atan2Node.onExecute = function() {
	var x = this.getInputData(0)
	var y = this.getInputData(1)
	if (x === undefined) {
		x = 0
	}
	if (y === undefined) {
		y = 0
	}
	this.setOutputData(0, Math.atan2(x, y))
}


function CbrtNode() {
	this.addInput("X", "number")
	this.addOutput("Result", "number")
}
CbrtNode.title = "Cube root"
CbrtNode.onExecute = function() {
	var x = this.getInputData(0)
	if (x === undefined) {
		x = 0
	}
	this.setOutputData(0, Math.cbrt(x))
}


function CeilNode() {
	this.addInput("X", "number")
	this.addOutput("Result", "number")
}
CeilNode.title = "Ceil"
CeilNode.onExecute = function() {
	var x = this.getInputData(0)
	if (x === undefined) {
		x = 0
	}
	this.setOutputData(0, Math.ceil(x))
}


function CosNode() {
	this.addInput("X", "number")
	this.addOutput("Result", "number")
}
CosNode.title = "Cos"
CosNode.onExecute = function() {
	var x = this.getInputData(0)
	if (x === undefined) {
		x = 0
	}
	this.setOutputData(0, Math.cos(x))
}


function ExpNode() {
	this.addInput("X", "number")
	this.addOutput("Result", "number")
}
ExpNode.title = "Exp"
ExpNode.onExecute = function() {
	var x = this.getInputData(0)
	if (x === undefined) {
		x = 0
	}
	this.setOutputData(0, Math.exp(x))
}


function Expm1Node() {
	this.addInput("X", "number")
	this.addOutput("Result", "number")
}
Expm1Node.title = "Exmp1"
Expm1Node.onExecute = function() {
	var x = this.getInputData(0)
	if (x === undefined) {
		x = 0
	}
	this.setOutputData(0, Math.expm1(x))
}


function FloorNode() {
	this.addInput("X", "number")
	this.addOutput("Result", "number")
}
FloorNode.title = "Floor"
FloorNode.onExecute = function() {
	var x = this.getInputData(0)
	if (x === undefined) {
		x = 0
	}
	this.setOutputData(0, Math.floor(x))
}


function LogNode() {
	this.addInput("X", "number")
	this.addOutput("Result", "number")
}
LogNode.title = "Log"
LogNode.onExecute = function() {
	var x = this.getInputData(0)
	if (x === undefined) {
		x = 0
	}
	this.setOutputData(0, Math.log(x))
}


function PowNode() {
	this.addInput("X", "number")
	this.addInput("Y", "number")
	this.addOutput("Result", "number")
}
PowNode.title = "Pow"
PowNode.onExecute = function() {
	var x = this.getInputData(0)
	var y = this.getInputData(1)
	if (x === undefined) {
		x = 0
	}
	if (y === undefined) {
		y = 1
	}
	this.setOutputData(0, Math.pow(x, y))
}


function RandomNode() {
	this.addOutput("Random", "number")
}
RandomNode.title = "Random"
RandomNode.onExecute = function() {
	this.setOutputData(0, Math.random())
}


function RoundNode() {
	this.addInput("X", "number")
	this.addOutput("Result", "number")
}
RoundNode.title = "Round"
RoundNode.onExecute = function() {
	var x = this.getInputData(0)
	if (x === undefined) {
		x = 0
	}
	this.setOutputData(0, Math.round(x))
}


function SignNode() {
	this.addInput("X", "number")
	this.addOutput("Result", "number")
}
SignNode.title = "Sign"
SignNode.onExecute = function() {
	var x = this.getInputData(0)
	if (x === undefined) {
		x = 0
	}
	this.setOutputData(0, Math.sign(x))
}


function SinNode() {
	this.addInput("X", "number")
	this.addOutput("Result", "number")
}
SinNode.title = "Sin"
SinNode.onExecute = function() {
	var x = this.getInputData(0)
	if (x === undefined) {
		x = 0
	}
	this.setOutputData(0, Math.sin(x))
}


function SqrtNode() {
	this.addInput("X", "number")
	this.addOutput("Result", "number")
}
SqrtNode.title = "Sqrt"
SqrtNode.onExecute = function() {
	var x = this.getInputData(0)
	if (x === undefined) {
		x = 0
	}
	this.setOutputData(0, Math.sqrt(x))
}


function TanNode() {
	this.addInput("X", "number")
	this.addOutput("Result", "number")
}
TanNode.title = "Tan"
TanNode.onExecute = function() {
	var x = this.getInputData(0)
	if (x === undefined) {
		x = 0
	}
	this.setOutputData(0, Math.tan(x))
}


function AdditionNode() {
	this.addInput("X", "number")
	this.addInput("Y", "number")
	this.addOutput("Result", "number")
}
AdditionNode.title = "Addition"
AdditionNode.onExecute = function() {
	var x = this.getInputData(0)
	var y = this.getInputData(1)
	if (x === undefined) {
		x = 0
	}
	if (y === undefined) {
		y = 0
	}
	this.setOutputData(0, x + y)
}


function SubtractionNode() {
	this.addInput("X", "number")
	this.addInput("Y", "number")
	this.addOutput("Result", "number")
}
SubtractionNode.title = "Subtraction"
SubtractionNode.onExecute = function() {
	var x = this.getInputData(0)
	var y = this.getInputData(1)
	if (x === undefined) {
		x = 0
	}
	if (y === undefined) {
		y = 0
	}
	this.setOutputData(0, x - y)
}

LiteGraph.registerNodeType("Math/Euler", ENode)
LiteGraph.registerNodeType("Math/LN2", LN2Node)
LiteGraph.registerNodeType("Math/LN10", LN10Node)
LiteGraph.registerNodeType("Math/Abs", AbsNode)
LiteGraph.registerNodeType("Math/Acos", AcosNode)
LiteGraph.registerNodeType("Math/Acosh", AcoshNode)
LiteGraph.registerNodeType("Math/Asin", AsinNode)
LiteGraph.registerNodeType("Math/Asinh", AsinhNode)
LiteGraph.registerNodeType("Math/Atan", AtanNode)
LiteGraph.registerNodeType("Math/Atanh", AtanhNode)
LiteGraph.registerNodeType("Math/Atan2", Atan2Node)
LiteGraph.registerNodeType("Math/Cbrt", CbrtNode)
LiteGraph.registerNodeType("Math/Ceil", CeilNode)
LiteGraph.registerNodeType("Math/Cos", CosNode)
LiteGraph.registerNodeType("Math/Exp", ExpNode)
LiteGraph.registerNodeType("Math/Expm1", Expm1Node)
LiteGraph.registerNodeType("Math/Floor", FloorNode)
LiteGraph.registerNodeType("Math/Log", LogNode)
LiteGraph.registerNodeType("Math/Pow", PowNode)
LiteGraph.registerNodeType("Math/Random", RandomNode)
LiteGraph.registerNodeType("Math/Round", RoundNode)
LiteGraph.registerNodeType("Math/Sign", SignNode)
LiteGraph.registerNodeType("Math/Sin", SinNode)
LiteGraph.registerNodeType("Math/Sqrt", SqrtNode)
LiteGraph.registerNodeType("Math/Tan", TanNode)
LiteGraph.registerNodeType("Math/Addition", AdditionNode)
LiteGraph.registerNodeType("Math/Subtraction", SubtractionNode)