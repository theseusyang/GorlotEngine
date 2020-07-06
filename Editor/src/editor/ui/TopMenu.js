function EditorUITopMenu() {

    // ----- TOP MENU -----
    EditorUI.topmenu = new LiteGUI.Menubar("topmenubar")
    LiteGUI.add(EditorUI.topmenu)

    // ----- FILE -----
    EditorUI.topmenu.add("File/New", {callback: () => {
        EditorUI.newProgram()
    }})
   
    EditorUI.topmenu.add("File/Open", {callback: () => {
        EditorUI.openProgram()
    }})
    
    EditorUI.topmenu.add("File/Save", {callback: () => {
        EditorUI.saveProgram()
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
        App.chooseFile((dir) => {
            try {
                Editor.exportWebProject(dir)
            } catch(e) {
                console.error("Error exporting project: " + e)
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
        Editor.selectTool(Editor.MODE_SELECT)
    }})

    EditorUI.topmenu.add("Edit/Tools/Move", {callback: () => {
        Editor.selectTool(Editor.MODE_MOVE)
    }})

    EditorUI.topmenu.add("Edit/Tools/Resize", {callback: () => {
        Editor.selectTool(Editor.MODE_RESIZE)
    }})

    EditorUI.topmenu.add("Edit/Tools/Rotate", {callback: () => {
        Editor.selectTool(Editor.MODE_ROTATE)
    }})

    // ----- Add Scene -----
    EditorUI.topmenu.add("Edit/Project/Add Scene", {callback: () => {
        var scene = Editor.program.addDefaultScene()
        Editor.renameObject(scene, scene.name)
        Editor.updateObjectViews()
    }})

    // ----- Preferences -----
    EditorUI.topmenu.add("Edit/Project/Project Settings", {callback: () => {
        EditorUI.projSets = new SettingsTab()
        EditorUI.projSets.updateInterface()
    }})

    // ----- Execute script -----
    EditorUI.topmenu.add("Edit/Project/Execute Script", {callback: () => {
        App.chooseFile((f) => {
            try {
                var code = App.readFile(f)
                var func = Function(code)
                func()
            } catch(e) {
                console.error(e)
            }
        })
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
            EditorUI.selectSceneTab()
            Editor.setState(Editor.STATE_TESTING)
            EditorUI.canvas.updateInterface()
            unregisterNodes()
            registerAllNodes()
        } else if(Editor.state === Editor.STATE_TESTING) {
            menuItem.name = "Run"
            Editor.setState(Editor.STATE_EDITING)
            EditorUI.canvas.updateInterface()
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