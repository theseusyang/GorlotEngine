class MeshPhongMaterial extends THREE.MeshPhongMaterial {
	constructor(options) {
		super(options)

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
					outputs: [{
						name: "Material",
						type: "Material",
						links: null
					}],
					pos: [208, 140],
					properties: {
						mat: this
					},
					size: [178, 126],
					type: "Material/MeshPhongMaterial"
				}
			],
			version: 0.4
		}

	}

	updateNodes(nodes) {
		this.nodes = {}
		this.nodes = nodes
	}

	toJSON(meta) {
		var data = THREE.Material.prototype.toJSON.call(this, meta)

		// TODO: Save nodes (The genesis creates and recreates itself again and again, delete that and make it to function)
		data.nodes = this.nodes

		return data
	}
}