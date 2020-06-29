class MeshPhongMaterial extends THREE.MeshPhongMaterial {
	constructor(options) {
		super(options)
	}

	updateNodes(nodes, genesis) {
		this.nodes = {}
		this.nodes = nodes
	}

	toJSON(meta) {
		var data = THREE.Material.prototype.toJSON.call(this, meta)

		// TODO: Save nodes (The genesis creates and recreates itself again and again, delete that and make it to function)
		data.nodes = this.nodes

		return data
	}
}