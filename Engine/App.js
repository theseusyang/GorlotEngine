"use strict";

//External libs
include("Libraries/three/three.js");
include("Libraries/three/effects/VREffect.js");
include("Libraries/cannon.min.js");
include("Libraries/leap.min.js");
include("Libraries/stats.min.js");
include("Libraries/SPE.min.js");
include("Libraries/spine.min.js")

include("Libraries/litegraph/litegraph.js")

//Internal modules
include("Engine/Core/THREE/Three.js");
include("Engine/Core/THREE/Object3D.js");
include("Engine/Core/THREE/Vector3.js");
include("Engine/Core/THREE/Vector2.js");
include("Engine/Core/THREE/Color.js");
include("Engine/Core/THREE/Texture.js")
include("Engine/Core/THREE/LightShadow.js")
include("Engine/Core/THREE/Fog.js")
include("Engine/Core/THREE/Material.js")

include("Engine/Input/Key.js");
include("Engine/Input/Keyboard.js");
include("Engine/Input/Mouse.js");

include("Engine/Core/WebVR/VRControls.js");

include("Engine/Core/Namespace.js")

include("Engine/Core/Resources/Font.js")
include("Engine/Core/Resources/Video.js")
include("Engine/Core/Resources/Audio.js")
include("Engine/Core/Resources/Image.js")

include("Engine/Core/Texture/TextTexture.js");
include("Engine/Core/Texture/VideoTexture.js");
include("Engine/Core/Texture/WebcamTexture.js");
include("Engine/Core/Texture/Texture.js");

include("Engine/Core/Loaders/FontLoader.js");
include("Engine/Core/Loaders/ImageLoader.js")
include("Engine/Core/Loaders/VideoLoader.js")

include("Engine/Core/Loaders/AudioLoader.js")
include("Engine/Core/Loaders/TextureLoader.js")
include("Engine/Core/Loaders/ObjectLoader.js")
include("Engine/Core/Loaders/MaterialLoader.js")
include("Engine/Core/Loaders/TTFLoader.js")

include("Engine/Core/Objects/Device/LeapMotion.js");
include("Engine/Core/Objects/Device/KinectDevice.js");

include("Engine/Core/Objects/Mesh/Mesh.js")
include("Engine/Core/Objects/Mesh/SkinnedMesh.js")
include("Engine/Core/Objects/Mesh/Text3D.js")

include("Engine/Core/Objects/Sprite/Sprite.js")

include("Engine/Core/Objects/Lights/PointLight.js");
include("Engine/Core/Objects/Lights/SpotLight.js");
include("Engine/Core/Objects/Lights/AmbientLight.js");
include("Engine/Core/Objects/Lights/DirectionalLight.js");
include("Engine/Core/Objects/Lights/HemisphereLight.js");
include("Engine/Core/Objects/Lights/Sky.js");

include("Engine/Core/Objects/Cameras/PerspectiveCamera.js");
include("Engine/Core/Objects/Cameras/OrthographicCamera.js");

include("Engine/Core/Objects/Audio/AudioEmitter.js");

include("Engine/Core/Objects/Script/Script.js");
include("Engine/Core/Objects/Script/BlockScript.js");

include("Engine/Core/Objects/Physics/PhysicsObject.js");

include("Engine/Core/Objects/Spine/SpineAnimation.js")
include("Engine/Core/Objects/Spine/SpineTexture.js")

include("Engine/Core/Objects/Bone.js");
include("Engine/Core/Objects/Container.js");
include("Engine/Core/Objects/ParticleEmitter.js");
include("Engine/Core/Objects/Program.js");
include("Engine/Core/Objects/Scene.js");

include("Engine/Core/Objects/Special/ObjectCaller.js")

include("Engine/Core/Utils/Base64Utils.js")
include("Engine/Core/Utils/ArraybufferUtils.js")
include("Engine/Core/Utils/MathUtils.js")
include("Engine/Core/Utils/ObjectUtils.js")

// Assets
include("Engine/Core/Assets/Materials/MeshBasicMaterial.js")
include("Engine/Core/Assets/Materials/MeshLambertMaterial.js")
include("Engine/Core/Assets/Materials/MeshNormalMaterial.js")
include("Engine/Core/Assets/Materials/MeshPhongMaterial.js")
include("Engine/Core/Assets/Materials/MeshShaderMaterial.js")
include("Engine/Core/Assets/Materials/MeshStandardMaterial.js")

// Default Components
include("Engine/Core/Components/Panel.js")
include("Engine/Core/Components/Component.js")

include("Engine/Core/Components/Objects/AudioComponent.js")
include("Engine/Core/Components/Objects/ElementComponent.js")
include("Engine/Core/Components/Objects/KinectComponent.js")
include("Engine/Core/Components/Objects/LeapComponent.js")
include("Engine/Core/Components/Objects/ObjectComponent.js")
include("Engine/Core/Components/Objects/PhysicsComponent.js")
include("Engine/Core/Components/Objects/ProgramComponent.js")
include("Engine/Core/Components/Objects/SceneComponent.js")
include("Engine/Core/Components/Objects/SkyComponent.js")
include("Engine/Core/Components/Objects/TextComponent.js")

include("Engine/Core/Components/Cameras/CameraComponent.js")

include("Engine/Core/Components/Lights/LightComponent.js")
include("Engine/Core/Components/Objects/ScriptComponent.js")

// Nodes
include("Engine/Core/Nodes/Register.js")
include("Engine/Core/Nodes/NodesHelper.js")

// Blocks
include("Engine/Core/Nodes/Blocks/Base/Base.js")
include("Engine/Core/Nodes/Blocks/Base/Events.js")
include("Engine/Core/Nodes/Blocks/Base/Lists.js")
include("Engine/Core/Nodes/Blocks/Base/Widgets.js")
include("Engine/Core/Nodes/Blocks/Base/Objects.js")
include("Engine/Core/Nodes/Blocks/Base/Hierarchy.js")

include("Engine/Core/Nodes/Blocks/Math/Colour.js")
include("Engine/Core/Nodes/Blocks/Math/Vector.js")
include("Engine/Core/Nodes/Blocks/Math/Euler.js")

include("Engine/Core/Nodes/Blocks/Input/Keyboard.js")

// Material
include("Engine/Core/Nodes/Material/MaterialNodes.js")

// Particles
include("Engine/Core/Nodes/Particles/ParticlesNodes.js")

include("Engine/Core/FileSystem.js")

//App class
function App(){}

App.componentManager = []

// NWJS modules
try
{
	App.fs = require("fs");
	App.gui = require("nw.gui");
	App.clipboard = App.gui.Clipboard.get();
	App.args = App.gui.App.argv
}
catch(e){
	App.args = []
}

//App initialization
App.initialize = function(main)
{
	App.fullscreen = false

	Keyboard.initialize()
	Mouse.initialize()

	//Create main program
	App.main = main
	App.main.initialize()

	//Time control
	App.delta = 0
	App.time = Date.now()

	//Start Loop
	App.loop()
}

//App loop
App.loop = function()
{
	//Call loop again
	requestAnimationFrame(App.loop)

	// Update input 
	Mouse.update()
	Keyboard.update()
	
	//Update time values
	App.delta = Date.now() - App.time
	App.time += App.delta

	//Update and render
	App.main.update()
	App.main.render()
}

// Resize page
App.resize = function()
{
	App.main.resize()
}

//Leave fullscreen mode
App.leaveFullscreen = function()
{
	App.fullscreen = false

	if(document.exitFullscreen)
	{
		document.exitFullscreen()
	}
	else if(document.mozCancelFullScreen)
	{
		document.mozCancelFullScreen()
	}
	else if(document.webkitExitFullscreen)
	{
		document.webkitExitFullscreen()
	}
}

//Set an element to fullscreen mode
App.enterFullscreen = function(element)
{
	//If no element passed use full page
	if(element === undefined)
	{
		element = document.body
	}

	//Set fullscreen flag
	App.fullscreen = true

	//Set element to fullscreen
	if(element.requestFullscreen)
	{
		element.requestFullscreen()
	}
	else if(element.mozRequestFullScreen)
	{
		element.mozRequestFullScreen()
	}
	else if(element.webkitRequestFullscreen)
	{
		element.webkitRequestFullscreen()
	}
	else if(element.msRequestFullscreen)
	{
		element.msRequestFullscreen()
	}
}

//Load Main program
App.loadMain = function(main)
{
	App.main = main
	App.main.initialize(App.canvas)
}

//Check if webvr is available
App.webvrAvailable = function()
{
	return (navigator.getVRDisplays !== undefined)
}

//Open file chooser dialog receives callback function, file filter and saveas
App.chooseFile = function(callback, filter, saveas)
{
	var chooser = document.createElement("input")
	chooser.type = "file"
	chooser.accept = (filter !== undefined) ? filter : ""

	if(saveas !== undefined)
	{
		chooser.accept = filter

		if (saveas !== true) {
			chooser.nwsaveas = saveas
		} else {
			chooser.nwsaveas = "file"
		}
	}

	chooser.onchange = function(event)
	{
		if(callback !== undefined)
		{
			callback(chooser.files)
		}
	}

	chooser.click()
}

// Include javascript or css file in project
function include(file, onload)
{
	if(file.endsWith(".js"))
	{
		var js = document.createElement("script")
		js.src = file
		js.type = "text/javascript"
		js.async = false
		if(onload)
		{
			js.onload = onload
		}
		document.body.appendChild(js)
	}
	else if(file.endsWith(".css"))
	{
		var css = document.createElement("link")
		css.rel = "stylesheet"
		css.href = file
		document.body.appendChild(css)
	}
	else if(file.endsWith("*"))
	{
		if (App.fs !== undefined) {
			var directory = file.replace("*", "")
			var files = App.fs.readdirSync(directory)
			for(var i = 0; i < files.length; i++) {
				include(directory + files[i])
			}
		}
	} else {
		if (App.fs !== undefined) {
			var directory = file + "/"
			try {
				var files = App.fs.readdirSync(directory)
				for(var i = 0; i < files.length; i++) {
					include(directory + files[i])
				}
			} catch(e) {}
		}
	}
}
