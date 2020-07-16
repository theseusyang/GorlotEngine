function MeshLambertMaterial(options) {
	THREE.MeshLambertMaterial.call(this, options)

	this.nodes = {}
}

MeshLambertMaterial.prototype = Object.create(THREE.MeshLambertMaterial.prototype);

MeshLambertMaterial.prototype.updateNodes = function(nodes) {
	this.nodes = {}
	this.nodes = nodes
}

MeshLambertMaterial.prototype.toJSON = function(meta) {
	var data = THREE.Material.prototype.toJSON.call(this, meta)

	data.nodes = this.nodes

	return data
}