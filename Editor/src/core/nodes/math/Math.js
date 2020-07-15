function ENode() {
	this.addOutput("E", "number")
}
ENode.title_color = NodesHelper.colours.palevioletred[0]
ENode.title_color1 = NodesHelper.colours.palevioletred[1]
ENode.title_color2 = NodesHelper.colours.palevioletred[1]
ENode.title_text_color = NodesHelper.title_colours.white
ENode.title = "Euler"
ENode.prototype.onExecute = function() {
	this.setOutputData(0, Math.E)
}


function LN2Node() {
	this.addOutput("LN2", "number")
}
LN2Node.title_color = NodesHelper.colours.palevioletred[0]
LN2Node.title_color1 = NodesHelper.colours.palevioletred[1]
LN2Node.title_color2 = NodesHelper.colours.palevioletred[1]
LN2Node.title_text_color = NodesHelper.title_colours.white
LN2Node.title = "LN2"
LN2Node.prototype.onExecute = function() {
	this.setOutputData(0, Math.LN2)
}


function LN10Node() {
	this.addOutput("LN10", "number")
}
LN10Node.title_color = NodesHelper.colours.palevioletred[0]
LN10Node.title_color1 = NodesHelper.colours.palevioletred[1]
LN10Node.title_color2 = NodesHelper.colours.palevioletred[1]
LN10Node.title_text_color = NodesHelper.title_colours.white
LN10Node.title = "LN10"
LN10Node.prototype.onExecute = function() {
	this.setOutputData(0, Math.LN10)
}


function AbsNode() {
	this.addInput("X", "number")
	this.addOutput("Result", "number")
}
AbsNode.title_color = NodesHelper.colours.palevioletred[0]
AbsNode.title_color1 = NodesHelper.colours.palevioletred[1]
AbsNode.title_color2 = NodesHelper.colours.palevioletred[1]
AbsNode.title_text_color = NodesHelper.title_colours.white
AbsNode.title = "Abs"
AbsNode.prototype.onExecute = function() {
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
AcosNode.title_color = NodesHelper.colours.palevioletred[0]
AcosNode.title_color1 = NodesHelper.colours.palevioletred[1]
AcosNode.title_color2 = NodesHelper.colours.palevioletred[1]
AcosNode.title_text_color = NodesHelper.title_colours.white
AcosNode.title = "Arccosine"
AcosNode.prototype.onExecute = function() {
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
AcoshNode.title_color = NodesHelper.colours.palevioletred[0]
AcoshNode.title_color1 = NodesHelper.colours.palevioletred[1]
AcoshNode.title_color2 = NodesHelper.colours.palevioletred[1]
AcoshNode.title_text_color = NodesHelper.title_colours.white
AcoshNode.title = "Hyperbolic Arccosine"
AcoshNode.prototype.onExecute = function() {
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
AsinNode.title_color = NodesHelper.colours.palevioletred[0]
AsinNode.title_color1 = NodesHelper.colours.palevioletred[1]
AsinNode.title_color2 = NodesHelper.colours.palevioletred[1]
AsinNode.title_text_color = NodesHelper.title_colours.white
AsinNode.title = "Arcsine"
AsinNode.prototype.onExecute = function() {
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
AsinhNode.title_color = NodesHelper.colours.palevioletred[0]
AsinhNode.title_color1 = NodesHelper.colours.palevioletred[1]
AsinhNode.title_color2 = NodesHelper.colours.palevioletred[1]
AsinhNode.title_text_color = NodesHelper.title_colours.white
AsinhNode.title = "Hyperbolic Arcsine"
AsinhNode.prototype.onExecute = function() {
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
AtanNode.title_color = NodesHelper.colours.palevioletred[0]
AtanNode.title_color1 = NodesHelper.colours.palevioletred[1]
AtanNode.title_color2 = NodesHelper.colours.palevioletred[1]
AtanNode.title_text_color = NodesHelper.title_colours.white
AtanNode.title = "Arctangent"
AtanNode.prototype.onExecute = function() {
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
AtanhNode.title_color = NodesHelper.colours.palevioletred[0]
AtanhNode.title_color1 = NodesHelper.colours.palevioletred[1]
AtanhNode.title_color2 = NodesHelper.colours.palevioletred[1]
AtanhNode.title_text_color = NodesHelper.title_colours.white
AtanhNode.title = "Hyperbolic Arctangent"
AtanhNode.prototype.onExecute = function() {
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
Atan2Node.title_color = NodesHelper.colours.palevioletred[0]
Atan2Node.title_color1 = NodesHelper.colours.palevioletred[1]
Atan2Node.title_color2 = NodesHelper.colours.palevioletred[1]
Atan2Node.title_text_color = NodesHelper.title_colours.white
Atan2Node.title = "Arctangent 2"
Atan2Node.prototype.onExecute = function() {
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
CbrtNode.title_color = NodesHelper.colours.palevioletred[0]
CbrtNode.title_color1 = NodesHelper.colours.palevioletred[1]
CbrtNode.title_color2 = NodesHelper.colours.palevioletred[1]
CbrtNode.title_text_color = NodesHelper.title_colours.white
CbrtNode.title = "Cube root"
CbrtNode.prototype.onExecute = function() {
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
CeilNode.title_color = NodesHelper.colours.palevioletred[0]
CeilNode.title_color1 = NodesHelper.colours.palevioletred[1]
CeilNode.title_color2 = NodesHelper.colours.palevioletred[1]
CeilNode.title_text_color = NodesHelper.title_colours.white
CeilNode.title = "Ceil"
CeilNode.prototype.onExecute = function() {
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
CosNode.title_color = NodesHelper.colours.palevioletred[0]
CosNode.title_color1 = NodesHelper.colours.palevioletred[1]
CosNode.title_color2 = NodesHelper.colours.palevioletred[1]
CosNode.title_text_color = NodesHelper.title_colours.white
CosNode.title = "Cos"
CosNode.prototype.onExecute = function() {
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
ExpNode.title_color = NodesHelper.colours.palevioletred[0]
ExpNode.title_color1 = NodesHelper.colours.palevioletred[1]
ExpNode.title_color2 = NodesHelper.colours.palevioletred[1]
ExpNode.title_text_color = NodesHelper.title_colours.white
ExpNode.title = "Exp"
ExpNode.prototype.onExecute = function() {
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
Expm1Node.title_color = NodesHelper.colours.palevioletred[0]
Expm1Node.title_color1 = NodesHelper.colours.palevioletred[1]
Expm1Node.title_color2 = NodesHelper.colours.palevioletred[1]
Expm1Node.title_text_color = NodesHelper.title_colours.white
Expm1Node.title = "Exmp1"
Expm1Node.prototype.onExecute = function() {
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
FloorNode.title_color = NodesHelper.colours.palevioletred[0]
FloorNode.title_color1 = NodesHelper.colours.palevioletred[1]
FloorNode.title_color2 = NodesHelper.colours.palevioletred[1]
FloorNode.title_text_color = NodesHelper.title_colours.white
FloorNode.title = "Floor"
FloorNode.prototype.onExecute = function() {
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
LogNode.title_color = NodesHelper.colours.palevioletred[0]
LogNode.title_color1 = NodesHelper.colours.palevioletred[1]
LogNode.title_color2 = NodesHelper.colours.palevioletred[1]
LogNode.title_text_color = NodesHelper.title_colours.white
LogNode.title = "Log"
LogNode.prototype.onExecute = function() {
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
PowNode.title_color = NodesHelper.colours.palevioletred[0]
PowNode.title_color1 = NodesHelper.colours.palevioletred[1]
PowNode.title_color2 = NodesHelper.colours.palevioletred[1]
PowNode.title_text_color = NodesHelper.title_colours.white
PowNode.title = "Pow"
PowNode.prototype.onExecute = function() {
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
RandomNode.title_color = NodesHelper.colours.palevioletred[0]
RandomNode.title_color1 = NodesHelper.colours.palevioletred[1]
RandomNode.title_color2 = NodesHelper.colours.palevioletred[1]
RandomNode.title_text_color = NodesHelper.title_colours.white
RandomNode.title = "Random"
RandomNode.prototype.onExecute = function() {
	this.setOutputData(0, Math.random())
}


function RoundNode() {
	this.addInput("X", "number")
	this.addOutput("Result", "number")
}
RoundNode.title_color = NodesHelper.colours.palevioletred[0]
RoundNode.title_color1 = NodesHelper.colours.palevioletred[1]
RoundNode.title_color2 = NodesHelper.colours.palevioletred[1]
RoundNode.title_text_color = NodesHelper.title_colours.white
RoundNode.title = "Round"
RoundNode.prototype.onExecute = function() {
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
SignNode.title_color = NodesHelper.colours.palevioletred[0]
SignNode.title_color1 = NodesHelper.colours.palevioletred[1]
SignNode.title_color2 = NodesHelper.colours.palevioletred[1]
SignNode.title_text_color = NodesHelper.title_colours.white
SignNode.title = "Sign"
SignNode.prototype.onExecute = function() {
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
SinNode.title_color = NodesHelper.colours.palevioletred[0]
SinNode.title_color1 = NodesHelper.colours.palevioletred[1]
SinNode.title_color2 = NodesHelper.colours.palevioletred[1]
SinNode.title_text_color = NodesHelper.title_colours.white
SinNode.title = "Sin"
SinNode.prototype.onExecute = function() {
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
SqrtNode.title_color = NodesHelper.colours.palevioletred[0]
SqrtNode.title_color1 = NodesHelper.colours.palevioletred[1]
SqrtNode.title_color2 = NodesHelper.colours.palevioletred[1]
SqrtNode.title_text_color = NodesHelper.title_colours.white
SqrtNode.title = "Sqrt"
SqrtNode.prototype.onExecute = function() {
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
TanNode.title_color = NodesHelper.colours.palevioletred[0]
TanNode.title_color1 = NodesHelper.colours.palevioletred[1]
TanNode.title_color2 = NodesHelper.colours.palevioletred[1]
TanNode.title_text_color = NodesHelper.title_colours.white
TanNode.title = "Tan"
TanNode.prototype.onExecute = function() {
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
AdditionNode.title_color = NodesHelper.colours.palevioletred[0]
AdditionNode.title_color1 = NodesHelper.colours.palevioletred[1]
AdditionNode.title_color2 = NodesHelper.colours.palevioletred[1]
AdditionNode.title_text_color = NodesHelper.title_colours.white
AdditionNode.title = "Addition"
AdditionNode.prototype.onExecute = function() {
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
SubtractionNode.title_color = NodesHelper.colours.palevioletred[0]
SubtractionNode.title_color1 = NodesHelper.colours.palevioletred[1]
SubtractionNode.title_color2 = NodesHelper.colours.palevioletred[1]
SubtractionNode.title_text_color = NodesHelper.title_colours.white
SubtractionNode.title = "Subtraction"
SubtractionNode.prototype.onExecute = function() {
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

function registerMathNodes() {
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
}