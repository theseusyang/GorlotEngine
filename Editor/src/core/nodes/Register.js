function Register() {}

Register.registerBlocksNodes = function() {
	registerBase()
	registerEvents()
	registerObjects()
	registerHierarchy()
	registerKeyboardNodes()
}

Register.registerMaterialNodes = function() {
	registerMaterialNodes()
}

Register.registerParticlesNodes = function() {
	// TODO: This
}

Register.unregisterAll = function() {
	LiteGraph.registered_node_types = {}
	LiteGraph.Nodes = {}
}

Register.registerAll = function() {	
	Register.registerBlocksNodes()
	Register.registerMaterialNodes()
	Register.registerParticlesNodes()
}
