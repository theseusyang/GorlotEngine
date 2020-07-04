// First, Libraries are added
include("libs/three/three.js")

include("libs/three/loaders/OBJLoader.js")
include("libs/three/loaders/MTLLoader.js")
include("libs/three/loaders/VRMLLoader.js")
include("libs/three/loaders/FBXLoader.js")
include("libs/three/loaders/ColladaLoader.js")
include("libs/three/loaders/collada/Animation.js")
include("libs/three/loaders/collada/AnimationHandler.js")
include("libs/three/loaders/collada/KeyFrameAnimation.js")

//include("three/cameras/CinematicCamera.js")

include("libs/three/webvr/VREffect.js")

include("libs/leap/leap-0.6.4.min.js")

include("libs/cannon/cannon.js")
include("libs/cannon/CannonDebugRenderer.js")

include("libs/stats.min.js")
include("libs/opentype.min.js")
include("libs/jszip.min.js")
include("libs/SPE.min.js")

// Then the code itself

include("src/input/Key.js")
include("src/input/Keyboard.js")
include("src/input/Mouse.js")

include("src/core/ObjectLoader.js")
include("src/core/MaterialLoader.js")

include("src/core/MathUtils.js")
include("src/core/ThreeExpand.js")
include("src/core/Program.js")
include("src/core/Scene.js")
include("src/core/ObjectUtils.js")

include("src/core/webvr/VRControls.js")

include("src/core/texture/TextTexture.js")
include("src/core/texture/VideoTexture.js")
include("src/core/texture/WebcamTexture.js")
include("src/core/texture/Texture.js")

include("src/core/loaders/FontLoader.js")

include("src/core/objects/device/LeapHand.js")

include("src/core/objects/lights/PointLight.js")
include("src/core/objects/lights/SpotLight.js")
include("src/core/objects/lights/AmbientLight.js")
include("src/core/objects/lights/DirectionalLight.js")
include("src/core/objects/lights/HemisphereLight.js")
include("src/core/objects/lights/Sky.js")

include("src/core/objects/cameras/PerspectiveCamera.js")
include("src/core/objects/cameras/OrthographicCamera.js")

include("src/core/objects/Bone.js")
include("src/core/objects/Empty.js")
include("src/core/objects/Script.js")
include("src/core/objects/Blueprints.js")
include("src/core/objects/Model3D.js")
include("src/core/objects/AnimatedModel.js")
include("src/core/objects/Text3D.js")
include("src/core/objects/Sprite.js")
include("src/core/objects/ParticleEmitter.js")
include("src/core/objects/Audio.js")

include("src/core/Component.js")
include("src/core/ComponentManager.js")

// Components

include("src/core/components/ElementComponent.js")

include("src/core/components/Objects/Object3DComponent.js")
include("src/core/components/Objects/Text3DComponent.js")
include("src/core/components/Objects/AudioComponent.js")

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
include("src/core/Nodes/Blueprints/Logic.js")
include("src/core/Nodes/Blueprints/Arrays.js")
include("src/core/Nodes/Blueprints/Objects.js")
include("src/core/Nodes/Blueprints/Scene.js")

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
include("src/core/assets/Materials/BasicMaterial.js")
include("src/core/assets/Materials/DepthMaterial.js")
include("src/core/assets/Materials/LambertMaterial.js")
include("src/core/assets/Materials/NormalMaterial.js")
include("src/core/assets/Materials/StandardMaterial.js")
include("src/core/assets/Materials/ShaderMaterial.js")

//App class
function App(){}

//App initialization (entry point)
App.initialize = function(main)
{
	// Node modules
	try {
		App.fs = require("fs")
		App.gui = nw
		App.clipboard = App.gui.Clipboard.get()
	} catch(e) {console.error("Error: " + e)}

	App.components = []
	App.componentManager = new ComponentManager()
	
	App.componentManager.addComponent(new Object3DComponent(), true)
	App.componentManager.addComponent(new Text3DComponent(), true)
	App.componentManager.addComponent(new LightComponent(), true)

	//Init Input
	Keyboard.initialize();
	Mouse.initialize();

	//Create main program
	App.main = main;
	App.main.initialize(App.canvas);

	//Time control
	App.delta_time = 0;
	App.time = Date.now();

	//Start Loop
	App.loop();
}

// File chooser callback receives event object
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
			callback(e.path[0].value)
		}
	}

	// Force trigger onchange event
	chooser.click()
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

// Write File
App.writeFile = function(fname, data) {
	if (App.fs !== undefined) {
		/*App.fs.writeFile(fname, data, (err) => {
			if (err) {throw err}
		})*/
		var stream = App.fs.createWriteStream(fname, "utf8")
		stream.write(data)
		stream.end()
	}
}

//Load Main program
App.loadMain = function(main)
{
	App.main = main;
	App.main.initialize();
}

// Check if WebVR is available
App.webvrAvailable = function() {
	return (navigator.getVRDisplays !== undefined)
}

//Set if mouse locked
App.setMouseLock = function(value)
{
	if(value === true)
	{
		document.body.onclick = function()
		{
			try
			{
				document.body.requestPointerLock = canvas.mozRequestPointerLock || canvas.requestPointerLock || canvas.webkitRequestPointerLock;
				document.body.requestPointerLock();
			}
			catch(e){}
		}
	}
	else
	{
		document.body.onclick = function(){}
	}
}

//App loop
App.loop = function()
{
	//Prepare next frame render
	requestAnimationFrame(App.loop);

	//Update Input Values
	Mouse.update();
	Keyboard.update()

	//Update time values
	App.delta_time = Date.now() - App.time;
	App.time += App.delta_time;

	//Update and draw
	App.main.update();
	App.main.draw();

}

//Called every time page is resized
App.resize = function()
{
	App.main.resize();
}

//Auxiliar include
function include(file)
{
	if(file.endsWith(".js"))
	{
		var js = document.createElement("script")
		js.src = file
		js.type = "text/javascript"
		js.async = false
		document.body.appendChild(js)
	}
	else if(file.endsWith(".css"))
	{
		var css = document.createElement("link")
		css.href = file
		css.rel = "stylesheet"
		document.body.appendChild(css)
	}	
}