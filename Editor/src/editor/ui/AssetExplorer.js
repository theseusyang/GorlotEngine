"use strict"

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
                var material = new THREE.SpriteMaterial({map: new VideoTexture(fname), color: 0xffffff})
                material.name = "video"
                Editor.addToActualScene(new Sprite(material))
            } catch(e) {console.error("Error loading file: " + e)}
        }, "video/*")
    }})

    EditorUI.asset_explorer_menu.add("Import/Resources/Font", {callback: () => {
        App.chooseFile((fname) => {

            try {
                // TODO: This
            } catch(e) {
                console.error("Error loading file: " + e)
            }

        }, ".json, .ttf, .otf")
    }})

    EditorUI.asset_explorer_menu.add("Import/Resources/Audio", {callback: () => {
        App.chooseFile((event) => {
            // TODO: This
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

    EditorUI.asset_explorer_panel = new LiteGUI.Panel({scroll: true})
    EditorUI.asset_explorer.add(EditorUI.asset_explorer_panel)

    EditorUI.asset_explorer_objects = []

}

EditorUI.addAsset = function(name, attachedTo) {

    if (EditorUI.asset_explorer_objects !== undefined) {

        if (attachedTo instanceof THREE.Material) {
            var fil = new MaterialFile(attachedTo.name, EditorUI.asset_explorer_panel.content)
            fil.attachAsset(attachedTo)
        }

        EditorUI.asset_explorer_objects.push(fil)
        EditorUI.updateAssetExplorer()
    }
}

EditorUI.updateAssetExplorer = function() {
    if(EditorUI.asset_explorer_panel !== undefined) {
        EditorUI.asset_explorer_panel.content.innerHTML = ""

        if (EditorUI.asset_explorer_objects !== undefined) {
            for(var i = 0; i < EditorUI.asset_explorer_objects.length; i++) {
                var file = EditorUI.asset_explorer_objects[i]
                file.show()
            }
        }

    }
}