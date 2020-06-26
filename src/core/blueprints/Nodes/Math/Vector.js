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
	this.setOutputData(0, new THREE.Vector2(X, Y, Z))
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