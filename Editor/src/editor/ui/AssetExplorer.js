"use strict"

function EditorUIAssetExplorer() {
	    // ----- EXPLORER -----

    EditorUI.asset_explorer = new LiteGUI.Panel({title: "Explorer"})
    EditorUI.left_area.getSection(1).add(EditorUI.asset_explorer)

    // ----- ASSET EXPLORER MENU -----

    EditorUI.asset_explorer_menu = new LiteGUI.Menubar()

    EditorUI.asset_explorer_menu.add("Import", {callback: () => {
        var w = new AssetExplorerImportWindow()
        w.show()
    }})

    EditorUI.asset_explorer_menu.add("Create", {callback: () => {
        var w = new AssetExplorerCreateWindow()
        w.show()
    }})

    EditorUI.asset_explorer_menu.attachToPanel(EditorUI.asset_explorer)

/*    EditorUI.asset_explorer_menu = new LiteGUI.Menubar()

    /// ----- OBJECTS -----
    EditorUI.asset_explorer_menu.add("Import/Objects/Wavefront", {callback: () => {
        App.chooseFile((fname) => {
            try {
                var loader = new THREE.OBJLoader()
                var obj = loader.parse(App.readFile(fname))

                Editor.addToScene(obj)
            } catch(e) {
                console.error("Error importing Object: " + e)
            }
        }, ".obj")
    }})

    // DAE
    EditorUI.asset_explorer_menu.add("Import/Objects/DAE", {callback: () => {
        App.chooseFile((fname) => {

            try {
                var loader = new THREE.ColladaLoader()
                var collada = loader.parse(App.readFile(fname))
                var scene = collada.scene

                Editor.addToScene(scene)
            } catch(e) {
                console.error("Error importing Object: " + e)
            }
        }, ".dae")
    }})

    // JSON
    EditorUI.asset_explorer_menu.add("Import/Objects/JSON", {callback: () => {
        App.chooseFile((fname) => {

            try {
                var loader = new THREE.JSONLoader()
                loader.load(fname, function(geometry, materials) {
                    var material = new MeshStandardMaterial()
                    var obj = new AnimatedModel(geometry, material)
                    Editor.addToScene(obj)
                })
            } catch(e) {
                console.error("Error importing Object: " + e)
            }
        }, ".json")
    }})

    // GLTF
    EditorUI.asset_explorer_menu.add("Import/Objects/GLTF", {callback: () => {
        App.chooseFile((f) => {
            try {
                var loader = new THREE.GLTFLoader()
                var gltf = loader.parse(App.readFile(f))
                console.log(gltf)
                if (gltf.scene !== undefined) {
                    Editor.addToScene(gltf.scene)
                }
            } catch(e) {
                console.error("Error importing Object: " + e)
            }
        })
    }})*/

/*    // VRML
    EditorUI.asset_explorer_menu.add("Import/Objects/VRML", {callback: () => {
        App.chooseFile((fname) => {

            try {
                var loader = new THREE.VRMLLoader()
                var scene = loader.parse(App.readFile(fname))

                for(var i = 0; i < scene.children.length; i++) {
                    Editor.addToScene(scene.children[i])
                }
            } catch(e) {
                console.error("Error importing Object: " + e)
            }
        }, ".wrl, .vrml")
    }})

    // FBX
    EditorUI.asset_explorer_menu.add("Import/Objects/FBX", {callback: () => {
        App.chooseFile((fname) => {

            try {
                var loader = new THREE.FBXLoader()
                var obj = loader.parse(App.readFile(fname))

                Editor.addToScene(obj)
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
                Editor.addToScene(new Sprite(material))
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
        var material = new MeshStandardMaterial()
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
        var material = new MeshBasicMaterial()
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
        var material = new MeshLambertMaterial()
        material.name = "lambert"
        Editor.program.addMaterial(material)
        Editor.updateObjectViews()
    }})

    EditorUI.asset_explorer_menu.add("Create/Material/Others/Shader Material", {callback: () => {
        var material = new MeshShaderMaterial()
        material.name = "shader"
        Editor.program.addMaterial(material)
        Editor.updateObjectViews()
    }})

    EditorUI.asset_explorer_menu.add("Create/Material/Others/Normal Material", {callback: () => {
        var material = new MeshNormalMaterial()
        material.name = "normal"
        Editor.program.addMaterial(material)
        Editor.updateObjectViews()
    }})

    EditorUI.asset_explorer_menu.add("Create/Material/Others/Depth Material", {callback: () => {
        var material = new MeshDepthMaterial()
        material.name = "depth"
        Editor.program.addMaterial(material)
        Editor.updateObjectViews()
    }})

    EditorUI.asset_explorer_menu.add("Create/Script", {callback: () => {
        // TODO: The Script won't be an scene element, but an asset
    }})
    
    EditorUI.asset_explorer_menu.attachToPanel(EditorUI.asset_explorer)*/

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