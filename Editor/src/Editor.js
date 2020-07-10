"use strict"

include("libs/litegui/litegui.js")
include("libs/jscolor/jscolor.js")

include("libs/codemirror/codemirror.js")
include("libs/codemirror/addon/edit/closebrackets.js")
include("libs/codemirror/addon/edit/matchbrackets.js")
include("libs/codemirror/addon/search/search.js")
include("libs/codemirror/addon/search/searchcursor.js")
include("libs/codemirror/addon/hint/show-hint.js")
include("libs/codemirror/addon/hint/show-hint.css")
include("libs/codemirror/addon/tern/tern.js")
include("libs/codemirror/addon/tern/tern.css")
include("libs/codemirror/mode/javascript.js")
include("libs/codemirror/mode/glsl.js")
include("libs/codemirror/codemirror.css")
include("libs/codemirror/theme/*")

include("libs/litegui/litegui.css")
include("libs/litegraph/litegraph.css")

// Editor Code

include("src/editor/tools/MoveTool.js")
include("src/editor/tools/ResizeTool.js")
include("src/editor/tools/RotateTool.js")

include("src/editor/helpers/ParticleEmitterHelper.js")
include("src/editor/helpers/ObjectIconHelper.js")
include("src/editor/helpers/PhysicsObjectHelper.js")

include("src/editor/windows/AddMenuWindow.js")

include("src/editor/tabs/CodeEditor.js")
include("src/editor/tabs/MaterialEditor.js")
include("src/editor/tabs/ParticleEditor.js")
include("src/editor/tabs/SceneEditor.js")
include("src/editor/tabs/SettingsTab.js")
include("src/editor/tabs/BlueprintsEditor.js")

include("src/editor/UI.js")
include("src/editor/Settings.js")

include("src/editor/ui/files/File.js")
include("src/editor/ui/files/MaterialFile.js")
include("src/editor/ui/files/TextureFile.js")

include("src/editor/ui/components/AbsButton.js")

include("src/editor/utils/MaterialRenderer.js")
include("src/editor/utils/DragBuffer.js")

include("src/editor/ui/ObjectInspector.js")
include("src/editor/ui/TopMenu.js")
include("src/editor/ui/AssetExplorer.js")
include("src/editor/ui/Hierarchy.js")

function Editor(){}

//Editor state
Editor.STATE_IDLE = 8; //Non scene window open
Editor.STATE_EDITING = 9; //Editing a scene
Editor.STATE_TESTING = 11; //Testing a scene

//Editor editing modes
Editor.MODE_SELECT = 0;
Editor.MODE_MOVE = 1;
Editor.MODE_RESIZE = 2;
Editor.MODE_ROTATE = 3;

// Editor version
Editor.NAME = "Gorlot"
Editor.VERSION = "V0.0.0.1-b dev"
Editor.TIMESTAMP = "Fri 10 Jul 2020 13:30:32"

// This is a variable for handling objects with a non-unique name
Editor.nameId = 1

// This variable determines whether we can click and modify what is inside the canvas
Editor.clickable = true
//Initialize Main
Editor.initialize = function(canvas)
{
	// Copy global elements pointer to global object
	global.Editor = Editor
	global.EditorUI = EditorUI
	global.Settings = Settings

	// Load settings
	Settings.load()

	// Set windows close event
	if (App.gui !== undefined) {
		// Close event
		App.gui.Window.get().on("close", () => {
			var confirm = LiteGUI.confirm("All unsaved changes to the project will be lost! Do you really want to exit?", (v) => {
				if (v) {
					Editor.exit()
				}
			}, {title: "Exit"})
		})
	}

	// Set window title
	document.title = Editor.NAME + " " + Editor.VERSION + " (" + Editor.TIMESTAMP + ")"

	// Set mouse Lock false
	App.setMouseLock(false)

	//Editor initial state
	Editor.tool_mode = Editor.MODE_SELECT
	Editor.state = Editor.STATE_EDITING

	// Auxiliar values
	Editor.pid2 = Math.PI/2

	//Editor Selected object
	Editor.selected_object = null
	Editor.is_editing_object = false

	// Performance meter
	Editor.stats = null

	// Editor program and scene
	Editor.program = null
	Editor.program_running = null

	// VR effect and controls
	Editor.vr_controls = new VRControls()
	Editor.vr_effect = null

	// Renderer and canvas
	Editor.renderer = null
	Editor.canvas = null

	// Material renderer for material previews
	Editor.material_renderer = new MaterialRenderer()

	// Default materials to be used when creating objects
	Editor.default_material = new MeshPhongMaterial()
	Editor.default_material.name = "default"

	Editor.default_sprite_material = new THREE.SpriteMaterial({map: new Texture("data/sample.png"), color: 0xffffff})
	Editor.default_sprite_material.name = "default"

	//Debug Elements
	Editor.tool_scene = new THREE.Scene()
	Editor.tool_scene_top = new THREE.Scene()

	// Raycaster
	Editor.raycaster = new THREE.Raycaster()

	//Editor Camera
	Editor.default_camera = new PerspectiveCamera(60, 1, 0.01, 1000000)
	Editor.default_camera.position.set(0, 5, -10)
	Editor.camera = Editor.default_camera
	Editor.camera_rotation = new THREE.Vector2(0,0)
	Editor.setCameraRotation(Editor.camera_rotation, Editor.camera)

	//Grid and axis helpers
	Editor.grid_helper = new THREE.GridHelper(Settings.editor.grid_size, Math.round(Settings.editor.grid_size/Settings.editor.grid_spacing)*2, 0x888888, 0x888888)
	Editor.grid_helper.material.depthWrite = false
	Editor.grid_helper.material.transparent = true
	Editor.grid_helper.material.opacity = 0.5
	Editor.grid_helper.visible = Settings.editor.grid_enabled
	Editor.tool_scene.add(Editor.grid_helper)

	Editor.axis_helper = new THREE.AxisHelper(Settings.editor.grid_size)
	Editor.axis_helper.material.depthWrite = false
	Editor.axis_helper.material.transparent = true
	Editor.axis_helper.material.opacity = 1
	Editor.axis_helper.visible = Settings.editor.axis_enabled
	Editor.tool_scene.add(Editor.axis_helper)

	// Object helper container
	Editor.object_helper = new Empty()
	Editor.tool_scene.add(Editor.object_helper)

	// Tool Container
	Editor.tool_container = new THREE.Scene()
	Editor.tool_scene_top.add(Editor.tool_container)
	Editor.tool = null

	// Create new program
	Editor.createNewProgram()

	//Initialize User Interface
	EditorUI.Initialize()

	// Set render canvas
	Editor.setRenderCanvas(EditorUI.canvas.element)

	//Update interface
	EditorUI.updateInterface()
	
	// Update interface explorer tree view
	Editor.updateObjectViews()
}

//Update Editor
Editor.update = function()
{

	// End performance measure
	if (Editor.stats !== null) {
		Editor.stats.begin()
	}

	// Set editing object false
	Editor.is_editing_object = false

	// Close tab, Save and Load project
	if (Keyboard.isKeyPressed(Keyboard.CTRL)) {
		if (Keyboard.isKeyJustPressed(Keyboard.S)) {
			EditorUI.saveProgram()
		}
		else if (Keyboard.isKeyJustPressed(Keyboard.O)) {
			EditorUI.openProgram()
		}
		else if (Keyboard.isKeyJustPressed(Keyboard.W)) {
			EditorUI.tabs_widget.getCurrentTab().destroy()
			EditorUI.selectPreviousTab()
		}
	}

	// If editing an scene
	if(Editor.state === Editor.STATE_EDITING) {

		// Keyboard shortcuts
		if (Keyboard.isKeyJustPressed(Keyboard.DEL)) {
			Editor.deleteSelectedObject()
		}
		else if (Keyboard.isKeyPressed(Keyboard.CTRL)) {
			if (Keyboard.isKeyJustPressed(Keyboard.C)) {
				Editor.copySelectedObject()
			} else if (Keyboard.isKeyJustPressed(Keyboard.V)) {
				Editor.pasteIntoSelectedObject()
			} else if (Keyboard.isKeyJustPressed(Keyboard.X)) {
				Editor.cutSelectedObject()
			} else if (Keyboard.isKeyJustPressed(Keyboard.Y)) {
				// TODO: Redo
			} else if (Keyboard.isKeyJustPressed(Keyboard.Z)) {
				// TODO: Undo
			}
		}

		// Select objects
		if (Editor.tool_mode === Editor.MODE_SELECT) {
			if (Mouse.buttonJustPressed(Mouse.LEFT) && Mouse.insideCanvas()) {
				Editor.updateRaycasterFromMouse()
				var intersects = Editor.raycaster.intersectObjects(Editor.program.scene.children, true)
				if (intersects.length > 0) {
					Editor.selectObject(intersects[0].object)
				}
			}

			Editor.is_editing_object = false
		} else if(Editor.selected_object !== null) {
			// Update active tool status
			if (Editor.tool !== null) {
				Editor.is_editing_object = Editor.tool.update()

				if (Editor.is_editing_object) {
					// Update object transformation matrix
					if (!Editor.selected_object.matrixAutoUpdate) {
						Editor.selected_object.updateMatrix()
					}
				}
			} else {
				Editor.is_editing_object = false
			}
		}

		// Update object helper
		Editor.object_helper.update()

		// Check if mouse is inside canvas
		if (Mouse.insideCanvas()) {
			// Look camera
			if (Mouse.buttonPressed(Mouse.LEFT) && !Editor.is_editing_object) {
				Editor.camera_rotation.x -= 0.002 * Mouse.delta.x
				Editor.camera_rotation.y -= 0.002 * Mouse.delta.y

				// Limit Vertical Rotation to 90 degrees
				var pid2 = 1.57
				if (Editor.camera_rotation.y < -pid2) {
					Editor.camera_rotation.y = -pid2
				} else if (Editor.camera_rotation.y > pid2) {
					Editor.camera_rotation.y = pid2
				}

				Editor.setCameraRotation(Editor.camera_rotation, Editor.camera)
			} else if (Mouse.buttonPressed(Mouse.RIGHT)) {
				// Move speed
				var speed = Editor.camera.position.distanceTo(new THREE.Vector3(0, 0, 0))/1000
				if (speed < 0.02) {
					speed = 0.02
				}

				// Move camera front and back
				var angle_cos = Math.cos(Editor.camera_rotation.x)
				var angle_sin = Math.sin(Editor.camera_rotation.x)
				Editor.camera.position.z += Mouse.delta.y * speed * angle_cos
				Editor.camera.position.x += Mouse.delta.y * speed * angle_sin

				// Move camera lateral
				var angle_cos = Math.cos(Editor.camera_rotation.x + Editor.pid2)
				var angle_sin = Math.sin(Editor.camera_rotation.x + Editor.pid2)
				Editor.camera.position.z += Mouse.delta.x * speed * angle_cos
				Editor.camera.position.x += Mouse.delta.x * speed * angle_sin
			} else if (Mouse.buttonPressed(Mouse.MIDDLE)) {
				// Move Camera on Y
				Editor.camera.position.y += Mouse.delta.y * 0.1
			}

			// Move in camera direction using mouse scroll
			if (Mouse.wheel !== 0) {
				// Move speed
				var speed = Editor.camera.position.distanceTo(new THREE.Vector3(0,0,0))/2000
				speed *= Mouse.wheel

				// Limit zoom speed
				if (speed < 0) {
					if (speed > -0.03) {
						speed = 0.03
					}
				} else if (speed > 0) {
					if (speed < 0.03) {
						speed = 0.03
					}
				}

				// Move camera
				var direction = Editor.camera.getWorldDirection()
				Editor.camera.position.x -= speed * direction.x
				Editor.camera.position.y -= speed * direction.y
				Editor.camera.position.z -= speed * direction.z
			}
		}
	}
	//Update Scene if on test mode
	else if(Editor.state === Editor.STATE_TESTING)
	{
		Editor.program_running.scene.update();
	}
}

Editor.selectObject = function(obj) {
	Editor.selected_object = obj
	EditorUI.hierarchy.setSelectedItem(Editor.selected_object.name)
	EditorUI.updateInspector()
	Editor.selectObjectHelper()

	if (Editor.tool !== null && Editor.selected_object !== null) {
		Editor.tool_container.add(Editor.tool)
		Editor.tool.attachObject(Editor.selected_object)
	}
}

// Check if object is selected
Editor.isObjectSelected = function(obj) {
	if(Editor.selected_object !== null) {
		return Editor.selected_object === obj
	}

	return null
}

// Delete an object
Editor.deleteObject = function(obj) {
	if(obj !== undefined) {
		obj.destroy()
		Editor.updateObjectViews()
		Editor.resetEditingFlags()
	}
}

// Delete selected Object
Editor.deleteSelectedObject = function() {
	if (Editor.selected_object !== null && !(Editor.selected_object instanceof Scene)) {
		Editor.deleteObject(Editor.selected_object)
	}
}

// Copy selected object
Editor.copySelectedObject = function() {
	if (Editor.selected_object !== null && !(Editor.selected_object instanceof Program || Editor.selected_object instanceof Scene)) {
		try {
			App.clipboard.set(JSON.stringify(Editor.selected_object.toJSON()), "text")
		} catch(e) {
			console.error("Error copying the object: " + e)
		}
	}
}

// Cut selected object
Editor.cutSelectedObject = function() {
	if (Editor.selected_object !== null && !(Editor.selected_object instanceof Program || Editor.selected_object instanceof Scene)) {
		try {
			App.clipboard.set(JSON.stringify(Editor.selected_object.toJSON()), "text")
			if (Editor.selected_object.parent !== null) {
				Editor.selected_object.parent.remove(Editor.selected_object)
				Editor.updateObjectViews()
				Editor.resetEditingFlags()
			}
		} catch(e) {
			console.error("Error cutting object: " + e)
		}
	}
}

// Paste as children of the selected object
Editor.pasteIntoSelectedObject = function() {
	try {
		var content = App.clipboard.get("text")
		var loader = new ObjectLoader()
		var data = JSON.parse(content)

		// Create object
		var obj = loader.parse(data)
		obj.traverse((child) => {
			child.uuid = THREE.Math.generateUUID()
		})
		Editor.renameObject(obj, obj.name)

		// Add object
		if (Editor.selected_object !== null) {
			Editor.selected_object.add(obj)
		} else {
			Editor.program.scene.add(obj)
		}

		Editor.updateObjectViews()
	} catch(e) {
		console.error("Error pasting object: " + e)
	}
}

// Add object to actual scene
Editor.addToActualScene = function(obj) {
	Editor.program.scene.add(obj)
	Editor.updateObjectViews()
	Editor.renameObject(obj, obj.name)
	Editor.selectObject(obj)
}

// Select tool to manipulate tools
Editor.selectTool = function(tool) {
	Editor.tool_mode = tool
	Editor.tool_container.removeAll()

	if (tool === Editor.MODE_MOVE) {
		Editor.tool = new MoveTool()
	} else if (tool === Editor.MODE_ROTATE) {
		Editor.tool = new RotateTool()
	} else if (tool === Editor.MODE_RESIZE) {
		Editor.tool = new ResizeTool()
	} else {
		Editor.tool = null
	}

	if (Editor.tool !== null && Editor.selected_object !== null) {
		Editor.tool_container.add(Editor.tool)
		Editor.tool.attachObject(Editor.selected_object)
	}
}

// Checks if an object's name is unique, if not, renames it
Editor.renameObject = function(obj, name) {
	if(EditorUI.hierarchy !== undefined) {
		var toName = name
		if (EditorUI.hierarchy.getItem(toName)) {
			toName += "_" + Editor.nameId
			Editor.nameId++
		}
		obj.name = toName

		if(obj.children !== undefined) {
			if (obj.children.length > 0) {
				for(var i = 0; i < obj.children.length; i++) {
					Editor.renameObject(obj.children[i], obj.children[i].name)
				}
			}
		}

		Editor.updateObjectViews()
		return toName
	}
}

// Update all object views
Editor.updateObjectViews = function() {
	Editor.updateTreeView()
	Editor.selectObjectHelper()
	Editor.updateAssetExplorer()

	EditorUI.updateInspector()
}

// Update Tree View to Match Actual Scene
Editor.updateTreeView = function() {
	EditorUI.updateHierarchy()
}

// Update asset explorer content
Editor.updateAssetExplorer = function() {
	if (EditorUI.asset_explorer_objects !== undefined) {
		EditorUI.asset_explorer_objects = []
	}

	// Get material list
	var materials = ObjectUtils.getMaterials(Editor.program, Editor.program.materials)

	// Add materials to asset explorer
	for(var i in materials) {
		EditorUI.addAsset(materials[i].name, materials[i])
	}
}

//Draw stuff into screen
Editor.draw = function()
{
	Editor.renderer.clear()

	if (Editor.state === Editor.STATE_EDITING) {

		Editor.renderer.setViewport(0, 0, Editor.canvas.width, Editor.canvas.height)
		Editor.renderer.setScissor(0, 0, Editor.canvas.width, Editor.canvas.height)
		Editor.renderer.render(Editor.program.scene, Editor.camera)

		Editor.renderer.render(Editor.tool_scene, Editor.camera)
		Editor.renderer.clearDepth()
		Editor.renderer.render(Editor.tool_scene_top, Editor.camera)

		if (Settings.editor.camera_preview_enabled && Editor.selected_object instanceof THREE.Camera) {
			var width = Settings.editor.camera_preview_percentage * Editor.canvas.width
			var height = Settings.editor.camera_preview_percentage * Editor.canvas.height
			var offset = Editor.canvas.width - width - 10
			var camera = Editor.selected_object

			camera.aspect = width / height
			camera.updateProjectionMatrix()

			Editor.renderer.clearDepth()
			Editor.renderer.setViewport(offset, 10, width, height)
			Editor.renderer.setScissor(offset, 10, width, height)
			Editor.renderer.render(Editor.program.scene, camera)
		}
	} else if (Editor.state === Editor.STATE_TESTING) {
		// If VR is enabled
		if (Editor.vr_effect !== null) {
			// Update VR controls
			Editor.vr_controls.scale = 5
			Editor.vr_controls.update()

			// Backup camera attributes
			var camera = Editor.program_running.scene.camera
			var position = camera.position.clone()
			var quaternion = camera.quaternion.clone()

			// Apply VR controller offsets to actual camera
			camera.position.add(Editor.vr_controls.position)
			camera.quaternion.multiply(Editor.vr_controls.quaternion)

			// Render scene
			Editor.vr_effect.render(Editor.program_running.scene, camera)

			// Backup camera attributes
			camera.position.copy(position)
			camera.quaternion.copy(quaternion)
		} else {
			Editor.renderer.render(Editor.program_running.scene, Editor.program_running.scene.camera)
		}
	}

	// End performance measure
	if (Editor.stats !== null) {
		Editor.stats.end()
	}
}

//Resize to fit window
Editor.resize = function()
{
	EditorUI.updateInterface();
}

// Select helper to debug selected object data
Editor.selectObjectHelper = function() {
	Editor.object_helper.removeAll()

	if (Editor.selected_object !== null && Editor.selected_object !== undefined) {
		
		// Camera
		if (Editor.selected_object instanceof THREE.Camera) {
			Editor.object_helper.add(new THREE.CameraHelper(Editor.selected_object))
		}
		// Directional Light
		else if (Editor.selected_object instanceof THREE.DirectionalLight) {
			Editor.object_helper.add(new THREE.DirectionalLightHelper(Editor.selected_object, 1))
		}
		// Point Light
		else if (Editor.selected_object instanceof THREE.PointLight) {
			Editor.object_helper.add(new THREE.PointLightHelper(Editor.selected_object, 1))
		}
		// Spot Light
		else if (Editor.selected_object instanceof THREE.SpotLight) {
			Editor.object_helper.add(new THREE.SpotLightHelper(Editor.selected_object))
		}
		// Hemisphere Light
		else if (Editor.selected_object instanceof THREE.HemisphereLight) {
			Editor.object_helper.add(new THREE.HemisphereLightHelper(Editor.selected_object, 1))
		}
		// Particle Emitter
		//else if (Editor.selected_object instanceof ParticleEmitter) {
		//	Editor.object_helper.add(new ParticleEmitterHelper(Editor.selected_object))
		//}
		// Script
		else if (Editor.selected_object instanceof Script) {
			Editor.object_helper.add(new ObjectIconHelper(Editor.selected_object, Editor.selected_object.icon))
		}
		// Blueprints
		else if (Editor.selected_object instanceof Blueprints) {
			Editor.object_helper.add(new ObjectIconHelper(Editor.selected_object, Editor.selected_object.icon))
		}
		// Physics
		else if (Editor.selected_object instanceof PhysicsObject) {
			Editor.object_helper.add(new PhysicsObjectHelper(Editor.selected_object))
		}
		//Object 3D
		else if (Editor.selected_object instanceof THREE.Object3D) {
			Editor.object_helper.add(new THREE.BoundingBoxHelper(Editor.selected_object, 0xFFFF00))
		}
	
	}
}

//Resize Camera
Editor.resizeCamera = function()
{
	if (Editor.canvas !== null && Editor.renderer !== null) {
		Editor.renderer.setSize(Editor.canvas.width, Editor.canvas.height)
		Editor.camera.aspect = Editor.canvas.width/Editor.canvas.height
		Editor.camera.updateProjectionMatrix()

		if (Editor.state === Editor.STATE_TESTING) {
			Editor.program_running.resize(Editor.canvas.width, Editor.canvas.height)
		}
	}
}

//Set camera rotation
Editor.setCameraRotation = function(camera_rotation, camera)
{
	//Calculate direction vector
	var cos_angle_y = Math.cos(camera_rotation.y);
	var direction = new THREE.Vector3(Math.sin(camera_rotation.x)*cos_angle_y, Math.sin(camera_rotation.y), Math.cos(camera_rotation.x)*cos_angle_y);

	//Add position offset and set camera direction
	direction.x += camera.position.x;
	direction.y += camera.position.y;
	direction.z += camera.position.z;
	camera.lookAt(direction);
}

//Update editor raycaster
Editor.updateRaycasterFromMouse = function()
{
	var mouse = new THREE.Vector2((Mouse.position.x/Editor.canvas.width )*2 - 1, -(Mouse.position.y/Editor.canvas.height)*2 + 1);
	Editor.raycaster.setFromCamera(mouse, Editor.camera);
}

// Update editor raycaster with new x and y positions (normalized, -1 to 1)
Editor.updateRaycaster = function(x, y) {
	Editor.raycaster.setFromCamera(new THREE.Vector2(x, y), Editor.camera)
}

// Reset editing flags
Editor.resetEditingFlags = function() {
	Editor.selected_object = null
	Editor.block_camera_move = false
	Editor.is_editing_object = false

	Editor.selectTool(Editor.tool_mode)
	Editor.updateObjectViews()

	if(EditorUI.form !== undefined) {
		EditorUI.form.clear()
	}
}

// Get an asset through its UUID
Editor.getAssetByUUID = function(uuid) {
	if (EditorUI.asset_explorer_objects !== undefined && EditorUI.asset_explorer_objects.length > 0) {
		for(var i = 0; i < EditorUI.asset_explorer_objects.length; i++) {
			if (EditorUI.asset_explorer_objects[i].attachedTo.uuid === uuid) {
				return EditorUI.asset_explorer_objects[i].attachedTo
			}
		}
	}
}

// New Program
Editor.createNewProgram = function() {
	Editor.nameId = 1

	Editor.program = new Program()
	Editor.program.addDefaultScene()
	Editor.resetEditingFlags()

	Editor.updateObjectViews()
}

// Save program to file
Editor.saveProgram = function(fname) {
	var output = Editor.program.toJSON()
	var json = null

	try {
		json = JSON.stringify(output, null, "\t")
		json = json.replace(/[\n\t]+([\d\.e\-\[\]]+)/g, "$1")
	} catch(e) {
		json = JSON.stringify(output)
	}

	App.writeFile(fname, json)
}

// Load program from file
Editor.loadProgram = function(fname) {
	var loader = new ObjectLoader()
	var data = JSON.parse(App.readFile(fname))
	var program = loader.parse(data)

	Editor.program = program

	// Update object views
	Editor.resetEditingFlags()
	Editor.updateObjectViews()
}

// Export web project
Editor.exportWebProject = function(dir) {
	// For using this in windows, replace "/" for "\\"
	App.copyFolder("runtime", dir)
	App.copyFolder("src/core", dir + "/src/core")
	App.copyFolder("src/input", dir + "/src/input")
	App.copyFolder("libs", dir + "/libs")
	App.copyFile("src/App.js", dir + "/App.js")
	Editor.saveProgram(dir + "/app.gsp")
}

// Set editor state
Editor.setState = function(state) {
	if (state === Editor.STATE_EDITING) {
		// Dispose running program
		Editor.disposeRunningProgram()

		Editor.program_running = null
		Editor.vr_effect = null
	} else if (state === Editor.STATE_TESTING) {
		// Copy program and initialize scene
		Editor.program_running = Editor.program.clone()

		// Set renderer size
		Editor.renderer.setViewport(0, 0, Editor.canvas.width, Editor.canvas.height)
		Editor.renderer.setScissor(0, 0, Editor.canvas.width, Editor.canvas.height)

		// If no camera attached, attach camera
		Editor.program_running.default_camera = Editor.camera
		Editor.program_running.renderer = Editor.renderer

		// Initialize scene
		Editor.program_running.initialize()
		Editor.program_running.resize(Editor.canvas.width, Editor.canvas.height)

		if (Editor.program_running.vr) {
			if(App.webvrAvailable()) {
				// Create VREffect instance
				Editor.vr_effect = new THREE.VREffect(Editor.renderer)
			}
		}
	} else if (state === Editor.STATE_IDLE) {
		// Dispose running program
		Editor.disposeRunningProgram()
	}

	// Set editor state
	Editor.state = state
}

// Dispose running program, if there is one
Editor.disposeRunningProgram = function() {
	// Dispose running program, if there is one
	if (Editor.program_running !== null) {
		Editor.program_running.dispose()
		Editor.program_running = null
		Editor.vr_effect = null
	}
}

// Set performance meter to be used
Editor.setPerformanceMeter = function(stats) {
	Editor.stats = stats
}

// Set render canvas
Editor.setRenderCanvas = function(canvas) {
	Mouse.canvas = canvas
	Editor.canvas = canvas
	Editor.initializeRenderer(canvas)
}

// Initialize the renderer
Editor.initializeRenderer = function(canvas) {
	Editor.renderer = new THREE.WebGLRenderer({canvas: canvas, antialias: Settings.render.antialiasing})
	Editor.renderer.autoClear = false

	// Enable shadow maps
	Editor.renderer.shadowMap.enabled = Settings.render.shadows
	Editor.renderer.shadowMap.type = Settings.render.shadows_type
	Editor.renderer.setSize(canvas.width, canvas.height)
}

// Exit Editor
Editor.exit = function() {
	// Save settings
	Settings.store()

	if (App.gui !== undefined) {
		App.gui.App.closeAllWindows()
		App.gui.App.quit()
	}
}
