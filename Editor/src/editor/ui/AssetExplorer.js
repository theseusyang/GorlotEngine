function EditorUIAssetExplorer() {
	    // ----- EXPLORER -----

    EditorUI.asset_explorer = new LiteGUI.Panel({title: "Explorer"})
    EditorUI.left_area.getSection(1).add(EditorUI.asset_explorer)

    // ----- ASSET EXPLORER MENU -----

    EditorUI.asset_explorer_menu = new LiteGUI.Menubar()

    /// ----- OBJECTS -----
    EditorUI.asset_explorer_menu.add("Import/Objects/Wavefront", {callback: () => {
        App.chooseFile((fname) => {
            try {
                var loader = new THREE.OBJLoader()
                var obj = loader.parse(App.readFile(fname))

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
                    var material = new MeshPhongMaterial()
                    material.skinning = true

                    var obj = new AnimatedModel(geometry, material)
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

                Editor.addToActualScene(ObjectUtils.convertFromThreeType(obj))
            } catch(e) {
                console.error("Error importing Object: " + e)
            }

        }, ".fbx")
    }})
    
    /// ----- RESOURCES -----
    EditorUI.asset_explorer_menu.add("Import/Resources/Texture", {callback: () => {
        App.chooseFile((f) => {
            try {
                var texture = new Texture(f)
                // TODO: This
            } catch(e) {
                console.error(`Error loading texture\n${e}`)
            }
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
            try {

            } catch (e) {
                console.error("Error loading file\n"+e)
            }
        }, "audio/*")
    }})

    // ----- CREATE -----

    EditorUI.asset_explorer_menu.add("Create/Material/Standard Material", {callback: () => {
        var material = new StandardMaterial()
        material.name = "standard"
        Editor.program.addMaterial(material)
        Editor.updateObjectViews()
    }})
    
    EditorUI.asset_explorer_menu.add("Create/Material/Phong Material", {callback: () => {
        var material = new MeshPhongMaterial()
        material.name = "phong"
        Editor.program.addMaterial(material)
        Editor.updateObjectViews()
    }})

    EditorUI.asset_explorer_menu.add("Create/Material/Basic Material", {callback: () => {
        var material = new BasicMaterial()
        material.name = "basic"
        Editor.program.addMaterial(material)
        Editor.updateObjectViews()
    }})

    EditorUI.asset_explorer_menu.add("Create/Material/Sprite Material", {callback: () => {
        var material = new THREE.SpriteMaterial({color: 0xffffff})
        material.name = "sprite"
        Editor.program.addMaterial(material)
        Editor.updateObjectViews()
    }})

    EditorUI.asset_explorer_menu.add("Create/Material/Others/Lambert Material", {callback: () => {
        var material = new LambertMaterial()
        material.name = "lambert"
        Editor.program.addMaterial(material)
        Editor.updateObjectViews()
    }})

    EditorUI.asset_explorer_menu.add("Create/Material/Others/Shader Material", {callback: () => {
        var material = new ShaderMaterial()
        material.name = "shader"
        Editor.program.addMaterial(material)
        Editor.updateObjectViews()
    }})

    EditorUI.asset_explorer_menu.add("Create/Material/Others/Normal Material", {callback: () => {
        var material = new NormalMaterial()
        material.name = "normal"
        Editor.program.addMaterial(material)
        Editor.updateObjectViews()
    }})

    EditorUI.asset_explorer_menu.add("Create/Material/Others/Depth Material", {callback: () => {
        var material = new DepthMaterial()
        material.name = "depth"
        Editor.program.addMaterial(material)
        Editor.updateObjectViews()
    }})

    EditorUI.asset_explorer_menu.add("Create/Script", {callback: () => {
        // TODO: The Script won't be an scene element, but an asset
    }})
    
    EditorUI.asset_explorer_menu.attachToPanel(EditorUI.asset_explorer)

    var self = this

    EditorUI.asset_explorer_inspector = new LiteGUI.Inspector()
    EditorUI.asset_explorer_list = EditorUI.asset_explorer_inspector.addList(null, EditorUI.asset_explorer_objects, {height: EditorUI.mainarea.getSection(0).getSection(1).getHeight()-60, callback_dblclick: (v) => {
        if (v.attachedTo instanceof THREE.Material) {
            EditorUI.matEd = new MaterialEditor(undefined, v.attachedTo)
            EditorUI.matEd.updateInterface()
        } else if (v.attachedTo instanceof THREE.Texture) {
            // TODO: Texture viewer/editor?
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
                            }
                        }, {title: "Rename", value: v.attachedTo.name})
                    }
                }
            },
            {
                title: "Delete",
                callback: () => {
                    if (v.attachedTo !== undefined || v.attachedTo !== null) {
                        // TODO: Delete
                    }
                }
            },
            {
                title: "Copy",
                callback: () => {
                    if (v.attachedTo !== undefined || v.attachedTo !== null) {
                        if (v.attachedTo instanceof MeshPhongMaterial) {
                            // TODO: Every material can be copied
                            try {
                                App.clipboard.set(JSON.stringify(v.attachedTo.toJSON()), "text")
                            } catch(e) {
                                console.log(e)
                            }
                        }
                    }
                }
            }
        ], {title: v.attachedTo.name, event: e})
    }, callback_ondragstart: (v, e) => {
        if (v.attachedTo instanceof THREE.Material) {
            // Insert material into drag buffer
            e.dataTransfer.setData("uuid", v.attachedTo.uuid)
            DragBuffer.pushDragElement(v.attachedTo)

            // To avoid camera movement
            Mouse.updateKey(Mouse.LEFT, Key.KEY_UP)
        }
    }, callback_ondragend: (v, e) => {
        if (v.attachedTo instanceof THREE.Material) {
            EditorUI.restoreMaterial(v.attachedTo)
        }
        
        // Try to remove events from drag buffer
        var uuid = e.dataTransfer.getData("uuid")
        var obj = DragBuffer.popDragElement(uuid)

    }, callback_ondrop: (v, e) => {
        // TODO: This
        e.preventDefault()
    }, callback_ondragover: (v, e) => {
        // TODO: This
        e.preventDefault()
    }, ondragstart: (v, e) => {
        // TODO: This
    }, ondragend: (v, e) => {
        // TODO: This
    }, ondrop: (e) => {
        // TODO This
        e.preventDefault()
    }, ondragover: (e) => {
        // TODO: This
        e.preventDefault()
    }, callback_onmouseenter: (v, e) => {
        if (e.attachedTo instanceof THREE.Material) {
            if (e.attachedTo.color !== undefined) {
                EditorUI.color.copy(e.attachedTo.color)
                e.attachedTo.color.setRGB(1, 0, 0)
            }
        }
    }, callback_onmouseleave: (v, e) => {
        if (e.attachedTo instanceof THREE.Material) {
            if (e.attachedTo.color !== undefined) {
                e.attachedTo.color.copy(EditorUI.color)
            }
        }
    }})

    EditorUI.asset_explorer_inspector.onchange = function(element, value, name) {  
        if (value.attachedTo !== undefined || value.attachedTo !== null) {
            Editor.selectObject(value.attachedTo)
        }
    }
    EditorUI.asset_explorer_objects = []

    EditorUI.asset_explorer.add(EditorUI.asset_explorer_inspector)
}

EditorUI.color = new THREE.Color(0,0,0)

EditorUI.restoreMaterial = function(material) {

    if(material.color !== undefined) {
        material.color.copy(EditorUI.color)
    }
    
    Editor.updateObjectViews()
}

EditorUI.addAsset = function(name, attachedTo) {
    
    var ins = attachedTo
    if (ins.name === undefined || ins.name === "" || ins.name === null) {
        var name = "unnamed"
    } else {
        var name = ins.name
    }

    if(ins instanceof THREE.Material) {
        var fil = new MaterialFile(name)
        fil.attachMaterial(ins)
    } else if (ins instanceof THREE.Texture) {
        var fil = new TextureFile(name)
        fil.attachTexture(ins)
    } else {
        // Default
        var fil = new File(name)
        fil.attachAsset(ins)
    }

    var obj = fil.getObject()

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