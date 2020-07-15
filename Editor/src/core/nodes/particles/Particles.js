function ParticlesNode() {
	this.properties = {uuid: ""}

	this.addInput("Direction", "Text")
	this.addInput("Count", "number")
	this.addInput("Rate", "number")
	this.addInput("Duration", "number")
	this.addInput("Wiggle", "number")

	this.setProperty("direction", "Forward")
	this.setProperty("directions", "Backward;Forward")

	this.setProperty("count", 2000)
	this.setProperty("rate", 2000)

	this.setProperty("duration", 0)
	this.setProperty("wiggle", 0)

	var self = this
	this.widget = this.addWidget("combo", "Direction", this.properties.direction, (v) => {
		self.properties.direction = v
	}, {property: "direction", values: this.properties.directions.split(";")})

	this.count = this.addWidget("number", "Count", this.properties.count, "count")
	this.rate = this.addWidget("slider", "Rate", this.properties.rate, (v) => {self.properties.rate = v}, {value: this.properties.rate, min: 0, max: this.properties.count})
	this.duration = this.addWidget("number", "Duration", this.properties.duration, "duration")
	this.wiggle = this.addWidget("number", "Wiggle", this.properties.wiggle, "wiggle")

	this.addOutput("Particles", "Particles")
}
ParticlesNode.prototype.onPropertyChanged = function(n, v) {
	if (n === "direction") {
		if (this.graph && this.graph.onNodeConnectionChange) {
        	this.graph.onNodeConnectionChange()
    	}
	}
	if (n === "count") {
		if (this.rate !== undefined) {
			this.rate.options.max = v
		}
	}
	if (n === "rate") {
		if (this.rate !== undefined) {
			this.rate.value = v
		}
	}
}
ParticlesNode.prototype.onMouseUp = function(e, pos) {
	if (this.graph && this.graph.onNodeConnectionChange) {
        this.graph.onNodeConnectionChange()
    }
}
ParticlesNode.title_color = NodesHelper.colours.royalblue[0]
ParticlesNode.title_color1 = NodesHelper.colours.royalblue[1]
ParticlesNode.title_color2 = NodesHelper.colours.royalblue[1]
ParticlesNode.title_text_color = NodesHelper.title_colours.white
ParticlesNode.title = "Particles"
ParticlesNode.prototype.onExecute = function() {
	var uuid = this.properties.uuid

	if (Editor.program === undefined || Editor.program === null) {
		if (Main.program === null || Main.program === undefined) {
			return
		} else {
			var obj = Main.program.getObjectByProperty("uuid", uuid)
		}
	} else {
		var obj = Editor.program.getObjectByProperty("uuid", uuid)
	}

	if(obj !== undefined) {
		var d = this.getInputData(0)
		var c = this.getInputData(1)
		var r = this.getInputData(2)
		var du = this.getInputData(3)
		var w = this.getInputData(4)

		if (d !== undefined) {
			if (d !== "") {
				if (d === "Forward") {
					obj.emitter.direction = 1
				} else if (d === "Backward") {
					obj.emitter.direction = -1
				}
			}
		} else {
			if (this.properties["direction"] !== "") {
				if (this.properties["direction"] === "Forward") {
					obj.emitter.direction = 1
				} else if (this.properties["direction"] === "Backward") {
					obj.emitter.direction = -1
				}
			}
		}

		if (c !== undefined) {
			obj.emitter.maxParticleCount = c
		} else {
			obj.emitter.maxParticleCount = parseInt(this.properties["count"])
		}

		if (r !== undefined) {
			obj.emitter.particleCount = r
		} else {
			obj.emitter.particleCount = parseInt(this.properties["rate"])
		}

		if (du !== undefined) {
			if (du < 0.00001) {
				du = null
			}
			obj.emitter.duration = du
		} else {
			du = this.properties["duration"]

			if (du < 0.00001) {
				du = null
			}
			obj.emitter.duration = du
		}

		if (w !== undefined) {
			obj.emitter.wiggle = w
		} else {
			obj.emitter.wiggle = this.properties["wiggle"]
		}

		this.setOutputData(0, obj)
	}
}

function ParticlesSetBlendingNode() {
	this.addInput("Particles", "Particles")
	this.addInput("Blending", "number")
}
ParticlesSetBlendingNode.title_color = NodesHelper.colours.royalblue[0]
ParticlesSetBlendingNode.title_color1 = NodesHelper.colours.royalblue[1]
ParticlesSetBlendingNode.title_color2 = NodesHelper.colours.royalblue[1]
ParticlesSetBlendingNode.title_text_color = NodesHelper.title_colours.white
ParticlesSetBlendingNode.title = "Blending"
ParticlesSetBlendingNode.prototype.onExecute = function() {
	var p = this.getInputData(0)
	var b = this.getInputData(1)

	if (p !== undefined && b !== undefined) {
		p.group.blending = b
	}
}

function ParticlesSetDirectionNode() {
	this.addInput("Particles", "Particles")
	this.addInput("Direction", "Text")
}
ParticlesSetDirectionNode.title_color = NodesHelper.colours.royalblue[0]
ParticlesSetDirectionNode.title_color1 = NodesHelper.colours.royalblue[1]
ParticlesSetDirectionNode.title_color2 = NodesHelper.colours.royalblue[1]
ParticlesSetDirectionNode.title_text_color = NodesHelper.title_colours.white
ParticlesSetDirectionNode.title = "Direction"
ParticlesSetDirectionNode.prototype.onExecute = function() {
	var p = this.getInputData(0)
	var d = this.getInputData(1)

	if (p !== undefined && d !== undefined) {
		if (d !== "") {
			if (d === "Forward") {
				p.emitter.direction = 1
			} else if (d === "Backward") {
				p.emitter.direction = -1
			}
		}
	}
}

function ParticlesSetCountNode() {
	this.addInput("Particles", "Particles")
	this.addInput("Count", "number")
}
ParticlesSetCountNode.title_color = NodesHelper.colours.royalblue[0]
ParticlesSetCountNode.title_color1 = NodesHelper.colours.royalblue[1]
ParticlesSetCountNode.title_color2 = NodesHelper.colours.royalblue[1]
ParticlesSetCountNode.title_text_color = NodesHelper.title_colours.white
ParticlesSetCountNode.title = "Count"
ParticlesSetCountNode.prototype.onExecute = function() {
	var p = this.getInputData(0)
	var c = this.getInputData(1)

	if (p !== undefined && c !== undefined) {
		p.group.maxParticleCount = c
	}
}

function ParticlesSetRateNode() {
	this.addInput("Particles", "Particles")
	this.addInput("Rate", "number")
}
ParticlesSetRateNode.title_color = NodesHelper.colours.royalblue[0]
ParticlesSetRateNode.title_color1 = NodesHelper.colours.royalblue[1]
ParticlesSetRateNode.title_color2 = NodesHelper.colours.royalblue[1]
ParticlesSetRateNode.title_text_color = NodesHelper.title_colours.white
ParticlesSetRateNode.title = "Rate"
ParticlesSetRateNode.prototype.onExecute = function() {
	var p = this.getInputData(0)
	var c = this.getInputData(1)

	if (p !== undefined && c !== undefined) {
		p.emitter.particleCount = c
	}
}

function ParticlesSetDurationNode() {
	this.addInput("Particles", "Particles")
	this.addInput("Duration", "number")
}
ParticlesSetDurationNode.title_color = NodesHelper.colours.royalblue[0]
ParticlesSetDurationNode.title_color1 = NodesHelper.colours.royalblue[1]
ParticlesSetDurationNode.title_color2 = NodesHelper.colours.royalblue[1]
ParticlesSetDurationNode.title_text_color = NodesHelper.title_colours.white
ParticlesSetDurationNode.title = "Duration"
ParticlesSetDurationNode.prototype.onExecute = function() {
	var p = this.getInputData(0)
	var d = this.getInputData(1)

	if (p !== undefined && d !== undefined) {
		if (d === 0) {
			d = null
		}
		p.emitter.duration = d
	}
}

function ParticlesSetEmitterTypeNode() {
	this.addInput("Particles", "Particles")
	this.addInput("Type", "number")
}
ParticlesSetEmitterTypeNode.title_color = NodesHelper.colours.royalblue[0]
ParticlesSetEmitterTypeNode.title_color1 = NodesHelper.colours.royalblue[1]
ParticlesSetEmitterTypeNode.title_color2 = NodesHelper.colours.royalblue[1]
ParticlesSetEmitterTypeNode.title_text_color = NodesHelper.title_colours.white
ParticlesSetEmitterTypeNode.title = "Emitter Type"
ParticlesSetEmitterTypeNode.prototype.onExecute = function() {
	var p = this.getInputData(0)
	var t = this.getInputData(1)

	if (p !== undefined && t !== undefined) {
		p.emitter.type = t
	}
}

function ParticlesSetMaxAgeNode() {
	this.addInput("Particles", "Particles")
	this.addInput("Age", "number")
	this.addInput("Spread", "number")
}
ParticlesSetMaxAgeNode.title_color = NodesHelper.colours.royalblue[0]
ParticlesSetMaxAgeNode.title_color1 = NodesHelper.colours.royalblue[1]
ParticlesSetMaxAgeNode.title_color2 = NodesHelper.colours.royalblue[1]
ParticlesSetMaxAgeNode.title_text_color = NodesHelper.title_colours.white
ParticlesSetMaxAgeNode.title = "Max Age"
ParticlesSetMaxAgeNode.prototype.onExecute = function() {
	var p = this.getInputData(0)
	var a = this.getInputData(1)
	var s = this.getInputData(2)

	if (p !== undefined) {
		if (a !== undefined) {
			p.emitter.maxAge.value = a
		}
		if (s !== undefined) {
			p.emitter.maxAge.spread = s
		}
	}
}

function ParticlesSetPositionNode() {
	this.addInput("Particles", "Particles")
	this.addInput("Position", "Vector")
	this.addInput("Spread", "Vector")
}
ParticlesSetPositionNode.title_color = NodesHelper.colours.royalblue[0]
ParticlesSetPositionNode.title_color1 = NodesHelper.colours.royalblue[1]
ParticlesSetPositionNode.title_color2 = NodesHelper.colours.royalblue[1]
ParticlesSetPositionNode.title_text_color = NodesHelper.title_colours.white
ParticlesSetPositionNode.title = "Position"
ParticlesSetPositionNode.prototype.onExecute = function() {
	var p = this.getInputData(0)
	var v = this.getInputData(1)
	var s = this.getInputData(2)

	if (p !== undefined && v !== undefined) {
		p.emitter.position.value.copy(v)

		if(s !== undefined) {
			p.emitter.position.spread.copy(s)
		}
	}
}

function ParticlesSetVelocityNode() {
	this.addInput("Particles", "Particles")
	this.addInput("Velocity", "Vector")
	this.addInput("Spread", "Vector")
}
ParticlesSetVelocityNode.title_color = NodesHelper.colours.royalblue[0]
ParticlesSetVelocityNode.title_color1 = NodesHelper.colours.royalblue[1]
ParticlesSetVelocityNode.title_color2 = NodesHelper.colours.royalblue[1]
ParticlesSetVelocityNode.title_text_color = NodesHelper.title_colours.white
ParticlesSetVelocityNode.title = "Velocity"
ParticlesSetVelocityNode.prototype.onExecute = function() {
	var p = this.getInputData(0)
	var v = this.getInputData(1)
	var s = this.getInputData(2)

	if (p !== undefined && v !== undefined) {
		p.emitter.velocity.value.copy(v)

		if (s !== undefined) {
			p.emitter.velocity.spread.copy(v)
		}
	}
}

function ParticlesSetAccelerationNode() {
	this.addInput("Particles", "Particles")
	this.addInput("Acceleration", "Vector")
	this.addInput("Spread", "Vector")
}
ParticlesSetAccelerationNode.title_color = NodesHelper.colours.royalblue[0]
ParticlesSetAccelerationNode.title_color1 = NodesHelper.colours.royalblue[1]
ParticlesSetAccelerationNode.title_color2 = NodesHelper.colours.royalblue[1]
ParticlesSetAccelerationNode.title_text_color = NodesHelper.title_colours.white
ParticlesSetAccelerationNode.title = "Acceleration"
ParticlesSetAccelerationNode.prototype.onExecute = function() {
	var p = this.getInputData(0)
	var a = this.getInputData(1)
	var s = this.getInputData(2)

	if (p !== undefined && a !== undefined) {
		p.emitter.acceleration.value.copy(a)

		if (s !== undefined) {
			p.emitter.acceleration.spread.copy(s)
		}
	}
}

function ParticlesSetWiggleNode() {
	this.addInput("Particles", "Particles")
	this.addInput("Wiggle", "number")
	this.addInput("Spread", "number")
}
ParticlesSetWiggleNode.title_color = NodesHelper.colours.royalblue[0]
ParticlesSetWiggleNode.title_color1 = NodesHelper.colours.royalblue[1]
ParticlesSetWiggleNode.title_color2 = NodesHelper.colours.royalblue[1]
ParticlesSetWiggleNode.title_text_color = NodesHelper.title_colours.white
ParticlesSetWiggleNode.title = "Wiggle"
ParticlesSetWiggleNode.prototype.onExecute = function() {
	var p = this.getInputData(0)
	var w = this.getInputData(1)
	var s = this.getInputData(2)

	if (p !== undefined && w !== undefined) {
		p.emitter.wiggle.value = w

		if (s !== undefined) {
			p.emitter.wiggle.spread = s
		}
	}
}

function ParticlesSetOpacityNode() {
	this.addInput("Particles", "Particles")
	this.addInput("Opacity", "Array")
	this.addInput("Spread", "Array")
}
ParticlesSetOpacityNode.title_color = NodesHelper.colours.royalblue[0]
ParticlesSetOpacityNode.title_color1 = NodesHelper.colours.royalblue[1]
ParticlesSetOpacityNode.title_color2 = NodesHelper.colours.royalblue[1]
ParticlesSetOpacityNode.title_text_color = NodesHelper.title_colours.white
ParticlesSetOpacityNode.title = "Opacity"
ParticlesSetOpacityNode.prototype.onExecute = function() {
	var p = this.getInputData(0)
	var o = this.getInputData(1)
	var s = this.getInputData(2)

	if (p !== undefined) {
		if(o !== undefined) {
			o.forEach((item, index) => {
				p.emitter.opacity.value[index] = item
			})
		}
		if (s !== undefined) {
			s.forEach((item, index) => {
				p.emitter.opacity.spread[index] = item
			})
		}
	}
}

function ParticlesSetScaleNode() {
	this.addInput("Particles", "Particles")
	this.addInput("Scale", "Array")
	this.addInput("Spread", "Array")
}
ParticlesSetScaleNode.title_color = NodesHelper.colours.royalblue[0]
ParticlesSetScaleNode.title_color1 = NodesHelper.colours.royalblue[1]
ParticlesSetScaleNode.title_color2 = NodesHelper.colours.royalblue[1]
ParticlesSetScaleNode.title_text_color = NodesHelper.title_colours.white
ParticlesSetScaleNode.title = "Scale"
ParticlesSetScaleNode.prototype.onExecute = function() {
	var particles = this.getInputData(0)
	var size = this.getInputData(1)
	var spread = this.getInputData(2)

	if (particles !== undefined) {
		if (size !== undefined) {
			size.forEach((item, index) => {
				particles.emitter.size.value[index] = item
			})
		}
		if (spread !== undefined) {
			spread.forEach((item, index) => {
				particles.emitter.size.spread[index] = item
			})
		}
	}
}

function ParticlesSetRotationNode() {
	this.addInput("Particles", "Particles")
	this.addInput("Rotation", "Array")
	this.addInput("Spread", "Array")
}
ParticlesSetRotationNode.title_color = NodesHelper.colours.royalblue[0]
ParticlesSetRotationNode.title_color1 = NodesHelper.colours.royalblue[1]
ParticlesSetRotationNode.title_color2 = NodesHelper.colours.royalblue[1]
ParticlesSetRotationNode.title_text_color = NodesHelper.title_colours.white
ParticlesSetRotationNode.title = "Rotation"
ParticlesSetRotationNode.prototype.onExecute = function() {
	var p = this.getInputData(0)
	var r = this.getInputData(1)
	var s = this.getInputData(2)

	if (p !== undefined) {
		if (r !== undefined) {
			r.forEach((item, index) => {
				p.emitter.angle.value[index] = item
			})
		}
		if (s !== undefined) {
			s.forEach((item, index) => {
				p.emitter.angle.spread[index] = item
			})
		}
	}
}

function ParticlesSetColourNode() {
	this.addInput("Particles", "Particles")
	this.addInput("Colour", "Array")
	this.addInput("Spread", "Array")
}
ParticlesSetColourNode.title_color = NodesHelper.colours.royalblue[0]
ParticlesSetColourNode.title_color1 = NodesHelper.colours.royalblue[1]
ParticlesSetColourNode.title_color2 = NodesHelper.colours.royalblue[1]
ParticlesSetColourNode.title_text_color = NodesHelper.title_colours.white
ParticlesSetColourNode.title = "Colour"
ParticlesSetColourNode.prototype.onExecute = function() {
	var p = this.getInputData(0)
	var c = this.getInputData(1)
	var s = this.getInputData(2)

	if (p !== undefined) {
		if (c !== undefined) {
			c.forEach((item, index) => {
				if (item instanceof THREE.Color) {
					p.emitter.color.value[index].r = item.r
					p.emitter.color.value[index].g = item.g
					p.emitter.color.value[index].b = item.b
				}
			})
		}
		if (s !== undefined) {
			s.forEach((item, index) => {
				if (item instanceof THREE.Color) {
					p.emitter.color.spread[index].x = item.r
					p.emitter.color.spread[index].y = item.g
					p.emitter.color.spread[index].z = item.b
				}
			})
		}
	}
}

function registerParticlesParticlesNodes() {
	LiteGraph.registerNodeType("Particles/Particles", ParticlesNode)
	LiteGraph.registerNodeType("Particles/ParticlesSetBlending", ParticlesSetBlendingNode)
	LiteGraph.registerNodeType("Particles/ParticlesSetDirection", ParticlesSetDirectionNode)
	LiteGraph.registerNodeType("Particles/ParticlesSetCount", ParticlesSetCountNode)
	LiteGraph.registerNodeType("Particles/ParticlesSetRate", ParticlesSetRateNode)
	LiteGraph.registerNodeType("Particles/ParticlesSetDuration", ParticlesSetDurationNode)
	LiteGraph.registerNodeType("Particles/ParticlesSetEmitterType", ParticlesSetEmitterTypeNode)
	LiteGraph.registerNodeType("Particles/ParticlesSetMaxAge", ParticlesSetMaxAgeNode)
	LiteGraph.registerNodeType("Particles/ParticlesSetPosition", ParticlesSetPositionNode)
	LiteGraph.registerNodeType("Particles/ParticlesSetVelocity", ParticlesSetVelocityNode)
	LiteGraph.registerNodeType("Particles/ParticlesSetAcceleration", ParticlesSetAccelerationNode)
	LiteGraph.registerNodeType("Particles/ParticlesSetWiggle", ParticlesSetWiggleNode)
	LiteGraph.registerNodeType("Particles/ParticlesSetOpacity", ParticlesSetOpacityNode)
	LiteGraph.registerNodeType("Particles/ParticlesSetScale", ParticlesSetScaleNode)
	LiteGraph.registerNodeType("Particles/ParticlesSetRotation", ParticlesSetRotationNode)
	LiteGraph.registerNodeType("Particles/ParticlesSetColour", ParticlesSetColourNode)
}