class Skeleton extends THREE.Skeleton {
	constructor(bones, boneInverses, useVertexTexture) {
		super(bones, boneInverses, useVertexTexture)

		this.name = "skeleton"

		this.components = []
		this.defaultComponents = []

		this.defaultComponents.push(new ElementComponent())
		this.defaultComponents.push(new Object3DComponent())
	}

	initialize() {

	}

	update() {
		
	}
}