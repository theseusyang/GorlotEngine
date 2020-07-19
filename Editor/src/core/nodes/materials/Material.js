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
	
	this.setProperty("reflectivity", 1)
	this.setProperty("shininess", 30)
	this.setProperty("wireframe", false)
	this.setProperty("depthwrite", false)
	this.setProperty("transparent", false)
	this.setProperty("opacity", 1)
	this.setProperty("abf", true)

	var self = this
	this.widget1 = this.addWidget("slider", "Reflectivity", this.properties.reflectivity,  (v) => {self.properties.reflectivity = v}, {value: this.properties.reflectivity, min: 0, max: 1, text: "R"})
	this.widget2 = this.addWidget("slider", "Shininess", this.properties.shininess, (v) => {self.properties.shininess = v}, {value: this.properties.shininess, min: 0, max: 100, text: "S"})

	this.addWidget("toggle", "Wireframe", this.properties.wireframe, "wireframe")
	this.addWidget("toggle", "Depth Write", this.properties.depthwrite, "depthwrite")
	this.addWidget("toggle", "Transparent", this.properties.transparent, "transparent")

	this.widget3 = this.addWidget("slider", "Opacity", this.properties.opacity, (v) => {self.properties.opacity = v}, {value: this.properties.opacity, min: 0, max: 1})

	this.addWidget("toggle", "Affected By Fog", this.properties.abf, "abf")
}
MeshPhongMaterialNode.title_color = NodesHelper.colours.skyblue[0]
MeshPhongMaterialNode.title_color1 = NodesHelper.colours.skyblue[1]
MeshPhongMaterialNode.title_color2 = NodesHelper.colours.skyblue[1]
MeshPhongMaterialNode.title_text_color = NodesHelper.title_colours.white
MeshPhongMaterialNode.title = "Material"
MeshPhongMaterialNode.prototype.onAdded = function() {
}
MeshPhongMaterialNode.prototype.onPropertyChanged = function(n, v) {
	if (this.graph && this.graph.onNodeConnectionChange) {
       this.graph.onNodeConnectionChange()
    }

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
	if (this.graph.extra !== undefined) {
		var mat = this.graph.extra.material
		mat.nodes = {}
	}

	if (mat !== undefined && mat !== null) {

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
}

function ShaderNode() {
	this.properties = {mat: null}

        this.addInput("Uniforms", "JSON")
}
ShaderNode.title_color = NodesHelper.colours.aquamarine[0]
ShaderNode.title_color1 = NodesHelper.colours.aquamarine[1]
ShaderNode.title_color2 = NodesHelper.colours.aquamarine[2]
ShaderNode.title_text_color = NodesHelper.title_colours.white
ShaderNode.title = "Shader"
ShaderNode.prototype.onDblClick = function() {
	var mat = this.graph.extra.material

	if (mat instanceof THREE.ShaderMaterial) {

		// Check if there is already a tab with this material attached
		var found = false
		for(var i = 0; i < Interface.tab.options.length; i++) {
			if (Interface.tab.options[i].component instanceof ShaderMaterialEditor) {
				if (Interface.tab.options[i].component.material === mat) {
					found = true
					Interface.tab.selectOption(i)
					break
				}
			}
		}

		// If not found open new tab
		if (!found) {
			var tab = Interface.tab.addOption(mat.name, Interface.file_dir + "icons/misc/material.png", true)
			var material_editor, file

			for(var i = 0; i < Interface.asset_explorer.files.length; i++) {
				if (Interface.asset_explorer.files[i].material !== undefined) {
					if (Interface.asset_explorer.files[i].material.uuid === mat.uuid) {
						file = Interface.asset_explorer.files[i]
					}
				}
			}

			material_editor = new ShaderMaterialEditor()

			material_editor.attachMaterial(mat, file)
			tab.attachComponent(material_editor)
			tab.select()
		}

	}
}
ShaderNode.prototype.onExecute = function() {
        var uniforms = this.getInputData(0)

        if(uniforms !== undefined) {
               this.graph.extra.material.uniforms = uniforms 
        }
}

function SetMaterialColorNode() {
	this.addInput("Colour", "Color")
}
SetMaterialColorNode.title_color = NodesHelper.colours.cadet[0]
SetMaterialColorNode.title_color1 = NodesHelper.colours.cadet[1]
SetMaterialColorNode.title_color2 = NodesHelper.colours.cadet[2]
SetMaterialColorNode.title_text_color = NodesHelper.title_colours.white
SetMaterialColorNode.title = "Colour"
SetMaterialColorNode.prototype.onExecute = function() {
	var m = this.graph.extra.material
	var c = this.getInputData(0)

	if (m !== undefined && c !== undefined) {
		m.color = c
	}
}

function SetMaterialDepthWriteNode() {
	this.addInput("Depth Write", "Boolean")
}
SetMaterialDepthWriteNode.title_color = NodesHelper.colours.chartreuse[0]
SetMaterialDepthWriteNode.title_color1 = NodesHelper.colours.chartreuse[1]
SetMaterialDepthWriteNode.title_color2 = NodesHelper.colours.chartreuse[2]
SetMaterialDepthWriteNode.title_text_color = NodesHelper.title_colours.white
SetMaterialDepthWriteNode.title = "Depth Write"
SetMaterialDepthWriteNode.prototype.onExecute = function() {
	var m = this.graph.extra.material
	var d = this.getInputData(0)

	if (m !== undefined && d !== undefined) {
		m.depthWrite = d
	}
}

function SetMaterialTransparentNode() {
	this.addInput("Transparent", "Boolean")
}
SetMaterialTransparentNode.title_color = NodesHelper.colours.chartreuse[0]
SetMaterialTransparentNode.title_color1 = NodesHelper.colours.chartreuse[1]
SetMaterialTransparentNode.title_color2 = NodesHelper.colours.chartreuse[2]
SetMaterialTransparentNode.title_text_color = NodesHelper.title_colours.white
SetMaterialTransparentNode.title = "Transparent"
SetMaterialTransparentNode.prototype.onExecute = function() {
	var m = this.graph.extra.material
	var t = this.getInputData(0)

	if (m !== undefined && t !== undefined) {
		m.transparent = t
	}
}

function SetMaterialOpacityNode() {
	this.addInput("Opacity", "number")

	this.setProperty("opacity", 0)
	this.addWidget("number", "Opacity", 0, "opacity")
}
SetMaterialOpacityNode.title_color = NodesHelper.colours.chocolate[0]
SetMaterialOpacityNode.title_color1 = NodesHelper.colours.chocolate[1]
SetMaterialOpacityNode.title_color2 = NodesHelper.colours.chocolate[2]
SetMaterialOpacityNode.title_text_color = NodesHelper.title_colours.white
SetMaterialOpacityNode.title = "Opacity"
SetMaterialOpacityNode.prototype.onExecute = function() {
	var m = this.graph.extra.material
	var o = this.getInputData(0)

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
	this.addInput("Blending Mode", "number")
}
SetBlendingModeMaterialNode.title_color = NodesHelper.colours.cornsilk[0]
SetBlendingModeMaterialNode.title_color1 = NodesHelper.colours.cornsilk[1]
SetBlendingModeMaterialNode.title_color2 = NodesHelper.colours.cornsilk[2]
SetBlendingModeMaterialNode.title_text_color = NodesHelper.title_colours.white
SetBlendingModeMaterialNode.title = "Blending"
SetBlendingModeMaterialNode.prototype.onExecute = function() {
	var m = this.graph.extra.material
	var b = this.getInputData(0)

	if (m !== undefined && b !== undefined) {
		m.blending = b
	}
}

function SetBlendingSourceNode() {
	this.addInput("Blending source", "number")
}
SetBlendingSourceNode.title_color = NodesHelper.colours.cornsilk[0]
SetBlendingSourceNode.title_color1 = NodesHelper.colours.cornsilk[1]
SetBlendingSourceNode.title_color2 = NodesHelper.colours.cornsilk[2]
SetBlendingSourceNode.title_text_color = NodesHelper.title_colours.white
SetBlendingSourceNode.title = "Blend Source"
SetBlendingSourceNode.prototype.onExecute = function() {
	var m = this.graph.extra.material
	var bs = this.getInputData(0)

	if (m !== undefined && bs !== undefined) {
		m.blendSrc = bs
	}
}

function SetBlendingSourceAlphaNode() {
	this.addInput("Alpha", "number")
}
SetBlendingSourceAlphaNode.title_color = NodesHelper.colours.cornsilk[0]
SetBlendingSourceAlphaNode.title_color1 = NodesHelper.colours.cornsilk[1]
SetBlendingSourceAlphaNode.title_color2 = NodesHelper.colours.cornsilk[2]
SetBlendingSourceAlphaNode.title_text_color = NodesHelper.title_colours.white
SetBlendingSourceAlphaNode.title = "Blend Source Alpha"
SetBlendingSourceAlphaNode.prototype.onExecute = function() {
	var m = this.graph.extra.material
	var a = this.getInputData(0)

	if (m !== undefined && a !== undefined) {
		m.blendSrcAlpha = a
	}
}

function SetBlendingDestinationNode() {
	this.addInput("Blending Destination", "number")
}
SetBlendingDestinationNode.title_color = NodesHelper.colours.cornsilk[0]
SetBlendingDestinationNode.title_color1 = NodesHelper.colours.cornsilk[1]
SetBlendingDestinationNode.title_color2 = NodesHelper.colours.cornsilk[2]
SetBlendingDestinationNode.title_text_color = NodesHelper.title_colours.white
SetBlendingDestinationNode.title = "Blend Destination"
SetBlendingDestinationNode.prototype.onExecute = function() {
	var m = this.graph.extra.material
	var bdst = this.getInputData(0)

	if (m !== undefined && bdst !== undefined) {
		m.blendDst = bdst
	}
}

function SetBlendingDestinationAlphaNode() {
	this.addInput("Alpha", "number")
}
SetBlendingDestinationAlphaNode.title_color = NodesHelper.colours.cornsilk[0]
SetBlendingDestinationAlphaNode.title_color1 = NodesHelper.colours.cornsilk[1]
SetBlendingDestinationAlphaNode.title_color2 = NodesHelper.colours.cornsilk[2]
SetBlendingDestinationAlphaNode.title_text_color = NodesHelper.title_colours.white
SetBlendingDestinationAlphaNode.title = "Blend Destination Alpha"
SetBlendingDestinationAlphaNode.prototype.onExecute = function() {
	var m = this.graph.extra.material
	var a = this.getInputData(0)

	if (m !== undefined && a !== undefined) {
		m.blendDst = a
	}
}

function SetBlendEquationNode() {
	this.addInput("Equation", "number")
}
SetBlendEquationNode.title_color = NodesHelper.colours.cornsilk[0]
SetBlendEquationNode.title_color1 = NodesHelper.colours.cornsilk[1]
SetBlendEquationNode.title_color2 = NodesHelper.colours.cornsilk[2]
SetBlendEquationNode.title_text_color = NodesHelper.title_colours.white
SetBlendEquationNode.title = "Blend Equation"
SetBlendEquationNode.prototype.onExecute = function() {
	var m = this.graph.extra.material
	var e = this.getInputData(0)

	if (m !== undefined && e !== undefined) {
		m.blendEquation = e
	}
}

function SetBlendEquationAlphaNode() {
	this.addInput("Alpha", "number")
}
SetBlendEquationAlphaNode.title_color = NodesHelper.colours.cornsilk[0]
SetBlendEquationAlphaNode.title_color1 = NodesHelper.colours.cornsilk[1]
SetBlendEquationAlphaNode.title_color2 = NodesHelper.colours.cornsilk[2]
SetBlendEquationAlphaNode.title_text_color = NodesHelper.title_colours.white
SetBlendEquationAlphaNode.title = "Blend Equation Alpha"
SetBlendEquationAlphaNode.prototype.onExecute = function() {
	var m = this.graph.extra.material
	var a = this.getInputData(0)

	if (m !== undefined && a !== undefined) {
		m.blendEquationAlpha = a
	}
}

function SetAlphaTestNode() {
	this.addInput("Alpha Test", "number")
}
SetAlphaTestNode.title_color = NodesHelper.colours.cornsilk[0]
SetAlphaTestNode.title_color1 = NodesHelper.colours.cornsilk[1]
SetAlphaTestNode.title_color2 = NodesHelper.colours.cornsilk[2]
SetAlphaTestNode.title_text_color = NodesHelper.title_colours.white
SetAlphaTestNode.title = "Alpha Test"
SetAlphaTestNode.prototype.onExecute = function() {
	var m = this.graph.extra.material
	var a = this.getInputData(0)

	if (m !== undefined && a !== undefined) {
		m.alphaTest = a
	}
}

function TestDepthNode() {
	this.addInput("Test", "Boolean")
}
TestDepthNode.title_color = NodesHelper.colours.chartreuse[0]
TestDepthNode.title_color1 = NodesHelper.colours.chartreuse[1]
TestDepthNode.title_color2 = NodesHelper.colours.chartreuse[2]
TestDepthNode.title_text_color = NodesHelper.title_colours.white
TestDepthNode.title = "Test Depth"
TestDepthNode.prototype.onExecute = function() {
	var m = this.graph.extra.material
	var t = this.getInputData(0)

	if (m !== undefined && t !== undefined) {
		m.depthTest = t
	}
}

function ShadingNode() {
	this.addInput("Shading", "number")
}
ShadingNode.title_color = NodesHelper.colours.cornsilk[0]
ShadingNode.title_color1 = NodesHelper.colours.cornsilk[1]
ShadingNode.title_color2 = NodesHelper.colours.cornsilk[2]
ShadingNode.title_text_color = NodesHelper.title_colours.white
ShadingNode.title = "Shading"
ShadingNode.prototype.onExecute = function() {
	var m = this.graph.extra.material
	var s = this.getInputData(0)

	if (m !== undefined && s !== undefined) {
		m.shading = s
		m.needsUpdate = true
	}
}

function AffectedByFogNode() {
	this.addInput("Value", "Boolean")
}
AffectedByFogNode.title_color = NodesHelper.colours.chartreuse[0]
AffectedByFogNode.title_color1 = NodesHelper.colours.chartreuse[1]
AffectedByFogNode.title_color2 = NodesHelper.colours.chartreuse[2]
AffectedByFogNode.title_text_color = NodesHelper.title_colours.white
AffectedByFogNode.title = "Affected By Fog"
AffectedByFogNode.prototype.onExecute = function() {
	var m = this.graph.extra.material
	var v = this.getInputData(0)

	if (m !== undefined && v !== undefined) {
		m.fog = v
	}
}

function SetPrecisionNode() {
	this.addInput("Precision", "Text")
}
SetPrecisionNode.title_color = NodesHelper.colours.darkkhaki[0]
SetPrecisionNode.title_color1 = NodesHelper.colours.darkkhaki[1]
SetPrecisionNode.title_color2 = NodesHelper.colours.darkkhaki[2]
SetPrecisionNode.title_text_color = NodesHelper.title_colours.white
SetPrecisionNode.title = "Precision"
SetPrecisionNode.prototype.onExecute = function() {
	var m = this.graph.extra.material
	var p = this.getInputData(0)

	if (m !== undefined && p !== undefined) {
		m.precision = p
	}
}

function ShadowSideNode() {
	this.addInput("Side", "number")
}
ShadowSideNode.title_color = NodesHelper.colours.cornsilk[0]
ShadowSideNode.title_color1 = NodesHelper.colours.cornsilk[1]
ShadowSideNode.title_color2 = NodesHelper.colours.cornsilk[2]
ShadowSideNode.title_text_color = NodesHelper.title_colours.white
ShadowSideNode.title = "Shadow Side"
ShadowSideNode.prototype.onExecute = function() {
	var m = this.graph.extra.material
	var s = this.getInputData(0)

	if (m !== undefined && s !== undefined) {
		m.shadowSide = s
	}
}

function CombineNode() {
	this.addInput("Material", "Material")
	this.addInput("Mode", "number")
}
CombineNode.title_color = NodesHelper.colours.cornsilk[0]
CombineNode.title_color1 = NodesHelper.colours.cornsilk[1]
CombineNode.title_color2 = NodesHelper.colours.cornsilk[2]
CombineNode.title_text_color = NodesHelper.title_colours.white
CombineNode.title = "Combine"
CombineNode.prototype.onExecute = function() {
	var m = this.graph.extra.material
	var mode = this.getInputData(0)

	if (m !== undefined && mode !== undefined) {
		m.combine = mode
	}
}

function MaterialSetSkinningNode() {
	this.addInput("Skinning", "Boolean")
}
MaterialSetSkinningNode.title_color = NodesHelper.colours.chartreuse[0]
MaterialSetSkinningNode.title_color1 = NodesHelper.colours.chartreuse[1]
MaterialSetSkinningNode.title_color2 = NodesHelper.colours.chartreuse[2]
MaterialSetSkinningNode.title_text_color = NodesHelper.title_colours.white
MaterialSetSkinningNode.title = "Skinning"
MaterialSetSkinningNode.prototype.onExecute = function() {
	var m = this.graph.extra.material
	var s = this.getInputData(0)

	if (m !== undefined && s !== undefined) {
		m.skinning = s
	}
}

function MaterialSetRefractionRatioNode() {
	this.addInput("Ratio", "number")
}
MaterialSetRefractionRatioNode.title_color = NodesHelper.colours.chocolate[0]
MaterialSetRefractionRatioNode.title_color1 = NodesHelper.colours.chocolate[1]
MaterialSetRefractionRatioNode.title_color2 = NodesHelper.colours.chocolate[2]
MaterialSetRefractionRatioNode.title_text_color = NodesHelper.title_colours.white
MaterialSetRefractionRatioNode.title = "Refraction Ratio"
MaterialSetRefractionRatioNode.prototype.onExecute = function() {
	var m = this.graph.extra.material
	var r = this.getInputData(0)

	if (m !== undefined && r !== undefined) {
		m.refractionRatio = r
	}
}

function MaterialSetTextureMapNode() {
	this.addInput("Texture", "Texture")
}
MaterialSetTextureMapNode.title_color = NodesHelper.colours.darkorchid[0]
MaterialSetTextureMapNode.title_color1 = NodesHelper.colours.darkorchid[1]
MaterialSetTextureMapNode.title_color2 = NodesHelper.colours.darkorchid[2]
MaterialSetTextureMapNode.title_text_color = NodesHelper.title_colours.white
MaterialSetTextureMapNode.title = "Texture Map"
MaterialSetTextureMapNode.prototype.onExecute = function() {
	var m = this.graph.extra.material
	var t = this.getInputData(0)

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
