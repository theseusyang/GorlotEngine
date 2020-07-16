function MeshNormalMaterial(options) {
	THREE.MeshNormalMaterial.call(this, options)

	this.nodes = {}
}

MeshNormalMaterial.prototype = Object.create(THREE.MeshNormalMaterial.prototype);

MeshNormalMaterial.prototype.updateNodes = function(nodes) {
	this.nodes = {}
	this.nodes = nodes
}

MeshNormalMaterial.prototype.toJSON = function(meta) {
	var data = THREE.Material.prototype.toJSON.call(this, meta)

	data.nodes = this.nodes

	return data
}