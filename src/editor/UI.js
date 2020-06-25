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
EditorUI.console

EditorUI.assetEx_height = 200
EditorUI.ins = null

// Areas
//var mainarea, left_area, right_area 
EditorUI.mainarea
EditorUI.left_area
EditorUI.right_area

EditorUI.updateable = []

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
        var scene = new Scene()
        Editor.program.add(scene)
        Editor.renameObject(scene, scene.name)
        Editor.updateTreeView()
    }})

    // ----- Preferences -----
    EditorUI.topmenu.add("Edit/Project/Project Settings", {callback: () => {
        // TODO: Create TAB (in the canvas zone) containing the Project Settings
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

        if(menuItem == null) {
            // If the menuItem name ain't Run but Stop
            var menuItem = EditorUI.topmenu.findMenu("Stop")
        }

        if(Editor.state === Editor.STATE_EDITING) {
            menuItem.name = "Stop"
            Editor.state = Editor.STATE_TESTING
        } else if(Editor.state === Editor.STATE_TESTING) {
            menuItem.name = "Run"
            Editor.state = Editor.STATE_EDITING
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
    EditorUI.tabs_widget.addTab("Scene Editor", {selected: true, closable: false, })
    EditorUI.left_area.add(EditorUI.tabs_widget)

    // ----- CANVAS -----
    EditorUI.canvas = document.createElement("canvas")
    EditorUI.canvas.id = "canvas"
    
    // Add the Canvas to the Scene Editor tab
    EditorUI.tabs_widget.getTabContent("Scene Editor").appendChild(EditorUI.canvas)

    // ----- CANVAS AREA SPLIT -----
    EditorUI.left_area.split("vertical", [null, EditorUI.assetEx_height], false)
    EditorUI.left_area.onresize = EditorUI.resizeCanvas


    // ----- BOT TABS -----

    //EditorUI.bot_tabs = new LiteGUI.Tabs()
    //EditorUI.bot_tabs.addTab("Explorer",{selected: true, width: "100%"})
    //EditorUI.bot_tabs.addTab("Console", {selected: false, width: "100%"})
    //EditorUI.left_area.getSection(1).add(EditorUI.bot_tabs)

    // ----- EXPLORER -----

    EditorUI.asset_explorer = new LiteGUI.Panel({title: "Explorer", scroll: true})
    EditorUI.left_area.getSection(1).add(EditorUI.asset_explorer)
    //EditorUI.bot_tabs.getTab("Explorer").add(EditorUI.asset_explorer)

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

                Editor.addToActualScene(obj)

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

                Editor.addToActualScene(obj.scene)

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
                var loader = new ObjectLoader()
                var obj = loader.parse(App.readFile(file))

                ObjectUtils.setShadowCasting(obj, true)
                ObjectUtils.setShadowReceiving(obj, true)

                Editor.addToActualScene(obj)

                console.log("Object imported")
            } catch(e) {
                console.error("Error importing Object: " + e)
            }
        }, ".json")
    }})

    EditorUI.asset_explorer_menu.add("Import/Objects/VRML", {callback: () => {
        App.chooseFile(function(event) {
            var file = event.srcElement.value

            try {
                var loader = new THREE.VRMLLoader()
                var obj = loader.parse(App.readFile(file))

                ObjectUtils.setShadowCasting(obj, true)
                ObjectUtils.setShadowReceiving(obj, true)

                Editor.addToActualScene(obj)

                console.log("Object imported")
            } catch(e) {
                console.log("Error importing Object: " + e)
            }
        }, ".wrl, .vrml")
    }})

    EditorUI.asset_explorer_menu.attachToPanel(EditorUI.asset_explorer)

    // ----- CONSOLE -----
    //EditorUI.console = new LiteGUI.Console()
    //EditorUI.bot_tabs.getTab("Console").add(EditorUI.console)

    // ----- TREE -----
    EditorUI.right_area.split("vertical", [null, EditorUI.assetEx_height + 200], true)
    
    EditorUI.hierarchy_panel = new LiteGUI.Panel({title: "Hierarchy", scroll: true})
    EditorUI.right_area.getSection(0).add(EditorUI.hierarchy_panel)
    
    EditorUI.hierarchy = new LiteGUI.Tree({
        id: "Program",
        children: []
    }, {
        allow_drag: true,
        //allow_rename: true,
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
            EditorUI.tabs_widget.addTab("Script Editor " + Editor.nameId, {selected: true, width: "100%", closable: true, onclose: EditorUI.selectSceneEditor})
            EditorUI.code = new CodeEditor(EditorUI.tabs_widget.getTabContent("Script Editor " + Editor.nameId))
            Editor.nameId++

            EditorUI.code.attachScript(data.attachedTo)
            EditorUI.code.updateInterface()
        }
        // Blueprints
        if (data.attachedTo instanceof Blueprints) {
            EditorUI.tabs_widget.addTab("Blueprints Editor " + Editor.nameId, {selected: true, width: "100%", closable: true, onclose: () => {
                EditorUI.blueEditor.updateBlueprints()
                EditorUI.selectSceneEditor()
            }})
            EditorUI.blueEditor = new BlueprintsEditor(EditorUI.tabs_widget.getTabContent("Blueprints Editor " + Editor.nameId), data.attachedTo)
            Editor.nameId++

            //EditorUI.blueEditor.attachBlueprints(data.attachedTo)
            EditorUI.blueEditor.updateInterface()
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

EditorUI.selectSceneEditor = function() {
    // This function is called every-time a tab is closed
    EditorUI.tabs_widget.selectTab("Scene Editor")
}

EditorUI.updateInterface = function () {
    EditorUI.Resize()
}

EditorUI.updateInspector = function() {
    EditorUI.ins = null

    if(Editor.selected_object != null) {
        var object = Editor.selected_object
    
        EditorUI.ins = new ObjectInspector()
        EditorUI.form.onchange = EditorUI.ins.updateInfo
    } else {
        EditorUI.form.clear()
    }
}

EditorUI.hierarchyFromScene = function(scene) {
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

//    scene.children.forEach((item, index) => {
//        var it = EditorUI.hierarchy.insertItem({id: scene.children[index].name, attachedTo: scene.children[index]})
//        it.addEventListener("contextmenu", function(e) {
//            return EditorUI.hierarchyContext(e, {item: it, data: it.data})
//        })
//
//        if (scene.children[index].children.length > 0) {
//            var children = scene.children[index].children.length
//
//            scene.children[index].children.forEach((j, k) => {
//                var l = EditorUI.hierarchy.insertItem({id: scene.children[index].children[k].name, attachedTo: scene.children[index].children[k]}, scene.children[index].name)
//                l.addEventListener("contextmenu", function(e) {
//                    return EditorUI.hierarchyContext(e, {item: l, data: l.data})
//                })
//            })
//        }
//    })
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

    var context = new LiteGUI.ContextMenu([
        {title: "Copy", callback: () => {
            if (!(object instanceof Scene)) {

                if (object !== null) {
                    try {
                        App.clipboard.set(JSON.stringify(object.toJSON()), "text")
                    } catch(e) {console.error("Error copying object: " + e)}
                }

            }
        }},
        {title: "Cut", callback: () => {
            if (!(object instanceof Scene)) {

                if (object !== null) {
                    try {
                        App.clipboard.set(JSON.stringify(object.toJSON()), "text")
                        EditorUI.deleteObject(object)
                    } catch(e) {console.error("Error cutting object: " + e)}
                }

            }
        }},
        {title: "Paste", callback: () => {
            if (!(object instanceof Scene)) {

                if (object !== null) {
                    try {
                        var content = App.clipboard.get("text")
                        var loader = new ObjectLoader()
                        var data = JSON.parse(content)

                        // Create Object
                        var obj = loader.parse(data)
                        obj.uuid = THREE.Math.generateUUID()
                        obj.position.set(0,0,0)

                        // Add object
                        Editor.renameObject(obj, obj.name)
                        object.add(obj)
                        Editor.updateTreeView()
                    } catch(e) {console.error("Error pasting the object: " + e)}
                }

            }
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
        object.parent.remove(object)
        Editor.updateTreeView()
    }

    // If this object is selected, reset editing flags
    if (Editor.isObjectSelected(object)) {
        Editor.resetEditingFlags()
    }
}

EditorUI.Resize = function() {
    EditorUI.resizeCanvas()
}

EditorUI.resizeCanvas = function() {

    if (Editor.camera !== undefined) {
        Editor.resizeCamera()
    }

    EditorUI.canvas.width = EditorUI.left_area.getWidth() - 4
    EditorUI.canvas.height= EditorUI.left_area.getHeight() - (EditorUI.assetEx_height + 26) // - left_area.getSection().getHeight()
}
