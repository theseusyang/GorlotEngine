function MeshStandardMaterial(options) {
	THREE.MeshStandardMaterial.call(this, options)

	this.nodes = {
		config: {},
		groups: [],
		last_link_id: 0,
		last_node_id: 1,
		links: [],
		nodes: [
			{
				flags: {},
				id: 1,
				mode: 0,
				inputs: [
					{
						name: "Colour",
						type: "Color",
						link: null
					},
					{
						name: "Emissive",
						type: "number",
						link: null
					},
					{
						name: "Reflectivity",
						type: "number",
						link: null
					},
					{
						name: "Shininess",
						type: "number",
						link: null
					},
					{
						name: "Specular",
						type: "Color",
						link: null
					},
					{
						name: "Wireframe",
						type: "Boolean",
						link: null
					}
				],
				outputs: [],
				pos: [208, 140],
				properties: {
					mat: this.uuid
				},
				size: [210, 382],
				type: "Material/MeshPhongMaterial"
			}
		],
		version: 0.4
	}
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