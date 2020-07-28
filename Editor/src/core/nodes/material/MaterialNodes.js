function MaterialNode() {
	this.addInput("Colour", "color", {...NodesHelper.slots.color, pos: [NodesHelper.slots.position.x, NodesHelper.slots.position.y]})
	this.addInput("Emissive", "color", {...NodesHelper.slots.color, pos: [NodesHelper.slots.position.x, NodesHelper.slots.position.y_second]})
	this.addInput("Reflectivity", "number", {...NodesHelper.slots.number, pos: [NodesHelper.slots.position.x, NodesHelper.slots.position.y_third]})
	this.addInput("Shininess", "number", {...NodesHelper.slots.number, pos: [NodesHelper.slots.position.x, NodesHelper.slots.position.y_fourth]})
	this.addInput("Specular", "color", {...NodesHelper.slots.color, pos: [NodesHelper.slots.position.x, NodesHelper.slots.position.y_fifth]})
	this.addInput("Wireframe", "bool", {...NodesHelper.slots.bool, pos: [NodesHelper.slots.position.x, NodesHelper.slots.position.y_sixth]})
	this.addInput("Transparent", "bool", {...NodesHelper.slots.bool, pos: [NodesHelper.slots.position.x, NodesHelper.slots.position.y_seventh]})
	this.addInput("Opacity", "number", {...NodesHelper.slots.number, pos: [NodesHelper.slots.position.x, NodesHelper.slots.position.y_eighth]})
	this.addInput("Affected By Fog", "bool", {...NodesHelper.slots.bool, pos: [NodesHelper.slots.position.x, NodesHelper.slots.position.y_ninth]})

	this.serialize_widgets = true

	this.properties = {
		reflectivity: 1,
		shininess: 30,
		wireframe: false,
		depthwrite: false,
		transparent: false,
		opacity: 1,
		abf: true
	}

	var self = this

	this.widget1 = this.addWidget("slider", "Reflectivity", this.properties.reflectivity, (v) => {self.properties.reflectivity = v}, {value: this.properties.reflectivity, min: 0, max: 1, text: "R"})
	this.widget2 = this.addWidget("slider", "Shininess", this.properties.shininess, (v) => {self.properties.shininess = v}, {value: this.properties.shininess, min: 0, max: 100, text: "S"})

	this.addWidget("toggle", "Wireframe", this.properties.wireframe, "wireframe")
	this.addWidget("toggle", "Depth Write", this.properties.depthwrite, "depthwrite")
	this.addWidget("toggle", "Transparent", this.properties.transparent, "transparent")

	this.widget3 = this.addWidget("slider", "Opacity", this.properties.opacity, (v) => {self.properties.opacity}, {value: this.properties.opacity, min: 0, max: 1})

	this.addWidget("toggle", "Affected By Fog", this.properties.abf, "abf")
}
MaterialNode.title = "Material"
MaterialNode.title_color = NodesHelper.titles.color
MaterialNode.collapsable = false
MaterialNode.skip_list = true
MaterialNode.prototype.resizable = false
MaterialNode.prototype.onPropertyChanged = function(n, v) {
	if (this.graph && this.graph.onNodeConnectionChange) {
		this.graph.onNodeConnectionChange()
	}

	if (n === "reflectivity") {
		if (this.widget1 !== undefined) {
			this.widget1.value = v
		}
	} else if (n === "shininess") {
		if (this.widget2 !== undefined) {
			this.widget2.value = v
		}
	} else if (n === "opacity") {
		if (this.widget3 !== undefined) {
			this.widget3.value = v
		}
	}
}
MaterialNode.prototype.onExecute = function() {
	if (this.graph.extra !== undefined) {
		var mat = this.graph.extra.material
		mat.nodes
	}

	if (mat !== undefined) {
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

		if (c !== undefined)
			mat.color = c

		if (e !== undefined)
			mat.emissive = e

		if (r !== undefined)
			mat.reflectivity = r
		else
			mat.reflectivity = this.properties.reflectivity

		if (s !== undefined)
			mat.shininess = s
		else
			mat.shininess = this.properties.shininess

		if (s1 !== undefined)
			mat.specular = s1

		if (w !== undefined)
			mat.wireframe = w
		else
			mat.wireframe = this.properties.wireframe

		if (dw !== undefined)
			mat.depthWrite = dw
		else
			mat.depthWrite = this.properties.depthwrite

		if (tr !== undefined)
			mat.transparent = tr
		else
			mat.transparent = this.properties.transparent

		if (op !== undefined)
			mat.opacity = op
		else
			mat.opacity = this.properties.opacity

		if (abf !== undefined)
			mat.fog = abf
		else
			mat.fog = this.properties.abf
	}
}

function registerMaterialNodes() {
	LiteGraph.registerNodeType("Material/Material", MaterialNode)
}