"use strict";

//List of object icon path by object type
function ObjectIcons(){}

//Create icon map
ObjectIcons.icons = [];

//Default icon
ObjectIcons.icons["Object3D"] = "src/editor/files/icons/tab/scene.png";

//Devices
ObjectIcons.icons["Kinect"] = "src/editor/files/icons/hw/kinect.png";
ObjectIcons.icons["LeapDevice"] = "src/editor/files/icons/hw/leap.png";

//Ligths
ObjectIcons.icons["Sky"] = "src/editor/files/icons/lights/sky.png";
ObjectIcons.icons["SpotLight"] = "src/editor/files/icons/lights/spot.png";
ObjectIcons.icons["PointLight"] = "src/editor/files/icons/lights/point.png";
ObjectIcons.icons["HemisphereLight"] = "src/editor/files/icons/lights/hemisphere.png";
ObjectIcons.icons["DirectionalLight"] = "src/editor/files/icons/lights/directional.png";
ObjectIcons.icons["AmbientLight"] = "src/editor/files/icons/lights/ambient.png";

//Cameras
ObjectIcons.icons["PerspectiveCamera"] = "src/editor/files/icons/camera/prespective.png";
ObjectIcons.icons["OrthographicCamera"] = "src/editor/files/icons/camera/orthographic.png";

//Objects
ObjectIcons.icons["Mesh"] = "src/editor/files/icons/models/cube.png";
ObjectIcons.icons["SkinnedMesh"] = "src/editor/files/icons/animation/skeleton.png";
ObjectIcons.icons["ParticleEmiter"] = "src/editor/files/icons/effects/particles.png";
ObjectIcons.icons["Script"] = "src/editor/files/icons/script/script.png";
ObjectIcons.icons["BlockScript"] = "src/editor/files/icons/script/blocks.png";
ObjectIcons.icons["Sprite"] = "src/editor/files/icons/assets/image.png";
ObjectIcons.icons["Text3D"] = "src/editor/files/icons/models/text.png";

//Program
ObjectIcons.icons["Program"] = "src/editor/files/icons/script/script.png";
ObjectIcons.icons["Scene"] = "src/editor/files/icons/models/models.png";

//Audio
ObjectIcons.icons["Audio"] = "src/editor/files/icons/assets/audio.png";

//Physics
ObjectIcons.icons["Physics"] = "src/editor/files/icons/physics/physics.png";

//Others
ObjectIcons.icons["Bone"] = "src/editor/files/icons/animation/bone.png";
ObjectIcons.icons["Group"] = "src/editor/files/icons/effects/container.png";

//Get icon path from object type
ObjectIcons.get = function(type)
{
	return ObjectIcons.icons[type];
}