class SpotLight extends THREE.SpotLight {
	constructor(hex, intensity, distance, angle, exponent, decay) {
		super(hex, intensity, distance, angle, exponent, decay)

		this.name = "spot_light"
	
		this.components = []
	}

	addComponent(component) {
		if (component instanceof Component) {
			this.components.push(component)
		}
	}

	addComponent(component) {
		if (component instanceof Component) {
			this.components.push(component)
		}
	}

	addComponent(component) {
		if (component instanceof Component) {
			this.components.push(component)
		}
	}

	initialize() {
		for(var i = 0; i < this.children.length; i++) {
			if (this.children[i].initialize != undefined) {
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