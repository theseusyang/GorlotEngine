function MeshPhongMaterial(options) {
	THREE.MeshPhongMaterial.call(this, options)

	this.nodes = {}
}

MeshPhongMaterial.prototype = Object.create(THREE.MeshPhongMaterial.prototype);

MeshPhongMaterial.prototype.updateNodes = function(nodes) {
	this.nodes = {}
	this.nodes = nodes
}

MeshPhongMaterial.prototype.toJSON = function(meta) {
	var data = THREE.Material.prototype.toJSON.call(this, meta)

	data.nodes = this.nodes

	return data
}