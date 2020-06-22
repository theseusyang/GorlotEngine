class Text3D extends THREE.Mesh {
	constructor(text, font, material) {
		super(new THREE.TextGeometry(text, {font: font}), material)

		this.font = font
		this.text = text

		this.name = "text"
	}

	initialize() {
		for(var i = 0; i < this.children.length; i++) {
			if (this.children[i].initialize != undefined) {
				this.children[i].initialize()
			}
		}
	}

	setText(text) {
		this.text = text
		this.geometry = new THREE.TextGeometry(this.text, {font: this.font})
	}

	update() {
		for(var i = 0; i < this.children.length; i++) {
			if (this.children[i].update != undefined) {
				this.children[i].update
			}
		}
	}
}