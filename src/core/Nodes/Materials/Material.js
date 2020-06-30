// TODO: Texture map, Bump Map, Bump Map Scale, Normal Map, Normal Map Scale, Displacement Map, Displacement map scale, Displacement map bias, Specular map, Alpha Map, Environment Map, 

function MeshPhongMaterialNode() {
	this.addInput("Colour", "Color")
	this.addInput("Emissive", "number")
	this.addInput("Reflectivity", "number")
	this.addInput("Shininess", "number")
	this.addInput("Specular", "Color")
	this.addInput("Wireframe", "Boolean")

	this.addOutput("Material", "Material")
}
MeshPhongMaterialNode.title = "Material"
MeshPhongMaterialNode.prototype.onExecute = function() {
	var mat = this.properties.mat	
	mat.nodes = {}

	var c = this.getInputData(0)
	var e = this.getInputData(1)
	var r = this.getInputData(2)
	var s = this.getInputData(3)
	var s1 = this.getInputData(4)
	var w = this.getInputData(5)

	if (mat !== undefined) {
		if (c !== undefined) {
			mat.color = c
		}
		if (e !== undefined) {
			mat.emisive = e
		}
		if (r !== undefined) {
			mat.reflectivity = r
		}
		if (s !== undefined) {
			mat.shininess = s
		}
		if (s1 !== undefined) {
			mat.specular = s1
		}
		if (w !== undefined) {
			mat.wireframe = w
		}
	}

	this.setOutputData(0, this.properties.mat)
}

function SetMaterialColorNode() {
	this.addInput("Material", "Material")
	this.addInput("Colour", "Color")
}
SetMaterialColorNode.title = "Set Colour"
SetMaterialColorNode.prototype.onExecute = function() {
	var m = this.getInputData(0)
	var c = this.getInputData(1)

	if (m !== undefined && c !== undefined) {
		m.color = c
	}
}

function SetMaterialTransparentNode() {
	this.addInput("Material", "Material")
	this.addInput("Transparent", "Boolean")
}
SetMaterialTransparentNode.title = "Set Transparent"
SetMaterialTransparentNode.prototype.onExecute = function() {
	var m = this.getInputData(0)
	var t = this.getInputData(1)

	if (m !== undefined && t !== undefined) {
		m.transparent = t
	}
}

function SetMaterialOpacityNode() {
	this.addInput("Material", "Material")
	this.addInput("Opacity", "number")
}
SetMaterialOpacityNode.title = "Set Opacity"
SetMaterialOpacityNode.prototype.onExecute = function() {
	var m = this.getInputData(0)
	var o = this.getInputData(1)

	if (m !== undefined && o !== undefined) {
		m.opacity = o
	}
}

function SetMaterialTextureNode() {
	// TODO: This
	this.addInput("Material", "Material")
	this.addInput("Texture", "Texture")
}
SetMaterialTextureNode.title = "Set Texture"
SetMaterialTextureNode.prototype.onExecute = function() {
	var m = this.getInputData(0)
	var t = this.getInputData(1)

	if (m !== undefined && t !== undefined) {
		m.map = t
	}
}

function registerMaterialNodeNodes(argument) {
	LiteGraph.registerNodeType("Material/MeshPhongMaterial", MeshPhongMaterialNode)
	LiteGraph.registerNodeType("Material/SetMaterialColor", SetMaterialColorNode)
	LiteGraph.registerNodeType("Material/SetMaterialTransparent", SetMaterialTransparentNode)
	LiteGraph.registerNodeType("Material/SetMaterialOpacity", SetMaterialOpacityNode)
	LiteGraph.registerNodeType("Material/SetMaterialTexture", SetMaterialTextureNode)
}