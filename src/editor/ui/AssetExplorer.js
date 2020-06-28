function EditorUIAssetExplorer() {
	    // ----- EXPLORER -----

    EditorUI.asset_explorer = new LiteGUI.Panel({title: "Explorer"})
    EditorUI.left_area.getSection(1).add(EditorUI.asset_explorer)

    // ----- ASSET EXPLORER MENU -----

    EditorUI.asset_explorer_menu = new LiteGUI.Menubar()

    EditorUI.asset_explorer_menu.add("Import/Objects/OBJ", {callback: () => {
        App.chooseFile((event) => {
            var file = event.srcElement.value

            try {
                var loader = new THREE.OBJLoader()

                var obj = loader.parse(App.readFile(file))

                ObjectUtils.setShadowCasting(obj, true)
                ObjectUtils.setShadowReceiving(obj, true)

                Editor.addToActualScene(ObjectUtils.convertFromThreeType(obj))

                console.log("Object imported")
            } catch(e) {
                console.error("Error importing Object: " + e)
            }
        }, ".obj")
    }})

    EditorUI.asset_explorer_menu.add("Import/Objects/DAE", {callback: () => {
        App.chooseFile((event) => {
            var file = event.srcElement.value
            try {
                var loader = new THREE.ColladaLoader()

                var obj = loader.parse(App.readFile(file))

                ObjectUtils.setShadowCasting(obj.scene, true)
                ObjectUtils.setShadowReceiving(obj.scene, true)

                Editor.addToActualScene(ObjectUtils.convertFromThreeType(obj.scene))

                console.log("Object imported")
            } catch(e) {
                console.error("Error importing Object: " + e)
            }
        }, ".dae")
    }})

    EditorUI.asset_explorer_menu.add("Import/Objects/JSON", {callback: () => {
        App.chooseFile((event) => {
            var file = event.srcElement.value

            try {
                var loader = new THREE.JSONLoader()
                loader.load(file, function(geometry, materials) {
                    for(var i = 0; i < materials.length; i++) {
                        var m = materials[i]
                        m.skinning = true
                        m.morphTargets = true
                    }

                    var material = new THREE.MeshPhongMaterial()
                    material.skinning = true
                    material.morphTargets = true

                    var obj = new AnimatedModel(geometry, material)// new THREE.MultiMaterial(materials))

                    Editor.addToActualScene(obj)
                })

                console.log("Object imported")
            } catch(e) {
                console.error("Error importing Object: " + e)
            }
        }, ".json, .js")
    }})

    EditorUI.asset_explorer_menu.add("Import/Objects/VRML", {callback: () => {
        App.chooseFile(function(event) {
            var file = event.srcElement.value

            try {
                var loader = new THREE.VRMLLoader()
                var obj = loader.parse(App.readFile(file))

                ObjectUtils.setShadowCasting(obj, true)
                ObjectUtils.setShadowReceiving(obj, true)

                Editor.addToActualScene(ObjectUtils.convertFromThreeType(obj))

                console.log("Object imported")
            } catch(e) {
                console.error("Error importing Object: " + e)
            }
        }, ".wrl, .vrml")
    }})

    EditorUI.asset_explorer_menu.add("Import/Objects/FBX", {callback: () => {
        App.chooseFile(function(event) {
            var file = event.srcElement.value

            try {
                var loader = new THREE.FBXLoader()
                var obj = loader.parse(App.readFile(file))

                ObjectUtils.setShadowCasting(obj, true)
                ObjectUtils.setShadowReceiving(obj, true)
                Editor.addToActualScene(ObjectUtils.convertFromThreeType(obj))
            } catch(e) {
                console.error("Error importing Object: " + e)
            }

        }, ".fbx")
    }})
    
    EditorUI.asset_explorer_menu.add("Import/Resources/Texture", {callback: () => {
        App.chooseFile((event) => {
            var file = event.srcElement.value

            try {
                var map = new Texture(file)

                var material = new THREE.SpriteMaterial({map: map, color: 0xffffff})
                var sprite = new Sprite(material)
                Editor.addToActualScene(sprite)

                console.log("Texture imported")
            } catch(e) {console.error("Error importing texture: " + e)}
        }, "image/*")
    }})

    EditorUI.asset_explorer_menu.add("Import/Resources/Video", {callback: () => {
        App.chooseFile((event) => {
            var file = event.srcElement.value

            try {
                var map = new VideoTexture(file)
                var material = new THREE.SpriteMaterial({map: map, color: 0xffffff})
                var sprite = new Sprite(material)
                Editor.addToActualScene(sprite)
            } catch(e) {console.error("Error loading file: " + e)}
        }, "video/*")
    }})

    EditorUI.asset_explorer_menu.add("Import/Resources/Audio", {callback: () => {
        App.chooseFile((event) => {

        }, "audio/*")
    }})

    // ----- CREATE -----

    EditorUI.asset_explorer_menu.add("Create/Material/Standard Material", {callback: () => {
        // TODO: Create Standard Material
    }})

    EditorUI.asset_explorer_menu.add("Create/Material/Sprite Material", {callback: () => {
        // TODO: Create Sprite Material
    }})

    EditorUI.asset_explorer_menu.add("Create/Material/Phong Material", {callback: () => {
        // TODO: Create Phong Material
    }})

    EditorUI.asset_explorer_menu.add("Create/Material/Shader Material", {callback: () => {
        // TODO: Create Shader Material
    }})

    EditorUI.asset_explorer_menu.add("Create/Material/Lambert Material", {callback: () => {
        // TODO: Create Lambert Material
    }})

    EditorUI.asset_explorer_menu.add("Create/Script", {callback: () => {
        // TODO: The Script won't be an scene element, but an asset
    }})
    
    EditorUI.asset_explorer_menu.attachToPanel(EditorUI.asset_explorer)

    EditorUI.asset_explorer_inspector = new LiteGUI.Inspector()
    EditorUI.asset_explorer_list = EditorUI.asset_explorer_inspector.addList(null, EditorUI.asset_explorer_objects)
    EditorUI.asset_explorer_objects = []

    EditorUI.addObject("Test Script", "Script")
    EditorUI.addObject("Script 2", "Script")
    EditorUI.addObject("Material", "Material")

    EditorUI.asset_explorer.add(EditorUI.asset_explorer_inspector)
}

EditorUI.addObject = function(name, type) {
    
    var obj = {
        "name": name,
        "type": type
    }

    EditorUI.asset_explorer_objects.push(obj)
    EditorUI.asset_explorer_list.updateItems(EditorUI.asset_explorer_objects)
}