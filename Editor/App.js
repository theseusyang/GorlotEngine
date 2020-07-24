"use strict";

//External libs
include("lib/three/three.js");
include("lib/three/effects/VREffect.js");
include("lib/cannon.min.js");
include("lib/leap.min.js");
include("lib/stats.min.js");
include("lib/SPE.min.js");
include("lib/spine.min.js")

include("lib/litegraph/litegraph.js")

//Internal modules
include("src/core/three/Three.js");
include("src/core/three/Object3D.js");
include("src/core/three/Vector3.js");
include("src/core/three/Vector2.js");
include("src/core/three/Color.js");
include("src/core/three/Texture.js")
include("src/core/three/LightShadow.js")
include("src/core/three/Fog.js")
include("src/core/three/Material.js")

include("src/input/Key.js");
include("src/input/Keyboard.js");
include("src/input/Mouse.js");

include("src/core/webvr/VRControls.js");

include("src/core/resources/Font.js")
include("src/core/resources/Video.js")
include("src/core/resources/Audio.js")
include("src/core/resources/Image.js")

include("src/core/texture/TextTexture.js");
include("src/core/texture/VideoTexture.js");
include("src/core/texture/WebcamTexture.js");
include("src/core/texture/Texture.js");

include("src/core/loaders/FontLoader.js");
include("src/core/loaders/ImageLoader.js")
include("src/core/loaders/VideoLoader.js")

include("src/core/loaders/AudioLoader.js")
include("src/core/loaders/TextureLoader.js")
include("src/core/loaders/ObjectLoader.js")
include("src/core/loaders/MaterialLoader.js")
include("src/core/loaders/TTFLoader.js")

include("src/core/objects/device/LeapMotion.js");
include("src/core/objects/device/KinectDevice.js");

include("src/core/objects/mesh/Mesh.js")
include("src/core/objects/mesh/SkinnedMesh.js")
include("src/core/objects/mesh/Text3D.js")

include("src/core/objects/sprite/Sprite.js")

include("src/core/objects/lights/PointLight.js");
include("src/core/objects/lights/SpotLight.js");
include("src/core/objects/lights/AmbientLight.js");
include("src/core/objects/lights/DirectionalLight.js");
include("src/core/objects/lights/HemisphereLight.js");
include("src/core/objects/lights/Sky.js");

include("src/core/objects/cameras/PerspectiveCamera.js");
include("src/core/objects/cameras/OrthographicCamera.js");

include("src/core/objects/audio/AudioEmitter.js");

include("src/core/objects/script/Script.js");
include("src/core/objects/script/BlockScript.js");

include("src/core/objects/physics/PhysicsObject.js");

include("src/core/objects/spine/SpineAnimation.js")
include("src/core/objects/spine/SpineTexture.js")

include("src/core/objects/Bone.js");
include("src/core/objects/Container.js");
include("src/core/objects/ParticleEmitter.js");
include("src/core/objects/Program.js");
include("src/core/objects/Scene.js");

include("src/core/utils/Base64Utils.js")
include("src/core/utils/ArraybufferUtils.js")
include("src/core/utils/MathUtils.js")
include("src/core/utils/ObjectUtils.js")

// Assets
include("src/core/assets/materials/MeshBasicMaterial.js")
include("src/core/assets/materials/MeshLambertMaterial.js")
include("src/core/assets/materials/MeshNormalMaterial.js")
include("src/core/assets/materials/MeshPhongMaterial.js")
include("src/core/assets/materials/MeshShaderMaterial.js")
include("src/core/assets/materials/MeshStandardMaterial.js")

// Default Components
include("src/core/components/Panel.js")
include("src/core/components/Component.js")

include("src/core/components/objects/AudioComponent.js")
include("src/core/components/objects/ElementComponent.js")
include("src/core/components/objects/KinectComponent.js")
include("src/core/components/objects/LeapComponent.js")
include("src/core/components/objects/ObjectComponent.js")
include("src/core/components/objects/PhysicsComponent.js")
include("src/core/components/objects/ProgramComponent.js")
include("src/core/components/objects/SceneComponent.js")
include("src/core/components/objects/SkyComponent.js")
include("src/core/components/objects/TextComponent.js")

include("src/core/components/cameras/CameraComponent.js")

include("src/core/components/lights/LightComponent.js")
include("src/core/components/objects/ScriptComponent.js")

// Nodes
include("src/core/nodes/NodesHelper.js")

// Blueprints
// Base
include("src/core/nodes/base/Arrays.js")
include("src/core/nodes/base/Base.js")
include("src/core/nodes/base/Logic.js")
include("src/core/nodes/base/JSON.js")

include("src/core/nodes/input/Keyboard.js")
include("src/core/nodes/input/Mouse.js")

// Math
include("src/core/nodes/math/Math.js")
include("src/core/nodes/math/Vector.js")
include("src/core/nodes/math/Quaternion.js")
include("src/core/nodes/math/Euler.js")

// Objects
include("src/core/nodes/objects/Objects.js")
include("src/core/nodes/objects/Scene.js")

// Particles Nodes
include("src/core/nodes/particles/Particles.js")

// Materials nodes
include("src/core/nodes/materials/Material.js")
include("src/core/nodes/materials/Color.js")
include("src/core/nodes/materials/Texture.js")
include("src/core/nodes/materials/Constants.js")

include("src/core/nodes/Register.js")

include("src/core/FileSystem.js")

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
	App.fullscreen = false;

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

//App loop
App.loop = function()
{
	//Call loop again
	requestAnimationFrame(App.loop);

	//Update Mouse Values
	Mouse.update();
	Keyboard.update();
	
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

//Leave fullscreen mode
App.leaveFullscreen = function()
{
	//Set fullscreen flag
	App.fullscreen = false;

	if(document.exitFullscreen)
	{
		document.exitFullscreen();
	}
	else if(document.mozCancelFullScreen)
	{
		document.mozCancelFullScreen();
	}
	else if(document.webkitExitFullscreen)
	{
		document.webkitExitFullscreen();
	}
}

//Set an element to fullscreen mode
App.enterFullscreen = function(element)
{
	//If no element passed use full page
	if(element === undefined)
	{
		element = document.body;
	}

	//Set fullscreen flag
	App.fullscreen = true;

	//Set element to fullscreen
	if(element.requestFullscreen)
	{
		element.requestFullscreen();
	}
	else if(element.mozRequestFullScreen)
	{
		element.mozRequestFullScreen();
	}
	else if(element.webkitRequestFullscreen)
	{
		element.webkitRequestFullscreen();
	}
	else if(element.msRequestFullscreen)
	{
		element.msRequestFullscreen();
	}
}

//Load Main program
App.loadMain = function(main)
{
	App.main = main;
	App.main.initialize(App.canvas);
}

//Check if webvr is available
App.webvrAvailable = function()
{
	return (navigator.getVRDisplays !== undefined);
}

//Open file chooser dialog receives callback function, file filter and saveas
App.chooseFile = function(callback, filter, saveas)
{
	var chooser = document.createElement("input");
	chooser.type = "file";
	chooser.accept = (filter !== undefined) ? filter : ""

	if(saveas !== undefined)
	{
		chooser.accept = filter;

		if (saveas !== true) {
			chooser.nwsaveas = saveas
		} else {
			chooser.nwsaveas = "file";
		}
	}

	chooser.onchange = function(event)
	{
		if(callback !== undefined)
		{
			callback(chooser.files);
		}
	};

	chooser.click();
}

// Include javascript or css file in project
function include(file, onload)
{
	if(file.endsWith(".js"))
	{
		var js = document.createElement("script");
		js.src = file;
		js.type = "text/javascript";
		js.async = false;
		if(onload)
		{
			js.onload = onload;
		}
		document.body.appendChild(js);
	}
	else if(file.endsWith(".css"))
	{
		var css = document.createElement("link");
		css.href = file;
		css.rel = "stylesheet";
		document.body.appendChild(css);
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