function EditorUIAssetExplorer() {
	    // ----- EXPLORER -----

    EditorUI.asset_explorer = new LiteGUI.Panel({title: "Explorer"})
    EditorUI.left_area.getSection(1).add(EditorUI.asset_explorer)

    // ----- ASSET EXPLORER MENU -----

    EditorUI.asset_explorer_menu = new LiteGUI.Menubar()

    EditorUI.asset_explorer_menu.add("Import/Objects/Wavefront", {callback: () => {
        App.chooseFile((fname) => {
            try {
                var loader = new THREE.OBJLoader()
                var obj = loader.parse(App.readFile(fname))

                ObjectUtils.setShadowCasting(obj, true)
                ObjectUtils.setShadowReceiving(obj, true)
                Editor.addToActualScene(ObjectUtils.convertFromThreeType(obj))
            } catch(e) {
                console.error("Error importing Object: " + e)
            }
        }, ".obj")
    }})

    EditorUI.asset_explorer_menu.add("Import/Objects/DAE", {callback: () => {
        App.chooseFile((fname) => {

            try {
                var loader = new THREE.ColladaLoader()

                var obj = loader.parse(App.readFile(fname))

                ObjectUtils.setShadowCasting(obj.scene, true)
                ObjectUtils.setShadowReceiving(obj.scene, true)

                Editor.addToActualScene(ObjectUtils.convertFromThreeType(obj.scene))
            } catch(e) {
                console.error("Error importing Object: " + e)
            }
        }, ".dae")
    }})

    EditorUI.asset_explorer_menu.add("Import/Objects/JSON", {callback: () => {
        App.chooseFile((fname) => {

            try {
                var loader = new THREE.JSONLoader()
                loader.load(fname, function(geometry, materials) {
                    for(var i = 0; i < materials.length; i++) {
                        var m = materials[i]
                        m.skinning = true
                        m.morphTargets = true
                    }

                    var material = new MeshPhongMaterial()
                    material.skinning = true
                    material.morphTargets = true

                    var obj = new AnimatedModel(geometry, material)// new THREE.MultiMaterial(materials))

                    Editor.addToActualScene(obj)
                })
            } catch(e) {
                console.error("Error importing Object: " + e)
            }
        }, ".json, .js")
    }})

    EditorUI.asset_explorer_menu.add("Import/Objects/VRML", {callback: () => {
        App.chooseFile((fname) => {

            try {
                var loader = new THREE.VRMLLoader()
                var obj = loader.parse(App.readFile(fname))

                ObjectUtils.setShadowCasting(obj, true)
                ObjectUtils.setShadowReceiving(obj, true)

                Editor.addToActualScene(ObjectUtils.convertFromThreeType(obj))
            } catch(e) {
                console.error("Error importing Object: " + e)
            }
        }, ".wrl, .vrml")
    }})

    EditorUI.asset_explorer_menu.add("Import/Objects/FBX", {callback: () => {
        App.chooseFile((fname) => {

            try {
                var loader = new THREE.FBXLoader()
                var obj = loader.parse(App.readFile(fname))

                ObjectUtils.setShadowCasting(obj, true)
                ObjectUtils.setShadowReceiving(obj, true)
                Editor.addToActualScene(ObjectUtils.convertFromThreeType(obj))
            } catch(e) {
                console.error("Error importing Object: " + e)
            }

        }, ".fbx")
    }})
    
    EditorUI.asset_explorer_menu.add("Import/Resources/Texture", {callback: () => {
        App.chooseFile((fname) => {

            try {
                var map = new Texture(fname)

                var material = new THREE.SpriteMaterial({map: map, color: 0xffffff})
                var sprite = new Sprite(material)
                Editor.addToActualScene(sprite)
            } catch(e) {console.error("Error importing texture: " + e)}
        }, "image/*")
    }})

    EditorUI.asset_explorer_menu.add("Import/Resources/Video", {callback: () => {
        App.chooseFile((fname) => {

            try {
                var map = new VideoTexture(fname)
                var material = new THREE.SpriteMaterial({map: map, color: 0xffffff})
                var sprite = new Sprite(material)
                Editor.addToActualScene(sprite)
            } catch(e) {console.error("Error loading file: " + e)}
        }, "video/*")
    }})

    EditorUI.asset_explorer_menu.add("Import/Resources/Audio", {callback: () => {
        App.chooseFile((event) => {
            // TODO: This
        }, "audio/*")
    }})

    // ----- CREATE -----

    EditorUI.asset_explorer_menu.add("Create/Material/Phong Material", {callback: () => {
        // TODO: Create Standard Material
    }})

    EditorUI.asset_explorer_menu.add("Create/Material/Standard Material", {callback: () => {
        // TODO: Create Sprite Material
    }})

    EditorUI.asset_explorer_menu.add("Create/Material/Sprite Material", {callback: () => {
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
    EditorUI.asset_explorer_list = EditorUI.asset_explorer_inspector.addList(null, EditorUI.asset_explorer_objects, {height: EditorUI.mainarea.getSection(0).getSection(1).getHeight()-60, callback_dblclick: (v) => {
        if (v.attachedTo instanceof THREE.Material) {
            var mat = new MaterialEditor(undefined, v.attachedTo)
            mat.updateInterface()
        }
    }, callback_contextmenu: (v, e) => {
        var context = new LiteGUI.ContextMenu([
            {
                title: "Rename",
                callback: () => {
                    if (v.attachedTo !== undefined || v.attachedTo !== null) {
                        var p = LiteGUI.prompt("Rename: " + v.attachedTo.name, (value) => {
                            if (value !== null) {
                                    Editor.renameObject(v.attachedTo, value)
                                //Editor.updateObjectViews()
                            }
                        }, {title: "Rename", value: v.attachedTo.name})
                    }
                }
            },
            {
                title: "Delete",
                callback: () => {

                }
            },
            {
                title: "Copy",
                callback: () => {
                    
                }
            }
        ], {title: v.name, event: e})
    }, callback_ondragstart: (v, e) => {
        // TODO: This
    }, callback_ondragend: (v, e) => {
        // TODO: This
        console.log("You ended dragging")
    }, callback_ondrop: (v, e) => {
        // TODO: This
        e.preventDefault()
    }, callback_ondragover: (v, e) => {
        // TODO: This
        e.preventDefault()
    }, ondragstart: (e) => {
        // TODO: This
    }, ondragend: (e) => {
        // TODO: This
    }, ondrop: (e) => {
        // TODO This
        e.preventDefault()
    }, ondragover: (e) => {
        // TODO: This
        e.preventDefault()
    }})

    EditorUI.asset_explorer_inspector.onchange = function(element, value, name) {  
        if (value.attachedTo !== undefined || value.attachedTo !== null) {
            Editor.selectObject(value.attachedTo)
        }
    }
    EditorUI.asset_explorer_objects = []

    EditorUI.asset_explorer.add(EditorUI.asset_explorer_inspector)
}

EditorUI.addObject = function(name, attachedTo) {
    
    var ins = attachedTo
    if (ins.name === undefined || ins.name === "" || ins.name === null) {
        if (attachedTo instanceof THREE.Material) {
            var name = "Material"
        }
    } else {
        var name = ins.name
    }

    var obj = {
        name: name,
        icon: ins.icon,
        attachedTo: ins,
        style: "width: 80px; display: inline-block; text-align: center;"
    }

    if(EditorUI.asset_explorer_objects !== undefined) {
        EditorUI.asset_explorer_objects.push(obj)
    }
    
    EditorUI.updateAssetExplorer()
}

EditorUI.updateAssetExplorer = function() {

    if(EditorUI.asset_explorer_objects !== undefined) {
        EditorUI.asset_explorer_list.updateItems(EditorUI.asset_explorer_objects)
    }
}