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
function CustomBlendingNode() {
	return THREE.CustomBlending
}

// Blending Factors
function DstColorFactorNode() {
	return THREE.DstColorFactor
}
function OneMinusDstColorFactorNode() {
	return THREE.OneMinusDstColorFactor
}
function SrcAlphaSaturateFactorNode() {
	return THREE.SrcAlphaSaturateFactor
}

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

// Equation
function AddEquationNode() {
	return THREE.AddEquation
}
function SubtractEquationNode() {
	return THREE.SubstractEquation
}
function ReverseSubtractEquationNode() {
	return THREE.ReverseSubtractEquation
}
function MinEquationNode() {
	return THREE.MinEquation
}
function MaxEquationNode() {
	return THREE.MaxEquation
}

// Constants
function FrontSideNode() {
	return THREE.FrontSide
}
function BackSideNode() {
	return THREE.BackSide
}
function DoubleSideNode() {
	return THREE.DoubleSide
}
function HighPrecisionNode() {
	return "highp"
}
function MediumPrecisionNode() {
	return "mediump"
}
function LowPrecisionNode() {
	return "lowp"
}

function MultiplyNode() {
	return THREE.MultiplyOperation
}
function MixNode() {
	return THREE.MixOperation
}
function AddNode() {
	return THREE.AddOperation
}

// Shading
function SmoothShadingNode() {
	return THREE.SmoothShading
}
function FlatShadingNode() {
	return THREE.FlatShading
}

// Emitter types
function BoxTypeNode() {
	return SPE.distributions.BOX
}
function SphereTypeNode() {
	return SPE.distributions.SPHERE
}
function DiscTypeNode() {
	return SPE.distributions.DISC
}

// Texture
function ClampToEdgeWrappingNode() {
	return THREE.ClampToEdgeWrapping
}
function RepeatWrappingNode() {
	return THREE.RepeatWrapping
}
function RepeatMirroredWrappingNode() {
	return THREE.MirroredRepeatWrapping
}

function registerMaterialNodeConstants() {
	// Blending mode
	LiteGraph.wrapFunctionAsNode("BlendingModes/NoBlending", NoBlendingNode, null, "number")
	LiteGraph.wrapFunctionAsNode("BlendingModes/NormalBlending", NormalBlendingNode, null, "number")
	LiteGraph.wrapFunctionAsNode("BlendingModes/AdditiveBlending", AdditiveBlendingNode, null, "number")
	LiteGraph.wrapFunctionAsNode("BlendingModes/SubstractiveBlending", SubstractiveBlendingNode, null, "number")
	LiteGraph.wrapFunctionAsNode("BlendingModes/MultiplyBlending", MultiplyBlendingNode, null, "number")
	LiteGraph.wrapFunctionAsNode("BlendingModes/CustomBlending", CustomBlendingNode, null, "number")
	// Blending Factors
	LiteGraph.wrapFunctionAsNode("BlendingFactors/DstColorFactor", DstColorFactorNode, null, "number")
	LiteGraph.wrapFunctionAsNode("BlendingFactors/OneMinusDstColorFactor", OneMinusDstColorFactorNode, null, "number")
	LiteGraph.wrapFunctionAsNode("BlendingFactors/SrcAlphaSaturateFactor", SrcAlphaSaturateFactorNode, null, "number")
	LiteGraph.wrapFunctionAsNode("BlendingFactors/ZeroFactor", ZeroFactorNode, null, "number")
	LiteGraph.wrapFunctionAsNode("BlendingFactors/OneFactor", OneFactorNode, null, "number")
	LiteGraph.wrapFunctionAsNode("BlendingFactors/SrcColorFactor", SrcColorFactorNode, null, "number")
	LiteGraph.wrapFunctionAsNode("BlendingFactors/SrcAlphaFactor", SrcAlphaFactorNode, null, "number")
	LiteGraph.wrapFunctionAsNode("BlendingFactors/OneMinusSrcAlphaFactor", OneMinusSrcAlphaFactorNode, null, "number")
	LiteGraph.wrapFunctionAsNode("BlendingFactors/DstAlphaFactor", DstAlphaFactorNode, null, "number")
	LiteGraph.wrapFunctionAsNode("BlendingFactors/OneMinusDstAlphaFactor", OneMinusDstAlphaFactorNode, null, "number")
	// Equation
	LiteGraph.wrapFunctionAsNode("BlendingEquations/AddEquation", AddEquationNode, null, "number")
	LiteGraph.wrapFunctionAsNode("BlendingEquations/SubtractEquation", SubtractEquationNode, null, "number")
	LiteGraph.wrapFunctionAsNode("BlendingEquations/ReverseSubtractEquation", ReverseSubtractEquationNode, null, "number")
	LiteGraph.wrapFunctionAsNode("BlendingEquations/MinEquation", MinEquationNode, null, "number")
	LiteGraph.wrapFunctionAsNode("BlendingEquations/MaxEquation", MaxEquationNode, null, "number")
	// Constants
	LiteGraph.wrapFunctionAsNode("Constants/FrontSide", FrontSideNode, null, "number")
	LiteGraph.wrapFunctionAsNode("Constants/BackSide", BackSideNode, null, "number")
	LiteGraph.wrapFunctionAsNode("Constants/DoubleSide", DoubleSideNode, null, "number")
	LiteGraph.wrapFunctionAsNode("Constants/HighPrecision", HighPrecisionNode, null, "Text")
	LiteGraph.wrapFunctionAsNode("Constants/MediumPrecision", MediumPrecisionNode, null, "Text")
	LiteGraph.wrapFunctionAsNode("Constants/LowPrecision", LowPrecisionNode, null, "Text")
	LiteGraph.wrapFunctionAsNode("Constants/Multiply", MultiplyNode, null, "number")
	LiteGraph.wrapFunctionAsNode("Constants/Mix", MixNode, null, "number")
	LiteGraph.wrapFunctionAsNode("Constants/Add", AddNode, null, "number")
	LiteGraph.wrapFunctionAsNode("Constants/SmoothShading", SmoothShadingNode, null, "number")
	LiteGraph.wrapFunctionAsNode("Constants/FlatShading", FlatShadingNode, null, "number")
	// Emitter Type
	LiteGraph.wrapFunctionAsNode("Constants/BoxType", BoxTypeNode, null, "number")
	LiteGraph.wrapFunctionAsNode("Constants/SphereType", SphereTypeNode, null, "number")
	LiteGraph.wrapFunctionAsNode("Constants/DiscType", DiscTypeNode, null, "number")
	// Texture
	LiteGraph.wrapFunctionAsNode("Constants/ClampToEdgeWrapping", ClampToEdgeWrappingNode, null, "number")
	LiteGraph.wrapFunctionAsNode("Constants/RepeatWrapping", RepeatWrappingNode, null, "number")
	LiteGraph.wrapFunctionAsNode("Constants/RepeatMirroredWrapping", RepeatMirroredWrappingNode, null, "number")
}