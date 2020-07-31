function MeshShaderMaterial(options) {
	THREE.ShaderMaterial.call(this, options)
}

MeshShaderMaterial.prototype = Object.create(THREE.ShaderMaterial.prototype)

MeshShaderMaterial.prototype.toJSON = function(meta) {
	var data = THREE.ShaderMaterial.prototype.toJSON.call(this, meta)

	data.nodes = this.nodes

	return data
}