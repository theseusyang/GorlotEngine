class PointLight extends THREE.PointLight {
	constructor(hex, intensity, distance, decay) {
		super(hex, intensity, distance, decay)

		this.name = "point_light"

		this.shadow.camera.near = 1
		this.shadow.camera.far = 1000

		this.components = []
		this.addComponent(new ElementComponent())
		this.addComponent(new Object3DComponent())
		this.addComponent(new LightComponent())

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