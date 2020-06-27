class PointLight extends THREE.PointLight {
	constructor(hex, intensity, distance, decay) {
		super(hex, intensity, distance, decay)

		this.name = "point_light"

		this.castShadow = true

		this.shadow.camera.near = 0.1
		this.shadow.camera.far = 5000
		this.shadow.bias = 0.01
		
		//this.shadow.mapSize.width = 1024
		//this.shadow.mapSize.height = 1024

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
			this.children[i].initialize()
		}
	}

	update() {
		for(var i = 0; i < this.children.length; i++) {
			this.children[i].update()
		}
	}

	stop() {
		for(var i = 0; i < this.children.length; i++) {
			this.children[i].stop()
		}
	}
}