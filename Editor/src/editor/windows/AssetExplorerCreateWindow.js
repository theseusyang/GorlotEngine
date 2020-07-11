class AssetExplorerCreateWindow {
	constructor() {
		this.dialog = new LiteGUI.Dialog( {id: "dialog_create", title: "Create", close: true, minimize: true, width: 400, height: 463, scroll: false, draggable: true} )
		this.dialog.on_close = function() {
			Editor.clickable = true
		}

		this.selected_object = null

		this.objects = [
			{
				name: "Standard Material",
				icon: "data/icons/misc/material.png",
				icon_style: "width: 12px"
			},
			{
				name: "Phong Material",
				icon: "data/icons/misc/material.png",
				icon_style: "width: 12px"
			},
			{
				name: "Basic Material",
				icon: "data/icons/misc/material.png",
				icon_style: "width: 12px"
			},
			{
				name: "Sprite Material",
				icon: "data/icons/misc/material.png",
				icon_style: "width: 12px"
			},
			{
				name: "Lambert Material",
				icon: "data/icons/misc/material.png",
				icon_style: "width: 12px"
			},
			{
				name: "Shader Material",
				icon: "data/icons/misc/material.png",
				icon_style: "width: 12px"
			},
			{
				name: "Normal Material",
				icon: "data/icons/misc/material.png",
				icon_style: "width: 12px"
			},
			{
				name: "Depth Material",
				icon: "data/icons/misc/material.png",
				icon_style: "width: 12px"
			},
			{
				name: "Script",
				icon: "data/icons/script/script.png",
				icon_style: "width: 12px"
			}
		]

		var self = this

		this.widgets = new LiteGUI.Inspector()

		this.objectList = this.widgets.addList(null, this.objects, {height: this.dialog.height-20, callback_dblclick: (v) => {
			self.selected_object = v.name
			self.add()
			self.close()
		}})

		this.dialog.add(this.widgets)
		this.dialog.center()
	}

	add() {
		var o = this.selected_object

		if (o === "Standard Material") {

			var material = new MeshStandardMaterial()
        	material.name = "standard"
        	Editor.program.addMaterial(material)
        	Editor.updateObjectViews()

		}
		else if (o === "Phong material") {

			var material = new MeshPhongMaterial()
        	material.name = "phong"
        	Editor.program.addMaterial(material)
        	Editor.updateObjectViews()

		}
		else if (o === "Basic Material") {

			var material = new MeshBasicMaterial()
        	material.name = "basic"
        	Editor.program.addMaterial(material)
        	Editor.updateObjectViews()

		}
		else if (o === "Sprite Material") {

			var material = new THREE.SpriteMaterial({color: 0xffffff})
        	material.name = "sprite"
        	Editor.program.addMaterial(material)
        	Editor.updateObjectViews()

		}
		else if (o === "Lambert Material") {

			var material = new MeshLambertMaterial()
        	material.name = "lambert"
        	Editor.program.addMaterial(material)
        	Editor.updateObjectViews()

		}
		else if (o === "Shader Material") {

			var material = new MeshShaderMaterial()
        	material.name = "shader"
        	Editor.program.addMaterial(material)
        	Editor.updateObjectViews()

		}
		else if (o === "Normal Material") {

			var material = new MeshNormalMaterial()
        	material.name = "normal"
        	Editor.program.addMaterial(material)
        	Editor.updateObjectViews()

		}
		else if (o === "Depth Material") {

			var material = new MeshDepthMaterial()
        	material.name = "depth"
        	Editor.program.addMaterial(material)
        	Editor.updateObjectViews()

		}
		else if (o === "Script") {

			// TODO: This
			
		}
	}

	show() {
		this.dialog.show("fade")
		Editor.clickable = false
	}

	close() {
		this.dialog.close()
	}
}