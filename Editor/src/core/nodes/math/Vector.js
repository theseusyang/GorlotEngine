function Vector2Node() {
	this.addInput("X", "number")
	this.addInput("Y", "number")
	this.addOutput("Vector", "Vector")

	this.setProperty("x", 0)
	this.setProperty("y", 0)

	this.widget_x = this.addWidget("number", "X", 0, "x")
	this.widget_y = this.addWidget("number", "Y", 0, "y")
}
Vector2Node.title_color = NodesHelper.colours.chocolate[0]
Vector2Node.title_color1 = NodesHelper.colours.chocolate[1]
Vector2Node.title_color2 = NodesHelper.colours.chocolate[1]
Vector2Node.title_text_color = NodesHelper.title_colours.white
Vector2Node.title = "Vector2"
Vector2Node.prototype.onExecute = function() {
	var X = this.getInputData(0)
	var Y = this.getInputData(1)
	if (X === undefined) {
		X = this.properties["x"]
	}
	if (Y === undefined) {
		Y = this.properties["y"]
	}
	this.setOutputData(0, new THREE.Vector2(X, Y))
}
Vector2Node.prototype.onPropertyChanged = function() {
	if (this.graph && this.graph.onNodeConnectionChange) {
       this.graph.onNodeConnectionChange()
    }
}

function Vector2ToVector3Node() {
	this.addInput("Vector2", "Vector")
	this.addOutput("Vector3", "Vector")
}
Vector2ToVector3Node.title_color = NodesHelper.colours.purple[0]
Vector2ToVector3Node.title_color1 = NodesHelper.colours.purple[1]
Vector2ToVector3Node.title_color2 = NodesHelper.colours.purple[1]
Vector2ToVector3Node.title_text_color = NodesHelper.title_colours.white
Vector2ToVector3Node.title = "Vector2 To Vector3"
Vector2ToVector3Node.prototype.onExecute = function() {
	var Vec2 = this.getInputData(0)
	if (Vec2 === undefined) {
		Vec2 = new THREE.Vector2()
	}
	this.setOutputData(0, new THREE.Vector3(Vec2.x, Vec2.y, 0))
}

function Vector3Node() {
	this.addInput("X", "number")
	this.addInput("Y", "number")
	this.addInput("Z", "number")
	this.addOutput("Vector", "Vector")

	this.setProperty("x", 0)
	this.setProperty("y", 0)
	this.setProperty("z", 0)

	this.widget_x = this.addWidget("number", "X", 0, "x")
	this.widget_y = this.addWidget("number", "Y", 0, "y")
	this.widget_z = this.addWidget("number", "Z", 0, "z")
}
Vector3Node.title_color = NodesHelper.colours.chocolate[0]
Vector3Node.title_color1 = NodesHelper.colours.chocolate[1]
Vector3Node.title_color2 = NodesHelper.colours.chocolate[1]
Vector3Node.title_text_color = NodesHelper.title_colours.white
Vector3Node.title = "Vector3"
Vector3Node.prototype.onExecute = function() {
	var X = this.getInputData(0)
	var Y = this.getInputData(1)
	var Z = this.getInputData(2)
	if (X === undefined) {
		X = this.properties["x"]
	}
	if (Y === undefined) {
		Y = this.properties["y"]
	}
	if (Z === undefined) {
		Z = this.properties["z"]
	}
	this.setOutputData(0, new THREE.Vector3(X, Y, Z))
}
Vector3Node.prototype.onPropertyChanged = function() {
	if (this.graph && this.graph.onNodeConnectionChange) {
       this.graph.onNodeConnectionChange()
    }
}

function VectorSetNode() {
	this.addInput("Vector", "Vector")
	this.addInput("X", "number")
	this.addInput("Y", "number")
	this.addInput("Z", "number")
	this.addOutput("Vector", "Vector")

	this.setProperty("x", 0)
	this.setProperty("y", 0)
	this.setProperty("z", 0)

	this.widget_x = this.addWidget("number", "X", 0, "x")
	this.widget_y = this.addWidget("number", "Y", 0, "y")
	this.widget_z = this.addWidget("number", "Z", 0, "z")
}
VectorSetNode.title_color = NodesHelper.colours.chocolate[0]
VectorSetNode.title_color1 = NodesHelper.colours.chocolate[1]
VectorSetNode.title_color2 = NodesHelper.colours.chocolate[1]
VectorSetNode.title_text_color = NodesHelper.title_colours.white
VectorSetNode.title = "Set Vector"
VectorSetNode.prototype.onExecute = function() {
	var Vec = this.getInputData(0)
	var X = this.getInputData(1)
	var Y = this.getInputData(2)
	var Z = this.getInputData(3)

	if (X === undefined) {
		X = this.properties["x"]
	}
	if (Y === undefined) {
		Y = this.properties["y"]
	}
	if (Z === undefined) {
		Z = this.properties["z"]
	}

	if (Vec !== undefined && Vec instanceof THREE.Vector2) {
		var vec = Vec.set(X, Y)
	} else if (Vec !== undefined && Vec instanceof THREE.Vector3) {
		var vec = Vec.set(X, Y, Z)
	}

	this.setOutputData(0, vec)
}
VectorSetNode.prototype.onPropertyChanged = function() {
	if (this.graph && this.graph.onNodeConnectionChange) {
       this.graph.onNodeConnectionChange()
    }
}

function VectorAddNode() {
	this.addInput("Input", "Vector")
	this.addInput("Vector", "Vector")

	this.addOutput("Vector", "Vector")
}
VectorAddNode.title_color = NodesHelper.colours.purple[0]
VectorAddNode.title_color1 = NodesHelper.colours.purple[1]
VectorAddNode.title_color2 = NodesHelper.colours.purple[1]
VectorAddNode.title_text_color = NodesHelper.title_colours.white
VectorAddNode.title = "Add"
VectorAddNode.prototype.onExecute = function() {
	var input = this.getInputData(0)
	var vec= this.getInputData(1)

	if (input !== undefined && vec !== undefined) {
		input.add(vec)
	}

	this.setOutputData(0, input)
}

function VectorAddScalarNode() {
	this.addInput("Vector", "Vector")
	this.addInput("Scalar", "number")

	this.addOutput("Vector", "Vector")

	this.setProperty("scalar", 0)
	this.widget = this.addWidget("number", "Scalar", 0, "scalar")
}
VectorAddScalarNode.title_color = NodesHelper.colours.purple[0]
VectorAddScalarNode.title_color1 = NodesHelper.colours.purple[1]
VectorAddScalarNode.title_color2 = NodesHelper.colours.purple[1]
VectorAddScalarNode.title_text_color = NodesHelper.title_colours.white
VectorAddScalarNode.title = "Add Scalar"
VectorAddScalarNode.prototype.onExecute = function() {
	var vec = this.getInputData(0)
	var scalar = this.getInputData(1)

	if (scalar === undefined) {
		scalar = this.properties["scalar"]
	}

	if (vec !== undefined) {
		vec.addScalar(scalar)
	}

	this.setOutputData(0, vec)
}
VectorAddScalarNode.prototype.onPropertyChanged = function() {
	if (this.graph && this.graph.onNodeConnectionChange) {
       this.graph.onNodeConnectionChange()
    }
}

function VectorAddScaledVectorNode() {
	this.addInput("Input", "Vector")

	this.addInput("Vector", "Vector")
	this.addInput("Scalar", "number")
	this.addOutput("Vector", "Vector")

	this.setProperty("scalar", 0)
	this.widget = this.addWidget("number", "Scalar", 0, "scalar")
}
VectorAddScaledVectorNode.title_color = NodesHelper.colours.purple[0]
VectorAddScaledVectorNode.title_color1 = NodesHelper.colours.purple[1]
VectorAddScaledVectorNode.title_color2 = NodesHelper.colours.purple[1]
VectorAddScaledVectorNode.title_text_color = NodesHelper.title_colours.white
VectorAddScaledVectorNode.title = "Add Scaled Vector"
VectorAddScaledVectorNode.prototype.onExecute = function() {
	var input = this.getInputData(0)
	var vector = this.getInputData(1)
	var scalar = this.getInputData(2)

	if (scalar === undefined) {
		scalar = this.properties["scalar"]
	}

	if (input !== undefined && vector !== undefined) {
		input.addScaledVector(vector, scalar)
	}

	this.setOutputData(0, input)
}
VectorAddScaledVectorNode.prototype.onPropertyChanged = function() {
	if (this.graph && this.graph.onNodeConnectionChange) {
       this.graph.onNodeConnectionChange()
    }
}

function VectorAddVectorsNode() {
	this.addInput("Input", "Vector")

	this.addInput("Vector", "Vector")
	this.addInput("Vector", "Vector")

	this.addOutput("Output", "Vector")
}
VectorAddVectorsNode.title_color = NodesHelper.colours.purple[0]
VectorAddVectorsNode.title_color1 = NodesHelper.colours.purple[1]
VectorAddVectorsNode.title_color2 = NodesHelper.colours.purple[1]
VectorAddVectorsNode.title_text_color = NodesHelper.title_colours.white
VectorAddVectorsNode.title = "Add Vectors"
VectorAddVectorsNode.prototype.onExecute = function() {
	var input = this.getInputData(0)

	var vector1 = this.getInputData(1)
	var vector2 = this.getInputData(2)

	if (input !== undefined && vector1 !== undefined && vector2 !== undefined) {
		input.addVectors(vector1, vector2)
	}

	this.setOutputData(0, input)
}

function VectorApplyAxisAngleNode() {
	this.addInput("Input", "Vector")

	this.addInput("Axis", "Vector")
	this.addInput("Angle", "number")

	this.addOutput("Output", "Vector")

	this.setProperty("angle", 0)
	this.widget = this.addWidget("number", "Angle", 0, "angle")
}
VectorApplyAxisAngleNode.title_color = NodesHelper.colours.purple[0]
VectorApplyAxisAngleNode.title_color1 = NodesHelper.colours.purple[1]
VectorApplyAxisAngleNode.title_color2 = NodesHelper.colours.purple[1]
VectorApplyAxisAngleNode.title_text_color = NodesHelper.title_colours.white
VectorApplyAxisAngleNode.title = "Apply Axis Angle"
VectorApplyAxisAngleNode.prototype.onExecute = function() {
	var input = this.getInputData(0)

	var axis = this.getInputData(1)
	var angle = this.getInputData(2)

	if (angle === undefined) {
		angle = this.properties["angle"]
	}

	if (input !== undefined && axis !== undefined) {
		input.applyAxisAngle(axis, angle)
	}

	this.setOutputData(0, input)
}
VectorApplyAxisAngleNode.prototype.onPropertyChanged = function() {
	if (this.graph && this.graph.onNodeConnectionChange) {
       this.graph.onNodeConnectionChange()
    }
}

function VectorApplyEulerNode() {
	this.addInput("Input", "Vector")
	this.addInput("Euler", "Euler")

	this.addOutput("Output", "Vector")
}
VectorApplyEulerNode.title_color = NodesHelper.colours.purple[0]
VectorApplyEulerNode.title_color1 = NodesHelper.colours.purple[1]
VectorApplyEulerNode.title_color2 = NodesHelper.colours.purple[1]
VectorApplyEulerNode.title_text_color = NodesHelper.title_colours.white
VectorApplyEulerNode.title = "Apply Euler"
VectorApplyEulerNode.prototype.onExecute = function() {
	var input = this.getInputData(0)

	var euler = this.getInputData(1)

	if (input !== undefined && euler !== undefined) {
		input.applyEuler(euler)
	}

	this.setOutputData(0, input)
}

function VectorCeilNode() {
	this.addInput("Input", "Vector")
	this.addOutput("Output", "Vector")
}
VectorCeilNode.title_color = NodesHelper.colours.purple[0]
VectorCeilNode.title_color1 = NodesHelper.colours.purple[1]
VectorCeilNode.title_color2 = NodesHelper.colours.purple[1]
VectorCeilNode.title_text_color = NodesHelper.title_colours.white
VectorCeilNode.title = "Ceil"
VectorCeilNode.prototype.onExecute = function() {
	var input = this.getInputData(0)

	if (input !== undefined) {
		input.ceil()
	}

	this.setOutputData(0, input)
}

function VectorClampNode() {
	this.addInput("Input", "Vector")
	this.addInput("Min", "Vector")
	this.addInput("Max", "Vector")
	this.addOutput("Output", "Vector")
}
VectorClampNode.title_color = NodesHelper.colours.purple[0]
VectorClampNode.title_color1 = NodesHelper.colours.purple[1]
VectorClampNode.title_color2 = NodesHelper.colours.purple[1]
VectorClampNode.title_text_color = NodesHelper.title_colours.white
VectorClampNode.title = "Clamp"
VectorClampNode.prototype.onExecute = function() {
	var input = this.getInputData(0)

	var min = this.getInputData(1)
	var max = this.getInputData(2)

	if (input !== undefined && min !== undefined && max !== undefined) {
		input.clamp(min, max)
	}

	this.setOutputData(0, input)
}

function VectorClampLengthNode() {
	this.addInput("Input", "Vector")

	this.addInput("Min", "number")
	this.addInput("Max", "number")
	
	this.addOutput("Output", "Vector")

	this.setProperty("min", 0)
	this.setProperty("max", 0)

	this.widget_min = this.addWidget("number", "Min", 0, "min")
	this.widget_max = this.addWidget("number", "Max", 0, "max")
}
VectorClampLengthNode.title_color = NodesHelper.colours.purple[0]
VectorClampLengthNode.title_color1 = NodesHelper.colours.purple[1]
VectorClampLengthNode.title_color2 = NodesHelper.colours.purple[1]
VectorClampLengthNode.title_text_color = NodesHelper.title_colours.white
VectorClampLengthNode.title = "Clamp Length"
VectorClampLengthNode.prototype.onExecute = function() {
	var input = this.getInputData(0)

	var min = this.getInputData(1)
	var max = this.getInputData(2)

	if (min === undefined) {
		min = this.properties["min"]
	}
	if (max === undefined) {
		max = this.properties["max"]
	}

	if (input !== undefined) {
		input.clampLength(min, max)
	}

	this.setOutputData(0, input)
}
VectorClampNode.prototype.onPropertyChanged = function() {
	if (this.graph && this.graph.onNodeConnectionChange) {
       this.graph.onNodeConnectionChange()
    }
}

function VectorClampScalarNode() {
	this.addInput("Input", "Vector")

	this.addInput("Min", "number")
	this.addInput("Max", "number")

	this.addOutput("Output", "Vector")

	this.setProperty("min", 0)
	this.setProperty("max", 0)

	this.widget_min = this.addWidget("number", "Min", 0, "min")
	this.widget_max = this.addWidget("number", "Max", 0, "max")
}
VectorClampScalarNode.title_color = NodesHelper.colours.purple[0]
VectorClampScalarNode.title_color1 = NodesHelper.colours.purple[1]
VectorClampScalarNode.title_color2 = NodesHelper.colours.purple[1]
VectorClampScalarNode.title_text_color = NodesHelper.title_colours.white
VectorClampScalarNode.title = "Clamp Scalar"
VectorClampScalarNode.prototype.onExecute = function() {
	var input = this.getInputData(0)

	var min = this.getInputData(1)
	var max = this.getInputData(2)

	if (min === undefined) {
		min = this.properties["min"]
	}
	if (max === undefined) {
		max = this.properties["max"]
	}

	if (input !== undefined) {
		input.clampScalar(min, max)
	}

	this.setOutputData(0, input)
}
VectorClampScalarNode.prototype.onPropertyChanged = function() {
	if (this.graph && this.graph.onNodeConnectionChange) {
       this.graph.onNodeConnectionChange()
    }
}

function VectorCloneNode() {
	this.addInput("Input", "Vector")
	this.addOutput("Vector", "Vector")
}
VectorCloneNode.title_color = NodesHelper.colours.purple[0]
VectorCloneNode.title_color1 = NodesHelper.colours.purple[1]
VectorCloneNode.title_color2 = NodesHelper.colours.purple[1]
VectorCloneNode.title_text_color = NodesHelper.title_colours.white
VectorCloneNode.title = "Clone"
VectorCloneNode.prototype.onExecute = function() {
	var input = this.getInputData(0)
	if (input !== undefined) {
		var vec = input.clone()
		this.setOutputData(0, vec)
	}
}

function VectorCopyNode() {
	this.addInput("Input", "Vector")
	this.addInput("To Copy", "Vector")

	this.addOutput("Vector", "Vector")
}
VectorCopyNode.title_color = NodesHelper.colours.purple[0]
VectorCopyNode.title_color1 = NodesHelper.colours.purple[1]
VectorCopyNode.title_color2 = NodesHelper.colours.purple[1]
VectorCopyNode.title_text_color = NodesHelper.title_colours.white
VectorCopyNode.title = "Copy"
VectorCopyNode.prototype.onExecute = function() {
	var input = this.getInputData(0)
	var vector = this.getInputData(1)

	if (input !== undefined && vector !== undefined) {
		input.copy(vector)
	}

	this.setOutputData(0, input)
}

function VectorCrossNode() {
	this.addInput("Input", "Vector")
	this.addInput("Vector", "Vector")

	this.addOutput("Output", "Vector")
}
VectorCrossNode.title_color = NodesHelper.colours.purple[0]
VectorCrossNode.title_color1 = NodesHelper.colours.purple[1]
VectorCrossNode.title_color2 = NodesHelper.colours.purple[1]
VectorCrossNode.title_text_color = NodesHelper.title_colours.white
VectorCrossNode.title = "Cross"
VectorCrossNode.prototype.onExecute = function() {
	var input = this.getInputData(0)
	var vector= this.getInputData(1)

	if (input !== undefined && vector !== undefined) {
		input.cross(vector)
	}

	this.setOutputData(0, input)
}

function VectorCrossVectorsNode() {
	this.addInput("Input", "Vector")

	this.addInput("Vector", "Vector")
	this.addInput("Vector", "Vector")

	this.addOutput("Vector", "Vector")
}
VectorCrossVectorsNode.title_color = NodesHelper.colours.purple[0]
VectorCrossVectorsNode.title_color1 = NodesHelper.colours.purple[1]
VectorCrossVectorsNode.title_color2 = NodesHelper.colours.purple[1]
VectorCrossVectorsNode.title_text_color = NodesHelper.title_colours.white
VectorCrossVectorsNode.title = "Cross Vectors"
VectorCrossVectorsNode.prototype.onExecute = function() {
	var input = this.getInputData(0)

	var vec1 = this.getInputData(1)
	var vec2 = this.getInputData(2)

	if (input !== undefined && vec1 !== undefined && vec2 !== undefined) {
		input.crossVectors(vec1, vec2)
	}

	this.setOutputData(0, input)
}

function VectorDistanceToNode() {
	this.addInput("Input", "Vector")
	this.addInput("Vector", "Vector")
	this.addOutput("Distance", "number")
}
VectorDistanceToNode.title_color = NodesHelper.colours.purple[0]
VectorDistanceToNode.title_color1 = NodesHelper.colours.purple[1]
VectorDistanceToNode.title_color2 = NodesHelper.colours.purple[1]
VectorDistanceToNode.title_text_color = NodesHelper.title_colours.white
VectorDistanceToNode.title = "Distance To"
VectorDistanceToNode.prototype.onExecute = function() {
	var input = this.getInputData(0)
	var vector = this.getInputData(1)

	if (input !== undefined && vector !== undefined) {
		var dis = input.distanceTo(vector)
		this.setOutputData(dis)
	}
}

function VectorManhattanDistanceToNode() {
	this.addInput("Input", "Vector")
	this.addInput("Vector", "Vector")
	this.addOutput("Distance", "number")
}
VectorManhattanDistanceToNode.title_color = NodesHelper.colours.purple[0]
VectorManhattanDistanceToNode.title_color1 = NodesHelper.colours.purple[1]
VectorManhattanDistanceToNode.title_color2 = NodesHelper.colours.purple[1]
VectorManhattanDistanceToNode.title_text_color = NodesHelper.title_colours.white
VectorManhattanDistanceToNode.title = "Manhattan Distance"
VectorManhattanDistanceToNode.prototype.onExecute = function() {
	var input = this.getInputData(0)
	var vector = this.getInputData(1)

	if (input !== undefined && vector !== undefined) {
		var dis = input.manhattanDistanceTo(vector)
		this.setOutputData(0, dis)
	}

}

function VectorDistanceToSquaredNode() {
	this.addInput("Input", "Vector")
	this.addInput("Vector", "Vector")
	this.addOutput("Distance", "number")
}
VectorDistanceToSquaredNode.title_color = NodesHelper.colours.purple[0]
VectorDistanceToSquaredNode.title_color1 = NodesHelper.colours.purple[1]
VectorDistanceToSquaredNode.title_color2 = NodesHelper.colours.purple[1]
VectorDistanceToSquaredNode.title_text_color = NodesHelper.title_colours.white
VectorDistanceToSquaredNode.title = "Distance To Squared"
VectorDistanceToSquaredNode.prototype.onExecute = function() {
	var input = this.getInputData(0)
	var vector = this.getInputData(1)

	if (input !== undefined && vector !== undefined) {
		var dis = input.distanceToSquared(vector)
		this.setOutputData(0, dis)
	}
}

function VectorDivideNode() {
	this.addInput("Input", "Vector")
	this.addInput("Vector", "Vector")

	this.addOutput("Output", "Vector")
}
VectorDivideNode.title_color = NodesHelper.colours.purple[0]
VectorDivideNode.title_color1 = NodesHelper.colours.purple[1]
VectorDivideNode.title_color2 = NodesHelper.colours.purple[1]
VectorDivideNode.title_text_color = NodesHelper.title_colours.white
VectorDivideNode.title = "Divide"
VectorDivideNode.prototype.onExecute = function() {
	var input = this.getInputData(0)
	var v = this.getInputData(1)

	if (input !== undefined && v !== undefined) {
		input.divide(v)
	}

	this.setOutputData(0, input)
}

function VectorDivideScalarNode() {
	this.addInput("Input", "Vector")
	this.addInput("Scalar", "number")

	this.addOutput("Output", "Vector")
}
VectorDivideScalarNode.title_color = NodesHelper.colours.purple[0]
VectorDivideScalarNode.title_color1 = NodesHelper.colours.purple[1]
VectorDivideScalarNode.title_color2 = NodesHelper.colours.purple[1]
VectorDivideScalarNode.title_text_color = NodesHelper.title_colours.white
VectorDivideScalarNode.title = "Divide Scalar"
VectorDivideScalarNode.prototype.onExecute = function() {
	var v = this.getInputData(0)
	var s = this.getInputData(1)

	if (v !== undefined && s !== undefined) {
		v.divideScalar(s)
	}

	this.setOutputData(0, v)
}

function VectorDotNode() {
	this.addInput("Input", "Vector")
	this.addInput("Vector", "Vector")

	this.addOutput("Product", "number")
}
VectorDotNode.title_color = NodesHelper.colours.purple[0]
VectorDotNode.title_color1 = NodesHelper.colours.purple[1]
VectorDotNode.title_color2 = NodesHelper.colours.purple[1]
VectorDotNode.title_text_color = NodesHelper.title_colours.white
VectorDotNode.title = "Dot"
VectorDotNode.prototype.onExecute = function() {
	var v = this.getInputData(0)
	var v1 = this.getInputData(1)

	if(v !== undefined && v1 !== undefined) {
		var d = v.dot(v1)
		this.setOutputData(0, d)
	}
}

function VectorFloorNode() {
	this.addInput("Input", "Vector")
	this.addOutput("Output", "Vector")
}
VectorFloorNode.title_color = NodesHelper.colours.purple[0]
VectorFloorNode.title_color1 = NodesHelper.colours.purple[1]
VectorFloorNode.title_color2 = NodesHelper.colours.purple[1]
VectorFloorNode.title_text_color = NodesHelper.title_colours.white
VectorFloorNode.title = "Floor"
VectorFloorNode.prototype.onExecute = function() {
	var v = this.getInputData(0)

	if (v !== undefined) {
		v.floor()
	}

	this.setOutputData(0, v)
}

function VectorGetComponentNode() {
	this.addInput("Input", "Vector")
	this.addInput("Index", "number")

	this.addOutput("Component", "number")
}
VectorGetComponentNode.title_color = NodesHelper.colours.purple[0]
VectorGetComponentNode.title_color1 = NodesHelper.colours.purple[1]
VectorGetComponentNode.title_color2 = NodesHelper.colours.purple[1]
VectorGetComponentNode.title_text_color = NodesHelper.title_colours.white
VectorGetComponentNode.title = "Get Component"
VectorGetComponentNode.prototype.onExecute = function() {
	var v = this.getInputData(0)
	var i = this.getInputData(1)

	if (v !== undefined && i !== undefined) {
		var comp = v.getComponent(i)
		this.setOutputData(0, comp)
	}
}

function VectorLengthNode() {
	this.addInput("Input", "Vector")
	this.addOutput("Length", "number")
}
VectorLengthNode.title_color = NodesHelper.colours.purple[0]
VectorLengthNode.title_color1 = NodesHelper.colours.purple[1]
VectorLengthNode.title_color2 = NodesHelper.colours.purple[1]
VectorLengthNode.title_text_color = NodesHelper.title_colours.white
VectorLengthNode.title = "Length"
VectorLengthNode.prototype.onExecute = function() {
	var i = this.getInputData(0)
	if (i !== undefined) {
		var l = i.length()
		this.setOutputData(l)
	}
}

function VectorManhattanLengthNode() {
	this.addInput("Input", "Vector")
	this.addOutput("Length", "number")
}
VectorManhattanLengthNode.title_color = NodesHelper.colours.purple[0]
VectorManhattanLengthNode.title_color1 = NodesHelper.colours.purple[1]
VectorManhattanLengthNode.title_color2 = NodesHelper.colours.purple[1]
VectorManhattanLengthNode.title_text_color = NodesHelper.title_colours.white
VectorManhattanLengthNode.title = "Manhattan Length"
VectorManhattanLengthNode.prototype.onExecute = function() {
	var i = this.getInputData(0)

	if (i !== undefined) {
		var l = i.manhattanLength()
		this.setOutputData(0, l)
	}
}

function VectorLengthSqNode(argument) {
	this.addInput("Input", "Vector")
	this.addOutput("Length", "number")
}
VectorLengthSqNode.title_color = NodesHelper.colours.purple[0]
VectorLengthSqNode.title_color1 = NodesHelper.colours.purple[1]
VectorLengthSqNode.title_color2 = NodesHelper.colours.purple[1]
VectorLengthSqNode.title_text_color = NodesHelper.title_colours.white
VectorLengthSqNode.title = "Length Sq"
VectorLengthSqNode.prototype.onExecute = function() {
	var i = this.getInputData(0)
	if (i !== undefined) {
		var l = i.lengthSq()
		this.setOutputData(0, l)
	}
}

function VectorLerpNode() {
	this.addInput("Input", "Vector")
	this.addInput("Vector", "Vector")
	this.addInput("Alpha", "number")

	this.addOutput("Output", "Vector3")

	this.setProperty("alpha", 0)
	this.widget = this.addWidget("number", "Alpha", 0, "alpha")
}
VectorLerpNode.title_color = NodesHelper.colours.purple[0]
VectorLerpNode.title_color1 = NodesHelper.colours.purple[1]
VectorLerpNode.title_color2 = NodesHelper.colours.purple[1]
VectorLerpNode.title_text_color = NodesHelper.title_colours.white
VectorLerpNode.title = "Lerp"
VectorLerpNode.prototype.onExecute = function() {
	var i = this.getInputData(0)
	var v = this.getInputData(1)
	var a = this.getInputData(2)

	if (a === undefined) {
		a = this.properties["alpha"]
	}

	if (i !== undefined && v !== undefined) {
		i.lerp(v, a)
	}

	this.setOutputData(i)
}
VectorLerpNode.prototype.onPropertyChanged = function() {
	if (this.graph && this.graph.onNodeConnectionChange) {
       this.graph.onNodeConnectionChange()
    }
}

function VectorLerpVectorsNode() {
	this.addInput("Input", "Vector")
	this.addInput("Vector", "Vector")
	this.addInput("Vector", "Vector")
	this.addInput("Alpha", "number")

	this.addOutput("Output", "Vector")

	this.setProperty("alpha", 0)
	this.widget = this.addWidget("number", "Alpha", 0, "alpha")
}
VectorLerpVectorsNode.title_color = NodesHelper.colours.purple[0]
VectorLerpVectorsNode.title_color1 = NodesHelper.colours.purple[1]
VectorLerpVectorsNode.title_color2 = NodesHelper.colours.purple[1]
VectorLerpVectorsNode.title_text_color = NodesHelper.title_colours.white
VectorLerpVectorsNode.title = "Lerp Vectors"
VectorLerpVectorsNode.prototype.onExecute = function() {
	var i = this.getInputData(0)
	var v1 = this.getInputData(1)
	var v2 = this.getInputData(2)
	var a = this.getInputData(3)

	if (a === undefined) {
		a = this.properties["alpha"]
	}

	if (i !== undefined && v1 !== undefined && v2 !== undefined) {
		i.lerpVectors(v1, v2, a)
	}

	this.setOutputData(0, i)
}
VectorLerpVectorsNode.prototype.onPropertyChanged = function() {
	if (this.graph && this.graph.onNodeConnectionChange) {
       this.graph.onNodeConnectionChange()
    }
}

function VectorMaxNode() {
	this.addInput("Input", "Vector")
	this.addInput("Vector", "Vector")

	this.addOutput("Output", "Vector")
}
VectorMaxNode.title_color = NodesHelper.colours.purple[0]
VectorMaxNode.title_color1 = NodesHelper.colours.purple[1]
VectorMaxNode.title_color2 = NodesHelper.colours.purple[1]
VectorMaxNode.title_text_color = NodesHelper.title_colours.white
VectorMaxNode.title = "Max"
VectorMaxNode.prototype.onExecute = function() {
	var i = this.getInputData(0)
	var v = this.getInputData(1)

	if (i !== undefined && v !== undefined) {
		i.max(v)
	}

	this.setOutputData(0, i)
}

function VectorMinNode() {
	this.addInput("Input", "Vector")
	this.addInput("Vector", "Vector")

	this.addOutput("Output", "Vector")
}
VectorMinNode.title_color = NodesHelper.colours.purple[0]
VectorMinNode.title_color1 = NodesHelper.colours.purple[1]
VectorMinNode.title_color2 = NodesHelper.colours.purple[1]
VectorMinNode.title_text_color = NodesHelper.title_colours.white
VectorMinNode.title = "Min"
VectorMinNode.prototype.onExecute = function() {
	var i = this.getInputData(0)
	var v = this.getInputData(1)

	if (i !== undefined && v !== undefined) {
		i.min(v)
	}

	this.setOutputData(0, i)
}

function VectorMultiplyNode() {
	this.addInput("Input", "Vector")
	this.addInput("Vector", "Vector")

	this.addOutput("Output", "Vector")
}
VectorMultiplyNode.title_color = NodesHelper.colours.purple[0]
VectorMultiplyNode.title_color1 = NodesHelper.colours.purple[1]
VectorMultiplyNode.title_color2 = NodesHelper.colours.purple[1]
VectorMultiplyNode.title_text_color = NodesHelper.title_colours.white
VectorMultiplyNode.title = "Multiply"
VectorMultiplyNode.prototype.onExecute = function() {
	var i = this.getInputData(0)
	var v = this.getInputData(1)

	if (i !== undefined && v !== undefined) {
		i.multiply(v)
	}

	this.setOutputData(0, i)
}

function VectorMultiplyScalarNode() {
	this.addInput("Input", "Vector")
	this.addInput("Scalar", "number")

	this.addOutput("Output", "Vector")

	this.setProperty("scalar", 0)
	this.widget = this.addWidget("number", "Scalar", 0, "scalar")
}
VectorMultiplyScalarNode.title_color = NodesHelper.colours.purple[0]
VectorMultiplyScalarNode.title_color1 = NodesHelper.colours.purple[1]
VectorMultiplyScalarNode.title_color2 = NodesHelper.colours.purple[1]
VectorMultiplyScalarNode.title_text_color = NodesHelper.title_colours.white
VectorMultiplyScalarNode.title = "Multiply Scalar"
VectorMultiplyScalarNode.prototype.onExecute = function() {
	var i = this.getInputData(0)
	var s = this.getInputData(1)

	if (s === undefined) {
		s = this.properties["scalar"]
	}

	if (i !== undefined) {
		i.multiplyScalar(s)
	}

	this.setOutputData(0, i)
}
VectorMultiplyScalarNode.prototype.onPropertyChanged = function() {
	if (this.graph && this.graph.onNodeConnectionChange) {
       this.graph.onNodeConnectionChange()
    }
}

function VectorMultiplyVectorsNode() {
	this.addInput("Input", "Vector")
	this.addInput("Vector", "Vector")
	this.addInput("Vector", "Vector")

	this.addOutput("Output", "Vector")
}
VectorMultiplyVectorsNode.title_color = NodesHelper.colours.purple[0]
VectorMultiplyVectorsNode.title_color1 = NodesHelper.colours.purple[1]
VectorMultiplyVectorsNode.title_color2 = NodesHelper.colours.purple[1]
VectorMultiplyVectorsNode.title_text_color = NodesHelper.title_colours.white
VectorMultiplyVectorsNode.title = "Multiply Vectors"
VectorMultiplyVectorsNode.prototype.onExecute = function() {
	var i = this.getInputData(0)
	var v1 = this.getInputData(1)
	var v2 = this.getInputData(2)

	if (i !== undefined && v1 !== undefined && v2 !== undefined) {
		i.multiplyVectors(v1, v2)
	}

	this.setOutputData(0, i)
}

function VectorNegateNode() {
	this.addInput("Input", "Vector")
	this.addOutput("Output", "Vector")
}
VectorNegateNode.title_color = NodesHelper.colours.purple[0]
VectorNegateNode.title_color1 = NodesHelper.colours.purple[1]
VectorNegateNode.title_color2 = NodesHelper.colours.purple[1]
VectorNegateNode.title_text_color = NodesHelper.title_colours.white
VectorNegateNode.title = "Negate"
VectorNegateNode.prototype.onExecute = function() {
	var i = this.getInputData(0)
	if (i !== undefined) {
		i.negate()
	}
	this.setOutputData(0, i)
}

function VectorGetXNode() {
	this.addInput("Vector", "Vector")
	this.addOutput("X", "number")
}
VectorGetXNode.title_color = NodesHelper.colours.purple[0]
VectorGetXNode.title_color1 = NodesHelper.colours.purple[1]
VectorGetXNode.title_color2 = NodesHelper.colours.purple[1]
VectorGetXNode.title_text_color = NodesHelper.title_colours.white
VectorGetXNode.title = "Get X"
VectorGetXNode.prototype.onExecute = function() {
	var vec = this.getInputData(0)
	if (vec !== undefined) {
		this.setOutputData(0, vec.x)
	}
}

function VectorGetYNode() {
	this.addInput("Vector", "Vector")
	this.addOutput("Y", "number")
}
VectorGetYNode.title_color = NodesHelper.colours.purple[0]
VectorGetYNode.title_color1 = NodesHelper.colours.purple[1]
VectorGetYNode.title_color2 = NodesHelper.colours.purple[1]
VectorGetYNode.title_text_color = NodesHelper.title_colours.white
VectorGetYNode.title = "Get Y"
VectorGetYNode.prototype.onExecute = function() {
	var vec = this.getInputData(0)
	if (vec !== undefined) {
		this.setOutputData(0, vec.y)
	}
}

function VectorGetZNode() {
	this.addInput("Vector", "Vector")
	this.addOutput("Z", "number")
}
VectorGetZNode.title_color = NodesHelper.colours.purple[0]
VectorGetZNode.title_color1 = NodesHelper.colours.purple[1]
VectorGetZNode.title_color2 = NodesHelper.colours.purple[1]
VectorGetZNode.title_text_color = NodesHelper.title_colours.white
VectorGetZNode.title = "Get Z"
VectorGetZNode.prototype.onExecute = function() {
	var vec = this.getInputData(0)
	if (vec !== undefined) {
		this.setOutputData(0, vec.z)
	}
}

function VectorSetXNode() {
	this.addInput("Vector", "Vector")
	this.addInput("X", "number")
	// TODO: Number component
}
VectorSetXNode.title_color = NodesHelper.colours.purple[0]
VectorSetXNode.title_color1 = NodesHelper.colours.purple[1]
VectorSetXNode.title_color2 = NodesHelper.colours.purple[1]
VectorSetXNode.title_text_color = NodesHelper.title_colours.white
VectorSetXNode.title = "Set X"
VectorSetXNode.prototype.onExecute = function() {
	var vec = this.getInputData(0)
	var x = this.getInputData(1)

	if (vec !== undefined) {
		vec.x = x
	}
}

function VectorSetYNode() {
	this.addInput("Vector", "Vector")
	this.addInput("Y", "number")
	// TODO: Number component
}
VectorSetYNode.title_color = NodesHelper.colours.purple[0]
VectorSetYNode.title_color1 = NodesHelper.colours.purple[1]
VectorSetYNode.title_color2 = NodesHelper.colours.purple[1]
VectorSetYNode.title_text_color = NodesHelper.title_colours.white
VectorSetYNode.title = "Set Y"
VectorSetYNode.prototype.onExecute = function() {
	var vec = this.getInputData(0)
	var y = this.getInputData(1)

	if (vec !== undefined) {
		vec.y = y
	}
}

function VectorSetZNode() {
	this.addInput("Vector", "Vector")
	this.addInput("Z", "number")
	// TODO: Number component
}
VectorSetZNode.title_color = NodesHelper.colours.purple[0]
VectorSetZNode.title_color1 = NodesHelper.colours.purple[1]
VectorSetZNode.title_color2 = NodesHelper.colours.purple[1]
VectorSetZNode.title_text_color = NodesHelper.title_colours.white
VectorSetZNode.title = "Set Z"
VectorSetZNode.prototype.onExecute = function() {
	var vec = this.getInputData(0)
	var z = this.getInputData(1)

	if (vec !== undefined) {
		vec.z = z
	}
}

function registerVectorNodes() {
	// REGISTER THE NODES
	LiteGraph.registerNodeType("Vectors/Vector2", Vector2Node)
	LiteGraph.registerNodeType("Vectors/Vector3", Vector3Node)
	LiteGraph.registerNodeType("Vectors/Vector2ToVector3", Vector2ToVector3Node)
	LiteGraph.registerNodeType("Vectors/VectorSet", VectorSetNode)
	LiteGraph.registerNodeType("Vectors/VectorAdd", VectorAddNode)
	LiteGraph.registerNodeType("Vectors/VectorAddScalar", VectorAddScalarNode)
	LiteGraph.registerNodeType("Vectors/AddScaledVector", VectorAddScaledVectorNode)
	LiteGraph.registerNodeType("Vectors/AddVectors", VectorAddVectorsNode)
	LiteGraph.registerNodeType("Vectors/VectorApplyAxisAngle", VectorApplyAxisAngleNode)
	LiteGraph.registerNodeType("Vectors/VectorApplyEulerAngle", VectorApplyEulerNode)
	LiteGraph.registerNodeType("Vectors/VectorCeil", VectorCeilNode)
	LiteGraph.registerNodeType("Vectors/VectorClamp", VectorClampNode)
	LiteGraph.registerNodeType("Vectors/VectorClampLength", VectorClampLengthNode)
	LiteGraph.registerNodeType("Vectors/VectorClampScalar", VectorClampScalarNode)
	LiteGraph.registerNodeType("Vectors/VectorClone", VectorCloneNode)
	LiteGraph.registerNodeType("Vectors/VectorCopy", VectorCopyNode)
	LiteGraph.registerNodeType("Vectors/VectorCross", VectorCrossNode)
	LiteGraph.registerNodeType("Vectors/VectorCrossVectors", VectorCrossVectorsNode)
	LiteGraph.registerNodeType("Vectors/VectorDistanceTo", VectorDistanceToNode)
	LiteGraph.registerNodeType("Vectors/VectorManhattanDistanceTo", VectorManhattanDistanceToNode)
	LiteGraph.registerNodeType("Vectors/VectorDistanceToSquared", VectorDistanceToSquaredNode)
	LiteGraph.registerNodeType("Vectors/VectorDivide", VectorDivideNode)
	LiteGraph.registerNodeType("Vectors/VectorDivideScalar", VectorDivideScalarNode)
	LiteGraph.registerNodeType("Vectors/VectorDot", VectorDotNode)
	LiteGraph.registerNodeType("Vectors/VectorFloor", VectorFloorNode)
	LiteGraph.registerNodeType("Vectors/VectorGetComponent", VectorGetComponentNode)
	LiteGraph.registerNodeType("Vectors/VectorLength", VectorLengthNode)
	LiteGraph.registerNodeType("Vectors/VectorManhattanLength", VectorManhattanLengthNode)
	LiteGraph.registerNodeType("Vectors/VectorLengthSq", VectorLengthSqNode)
	LiteGraph.registerNodeType("Vectors/VectorLerp", VectorLerpNode)
	LiteGraph.registerNodeType("Vectors/VectorLerpVectors", VectorLerpVectorsNode)
	LiteGraph.registerNodeType("Vectors/VectorMax", VectorMaxNode)
	LiteGraph.registerNodeType("Vectors/VectorMin", VectorMinNode)
	LiteGraph.registerNodeType("Vectors/VectorMultiply", VectorMultiplyNode)
	LiteGraph.registerNodeType("Vectors/VectorMultiplyScalar", VectorMultiplyScalarNode)
	LiteGraph.registerNodeType("Vectors/VectorMultiplyVectors", VectorMultiplyVectorsNode)
	LiteGraph.registerNodeType("Vectors/VectorNegate", VectorNegateNode)
	LiteGraph.registerNodeType("Vectors/VectorGetX", VectorGetXNode)
	LiteGraph.registerNodeType("Vectors/VectorGetY", VectorGetYNode)
	LiteGraph.registerNodeType("Vectors/VectorGetZ", VectorGetZNode)
	LiteGraph.registerNodeType("Vectors/VectorSetX", VectorSetXNode)
	LiteGraph.registerNodeType("Vectors/VectorSetY", VectorSetYNode)
	LiteGraph.registerNodeType("Vectors/VectorSetZ", VectorSetZNode)
}