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

libraries.append("threex/videotexture.js")
libraries.append("threex/webcamtexture.js")

#libraries.append("leap/leap-0.6.4.min.js")
#libraries.append("leap/leap-plugins-0.1.11.min.js")

libraries.append("cannon/cannon.js")
libraries.append("cannon/ConvexGeometry.js")
libraries.append("cannon/CannonDebugRenderer.js")

libraries.append("opentype.min.js")
libraries.append("jszip.min.js")

# Then the code itself

source.append("input/Key.js")
source.append("input/Keyboard.js")
source.append("input/Mouse.js")

source.append("core/objects/animation/Bone.js")
source.append("core/objects/animation/Skeleton.js")

source.append("core/objects/device/LeapHand.js")
source.append("core/objects/device/KinectDevice.js")

source.append("core/objects/lights/PointLight.js")
source.append("core/objects/lights/SpotLight.js")
source.append("core/objects/lights/AmbientLight.js")
source.append("core/objects/lights/DirectionalLight.js")
source.append("core/objects/lights/HemisphereLight.js")
source.append("core/objects/lights/Sky.js")

source.append("core/objects/cameras/PerspectiveCamera.js")
source.append("core/objects/cameras/OrthographicCamera.js")

source.append("core/objects/Scene.js")
source.append("core/objects/Empty.js")
source.append("core/objects/Script.js")
source.append("core/objects/Blueprints.js")
source.append("core/objects/Model3D.js")
source.append("core/objects/AnimatedModel.js")
source.append("core/objects/Text3D.js")
source.append("core/objects/Sprite.js")

source.append("core/ObjectLoader.js")
source.append("core/Program.js")
source.append("core/ObjectUtils.js")

source.append("core/Component.js")
source.append("core/ComponentManager.js")

# Components

source.append("core/components/ElementComponent.js")
source.append("core/components/Object3DComponent.js")
source.append("core/components/Text3DComponent.js")
source.append("core/components/LightComponent.js")
source.append("core/components/SkyComponent.js")
source.append("core/components/BlueprintsComponent.js")
source.append("core/components/ScriptComponent.js")

# Blueprints Nodes
source.append("../libs/litegraph/litegraph.js")

source.append("core/blueprints/Nodes/Base.js")
source.append("core/blueprints/Nodes/Math/Math.js")
source.append("core/blueprints/Nodes/Math/Vector.js")
source.append("core/blueprints/Nodes/Objects.js")
source.append("core/blueprints/Nodes/Scene.js")

source.append("App.js")

# Libraries required to the Editor

editorLibs.append("litegui/litegui.min.js")
editorLibs.append("jscolor/jscolor.js")

editorLibs.append("litegraph/litegraph-editor.js")

editorLibs.append("codemirror/codemirror.js")
editorLibs.append("codemirror/mode/javascript/javascript.js")

# Css Files to the editor

editorCss.append("libs/litegui/litegui.css")

editorCss.append("libs/litegraph/litegraph.css")
editorCss.append("libs/litegraph/litegraph-editor.css")

editorCss.append("libs/codemirror/codemirror.css")
editorCss.append("libs/codemirror/theme/monokai.css")

editorCss.append("src/editor/utils/editor.css")

# Editor Code

editor.append("editor/tools/MoveTool.js")
editor.append("editor/tools/ResizeTool.js")
editor.append("editor/tools/RotateTool.js")

editor.append("editor/windows/AddMenuWindow.js")

editor.append("editor/tabs/CodeEditor.js")
editor.append("editor/tabs/SceneEditor.js")
editor.append("editor/tabs/SettingsTab.js")
editor.append("editor/tabs/BlueprintsEditor.js")
editor.append("editor/tabs/ObjectInspector.js")

editor.append("Editor.js")

editor.append("editor/UI.js")

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
