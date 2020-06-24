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

EditorUI.Initialize = function() {

    // Initializing the LiteGUI library
    LiteGUI.init()

    // ----- TOP MENU -----
    EditorUI.topmenu = new LiteGUI.Menubar("topmenubar")
    LiteGUI.add(EditorUI.topmenu)

    // ----- FILE -----
    EditorUI.topmenu.add("File/New", {callback: () => {
        // TODO: Confirm Action
        Editor.createNewProgram()
        Editor.updateTreeView()
        Editor.updateObjectHelper()
    }})
   
    EditorUI.topmenu.add("File/Open", {callback: () => {
        try {
            var loader = new ObjectLoader()
            var data = JSON.parse(App.readFile("project.json"))
            var scene = loader.parse(data)

            var program = new Program()
            program.addScene(scene)

            Editor.program = program
            Editor.resetEditingFlags()
            Editor.updateTreeView()

            console.log("File loaded")
        } catch(e) {
            console.log("Error loading file")
        }
    }})
    
    EditorUI.topmenu.add("File/Save", {callback: () => {
        // TODO: Create a toJSON function to every object, so the components can be serialized

        var output = Editor.program.scene.toJSON()
        var json = null

        try {
            json = JSON.stringify(output, null, "\t")
            json = json.replace(/[\n\t]+([\d\.e\-\[\]]+)/g, "$1")
        } catch (e) {
            json = JSON.stringify(json)
        }

        if (json != null) {
            App.writeFile("project.json", json)
        }
    }})

    EditorUI.topmenu.add("File/Exit", {callback: () => {
        Editor.exit()
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
        // TODO: Add Scene
    }})

    // ----- Preferences -----
    EditorUI.topmenu.add("Edit/Project/Project Settings", {callback: () => {
        // TODO: Create TAB (in the canvas zone) containing the Project Settings
    }})
    
    // ----- Add -----

    // ----- Add/Primitives -----

    // Cube
    EditorUI.topmenu.add("Add/3D Objects/Primitives/Cube", {callback: () => {
        var geometry = new THREE.BoxGeometry(1,1,1)
        var material = new THREE.MeshPhongMaterial()
        var model = new Model3D(geometry, material)
        model.receiveShadow = true
        model.castShadow = true
        model.name = "cube"
        Editor.addToActualScene(model)

        //EditorUI.hierarchyFromScene(Editor.scene)
    }})

    // Cylinder
    EditorUI.topmenu.add("Add/3D Objects/Primitives/Cylinder", {callback: () => {
        var geometry = new THREE.CylinderGeometry(1, 1, 2, 32)
        var material = new THREE.MeshPhongMaterial()
        var model = new Model3D(geometry, material)
        model.receiveShadow = true
        model.castShadow = true
        model.name = "Cylinder"
        Editor.addToActualScene(model)

        //EditorUI.hierarchyFromScene(Editor.scene)
    }})

    // Sphere
    EditorUI.topmenu.add("Add/3D Objects/Primitives/Sphere", {callback: () => {
        var geometry = new THREE.SphereGeometry(0.6, 16, 16)
        var material = new THREE.MeshPhongMaterial()
        var model = new Model3D(geometry, material)
        model.receiveShadow = true
        model.castShadow = true
        model.name = "Sphere"
        Editor.addToActualScene(model)

        //EditorUI.hierarchyFromScene(Editor.scene)
    }})

    // Torus
    EditorUI.topmenu.add("Add/3D Objects/Primitives/Torus", {callback: () => {
        var geometry = new THREE.TorusGeometry(1, 0.5, 16, 100)
        var material = new THREE.MeshPhongMaterial()
        var model = new Model3D(geometry, material)
        model.receiveShadow = true
        model.castShadow = true
        model.name = "Torus"
        Editor.addToActualScene(model)

        //EditorUI.hierarchyFromScene(Editor.scene)
    }})

    // Pyramid
    EditorUI.topmenu.add("Add/3D Objects/Primitives/Cone", {callback: () => {
        var geometry = new THREE.CylinderGeometry(0, 1, 2, 32)
        var material = new THREE.MeshPhongMaterial()
        var model = new Model3D(geometry, model)
        model.receiveShadow = true
        model.castShadow = true
        model.name = "Cone"
        Editor.addToActualScene(model)

        //EditorUI.hierarchyFromScene(Editor.scene)
    }})

    // Text
    EditorUI.topmenu.add("Add/3D Objects/Empty", {callback: () => {
        Editor.addToActualScene(new Empty())
        EditorUI.hierarchyFromScene(Editor.scene)
    }})

    EditorUI.topmenu.add("Add/3D Objects/Text", {callback: () => {
        var loader = new THREE.FontLoader().load("data/fonts/helvetiker_bold.typeface.js", function(font) {
            var material = new THREE.MeshPhongMaterial()
            var model = new Text3D("text", font, material)
            model.receiveShadow = true
            model.castShadow = true
            Editor.addToActualScene(model)
        })
    }})

    // ----- Add/Lights -----
    
    EditorUI.topmenu.add("Add/Lights/Point", {callback: () => {
        var light = new PointLight()
        light.castShadow = true
        light.shadow.camera.near = 1
        light.shadow.camera.far = 1
        light.shadow.bias = 0.01
        Editor.addToActualScene(light)

        //EditorUI.hierarchyFromScene(Editor.scene)
    }})

    EditorUI.topmenu.add("Add/Lights/Ambient", {callback: () => {
        var light = new AmbientLight()
        Editor.addToActualScene(light)

        //EditorUI.hierarchyFromScene(Editor.scene)
    }})

    EditorUI.topmenu.add("Add/Lights/SpotLight", {callback: () => {
        var light = new SpotLight()
        light.castShadow = true
        Editor.addToActualScene(light)

        //EditorUI.hierarchyFromScene(Editor.scene)
    }})

    EditorUI.topmenu.add("Add/Lights/Directional", {callback: () => {
        var light = new DirectionalLight()
        light.castShadow = true
        Editor.addToActualScene(light)

        //EditorUI.hierarchyFromScene(Editor.scene)
    }})

    EditorUI.topmenu.add("Add/Lights/Hemisphere", {callback: () => {
        var light = new HemisphereLight()
        light.castShadow = true
        Editor.addToActualScene(light)
    }})

    EditorUI.topmenu.add("Add/Lights/Sky", {callback: () => {
        var light = new Sky()
        Editor.addToActualScene(light)
    }})

    // ----- Add/Cameras -----
    // Perspective Camera
    EditorUI.topmenu.add("Add/Cameras/Perspective", {callback: () => {
        Editor.addToActualScene(new PerspectiveCamera())
        //EditorUI.hierarchyFromScene(Editor.scene)
    }})

    // Orthographic Camera
    EditorUI.topmenu.add("Add/Cameras/Orthographic", {callback: () => {
        Editor.addToActualScene(new OrthographicCamera(5, 5, 5, 5, 5, 5))
        //EditorUI.hierarchyFromScene(Editor.scene)
    }})

    // ----- Add/Scripts -----
    // Script
    EditorUI.topmenu.add("Add/Scripts/Script", {callback: () => {
        Editor.addToActualScene(new Script())
        //EditorUI.hierarchyFromScene(Editor.scene)
    }})

    // Blocks
    EditorUI.topmenu.add("Add/Scripts/Blocks", {callback: () => {
        // TODO: This
    }})

    // ----- Effects -----
    // Sprite
    EditorUI.topmenu.add("Add/Effects/Sprite", {callback: () => {
        var map = new THREE.TextureLoader().load("data/sample.png")
        var material = new THREE.SpriteMaterial({map: map, color: 0xffffff})
        var sprite = new Sprite(material)
        Editor.addToActualScene(sprite)
    }})

    // Particles
    EditorUI.topmenu.add("Add/Effects/Particles", {callback: () => {
        // TODO: Update
    }})

    // ----- Device -----

    // Kinect Skeleton
    EditorUI.topmenu.add("Add/Device/Kinect", {callback: () => {
        // TODO: This
    }})

    // Virtual Reality
    EditorUI.topmenu.add("Add/Device/Virtual Reality", {callback: () => {
        // TODO: This
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

    // ----- CANVAS -----
    EditorUI.canvas = document.createElement("canvas")
    EditorUI.canvas.id = "canvas"

    // ----- MAINAREA SPLIT ----- 
    EditorUI.mainarea = new LiteGUI.Area({autoresize: true, inmediateResize: true, height: "calc(100% - 20px)"})
    EditorUI.mainarea.split("horizontal", [null, 400], true)
    // Everytime the user resizes the canvas, the EditorUI.Resize function is called
    EditorUI.mainarea.onresize = EditorUI.Resize
    // Add the mainarea to the GUI
    LiteGUI.add(EditorUI.mainarea)

    EditorUI.left_area = EditorUI.mainarea.getSection(0)
    EditorUI.right_area = EditorUI.mainarea.getSection(1)

    // ----- TABS -----
    EditorUI.tabs_widget = new LiteGUI.Tabs()
    EditorUI.tabs_widget.addTab("Scene Editor", {selected: true, width: "100%", closable: false, onclose: EditorUI.selectSceneEditor})
    //EditorUI.tabs_widget.addTab("Script Editor", {selected: false, width: "100%", closable: true, onclose: EditorUI.selectSceneEditor})
    //EditorUI.tabs_widget.addTab("Material Editor", {selected: false, width: "100%", closable: true, onclose: EditorUI.selectSceneEditor})
    //EditorUI.tabs_widget.addTab("Preferences", {selected: false, width: "100%", closable: true, onclose: EditorUI.selectSceneEditor})
    EditorUI.left_area.add(EditorUI.tabs_widget)

    // Add the Canvas to the Scene Editor tab
    EditorUI.tabs_widget.getTabContent("Scene Editor").appendChild(EditorUI.canvas)

    //EditorUI.tabs_widget.getTabContent("Script Editor").appendChild(EditorUI.code.element)

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
    EditorUI.asset_explorer_menu.add("File/Import", {callback: () => {
        // TODO: This
    }})
    EditorUI.asset_explorer_menu.add("File/Export", {callback: () => {

    }})

    EditorUI.asset_explorer_menu.add("Add/Shader", {callback: () => {
        // TODO: This
    }})

    EditorUI.asset_explorer_menu.add("Add/Material", {callback: () => {
        // TODO: This
    }})

    EditorUI.asset_explorer_menu.add("Add/Terrain", {callback: () => {
        // TODO: This
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
        allow_rename: true,
        height: EditorUI.right_area.getSection(0).getHeight(),
    })
    EditorUI.hierarchy_panel.add(EditorUI.hierarchy)
    EditorUI.hierarchy.contextmenu = () => {console.log("a")}

    // When selecting an object in the hierarchy, that object will be selected
    LiteGUI.bind(EditorUI.hierarchy.root, "item_selected", function(e) {
        Editor.selected_object = e.detail.data.attachedTo
        EditorUI.updateInspector(e.detail.data.attachedTo)
        //console.log(e.detail)
    })

    // When an item is moved, this will check if we should set a parent
    LiteGUI.bind(EditorUI.hierarchy.root, "item_moved", function(e) {
        //console.log(e.detail)

        if (e.detail.parent_item) {
            var parObj = e.detail.parent_item.data.attachedTo
            var obj = e.detail.item.data.attachedTo

            if (parObj != null) {
                parObj.add(obj)
                Editor.updateTreeView()
            }
        }
    })

    // If an item in the hierarchy is double clicked and that object can add a new tab, this will open it
    LiteGUI.bind(EditorUI.hierarchy.root, "item_dblclicked", function(e) {
        //console.log(e.detail.data)
        var data = e.detail.data

        // Script
        if (data.attachedTo instanceof Script) {
            EditorUI.tabs_widget.addTab("Script Editor", {selected: true, width: "100%", closable: true, onclose: EditorUI.selectSceneEditor})
            EditorUI.code = new CodeEditor(EditorUI.tabs_widget.getTabContent("Script Editor"))

            // TODO: Create a new array that will be iterated through in EditorUI.updateInterface calling updateInterface of each of its elements
            
            EditorUI.code.attachScript(data.attachedTo)
            EditorUI.code.updateInterface()
        }
    })

    // When renaming an object, renaming it in the scene
    LiteGUI.bind(EditorUI.hierarchy.root, "item_renamed", function(e) {
        Editor.renameObject(e.detail.data.attachedTo, e.detail.new_name)
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
    EditorUI.resizeCanvas()
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
    EditorUI.hierarchy.updateTree({id: "Program", children: []})

    for(var i = 0; i < scene.children.length; i++) {
        var it = EditorUI.hierarchy.insertItem({id: scene.children[i].name, attachedTo: scene.children[i]})
        it.addEventListener("contextmenu", function(e) {
            var item = it
            e.preventDefault()
            e.stopPropagation()

            if (e.button != 2) {
                return
            }

            return EditorUI.hierarchyContext(e, {item: item, data: item.data})
        })

        // The tree only displays a parent and a child, TODO: add support to infinite children

        if (scene.children[i].children.length > 0) {
            for(var j = 0; j < scene.children[i].children.length; j++) {
                EditorUI.hierarchy.insertItem(
                    {
                        id: scene.children[i].children[j].name,
                        attachedTo: scene.children[i].children[j]
                    },
                    scene.children[i].name)
            }
        }

    }
}

EditorUI.hierarchyContext = function(e, data) {
    var object = data.data.attachedTo

    var context = new LiteGUI.ContextMenu([
        {title: "Copy", callback: () => {
            // TODO: This
        }},
        {title: "Paste", callback: () => {
            // TODO: This
        }},
        {title: "Duplicate", callback: () => {
            // TODO: This
        }},
        {title: "Delete", callback: () => {
            if ((object !== null) && (object.parent !== null)) {
                object.parent.remove(object)
                Editor.updateTreeView()
                Editor.updateObjectHelper()
            }
        }}
    ], {title: "Edit item", event: e})
}

EditorUI.Resize = function() {
    EditorUI.resizeCanvas()
}

EditorUI.resizeCanvas = function() {
    canvas.width = EditorUI.left_area.getWidth()
    canvas.height= EditorUI.left_area.getHeight() - EditorUI.assetEx_height// - left_area.getSection().getHeight()
}
