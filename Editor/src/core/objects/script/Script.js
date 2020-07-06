class Script extends THREE.Object3D {
	constructor(code, mode) {
		super()

		// Set default name and object type
		this.name = "script"
		this.type = "Script"

		// Disable auto matrix updates
		this.rotationAutoUpdate = false

		// Program and scene pointers
		this.program = null
		this.scene = null

		// Script code
		this.func = null
		this.code = "//ADD CODE HERE"
		this.mode = Script.INIT

		this.icon = "data/icons/script/script.png"

		// Get arguments
		if (code !== undefined) {
			this.code = code
		}
		if (mode !== undefined) {
			this.mode = mode
		}

		// Script functions
		this.setCode(this.code)

		this.components = []
		
		this.defaultComponents = []
		this.defaultComponents.push(new ElementComponent())
		this.defaultComponents.push(new Object3DComponent())
		this.defaultComponents.push(new ScriptComponent())

	}

	addComponent(component) {
		if (component instanceof Component) {
			this.components.push(component)
		}
	}

	initialize() {

		// Program and scene
		var node = this
		while(node.parent !== null) {
				node = node.parent
			if (node instanceof Scene) {
				node.scene = node
			} else if (node instanceof Program) {
				node.program = node
			}
		}

		// Run script
		if(this.mode === Script.INIT) {
			try {
				this.func()
			} catch(e) {
				console.error(e.message)
			}
		}

		for(var i = 0; i < this.children.length; i++) {
			this.children[i].initialize()
		}
	}

	update() {
		// Run script
		if(this.mode === Script.LOOP) {
			try {
				this.func()
			} catch (e) {
				console.error(e.message)
			}
		}

		for(var i = 0; i < this.children.length; i++) {
			this.children[i].update()
		}
	}

	setCode(code) {
		try {
			this.code = code
			this.func = Function(this.code)
		} catch(e) {
			if (e instanceof SyntaxError) {
				return e.message
			}

			return null
		}
	}

	setMode(mode) {
		// Set mode
		this.mode = mode
	}

	stop() {
		for(var i = 0; i < this.children.length; i++) {
			this.children[i].stop()
		}
	}

	toJSON(meta) {
		var data = THREE.Object3D.prototype.toJSON.call(this, meta)

		data.object.mode = this.mode
		data.object.code = this.code
		data.object.components = this.components

		return data
	}
}

// Script modes
Script.INIT = 0
Script.LOOP = 1