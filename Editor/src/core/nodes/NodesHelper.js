function NodesHelper() {}

// Nodes sizes
NodesHelper.sizes = {}
NodesHelper.sizes.small = [120, 26]
NodesHelper.sizes.medium = [180, 46]
NodesHelper.sizes.big = [220, 66]
NodesHelper.sizes.large = [280, 86]

// Nodes titles
NodesHelper.titles = {}
NodesHelper.titles.event = "#FF0000"
NodesHelper.titles.inheritance = "#556B2f"

// Nodes slots
NodesHelper.slots = {}

// Standalone positions
NodesHelper.slots.position = {}

// For inputs
NodesHelper.slots.position.x = 20
NodesHelper.slots.position.y = 12

NodesHelper.slots.position.y_second = 30 // For the second input
NodesHelper.slots.position.y_third = 48 // For the third input

// For outputs
NodesHelper.slots.position.x1 = 105
NodesHelper.slots.position.y1 = 12

// Colours
NodesHelper.slots.colours = {}

NodesHelper.slots.colours.event = "#FFFFFF"
NodesHelper.slots.colours.passer = "#FFC0CB"
NodesHelper.slots.colours.element = "#00BFFF"
NodesHelper.slots.colours.array = "#9400D3"
NodesHelper.slots.colours.string = "#FF1493"
NodesHelper.slots.colours.number = "#7ef48f"

// Slots
NodesHelper.slots.event = {color_on: NodesHelper.slots.colours.event, color_off: NodesHelper.slots.colours.event, shape: LiteGraph.ARROW_SHAPE}
NodesHelper.slots.passer = {color_on: NodesHelper.slots.colours.passer, color_off: NodesHelper.slots.colours.passer, shape: LiteGraph.BOX_SHAPE}
NodesHelper.slots.object = {color_on: NodesHelper.slots.colours.element, color_off: NodesHelper.slots.colours.element}
NodesHelper.slots.array = {color_on: NodesHelper.slots.colours.array, color_off: NodesHelper.slots.colours.array}
NodesHelper.slots.string = {color_on: NodesHelper.slots.colours.string, color_off: NodesHelper.slots.colours.string}
NodesHelper.slots.number = {color_on: NodesHelper.slots.colours.number, color_off: NodesHelper.slots.colours.number}

// Input slots
NodesHelper.slots.input = {}
NodesHelper.slots.input.position = {pos: [NodesHelper.slots.position.x, 12]}

NodesHelper.slots.input.event = {...NodesHelper.slots.event, ...NodesHelper.slots.input.position}

// Output slots
NodesHelper.slots.output = {}
NodesHelper.slots.output.position = {pos: [NodesHelper.slots.position.x1, 12]}
NodesHelper.slots.output.title_pos = {pos: [NodesHelper.slots.position.x1, -10]}

NodesHelper.slots.output.event = {...NodesHelper.slots.event, ...NodesHelper.slots.output.position}
NodesHelper.slots.output.passer = {...NodesHelper.slots.passer, shape: LiteGraph.BOX_SHAPE, ...NodesHelper.slots.output.title_pos}

// Functions

// The Slot Menu
NodesHelper.getSlotMenuOptions = function(s, e) {
	if (s.output !== undefined) {
		var c = new LiteGraph.ContextMenu([
			{
				title: "Convert to Variable",
				callback: () => {
					var graph = LGraphCanvas.active_canvas.graph
					console.log(graph)
				}	
			}
		], {title: s.output.name, event: e})
	}
}