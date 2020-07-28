function VariableNode() {
	this.addProperty("name", "myvar")

	this.addInput("", LiteGraph.EVENT, NodesHelper.slots.input.event)

	this.addInput("Value", "", {...NodesHelper.slots.variable, pos: [NodesHelper.slots.position.x, NodesHelper.slots.position.y_second]})
	this.name_widget = this.addWidget("string", "", this.properties.name, "name")
	this.name_widget.width = 100

	this.size[0] = 100
}
VariableNode.title = "Variable"
VariableNode.title_color = NodesHelper.titles.base
VariableNode.collapsable = true
VariableNode.blocks = "Blocks"
VariableNode.prototype.resizable = false
VariableNode.prototype.onAction = function(action, data) {
	var value = this.getInputData(0)
	var name = this.properties.name

	if (name === "")
		name = "myvar"

	if (value === value && (data !== undefined))
		value = data

	if (value === undefined)
		value = this.properties.name

	if (this.graph !== undefined)
		this.graph.extra[name] = value
}

LiteGraph.registerNodeType("Base/Variable", VariableNode)