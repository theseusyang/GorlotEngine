function ParticlesNode() {
	this.properties = {uuid: ""}
	this.addOutput("Particles", "Particles")
}
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
	this.setOutputData(0, obj)
}

function ParticlesSetBlendingNode() {
	this.addInput("Particles", "Particles")
	this.addInput("Blending", "number")
}
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

function ParticlesSetSizeNode() {
	this.addInput("Particles", "Particles")
	this.addInput("Size", "Array")
	this.addInput("Spread", "Array")
}
ParticlesSetSizeNode.title = "Size"
ParticlesSetSizeNode.prototype.onExecute = function() {
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
	LiteGraph.registerNodeType("Particles/ParticlesSetSize", ParticlesSetSizeNode)
	LiteGraph.registerNodeType("Particles/ParticlesSetRotation", ParticlesSetRotationNode)
	LiteGraph.registerNodeType("Particles/ParticlesSetColour", ParticlesSetColourNode)
}