function MaterialNode() {
	this.properties = {mat: null}
	this.addOutput("Material", "Material")
}
MaterialNode.title = "Material"
MaterialNode.onExecute = function() {
	this.setOutputData(0, new THREE.MeshPhongMaterial())
}

function registerMaterialNodeNodes(argument) {
	LiteGraph.registerNodeType("Material/Material", MaterialNode)
}