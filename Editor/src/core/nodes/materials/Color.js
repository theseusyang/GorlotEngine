function ColourNode() {
	this.addInput("Red", "number")
	this.addInput("Green", "number")
	this.addInput("Blue", "number")

	this.addOutput("Colour", "Color")

	this.setProperty("r", 0)
	this.setProperty("g", 0)
	this.setProperty("b", 0)

	this.widget_r = this.addWidget("number", "Red", 0, "r")
	this.widget_g = this.addWidget("number", "Green", 0, "g")
	this.widget_b = this.addWidget("number", "Blue", 0, "b")
}
ColourNode.title_color = NodesHelper.colours.chocolate[0]
ColourNode.title_color1 = NodesHelper.colours.chocolate[1]
ColourNode.title_color2 = NodesHelper.colours.chocolate[1]
ColourNode.title_text_color = NodesHelper.title_colours.white
ColourNode.title = "Colour"
ColourNode.prototype.onExecute = function() {
	var r = this.getInputData(0)
	var g = this.getInputData(1)
	var b = this.getInputData(2)

	if (r === undefined) {
		r = parseInt(this.properties["r"])
	}
	if (g === undefined) {
		g = parseInt(this.properties["g"])
	}
	if (b === undefined) {
		b = parseInt(this.properties["b"])
	}
	this.setOutputData(0, new THREE.Color(`rgb(${r},${g},${b})`))
}
ColourNode.prototype.onPropertyChanged = function() {
	if (this.graph && this.graph.onNodeConnectionChange) {
       this.graph.onNodeConnectionChange()
    }
}

function ColourGetRedNode() {
	this.addInput("Colour", "Color")
	this.addOutput("Red", "number")
}
ColourGetRedNode.title_color = NodesHelper.colours.cadet[0]
ColourGetRedNode.title_color1 = NodesHelper.colours.cadet[1]
ColourGetRedNode.title_color2 = NodesHelper.colours.cadet[1]
ColourGetRedNode.title_text_color = NodesHelper.title_colours.white
ColourGetRedNode.title = "Get Red"
ColourGetRedNode.prototype.onExecute = function() {
	var c = this.getInputData(0)

	if (c !== undefined) {
		this.setOutputData(0, c.r)
	}
}

function ColourGetGreenNode() {
	this.addInput("Colour", "Color")
	this.addOutput("Green", "number")
}
ColourGetGreenNode.title_color = NodesHelper.colours.cadet[0]
ColourGetGreenNode.title_color1 = NodesHelper.colours.cadet[1]
ColourGetGreenNode.title_color2 = NodesHelper.colours.cadet[1]
ColourGetGreenNode.title_text_color = NodesHelper.title_colours.white
ColourGetGreenNode.title = "Get Green"
ColourGetGreenNode.prototype.onExecute = function() {
	var c = this.getInputData(0)

	if (c !== undefined) {
		this.setOutputData(0, c.g)
	}
}

function ColourGetBlueNode() {
	this.addInput("Colour", "Color")
	this.addOutput("Blue", "number")
}
ColourGetBlueNode.title_color = NodesHelper.colours.cadet[0]
ColourGetBlueNode.title_color1 = NodesHelper.colours.cadet[1]
ColourGetBlueNode.title_color2 = NodesHelper.colours.cadet[1]
ColourGetBlueNode.title_text_color = NodesHelper.title_colours.white
ColourGetBlueNode.title = "Get Blue"
ColourGetBlueNode.prototype.onExecute = function() {
	var c = this.getInputData(0)

	if (c !== undefined) {
		this.setOutputData(0, c.b)
	}
}

function ColourAddNode() {
	this.addInput("Input", "Color")
	this.addInput("Colour", "Color")
}
ColourAddNode.title_color = NodesHelper.colours.cadet[0]
ColourAddNode.title_color1 = NodesHelper.colours.cadet[1]
ColourAddNode.title_color2 = NodesHelper.colours.cadet[1]
ColourAddNode.title_text_color = NodesHelper.title_colours.white
ColourAddNode.title = "Add"
ColourAddNode.prototype.onExecute = function() {
	var i = this.getInputData(0)
	var c = this.getInputData(1)

	if (i !== undefined && c !== undefined) {
		i.add(c)
	}
}

function ColourAddColoursNode() {
	this.addInput("Input", "Color")
	this.addInput("Colour 1", "Color")
	this.addInput("Colour 2", "Color")
}
ColourAddColoursNode.title_color = NodesHelper.colours.cadet[0]
ColourAddColoursNode.title_color1 = NodesHelper.colours.cadet[1]
ColourAddColoursNode.title_color2 = NodesHelper.colours.cadet[1]
ColourAddColoursNode.title_text_color = NodesHelper.title_colours.white
ColourAddColoursNode.title = "Add Colours"
ColourAddColoursNode.prototype.onExecute = function() {
	var i = this.getInputData(0)
	var c1 = this.getInputData(1)
	var c2 = this.getInputData(2)

	if (i !== undefined && c1 !== undefined && c2 !== undefined) {
		i.addColors(c1, c2)
	}
}

function ColourAddScalarNode() {
	this.addInput("Input", "Color")
	this.addInput("Scalar", "number")

	this.setProperty("scalar", 0)
	this.widget = this.addWidget("number", "Scalar", 0, "scalar")
}
ColourAddScalarNode.title_color = NodesHelper.colours.chocolate[0]
ColourAddScalarNode.title_color1 = NodesHelper.colours.chocolate[1]
ColourAddScalarNode.title_color2 = NodesHelper.colours.chocolate[1]
ColourAddScalarNode.title_text_color = NodesHelper.title_colours.white
ColourAddScalarNode.title = "Add Scalar"
ColourAddScalarNode.prototype.onExecute = function() {
	var i = this.getInputData(0)
	var s = this.getInputData(1)

	if (s === undefined) {
		s = parseInt(this.properties["scalar"])
	}

	if (i !== undefined) {
		i.addScalar(s)
	}
}
ColourAddScalarNode.prototype.onPropertyChanged = function() {
	if (this.graph && this.graph.onNodeConnectionChange) {
       this.graph.onNodeConnectionChange()
    }
}

function ColourCloneNode() {
	this.addInput("Colour", "Color")
	this.addOutput("Colour", "Color")
}
ColourCloneNode.title_color = NodesHelper.colours.cadet[0]
ColourCloneNode.title_color1 = NodesHelper.colours.cadet[1]
ColourCloneNode.title_color2 = NodesHelper.colours.cadet[1]
ColourCloneNode.title_text_color = NodesHelper.title_colours.white
ColourCloneNode.title = "Clone"
ColourCloneNode.prototype.onExecute = function() {
	var c = this.getInputData(0)
	if (c !== undefined) {
		this.setOutputData(0, c.clone())
	}
}

function ColourCopyNode() {
	this.addInput("Input", "Color")
	this.addInput("Colour", "Color")
}
ColourCopyNode.title_color = NodesHelper.colours.cadet[0]
ColourCopyNode.title_color1 = NodesHelper.colours.cadet[1]
ColourCopyNode.title_color2 = NodesHelper.colours.cadet[1]
ColourCopyNode.title_text_color = NodesHelper.title_colours.white
ColourCopyNode.title = "Copy"
ColourCopyNode.prototype.onExecute = function() {
	var i = this.getInputData(0)
	var c = this.getInputData(1)

	if (i !== undefined && c !== undefined) {
		i.copy(c)
	}
}

function ColourEqualsNode() {
	this.addInput("Input", "Color")
	this.addInput("Colour", "Color")
	this.addOutput("Equals", "Boolean")
}
ColourEqualsNode.title_color = NodesHelper.colours.cadet[0]
ColourEqualsNode.title_color1 = NodesHelper.colours.cadet[1]
ColourEqualsNode.title_color2 = NodesHelper.colours.cadet[1]
ColourEqualsNode.title_text_color = NodesHelper.title_colours.white
ColourEqualsNode.title = "Equals"
ColourEqualsNode.prototype.onExecute = function() {
	var i = this.getInputData(0)
	var c = this.getInputData(1)

	if (i !== undefined && c !== undefined) {
		this.setOutputData(0, i.equals(c))
	}
}

function ColourMultiplyNode() {
	this.addInput("Input", "Color")
	this.addInput("Colour", "Color")
}
ColourMultiplyNode.title_color = NodesHelper.colours.cadet[0]
ColourMultiplyNode.title_color1 = NodesHelper.colours.cadet[1]
ColourMultiplyNode.title_color2 = NodesHelper.colours.cadet[1]
ColourMultiplyNode.title_text_color = NodesHelper.title_colours.white
ColourMultiplyNode.title = "Multiply"
ColourMultiplyNode.prototype.onExecute = function() {
	var i = this.getInputData(0)
	var c = this.getInputData(1)

	if (i !== undefined && c !== undefined) {
		i.multiply(c)
	}
}

function ColourMultiplyScalarNode() {
	this.addInput("Input", "Color")
	this.addInput("Scalar", "number")

	this.setProperty("scalar", 0)
	this.widget = this.addWidget("number", "Scalar", 0, "scalar")
}
ColourMultiplyScalarNode.title_color = NodesHelper.colours.chocolate[0]
ColourMultiplyScalarNode.title_color1 = NodesHelper.colours.chocolate[1]
ColourMultiplyScalarNode.title_color2 = NodesHelper.colours.chocolate[1]
ColourMultiplyScalarNode.title_text_color = NodesHelper.title_colours.white
ColourMultiplyScalarNode.title = "Multiply Scalar"
ColourMultiplyScalarNode.prototype.onExecute = function() {
	var i = this.getInputData(0)
	var s = this.getInputData(1)

	if (s === undefined) {
		s = parseInt(this.properties["scalar"])
	}

	if (i !== undefined) {
		i.multiplyScalar(s)
	}
}
ColourMultiplyScalarNode.prototype.onPropertyChanged = function() {
	if (this.graph && this.graph.onNodeConnectionChange) {
       this.graph.onNodeConnectionChange()
    }
}

function ColourSetHSLNode() {
	this.addInput("Colour", "Color")
	this.addInput("H", "number")
	this.addInput("S", "number")
	this.addInput("L", "number")

	this.setProperty("h", 0)
	this.setProperty("s", 0)
	this.setProperty("l", 0)
	this.widget_h = this.addWidget("number", "H", 0, "h")
	this.widget_s = this.addWidget("number", "S", 0, "s")
	this.widget_ = this.addWidget("number", "L", 0, "l")
}
ColourSetHSLNode.title_color = NodesHelper.colours.chocolate[0]
ColourSetHSLNode.title_color1 = NodesHelper.colours.chocolate[1]
ColourSetHSLNode.title_color2 = NodesHelper.colours.chocolate[1]
ColourSetHSLNode.title_text_color = NodesHelper.title_colours.white
ColourSetHSLNode.title = "Set HSL"
ColourSetHSLNode.prototype.onExecute = function() {
	var c = this.getInputData(0)
	if (c !== undefined) {
		var h = this.getInputData(1)
		var s = this.getInputData(2)
		var l = this.getInputData(3)

		if (h === undefined) {
			h = this.properties["h"]
		}
		if (s === undefined) {
			s = this.properties["s"]
		}
		if (l === undefined) {
			l = this.properties["l"]
		}

		c.setHSL(h, s, l)
	}
}
ColourSetHSLNode.prototype.onPropertyChanged = function() {
	if (this.graph && this.graph.onNodeConnectionChange) {
       this.graph.onNodeConnectionChange()
    }
}

function ColourSetRGBNode() {
	this.addInput("Colour", "Color")
	this.addInput("R", "number")
	this.addInput("G", "number")
	this.addInput("B", "number")

	this.setProperty("r", 0)
	this.setProperty("g", 0)
	this.setProperty("b", 0)

	this.widget_r = this.addWidget("number", "Red", 0, "r")
	this.widget_g = this.addWidget("number", "Green", 0, "g")
	this.widget_b = this.addWidget("number", "Blue", 0, "b")
}
ColourSetRGBNode.title_color = NodesHelper.colours.chocolate[0]
ColourSetRGBNode.title_color1 = NodesHelper.colours.chocolate[1]
ColourSetRGBNode.title_color2 = NodesHelper.colours.chocolate[1]
ColourSetRGBNode.title_text_color = NodesHelper.title_colours.white
ColourSetRGBNode.title = "Set RGB"
ColourSetRGBNode.prototype.onExecute = function() {
	var c = this.getInputData(0)
	if (c !== undefined) {
		var r = this.getInputData(1)
		var g = this.getInputData(2)
		var b = this.getInputData(3)

		if (r === undefined) {
			r = this.properties["r"]
		}
		if (g === undefined) {
			g = this.properties["g"]
		}
		if (b === undefined) {
			b = this.properties["b"]
		}
		c.setRGB(r, g, b)
	}
}
ColourSetRGBNode.prototype.onPropertyChanged = function() {
	if (this.graph && this.graph.onNodeConnectionChange) {
       this.graph.onNodeConnectionChange()
    }
}

function ColourSetScalarNode() {
	this.addInput("Input", "Color")
	this.addInput("Scalar", "number")

	this.setProperty("scalar", 0)
	this.widget = this.addWidget("number", "Scalar", 0, "scalar")
}
ColourSetScalarNode.title_color = NodesHelper.colours.chocolate[0]
ColourSetScalarNode.title_color1 = NodesHelper.colours.chocolate[1]
ColourSetScalarNode.title_color2 = NodesHelper.colours.chocolate[1]
ColourSetScalarNode.title_text_color = NodesHelper.title_colours.white
ColourSetScalarNode.title = "Set Scalar"
ColourSetScalarNode.prototype.onExecute = function() {
	var i = this.getInputData(0)
	var s = this.getInputData(1)

	if (s === undefined) {
		s = this.properties["scalar"]
	}

	if (i !== undefined) {
		i.setScalar(s)
	}
}
ColourSetScalarNode.prototype.onPropertyChanged = function() {
	if (this.graph && this.graph.onNodeConnectionChange) {
       this.graph.onNodeConnectionChange()
    }
}

function ColourSetColourNameNode() {
	this.addInput("Input", "Color")
	this.addInput("Name", "Text")

	this.setProperty("name", "black")
	this.addWidget("text", "Name", "black", "name")
}
ColourSetColourNameNode.title_color = NodesHelper.colours.darkkhaki[0]
ColourSetColourNameNode.title_color1 = NodesHelper.colours.darkkhaki[1]
ColourSetColourNameNode.title_color2 = NodesHelper.colours.darkkhaki[1]
ColourSetColourNameNode.title_text_color = NodesHelper.title_colours.white
ColourSetColourNameNode.title = "Set Colour Name"
ColourSetColourNameNode.prototype.onExecute = function() {
	var i = this.getInputData(0)
	var n = this.getInputData(1)

	if (n === undefined) {
		n = this.properties["name"]
	}

	if (i !== undefined) {
		i.setColorName(n)
	}
}

function ColourSubNode() {
	this.addInput("Input", "Color")
	this.addInput("Colour", "Color")
}
ColourSubNode.title_color = NodesHelper.colours.chocolate[0]
ColourSubNode.title_color1 = NodesHelper.colours.chocolate[1]
ColourSubNode.title_color2 = NodesHelper.colours.chocolate[1]
ColourSubNode.title_text_color = NodesHelper.title_colours.white
ColourSubNode.title = "Sub"
ColourSubNode.prototype.onExecute = function() {
	var i = this.getInputData(0)
	var c = this.getInputData(1)

	if (i !== undefined && c !== undefined) {
		i.sub(c)
	}
}

function registerMaterialNodeColor() {
	LiteGraph.registerNodeType("Colour/Colour", ColourNode)
	LiteGraph.registerNodeType("Colour/ColourGetRed", ColourGetRedNode)
	LiteGraph.registerNodeType("Colour/ColourGetGreen", ColourGetGreenNode)
	LiteGraph.registerNodeType("Colour/ColourGetBlue", ColourGetBlueNode)
	LiteGraph.registerNodeType("Colour/ColourAdd", ColourAddNode)
	LiteGraph.registerNodeType("Colour/ColourAddColours", ColourAddColoursNode)
	LiteGraph.registerNodeType("Colour/ColourAddScalar", ColourAddScalarNode)
	LiteGraph.registerNodeType("Colour/ColourClone", ColourCloneNode)
	LiteGraph.registerNodeType("Colour/ColourCopy", ColourCopyNode)
	LiteGraph.registerNodeType("Colour/ColourEquals", ColourEqualsNode)
	LiteGraph.registerNodeType("Colour/ColourMultiply", ColourMultiplyNode)
	LiteGraph.registerNodeType("Colour/ColourMultiplyScalar", ColourMultiplyScalarNode)
	LiteGraph.registerNodeType("Colour/ColourSetHSL", ColourSetHSLNode)
	LiteGraph.registerNodeType("Colour/ColourSetRGB", ColourSetRGBNode)
	LiteGraph.registerNodeType("Colour/ColourSetScalar", ColourSetScalarNode)
	LiteGraph.registerNodeType("Colour/ColourSetColourName", ColourSetColourNameNode)
	LiteGraph.registerNodeType("Colour/ColourSub", ColourSubNode)
}