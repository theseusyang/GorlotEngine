class HemisphereLight extends THREE.HemisphereLight {
	constructor(skyColorHex, groundColorHex, intensity) {
		super(skyColorHex, groundColorHex, intensity)

		this.name = "hemisphere_light"

		this.components = []
		this.addComponent(new ElementComponent())
		
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