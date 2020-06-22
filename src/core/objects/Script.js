class Script extends THREE.Object3D {
	constructor() {
		super()

		this.name = "script"

		// Script code
		try {
			this.code = ''
			this.func = Function(this.code_loop)
		} catch(e) {
			
		}
	}

	setLoopCode(code) {
		this.code = code
		this.func = Function(this.code)
	}

	update() {
		// Run script
		try {
			this.func()
		} catch (e) {

		}

		for(var i = 0; i < this.children.length; i++) {
			if (this.children[i].update != undefined) {
				this.children[i].update()
			}
		}
	}
}