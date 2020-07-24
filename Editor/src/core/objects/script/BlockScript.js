function BlockScript(nodes, uuid)
{
	THREE.Object3D.call(this);
	
	this.type = "BlockScript";
	this.name = "BlockScript";
	this.blocks_type = "scene" // Scene and Class available

	if (uuid === undefined) {
		var uuid = this.uuid
	}

	this.nodes = {}

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
	this.run(new LGraph(this.nodes))

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
