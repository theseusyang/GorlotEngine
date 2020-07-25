function NodesHelper() {}

NodesHelper.sizes = {}
NodesHelper.sizes.small = [120, 26]

NodesHelper.titles = {}
NodesHelper.titles.event = "#FF0000"

NodesHelper.slots = {}

NodesHelper.slots.output = {pos: [105, 12]}
NodesHelper.slots.title_pos = {pos: [105, -10]}

NodesHelper.slots.event = {color_on: "#FFFFFF", color_off: "#FFFFFF", shape: LiteGraph.ARROW_SHAPE}
NodesHelper.slots.delegate = {color_on: "#FFC0CB", color_off: "#FFC0CB", shape: LiteGraph.BOX_SHAPE, ...NodesHelper.slots.title_pos}