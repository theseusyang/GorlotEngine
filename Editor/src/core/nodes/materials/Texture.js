// TODO: Texture nodes

function TextureNode() {
	this.addOutput("Texture", "Texture")
	this.texture = null
}
TextureNode.title_color = NodesHelper.colours.skyblue[0]
TextureNode.title_color1 = NodesHelper.colours.skyblue[1]
TextureNode.title_color2 = NodesHelper.colours.skyblue[1]
TextureNode.title_text_color = NodesHelper.title_colours.white
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

function GetTextureThroughUUIDNode() {
	// TODO: This
}

function TextureWrapHorNode() {
	this.addInput("Texture", "Texture")
	this.addInput("Wrap", "number")
}
TextureWrapHorNode.title_color = NodesHelper.colours.chocolate[0]
TextureWrapHorNode.title_color1 = NodesHelper.colours.chocolate[1]
TextureWrapHorNode.title_color2 = NodesHelper.colours.chocolate[1]
TextureWrapHorNode.title_text_color = NodesHelper.title_colours.white
TextureWrapHorNode.title = "Wrap Hor"
TextureWrapHorNode.prototype.onExecute = function() {
	var t = this.getInputData(0)
	var w = this.getInputData(1)

	if (t !== undefined && t !== undefined) {
		t.wrapS = t
		t.needsUpdate = true
	}
}

function TextureWrapVertNode() {
	this.addInput("Texture", "Texture")
	this.addInput("Wrap", "number")
}
TextureWrapVertNode.title_color = NodesHelper.colours.chocolate[0]
TextureWrapVertNode.title_color1 = NodesHelper.colours.chocolate[1]
TextureWrapVertNode.title_color2 = NodesHelper.colours.chocolate[1]
TextureWrapVertNode.title_text_color = NodesHelper.title_colours.white
TextureWrapVertNode.title = "Wrap Vert"
TextureWrapVertNode.prototype.onExecute = function() {
	var t = this.getInputData(0)
	var w = this.getInputData(1)

	if (t !== undefined && t !== undefined) {
		t.wrapT = t
		t.needsUpdate = true
	}

}

function TextureRepeatNode() {
	this.addInput("Texture", "Texture")
	this.addInput("Repeat", "Vector") // Vector2
}
TextureRepeatNode.title_color = NodesHelper.colours.deeppink[0]
TextureRepeatNode.title_color1 = NodesHelper.colours.deeppink[1]
TextureRepeatNode.title_color2 = NodesHelper.colours.deeppink[1]
TextureRepeatNode.title_text_color = NodesHelper.title_colours.white
TextureRepeatNode.title = "Repeat"
TextureRepeatNode.prototype.onExecute = function() {
	var t = this.getInputData(0)
	var r = this.getInputData(1)

	if (t !== undefined && r !== undefined) {
		t.repeat.copy(r)
		t.needsUpdate = true
	}
}

function registerMaterialNodeTexture() {
	LiteGraph.registerNodeType("Texture/Texture", TextureNode)
	LiteGraph.registerNodeType("Texture/TextureWrapHor", TextureWrapHorNode)
	LiteGraph.registerNodeType("Texture/TextureWrapVert", TextureWrapVertNode)
	LiteGraph.registerNodeType("Texture/TextureRepeat", TextureRepeatNode)
}