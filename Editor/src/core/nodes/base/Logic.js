// Subgraph
function Subgraph() {
    var self = this
    this.size = [140, 80]
    this.properties = {type: "if", types: "if;ifnot;initialization;loop"}
    this.values = this.properties.types.split(";")

    this.widget = this.addWidget("combo", "Type", this.properties.type, (v) => {
        self.properties.type = v
    }, {property: "type", values: this.values})

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
Subgraph.title = "Subgraph"
Subgraph.title_color = "#334"
Subgraph.title_color1 = "#334"
Subgraph.title_color2 = "#334"
Subgraph.title_text_color = NodesHelper.title_colours.white
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
Subgraph.prototype.onAdded = function() {
    this.updateInput("type", this.properties.type)
}
Subgraph.prototype.updateInput = function(n, v) {
    this.addInput("Condition", "Boolean")
}
Subgraph.prototype.onExecute = function() {
    this.input = this.getInputData(0)
    if ((this.input == false) && this.properties.type === "if") {
        return
    } else if (this.input && this.properties.type === "ifnot") {
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
Subgraph.prototype.onDrawBackground = function(ctx, graphcanvas, canvas, pos) {
    if (this.flags.collapsed) {
        return
    }

    var y = this.size[1] - LiteGraph.NODE_TITLE_HEIGHT + 0.5

    // Button
    var over = LiteGraph.isInsideRectangle(pos[0], pos[1], this.pos[0], this.pos[1] + y, this.size[0], LiteGraph.NODE_TITLE_HEIGHT)
    ctx.fillStyle = over ? "#555" : "#222"
    ctx.beginPath()
    ctx.roundRect(0, y, this.size[0] + 1, LiteGraph.NODE_TITLE_HEIGHT, 0, 8)
    ctx.fill()

    // Button
    ctx.textAlign = "center"
    ctx.font = "24px Arial"
    ctx.fillStyle = over ? "#DDD" : "#999"
    ctx.fillText("+", this.size[0] * 0.5, y + 24)
}
Subgraph.prototype.computeSize = function() {
    var num_inputs = this.inputs ? this.inputs.length : 0
    var num_outputs = this.outputs ? this.outputs.length : 0
    return [200, Math.max(num_inputs, num_outputs) * LiteGraph.NODE_SLOT_HEIGHT + LiteGraph.NODE_TITLE_HEIGHT]
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
    // Nodes that connect data between parent graph and subgraph
    var subgraph_inputs = []
    var subgraph_outputs = []

    // Mark inner nodes
    var ids = {}
    var min_x = 0
    var max_x = 0

    for(var i = 0; i < nodes.length; ++i) {
        var node = nodes[i]
        ids[node.id] = node
        min_x = Math.min(node.pos[0], min_x)
        max_x = Math.max(node.pos[0], min_x)
    }

    var last_input_y = 0
    var last_output_y = 0

    for(var i = 0; i < nodes.length; ++i) {
        var node = nodes[i]

        // Check inputs
        if (node.inputs) {
            for(var j = 0; j < node.inputs.length; ++j) {
                var input = node.inputs[j]

                if (!input || !input.link) {
                    continue
                }

                var link = node.graph.links[input.link]

                if (!link) {
                    continue
                }

                if (ids[link.origin_id]) {
                    continue
                }

                this.subgraph.addInput(input.name, input.type)
            }
        }

        // Check outputs
        if (node.outputs) {
            for(var j = 0; j < node.inputs.length; ++j) {
                var output = node.outputs[j]
                
                if (!output || !output.links || !output.links.length) {
                    continue
                }

                var is_external = false

                for(var k = 0; k < output.links.length; k++) {
                    var link = node.graph.links[output.links[k]]
                    if (!link) {
                        continue
                    }
                    if (ids[link.target_id]) {
                        continue
                    }
                    is_external = true
                    break
                }

                if (!is_external) {
                    break
                }
            }
        }
    }

}

function GraphInputNode() {
    this.addOutput("", "number")

    this.name_in_graph = ""
    this.properties = {
        name: "",
        type: "number",
        value: 0
    }

    var self = this

    this.name_widget = this.addWidget("text", "Name", this.properties.name, (v) => {
        if (!v) {
            return
        }
        self.setProperty("name", v)
    })

    // TODO: Replace this with a combo
    this.type_widget = this.addWidget("text", "Type", this.properties.type, (v) => {
        self.setProperty("type", v)
    })

    this.value_widget = this.addWidget("number", "Value", this.properties.value, (v) => {
        self.setProperty("value", v)
    })

    this.widgets_up = true
    this.size = [180, 90]
}
GraphInputNode.title_color = "#334"
GraphInputNode.title_color1 = "#334"
GraphInputNode.title_color2 = "#334"
GraphInputNode.title_text_color = NodesHelper.title_colours.white
GraphInputNode.title = "Input"
GraphInputNode.prototype.onConfigure = function() {
    this.updateType()
}
GraphInputNode.prototype.updateType = function() {
    var type = this.properties.type
    this.type_widget.value = type

    if (this.outputs[0].type !== type) {
        this.outputs[0].type = type
        this.disconnectOutput(0)
    }

    if (type === "number") {
        this.value_widget.type = "number"
        this.value_widget.value = 0
    }
    else if (type === "boolean") {
        this.value_widget.type = "toggle"
        this.value_widget.value = true
    }
    else if (type === "string") {
        this.value_widget.type = "text"
        this.value_widget.value = ""
    }
    else {
        this.value_widget.type = null
        this.value_widget.value = null
    }

    this.properties.value = this.value_widget.value
}
GraphInputNode.prototype.onPropertyChanged = function(name, v) {
    if (name === "name") {
        if (v === "" || v === this.name_in_graph || v === "enabled") {
            return false
        }

        if (this.graph) {
            if (this.name_in_graph) {
                // Already added
                this.graph.renameInput(this.name_in_graph, v)
            } else {
                this.graph.addInput(v, this.properties.type)
            }
        }

        this.name_widget.value = v
        this.name_in_graph = v
    } else if (name === "type") {
        v = v || ""

        if (this.graph) {
            this.graph.changeInputType(this.name_in_graph, v)
        }

        this.updateType(v)
    } else if (name === "value") {

    }
}
GraphInputNode.prototype.getTitle = function() {
    if (this.flags.collapsed) {
        return this.properties.name
    }
    return this.title
}
GraphInputNode.prototype.onAction = function(action, param) {
    if (this.properties.type === LiteGraph.EVENT) {
        this.triggerSlot(0, param)
    }
}
GraphInputNode.prototype.onExecute = function() {
    var name = this.properties.name
    // read from global input
    var data = this.graph.inputs[name]

    if (!data) {
        this.setOutputData(0, this.properties.value)
        return
    }

    this.setOutputData(0, data.value !== undefined ? data.value : this.properties.value)
}
GraphInputNode.prototype.onRemoved = function() {
    if (this.name_in_graph) {
        this.graph.removeInput(this.name_in_graph)
    }
}

function GraphOutput() {
    this.addInput("", "");
    this.name_in_graph = "";
    this.properties = {};
    var that = this;
    Object.defineProperty(this.properties, "name", {
        get: function() {
            return that.name_in_graph;
        },
        set: function(v) {
            if (v == "" || v == that.name_in_graph) {
                return;
            }
            if (that.name_in_graph) {
                //already added
                that.graph.renameOutput(that.name_in_graph, v);
            } else {
                that.graph.addOutput(v, that.properties.type);
            }
            that.name_widget.value = v;
            that.name_in_graph = v;
        },
        enumerable: true
    });
    Object.defineProperty(this.properties, "type", {
        get: function() {
            return that.inputs[0].type;
        },
        set: function(v) {
            if (v == "action" || v == "event") {
                v = LiteGraph.ACTION;
            }
            that.inputs[0].type = v;
            if (that.name_in_graph) {
                //already added
                that.graph.changeOutputType(
                    that.name_in_graph,
                    that.inputs[0].type
                );
            }
            that.type_widget.value = v || "";
        },
        enumerable: true
    });
    this.name_widget = this.addWidget("text","Name",this.properties.name,"name");
    this.type_widget = this.addWidget("text","Type",this.properties.type,"type");
    this.widgets_up = true;
    this.size = [180, 60];
}
GraphOutput.title_color = "#334"
GraphOutput.title_color1 = "#334"
GraphOutput.title_color2 = "#334"
GraphOutput.title_text_color = NodesHelper.title_colours.white
GraphOutput.title = "Output";
GraphOutput.desc = "Output of the graph";
GraphOutput.prototype.onExecute = function() {
    this._value = this.getInputData(0);
    this.graph.setOutputData(this.properties.name, this._value);
};
GraphOutput.prototype.onAction = function(action, param) {
    if (this.properties.type == LiteGraph.ACTION) {
        this.graph.trigger(this.properties.name, param);
    }
};
GraphOutput.prototype.onRemoved = function() {
    if (this.name_in_graph) {
        this.graph.removeOutput(this.name_in_graph);
    }
};
GraphOutput.prototype.getTitle = function() {
    if (this.flags.collapsed) {
        return this.properties.name;
    }
    return this.title;
};

function IfEqualsNode() {
	this.addInput("Input 1")
	this.addInput("Input 2")

	this.addOutput("Output", "Boolean")
}
IfEqualsNode.title_color = NodesHelper.colours.deepskyblue[0]
IfEqualsNode.title_color1 = NodesHelper.colours.deepskyblue[1]
IfEqualsNode.title_color2 = NodesHelper.colours.deepskyblue[2]
IfEqualsNode.title_text_color = NodesHelper.title_colours.white
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
IfNotEqualsNode.title_color = NodesHelper.colours.deepskyblue[0]
IfNotEqualsNode.title_color1 = NodesHelper.colours.deepskyblue[1]
IfNotEqualsNode.title_color2 = NodesHelper.colours.deepskyblue[2]
IfNotEqualsNode.title_text_color = NodesHelper.title_colours.white
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
IfGreaterThanNode.title_color = NodesHelper.colours.deepskyblue[0]
IfGreaterThanNode.title_color1 = NodesHelper.colours.deepskyblue[1]
IfGreaterThanNode.title_color2 = NodesHelper.colours.deepskyblue[2]
IfGreaterThanNode.title_text_color = NodesHelper.title_colours.white
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
IfLessThanNode.title_color = NodesHelper.colours.deepskyblue[0]
IfLessThanNode.title_color1 = NodesHelper.colours.deepskyblue[1]
IfLessThanNode.title_color2 = NodesHelper.colours.deepskyblue[2]
IfLessThanNode.title_text_color = NodesHelper.title_colours.white
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
    LiteGraph.registerNodeType("Logic/GraphInput", GraphInputNode)
	LiteGraph.registerNodeType("Logic/GraphOutput", GraphOutput)
	LiteGraph.registerNodeType("Logic/IfEquals", IfEqualsNode)
	LiteGraph.registerNodeType("Logic/IfNotEquals", IfNotEqualsNode)
	LiteGraph.registerNodeType("Logic/IfGreaterThan", IfGreaterThanNode)
	LiteGraph.registerNodeType("Logic/IfLessThan", IfLessThanNode)
}