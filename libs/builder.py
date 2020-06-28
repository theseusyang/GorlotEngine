#!/usr/bin/python2

import sys
import os

libraries = []
source = []
editor = []
editorLibs = []
editorCss = []

# First, Libraries are added
libraries.append("three/three.min.js")
libraries.append("three/stats.min.js")

libraries.append("three/loaders/OBJLoader.js")
libraries.append("three/loaders/MTLLoader.js")
libraries.append("three/loaders/FBXLoader.js")
libraries.append("three/loaders/VRMLLoader.js")
libraries.append("three/loaders/ColladaLoader.js")
libraries.append("three/loaders/collada/Animation.js")
libraries.append("three/loaders/collada/AnimationHandler.js")
libraries.append("three/loaders/collada/KeyFrameAnimation.js")

libraries.append("three/cameras/CinematicCamera.js")

#libraries.append("leap/leap-0.6.4.min.js")
#libraries.append("leap/leap-plugins-0.1.11.min.js")

libraries.append("cannon/cannon.js")
libraries.append("cannon/ConvexGeometry.js")
libraries.append("cannon/CannonDebugRenderer.js")

libraries.append("opentype.min.js")
libraries.append("jszip.min.js")
libraries.append("SPE.min.js")

# Then the code itself

source.append("input/Key.js")
source.append("input/Keyboard.js")
source.append("input/Mouse.js")

source.append("core/ThreeExpand.js")
source.append("core/ObjectLoader.js")
source.append("core/Program.js")
source.append("core/ObjectUtils.js")
source.append("core/Global.js")

source.append("core/texture/TextTexture.js")
source.append("core/texture/VideoTexture.js")
source.append("core/texture/WebcamTexture.js")
source.append("core/texture/Texture.js")

source.append("core/loaders/FontLoader.js")

source.append("core/objects/lights/PointLight.js")
source.append("core/objects/lights/SpotLight.js")
source.append("core/objects/lights/AmbientLight.js")
source.append("core/objects/lights/DirectionalLight.js")
source.append("core/objects/lights/HemisphereLight.js")
source.append("core/objects/lights/Sky.js")

source.append("core/objects/cameras/PerspectiveCamera.js")
source.append("core/objects/cameras/OrthographicCamera.js")

source.append("core/objects/Bone.js")
source.append("core/objects/Scene.js")
source.append("core/objects/Empty.js")
source.append("core/objects/Script.js")
source.append("core/objects/Blueprints.js")
source.append("core/objects/Model3D.js")
source.append("core/objects/AnimatedModel.js")
source.append("core/objects/Text3D.js")
source.append("core/objects/Sprite.js")
source.append("core/objects/ParticleEmitter.js")
source.append("core/objects/Audio.js")

source.append("core/Component.js")
source.append("core/ComponentManager.js")

# Components

source.append("core/components/ElementComponent.js")

source.append("core/components/Objects/Object3DComponent.js")
source.append("core/components/Objects/Text3DComponent.js")

source.append("core/components/Lights/LightComponent.js")
source.append("core/components/Lights/SkyComponent.js")

source.append("core/components/Scripting/BlueprintsComponent.js")
source.append("core/components/Scripting/ScriptComponent.js")

source.append("core/components/Cameras/CameraComponent.js")

source.append("core/components/Containers/ProgramComponent.js")
source.append("core/components/Containers/SceneComponent.js")

# Blueprints Nodes
source.append("../libs/litegraph/litegraph.js")

source.append("core/Nodes/Blueprints/Base.js")
source.append("core/Nodes/Blueprints/Math/Math.js")
source.append("core/Nodes/Blueprints/Math/Vector.js")
source.append("core/Nodes/Blueprints/Logic.js")
source.append("core/Nodes/Blueprints/Arrays.js")
source.append("core/Nodes/Blueprints/Objects.js")
source.append("core/Nodes/Blueprints/Scene.js")

# Materials nodes
source.append("core/Nodes/Materials/Material.js")

source.append("core/Nodes/Register.js")

# Assets
source.append("core/assets/Materials/MeshPhongMaterial.js")

source.append("App.js")

# Libraries required to the Editor

editorLibs.append("litegui/litegui.js")
editorLibs.append("jscolor/jscolor.js")

editorLibs.append("codemirror/codemirror.js")
editorLibs.append("codemirror/mode/javascript/javascript.js")

# Css Files to the editor

editorCss.append("libs/litegui/litegui.css")

editorCss.append("libs/litegraph/litegraph.css")

editorCss.append("libs/codemirror/codemirror.css")
editorCss.append("libs/codemirror/theme/monokai.css")

editorCss.append("src/editor/utils/editor.css")

# Editor Code

editor.append("editor/tools/MoveTool.js")
editor.append("editor/tools/ResizeTool.js")
editor.append("editor/tools/RotateTool.js")

editor.append("editor/windows/AddMenuWindow.js")

editor.append("editor/tabs/CodeEditor.js")
editor.append("editor/tabs/MaterialEditor.js")
editor.append("editor/tabs/SceneEditor.js")
editor.append("editor/tabs/SettingsTab.js")
editor.append("editor/tabs/BlueprintsEditor.js")

editor.append("editor/ui/ObjectInspector.js")
editor.append("editor/ui/TopMenu.js")
editor.append("editor/ui/AssetExplorer.js")
editor.append("editor/ui/Hierarchy.js")

editor.append("editor/UI.js")

editor.append("Editor.js")

string = ''
stringE = ''
stringC = ''

# Libraries
for item in libraries:
    src_file = open(item, 'r')
    string += src_file.read() + "\n"

# Source
for item in source:
	src_file = open('../src/' + item,'r')
	string += src_file.read() + "\n"

# Editor libraries
for item in editorLibs:
    src_file = open(item, 'r')
    stringE += src_file.read() + "\n"

# Editor Source
for item in editor:
    src_file = open('../src/' + item, 'r')
    stringE += src_file.read() + "\n"

for item in editorCss:
    src_file = open("../" + item, 'r')
    stringC += src_file.read() + "\n"

roll_file = open('../build/App-rolling.js','w')
roll_file.write(string)
roll_file.close()

ed_file = open('../build/Editor-rolling.js', 'w')
ed_file.write(stringE)
ed_file.close()

cs_file = open('../build/Editor-rolling.css', 'w')
cs_file.write(stringC)
cs_file.close()
