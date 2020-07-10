"use strict"

// Scene Editor class
class SceneEditor {
	constructor(parent) {

		var self = this

		if(EditorUI.tabs_widget !== undefined) {
			this.id = "Scene Editor " + SceneEditor.id
			this.tab = EditorUI.tabs_widget.addTab(this.id, {selected: true, closable: true, onclose: () => {
				SceneEditor.id--
			}, callback: () => {

				if (self.element !== undefined) {
					Mouse.canvas = self.element
				}

				Editor.setState(Editor.STATE_EDITING)
			}, ondrop: (e) => {
				e.preventDefault()

				if (self.scene !== null) {
					// Canvas element
					var canvas = self.element
					var rect = canvas.getBoundingClientRect()

					// Update raycaster direction
					var position = new THREE.Vector2(event.clientX - rect.left, event.clientY - rect.top)
					var position_normalized = new THREE.Vector2((position.x/self.element.width)*2 - 1, -(position.y/self.element.height)*2 + 1)
					Editor.updateRaycaster(position_normalized.x, position_normalized.y)

					// Check intersected objects
					var intersections = Editor.raycaster.intersectObjects(self.scene.children, true)

					// Get object from drag buffer
					var uuid = event.dataTransfer.getData("uuid")
					var dragged_object = DragBuffer.popDragElement(uuid)

					// If it's a file drop
					if (e.dataTransfer.files.length > 0) {
						// Get first file from event
						var file = event.dataTransfer.files[0]

						if (file.type.startsWith("image") && intersections.length > 0) {
							var object = intersections[0].object

							if (object instanceof THREE.Mesh) {
								// Create new material with selected image
								var texture = new Texture(file.path)
								var material = new THREE.MeshPhongMaterial({map: texture, color: 0xffffff, specular: 0x333333, shininess: 30})
								material.name = file.name
								object.material = material

								// Update asset explorer
								Editor.updateObjectViews()
							} else if (object instanceof THREE.Sprite) {
								// Create new material with selected image
								var texture = new Texture(file.path)
								var material = new THREE.SpriteMaterial({map: texture, color: 0xffffff})
								material.name = file.name
								object.material = material

								// Update asset explorer
								Editor.updateObjectViews()
							}
						} else if (file.name.endsWith(".gsp")) {
    						var confirm = LiteGUI.confirm("All unsaved changes to the program will be lost! Load program?", (v) => {
    							Editor.loadProgram(file.path)
    						}, {title: "Open Project"})
						}
					}
					// If it's a dragged object
					else if(dragged_object !== null && intersections.length > 0) {
						var object = intersections[0].object

						if (dragged_object instanceof THREE.SpriteMaterial) {
							if (object instanceof THREE.Sprite) {
								object.material = dragged_object
								Editor.updateObjectViews()
							}
						}
						// Material
						else if (dragged_object instanceof THREE.Material) {
							if(object instanceof THREE.Mesh) {
								object.material = dragged_object
								Editor.updateObjectViews()
							}
						}
					}

					self.activate()
					self.updateInterface()
				}

			}, ondragover: (e) => {
				e.preventDefault()
				//console.log(e)
			}})
		}

		if (parent !== undefined) {
			this.parent = parent
		} else {
			if(EditorUI.tabs_widget !== undefined) {
				this.parent = EditorUI.tabs_widget.getTabContent(this.id)
			}
		}

		// Canvas
		this.element = document.createElement("canvas")
		this.element.id = "scene_editor" + SceneEditor.id
		this.element.style.position = "absolute"
		this.element.style.top = "0px"
		this.element.style.left = "0px"
		this.parent.appendChild(this.element)

		// Performance meter
		this.stats = new Stats()
		this.stats.dom.style.position = "absolute"
		this.stats.dom.style.left = "0px"
		this.stats.dom.style.top = "0px"
		this.stats.dom.style.zIndex = "0"
		this.parent.appendChild(this.stats.dom)

		this.scene = null
		Editor.setPerformanceMeter(this.stats)
		
		SceneEditor.id++	
	}

	activate() {
		Editor.program.scene = this.scene
		//Editor.setPerformanceMeter(this.stats)
		Editor.setRenderCanvas(this.element)
		Editor.setState(Editor.STATE_EDITING)
		Editor.resetEditingFlags()
		Editor.resize()
	}

	setScene(scene) {
		if (scene instanceof Scene) {
			this.scene = scene
		}
	}

	updateInterface() {
		this.element.width = EditorUI.left_area.getWidth()
    	this.element.height = EditorUI.left_area.getHeight() - EditorUI.assetEx_height // - left_area.getSection().getHeight()

    	if (Settings.general.show_stats) {
    		this.stats.dom.style.visibility = "visible"
    	} else {
    		this.stats.dom.style.visibility = "hidden"
    	}

		Editor.resizeCamera()

	}
}

SceneEditor.id = 0
