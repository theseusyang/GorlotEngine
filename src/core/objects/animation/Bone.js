class Bone extends THREE.Bone {
	constructor() {
		super()

		this.name = "bone"
		this.components = []

		this.defaultComponents = []
		this.defaultComponents.push(new ElementComponent())
		this.defaultComponents.push(new Object3DComponent())
	}

	initialize() {

	}

	update() {
		
	}
	
	stop() {

	}
}