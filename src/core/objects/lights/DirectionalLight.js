class DirectionalLight extends THREE.DirectionalLight {
	constructor(hex, intensity) {
		super(hex, intensity)
		this.name = "directional_light"

		this.castShadow = true

		this.shadow.camera.near = 1
		this.shadow.camera.far = 500
		this.shadow.camera.left = -10
		this.shadow.camera.right = 10
		this.shadow.camera.top = 10
		this.shadow.camera.bottom = -10

		this.shadow.mapSize.width = 1024
		this.shadow.mapSize.height= 1024

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
			if (this.children[i].initialize !== undefined) {
				this.children[i].initialize()
			}
		}
	}

	update() {
		for(var i = 0; i < this.children.length; i++) {
			if (this.children[i].update !== undefined) {
				this.children[i].update()
			}
		}
	}

	stop() {
		for(var i = 0; i < this.children.length; i++) {
			if (this.children[i].stop !== undefined) {
				this.children[i].stop()
			}
		}
	}
}