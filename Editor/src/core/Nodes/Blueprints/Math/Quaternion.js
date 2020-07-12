function QuaternionNode() {
	this.addInput("X", "number")
	this.addInput("Y", "number")
	this.addInput("Z", "number")
	this.addInput("W", "number")
	this.addOutput("Quaternion", "Quaternion")

	this.setProperty("x", 0)
	this.setProperty("y", 0)
	this.setProperty("z", 0)
	this.setProperty("w", 0)

	this.widget_x = this.addWidget("number", "X", 0, "x")
	this.widget_y = this.addWidget("number", "Y", 0, "y")
	this.widget_z = this.addWidget("number", "Z", 0, "z")
	this.widget_w = this.addWidget("number", "W", 0, "w")
}
QuaternionNode.title = "Quaternion"
QuaternionNode.prototype.onExecute = function() {
	var x = this.getInputData(0)
	var y = this.getInputData(1)
	var z = this.getInputData(2)
	var w = this.getInputData(3)

	if (x === undefined) {
		x = this.properties["x"]
	}
	if (y === undefined) {
		y = this.properties["y"]
	}
	if (z === undefined) {
		z = this.properties["z"]
	}
	if (w === undefined) {
		w = this.properties["w"]
	}

	var q = new THREE.Quaternion(x, y, z, w)
	this.setOutputData(0, q)
}
QuaternionNode.prototype.onPropertyChanged = function() {
	if (this.graph && this.graph.onNodeConnectionChange) {
       this.graph.onNodeConnectionChange()
    }
}

function QuaternionGetXNode() {
	this.addInput("Quaternion", "Quaternion")
	this.addOutput("X", "number")
}
QuaternionGetXNode.title = "Get X"
QuaternionGetXNode.prototype.onExecute = function() {
	var q = this.getInputData(0)

	if (q !== undefined) {
		this.setOutputData(0, q.x)
	}
}

function QuaternionGetYNode() {
	this.addInput("Quaternion", "Quaternion")
	this.addOutput("Y", "number")
}
QuaternionGetYNode.title = "Get Y"
QuaternionGetYNode.prototype.onExecute = function() {
	var q = this.getInputData(0)

	if (q !== undefined) {
		this.setOutputData(0, q.y)
	}
}

function QuaternionGetZNode() {
	this.addInput("Quaternion", "Quaternion")
	this.addOutput("Z", "number")
}
QuaternionGetZNode.title = "Get Z"
QuaternionGetZNode.prototype.onExecute = function() {
	var q = this.getInputData(0)
	if (q !== undefined) {
		this.setOutputData(0, q.z)
	}
}

function QuaternionGetWNode() {
	this.addInput("Quaternion", "Quaternion")
	this.addOutput("W", "number")
}
QuaternionGetWNode.title = "Get W"
QuaternionGetWNode.prototype.onExecute = function() {
	var q = this.getInputData(0)
	if (q !== undefined) {
		this.setOutputData(0, q.w)
	}
}

function QuaternionAngleToNode() {
	this.addInput("Input", "Quaternion")
	this.addInput("Quaternion", "Quaternion")
	this.addOutput("Angle", "number")
}
QuaternionAngleToNode.title = "Angle To"
QuaternionAngleToNode.prototype.onExecute = function() {
	var i = this.getInputData(0)
	var q = this.getInputData(1)

	if (i !== undefined && q !== undefined) {
		var d = i.angleTo(q)
		this.setOutputData(0, d)
	}
}

function QuaternionCloneNode() {
	this.addInput("Quaternion", "Quaternion")
	this.addOutput("Quaternion", "Quaternion")
}
QuaternionCloneNode.title = "Clone"
QuaternionCloneNode.prototype.onExecute = function() {
	var i = this.getInputData(0)

	if (i !== undefined) {
		this.setOutputData(0, i.clone())
	}
}

function QuaternionConjugateNode() {
	this.addInput("Quaternion", "Quaternion")
	this.addOutput("Quaternion", "Quaternion")
}
QuaternionConjugateNode.title = "Conjugate"
QuaternionConjugateNode.prototype.onExecute = function() {
	var q = this.getInputData(0)
	if (q !== undefined) {
		var c = q.conjugate()
		this.setOutputData(0, c)
	}
}

function QuaternionCopyNode() {
	this.addInput("Input", "Quaternion")
	this.addInput("Quaternion", "Quaternion")
	this.addOutput("Quaternion", "Quaternion")
}
QuaternionCopyNode.title = "Copy"
QuaternionCopyNode.prototype.onExecute = function() {
	var i = this.getInputData(0)
	var q = this.getInputData(1)

	if (i !== undefined && q !== undefined) {
		var c = i.copy(q)
		this.setOutputData(0, c)
	}
}

function QuaternionEqualsNode() {
	this.addInput("Quaternion", "Quaternion")
	this.addInput("Quaternion", "Quaternion")
	this.addOutput("Equals", "Boolean")
}
QuaternionEqualsNode.title = "Equals"
QuaternionEqualsNode.prototype.onExecute = function() {
	var q1 = this.getInputData(0)
	var q2 = this.getInputData(0)
	if (q1 !== undefined && q2 !== undefined) {
		this.setOutputData(0, q1.equals(q2))
	}
}

function QuaternionDotNode() {
	this.addInput("Input", "Quaternion")
	this.addInput("Quaternion", "Quaternion")
	this.addOutput("Dot", "number")
}
QuaternionDotNode.title = "Dot"
QuaternionDotNode.prototype.onExecute = function() {
	var i = this.getInputData(0)
	var q = this.getInputData(1)

	if (i !== undefined && q !== undefined) {
		this.setOutputData(0, i.dot(q))
	}
}

function QuaternionFromArrayNode() {
	this.addInput("Quaternion", "Quaternion")
	this.addInput("Array", "Array")
	this.addInput("Offset", "number")
	this.addOutput("Quaternion", "Quaternion")

	this.setProperty("offset", 0)
	this.widget = this.addWidget("number", "Offset", 0, "offset")
}
QuaternionFromArrayNode.title = "From Array"
QuaternionFromArrayNode.prototype.onExecute = function() {
	var q = this.getInputData(0)
	var a = this.getInputData(1)
	var o = this.getInputData(2)

	if (o === undefined) {
		o = this.properties["offset"]
	}

	if (q !== undefined && a !== undefined) {
		var q1 = q.fromArray(a, o)
		this.setOutputData(0, q1)
	}
}
QuaternionFromArrayNode.prototype.onPropertyChanged = function() {
	if (this.graph && this.graph.onNodeConnectionChange) {
       this.graph.onNodeConnectionChange()
    }
}

function QuaternionLengthNode() {
	this.addInput("Quaternion", "Quaternion")
	this.addOutput("Length", "number")
}
QuaternionLengthNode.title = "Length"
QuaternionLengthNode.prototype.onExecute = function() {
	var q = this.getInputData(0)
	if (q !== undefined) {
		var l = q.length()
		this.setOutputData(0, l)
	}
}

function QuaternionNormalizeNode() {
	this.addInput("Quaternion", "Quaternion")
	this.addOutput("Normalized", "Quaternion")
}
QuaternionNormalizeNode.title = "Normalize"
QuaternionNormalizeNode.prototype.onExecute = function() {
	var q = this.getInputData(0)

	if (q !== undefined) {
		var n = q.normalize()
		this.setOutputData(0, n)
	}
}

function QuaternionMultiplyNode() {
	this.addInput("Input", "Quaternion")
	this.addInput("Quaternion", "Quaternion")
	this.addOutput("Out", "Quaternion")
}
QuaternionMultiplyNode.title = "Multiply"
QuaternionMultiplyNode.prototype.onExecute = function() {
	var i = this.getInputData(0)
	var q = this.getInputData(1)

	if (i !== undefined && q !== undefined) {
		this.setOutputData(0, i.multiply(q))
	}
}

function QuaternionMultiplyQuaternionsNode() {
	this.addInput("Input", "Quaternion")
	this.addInput("A", "Quaternion")
	this.addInput("B", "Quaternion")
	this.addOutput("Out", "Quaternion")
}
QuaternionMultiplyQuaternionsNode.title = "Multiply Quaternions"
QuaternionMultiplyQuaternionsNode.prototype.onExecute = function() {
	var i = this.getInputData(0)

	var a = this.getInputData(1)
	var b = this.getInputData(2)

	if (i !== undefined && a !== undefined && b !== undefined) {
		this.setOutputData(0, i.multiplyQuaternions(a, b))
	}
}

function QuaternionPreMultiplyNode() {
	this.addInput("Input", "Quaternion")
	this.addInput("Quaternion", "Quaternion")
	this.addOutput("Out", "Quaternion")
}
QuaternionPreMultiplyNode.title = "Pre-Multiply"
QuaternionPreMultiplyNode.prototype.onExecute = function() {
	var i = this.getInputData(0)
	var q = this.getInputData(1)

	if (i !== undefined && q !== undefined) {
		this.setOutputData(0, i.premultiply(q))
	}
}

function QuaternionRotateTowardsNode() {
	this.addInput("Input", "Quaternion")
	this.addInput("Quaternion", "Quaternion")
	this.addInput("Step", "number")

	this.addOutput("Out", "Quaternion")

	this.setProperty("step", 0)
	this.widget = this.addWidget("number", "Step", 0, "step")
}
QuaternionRotateTowardsNode.title = "Rotate Towards"
QuaternionRotateTowardsNode.prototype.onExecute = function() {
	var i = this.getInputData(0)
	var q = this.getInputData(1)
	var s = this.getInputData(2)

	if (s === undefined) {
		s = this.properties["step"]
	}

	if (i !== undefined && q !== undefined && s !== undefined) {
		this.setOutputData(0, i.rotateTowards(q, s))
	}
}
QuaternionRotateTowardsNode.prototype.onPropertyChanged = function() {
	if (this.graph && this.graph.onNodeConnectionChange) {
       this.graph.onNodeConnectionChange()
    }
}

function QuaternionSlerpNode() {
	this.addInput("Input", "Quaternion")
	this.addInput("Quaternion", "Quaternion")
	this.addInput("Interpolation", "number")

	this.addOutput("Out", "Quaternion")

	this.setProperty("interpolation", 0)
	this.widget = this.addWidget("number", "Interpolation", 0, "interpolation")
}
QuaternionSlerpNode.title = "Slerp"
QuaternionSlerpNode.prototype.onExecute = function() {
	var i = this.getInputData(0)
	var q = this.getInputData(1)
	var t = this.getInputData(2)

	if (t === undefined) {
		t = this.properties["interpolation"]
	}

	if (i !== undefined && q !== undefined && t !== undefined) {
		i.slerp(q, t)
	}
}
QuaternionSlerpNode.prototype.onPropertyChanged = function() {
	if (this.graph && this.graph.onNodeConnectionChange) {
       this.graph.onNodeConnectionChange()
    }
}

function QuaternionSetNode() {
	this.addInput("Input", "Quaternion")

	this.addInput("X", "number")
	this.addInput("Y", "number")
	this.addInput("Z", "number")
	this.addInput("W", "number")

	this.addOutput("Out", "Quaternion")

	this.setProperty("x", 0)
	this.setProperty("y", 0)
	this.setProperty("z", 0)
	this.setProperty("w", 0)

	this.widget_x = this.addWidget("number", "X", 0, "x")
	this.widget_y = this.addWidget("number", "Y", 0, "y")
	this.widget_z = this.addWidget("number", "Z", 0, "z")
	this.widget_w = this.addWidget("number", "W", 0, "w")
}
QuaternionSetNode.title = "Set"
QuaternionSetNode.prototype.onExecute = function() {
	var i = this.getInputData(0)

	if (i !== undefined) {
		var x = this.getInputData(1)
		var y = this.getInputData(2)
		var z = this.getInputData(3)
		var w = this.getInputData(4)

		if (x === undefined) {
			x = this.properties["x"]
		}
		if (y === undefined) {
			y = this.properties["y"]
		}
		if (z === undefined) {
			z = this.properties["z"]
		}
		if (w === undefined) {
			w = this.properties["w"]
		}

		i.set(x, y, z, w)
		this.setOutputData(0, i)
	}
}
QuaternionSetNode.prototype.onPropertyChanged = function() {
	if (this.graph && this.graph.onNodeConnectionChange) {
       this.graph.onNodeConnectionChange()
    }
}

function QuaternionSetFromAxisAngleNode() {
	this.addInput("Input", "Quaternion")

	this.addInput("Axis", "Vector")
	this.addInput("Angle", "number")

	this.addOutput("Out", "Quaternion")

	this.setProperty("angle", 0)
	this.widget = this.addWidget("number", "Angle", 0, "angle")
}
QuaternionSetFromAxisAngleNode.title = "From Axis Angle"
QuaternionSetFromAxisAngleNode.prototype.onExecute = function() {
	var i = this.getInputData(0)

	var ax = this.getInputData(1)
	var an = this.getInputData(2)

	if (an === undefined) {
		an = this.properties["angle"]
	}

	if (i !== undefined && ax !== undefined && an !== undefined) {
		i.setFromAxisAngle(ax, an)
	}
}
QuaternionSetFromAxisAngleNode.prototype.onPropertyChanged = function() {
	if (this.graph && this.graph.onNodeConnectionChange) {
       this.graph.onNodeConnectionChange()
    }
}

function QuaternionSetFromEulerNode() {
	this.addInput("Input", "Quaternion")
	this.addInput("Euler", "Euler")
	this.addOutput("Out", "Quaternion")
}
QuaternionSetFromEulerNode.title = "From Euler"
QuaternionSetFromEulerNode.prototype.onExecute = function() {
	var i = this.getInputData(0)
	var e = this.getInputData(1)

	if (i !== undefined && e !== undefined) {
		i.setFromEuler(e)
		this.setOutputData(0, i)
	}
}

function registerQuaternionNodes() {
	LiteGraph.registerNodeType("Quaternion/Quaternion", QuaternionNode)
	LiteGraph.registerNodeType("Quaternion/QuaternionGetX", QuaternionGetXNode)
	LiteGraph.registerNodeType("Quaternion/QuaternionGetY", QuaternionGetYNode)
	LiteGraph.registerNodeType("Quaternion/QuaternionGetZ", QuaternionGetZNode)
	LiteGraph.registerNodeType("Quaternion/QuaternionGetW", QuaternionGetWNode)
	LiteGraph.registerNodeType("Quaternion/QuaternionAngleTo", QuaternionAngleToNode)
	LiteGraph.registerNodeType("Quaternion/QuaternionClone", QuaternionCloneNode)
	LiteGraph.registerNodeType("Quaternion/QuaternionConjugate", QuaternionConjugateNode)
	LiteGraph.registerNodeType("Quaternion/QuaternionCopy", QuaternionCopyNode)
	LiteGraph.registerNodeType("Quaternion/QuaternionEquals", QuaternionEqualsNode)
	LiteGraph.registerNodeType("Quaternion/QuaternionDot", QuaternionDotNode)
	LiteGraph.registerNodeType("Quaternion/QuaternionFromArray", QuaternionFromArrayNode)
	LiteGraph.registerNodeType("Quaternion/QuaternionLength", QuaternionLengthNode)
	LiteGraph.registerNodeType("Quaternion/QuaternionNormalize", QuaternionNormalizeNode)
	LiteGraph.registerNodeType("Quaternion/QuaternionMultiply", QuaternionMultiplyNode)
	LiteGraph.registerNodeType("Quaternion/QuaternionMultiplyQuaternions", QuaternionMultiplyQuaternionsNode)
	LiteGraph.registerNodeType("Quaternion/QuaternionPreMultiply", QuaternionPreMultiplyNode)
	LiteGraph.registerNodeType("Quaternion/QuaternionRotateTowards", QuaternionRotateTowardsNode)
	LiteGraph.registerNodeType("Quaternion/QuaternionSlerp", QuaternionSlerpNode)
	LiteGraph.registerNodeType("Quaternion/QuaternionSet", QuaternionSetNode)
	LiteGraph.registerNodeType("Quaternion/QuaternionSetFromAxisAngle", QuaternionSetFromAxisAngleNode)
}