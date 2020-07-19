function unregisterNodes() {
	LiteGraph.clearRegisteredTypes()
}

// -- Helpers --
function baseRegisterBaseNodes() {
	registerBaseNodes()
	registerLogicNodes()
	registerArrayNodes()
    registerJSONNodes()
}

function mathRegisterMathNodes() {
	registerMathNodes()
	registerVectorNodes()
	registerQuaternionNodes()
	registerEulerNodes()
}

function objectsRegisterObjectsNodes() {
	registerObjectNodes()
	registerSceneNodes()
}

function inputRegisterInputNodes() {
	registerKeyboardNodes()
	registerMouseNodes()
}

// -- Nodes by Objects --
function registerModelNodes() {
	registerBaseNodes()
	mathRegisterMathNodes()
	objectsRegisterObjectsNodes()
	inputRegisterInputNodes()
}

//-- Generic nodes --
function registerBlueprintsNodes() {
	baseRegisterBaseNodes()
	mathRegisterMathNodes()
	objectsRegisterObjectsNodes()
	inputRegisterInputNodes()
}

function registerMaterialNodes() {
	registerMaterialNodeNodes()
	registerMaterialNodeTexture()
	registerMaterialNodeColor()
	registerMaterialNodeConstants()
	registerArrayNodes()
        registerJSONNodes()
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
