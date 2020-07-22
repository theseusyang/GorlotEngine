function KeyboardNode() {
	this.addInput("Key", "Key")

	this.addOutput("Is pressed", "Boolean")
	this.addOutput("Is Just Pressed", "Boolean")
	this.addOutput("Is Just Released", "Boolean")
}
KeyboardNode.title_color = NodesHelper.colours.lightcoral[0]
KeyboardNode.title_color1 = NodesHelper.colours.lightcoral[1]
KeyboardNode.title_color2 = NodesHelper.colours.lightcoral[1]
KeyboardNode.title_text_color = NodesHelper.title_colours.white
KeyboardNode.title = "Keyboard"
KeyboardNode.prototype.onExecute = function() {
	var k = this.getInputData(0)

	this.setOutputData(0, Keyboard.keyPressed(k))
	this.setOutputData(1, Keyboard.keyJustPressed(k))
	this.setOutputData(2, Keyboard.keyJustReleased(k))

}

function KeyboardKeyANode() {
	this.addOutput("\"A\" Key", "Key")
}
KeyboardKeyANode.title_color = NodesHelper.colours.skyblue[0]
KeyboardKeyANode.title_color1 = NodesHelper.colours.skyblue[1]
KeyboardKeyANode.title_color2 = NodesHelper.colours.skyblue[1]
KeyboardKeyANode.title_text_color = NodesHelper.title_colours.white
KeyboardKeyANode.title = "A"
KeyboardKeyANode.prototype.onExecute = function() {
	this.setOutputData(0, Keyboard.A)
}

function KeyboardKeyBNode() {
	this.addOutput("\"B\" Key", "Key")
}
KeyboardKeyBNode.title_color = NodesHelper.colours.skyblue[0]
KeyboardKeyBNode.title_color1 = NodesHelper.colours.skyblue[1]
KeyboardKeyBNode.title_color2 = NodesHelper.colours.skyblue[1]
KeyboardKeyBNode.title_text_color = NodesHelper.title_colours.white
KeyboardKeyBNode.title = "B"
KeyboardKeyBNode.prototype.onExecute = function() {
	this.setOutputData(0, Keyboard.B)
}

function KeyboardKeyCNode() {
	this.addOutput("\"C\" Key", "Key")
}
KeyboardKeyCNode.title_color = NodesHelper.colours.skyblue[0]
KeyboardKeyCNode.title_color1 = NodesHelper.colours.skyblue[1]
KeyboardKeyCNode.title_color2 = NodesHelper.colours.skyblue[1]
KeyboardKeyCNode.title_text_color = NodesHelper.title_colours.white
KeyboardKeyCNode.title = "C"
KeyboardKeyCNode.prototype.onExecute = function() {
	this.setOutputData(0, Keyboard.C)
}

function KeyboardKeyDNode() {
	this.addOutput("\"D\" Key", "Key")
}
KeyboardKeyDNode.title_color = NodesHelper.colours.skyblue[0]
KeyboardKeyDNode.title_color1 = NodesHelper.colours.skyblue[1]
KeyboardKeyDNode.title_color2 = NodesHelper.colours.skyblue[1]
KeyboardKeyDNode.title_text_color = NodesHelper.title_colours.white
KeyboardKeyDNode.title = "D"
KeyboardKeyDNode.prototype.onExecute = function() {
	this.setOutputData(0, Keyboard.D)
}

function KeyboardKeyENode() {
	this.addOutput("\"E\" Key", "Key")
}
KeyboardKeyENode.title_color = NodesHelper.colours.skyblue[0]
KeyboardKeyENode.title_color1 = NodesHelper.colours.skyblue[1]
KeyboardKeyENode.title_color2 = NodesHelper.colours.skyblue[1]
KeyboardKeyENode.title_text_color = NodesHelper.title_colours.white
KeyboardKeyENode.title = "E"
KeyboardKeyENode.prototype.onExecute = function() {
	this.setOutputData(0, Keyboard.E)
}

function KeyboardKeyFNode() {
	this.addOutput("\"F\" Key", "Key")
}
KeyboardKeyFNode.title_color = NodesHelper.colours.skyblue[0]
KeyboardKeyFNode.title_color1 = NodesHelper.colours.skyblue[1]
KeyboardKeyFNode.title_color2 = NodesHelper.colours.skyblue[1]
KeyboardKeyFNode.title_text_color = NodesHelper.title_colours.white
KeyboardKeyFNode.title = "F"
KeyboardKeyFNode.prototype.onExecute = function() {
	this.setOutputData(0, Keyboard.F)
}

function KeyboardKeyGNode() {
	this.addOutput("\"G\" Key", "Key")
}
KeyboardKeyGNode.title_color = NodesHelper.colours.skyblue[0]
KeyboardKeyGNode.title_color1 = NodesHelper.colours.skyblue[1]
KeyboardKeyGNode.title_color2 = NodesHelper.colours.skyblue[1]
KeyboardKeyGNode.title_text_color = NodesHelper.title_colours.white
KeyboardKeyGNode.title = "G"
KeyboardKeyGNode.prototype.onExecute = function() {
	this.setOutputData(0, Keyboard.G)
}

function KeyboardKeyHNode() {
	this.addOutput("\"H\" Key", "Key")
}
KeyboardKeyHNode.title_color = NodesHelper.colours.skyblue[0]
KeyboardKeyHNode.title_color1 = NodesHelper.colours.skyblue[1]
KeyboardKeyHNode.title_color2 = NodesHelper.colours.skyblue[1]
KeyboardKeyHNode.title_text_color = NodesHelper.title_colours.white
KeyboardKeyHNode.title = "H"
KeyboardKeyHNode.prototype.onExecute = function() {
	this.setOutputData(0, Keyboard.H)
}

function KeyboardKeyINode() {
	this.addOutput("\"H\" Key", "Key")
}
KeyboardKeyINode.title_color = NodesHelper.colours.skyblue[0]
KeyboardKeyINode.title_color1 = NodesHelper.colours.skyblue[1]
KeyboardKeyINode.title_color2 = NodesHelper.colours.skyblue[1]
KeyboardKeyINode.title_text_color = NodesHelper.title_colours.white
KeyboardKeyINode.title = "I"
KeyboardKeyINode.prototype.onExecute = function() {
	this.setOutputData(0, Keyboard.I)
}

function KeyboardKeyJNode() {
	this.addOutput("\"J\" Key", "Key")
}
KeyboardKeyJNode.title_color = NodesHelper.colours.skyblue[0]
KeyboardKeyJNode.title_color1 = NodesHelper.colours.skyblue[1]
KeyboardKeyJNode.title_color2 = NodesHelper.colours.skyblue[1]
KeyboardKeyJNode.title_text_color = NodesHelper.title_colours.white
KeyboardKeyJNode.title = "J"
KeyboardKeyJNode.prototype.onExecute = function() {
	this.setOutputData(0, Keyboard.J)
}

function KeyboardKeyKNode() {
	this.addOutput("\"K\" Key", "Key")
}
KeyboardKeyKNode.title_color = NodesHelper.colours.skyblue[0]
KeyboardKeyKNode.title_color1 = NodesHelper.colours.skyblue[1]
KeyboardKeyKNode.title_color2 = NodesHelper.colours.skyblue[1]
KeyboardKeyKNode.title_text_color = NodesHelper.title_colours.white
KeyboardKeyKNode.title = "K"
KeyboardKeyKNode.prototype.onExecute = function() {
	this.setOutputData(0, Keyboard.K)
}

function KeyboardKeyLNode() {
	this.addOutput("\"L\" Key", "Key")
}
KeyboardKeyLNode.title_color = NodesHelper.colours.skyblue[0]
KeyboardKeyLNode.title_color1 = NodesHelper.colours.skyblue[1]
KeyboardKeyLNode.title_color2 = NodesHelper.colours.skyblue[1]
KeyboardKeyLNode.title_text_color = NodesHelper.title_colours.white
KeyboardKeyLNode.title = "L"
KeyboardKeyLNode.prototype.onExecute = function() {
	this.setOutputData(0, Keyboard.L)
}

function KeyboardKeyMNode() {
	this.addOutput("\"M\" Key", "Key")
}
KeyboardKeyMNode.title_color = NodesHelper.colours.skyblue[0]
KeyboardKeyMNode.title_color1 = NodesHelper.colours.skyblue[1]
KeyboardKeyMNode.title_color2 = NodesHelper.colours.skyblue[1]
KeyboardKeyMNode.title_text_color = NodesHelper.title_colours.white
KeyboardKeyMNode.title = "M"
KeyboardKeyMNode.prototype.onExecute = function() {
	this.setOutputData(0, Keyboard.M)
}

function KeyboardKeyNNode() {
	this.addOutput("\"N\" Key", "Key")
}
KeyboardKeyNNode.title_color = NodesHelper.colours.skyblue[0]
KeyboardKeyNNode.title_color1 = NodesHelper.colours.skyblue[1]
KeyboardKeyNNode.title_color2 = NodesHelper.colours.skyblue[1]
KeyboardKeyNNode.title_text_color = NodesHelper.title_colours.white
KeyboardKeyNNode.title = "N"
KeyboardKeyNNode.prototype.onExecute = function() {
	this.setOutputData(0, Keyboard.N)
}

function KeyboardKeyONode() {
	this.addOutput("\"O\" Key", "Key")
}
KeyboardKeyONode.title_color = NodesHelper.colours.skyblue[0]
KeyboardKeyONode.title_color1 = NodesHelper.colours.skyblue[1]
KeyboardKeyONode.title_color2 = NodesHelper.colours.skyblue[1]
KeyboardKeyONode.title_text_color = NodesHelper.title_colours.white
KeyboardKeyONode.title = "O"
KeyboardKeyONode.prototype.onExecute = function() {
	this.setOutputData(0, Keyboard.O)
}

function KeyboardKeyPNode() {
	this.addOutput("\"P\" Key", "Key")
}
KeyboardKeyPNode.title_color = NodesHelper.colours.skyblue[0]
KeyboardKeyPNode.title_color1 = NodesHelper.colours.skyblue[1]
KeyboardKeyPNode.title_color2 = NodesHelper.colours.skyblue[1]
KeyboardKeyPNode.title_text_color = NodesHelper.title_colours.white
KeyboardKeyPNode.title = "P"
KeyboardKeyPNode.prototype.onExecute = function() {
	this.setOutputData(0, Keyboard.P)
}

function KeyboardKeyQNode() {
	this.addOutput("\"Q\" Key", "Key")
}
KeyboardKeyQNode.title_color = NodesHelper.colours.skyblue[0]
KeyboardKeyQNode.title_color1 = NodesHelper.colours.skyblue[1]
KeyboardKeyQNode.title_color2 = NodesHelper.colours.skyblue[1]
KeyboardKeyQNode.title_text_color = NodesHelper.title_colours.white
KeyboardKeyQNode.title = "Q"
KeyboardKeyQNode.prototype.onExecute = function() {
	this.setOutputData(0, Keyboard.Q)
}

function KeyboardKeyRNode() {
	this.addOutput("\"R\" Key", "Key")
}
KeyboardKeyRNode.title_color = NodesHelper.colours.skyblue[0]
KeyboardKeyRNode.title_color1 = NodesHelper.colours.skyblue[1]
KeyboardKeyRNode.title_color2 = NodesHelper.colours.skyblue[1]
KeyboardKeyRNode.title_text_color = NodesHelper.title_colours.white
KeyboardKeyRNode.title = "R"
KeyboardKeyRNode.prototype.onExecute = function() {
	this.setOutputData(0, Keyboard.R)
}

function KeyboardKeySNode() {
	this.addOutput("\"S\" Key", "Key")
}
KeyboardKeySNode.title_color = NodesHelper.colours.skyblue[0]
KeyboardKeySNode.title_color1 = NodesHelper.colours.skyblue[1]
KeyboardKeySNode.title_color2 = NodesHelper.colours.skyblue[1]
KeyboardKeySNode.title_text_color = NodesHelper.title_colours.white
KeyboardKeySNode.title = "S"
KeyboardKeySNode.prototype.onExecute = function() {
	this.setOutputData(0, Keyboard.S)
}

function KeyboardKeyTNode() {
	this.addOutput("\"T\" Key", "Key")
}
KeyboardKeyTNode.title_color = NodesHelper.colours.skyblue[0]
KeyboardKeyTNode.title_color1 = NodesHelper.colours.skyblue[1]
KeyboardKeyTNode.title_color2 = NodesHelper.colours.skyblue[1]
KeyboardKeyTNode.title_text_color = NodesHelper.title_colours.white
KeyboardKeyTNode.title = "T"
KeyboardKeyTNode.prototype.onExecute = function() {
	this.setOutputData(0, Keyboard.T)
}

function KeyboardKeyUNode() {
	this.addOutput("\"U\" Key", "Key")
}
KeyboardKeyUNode.title_color = NodesHelper.colours.skyblue[0]
KeyboardKeyUNode.title_color1 = NodesHelper.colours.skyblue[1]
KeyboardKeyUNode.title_color2 = NodesHelper.colours.skyblue[1]
KeyboardKeyUNode.title_text_color = NodesHelper.title_colours.white
KeyboardKeyUNode.title = "U"
KeyboardKeyUNode.prototype.onExecute = function() {
	this.setOutputData(0, Keyboard.U)
}

function KeyboardKeyVNode() {
	this.addOutput("\"V\" Key", "Key")
}
KeyboardKeyVNode.title_color = NodesHelper.colours.skyblue[0]
KeyboardKeyVNode.title_color1 = NodesHelper.colours.skyblue[1]
KeyboardKeyVNode.title_color2 = NodesHelper.colours.skyblue[1]
KeyboardKeyVNode.title_text_color = NodesHelper.title_colours.white
KeyboardKeyVNode.title = "V"
KeyboardKeyVNode.prototype.onExecute = function() {
	this.setOutputData(0, Keyboard.V)
}

function KeyboardKeyWNode() {
	this.addOutput("\"W\" Key", "Key")
}
KeyboardKeyWNode.title_color = NodesHelper.colours.skyblue[0]
KeyboardKeyWNode.title_color1 = NodesHelper.colours.skyblue[1]
KeyboardKeyWNode.title_color2 = NodesHelper.colours.skyblue[1]
KeyboardKeyWNode.title_text_color = NodesHelper.title_colours.white
KeyboardKeyWNode.title = "W"
KeyboardKeyWNode.prototype.onExecute = function() {
	this.setOutputData(0, Keyboard.W)
}

function KeyboardKeyXNode() {
	this.addOutput("\"X\" Key", "Key")
}
KeyboardKeyXNode.title_color = NodesHelper.colours.skyblue[0]
KeyboardKeyXNode.title_color1 = NodesHelper.colours.skyblue[1]
KeyboardKeyXNode.title_color2 = NodesHelper.colours.skyblue[1]
KeyboardKeyXNode.title_text_color = NodesHelper.title_colours.white
KeyboardKeyXNode.title = "X"
KeyboardKeyXNode.prototype.onExecute = function() {
	this.setOutputData(0, Keyboard.X)
}

function KeyboardKeyYNode() {
	this.addOutput("\"Y\" Key", "Key")
}
KeyboardKeyYNode.title_color = NodesHelper.colours.skyblue[0]
KeyboardKeyYNode.title_color1 = NodesHelper.colours.skyblue[1]
KeyboardKeyYNode.title_color2 = NodesHelper.colours.skyblue[1]
KeyboardKeyYNode.title_text_color = NodesHelper.title_colours.white
KeyboardKeyYNode.title = "Y"
KeyboardKeyYNode.prototype.onExecute = function() {
	this.setOutputData(0, Keyboard.Y)
}

function KeyboardKeyZNode() {
	this.addOutput("\"Z\" Key", "Key")
}
KeyboardKeyZNode.title_color = NodesHelper.colours.skyblue[0]
KeyboardKeyZNode.title_color1 = NodesHelper.colours.skyblue[1]
KeyboardKeyZNode.title_color2 = NodesHelper.colours.skyblue[1]
KeyboardKeyZNode.title_text_color = NodesHelper.title_colours.white
KeyboardKeyZNode.title = "Z"
KeyboardKeyZNode.prototype.onExecute = function() {
	this.setOutputData(0, Keyboard.Z)
}

function registerKeyboardNodes() {
	LiteGraph.registerNodeType("Keyboard/Keyboard", KeyboardNode)

	LiteGraph.registerNodeType("Keyboard/KeyboardKeyA", KeyboardKeyANode)
	LiteGraph.registerNodeType("Keyboard/KeyboardKeyB", KeyboardKeyBNode)
	LiteGraph.registerNodeType("Keyboard/KeyboardKeyC", KeyboardKeyCNode)
	LiteGraph.registerNodeType("Keyboard/KeyboardKeyD", KeyboardKeyDNode)
	LiteGraph.registerNodeType("Keyboard/KeyboardKeyE", KeyboardKeyENode)
	LiteGraph.registerNodeType("Keyboard/KeyboardKeyF", KeyboardKeyFNode)
	LiteGraph.registerNodeType("Keyboard/KeyboardKeyG", KeyboardKeyGNode)
	LiteGraph.registerNodeType("Keyboard/KeyboardKeyH", KeyboardKeyHNode)
	LiteGraph.registerNodeType("Keyboard/KeyboardKeyI", KeyboardKeyINode)
	LiteGraph.registerNodeType("Keyboard/KeyboardKeyJ", KeyboardKeyJNode)
	LiteGraph.registerNodeType("Keyboard/KeyboardKeyK", KeyboardKeyKNode)
	LiteGraph.registerNodeType("Keyboard/KeyboardKeyL", KeyboardKeyLNode)
	LiteGraph.registerNodeType("Keyboard/KeyboardKeyM", KeyboardKeyMNode)
	LiteGraph.registerNodeType("Keyboard/KeyboardKeyN", KeyboardKeyNNode)
	LiteGraph.registerNodeType("Keyboard/KeyboardKeyO", KeyboardKeyONode)
	LiteGraph.registerNodeType("Keyboard/KeyboardKeyP", KeyboardKeyPNode)
	LiteGraph.registerNodeType("Keyboard/KeyboardKeyQ", KeyboardKeyQNode)
	LiteGraph.registerNodeType("Keyboard/KeyboardKeyR", KeyboardKeyRNode)
	LiteGraph.registerNodeType("Keyboard/KeyboardKeyS", KeyboardKeySNode)
	LiteGraph.registerNodeType("Keyboard/KeyboardKeyT", KeyboardKeyTNode)
	LiteGraph.registerNodeType("Keyboard/KeyboardKeyU", KeyboardKeyUNode)
	LiteGraph.registerNodeType("Keyboard/KeyboardKeyV", KeyboardKeyVNode)
	LiteGraph.registerNodeType("Keyboard/KeyboardKeyW", KeyboardKeyWNode)
	LiteGraph.registerNodeType("Keyboard/KeyboardKeyX", KeyboardKeyXNode)
	LiteGraph.registerNodeType("Keyboard/KeyboardKeyY", KeyboardKeyYNode)
	LiteGraph.registerNodeType("Keyboard/KeyboardKeyZ", KeyboardKeyZNode)
}