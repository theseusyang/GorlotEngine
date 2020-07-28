function ThisNode() {
	this.addOutput("", LiteGraph.EVENT, {...NodesHelper.slots.output.passer, pos: [NodesHelper.slots.position.x1-20, NodesHelper.slots.output.title_pos["pos"][1]]})
	this.addOutput("", LiteGraph.EVENT, {...NodesHelper.slots.output.event, pos: [NodesHelper.slots.position.x1-20, NodesHelper.slots.position["y"]]})
	this.addOutput("This", "object", {...NodesHelper.slots.object, pos: [NodesHelper.slots.position.x1-20, NodesHelper.slots.position["y_second"]]})
	this.size = [NodesHelper.sizes.small[0]-20, NodesHelper.sizes.small[1]+20]
}
ThisNode.title = "This"
ThisNode.title_color = NodesHelper.titles.object
ThisNode.collapsable = true
ThisNode.blocks = "Blocks"
ThisNode.prototype.resizable = false
ThisNode.prototype.getSlotMenuOptions = NodesHelper.getSlotMenuOptions
ThisNode.prototype.onStart = function() {
	this.setOutputData(0, this.graph.config.self)
	this.setOutputData(1, this.graph.config.self)
	this.setOutputData(2, this.graph.config.self)

	this.triggerSlot(0, this.graph.config.self)
	this.triggerSlot(1)
}

function GetPositionNode() {
	this.addInput("", LiteGraph.ACTION, NodesHelper.slots.input.event)
	this.addInput("Target", "object", {...NodesHelper.slots.object, pos: [NodesHelper.slots.position.x, NodesHelper.slots.position["y_second"]]})

	this.addOutput("", LiteGraph.EVENT, {...NodesHelper.slots.output.passer, pos: [NodesHelper.slots.position.x1+60, NodesHelper.slots.output.title_pos["pos"][1]]})
	this.addOutput("", LiteGraph.EVENT, {...NodesHelper.slots.output.event, pos: [NodesHelper.slots.position.x1+60, NodesHelper.slots.position.y]})
	this.addOutput("Position", "vector", {...NodesHelper.slots.vector, pos: [NodesHelper.slots.position.x1+60, NodesHelper.slots.position.y_second]})

	this.size = [NodesHelper.sizes.medium[0], NodesHelper.sizes.medium[1]]
}
GetPositionNode.title = "Get Position"
GetPositionNode.title_color = NodesHelper.titles.object
GetPositionNode.collapsable = true
GetPositionNode.blocks = "Blocks"
GetPositionNode.prototype.resizable = false
GetPositionNode.prototype.getSlotMenuOptions = NodesHelper.getSlotMenuOptions
GetPositionNode.prototype.onAction = function(action, data) {
	var target = this.getInputData(0)

	if (target === undefined && (data !== undefined && data instanceof THREE.Object3D)) 
		target = data

	if (target === undefined) 
		target = this.graph.config.self

	var pos = target.position

	this.setOutputData(0, pos)
	this.setOutputData(1, pos)
	this.setOutputData(2, pos)

	this.triggerSlot(0, pos)
	this.triggerSlot(1)
}

LiteGraph.registerNodeType("Objects/This", ThisNode)
LiteGraph.registerNodeType("Objects/GetPosition", GetPositionNode)