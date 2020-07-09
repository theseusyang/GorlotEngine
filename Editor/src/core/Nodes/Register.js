function unregisterNodes() {
	LiteGraph.registered_node_types = []
	LiteGraph.Nodes = []
}

function registerMaterialNodes() {
	registerMaterialNodeNodes()
	registerMaterialNodeTexture()
	registerMaterialNodeColor()
	registerMaterialNodeConstants()
}

function registerBlueprintsNodes() {
	registerBaseNodes()
	registerMathNodes()
	registerVectorNodes()
	registerQuaternionNodes()
	registerEulerNodes()
	registerLogicNodes()
	registerArrayNodes()
	registerObjectNodes()
	registerSceneNodes()
}

function registerParticleNodes() {
	registerParticlesParticlesNodes()
	registerMaterialNodeColor()
	registerVectorNodes()
	registerMaterialNodeConstants()
}

function registerAllNodes() {
	registerBlueprintsNodes()
	registerMaterialNodes()
}

registerAllNodes()