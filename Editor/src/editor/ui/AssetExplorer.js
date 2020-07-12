"use strict"

function EditorUIAssetExplorer() {
	    // ----- EXPLORER -----

    EditorUI.asset_explorer = new LiteGUI.Panel({title: "Asset Explorer"})
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

    EditorUI.asset_explorer_panel = new LiteGUI.Panel({scroll: true})
    EditorUI.asset_explorer.add(EditorUI.asset_explorer_panel)

    EditorUI.asset_explorer_objects = []

}

EditorUI.addAsset = function(name, attachedTo) {

    if (EditorUI.asset_explorer_objects !== undefined) {

        if (attachedTo instanceof THREE.Material) {
            var fil = new MaterialAsset(attachedTo.name, EditorUI.asset_explorer_panel.content)
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