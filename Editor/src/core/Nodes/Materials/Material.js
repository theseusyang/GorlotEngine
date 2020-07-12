// TODO: Texture map, Bump Map, Bump Map Scale, Normal Map, Normal Map Scale, Displacement Map, Displacement map scale, Displacement map bias, Specular map, Alpha Map, Environment Map

function MeshPhongMaterialNode() {
	this.addInput("Colour", "Color")
	this.addInput("Emissive", "Color")
	this.addInput("Reflectivity", "number")
	this.addInput("Shininess", "number")
	this.addInput("Specular", "Color")
	this.addInput("Wireframe", "Boolean")
	this.addInput("Depth Write", "Boolean")
	this.addInput("Transparent", "Boolean")
	this.addInput("Opacity", "number")
	this.addInput("Affected By Fog", "Boolean")

	this.addOutput("Material", "Material")
	var self = this
	
	this.setProperty("reflectivity", 1)
	this.setProperty("shininess", 30)
	this.setProperty("wireframe", false)
	this.setProperty("depthwrite", false)
	this.setProperty("transparent", false)
	this.setProperty("opacity", 1)
	this.setProperty("abf", true)

	this.widget1 = this.addWidget("slider", "Reflectivity", this.properties.reflectivity,  (v) => {self.properties.reflectivity = v}, {value: this.properties.reflectivity, min: 0, max: 1, text: "R"})
	this.widget2 = this.addWidget("slider", "Shininess", this.properties.shininess, (v) => {self.properties.shininess = v}, {value: this.properties.shininess, min: 0, max: 100, text: "S"})

	this.addWidget("toggle", "Wireframe", this.properties.wireframe, "wireframe")
	this.addWidget("toggle", "Depth Write", this.properties.depthwrite, "depthwrite")
	this.addWidget("toggle", "Transparent", this.properties.transparent, "transparent")

	this.widget3 = this.addWidget("slider", "Opacity", this.properties.opacity, (v) => {self.properties.opacity = v}, {value: this.properties.opacity, min: 0, max: 1})

	this.addWidget("toggle", "Affected By Fog", this.properties.abf, "abf")
}
MeshPhongMaterialNode.title = "Material"
MeshPhongMaterialNode.prototype.onPropertyChanged = function(n, v) {
	if (n === "reflectivity") {
		if(this.widget1 !== undefined) {
			this.widget1.value = v
		}
	} else if (n === "shininess") {
		if(this.widget2 !== undefined) {
			this.widget2.value = v
		}
	} else if (n === "opacity") {
		if (this.widget3 !== undefined) {
			this.widget3.value = v
		}
	}
}
MeshPhongMaterialNode.prototype.onExecute = function() {
	var mat = Editor.getAssetByUUID(this.properties.mat)

	if (mat !== undefined/* && mat instanceof THREE.MeshPhongMaterial*/ && mat !== null) {
		mat.nodes = {}
	
		var c = this.getInputData(0)
		var e = this.getInputData(1)
		var r = this.getInputData(2)
		var s = this.getInputData(3)
		var s1 = this.getInputData(4)
		var w = this.getInputData(5)
		var dw = this.getInputData(6)
		var tr = this.getInputData(7)
		var op = this.getInputData(8)
		var abf = this.getInputData(9)
		
		if (c !== undefined) {
			mat.color = c
		}
		if (e !== undefined) {
			mat.emisive = e
		}
		if (r !== undefined) {
			mat.reflectivity = r
		} else {
			mat.reflectivity = this.properties["reflectivity"]
		}
		if (s !== undefined) {
			mat.shininess = s
		} else {
			mat.shininess = this.properties["shininess"]
		}
		if (s1 !== undefined) {
			mat.specular = s1
		}
		if (w !== undefined) {
			mat.wireframe = w
		} else {
			mat.wireframe = this.properties["wireframe"]
		}
		if (dw !== undefined) {
			mat.depthWrite = dw
		} else {
			mat.depthwrite = this.properties["depthwrite"]
		}
		if (tr !== undefined) {
			mat.transparent = tr
		} else {
			mat.transparent = this.properties["transparent"]
		}
		if (op !== undefined) {
			mat.opacity = op
		} else {
			mat.opacity = this.properties["opacity"]
		}
		if (abf !== undefined) {
			mat.fog = abf
		} else {
			mat.fog = this.properties["abf"]
		}
	}

	this.setOutputData(0, mat)
}
MeshPhongMaterialNode.prototype.onPropertyChanged = function() {
	if (this.graph && this.graph.onNodeConnectionChange) {
       this.graph.onNodeConnectionChange()
    }
}

function ShaderNode() {
	this.properties = {mat: null}
}
ShaderNode.title = "Shader"
ShaderNode.prototype.onDblClick = function() {
	var uuid = this.properties.mat
	var mat = Editor.getAssetByUUID(uuid)

	if (mat instanceof THREE.ShaderMaterial) {
		EditorUI.matShaEd = new ShaderMaterialEditor()
		EditorUI.matShaEd.attachMaterial(mat)
	}
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

function SetMaterialDepthWriteNode() {
	this.addInput("Material", "Material")
	this.addInput("Depth Write", "Boolean")
}
SetMaterialDepthWriteNode.title = "Depth Write"
SetMaterialDepthWriteNode.prototype.onExecute = function() {
	var m = this.getInputData(0)
	var d = this.getInputData(1)

	if (m !== undefined && d !== undefined) {
		m.depthWrite = d
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

	this.setProperty("opacity", 0)
	this.addWidget("number", "Opacity", 0, "opacity")
}
SetMaterialOpacityNode.title = "Opacity"
SetMaterialOpacityNode.prototype.onExecute = function() {
	var m = this.getInputData(0)
	var o = this.getInputData(1)

	if (o === undefined) {
		o = this.properties["opacity"]
	}

	if (m !== undefined) {
		m.opacity = o
	}
}
SetMaterialOpacityNode.prototype.onPropertyChanged = function() {
	if (this.graph && this.graph.onNodeConnectionChange) {
       this.graph.onNodeConnectionChange()
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

function TestDepthNode() {
	this.addInput("Material", "Material")
	this.addInput("Test", "Boolean")
}
TestDepthNode.title = "Test Depth"
TestDepthNode.prototype.onExecute = function() {
	var m = this.getInputData(0)
	var t = this.getInputData(1)

	if (m !== undefined && t !== undefined) {
		m.depthTest = t
	}
}

function ShadingNode() {
	this.addInput("Material", "Material")
	this.addInput("Shading", "number")
}
ShadingNode.title = "Shading"
ShadingNode.prototype.onExecute = function() {
	var m = this.getInputData(0)
	var s = this.getInputData(1)

	if (m !== undefined && s !== undefined) {
		m.shading = s
		m.needsUpdate = true
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

function CombineNode() {
	this.addInput("Material", "Material")
	this.addInput("Mode", "number")
}
CombineNode.title = "Combine"
CombineNode.prototype.onExecute = function() {
	var m = this.getInputData(0)
	var mode = this.getInputData(1)

	if (m !== undefined && mode !== undefined) {
		m.combine = mode
	}
}

function MaterialSetSkinningNode() {
	this.addInput("Material", "Material")
	this.addInput("Skinning", "Boolean")
}
MaterialSetSkinningNode.title = "Skinning"
MaterialSetSkinningNode.prototype.onExecute = function() {
	var m = this.getInputData(0)
	var s = this.getInputData(1)

	if (m !== undefined && s !== undefined) {
		m.skinning = s
	}
}

function MaterialSetRefractionRatioNode() {
	this.addInput("Material", "Material")
	this.addInput("Ratio", "number")
}
MaterialSetRefractionRatioNode.title = "Refraction Ratio"
MaterialSetRefractionRatioNode.prototype.onExecute = function() {
	var m = this.getInputData(0)
	var r = this.getInputData(1)

	if (m !== undefined && r !== undefined) {
		m.refractionRatio = r
	}
}

function MaterialSetTextureMapNode() {
	this.addInput("Material", "Material")
	this.addInput("Texture", "Texture")
}
MaterialSetTextureMapNode.title = "Texture Map"
MaterialSetTextureMapNode.prototype.onExecute = function() {
	var m = this.getInputData(0)
	var t = this.getInputData(1)

	if (m !== undefined && t !== undefined) {
		m.map = t
	}
}

function registerMaterialNodeNodes() {
	LiteGraph.registerNodeType("Material/MeshPhongMaterial", MeshPhongMaterialNode)
	LiteGraph.registerNodeType("Material/Shader", ShaderNode)
	LiteGraph.registerNodeType("Material/SetMaterialColor", SetMaterialColorNode)
	LiteGraph.registerNodeType("Material/SetMaterialTransparent", SetMaterialTransparentNode)
	LiteGraph.registerNodeType("Material/SetMaterialDepthWrite", SetMaterialDepthWriteNode)
	LiteGraph.registerNodeType("Material/SetMaterialOpacity", SetMaterialOpacityNode)
	LiteGraph.registerNodeType("Material/SetBlendingModeMaterial", SetBlendingModeMaterialNode)
	LiteGraph.registerNodeType("Material/SetBlendingSource", SetBlendingSourceNode)
	LiteGraph.registerNodeType("Material/SetBlendingSourceAlpha", SetBlendingSourceAlphaNode)
	LiteGraph.registerNodeType("Material/SetBlendingDestination", SetBlendingDestinationNode)
	LiteGraph.registerNodeType("Material/SetBlendingDestinationAlpha", SetBlendingDestinationAlphaNode)
	LiteGraph.registerNodeType("Material/SetBlendEquation", SetBlendEquationNode)
	LiteGraph.registerNodeType("Material/SetBlendEquationAlpha", SetBlendEquationAlphaNode)
	LiteGraph.registerNodeType("Material/SetAlphaTest", SetAlphaTestNode)
	LiteGraph.registerNodeType("Material/TestDepth", TestDepthNode)
	LiteGraph.registerNodeType("Material/Shading", ShadingNode)
	LiteGraph.registerNodeType("Material/AffectedByFog", AffectedByFogNode)
	LiteGraph.registerNodeType("Material/SetPrecision", SetPrecisionNode)
	LiteGraph.registerNodeType("Material/ShadowSide", ShadowSideNode)
	LiteGraph.registerNodeType("Material/Combine", CombineNode)
	LiteGraph.registerNodeType("Material/MaterialSetSkinning", MaterialSetSkinningNode)
	LiteGraph.registerNodeType("Material/MaterialSetRefractionRatio", MaterialSetRefractionRatioNode)
	LiteGraph.registerNodeType("Material/MaterialSetTextureMap", MaterialSetTextureMapNode)
}