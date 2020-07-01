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
	var mat = Editor.getAssetByUUID(this.properties.mat)	
	mat.nodes = {}

	var c = this.getInputData(0)
	var e = this.getInputData(1)
	var r = this.getInputData(2)
	var s = this.getInputData(3)
	var s1 = this.getInputData(4)
	var w = this.getInputData(5)

	if (mat !== undefined && mat instanceof THREE.MeshPhongMaterial) {
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

	this.setOutputData(0, mat)
}

function SetMaterialColorNode() {
	this.addInput("Material", "Material")
	this.addInput("Colour", "Color")
}
SetMaterialColorNode.title = "Colour"
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
SetMaterialTransparentNode.title = "Transparent"
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
SetMaterialOpacityNode.title = "Opacity"
SetMaterialOpacityNode.prototype.onExecute = function() {
	var m = this.getInputData(0)
	var o = this.getInputData(1)

	if (m !== undefined && o !== undefined) {
		m.opacity = o
	}
}

function SetBlendingModeMaterialNode() {
	this.addInput("Material", "Material")
	this.addInput("Blending Mode", "number")
}
SetBlendingModeMaterialNode.title = "Blending"
SetBlendingModeMaterialNode.prototype.onExecute = function() {
	var m = this.getInputData(0)
	var b = this.getInputData(1)

	if (m !== undefined && b !== undefined) {
		m.blending = b
	}
}

function SetBlendingSourceNode() {
	this.addInput("Material", "Material")
	this.addInput("Blending source", "number")
}
SetBlendingSourceNode.title = "Blend Source"
SetBlendingSourceNode.prototype.onExecute = function() {
	var m = this.getInputData(0)
	var bs = this.getInputData(1)

	if (m !== undefined && bs !== undefined) {
		m.blendSrc = bs
	}
}

function SetBlendingSourceAlphaNode() {
	this.addInput("Material", "Material")
	this.addInput("Alpha", "number")
}
SetBlendingSourceAlphaNode.title = "Blend Source Alpha"
SetBlendingSourceAlphaNode.prototype.onExecute = function() {
	var m = this.getInputData(0)
	var a = this.getInputData(1)

	if (m !== undefined && a !== undefined) {
		m.blendSrcAlpha = a
	}
}

function SetBlendingDestinationNode() {
	this.addInput("Material", "Material")
	this.addInput("Blending Destination", "number")
}
SetBlendingDestinationNode.title = "Blend Destination"
SetBlendingDestinationNode.prototype.onExecute = function() {
	var m = this.getInputData(0)
	var bdst = this.getInputData(1)

	if (m !== undefined && bdst !== undefined) {
		m.blendDst = bdst
	}
}

function SetBlendingDestinationAlphaNode() {
	this.addInput("Material", "Material")
	this.addInput("Alpha", "number")
}
SetBlendingDestinationAlphaNode.title = "Blend Destination Alpha"
SetBlendingDestinationAlphaNode.prototype.onExecute = function() {
	var m = this.getInputData(0)
	var a = this.getInputData(1)

	if (m !== undefined && a !== undefined) {
		m.blendDst = a
	}
}

function SetBlendEquationNode() {
	this.addInput("Material", "Material")
	this.addInput("Equation", "number")
}
SetBlendEquationNode.title = "Blend Equation"
SetBlendEquationNode.prototype.onExecute = function() {
	var m = this.getInputData(0)
	var e = this.getInputData(1)

	if (m !== undefined && e !== undefined) {
		m.blendEquation = e
	}
}

function SetBlendEquationAlphaNode() {
	this.addInput("Material", "Material")
	this.addInput("Alpha", "number")
}
SetBlendEquationAlphaNode.title = "Blend Equation Alpha"
SetBlendEquationAlphaNode.prototype.onExecute = function() {
	var m = this.getInputData(0)
	var a = this.getInputData(1)

	if (m !== undefined && a !== undefined) {
		m.blendEquationAlpha = a
	}
}

function SetAlphaTestNode() {
	this.addInput("Material", "Material")
	this.addInput("Alpha Test", "number")
}
SetAlphaTestNode.title = "Alpha Test"
SetAlphaTestNode.prototype.onExecute = function() {
	var m = this.getInputData(0)
	var a = this.getInputData(1)

	if (m !== undefined && a !== undefined) {
		m.alphaTest = a
	}
}

function FlatShadingNode() {
	this.addInput("Material", "Material")
	this.addInput("Value", "Boolean")
}
FlatShadingNode.title = "Flat Shading"
FlatShadingNode.prototype.onExecute = function() {
	var m = this.getInputData(0)
	var v = this.getInputData(1)

	if (m !== undefined && v !== undefined) {
		m.flatShading = v
	}
}

function AffectedByFogNode() {
	this.addInput("Material", "Material")
	this.addInput("Value", "Boolean")
}
AffectedByFogNode.title = "Affected By Fog"
AffectedByFogNode.prototype.onExecute = function() {
	var m = this.getInputData(0)
	var v = this.getInputData(1)

	if (m !== undefined && v !== undefined) {
		m.fog = v
	}
}

function SetPrecisionNode() {
	this.addInput("Material", "Material")
	this.addInput("Precision", "Text")
}
SetPrecisionNode.title = "Precision"
SetPrecisionNode.prototype.onExecute = function() {
	var m = this.getInputData(0)
	var p = this.getInputData(1)

	if (m !== undefined && p !== undefined) {
		m.precision = p
	}
}

function ShadowSideNode() {
	this.addInput("Material", "Material")
	this.addInput("Side", "number")
}
ShadowSideNode.title = "Shadow Side"
ShadowSideNode.prototype.onExecute = function() {
	var m = this.getInputData(0)
	var s = this.getInputData(1)

	if (m !== undefined && s !== undefined) {
		m.shadowSide = s
	}
}

function registerMaterialNodeNodes() {
	LiteGraph.registerNodeType("Material/MeshPhongMaterial", MeshPhongMaterialNode)
	LiteGraph.registerNodeType("Material/SetMaterialColor", SetMaterialColorNode)
	LiteGraph.registerNodeType("Material/SetMaterialTransparent", SetMaterialTransparentNode)
	LiteGraph.registerNodeType("Material/SetMaterialOpacity", SetMaterialOpacityNode)
	LiteGraph.registerNodeType("Material/SetBlendingModeMaterial", SetBlendingModeMaterialNode)
	LiteGraph.registerNodeType("Material/SetBlendingSource", SetBlendingSourceNode)
	LiteGraph.registerNodeType("Material/SetBlendingSourceAlpha", SetBlendingSourceAlphaNode)
	LiteGraph.registerNodeType("Material/SetBlendingDestination", SetBlendingDestinationNode)
	LiteGraph.registerNodeType("Material/SetBlendingDestinationAlpha", SetBlendingDestinationAlphaNode)
	LiteGraph.registerNodeType("Material/SetBlendEquation", SetBlendEquationNode)
	LiteGraph.registerNodeType("Material/SetBlendEquationAlpha", SetBlendEquationAlphaNode)
	LiteGraph.registerNodeType("Material/SetAlphaTest", SetAlphaTestNode)
	LiteGraph.registerNodeType("Material/FlatShading", FlatShadingNode)
	LiteGraph.registerNodeType("Material/AffectedByFog", AffectedByFogNode)
	LiteGraph.registerNodeType("Material/SetPrecision", SetPrecisionNode)
	LiteGraph.registerNodeType("Material/ShadowSide", ShadowSideNode)
}