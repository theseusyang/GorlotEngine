// Blending mode
function NoBlendingNode() {
	return THREE.NoBlending
}
function NormalBlendingNode() {
	return THREE.NormalBlending
}
function AdditiveBlendingNode() {
	return THREE.AdditiveBlending
}
function SubstractiveBlendingNode() {
	return THREE.SubstractiveBlending
}
function MultiplyBlendingNode() {
	return THREE.MultiplyBlending
}

// Blending Source
function DstColorFactorNode() {
	return THREE.DstColorFactor
}
function OneMinusDstColorFactorNode() {
	return THREE.OneMinusDstColorFactor
}
function SrcAlphaSaturateFactorNode() {
	return THREE.SrcAlphaSaturateFactor
}

// Blending Destination
function ZeroFactorNode() {
	return THREE.ZeroFactor
}
function OneFactorNode() {
	return THREE.OneFactor
}
function SrcColorFactorNode() {
	return THREE.SrcColorFactor
}
function OneMinusSrcColorFactorNode() {
	return THREE.OneMinusSrcColorFactor
}
function SrcAlphaFactorNode() {
	return THREE.SrcAlphaFactor
}
function OneMinusSrcAlphaFactorNode() {
	return THREE.OneMinusSrcAlphaFactor
}
function DstAlphaFactorNode() {
	return THREE.DstAlphaFactor
}
function OneMinusDstAlphaFactorNode() {
	return THREE.OneMinusDstAlphaFactor
}

function registerMaterialNodeConstants() {
	// Blending mode
	LiteGraph.wrapFunctionAsNode("BlendingModes/NoBlending", NoBlendingNode, null, "number")
	LiteGraph.wrapFunctionAsNode("BlendingModes/NormalBlending", NormalBlendingNode, null, "number")
	LiteGraph.wrapFunctionAsNode("BlendingModes/AdditiveBlending", AdditiveBlendingNode, null, "number")
	LiteGraph.wrapFunctionAsNode("BlendingModes/SubstractiveBlending", SubstractiveBlendingNode, null, "number")
	LiteGraph.wrapFunctionAsNode("BlendingModes/MultiplyBlending", MultiplyBlendingNode, null, "number")
	// Blending source
	LiteGraph.wrapFunctionAsNode("BlendingSource/DstColorFactor", DstColorFactorNode, null, "number")
	LiteGraph.wrapFunctionAsNode("BlendingSource/OneMinusDstColorFactor", OneMinusDstColorFactorNode, null, "number")
	LiteGraph.wrapFunctionAsNode("BlendingSource/SrcAlphaSaturateFactor", SrcAlphaSaturateFactorNode, null, "number")
	// Blending Destination
	LiteGraph.wrapFunctionAsNode("BlendingDestination/ZeroFactor", ZeroFactorNode, null, "number")
	LiteGraph.wrapFunctionAsNode("BlendingDestination/OneFactor", OneFactorNode, null, "number")
	LiteGraph.wrapFunctionAsNode("BlendingDestination/SrcColorFactor", SrcColorFactorNode, null, "number")
	LiteGraph.wrapFunctionAsNode("BlendingDestination/SrcAlphaFactor", SrcAlphaFactorNode, null, "number")
	LiteGraph.wrapFunctionAsNode("BlendingDestination/OneMinusSrcAlphaFactor", OneMinusSrcAlphaFactorNode, null, "number")
	LiteGraph.wrapFunctionAsNode("BlendingDestination/DstAlphaFactor", DstAlphaFactorNode, null, "number")
	LiteGraph.wrapFunctionAsNode("BlendingDestination/OneMinusDstAlphaFactor", OneMinusDstAlphaFactorNode, null, "number")
}