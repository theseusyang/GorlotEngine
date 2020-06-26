function EditorUI() {}

// Due to scope, I declare some variables here
//var mainarea, canvas
EditorUI.mainarea
EditorUI.canvas

// Elements
//var hierarchy, asset_explorer, folder_explorer, explorer, tabs_widget
EditorUI.hierarchy
EditorUI.hierarchy_panel
EditorUI.asset_explorer
EditorUI.asset_explorer_menu
EditorUI.explorer
EditorUI.tabs_widget
EditorUI.topmenu
EditorUI.form

EditorUI.bot_tabs
EditorUI.asset_explorer_tab

EditorUI.assetEx_height = 226
EditorUI.ins = null

// Areas
//var mainarea, left_area, right_area 
EditorUI.mainarea
EditorUI.left_area
EditorUI.right_area

// TODO: Move some elements to their own files

EditorUI.Initialize = function() {

    // Initializing the LiteGUI library
    LiteGUI.init()

    // ----- TOP MENU -----
    EditorUI.topmenu = new LiteGUI.Menubar("topmenubar")
    LiteGUI.add(EditorUI.topmenu)

    // ----- FILE -----
    EditorUI.topmenu.add("File/New", {callback: () => {
        LiteGUI.confirm("All unsaved changes to the project will be lost! Create new project?", (v) => {
            if(v) {
                Editor.createNewProgram()
                Editor.updateTreeView()
                Editor.updateObjectHelper()
                EditorUI.updateable = []
            }
        }, {title: "New Project"})
    }})
   
    EditorUI.topmenu.add("File/Open", {callback: () => {

        var confirm = LiteGUI.confirm("All unsaved changes to the project will be lost! Load file?", (v) => {
            if(v) {
                App.chooseFile((event) => {
                    var file = event.srcElement.value
                    try {
                        Editor.loadProgram(file)
                        console.log("Project loaded")
                    } catch (e) { console.error("Error loading file, exception: " + e) }
                }, ".json")
            }
        }, {title: "Open project"})
    }})
    
    EditorUI.topmenu.add("File/Save", {callback: () => {
        // TODO: Create a toJSON function to every object, so the components can be serialized

        App.chooseFile((event) => {
            var file = event.srcElement.value

            try {
                Editor.saveProgram(file)
                console.log("Project saved")
            } catch(e) {
                console.error("Error saving file: " + e)
            }

        }, ".json", true)
    }})

    EditorUI.topmenu.add("File/Exit", {callback: () => {
        LiteGUI.confirm("All unsaved changes to the project will be lost! Do you really want to exit?", (v) => {
            if (v) {
                Editor.exit()
            }
        }, {title: "Exit"})
    }})

    // TODO: Tools in a sidebar to make its interface easier to use
        
    // ----- TOOLS -----

    EditorUI.topmenu.add("Edit/Tools/Select", {callback: () => {
        //TODO: Select Tool
        Editor.tool_mode = Editor.MODE_SELECT
        // TODO: Highlight this tool (Only this one)
    }})

    EditorUI.topmenu.add("Edit/Tools/Move", {callback: () => {
        //TODO: Move Tool
        Editor.tool_mode = Editor.MODE_MOVE
        //TODO: Highlight this tool (Only this one)
    }})

    EditorUI.topmenu.add("Edit/Tools/Resize", {callback: () => {
        //TODO: Resize Tool
        Editor.tool_mode = Editor.MODE_RESIZE
        //TODO: Highlight this tool (Only this one)
    }})

    EditorUI.topmenu.add("Edit/Tools/Rotate", {callback: () => {
        //TODO: Rotate Tool
        Editor.tool_mode = Editor.MODE_ROTATE
        //TODO: Highlight this tool (Only this one)
    }})

    // ----- Add Scene -----
    EditorUI.topmenu.add("Edit/Project/Add Scene", {callback: () => {
        var scene = Editor.program.addDefaultScene()
        Editor.renameObject(scene, scene.name)
        Editor.updateTreeView()
    }})

    // ----- Preferences -----
    EditorUI.topmenu.add("Edit/Project/Project Settings", {callback: () => {
        EditorUI.projectSettings = new SettingsTab()
        EditorUI.projectSettings.updateInterface()
    }})
    
    // ----- Add -----

    EditorUI.topmenu.add("Add", {callback: () => {
        var wind = new AddMenuWindow()
        wind.show()
    }})

    // ----- RUN -----

    EditorUI.topmenu.add("Run", {callback: () => {
        // If added a new menu before of this one, change the "3" number
        var menuItem = EditorUI.topmenu.findMenu("Run")

        if(menuItem === null) {
            // If the menuItem name ain't Run but Stop
            var menuItem = EditorUI.topmenu.findMenu("Stop")
        }

        if(Editor.state === Editor.STATE_EDITING) {
            menuItem.name = "Stop"
            EditorUI.selectPreviousTab()
            Editor.setState(Editor.STATE_TESTING)
        } else if(Editor.state === Editor.STATE_TESTING) {
            menuItem.name = "Run"
            Editor.setState(Editor.STATE_EDITING)
        }

        //EditorUI.updateInterface()
        EditorUI.topmenu.updateMenu()
    }})

    // ----- HELP -----
    
    // Documentation
    EditorUI.topmenu.add("Help/Documentation", {callback: () => {
        //TODO: Open Documentation
    }})

    // About
    EditorUI.topmenu.add("Help/About", {callback: () => {
        //TODO: Show About
    }})

    // ----- MAINAREA SPLIT ----- 
    EditorUI.mainarea = new LiteGUI.Area({autoresize: true})
    EditorUI.mainarea.split("horizontal", [null, 400], true)
    EditorUI.mainarea.onresize = EditorUI.Resize
    LiteGUI.add(EditorUI.mainarea)

    EditorUI.left_area = EditorUI.mainarea.getSection(0)
    EditorUI.right_area = EditorUI.mainarea.getSection(1)

    // ----- TABS -----
    EditorUI.tabs_widget = new LiteGUI.Tabs()
    EditorUI.left_area.add(EditorUI.tabs_widget)

    // ----- CANVAS -----
    EditorUI.canvas = new SceneEditor()

    // ----- CANVAS AREA SPLIT -----
    EditorUI.left_area.split("vertical", [null, EditorUI.assetEx_height-26], false)
    EditorUI.left_area.onresize = EditorUI.resizeCanvas


    // ----- EXPLORER -----

    EditorUI.asset_explorer = new LiteGUI.Panel({title: "Explorer", scroll: true})
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

                    var obj = new AnimatedModel(geometry, new THREE.MultiMaterial(materials))

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

    /*EditorUI.asset_explorer_menu.add("Import/Objects/FBX", {callback: () => {
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
    }})*/

    EditorUI.asset_explorer_menu.add("Import/Resources/Texture", {callback: () => {
        App.chooseFile((event) => {
            var file = event.srcElement.value

            try {
                var map = new THREE.TextureLoader().load(file)

                var material = new THREE.SpriteMaterial({map: map, color: 0xffffff})
                var sprite = new Sprite(material)
                Editor.addToActualScene(sprite)

                console.log("Texture imported")
            } catch(e) {console.error("Error importing texture: " + e)}
        }, "image/*")
    }})

    EditorUI.asset_explorer_menu.attachToPanel(EditorUI.asset_explorer)

    // ----- TREE -----
    EditorUI.right_area.split("vertical", [null, EditorUI.assetEx_height + 200], true)
    
    EditorUI.hierarchy_panel = new LiteGUI.Panel({title: "Hierarchy", scroll: true})
    EditorUI.right_area.getSection(0).add(EditorUI.hierarchy_panel)
    
    EditorUI.hierarchy = new LiteGUI.Tree({
        id: "Program",
        children: []
    }, {
        allow_drag: true,
        height: EditorUI.right_area.getSection(0).getHeight(),
    })
    EditorUI.hierarchy_panel.add(EditorUI.hierarchy)

    // When selecting an object in the hierarchy, that object will be selected
    LiteGUI.bind(EditorUI.hierarchy.root, "item_selected", function(e) {
        if(e.detail.data.attachedTo != Editor.program) {
            Editor.selectObject(e.detail.data.attachedTo)
            EditorUI.updateInspector(e.detail.data.attachedTo)
        } else {
            // TODO: A program component in which you can modify its info
            // Or open the project settings, and you can do so in there
        }
    })

    // When an item is moved, this will check if we should set a parent
    LiteGUI.bind(EditorUI.hierarchy.root, "item_moved", function(e) {
        if (e.detail.parent_item) {
            var parObj = e.detail.parent_item.data.attachedTo
            var obj = e.detail.item.data.attachedTo

            if (parObj != null) {
                parObj.add(obj)
                Editor.updateTreeView()
            } else {
                Editor.updateTreeView()
            }
        }
    })

    // If an item in the hierarchy is double clicked and that object can add a new tab, this will open it
    LiteGUI.bind(EditorUI.hierarchy.root, "item_dblclicked", function(e) {
        var data = e.detail.data

        // Script
        if (data.attachedTo instanceof Script) {

            var id = CodeEditor.id-1
            EditorUI.tabs_widget.removeTab("Code Editor " + id)

            EditorUI.code = new CodeEditor()
            EditorUI.code.attachScript(data.attachedTo)
            EditorUI.code.updateInterface()
        }
        else if (data.attachedTo instanceof Scene) {
            var id = SceneEditor.id-1
            EditorUI.tabs_widget.removeTab("Scene Editor " + id)

            var container = new SceneEditor()
            container.setScene(data.attachedTo)
            container.updateInterface()
            container.activate()
        }
    })

    // When renaming an object, renaming it in the scene
    LiteGUI.bind(EditorUI.hierarchy.root, "item_renamed", function(e) {
        //Editor.renameObject(e.detail.data.attachedTo, e.detail.new_name)
    })

    EditorUI.inspector = new LiteGUI.Panel({title: "Inspector", scroll: true})
    EditorUI.right_area.getSection(1).add(EditorUI.inspector)

    EditorUI.form = new LiteGUI.Inspector({full: true})
    EditorUI.inspector.content.appendChild(EditorUI.form.root)

    // Call to the resize method
    EditorUI.Resize()
}

EditorUI.removeAllTabs = function() {
    if(Editor.tabs_widget !== undefined) {
        var num = EditorUI.tabs_widget.getNumOfTabs()
    
        for(var i = 0; i < num; i++) {
            console.log(i)
            EditorUI.tabs_widget.getTabByIndex(i).destroy()
        }
    }
}

EditorUI.selectPreviousTab = function() {
    var tab = EditorUI.tabs_widget.getPreviousTab()

    if(tab === undefined || Editor.state === Editor.STATE_EDITING) {
        EditorUI.tabs_widget.selectTab(EditorUI.canvas.id)
    } else {
        EditorUI.tabs_widget.selectTab(tab)
    }
}

EditorUI.updateInterface = function () {
    EditorUI.canvas.updateInterface()
}

EditorUI.updateInspector = function() {
    EditorUI.ins = null

    if(Editor.selected_object != null) {
        var object = Editor.selected_object
    
        EditorUI.ins = new ObjectInspector()
        EditorUI.form.onchange = EditorUI.ins.updateInfo
    } else {
        if(EditorUI.form !== undefined) {
            EditorUI.form.clear()
        }
    }
}

EditorUI.hierarchyFromScene = function(scene) {
    if(EditorUI.hierarchy !== undefined) {
        EditorUI.hierarchy.updateTree({id: Editor.program.name, attachedTo: Editor.program, children: []})
    
        Editor.program.children.forEach((item, index) => {
            var it = EditorUI.hierarchy.insertItem({id: Editor.program.children[index].name, attachedTo: Editor.program.children[index]})
            
            it.addEventListener("contextmenu", (e) => {
                return EditorUI.hierarchyContext(e, {item: it, data: it.data})
            })
    
            if(Editor.program.children[index].children.length > 0){
                EditorUI.addChildrenToHierarchy(Editor.program.children[index], Editor.program.children[index].name)
            }
        })
    }
}

EditorUI.addChildrenToHierarchy = function(object, parent) {
    object.children.forEach((v, i) => {
        var it = EditorUI.hierarchy.insertItem({id: object.children[i].name, attachedTo: object.children[i]}, parent)
        
        it.addEventListener("contextmenu", (e) => {
            return EditorUI.hierarchyContext(e, {item: it, data: it.data})
        })

        if (object.children[i].children.length > 0) {
            EditorUI.addChildrenToHierarchy(object.children[i], object.children[i].name, parent)
        }
    })
}

EditorUI.hierarchyContext = function(e, data) {
    var object = data.data.attachedTo
    Editor.selectObject(object)

    var context = new LiteGUI.ContextMenu([
        {title: "Copy", callback: () => {
            Editor.copySelectedObject()
        }},
        {title: "Cut", callback: () => {
            Editor.cutSelectedObject()
        }},
        {title: "Paste", callback: () => {
            Editor.pasteIntoSelectedObject()
        }},
        {title: "Duplicate", callback: () => {
            // TODO: This
        }},
        {title: "Delete", callback: () => {
            EditorUI.deleteObject(object)
        }}
    ], {title: "Edit item", event: e})
}

EditorUI.deleteObject = function(object) {
    // Delete object
    if ((object !== null) && (object.parent !== null)) {

        if(!(object instanceof Scene)) {
            object.parent.remove(object)
        } else {
            // If the object to select is an scene
            var tab = EditorUI.tabs_widget.getCurrentTab()
            if (tab.id !== EditorUI.canvas.id) {
                // This avoids the user to delete the scene he is currently editing
                object.parent.remove(object)
            }
        }

        Editor.updateTreeView()
    }

    // If this object is selected, reset editing flags
    if (Editor.isObjectSelected(object)) {
        Editor.resetEditingFlags()
    }
}

EditorUI.Resize = function() {
    EditorUI.updateInterface()
}