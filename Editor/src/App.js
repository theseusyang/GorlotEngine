"use strict"

// WebVR polyfill
if (navigator.getVRDisplays === undefined) {
	include("libs/webvr-polyfill.min.js", () => {
		window.WebVRConfig = {
			CARDBOARD_UI_DISABLED: false,
			FORCE_ENABLE_VR: false, // Forces availability of VR mode in desktop
			CARDBOARD_UI_DISABLED: false,
			ROTATE_INSTRUCTIONS_DISABLED: true,
			TOUCH_PANNER_DISABLED: true,
			MOUSE_KEYBOARD_CONTROLS_DISABLED: true,
			K_FILTER: 1.0, //0 for accelerometer, 1 for gyro
			PREDICTION_TIME_S: 0.0,
			YAW_ONLY: false,
			DEFER_INITIALIZATION: false,
			ENABLE_DEPRECATED_API: false,
			BUFFER_SCALE: 1.0,
			DIRTY_SUBMIT_FRAME_BINDINGS: false
		}
	})
}

// Then the code itself

include("libs/three/three.min.js")
include("libs/three/effects/VREffect.js")
include("libs/cannon.min.js")
include("libs/leap.min.js")
include("libs/stats.min.js")
include("libs/SPE.min.js")

include("src/input/Key.js")
include("src/input/Keyboard.js")
include("src/input/Mouse.js")

include("src/core/three/Object3D.js")
include("src/core/three/Vector2.js")
include("src/core/three/Vector3.js")
include("src/core/three/Color.js")
include("src/core/three/Material.js")
include("src/core/three/Three.js")

include("src/core/webvr/VRControls.js")

include("src/core/texture/TextTexture.js")
include("src/core/texture/VideoTexture.js")
include("src/core/texture/WebcamTexture.js")
include("src/core/texture/Texture.js")

include("src/core/loaders/FontLoader.js")

include("src/core/objects/physics/PhysicsObject.js")

include("src/core/objects/device/LeapHand.js")

include("src/core/objects/lights/PointLight.js")
include("src/core/objects/lights/SpotLight.js")
include("src/core/objects/lights/AmbientLight.js")
include("src/core/objects/lights/DirectionalLight.js")
include("src/core/objects/lights/HemisphereLight.js")
include("src/core/objects/lights/Sky.js")

include("src/core/objects/cameras/PerspectiveCamera.js")
include("src/core/objects/cameras/OrthographicCamera.js")

include("src/core/objects/audio/Audio.js")

include("src/core/objects/script/Script.js")
include("src/core/objects/script/Blueprints.js")

include("src/core/objects/Bone.js")
include("src/core/objects/Empty.js")
include("src/core/objects/Model3D.js")
include("src/core/objects/AnimatedModel.js")
include("src/core/objects/Text3D.js")
include("src/core/objects/Sprite.js")
include("src/core/objects/ParticleEmitter.js")

include("src/core/Component.js")
include("src/core/ComponentManager.js")

// Components

include("src/core/components/ElementComponent.js")

include("src/core/components/Objects/Object3DComponent.js")
include("src/core/components/Objects/Text3DComponent.js")
include("src/core/components/Objects/AudioComponent.js")
include("src/core/components/Objects/PhysicsComponent.js")

include("src/core/components/Lights/LightComponent.js")
include("src/core/components/Lights/SkyComponent.js")

include("src/core/components/Scripting/BlueprintsComponent.js")
include("src/core/components/Scripting/ScriptComponent.js")

include("src/core/components/Cameras/CameraComponent.js")

include("src/core/components/Containers/ProgramComponent.js")
include("src/core/components/Containers/SceneComponent.js")

// Blueprints Nodes
include("libs/litegraph/litegraph.js")

include("src/core/Nodes/Blueprints/Base.js")
include("src/core/Nodes/Blueprints/Math/Math.js")
include("src/core/Nodes/Blueprints/Math/Vector.js")
include("src/core/Nodes/Blueprints/Math/Quaternion.js")
include("src/core/Nodes/Blueprints/Math/Euler.js")
include("src/core/Nodes/Blueprints/Logic.js")
include("src/core/Nodes/Blueprints/Arrays.js")
include("src/core/Nodes/Blueprints/Objects.js")
include("src/core/Nodes/Blueprints/Scene.js")
include("src/core/Nodes/Blueprints/Keyboard.js")
include("src/core/Nodes/Blueprints/Mouse.js")

// Particles Nodes
include("src/core/Nodes/Particles/Particles.js")

// Materials nodes
include("src/core/Nodes/Materials/Material.js")
include("src/core/Nodes/Materials/Color.js")
include("src/core/Nodes/Materials/Texture.js")
include("src/core/Nodes/Materials/Constants.js")

include("src/core/Nodes/Register.js")

// Assets
include("src/core/assets/Materials/MeshPhongMaterial.js")
include("src/core/assets/Materials/MeshBasicMaterial.js")
include("src/core/assets/Materials/MeshDepthMaterial.js")
include("src/core/assets/Materials/MeshLambertMaterial.js")
include("src/core/assets/Materials/MeshNormalMaterial.js")
include("src/core/assets/Materials/MeshStandardMaterial.js")
include("src/core/assets/Materials/MeshShaderMaterial.js")

include("src/core/ObjectLoader.js")
include("src/core/MaterialLoader.js")

include("src/core/Program.js")
include("src/core/Scene.js")
include("src/core/ObjectUtils.js")
include("src/core/MathUtils.js")

//App class
function App(){}

// Require NodeJS modules
try {
	App.fs = require("fs")
	App.gui = nw
	App.clipboard = App.gui.Clipboard.get()
} catch(e) {console.error("Error: " + e)}

//App initialization (entry point)
App.initialize = function(main)
{
	App.components = []
	App.componentManager = new ComponentManager()
	
	App.componentManager.addComponent(new Object3DComponent(), true)
	App.componentManager.addComponent(new Text3DComponent(), true)
	App.componentManager.addComponent(new LightComponent(), true)

	//Init Input
	Keyboard.initialize()
	Mouse.initialize()

	//Create main program
	App.main = main
	App.main.initialize(App.canvas)

	//Time control
	App.delta_time = 0
	App.time = Date.now()

	//Start Loop
	App.loop()
}

// Open file chooser dialog, receives: callback function, file filter, savemode and its directory onlt
App.chooseFile = function(callback, filter, savemode) {
	// Create file chooser element
	var chooser = document.createElement("input")
	chooser.type = "file"

	if (filter !== undefined) {
		chooser.accept = filter
	}

	if (savemode === true) {
		chooser.nwsaveas = "file"
	}

	// Create onchange event
	chooser.onchange = function(e) {
		if (callback !== undefined) {
			callback(chooser.value)
		}
	}

	// Force trigger onchange event
	chooser.click()
}

// Write File
App.writeFile = function(fname, data) {
	if (App.fs !== undefined) {
		var stream = App.fs.createWriteStream(fname, "utf8")
		stream.write(data)
		stream.end()
	}
}

// Copy file (Can'y be used to copy folders)
App.copyFile = function(src, dest) {
	if (App.fs !== undefined) {
		App.fs.createReadStream(src).pipe(App.fs.createWriteStream(dest))
	}
}

// Make a directory
App.makeDirectory = function(dir) {
	if (App.fs !== undefined) {
		try {
			App.fs.mkdirSync(dir)
		} catch (e) {}
	}
}

// Returns files in directory (An empty array is returned in case of error)
App.getFilesDirectory = function(dir) {
	if (App.fs !== undefined) {
		try {
			return App.fs.readdirSync(dir)
		} catch (e) {
			return []
		}
	}
	return []
}

// Copy folder and all its files (includes symbolic links)
App.copyFolder = function(src, dest) {
	if (App.fs !== undefined) {
		App.makeDirectory(dest)
		var files = App.fs.readdirSync(src)

		for(var i = 0; i < files.length; i++) {
			var source = src + "/" + files[i]
			var destiny = dest + "/" + files[i]
			var current = App.fs.statSync(source)

			// Directory
			if (current.isDirectory()) {
				App.copyFolder(source, destiny)
			}
			// Symbolic Link
			else if (current.isSymbolicLink()) {
				App.fs.symlinkSync(App.fs.readlinkSync(source), destiny)
			}
			// File
			else {
				App.copyFile(source, destiny)
			}
		}
	}
}

// Read File
App.readFile = function(fname, sync, callback) {
	
	// If sync defined, set true
	if (sync === undefined) {
		sync = true
	}

	// Check if node available
	if (App.fs !== undefined) {
		// If sync
		if (sync) {
			return App.fs.readFileSync(fname, "utf8")
		} else {
			App.fs.readFile(fname, "utf8", callback)
			return null
		}
	} else {
		var file = new XMLHttpRequest()
		file.overrideMimeType("text/plain")
		var data = null

		// Request file to server
		file.open("GET", fname, false)

		// Get file
		file.onreadystatechange = function() {
			if (file.status === 200 || file.status === 0) {
				data = file.responseText

				// Callback
				if (callback !== undefined) {
					callback(file.responseText)
				}
			}
		}

		// Send null to ensure that file was received
		if (sync) {
			file.send(null)
		}

		return data
	}
}

//Load Main program
App.loadMain = function(main)
{
	App.main = main
	App.main.initialize()
}

// Check if webvr is available
App.webvrAvailable = function() {
	return (navigator.getVRDisplays !== undefined)
}

//App loop
App.loop = function()
{
	//Prepare next frame render
	requestAnimationFrame(App.loop)

	//Update Input Values
	Mouse.update()
	Keyboard.update()

	//Update time values
	App.delta_time = Date.now() - App.time
	App.time += App.delta_time

	//Update and draw
	App.main.update()
	App.main.draw()

}

//Called every time page is resized
App.resize = function()
{
	App.main.resize()
}

//Auxiliar include
function include(file, onload)
{
	if(file.endsWith(".js"))
	{
		var js = document.createElement("script")
		js.src = file
		js.type = "text/javascript"
		js.async = false
		if (onload) {
			js.onload = onload
		}
		document.body.appendChild(js)
	}
	else if(file.endsWith(".css"))
	{
		var css = document.createElement("link")
		css.href = file
		css.rel = "stylesheet"
		document.body.appendChild(css)
	} else if (file.endsWith("*")) {
		var directory = file.replace("*", "")
		var files = App.getFilesDirectory(directory)
		for(var i = 0; i < files.length; i++) {
			include(directory + files[i])
		}
	} else {
		var directory = file + "/"
		try {
			var files = App.getFilesDirectory(directory)
			for(var i = 0; i < files.length; i++) {
				include(directory + files[i])
			}
		} catch(e) {
			
		}
	}
}
