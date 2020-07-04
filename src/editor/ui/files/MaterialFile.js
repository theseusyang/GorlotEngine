class MaterialFile extends File {
	constructor(name) {
		super(name)
	}

	attachMaterial(material) {
		if (material instanceof THREE.Material) {
			if (Editor.material_renderer !== undefined) {
				Editor.material_renderer.renderMaterial(material, this.img)
			}

			this.attachedTo = material
		}
	}
}