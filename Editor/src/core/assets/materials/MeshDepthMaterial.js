function MeshDepthMaterial(options) {
	THREE.MeshDepthMaterial.call(this, options)

	this.nodes = {}
}

MeshDepthMaterial.prototype = Object.create(THREE.MeshDepthMaterial.prototype);

MeshDepthMaterial.prototype.updateNodes = function(nodes) {
	this.nodes = {}
	this.nodes = nodes
}

MeshDepthMaterial.prototype.toJSON = function(meta) {
	var data = THREE.Material.prototype.toJSON.call(this, meta)

	data.nodes = this.nodes

	return data
}