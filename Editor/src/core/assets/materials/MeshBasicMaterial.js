function MeshBasicMaterial(options) {
	THREE.MeshBasicMaterial.call(this, options)
}

MeshBasicMaterial.prototype = Object.create(THREE.MeshBasicMaterial.prototype)

MeshBasicMaterial.prototype.toJSON = function(meta) {
	var data = THREE.Material.prototype.toJSON.call(this, meta)

	data.nodes = this.nodes

	return data
}