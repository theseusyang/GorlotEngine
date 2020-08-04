"use strict"

var path = "../"
var code = ""

// External Libraries
include("Engine/Libraries/three/three.js")
include("Engine/Libraries/three/effects/VREffect.js")
include("Engine/Libraries/cannon.min.js")
include("Engine/Libraries/leap.min.js")
include("Engine/Libraries/stats.min.js")
include("Engine/Libraries/SPE.min.js")
include("Engine/Libraries/spine.min.js")

include("Engine/Libraries/litegraph/litegraph.js")

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
include("Engine/Core/Utils/Mesh2Shape.js")

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
include("Engine/Core/Components/Objects/TextComponent.js")
include("Engine/Core/Components/Objects/ScriptComponent.js")

include("Engine/Core/Components/Cameras/CameraComponent.js")

include("Engine/Core/Components/Lights/LightComponent.js")
include("Engine/Core/Components/Lights/SkyComponent.js")

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

include("Binaries/Runtime/Runtime.js")

writeFile("out.js", code.replace(/"use strict"/gi, "").replace(/include\(".*"\)/gi, ""))

function include(file) {
	code += "\n" + readFile(path + file)
}

function readFile(fname) {
	var fs = require("fs")

	if (fs !== undefined) {
		return fs.readFileSync(fname, "utf8")
	}
}

function writeFile(fname, text) {
	var fs = require("fs")

	if (fs !== undefined) {
		var stream = fs.createWriteStream(fname, "utf8")
		stream.write(text)
		stream.end()
	}
}