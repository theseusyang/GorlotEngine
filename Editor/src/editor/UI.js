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

EditorUI.assetEx_height = 256
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

    // Top menu
    EditorUITopMenu()

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
    EditorUI.canvas.setScene(Editor.program.children[0])

    // ----- CANVAS AREA SPLIT -----
    EditorUI.left_area.split("vertical", [null, EditorUI.assetEx_height-26], false)
    EditorUI.left_area.onresize = EditorUI.resizeCanvas

    // Asset explorer
    EditorUIAssetExplorer()

    // ----- TREE -----
    EditorUIHierarchy()

    EditorUI.inspector = new LiteGUI.Panel({title: "Inspector", scroll: true})
    EditorUI.right_area.getSection(1).add(EditorUI.inspector)

    EditorUI.form = new LiteGUI.Inspector({full: true})
    EditorUI.inspector.content.appendChild(EditorUI.form.root)

    // Call to the resize method
    EditorUI.Resize()
}

EditorUI.removeAllTabs = function() {
    if(EditorUI.tabs_widget !== undefined) {
        var num = EditorUI.tabs_widget.getNumOfTabs()

        for(var i = 0; i < num; i++) {
            var tab = EditorUI.tabs_widget.getTabByIndex(i)
            if (tab !== undefined) {
                tab.destroy()
            }
        }
    }
}

EditorUI.selectPreviousTab = function() {
    var tab = EditorUI.tabs_widget.getPreviousTab()
    var current = EditorUI.tabs_widget.getCurrentTab()

    //EditorUI.tabs_widget.selectTab(EditorUI.canvas.id)

    if(tab === undefined) {
        Editor.setState(Editor.STATE_EDITING)
        EditorUI.tabs_widget.selectTab(EditorUI.canvas.id)
    } else if (Editor.state === Editor.STATE_TESTING) {
        EditorUI.tabs_widget.selectTab(EditorUI.canvas.id)
    } else {
        EditorUI.tabs_widget.selectTab(tab)
    }
}

EditorUI.selectSceneTab = function() {
    EditorUI.tabs_widget.selectTab(EditorUI.canvas.id)
}

EditorUI.updateInterface = function () {
    EditorUI.canvas.updateInterface()

    if (EditorUI.code !== undefined) {
        // Script Editor
        EditorUI.code.updateInterface()
    }
    if (EditorUI.partEd !== undefined) {
        // Particle Editor
        EditorUI.partEd.updateInterface()
    }
    if (EditorUI.matEd !== undefined) {
        // Material Editor
        EditorUI.matEd.updateInterface()
    }
    if (EditorUI.blue !== undefined) {
        // Blueprint Editor
        EditorUI.blue.updateInterface()
    }
    if (EditorUI.projSets !== undefined) {
        // Project Settings
        EditorUI.projSets.updateInterface()
    }
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

        Editor.updateObjectViews()
    }

    // If this object is selected, reset editing flags
    if (Editor.isObjectSelected(object)) {
        Editor.resetEditingFlags()
    }
}

EditorUI.Resize = function() {
    EditorUI.updateInterface()
}

// Open save program window
EditorUI.saveProgram = function() {
    App.chooseFile((fname) => {

        try {
            Editor.saveProgram(fname)
            console.log("Project saved")
        } catch(e) {
            console.error("Error saving program: " + e)
        }
    }, ".json", true)
}

// Open load program window
EditorUI.openProgram = function() {
    var confirm = LiteGUI.confirm("All unsaved changes to the program will be lost! Load program?", (v) => {
        if (v) {
            App.chooseFile((fname) => {

                try {
                    Editor.loadProgram(fname)
                    console.log("Project loaded")
                } catch(e) {
                    console.error("Error loading program: " + e)
                }
            }, ".json")
        }
    }, {title: "Open Project"})
}

// Interface element to create new program
EditorUI.newProgram = function() {
    LiteGUI.confirm("All unsaved changes to the program will be lost! Create new program?", (v) => {
        if (v) {
            EditorUI.asset_explorer_objects = []
            Editor.createNewProgram()
            Editor.updateObjectViews()
            Editor.updateObjectHelper()
        }
    }, {title: "New Project"})
}