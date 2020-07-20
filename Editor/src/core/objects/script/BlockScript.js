function BlockScript(nodes, uuid)
{
	THREE.Object3D.call(this);
	
	this.type = "BlockScript";
	this.name = "BlockScript";
	this.blocks_type = "object"

	if (uuid === undefined) {
		var uuid = this.uuid
	}

	this.nodes = {
		config: {},
        extra: {},
        groups: [],
		last_link_id: 0,
		last_node_id: 2,
		links: [],
		nodes: [
			{
				flags: {},
				id: 1,
				inputs: [],
				mode: 0,
				order: 0,
				pos: [245, 127],
				properties: {type: "initialization"},
				size: [210, 78],
				subgraph: {
					config: {attachedTo: uuid}
				},
				title: "Init",
				type: "Logic/Subgraph"
			},
			{
				flags: {},
				id: 2,
				inputs: [],
				mode: 0,
				order: 1,
				pos: [616, 127],
				properties: {type: "loop"},
				size: [210, 78],
				subgraph: {},
				title: "Loop",
				type: "Logic/Subgraph"
			}
		],
		version: 0.4
	}

	this.init = null
	this.loop = null

	// Data
	if (nodes !== undefined) {
		this.nodes = nodes
	}

	this.components = []
	this.defaultComponents = []

	this.defaultComponents.push(new ElementComponent())
}

BlockScript.prototype = Object.create(THREE.Object3D.prototype);

//Initialize
BlockScript.prototype.initialize = function()
{
	for(var i = 0; i < this.nodes.nodes.length; i++) {
		if (this.nodes.nodes[i].properties.type === "initialization") {
			this.init = i
		}
		if (this.nodes.nodes[i].properties.type === "loop") {
			this.loop = i
		}
	}

	// TODO: Optimise this code
	this.init_nodes = JSON.parse(JSON.stringify(this.nodes))
	this.init_nodes.nodes[this.loop] = {}

	this.loop_nodes = JSON.parse(JSON.stringify(this.nodes))
	this.loop_nodes.nodes[this.init] = {}

	this.run(new LGraph(this.init_nodes))

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
	this.run(new LGraph(this.loop_nodes))

	//Update children
	for(var i = 0; i < this.children.length; i++)
	{
		this.children[i].update();
	}
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
