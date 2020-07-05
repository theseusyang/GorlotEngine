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
		p.updateValues()

		if (EditorUI.partEd !== undefined && EditorUI.partEd !== null) {
			EditorUI.partEd.particle_runtime.group.blending = p.group.blending
			EditorUI.partEd.particle_runtime.updateValues()
		}
	}
}

function ParticlesSetDirectionNode() {
	this.addInput("Particles", "Particles")
	this.properties = {direction: "Forward"}
}
ParticlesSetDirectionNode.title = "Direction"
ParticlesSetDirectionNode.prototype.onExecute = function() {
	var p = this.getInputData(0)
	var d = this.properties.direction

	if (p !== undefined && d !== undefined) {
		if (d !== "") {
			if (d === "Forward") {
				p.emitter.direction = 1
			} else if (d === "Backward") {
				p.emitter.direction = -1
			}

			if (EditorUI.partEd !== undefined && EditorUI.partEd !== null) {
				EditorUI.partEd.particle_runtime.emitter.direction = p.emitter.direction
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
		p.emitter.particleCount = c

		if (EditorUI.partEd !== undefined && EditorUI.partEd !== null) {
			EditorUI.partEd.particle_runtime.emitter.particleCount = c
		}
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

		if (EditorUI.partEd !== undefined && EditorUI.partEd !== null) {
			EditorUI.partEd.particle_runtime.emitter.duration = d
		}
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

		if (EditorUI.partEd !== undefined && EditorUI.partEd !== null) {
			EditorUI.partEd.particle_runtime.emitter.type = t
		}
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

		if (EditorUI.partEd !== undefined && EditorUI.partEd !== null) {
			if (a !== undefined) {
				EditorUI.partEd.maxAge.value = a
			}
			if (s !== undefined) {
				EditorUI.partEd.maxAge.spread = s
			}
		}
	}
}

function registerParticlesParticlesNodes() {
	LiteGraph.registerNodeType("Particles/Particles", ParticlesNode)
	LiteGraph.registerNodeType("Particles/ParticlesSetBlending", ParticlesSetBlendingNode)
	LiteGraph.registerNodeType("Particles/ParticlesSetDirection", ParticlesSetDirectionNode)
	LiteGraph.registerNodeType("Particles/ParticlesSetCount", ParticlesSetCountNode)
	LiteGraph.registerNodeType("Particles/ParticlesSetDuration", ParticlesSetDurationNode)
	LiteGraph.registerNodeType("Particles/ParticlesSetEmitterType", ParticlesSetEmitterTypeNode)
	LiteGraph.registerNodeType("Particles/ParticlesSetMaxAge", ParticlesSetMaxAgeNode)
}