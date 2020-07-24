function BlockScript(nodes, uuid)
{
	THREE.Object3D.call(this);
	
	this.type = "BlockScript";
	this.name = "BlockScript";
	this.blocks_type = "scene" // Scene and Class available

	if (uuid === undefined) {
		var uuid = this.uuid
	}

	this.nodes = {
		config: {},
		extra: {},
		groups: {},
		last_link_id: 0,
		last_node_id: 0,
		links: [],
		nodes: [
			{
				flags: {},
				id: 1,
				mode: 0,
				order: 0,
				outputs: [
					{
						name: "",
						type: -1,
						links: null,
						...NodesHelper.outputs.event
					}
				],
				pos: [100, 352],
				properties: {},
				size: [120, 26],
				type: "Events/BeginPlay"
			},
			{
				flags: {},
				id: 2,
				inputs: [],
				mode: 0,
				order: 1,
				outputs: [
					{
						name: "",
						type: -1,
						links: null,
						...NodesHelper.outputs.delegate
					}
				],
				pos: [100, 429],
				properties: {},
				size: [120, 26],
				type: "Events/EventTick"
			}
		],
		version: 0.4
	}

	// Data
	if (nodes !== undefined) {
		this.nodes = nodes
	}

	this.graph = null

	this.components = []
	this.defaultComponents = []

	this.defaultComponents.push(new ElementComponent())
}

BlockScript.prototype = Object.create(THREE.Object3D.prototype);

//Initialize
BlockScript.prototype.initialize = function()
{
	this.graph = new LGraph(this.nodes)
	this.graph.sendEventToAllNodes("onStart")
	this.run(this.graph)

	this.tick = this.graph.findNodesByType("Events/EventTick")

	//Initialize children
	for(var i = 0; i < this.children.length; i++)
	{
		this.children[i].initialize();
	}
}

BlockScript.prototype.run = function(graph) {
	if (graph !== undefined) {
		var nodes = graph._nodes_executable ? graph._nodes_executable : graph._nodes
			
		if(!nodes)
			return

		for(var j = 0, l = nodes.length; j < l; ++j) {
			var node = nodes[j]
			if (node.mode === LiteGraph.ALWAYS && node.onExecute) {
				node.onExecute()
			}
		}
	}
}

//Update script
BlockScript.prototype.update = function()
{
	//Update children
	for(var i = 0; i < this.children.length; i++)
	{
		this.children[i].update();
	}

	this.tick[0].onExecute()
}

// Update nodes
BlockScript.prototype.updateNodes = function(nodes) {
	this.nodes = {}
	this.nodes = nodes
}

// Serialise
BlockScript.prototype.toJSON = function(meta) {
	var data = THREE.Object3D.prototype.toJSON.call(this, meta)

	data.object.nodes = this.nodes
	data.object.blocks_type = this.blocks_type

	return data
}
