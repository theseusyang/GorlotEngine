function Vector2Node() {
	this.addInput("X", "number")
	this.addInput("Y", "number")
	this.addOutput("Vector", "Vector")
}

Vector2Node.title = "Vector2"

Vector2Node.prototype.onExecute = function() {
	var X = this.getInputData(0)
	var Y = this.getInputData(1)
	if (X === undefined) {
		X = 0
	}
	if (Y === undefined) {
		Y = 0
	}
	this.setOutputData(0, new THREE.Vector2(X, Y))
}

function Vector2ToVector3Node() {
	this.addInput("Vector2", "Vector")
	this.addOutput("Vector3", "Vector")
}

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
}

Vector3Node.title = "Vector3"

Vector3Node.prototype.onExecute = function() {
	var X = this.getInputData(0)
	var Y = this.getInputData(1)
	var Z = this.getInputData(2)
	if (X === undefined) {
		X = 0
	}
	if (Y === undefined) {
		Y = 0
	}
	if (Z === undefined) {
		Z = 0
	}
	this.setOutputData(0, new THREE.Vector3(X, Y, Z))
}

function VectorSetNode() {
	this.addInput("Vector", "Vector")
	this.addInput("X", "number")
	this.addInput("Y", "number")
	this.addInput("Z", "number")
	this.addOutput("Vector", "Vector")
}

VectorSetNode.title = "Set Vector"

VectorSetNode.prototype.onExecute = function() {
	var Vec = this.getInputData(0)
	var X = this.getInputData(1)
	var Y = this.getInputData(2)
	var Z = this.getInputData(3)

	if (Vec !== undefined && Vec instanceof THREE.Vector2) {
		var vec = Vec.set(X, Y)
	} else if (Vec !== undefined && Vec instanceof THREE.Vector3) {
		var vec = Vec.set(X, Y, Z)
	}

	this.setOutputData(0, vec)
}

function VectorAddNode() {
	this.addInput("Input", "Vector")
	this.addInput("Vector", "Vector")

	this.addOutput("Vector", "Vector")
}
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
}
VectorAddScalarNode.title = "Add Scalar"
VectorAddScalarNode.prototype.onExecute = function() {
	var vec = this.getInputData(0)
	var scalar = this.getInputData(1)

	if (vec !== undefined && scalar !== undefined) {
		vec.addScalar(scalar)
	}

	this.setOutputData(0, vec)
}

function VectorAddScaledVectorNode() {
	this.addInput("Input", "Vector")

	this.addInput("Vector", "Vector")
	this.addInput("Scalar", "number")
	this.addOutput("Vector", "Vector")
}
VectorAddScaledVectorNode.title = "Add Scaled Vector"
VectorAddScaledVectorNode.prototype.onExecute = function() {
	var input = this.getInputData(0)
	var vector = this.getInputData(1)
	var scalar = this.getInputData(2)

	if (input !== undefined && vector !== undefined && scalar !== undefined) {
		input.addScaledVector(vector, scalar)
	}

	this.setOutputData(0, input)
}

function VectorAddVectorsNode() {
	this.addInput("Input", "Vector")

	this.addInput("Vector", "Vector")
	this.addInput("Vector", "Vector")

	this.addOutput("Output", "Vector")
}
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
}
VectorApplyAxisAngleNode.title = "Apply Axis Angle"
VectorApplyAxisAngleNode.prototype.onExecute = function() {
	var input = this.getInputData(0)

	var axis = this.getInputData(1)
	var angle = this.getInputData(2)

	if (input !== undefined && axis !== undefined && angle !== undefined) {
		input.applyAxisAngle(axis, angle)
	}

	this.setOutputData(0, input)
}

function VectorApplyEulerNode() {
	this.addInput("Input", "Vector")
	this.addInput("Euler", "Euler")

	this.addOutput("Output", "Vector")
}
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
}
VectorClampLengthNode.title = "Clamp Length"
VectorClampLengthNode.prototype.onExecute = function() {
	var input = this.getInputData(0)

	var min = this.getInputData(1)
	var max = this.getInputData(2)

	if (input !== undefined && min !== undefined && max !== undefined) {
		input.clampLength(min, max)
	}

	this.setOutputData(0, input)
}

function VectorClampScalarNode() {
	this.addInput("Input", "Vector")

	this.addInput("Min", "number")
	this.addInput("Max", "number")

	this.addOutput("Output", "Vector")
}
VectorClampScalarNode.title = "Clamp Scalar"
VectorClampScalarNode.prototype.onExecute = function() {
	var input = this.getInputData(0)

	var min = this.getInputData(1)
	var max = this.getInputData(2)

	if (input !== undefined && min !== undefined && max !== undefined) {
		input.clampScalar(min, max)
	}

	this.setOutputData(0, input)
}

function VectorCloneNode() {
	this.addInput("Input", "Vector")
	this.addOutput("Vector", "Vector")
}
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
}
VectorLerpNode.title = "Lerp"
VectorLerpNode.prototype.onExecute = function() {
	var i = this.getInputData(0)
	var v = this.getInputData(1)
	var a = this.getInputData(2)

	if (i !== undefined && v !== undefined && a !== undefined) {
		i.lerp(v, a)
	}

	this.setOutputData(i)
}

function VectorLerpVectorsNode() {
	this.addInput("Input", "Vector")
	this.addInput("Vector", "Vector")
	this.addInput("Vector", "Vector")
	this.addInput("Alpha", "number")

	this.addOutput("Output", "Vector")
}
VectorLerpVectorsNode.title = "Lerp Vectors"
VectorLerpVectorsNode.prototype.onExecute = function() {
	var i = this.getInputData(0)
	var v1 = this.getInputData(1)
	var v2 = this.getInputData(2)
	var a = this.getInputData(3)

	if (i !== undefined && v1 !== undefined && v2 !== undefined && a !== undefined) {
		i.lerpVectors(v1, v2, a)
	}

	this.setOutputData(0, i)
}

function VectorMaxNode() {
	this.addInput("Input", "Vector")
	this.addInput("Vector", "Vector")

	this.addOutput("Output", "Vector")
}
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
}
VectorMultiplyScalarNode.title = "Multiply Scalar"
VectorMultiplyScalarNode.prototype.onExecute = function() {
	var i = this.getInputData(0)
	var s = this.getInputData(1)

	if (i !== undefined && v !== undefined) {
		i.multiplyScalar(s)
	}

	this.setOutputData(0, i)
}

function VectorMultiplyVectorsNode() {
	this.addInput("Input", "Vector")
	this.addInput("Vector", "Vector")
	this.addInput("Vector", "Vector")

	this.addOutput("Output", "Vector")
}
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
VectorGetZNode.title = "Get Z"
VectorGetZNode.prototype.onExecute = function() {
	var vec = this.getInputData(0)
	if (vec !== undefined) {
		this.setOutputData(0, vec.z)
	}
}

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