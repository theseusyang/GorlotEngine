// Begin play
function BeginPlayNode() {
	this.addOutput("", LiteGraph.EVENT, NodesHelper.slots.output.passer)
	this.addOutput("", LiteGraph.EVENT, {...NodesHelper.slots.output.event, ...NodesHelper.slots.output.position})
}
BeginPlayNode.title = "Begin Play"
BeginPlayNode.title_color = NodesHelper.titles.event
BeginPlayNode.skip_list = true
BeginPlayNode.collapsable = false
BeginPlayNode.blocks = "Blocks"
BeginPlayNode.prototype.resizable = false
BeginPlayNode.prototype.ignore_remove = true
BeginPlayNode.prototype.clonable = false
BeginPlayNode.prototype.getMenuOptions = () => {return []}
BeginPlayNode.prototype.onExecute = function() {
	this.triggerSlot(0, "BeginPlay")
	this.triggerSlot(1)
}

// Event Tick
function EventTickNode() {
	this.addOutput("", LiteGraph.EVENT, NodesHelper.slots.passer)
	this.addOutput("", LiteGraph.EVENT, {...NodesHelper.slots.output.event, ...NodesHelper.slots.output.position})
}
EventTickNode.title = "Event Tick"
EventTickNode.title_color = NodesHelper.titles.event
EventTickNode.skip_list = true
EventTickNode.collapsable = false
EventTickNode.blocks = "Blocks"
EventTickNode.prototype.resizable = false
EventTickNode.prototype.ignore_remove = true
EventTickNode.prototype.clonable = false
EventTickNode.prototype.getMenuOptions = () => {return []}
EventTickNode.prototype.onStart = function() {
	this.triggerSlot(1)
}
EventTickNode.prototype.onExecute = function() {
	this.triggerSlot(0, "EventTick")
}

// Event Destroy
function EventDestroyedNode() {
	this.addInput("Target", "object", {...NodesHelper.slots.object})
	this.addOutput("", LiteGraph.EVENT, {...NodesHelper.slots.output.passer, pos: [NodesHelper.slots.position.x1, NodesHelper.slots.output.title_pos["pos"][1]]})
	this.addOutput("", LiteGraph.EVENT, {...NodesHelper.slots.output.event, ...NodesHelper.slots.output.position})
	this.size = NodesHelper.sizes.small
}
EventDestroyedNode.title = "On Destroyed"
EventDestroyedNode.title_color = NodesHelper.titles.event
EventDestroyedNode.collapsable = false
EventDestroyedNode.blocks = "Blocks"
EventDestroyedNode.prototype.resizable = false
EventDestroyedNode.prototype.onStart = function() {
	
	var obj = this.getInputData(0)

	if (obj === undefined) {
		obj = this.graph.config.self
	}

	var self = this
	obj.addEventListener("removed", (e) => {
		self.triggerSlot(0, obj.uuid)
		self.triggerSlot(1)
	})
}

// Event Dispose
function EventDisposeNode() {
	this.addOutput("", LiteGraph.EVENT, {...NodesHelper.slots.output.event, ...NodesHelper.slots.output.position})
	this.size = NodesHelper.sizes.small
}
EventDisposeNode.title = "On Dispose"
EventDisposeNode.title_color = NodesHelper.titles.event
EventDisposeNode.collapsable = false
EventDisposeNode.blocks = "Blocks"
EventDisposeNode.prototype.resizable = false
EventDisposeNode.prototype.onDispose = function() {
	this.triggerSlot(0)
}

// Test Event
function TestEvent() {
	this.addInput("Event", LiteGraph.ACTION, NodesHelper.slots.input.event)
	this.addInput("Input")
}
TestEvent.title = "Test"
TestEvent.blocks = "Blocks"
TestEvent.prototype.onAction = function(action, data) {
	console.log(action, data)
	console.log(this.getInputData(0))
}

LiteGraph.registerNodeType("Events/BeginPlay", BeginPlayNode)
LiteGraph.registerNodeType("Events/EventTick", EventTickNode)
LiteGraph.registerNodeType("Events/EventDestroyed", EventDestroyedNode)
LiteGraph.registerNodeType("Events/EventDispose", EventDisposeNode)
LiteGraph.registerNodeType("Events/TestEvent", TestEvent)