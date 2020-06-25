class PointLight extends THREE.PointLight {
	constructor(hex, intensity, distance, decay) {
		super(hex, intensity, distance, decay)

		this.name = "point_light"

		this.castShadow = true
		this.shadow.camera.near = 0
		this.shadow.camera.far = 500
		this.shadow.mapSize.width = 1024
		this.shadow.mapSize.height = 1024

		this.components = []

		this.defaultComponents = []
		this.defaultComponents.push(new ElementComponent())
		this.defaultComponents.push(new Object3DComponent())
		this.defaultComponents.push(new LightComponent())
	}

	addComponent(component) {
		if (component instanceof Component) {
			this.components.push(component)
		}
	}

	initialize() {
		for(var i = 0; i < this.children.length; i++) {
			if (this.children[i].length != undefined) {
				this.children[i].initialize()
			}
		}
	}

	update() {
		for(var i = 0; i < this.children.length; i++) {
			if (this.children[i].update != undefined) {
				this.children[i].update()
			}
		}
	}
}