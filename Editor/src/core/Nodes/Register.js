function unregisterNodes() {
	LiteGraph.registered_node_types = []
	LiteGraph.Nodes = []
}

function registerMaterialNodes() {
	registerMaterialNodeNodes()
	registerMaterialNodeTexture()
	registerMaterialNodeColor()
	registerMaterialNodeConstants()
	registerArrayNodes()
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
	registerArrayNodes()
	registerMaterialNodeConstants()
}

function registerAllNodes() {
	registerBlueprintsNodes()
	registerMaterialNodes()
	registerParticleNodes()
}

registerAllNodes()