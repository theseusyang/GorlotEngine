class MeshPhongMaterial extends THREE.MeshPhongMaterial {
	constructor() {
		super()
	
		this.nodes = {}
		this.json = {}
	}

	updateNodes(nodes) {
		this.nodes = nodes
	}
}