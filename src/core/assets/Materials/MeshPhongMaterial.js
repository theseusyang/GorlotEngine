class MeshPhongMaterial extends THREE.MeshPhongMaterial {
	constructor(options) {
		super(options)
	
		this.nodes = {}
		this.json = {}
		this.icon = "data/icons/misc/material.png"
	}

	updateNodes(nodes) {
		this.nodes = nodes
	}
}