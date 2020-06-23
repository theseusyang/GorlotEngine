class Script extends THREE.Object3D {
	constructor() {
		super()

		this.name = "script"

		// Script code
		this.code_loop = ""
		this.code_init = ""

		// Script functions
		this.func_loop = Function(this.code_loop)
		this.func_init = Function(this.code_init)
	}

	initialize() {
		// Run script
		try {
			this.func_init()
		} catch(e) {}

		for(var i = 0; i < this.children.length; i++) {
			if (this.children[i].initialize != undefined) {
				this.children[i].initialize()
			}
		}
	}

	setInitCode(code) {
		try {
			this.code_init = code
			this.func_init = Function(this.code_init)
		} catch(e) {}
	}

	setLoopCode(code) {
		try {
			this.code_loop = code_loop
			this.func_loop = Function(this.code_loop)
		} catch(e) {}
	}

	update() {
		// Run script
		try {
			this.func_loop()
		} catch (e) {

		}

		for(var i = 0; i < this.children.length; i++) {
			if (this.children[i].update != undefined) {
				this.children[i].update()
			}
		}
	}
}