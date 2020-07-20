function JSONNode() {
        this.addOutput("JSON", "JSON")
}
JSONNode.title_color = NodesHelper.colours.azure[0]
JSONNode.title_color1 = NodesHelper.colours.azure[1]
JSONNode.title_color2 = NodesHelper.colours.azure[2]
JSONNode.title_text_color = NodesHelper.title_colours.white
JSONNode.title = "JSON"
JSONNode.prototype.onGetInputs = function() {
        return [["Item", "JSONElement"]]
}
JSONNode.prototype.onExecute = function () {
        var j = {}
        if(this.inputs) {
                // TODO: Clean this code
                for(var i = 0; i < this.inputs.length; i++) {
                        var input = this.getInputData(i)
                        var name = input[0]
                                
                        if(name !== undefined) {
                                var value = input[1]
                                j[name] = value
                        }
                }

                this.setOutputData(0, JSON.stringify(j))
        }
}

function JSONElementNode() {
        this.properties = {name: "", value: 0}

        this.addInput("Name", "Text")
        this.addInput("Value")

        this.addOutput("Element", "JSONElement")
        this.widget = this.addWidget("text", "Name", "", "name")
}
JSONElementNode.title_color = NodesHelper.colours.azure[0]
JSONElementNode.title_color1 = NodesHelper.colours.azure[1]
JSONElementNode.title_color2 = NodesHelper.colours.azure[2]
JSONElementNode.title = "Element"
JSONElementNode.prototype.onExecute = function() {
        var n = this.getInputData(0)
        var v = this.getInputData(1)

        if(n === undefined) {
                n = this.properties.name
        }

        var val = [n, v]
        this.setOutputData(0, val)
}

function JSONParseNode() {
        this.addInput("Stringified", "JSON")
        this.addOutput("Parsed", "JSON")
}
JSONParseNode.title_color = NodesHelper.colours.azure[0]
JSONParseNode.title_color1 = NodesHelper.colours.azure[1]
JSONParseNode.title_color2 = NodesHelper.colours.azure[2]
JSONParseNode.title = "Parse"
JSONParseNode.prototype.onExecute = function() {
        var j = this.getInputData(0)

        if (j !== undefined) {
                this.setOutputData(0, JSON.parse(j))
        }
}

function registerJSONNodes() {
        LiteGraph.registerNodeType("JSON/JSON", JSONNode)
        LiteGraph.registerNodeType("JSON/Element", JSONElementNode)
        LiteGraph.registerNodeType("JSON/Parse", JSONParseNode)
}
