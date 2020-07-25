/// Begin play
function BeginPlayNode() {
	var input = this.addOutput("", LiteGraph.EVENT, {...NodesHelper.slots.event, ...NodesHelper.slots.output})
}
BeginPlayNode.title = "Begin Play"
BeginPlayNode.title_color = NodesHelper.titles.event
BeginPlayNode.skip_list = true
BeginPlayNode.collapsable = false
BeginPlayNode.type = "Blocks"
BeginPlayNode.prototype.resizable = false
BeginPlayNode.prototype.ignore_remove = true
BeginPlayNode.prototype.clonable = false
BeginPlayNode.prototype.getMenuOptions = () => {return []}
BeginPlayNode.prototype.onExecute = function() {
	this.triggerSlot(0, "BeginPlay")
}

// Event Tick
function EventTickNode() {
	this.addOutput("", LiteGraph.EVENT, NodesHelper.slots.delegate)
	this.addOutput("", LiteGraph.EVENT, {...NodesHelper.slots.event, ...NodesHelper.slots.output})
}
EventTickNode.title = "Event Tick"
EventTickNode.title_color = NodesHelper.titles.event
EventTickNode.skip_list = true
EventTickNode.collapsable = false
EventTickNode.type = "Blocks"
EventTickNode.prototype.resizable = false
EventTickNode.prototype.ignore_remove = true
EventTickNode.prototype.clonable = false
EventTickNode.prototype.getMenuOptions = () => {return []}
EventTickNode.prototype.onStart = function() {
	this.triggerSlot(1, "EventTickBegun")
}
EventTickNode.prototype.onExecute = function() {
	this.triggerSlot(0, "EventTick")
}

// Event Destroy
function EventDestroyedNode() {
	this.addInput("Target", "Object3D")
	this.addOutput("", LiteGraph.EVENT, {...NodesHelper.slots.event, ...NodesHelper.slots.output})
	this.size = NodesHelper.sizes.small
}
EventDestroyedNode.title = "On Destroyed"
EventDestroyedNode.title_color = NodesHelper.titles.event
EventDestroyedNode.collapsable = false
EventDestroyedNode.type = "Blocks"
EventDestroyedNode.prototype.resizable = false
EventDestroyedNode.prototype.onStart = function() {
	
	var obj = this.getInputData(0)

	if (obj === undefined) {
		obj = this.graph.config.self
	}

	var self = this
	obj.addEventListener("removed", (e) => {
		self.triggerSlot(0, obj.uuid)
	})
}

// Event Dispose
function EventDisposeNode() {
	this.addOutput("", LiteGraph.EVENT, {...NodesHelper.slots.event, ...NodesHelper.slots.output})
	this.size = NodesHelper.sizes.small
}
EventDisposeNode.title = "On Dispose"
EventDisposeNode.title_color = NodesHelper.titles.event
EventDisposeNode.collapsable = false
EventDisposeNode.type = "Blocks"
EventDisposeNode.prototype.resizable = false
EventDisposeNode.prototype.onDispose = function() {
	this.triggerSlot(0)
}

// Test Event
function TestEvent() {
	this.addInput("Event", LiteGraph.ACTION, NodesHelper.slots.event)
}
TestEvent.title = "Test"
TestEvent.prototype.onAction = function(action, data) {
	console.log(action, data)
}

LiteGraph.registerNodeType("Events/BeginPlay", BeginPlayNode)
LiteGraph.registerNodeType("Events/EventTick", EventTickNode)
LiteGraph.registerNodeType("Events/EventDestroyed", EventDestroyedNode)
LiteGraph.registerNodeType("Events/EventDispose", EventDisposeNode)
LiteGraph.registerNodeType("Events/TestEvent", TestEvent)