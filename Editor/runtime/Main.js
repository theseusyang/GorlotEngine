"use strict"

// Main constructor
function Main() {}

// App to load
Main.app = "app.gsp"

// Initialize Main
Main.initialize = function(canvas) {
	// Set mouse lock false
	App.setMouseLock(false)

	// Main program and scene
	Main.program = Main.loadProgram(Main.app)

	// Renderer and canvas
	Main.canvas = document.createElement("canvas")
	Main.canvas.style.position = "absolute"
	Main.canvas.style.left = "0px"
	Main.canvas.style.right = "0px"
	Main.canvas.style.width = window.innerWidth + "px"
	Main.canvas.style.height = window.innerHeight + "px"
	Main.canvas.width = window.innerWidth
	Main.canvas.height= window.innerHeight
	document.body.appendChild(Main.canvas)

	Mouse.canvas = Main.canvas

	// Stats tool
	Main.stats = new Stats()
	Main.stats.dom.style.position = "absolute"
	Main.stats.dom.style.zIndex = "1000"
	Main.stats.dom.style.opacity = "0.8"
	Main.stats.dom.style.pointerEvents = "none"
	document.body.appendChild(Main.stats.dom)

	// VR Stuff
	Main.vr_controls = null
	Main.vr_effect = null

	// Set renderer
	Main.renderer = new THREE.WebGLRenderer({canvas: Main.canvas, antialias: true})
	Main.renderer.autoClear = false
	Main.renderer.shadowMap.enabled = true
	Main.renderer.shadowMap.type = THREE.PCFSoftShadowMap
	Main.renderer.setPixelRatio(window.devicePixelRatio || 1.0)
	Main.renderer.setSize(Main.canvas.width, Main.canvas.height)


	// Initialize program
	Main.program.default_camera = new PerspectiveCamera(60, Main.canvas.width/Main.canvas.height, 0.1, 10000000)
	Main.program.default_camera.position.set(0, 5, -5)
	Main.program.renderer = Main.renderer
	Main.program.initialize()
	Main.program.resize(Main.canvas.width, Main.canvas.height)
}

// Update Main
Main.update = function() {
	Main.program.scene.update()
}

// Draw stuff into screen
Main.draw = function() {
	Main.renderer.clear()
	Main.renderer.render(Main.program.scene, Main.program.scene.camera)
}

// Update canvas and renderer size
Main.resize = function() {
	if (Main.canvas !== null && Main.renderer !== null) {
		Main.canvas.width = window.innerWidth
		Main.canvas.height = window.innerHeight
		Main.canvas.stlye.width = window.innerWidth + "px"
		Main.canvas.stlye.height = window.innerHeight + "px"

		Main.renderer.setSize(Main.canvas.width, Main.canvas.height)
		Main.camera.aspect = Main.canvas.width/Main.canvas.height
		Main.camera.updateProjectionMatrix()

		Main.program.resize(Main.canvas.width, Main.canvas.height)
	}
}

// Load program from file
Main.loadProgram = function(fname) {
	var loader = new ObjectLoader()
	var data = JSON.parse(App.readFile(fname))

	return loader.parse(data)
}

// Exit
Main.exit = function() {
	process.exit()
}