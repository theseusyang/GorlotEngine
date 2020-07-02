function unregisterNodes() {
	LiteGraph.registered_node_types = []
	LiteGraph.Nodes = []
}

function registerMaterialNodes() {
	registerMaterialNodeNodes()
	registerMaterialNodeColor()
	registerMaterialNodeConstants()
}

function registerBlueprintsNodes() {
	registerBaseNodes()
	registerMathNodes()
	registerVectorNodes()
	registerQuaternionNodes()
	registerLogicNodes()
	registerArrayNodes()
	registerObjectNodes()
	registerSceneNodes()
}

function registerParticleNodes() {
	registerParticlesParticlesNodes()
	registerMaterialNodeColor()
	registerMaterialNodeConstants()
}

function registerAllNodes() {
	registerBlueprintsNodes()
	registerMaterialNodes()
}

registerAllNodes()