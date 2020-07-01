class ShaderMaterial extends THREE.ShaderMaterial {
	constructor(options) {
		super(options)
	
		this.nodes = {
			config: [],
			groups: [],
			last_link_id: 2,
			last_node_id: 3,
			links: [
				[1, 1, 0, 2, 0, "Material"],
				[2, 1, 0, 3, 0, "Material"]
			],
			nodes: [
				{
					flags: [],
					id: 1,
					inputs: [
						{
							link: null,
							name: "Colour",
							type: "Color"
						},
						{
							link: null,
							name: "Emissive",
							type: "number"
						},
						{
							link: null,
							name: "Reflectivity",
							type: "number"
						},
						{
							link: null,
							name: "Shininess",
							type: "number"
						},
						{
							link: null,
							name: "Specular",
							type: "Color"
						},
						{
							link: null,
							name: "Wireframe",
							type: "Boolean"
						}
					],
					mode: 0,
					order: 0,
					outputs: [
						{
							links: [1],
							name: "Material",
							type: "Material"
						}
					],
					pos: [310, 210],
					properties: {
						mat: this.uuid
					},
					size: [178, 126],
					type: "Material/MeshPhongMaterial"
				},
				{
					flags: [],
					id: 4,
					inputs: [{
						link: 1,
						name: "Material",
						type: "Material"
					}],
					mode: 0,
					order: 2,
					pos: [552, 176],
					properties: {ver: this.vertexShader, frag: this.fragmentShader},
					size: [140, 26],
					type: "Material/Shader"
				}
			],
			version: 0.4
		}
	}

	updateNodes(nodes) {
		this.nodes = {}
		this.nodes = nodes
	}

	getVertex() {
		return this.vertexShader
	}

	getFragment() {
		return this.fragmentShader
	}

	setVertex(v) {
		this.vertexShader = v
	}

	setFragment(f) {
		this.fragmentShader = f
	}

	toJSON(meta) {
		var data = THREE.ShaderMaterial.prototype.toJSON.call(this, meta)

		data.nodes = this.nodes

		return data
	}
}