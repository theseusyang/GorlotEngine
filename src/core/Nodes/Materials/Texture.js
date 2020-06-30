// TODO: Make this function
function TextureNode() {
	this.addOutput("Texture", "Texture")
	this.properties = {texture: null}
}
TextureNode.prototype.onDblClick = function() {
	var properties = this.properties
	App.chooseFile((f) => {
		properties.texture = new Texture(f)
	}, "image/*")
}
TextureNode.prototype.onExecute = function() {
	//if (this.properties.texture !== null) {
	//	this.setOutputData(0, this.properties.texture)
	//}
}

function registerMaterialNodeTexture() {
	LiteGraph.registerNodeType("Texture/Texture", TextureNode)
}