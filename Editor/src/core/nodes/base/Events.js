function BeginPlayNode() {
	var input = this.addOutput("", LiteGraph.EVENT, NodesHelper.outputs.event)
}
BeginPlayNode.title = "Begin Play"
BeginPlayNode.title_color = NodesHelper.titles.event
BeginPlayNode.skip_list = true
BeginPlayNode.prototype.resizable = false
BeginPlayNode.prototype.ignore_remove = true
BeginPlayNode.prototype.onExecute = function() {
	this.triggerSlot(0, "BeginPlay")
}

function EventTickNode() {
	this.addOutput("", LiteGraph.EVENT, NodesHelper.outputs.delegate)
	this.addOutput("", LiteGraph.EVENT, {...NodesHelper.outputs.event, pos: [110, 10]})
}
EventTickNode.title = "Event Tick"
EventTickNode.title_color = NodesHelper.titles.event
EventTickNode.skip_list = true
EventTickNode.prototype.resizable = false
EventTickNode.prototype.ignore_remove = true
EventTickNode.prototype.onStart = function() {
	this.triggerSlot(1, "EventTickBegun")
}
EventTickNode.prototype.onExecute = function() {
	this.triggerSlot(0, "EventTick")
}

function TestEvent() {
	this.addInput("Event", LiteGraph.ACTION, NodesHelper.outputs.event)
}
TestEvent.title = "Test"
TestEvent.prototype.onAction = function(action, data) {
	console.log(action, data)
}

LiteGraph.registerNodeType("Events/BeginPlay", BeginPlayNode)
LiteGraph.registerNodeType("Events/EventTick", EventTickNode)
LiteGraph.registerNodeType("Events/TestEvent", TestEvent)