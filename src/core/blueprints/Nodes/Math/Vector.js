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

function VectorGetXNode() {
	this.addInput("Vector", "Vector")
	this.addOutput("X", "number")
}
VectorGetXNode.title = "Get X"
VectorGetXNode.prototype.onExecute = function() {
	var Vec = this.getInputData(0)
	if (Vec === undefined) {
		Vec = new THREE.Vector2(0, 0)
	}
	var x = Vec.x

	this.setOutputData(0, x)
}

function VectorGetYNode() {
	this.addInput("Vector", "Vector")
	this.addOutput("Y", "number")
}
VectorGetYNode.title = "Get Y"
VectorGetYNode.prototype.onExecute = function() {
	var Vec = this.getInputData(0)
	if (Vec === undefined) {
		Vec = new THREE.Vector2(0, 0)
	}
	var y = Vec.y

	this.setOutputData(0, y)
}

function VectorGetZNode() {
	this.addInput("Vector", "Vector")
	this.addOutput("Z", "number")
}
VectorGetZNode.title = "Get Z"
VectorGetZNode.prototype.onExecute = function() {
	var Vec = this.getInputData(0)
	if (Vec === undefined) {
		Vec = new THREE.Vector3(0, 0, 0)
	}
	var z = Vec.z

	this.setOutputData(0, z)
}

// REGISTER THE NODES
LiteGraph.registerNodeType("Vectors/Vector2", Vector2Node)
LiteGraph.registerNodeType("Vectors/Vector3", Vector3Node)
LiteGraph.registerNodeType("Vectors/Vector2ToVector3", Vector2ToVector3Node)
LiteGraph.registerNodeType("Vectors/VectorSet", VectorSetNode)
LiteGraph.registerNodeType("Vectors/Get X", VectorGetXNode)
LiteGraph.registerNodeType("Vectors/Get Y", VectorGetYNode)
LiteGraph.registerNodeType("Vectors/Get Z", VectorGetZNode)