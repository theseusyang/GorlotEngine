// TODO: Texture nodes

function TextureNode() {
	this.addOutput("Texture", "Texture")
	this.texture = null
}
TextureNode.prototype.onDblClick = function() {
	var self = this
	App.chooseFile((f) => {
	    try {
	    	// TODO: Add Texture to program
	        var texture = new Texture(f)
	        self.texture = texture
	    } catch(e) {
	        console.error(`Error loading texture\n${e}`)
	    }
	}, "image/*")
}
TextureNode.prototype.onExecute = function() {
	if (this.texture !== null) {
		this.setOutputData(0, this.texture)
	}
}

function registerMaterialNodeTexture() {
	LiteGraph.registerNodeType("Texture/Texture", TextureNode)
}