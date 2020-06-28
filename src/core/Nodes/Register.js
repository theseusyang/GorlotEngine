function unregisterNodes() {
	LiteGraph.registered_node_types = []
	LiteGraph.Nodes = []
}

function registerMaterialNodes() {
	registerMaterialNodeNodes()
	registerMaterialNodeColor()
}

function registerBlueprintsNodes() {
	registerBaseNodes()
	registerMathNodes()
	registerVectorNodes()
	registerLogicNodes()
	registerArrayNodes()
	registerObjectNodes()
	registerSceneNodes()
}

function registerAllNodes() {
	registerBlueprintsNodes()
	registerMaterialNodes()
}