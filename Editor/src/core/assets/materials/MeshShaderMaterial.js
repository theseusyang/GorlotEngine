function MeshShaderMaterial(options) {
	THREE.ShaderMaterial.call(this, options)

	this.nodes = {}
}

MeshShaderMaterial.prototype = Object.create(THREE.ShaderMaterial.prototype);

MeshShaderMaterial.prototype.updateNodes = function(nodes) {
	this.nodes = {}
	this.nodes = nodes
}

MeshShaderMaterial.prototype.toJSON = function(meta) {
	var data = THREE.ShaderMaterial.prototype.toJSON.call(this, meta)

	data.nodes = this.nodes

	return data
}