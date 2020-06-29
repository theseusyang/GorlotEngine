// Subgraph
function Subgraph() {
    var self = this
    this.size = [140, 80]
    this.properties = {type: "if"}
    this.addInput("Condition", "Boolean")
    // Create inner graph
    this.subgraph = new LiteGraph.LGraph()
    this.subgraph._subgraph_node = this
    this.subgraph._is_subgraph = true
    this.subgraph.onTrigger = this.onSubgraphTrigger.bind(this)
    // Nodes input node added inside
    this.subgraph.onInputAdded = this.onSubgraphNewInput.bind(this)
    this.subgraph.onInputRenamed = this.onSubgraphRenamedInput.bind(this)
    this.subgraph.onInputTypeChanged = this.onSubgraphTypeChangeInput.bind(this)
    this.subgraph.onInputRemoved = this.onSubgraphRemovedInput.bind(this)
    this.subgraph.onOutputAdded = this.onSubgraphNewOutput.bind(this)
    this.subgraph.onOutputRenamed = this.onSubgraphRenamedOutput.bind(this)
    this.subgraph.onOutputTypeChanged = this.onSubgraphTypeChangeOutput.bind(this)
    this.subgraph.onOutputRemoved = this.onSubgraphRemovedOutput.bind(this)
}
Subgraph.title = "If"
Subgraph.desc = "Checks for a condition (Executed in a SubGraph)"
Subgraph.title_color = "#334"
//Subgraph.prototype.onGetInputs = function() {
//    return [["enabled","boolean"]]
//}
Subgraph.prototype.onDrawTitle = function(ctx) {
    if (this.flags.collapsed) {
        return
    }
    ctx.fillStyle = "#555"
    var w = LiteGraph.NODE_TITLE_HEIGHT
    var x = this.size[0] - w
    ctx.fillRect(x, -w, w, w)
    ctx.fillStyle = "#333"
    ctx.beginPath()
    ctx.moveTo(x + w * 0.2, -w * 0.6)
    ctx.lineTo(x + w * 0.8, -w * 0.6)
    ctx.lineTo(x + w * 0.5, -w * 0.3)
    ctx.fill()
}
Subgraph.prototype.onDblClick = function(e, pos, graphcanvas) {
    var self = this
    setTimeout(function() {
        graphcanvas.openSubgraph(self.subgraph)
    }, 10)
}
Subgraph.prototype.onMouseDown = function(e, pos, graphcanvas) {
    if (!this.flags.collapsed && pos[0] > this.size[0] - LiteGraph.NODE_TITLE_HEIGHT && pos[1] < 0) {
        var self = this
        setTimeout(function() {
            graphcanvas.openSubgraph(self.subgraph)
        }, 10)
    }
}
Subgraph.prototype.onAction = function(action, param) {
    this.subgraph.onAction(action, param)
}
Subgraph.prototype.onExecute = function() {
    this.enabled = this.getInputData(0)
    if (!this.enabled && this.properties.type === "if") {
        return
    } else if (this.enabled && this.properties.type === "ifnot") {
        return
    }
    // Sends input to subgraph global inputs
    if (this.inputs) {
        for(var i = 0; i < this.inputs.length; i++) {
            var input = this.inputs[i]
            var value = this.getInputData(i)
            this.subgraph.setInputData(input.name, value)
        }
    }
    // Execute. TODO: Rewrite this and put here the blueprints' compile system
    this.subgraph.runStep()
    // Sends Subgraph global outputs to outputs
    if (this.outputs) {
        for(var i = 0; i < this.outputs.length; i++) {
            var output = this.outputs[i]
            var value = this.subgraph.getOutputData(output.name)
            this.setOutputData(i, value)
        }
    }
}
Subgraph.prototype.sendEventToAllNodes = function(eventname, param, mode) {
    if (this.enabled) {
        this.subgraph.sendEventToAllNodes(eventname, param, mode)
    }
}
// ** INPUTS *****
Subgraph.prototype.onSubgraphTrigger = function(event, param) {
    var slot = this.findOutputSlot(event)
    if (slot !== 1) {
        this.triggerSlot(slot)
    }
}
Subgraph.prototype.onSubgraphNewInput = function(name, type) {
    var slot = this.findInputSlot(name)
    if (slot === -1) {
        // Add input to the node
        this.addInput(name, type)
    }
}
Subgraph.prototype.onSubgraphRenamedInput = function(oldname, name) {
    var slot = this.findInputSlot(oldname)
    if (slot === -1) {
        return
    }
    var info = this.getInputInfo(slot)
    info.name
}
Subgraph.prototype.onSubgraphTypeChangeInput = function(name, type) {
    var slot = this.findInputSlot(name)
    if (slot === -1) {
        return
    }
    var info = this.getInputInfo(slot)
    info.type = type
}
Subgraph.prototype.onSubgraphRemovedInput = function(name) {
    var slot = this.findInputSlot(name)
    if (slot === -1) {
        return
    }
    this.removeInput(slot)
}
// ** OUTPUTS *****
Subgraph.prototype.onSubgraphNewOutput = function(name, type) {
    var slot = this.findOutputSlot(name)
    if (slot === -1) {
        this.addOutput(name, type)
    }
}
Subgraph.prototype.onSubgraphRenamedOutput = function(oldname, name) {
    var slot = this.findOutputSlot(oldname)
    if (slot === -1) {
        return
    }
    var info = this.getOutputInfo(slot)
    info.name = name
}
Subgraph.prototype.onSubgraphTypeChangeOutput = function(name, type) {
    var slot = this.findOutputSlot(name)
    if (slot === -1) {
        return
    }
    var info = this.getOutputInfo(slot)
    info.type = type
}
Subgraph.prototype.onSubgraphRemovedOutput = function(name) {
    var slot = this.findInputSlot(name)
    if (slot === -1) {
        return
    }
    this.removeOutput(slot)
}
// *******
Subgraph.prototype.getExtraMenuOptions = function(graphcanvas) {
    var self = this
    return [
        {
            content: "Open",
            callback: function() {
                graphcanvas.openSubgraph(self.subgraph)
            }
        }
    ]
}
Subgraph.prototype.onResize = function(size) {
    size[1] += 20
}
Subgraph.prototype.serialize = function() {
    var data = LiteGraph.LGraphNode.prototype.serialize.call(this)
    data.subgraph = this.subgraph.serialize()
    return data
}
Subgraph.prototype.clone = function() {
    var node = LiteGraph.createNode(this.type)
    var data = this.serialize()
    delete data["id"]
    delete data["inputs"]
    delete data["outputs"]
    node.configure(data)
    return node
}
Subgraph.prototype.buildFromNodes = function(nodes) {
    // TODO
}

function IfEqualsNode() {
	this.addInput("Input 1")
	this.addInput("Input 2")

	this.addOutput("Output", "Boolean")
}
IfEqualsNode.title = "Equals"
IfEqualsNode.prototype.onExecute = function() {
	var i1 = this.getInputData(0)
	var i2 = this.getInputData(1)

	if(i1 !== undefined && i2 !== undefined) {
		this.setOutputData(0, i1 === i2)
	}
}

function IfNotEqualsNode() {
	this.addInput("Input 1")
	this.addInput("Input 2")

	this.addOutput("Output", "Boolean")
}
IfNotEqualsNode.title = "Not Equals"
IfNotEqualsNode.prototype.onExecute = function() {
	var i1 = this.getInputData(0)
	var i2 = this.getInputData(1)

	if (i1 !== undefined && i2 !== undefined) {
		this.setOutputData(0, i1 !== i2)
	}
}

function IfGreaterThanNode() {
	this.addInput("Input")
	this.addInput("Value", "number")
	this.addOutput("Output", "Boolean")
}
IfGreaterThanNode.title = "Greater Than"
IfGreaterThanNode.prototype.onExecute = function() {
	var i = this.getInputData(0)
	var v = this.getInputData(1)

	if (i !== undefined && v !== undefined) {
		this.setOutputData(0, i > v)
	}
}

function IfLessThanNode() {
	this.addInput("Input")
	this.addInput("Value", "number")
	this.addOutput("Output", "Boolean")
}
IfLessThanNode.title = "Less Than"
IfLessThanNode.prototype.onExecute = function() {
	var i = this.getInputData(0)
	var v = this.getInputData(1)

	if (i !== undefined && v !== undefined) {
		this.setOutputData(0, i < v)
	}
}

function registerLogicNodes() {
	LiteGraph.registerNodeType("Logic/Subgraph", Subgraph)
	LiteGraph.registerNodeType("Logic/IfEquals", IfEqualsNode)
	LiteGraph.registerNodeType("Logic/IfNotEquals", IfNotEqualsNode)
	LiteGraph.registerNodeType("Logic/IfGreaterThan", IfGreaterThanNode)
	LiteGraph.registerNodeType("Logic/IfLessThan", IfLessThanNode)
}