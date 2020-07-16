function MeshStandardMaterial(options) {
	THREE.MeshStandardMaterial.call(this, options)

	this.nodes = {}
}

MeshStandardMaterial.prototype = Object.create(THREE.MeshStandardMaterial.prototype);

MeshStandardMaterial.prototype.updateNodes = function(nodes) {
	this.nodes = {}
	this.nodes = nodes
}

MeshStandardMaterial.prototype.toJSON = function(meta) {
	var data = THREE.Material.prototype.toJSON.call(this, meta)

	data.nodes = this.nodes

	return data
}