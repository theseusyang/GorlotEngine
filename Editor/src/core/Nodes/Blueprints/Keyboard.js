function KeyboardNode() {
	this.addInput("Key", "Key")

	this.addOutput("Is pressed", "Boolean")
	this.addOutput("Is Just Pressed", "Boolean")
	this.addOutput("Is Just Released", "Boolean")
}
KeyboardNode.title = "Keyboard"
KeyboardNode.prototype.onExecute = function() {
	var k = this.getInputData(0)

	if (Keyboard.isKeyPressed(k)) {
		this.setOutputData(0, true)
	} else {
		this.setOutputData(0, false)
	}

	if (Keyboard.isKeyJustPressed(k)) {
		this.setOutputData(1, true)
	} else {
		this.setOutputData(1, false)
	}

	if (Keyboard.isKeyJustReleased(k)) {
		this.setOutputData(2, true)
	} else {
		this.setOutputData(2, false)
	}

}

function KeyboardKeyANode() {
	this.addOutput("\"A\" Key", "Key")
}
KeyboardKeyANode.title = "A"
KeyboardKeyANode.prototype.onExecute = function() {
	this.setOutputData(0, Keyboard.A)
}

function KeyboardKeyBNode() {
	this.addOutput("\"B\" Key", "Key")
}
KeyboardKeyBNode.title = "B"
KeyboardKeyBNode.prototype.onExecute = function() {
	this.setOutputData(0, Keyboard.B)
}

function KeyboardKeyCNode() {
	this.addOutput("\"C\" Key", "Key")
}
KeyboardKeyCNode.title = "C"
KeyboardKeyCNode.prototype.onExecute = function() {
	this.setOutputData(0, Keyboard.C)
}

function KeyboardKeyDNode() {
	this.addOutput("\"D\" Key", "Key")
}
KeyboardKeyDNode.title = "D"
KeyboardKeyDNode.prototype.onExecute = function() {
	this.setOutputData(0, Keyboard.D)
}

function KeyboardKeyENode() {
	this.addOutput("\"E\" Key", "Key")
}
KeyboardKeyENode.title = "E"
KeyboardKeyENode.prototype.onExecute = function() {
	this.setOutputData(0, Keyboard.E)
}

function KeyboardKeyFNode() {
	this.addOutput("\"F\" Key", "Key")
}
KeyboardKeyFNode.title = "F"
KeyboardKeyFNode.prototype.onExecute = function() {
	this.setOutputData(0, Keyboard.F)
}

function KeyboardKeyGNode() {
	this.addOutput("\"G\" Key", "Key")
}
KeyboardKeyGNode.title = "G"
KeyboardKeyGNode.prototype.onExecute = function() {
	this.setOutputData(0, Keyboard.G)
}

function KeyboardKeyHNode() {
	this.addOutput("\"H\" Key", "Key")
}
KeyboardKeyHNode.title = "H"
KeyboardKeyHNode.prototype.onExecute = function() {
	this.setOutputData(0, Keyboard.H)
}

function KeyboardKeyINode() {
	this.addOutput("\"H\" Key", "Key")
}
KeyboardKeyINode.title = "I"
KeyboardKeyINode.prototype.onExecute = function() {
	this.setOutputData(0, Keyboard.I)
}

function KeyboardKeyJNode() {
	this.addOutput("\"J\" Key", "Key")
}
KeyboardKeyJNode.title = "J"
KeyboardKeyJNode.prototype.onExecute = function() {
	this.setOutputData(0, Keyboard.J)
}

function KeyboardKeyKNode() {
	this.addOutput("\"K\" Key", "Key")
}
KeyboardKeyKNode.title = "K"
KeyboardKeyKNode.prototype.onExecute = function() {
	this.setOutputData(0, Keyboard.K)
}

function KeyboardKeyLNode() {
	this.addOutput("\"L\" Key", "Key")
}
KeyboardKeyLNode.title = "L"
KeyboardKeyLNode.prototype.onExecute = function() {
	this.setOutputData(0, Keyboard.L)
}

function KeyboardKeyMNode() {
	this.addOutput("\"M\" Key", "Key")
}
KeyboardKeyMNode.title = "M"
KeyboardKeyMNode.prototype.onExecute = function() {
	this.setOutputData(0, Keyboard.M)
}

function KeyboardKeyNNode() {
	this.addOutput("\"N\" Key", "Key")
}
KeyboardKeyNNode.title = "N"
KeyboardKeyNNode.prototype.onExecute = function() {
	this.setOutputData(0, Keyboard.N)
}

function KeyboardKeyONode() {
	this.addOutput("\"O\" Key", "Key")
}
KeyboardKeyONode.title = "O"
KeyboardKeyONode.prototype.onExecute = function() {
	this.setOutputData(0, Keyboard.O)
}

function KeyboardKeyPNode() {
	this.addOutput("\"P\" Key", "Key")
}
KeyboardKeyPNode.title = "P"
KeyboardKeyPNode.prototype.onExecute = function() {
	this.setOutputData(0, Keyboard.P)
}

function KeyboardKeyQNode() {
	this.addOutput("\"Q\" Key", "Key")
}
KeyboardKeyQNode.title = "Q"
KeyboardKeyQNode.prototype.onExecute = function() {
	this.setOutputData(0, Keyboard.Q)
}

function KeyboardKeyRNode() {
	this.addOutput("\"R\" Key", "Key")
}
KeyboardKeyRNode.title = "R"
KeyboardKeyRNode.prototype.onExecute = function() {
	this.setOutputData(0, Keyboard.R)
}

function KeyboardKeySNode() {
	this.addOutput("\"S\" Key", "Key")
}
KeyboardKeySNode.title = "S"
KeyboardKeySNode.prototype.onExecute = function() {
	this.setOutputData(0, Keyboard.S)
}

function KeyboardKeyTNode() {
	this.addOutput("\"T\" Key", "Key")
}
KeyboardKeyTNode.title = "T"
KeyboardKeyTNode.prototype.onExecute = function() {
	this.setOutputData(0, Keyboard.T)
}

function KeyboardKeyUNode() {
	this.addOutput("\"U\" Key", "Key")
}
KeyboardKeyUNode.title = "U"
KeyboardKeyUNode.prototype.onExecute = function() {
	this.setOutputData(0, Keyboard.U)
}

function KeyboardKeyVNode() {
	this.addOutput("\"V\" Key", "Key")
}
KeyboardKeyVNode.title = "V"
KeyboardKeyVNode.prototype.onExecute = function() {
	this.setOutputData(0, Keyboard.V)
}

function KeyboardKeyWNode() {
	this.addOutput("\"W\" Key", "Key")
}
KeyboardKeyWNode.title = "W"
KeyboardKeyWNode.prototype.onExecute = function() {
	this.setOutputData(0, Keyboard.W)
}

function KeyboardKeyXNode() {
	this.addOutput("\"X\" Key", "Key")
}
KeyboardKeyXNode.title = "X"
KeyboardKeyXNode.prototype.onExecute = function() {
	this.setOutputData(0, Keyboard.X)
}

function KeyboardKeyYNode() {
	this.addOutput("\"Y\" Key", "Key")
}
KeyboardKeyYNode.title = "Y"
KeyboardKeyYNode.prototype.onExecute = function() {
	this.setOutputData(0, Keyboard.Y)
}

function KeyboardKeyZNode() {
	this.addOutput("\"Z\" Key", "Key")
}
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