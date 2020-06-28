class MeshPhongMaterial extends THREE.MeshPhongMaterial {
	constructor() {
		super()
	
		this.nodes = {}
	}

	updateNodes(nodes) {
		this.nodes = nodes
	}
}