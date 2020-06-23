class Sky extends THREE.Scene {
	constructor() {
		super()

		this.name = "sky"

		// Sun
		this.sun = new DirectionalLight(0xffffaa, 0.3)
		this.sun.castShadow = true
		this.sun.name = "sun"
		this.add(this.sun)

		// Hemisphere
		this.hemisphere = new HemisphereLight(0xffffff, 0xffffff, 0.3)
		this.hemisphere.color.setHSL(0.6, 1, 0.6)
		this.hemisphere.groundColor.setHSL(0.095, 1, 0.75)
		this.hemisphere.position.set(0, 500, 0)
		this.hemisphere.name = "horizon"
		this.add(this.hemisphere)

		// Sun position control
		this.distance = 200

		// Day time
		this.day_time = 10
		this.time = 2.5

		// Sky Shader
		var vertex = App.readFile("data/shaders/sky_vertex.glsl")
		var fragment = App.readFile("data/shaders/sky_fragment.glsl")
		var uniforms = {
			top_color: {type: "c", value: new THREE.Color(0x0077ff)},
			bottom_color: {type: "c", value: new THREE.Color(0xffffff)},
			offset: {type: "f", value: 33},
			exponent: {type: "f", value: 0.6}
		}
		uniforms.top_color.value.copy(this.hemisphere.color)

		// Sky
		var geometry = new THREE.SphereGeometry(4000, 32, 15)
		var material = new THREE.ShaderMaterial({vertexShader: vertex, fragmentShader: fragment, uniforms: uniforms, side: THREE.BackSide})
		this.sky = new Model3D(geometry, material)
		this.sky.name = "sky"
		this.add(this.sky)

		this.components = []

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
		// Update Time
		this.time += App.delta_time / (this.day_time * 1000)

		// Update position
		var rotation = Sky.pi2 * (this.time / this.day_time)
		this.sun.position.x = this.distance * (rotation)
		this.sun.position.y = this.distance * (rotation)

		// Update children
		for(var i = 0; i < this.children.length; i++) {
			if (this.children[i].update) {
				this.children[i].update
			}
		}
	}
}

// Auxiliar Values
Sky.pi2 = Math.PI * 2