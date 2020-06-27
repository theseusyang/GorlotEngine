function EditorUITopMenu() {

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

    // ----- File/Export -----
    EditorUI.topmenu.add("File/Export/Web", {callback: () => {
        App.chooseFile(function(e) {
            var file = e.srcElement.value
            try {
                var zip = new JSZip()
                var output = Editor.program.toJSON()
                var json = JSON.stringify(output)

                zip.file("app.json", json)
                zip.file("index.html", App.readFile("runtime/index.html"))
                zip.file("Main.js", App.readFile("runtime/Main.js"))

                //var zfile = zip.generate({type: "blob"})
                //console.log(zfile)
                //App.writeFile(file, zfile)
                //TODO: This
            } catch(e) {
                console.error("Error saving file: " + e)
            }
        }, ".zip", true)
    }})
    EditorUI.topmenu.add("File/Export/Linux", {callback: () => {
        // TODO: Export to Linux
    }})
    EditorUI.topmenu.add("File/Export/Windows", {callback: () => {
        // TODO: Export to Windows
    }})
    EditorUI.topmenu.add("File/Export/Android", {callback: () => {
        // TODO: Export to Android
    }})

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
    
}