function BlockScript(nodes, uuid, obj_type)
{
	THREE.Object3D.call(this);
	
	this.type = "BlockScript";
	this.name = "blocks";
	this.obj_uuid = (uuid !== undefined) ? uuid : this.uuid
	this.blocks_type = (obj_type !== undefined) ? obj_type : "scene"

	this.nodes = {
		config: {
			blocks: "Blocks",
			type: this.blocks_type,
			uuid: this.obj_uuid
		},
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
						...NodesHelper.slots.output.passer,
					},
					{
						name: "",
						type: -1,
						links: null,
						...NodesHelper.slots.output.event
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
						...NodesHelper.slots.output.passer
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

	this.graph.config.scene = ObjectUtils.getScene(this)

	if (this.graph.config.type === "scene") {
		this.graph.config.self = this
	} else if(this.graph.config.type === "class") {
		var scene = (Editor.program_running !== undefined && Editor.program_running !== null) ? Editor.program_running.scene : Main.program.scene
		this.graph.config.scene = scene
		var self = this

		scene.traverse((child) => {
			if (child.obj_uuid !== undefined && child.obj_uuid === self.uuid) {
				self.graph.config.self = child
			}
		})
	}

	this.graph.sendEventToAllNodes("onStart")
	
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

	this.run(this.graph)
}

BlockScript.prototype.dispose = function() {

	if(this.graph !== null)
		this.graph.sendEventToAllNodes("onDispose")

	// Dispose children
	for(var i = 0; i < this.children.length; i++) {
		this.children[i].dispose()
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

	delete this.nodes.config.self
	delete this.nodes.config.scene

	data.object.nodes = this.nodes

	return data
}
