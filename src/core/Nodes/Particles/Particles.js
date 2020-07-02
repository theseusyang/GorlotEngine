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
ParticlesSetBlendingNode.title = "Set Blending"
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
ParticlesSetDirectionNode.title = "Set Direction"
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
		// TODO: This
	}
}

function registerParticlesParticlesNodes() {
	LiteGraph.registerNodeType("Particles/Particles", ParticlesNode)
	LiteGraph.registerNodeType("Particles/ParticlesSetBlending", ParticlesSetBlendingNode)
	LiteGraph.registerNodeType("Particles/ParticlesSetDirection", ParticlesSetDirectionNode)
	LiteGraph.registerNodeType("Particles/ParticlesSetCount", ParticlesSetCountNode)
}