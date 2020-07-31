"use strict";

//Codemirror
include("Libraries/codemirror/codemirror.min.js")
include("Libraries/codemirror/codemirror.css")
include("Libraries/codemirror/keymap/sublime.js")
include("Libraries/codemirror/keymap/emacs.js")
include("Libraries/codemirror/keymap/vim.js")
include("Libraries/codemirror/addon/edit/closebrackets.js")
include("Libraries/codemirror/addon/edit/matchbrackets.js")
include("Libraries/codemirror/addon/search/search.js")
include("Libraries/codemirror/addon/search/searchcursor.js")
include("Libraries/codemirror/addon/search/jump-to-line.js")
include("Libraries/codemirror/addon/hint/show-hint.js")
include("Libraries/codemirror/addon/hint/show-hint.css")
include("Libraries/codemirror/addon/hint/anyword-hint.js")
include("Libraries/codemirror/addon/dialog/dialog.js")
include("Libraries/codemirror/addon/dialog/dialog.css")
include("Libraries/codemirror/addon/selection/active-line.js")
include("Libraries/codemirror/mode/javascript.js")
include("Libraries/codemirror/mode/glsl.js")
include("Libraries/codemirror/theme/*")

include("Libraries/jscolor.min.js")
include("Libraries/opentype.min.js")

include("Libraries/litegraph/litegraph.css")
include("Libraries/litegraph/litegui.css")

//Threejs
include("Libraries/three/loaders/OBJLoader.js")
include("Libraries/three/loaders/MTLLoader.js")
include("Libraries/three/loaders/VRMLLoader.js")
include("Libraries/three/loaders/FBXLoader.js")
include("Libraries/three/loaders/GLTFLoader.js")
include("Libraries/three/loaders/ColladaLoader.js")
include("Libraries/three/loaders/PLYLoader.js")
include("Libraries/three/loaders/VTKLoader.js")
include("Libraries/three/loaders/AWDLoader.js")
include("Libraries/three/loaders/TGALoader.js")

include("Libraries/three/animation/Animation.js")
include("Libraries/three/animation/AnimationHandler.js")
include("Libraries/three/animation/KeyFrameAnimation.js")

//Internal modules
include("Editor/UI/Element/Bar.js")
include("Editor/UI/Element/Button.js")
include("Editor/UI/Element/Text.js")
include("Editor/UI/Element/Division.js")
include("Editor/UI/Element/ImageBox.js")
include("Editor/UI/Element/DivisionResizable.js")
include("Editor/UI/Element/ButtonImage.js")
include("Editor/UI/Element/ButtonDrawer.js")
include("Editor/UI/Element/Canvas.js")
include("Editor/UI/Element/DualDivisionResizable.js")
include("Editor/UI/Element/ButtonImageToggle.js")
include("Editor/UI/Element/Form.js")

include("Editor/UI/Element/Input/Graph.js")
include("Editor/UI/Element/Input/CodeEditor.js")
include("Editor/UI/Element/Input/CheckBox.js")
include("Editor/UI/Element/Input/TextBox.js")
include("Editor/UI/Element/Input/ColorChooser.js")
include("Editor/UI/Element/Input/Slider.js")
include("Editor/UI/Element/Input/DropdownList.js")
include("Editor/UI/Element/Input/NumberBox.js")
include("Editor/UI/Element/Input/CoordinatesBox.js")
include("Editor/UI/Element/Input/ImageChooser.js")
include("Editor/UI/Element/Input/TextureBox.js")

include("Editor/UI/DropdownMenu.js")
include("Editor/UI/TabGroup.js")
include("Editor/UI/TabElement.js")
include("Editor/UI/TreeView.js")
include("Editor/UI/TreeElement.js")
include("Editor/UI/TabButton.js")
include("Editor/UI/ContextMenu.js")
include("Editor/UI/AssetExplorer.js")

include("Editor/UI/Asset/Asset.js")
include("Editor/UI/Asset/MaterialAsset.js")
include("Editor/UI/Asset/TextureAsset.js")
include("Editor/UI/Asset/BlockAsset.js")

include("Editor/Files/Style/Editor.css")

include("Editor/UI/Theme/Theme.js")
include("Editor/UI/Theme/ThemeDark.js")

include("Editor/UI/Tab/ScriptEditor.js")
include("Editor/UI/Tab/SceneEditor.js")
include("Editor/UI/Tab/SettingsTab.js")
include("Editor/UI/Tab/ParticleEditor.js")
include("Editor/UI/Tab/AboutTab.js")
include("Editor/UI/Tab/MaterialEditor.js")
include("Editor/UI/Tab/BlockEditor.js")
include("Editor/UI/Tab/ShaderMaterialEditor.js")

include("Editor/Tools/TransformControls.js")
include("Editor/Tools/GizmoMaterial.js")
include("Editor/Tools/GizmoLineMaterial.js")
include("Editor/Tools/TransformGizmo.js")
include("Editor/Tools/TransformGizmoRotate.js")
include("Editor/Tools/TransformGizmoScale.js")
include("Editor/Tools/TransformGizmoTranslate.js")

include("Editor/Helpers/ParticleEmitterHelper.js")
include("Editor/Helpers/ObjectIconHelper.js")
include("Editor/Helpers/PhysicsObjectHelper.js")
include("Editor/Helpers/BoundingBoxHelper.js")
include("Editor/Helpers/WireframeHelper.js")

include("Editor/Utils/MaterialRenderer.js")
include("Editor/Utils/ObjectIcons.js")

include("Editor/DragBuffer.js")
include("Editor/Interface.js")
include("Editor/Settings.js")

function Editor(){}

//Editor state
Editor.STATE_IDLE = 8
Editor.STATE_EDITING = 9
Editor.STATE_TESTING = 11

//Editor editing modes
Editor.MODE_SELECT = 0
Editor.MODE_MOVE = 1
Editor.MODE_SCALE = 2
Editor.MODE_ROTATE = 3

//Editor version
Editor.NAME = "Gorlot"
Editor.VERSION = "2020.0-Alpha"
Editor.TIMESTAMP = "Fri Jul 31 2020 17:01:10 GMT+0000 (UTC)"

//Initialize Main
Editor.initialize = function()
{
	//Load settings
	Settings.load()

	//Load interface theme
	Editor.theme = Theme.get(Settings.general.theme)

	//Set windows close event
	if(App.gui !== undefined)
	{
		//Close event
		App.gui.Window.get().on("close", function()
		{
			if(confirm("All unsaved changes to the project will be lost! Do you really wanna exit?"))
			{
				Editor.exit()
			}
		})
	}

	//Set window title
	document.title = Editor.NAME + " " + Editor.VERSION + " (" + Editor.TIMESTAMP + ")"

	//Editor initial state
	Editor.tool_mode = Editor.MODE_SELECT
	Editor.state = Editor.STATE_EDITING

	//Editor Selected object
	Editor.selected_object = null
	Editor.is_editing_object = false

	//Performance meter
	Editor.stats = null

	//Editor program and scene
	Editor.program = null
	Editor.program_running = null

	//VR effect and controls
	Editor.vr_controls = new VRControls()
	Editor.vr_effect = null

	//Renderer and canvas
	Editor.renderer = null
	Editor.canvas = null

	//Material renderer for material previews
	Editor.material_renderer = new MaterialRenderer()

	//Default resources
	Editor.createDefaultResources()

	//Initialize User Interface
	Interface.initialize()

	//Debug Elements
	Editor.tool_scene = new THREE.Scene()
	Editor.tool_scene_top = new THREE.Scene()

	//Raycaster
	Editor.raycaster = new THREE.Raycaster();

	//Editor Camera
	Editor.default_camera = new PerspectiveCamera(60, 1)
	Editor.default_camera.position.set(0, 5, 20)
	Editor.camera = Editor.default_camera
	Editor.camera_rotation = new THREE.Vector2(3.14, 0)
	Editor.setCameraRotation(Editor.camera_rotation, Editor.camera)

	//Grid and axis helpers
	Editor.grid_helper = new THREE.GridHelper(Settings.editor.grid_size, Math.round(Settings.editor.grid_size/Settings.editor.grid_spacing)*2, 0x888888, 0x888888)
	Editor.grid_helper.material.depthWrite = false
	Editor.grid_helper.material.transparent = true
	Editor.grid_helper.material.opacity = 0.3
	Editor.grid_helper.visible = Settings.editor.grid_enabled
	Editor.tool_scene.add(Editor.grid_helper)

	Editor.axis_helper = new THREE.AxisHelper(Settings.editor.grid_size)
	Editor.axis_helper.material.depthWrite = false
	Editor.axis_helper.material.transparent = true
	Editor.axis_helper.material.opacity = 1
	Editor.axis_helper.visible = Settings.editor.axis_enabled
	Editor.tool_scene.add(Editor.axis_helper)

	//Object helper container
	Editor.object_helper = new THREE.Scene()
	Editor.tool_scene.add(Editor.object_helper)

	//Tool container
	Editor.tool_container = new THREE.Scene()
	Editor.tool_scene_top.add(Editor.tool_container)
	Editor.tool = null

	// Check if some .isp is passed as argument
	for(var i = 0; i < App.args.length; i++) {
		if (App.args[i].endsWith(".isp")) {
			Editor.loadProgram(App.args[i])
			break
		}
	}

	//Create new program
	if(Editor.program === null) {
		Editor.createNewProgram()
	}

	Editor.updateObjectViews()
}

//Update Editor
Editor.update = function()
{
	//End performance measure
	if(Editor.stats !== null)
	{
		Editor.stats.begin()
	}

	//Update editor interface
	Interface.update()
	Editor.is_editing_object = false

	//If not on test mode
	if(Editor.state !== Editor.STATE_TESTING)
	{
		//Close tab, Save and load project
		if(Keyboard.keyPressed(Keyboard.CTRL))
		{
			if(Keyboard.keyJustPressed(Keyboard.S))
			{
				Interface.saveProgram()
			}
			else if(Keyboard.keyJustPressed(Keyboard.O))
			{
				Interface.loadProgram()
			}
			else if(Keyboard.keyJustPressed(Keyboard.W) || Keyboard.keyJustPressed(Keyboard.F4))
			{
				Interface.tab.closeActual()
			} else if (Keyboard.keyJustPressed(Keyboard.TAB) || Keyboard.keyJustPressed(Keyboard.PAGE_DOWN)) {
				Interface.tab.selectNextTab()
			} else if (Keyboard.keyJustPressed(Keyboard.PAGE_UP)) {
				Interface.tab.selectPreviousTab()
			}
		}
	}

	//Editing a scene
	if(Editor.state === Editor.STATE_EDITING)
	{
		//Keyboard shortcuts
		if(Keyboard.keyJustPressed(Keyboard.DEL))
		{
			Editor.deleteObject();
		}
		else if(Keyboard.keyPressed(Keyboard.CTRL))
		{
			if(Keyboard.keyJustPressed(Keyboard.C))
			{
				Editor.copyObject();
			}
			else if(Keyboard.keyJustPressed(Keyboard.V))
			{
				Editor.pasteObject();
			}
			else if(Keyboard.keyJustPressed(Keyboard.X))
			{
				Editor.cutObject();
			}
			else if(Keyboard.keyJustPressed(Keyboard.Y))
			{
				Editor.redo()
			}
			else if(Keyboard.keyJustPressed(Keyboard.Z))
			{
				Editor.undo()
			}
		}

		//Select objects
		if(Editor.tool_mode === Editor.MODE_SELECT)
		{
			if(Mouse.buttonJustPressed(Mouse.LEFT) && Mouse.insideCanvas())
			{
				Editor.updateRaycasterFromMouse();
				var intersects = Editor.raycaster.intersectObjects(Editor.program.scene.children, true);
				if(intersects.length > 0)
				{
					Editor.selectObject(intersects[0].object);
				}
			}

			Editor.is_editing_object = false;
		}
		else if(Editor.selected_object !== null)
		{
			//Update active tool status
			if(Editor.tool !== null)
			{
				Editor.is_editing_object = Editor.tool.update();
				if (Editor.is_editing_object) {
					Editor.updateObjectPanel()
				}
			}
			else
			{
				Editor.is_editing_object = false;
			}
		}

		// Update object transformation matrix
		if (Editor.selected_object !== null) {
			if (!Editor.selected_object.matrixAutoUpdate) {
				Editor.selected_object.updateMatrix()
			}
		}
		
		//Update object helper
		Editor.object_helper.update();

		//Check if mouse is inside canvas
		if(Mouse.insideCanvas())
		{
			//Lock mouse wheen camera is moving
			if(Settings.editor.lock_mouse) {
				if(!Editor.is_editing_object && (Mouse.buttonJustPressed(Mouse.LEFT) || Mouse.buttonJustPressed(Mouse.RIGHT) || Mouse.buttonJustPressed(Mouse.MIDDLE)))
				{
					Mouse.setLock(true);
				}
				else if(Mouse.buttonJustReleased(Mouse.LEFT) || Mouse.buttonJustReleased(Mouse.RIGHT) || Mouse.buttonJustReleased(Mouse.MIDDLE))
				{
					Mouse.setLock(false);
				}
			}

			//Look camera
			if(Mouse.buttonPressed(Mouse.LEFT) && !Editor.is_editing_object)
			{
				Editor.camera_rotation.x -= 0.002 * Mouse.delta.x;
				Editor.camera_rotation.y -= 0.002 * Mouse.delta.y;

				//Limit Vertical Rotation to 90 degrees
				var pid2 = 1.57;
				if(Editor.camera_rotation.y < -pid2)
				{
					Editor.camera_rotation.y = -pid2;
				}
				else if(Editor.camera_rotation.y > pid2)
				{
					Editor.camera_rotation.y = pid2;
				}

				Editor.setCameraRotation(Editor.camera_rotation, Editor.camera);
			}

			//Move Camera on X and Z
			else if(Mouse.buttonPressed(Mouse.RIGHT))
			{
				//Move speed
				var speed = Editor.camera.position.distanceTo(new THREE.Vector3(0,0,0)) / 1000;
				if(speed < 0.02)
				{
					speed = 0.02;
				}

				//Move Camera Front and Back
				var angle_cos = Math.cos(Editor.camera_rotation.x);
				var angle_sin = Math.sin(Editor.camera_rotation.x);
				Editor.camera.position.z += Mouse.delta.y * speed * angle_cos;
				Editor.camera.position.x += Mouse.delta.y * speed * angle_sin;

				//Move Camera Lateral
				var angle_cos = Math.cos(Editor.camera_rotation.x + MathUtils.pid2);
				var angle_sin = Math.sin(Editor.camera_rotation.x + MathUtils.pid2);
				Editor.camera.position.z += Mouse.delta.x * speed * angle_cos;
				Editor.camera.position.x += Mouse.delta.x * speed * angle_sin;
			}
			
			//Move Camera on Y
			else if(Mouse.buttonPressed(Mouse.MIDDLE))
			{
				Editor.camera.position.y += Mouse.delta.y * 0.1;
			}

			//Move in camera direction using mouse scroll
			if(Mouse.wheel != 0)
			{
				//Move speed
				var speed = Editor.camera.position.distanceTo(new THREE.Vector3(0,0,0))/2000;
				speed *= Mouse.wheel;

				//Limit zoom speed
				if(speed < 0 && speed > -0.03)
				{
					speed = -0.03;
				}
				else if(speed > 0 && speed < 0.03)
				{
					speed = 0.03;
				}

				//Move camera
				var direction = Editor.camera.getWorldDirection();
				Editor.camera.position.x -= speed * direction.x;
				Editor.camera.position.y -= speed * direction.y;
				Editor.camera.position.z -= speed * direction.z;
			}
		}
	}
	//Update Scene if on test mode
	else if(Editor.state === Editor.STATE_TESTING)
	{
		Editor.program_running.update();
	}
}

// Render stuff into screen
Editor.render = function()
{
	var renderer = Editor.renderer
	renderer.clear()

	if(Editor.state === Editor.STATE_EDITING)
	{
		renderer.setViewport(0, 0, Editor.canvas.width, Editor.canvas.height)
		renderer.setScissor(0, 0, Editor.canvas.width, Editor.canvas.height)
		renderer.render(Editor.program.scene, Editor.camera)

		renderer.render(Editor.tool_scene, Editor.camera)
		renderer.clearDepth()
		renderer.render(Editor.tool_scene_top, Editor.camera)

		if(Settings.editor.camera_preview_enabled && (Editor.selected_object instanceof THREE.Camera || Editor.program.scene.cameras.length > 0))
		{
			var width = Settings.editor.camera_preview_percentage * Editor.canvas.width
			var height = Settings.editor.camera_preview_percentage * Editor.canvas.height
			var offset = Editor.canvas.width - width - 10
			renderer.setViewport(offset, 10, width, height)
			renderer.setScissor(offset, 10, width, height)

			var background = Editor.program.scene.background
			Editor.program.scene.background = null

			if (Editor.selected_object instanceof THREE.Camera) {
				var camera = Editor.selected_object
				camera.aspect = width / height
				camera.updateProjectionMatrix()
				renderer.render(Editor.program.scene, camera)
			} else {
				var scene = Editor.program.scene
				for(var i = 0; i < scene.cameras.length; i++) {
					scene.cameras[i].aspect = width / height
					scene.cameras[i].updateProjectionMatrix()
					renderer.render(scene, scene.cameras[i])
				}
			}

			Editor.program.scene.background = background
		}
	}
	else if(Editor.state === Editor.STATE_TESTING)
	{
		if(Editor.vr_effect !== null)
		{
			Editor.vr_controls.scale = Editor.program_running.vr_scale
			Editor.vr_controls.update()

			var scene = Editor.program_running.scene
			for(var i = 0; i < scene.cameras.length; i++) {
				var camera = scene.cameras[i]

				// Apply VR Controller offsets to camera
				var position = camera.position.clone()
				var quaternion = camera.quaternion.clone()

				camera.position.add(Editor.vr_controls.position)
				camera.quaternion.multiply(Editor.vr_controls.quaternion)

				// Render scene
				Editor.vr_effect.render(scene, camera)

				// Restore camera attributes
				camera.position.copy(position)
				camera.quaternion.copy(quaternion)
			}
		}
		else
		{
			var scene = Editor.program_running.scene
			for(var i = 0; i < scene.cameras.length; i++) {
				renderer.render(scene, scene.cameras[i])
			}
		}
	}

	//End performance measure
	if(Editor.stats !== null)
	{
		Editor.stats.end()
	}
}

//Resize to fit window
Editor.resize = function()
{
	if(!App.fullscreen)
	{
		Interface.updateInterface()
	}
}

//Select a object
Editor.selectObject = function(object)
{
	if (object instanceof THREE.Object3D) {
		Editor.selected_object = object

		Editor.selectObjectPanel()
		Editor.selectObjectHelper()

		if (Editor.tool !== null) {
			Editor.tool.detach()
			Editor.tool.attach(object)
		} else {
			Editor.selectTool(Editor.tool_mode)
		}
	} else {
		Editor.selected_object = null
		Editor.resetEditingFlags()
	}
}

//Check if object is selected
Editor.isObjectSelected = function(obj)
{
	if(Editor.selected_object !== null)
	{
		return Editor.selected_object.uuid === obj.uuid
	}
	return false
}

// Delete Selected Object
Editor.deleteObject = function(obj)
{
	if(obj === undefined) {
		obj = Editor.selected_object
	}

	if(obj instanceof THREE.Object3D)
	{
		if(Editor.isObjectSelected(obj))
		{
			Editor.resetEditingFlags()
		}

		obj.destroy()

		Editor.updateObjectViews()
	}
}

//Copy selected object
Editor.copyObject = function(obj)
{
	if(obj !== undefined)
	{
		if(App.clipboard !== undefined)
		{
			App.clipboard.set(JSON.stringify(obj.toJSON()), "text")
		}
	}
	else if(Editor.selected_object !== null && !(Editor.selected_object instanceof Program || Editor.selected_object instanceof Scene))
	{
		if(App.clipboard !== undefined)
		{
			App.clipboard.set(JSON.stringify(Editor.selected_object.toJSON()), "text")
		}
	}
}

//Cut selected object
Editor.cutObject = function(obj)
{
	if(obj !== undefined)
	{
		if(App.clipboard !== undefined)
		{
			App.clipboard.set(JSON.stringify(obj.toJSON()), "text")
		}
		obj.destroy()
		Editor.updateObjectViews()
		if(Editor.isObjectSelected(obj))
		{
			Editor.resetEditingFlags()
		}
	}
	else if(Editor.selected_object !== null && !(Editor.selected_object instanceof Program || Editor.selected_object instanceof Scene))
	{
		if(App.clipboard !== undefined)
		{
			App.clipboard.set(JSON.stringify(Editor.selected_object.toJSON()), "text")
		}
		Editor.selected_object.destroy()
		Editor.updateObjectViews()
		Editor.resetEditingFlags()
	}
}

//Paste object as children of target object
Editor.pasteObject = function(target)
{
	try
	{
		var content = App.clipboard.get("text");
		var data = JSON.parse(content);

		//Create object
		var obj = new ObjectLoader().parse(data);
		obj.traverse(function(child)
		{
			child.uuid = THREE.Math.generateUUID();
		});

		//Add object to target
		if(target !== undefined)
		{
			target.add(obj);
		}
		else
		{
			Editor.program.scene.add(obj);
		}

		Editor.updateObjectViews();
	}
	catch(e){}
}

// Redo action
Editor.redo = function() {
	// TODO: This
}

// Undo action
Editor.undo = function() {
	// TODO: This
}

//Update UI panel to match selected object
Editor.selectObjectPanel = function()
{
	Interface.tree_view.updateSelectedObject(Editor.selected_object)

	if(Interface.panel !== null)
	{
		Interface.panel.destroy()
	}

	if(Editor.selected_object !== null) {
		Interface.panel = new Panel(Interface.explorer_resizable.div_b)
		Interface.panel.attachObject(Editor.selected_object)
		Interface.panel.updateInterface()
	}
	else
	{
		Interface.panel = null
	}
}

// TODO: Remove Test code
var update = 0
var tree_delta, asset_delta, tabs_delta, panel_delta

//Update all object views
Editor.updateObjectViews = function()
{
	// TODO: Remove test code
	var start = Date.now()

	Editor.updateTreeView();
	Editor.updateObjectPanel();
	Editor.updateTabsData();
	Editor.updateAssetExplorer()

	// TODO: Remove test code
	var delta = Date.now() - start
	console.log("Update " + (update++) + " ObjectView: " + delta + "ms")
	console.log("    Treeview " + tree_delta + "ms")
	console.log("    Panel " + panel_delta + "ms")
	console.log("    Tabs " + tabs_delta + "ms")
	console.log("    Assets " + asset_delta + "ms\n\n")
}

//Update tab names to match objects actual info
Editor.updateTabsData = function()
{
	// TODO: Remove test code
	var start = Date.now()

	Interface.tab.updateMetadata();

	tabs_delta = Date.now() - start
}

//Update tree view to match actual scene
Editor.updateTreeView = function()
{
	// TODO: Remove test code
	var start = Date.now()

	Interface.tree_view.fromObject(Editor.program);

	// TODO: Remove test code
	tree_delta = Date.now() - start
}

//Update assets explorer content
Editor.updateAssetExplorer = function()
{
	// TODO: Remove test code
	var start = Date.now()

	//Clean asset explorer
	Interface.asset_explorer.clear();
	
	// Materials
	var materials = ObjectUtils.getMaterials(Editor.program, Editor.program.materials)

	for(var i in materials)
	{
		var file = new MaterialAsset(Interface.asset_explorer.element);
		file.setMaterial(materials[i]);
		Interface.asset_explorer.add(file);
	}

	// Objects
	var objects = Editor.program.asset_objects

	for(var i in objects) {
		var file = new BlockAsset(Interface.asset_explorer.element)
		file.setBlocks(objects[i])
		Interface.asset_explorer.add(file)
	}

	// Textures
	// var textures = ObjectUtils.getTextures(Editor.program, Editor.program.textures)
	// for(var i in textures) {
		// var file = new TextureAsset(Interface.asset_explorer.element)
		// file.setTexture(textures[i])
		// Interface.asset_explorer.add(file)
	// }

	Interface.asset_explorer.updateInterface();

	// TODO: Remove test code
	asset_delta = Date.now() - start
}

//Updates object panel values
Editor.updateObjectPanel = function()
{
	// TODO: Remove test code
	var start = Date.now()

	if(Interface.panel !== null)
	{
		Interface.panel.updatePanel();
	}

	// TODO: Remove test code
	panel_delta = Date.now() - start
}

// Create default resources to be used when creating new objects
Editor.createDefaultResources = function() {
	Editor.default_image = new GORLOT.Image("Data/sample.png")
	Editor.default_font = new Font("Data/Fonts/montserrat.json")
	Editor.default_audio = new Audio("Data/sample.ogg")
	Editor.default_texture = new Texture(Editor.default_image)
	Editor.default_material = new MeshStandardMaterial({roughness: 0.6, metalness: 0.2})
	Editor.default_material.name = "default"
	Editor.default_sprite_material = new SpriteMaterial({map: Editor.default_texture, color: 0xffffff})
	Editor.default_sprite_material.name = "default"
}

//Add object to actual scene
Editor.addToScene = function(obj)
{
	if(Editor.program.scene !== null)
	{
		Editor.program.scene.add(obj);
		Editor.updateObjectViews();
	}
}

//Select tool to manipulate objects
Editor.selectTool = function(tool)
{
	Editor.tool_mode = tool;
	Editor.tool_container.removeAll();

	if (Editor.tool !== null) {
		Editor.tool.dispose()
	}

	if (Editor.selected_object !== null && tool !== Editor.MODE_SELECT) {
		if(tool === Editor.MODE_MOVE)
		{
			Editor.tool = new TransformControls()
			Editor.tool.setMode("translate")
			Editor.tool.setSpace(Settings.editor.transformation_space)
		}
		else if(tool === Editor.MODE_SCALE)
		{
			Editor.tool = new TransformControls()
			Editor.tool.setMode("scale")
		}
		else if (tool === Editor.MODE_ROTATE) {
			Editor.tool = new TransformControls()
			Editor.tool.setMode("rotate")
			Editor.tool.setSpace(Settings.editor.transformation_space)
		}

		Editor.tool.attach(Editor.selected_object)
		Editor.tool_container.add(Editor.tool)
	} else {
		Editor.tool = null
	}
}

//Select helper to debug selected object data
Editor.selectObjectHelper = function()
{
	Editor.object_helper.removeAll();

	if(Editor.selected_object !== null)
	{
		//Camera
		if(Editor.selected_object instanceof THREE.Camera)
		{
			Editor.object_helper.add(new THREE.CameraHelper(Editor.selected_object));
			Editor.object_helper.add(new ObjectIconHelper(Editor.selected_object, Interface.file_dir + "Icons/Camera/Camera.png"));
		}
		//Directional light
		else if(Editor.selected_object instanceof THREE.DirectionalLight)
		{
			Editor.object_helper.add(new THREE.DirectionalLightHelper(Editor.selected_object, 1));
		}
		//Point light
		else if(Editor.selected_object instanceof THREE.PointLight)
		{
			Editor.object_helper.add(new THREE.PointLightHelper(Editor.selected_object, 1));
		}
		//Spot light
		else if(Editor.selected_object instanceof THREE.SpotLight)
		{
			Editor.object_helper.add(new THREE.SpotLightHelper(Editor.selected_object));
		}
		//Hemisphere light
		else if(Editor.selected_object instanceof THREE.HemisphereLight)
		{
			Editor.object_helper.add(new THREE.HemisphereLightHelper(Editor.selected_object, 1));
		}
		//Particle
		else if(Editor.selected_object instanceof ParticleEmitter)
		{
			Editor.object_helper.add(new ParticleEmitterHelper(Editor.selected_object));
		}
		// Physics
		else if(Editor.selected_object instanceof PhysicsObject)
		{
			Editor.object_helper.add(new PhysicsObjectHelper(Editor.selected_object));
		}
		// Script
		else if (Editor.selected_object instanceof Script || Editor.selected_object instanceof AudioEmitter || Editor.selected_object instanceof BlockScript) {
			Editor.object_helper.add(new ObjectIconHelper(Editor.selected_object, ObjectIcons.get(Editor.selected_object.type)))
		}
		// Animated Mesh
		else if (Editor.selected_object instanceof THREE.SkinnedMesh) {
			Editor.object_helper.add(new BoundingBoxHelper(Editor.selected_object, 0xFFFF00))
			Editor.object_helper.add(new WireframeHelper(Editor.selected_object))
			Editor.object_helper.add(new THREE.SkeletonHelper(Editor.selected_object))
		}
		// Mesh
		else if (Editor.selected_object instanceof THREE.Mesh) {
			Editor.object_helper.add(new BoundingBoxHelper(Editor.selected_object, 0xFFFF00))
			Editor.object_helper.add(new WireframeHelper(Editor.selected_object))
		}
		// Object Caller
		else if (Editor.selected_object instanceof ObjectCaller) {
			// By default, the object caller will only have the ObjectIconHelper
			Editor.object_helper.add(new ObjectIconHelper(Editor.selected_object, ObjectIcons.get(Editor.selected_object.obj_type)))
		}
		//Object 3D
		else if(Editor.selected_object instanceof THREE.Object3D)
		{
			Editor.object_helper.add(new BoundingBoxHelper(Editor.selected_object, 0xFFFF00));
		}
	}
}

//Resize Camera
Editor.resizeCamera = function()
{
	if(Editor.canvas !== null && Editor.renderer != null)
	{
		Editor.renderer.setSize(Editor.canvas.width, Editor.canvas.height);
		Editor.camera.aspect = Editor.canvas.width/Editor.canvas.height;
		Editor.camera.updateProjectionMatrix();

		if(Editor.state === Editor.STATE_TESTING)
		{
			Editor.program_running.resize(Editor.canvas.width, Editor.canvas.height);
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
	direction.add(camera.position);
	camera.lookAt(direction);
}

//Update raycaster position from editor mouse position
Editor.updateRaycasterFromMouse = function()
{
	var mouse = new THREE.Vector2((Mouse.position.x/Editor.canvas.width)*2 - 1, -(Mouse.position.y/Editor.canvas.height)*2 + 1);
	Editor.raycaster.setFromCamera(mouse, Editor.camera);
}

// Update editor raycaster with new x and y positions (normalised -1 to 1)
Editor.updateRaycaster = function(x, y) {
	Editor.raycaster.setFromCamera(new THREE.Vector2(x, y), Editor.camera)
}

//Reset editing flags
Editor.resetEditingFlags = function()
{
	Editor.selected_object = null
	Editor.is_editing_object = false
	
	if (Interface.panel !== null) {
		Interface.panel.destroy()
		Interface.panel = null
	}

	Editor.selectTool(Editor.MODE_SELECT)
	Editor.selectObjectHelper()
}

//Craete new Program
Editor.createNewProgram = function()
{
	Editor.createDefaultResources()

	//Create new program
	Editor.program = new Program();
	Editor.program.addDefaultScene(Editor.default_material);
	Editor.resetEditingFlags();

	//Remove old tabs from interface
	if(Interface.tab !== undefined)
	{
		Interface.tab.clear();
		var scene = Interface.tab.addTab("scene", Interface.file_dir + "Icons/Tab/Scene.png", true);
		var canvas = new SceneEditor(scene.element);
		canvas.setScene(Editor.program.scene);
		scene.attachComponent(canvas);
		Interface.tab.selectTab(0);
	}
}

//Save program to file
Editor.saveProgram = function(fname)
{
	var output = Editor.program.toJSON()
	FileSystem.writeFile(fname, json)
}

//Load program from file
Editor.loadProgram = function(fname)
{
	// Dispose old program
	if (Editor.program !== null) {
		Editor.program.dispose()
	}

	// Load program data file
	var loader = new ObjectLoader();
	var data = JSON.parse(FileSystem.readFile(fname));
	var program = loader.parse(data);
	Editor.program = program;
	Editor.resetEditingFlags()
	
	//Remove old tabs from interface
	Interface.tab.clear();

	//Add new scene tab to interface
	if(Editor.program.scene !== null)
	{
		var scene = Interface.tab.addTab("scene", Interface.file_dir + "Icons/Tab/Scene.png", true);
		var editor = new SceneEditor(scene.element);
		editor.setScene(Editor.program.scene);
		scene.attachComponent(editor);
		Interface.tab.selectTab(0);
	}
}

//Export web project
Editor.exportWebProject = function(dir)
{
	FileSystem.copyFolder("runtime", dir);
	FileSystem.copyFolder("Engine/core", dir + "Engine/core");
	FileSystem.copyFolder("Engine/input", dir + "Engine/input");
	FileSystem.copyFile("Engine/App.js", dir + "Engine/App.js");

	FileSystem.makeDirectory(dir + "src/lib");
	FileSystem.copyFile("Libraries/leap.min.js", dir + "Libraries/leap.min.js")
	FileSystem.copyFile("Libraries/SPE.min.js", dir + "Libraries/SPE.min.js")
	FileSystem.copyFile("Libraries/leap.min.js", dir + "Libraries/leap.min.js")
	FileSystem.copyFile("Libraries/stats.min.js", dir + "Libraries/stats.min.js")
	FileSystem.copyFile("Libraries/cannon.min.js", dir + "Libraries/cannon.min.js")
	FileSystem.copyFile("Libraries/spine.min.js", dir + "Libraries/spine.min.js")
	FileSystem.copyFile("Libraries/base64.min.js", dir + "Libraries/base64.min.js")
	FileSystem.makeDirectory(dir + "Libraries/three")
	FileSystem.copyFile("Libraries/three/three.min.js", dir + "Libraries/three/three.min.js")
	FileSystem.makeDirectory(dir + "Libraries/three/effects")
	FileSystem.copyFile("Libraries/three/effects/VREffect.js", dir + "Libraries/three/effects/VREffect.js")

	Editor.saveProgram(dir + "/app.isp");
}

//Export windows project
Editor.exportWindowsProject = function(dir)
{
	Editor.exportWebProject(dir);

	FileSystem.copyFolder("nwjs", dir + "/nwjs");
	FileSystem.writeFile(dir + "/package.json", JSON.stringify({name: Editor.program.name,main: "index.html",window:{frame: true}}));
	Editor.saveProgram(dir + "/app.isp");
}

// Get an asset through its UUID
Editor.getAssetByUUID = function(uuid) {
	if (Interface.asset_explorer.files !== undefined && Interface.asset_explorer.files.length > 0) {
		for(var i = 0; i < Interface.asset_explorer.files.length; i++) {

			// If it's a file
			if (Interface.asset_explorer.files[i].material !== undefined) {
				if (Interface.asset_explorer.files[i].material.uuid === uuid) {
					return Interface.asset_explorer.files[i].material
				}
			}

		}
	}
}

//Set editor state
Editor.setState = function(state)
{
	if(state === Editor.STATE_EDITING)
	{
		//Dispose running program
		Editor.disposeRunningProgram();

		//Set run button text
		Interface.run.setText("Run");
		Interface.run.visible = true;
		Interface.run.updateInterface();

		//Hide fullscreen and VR buttons
		var tab = Interface.tab.getActual();
		if(tab instanceof SceneEditor)
		{
			tab.show_buttons_tools = true
			tab.show_buttons_fullscreen = false;
			tab.show_buttons_vr = false;
			tab.updateInterface();
		}
	}
	else if(state === Editor.STATE_TESTING)
	{
		// Register all the nodes
		Register.registerAll()

		//Copy program
		Editor.program_running = Editor.program.clone();

		//Use editor camera as default camera for program
		Editor.program_running.default_camera = Editor.camera;
		Editor.program_running.renderer = Editor.renderer;

		//Initialize scene
		Editor.program_running.initialize();
		Editor.program_running.resize(Editor.canvas.width, Editor.canvas.height);

		//Show full screen and VR buttons
		var tab = Interface.tab.getActual();
		tab.show_buttons_fullscreen = true;
		tab.show_buttons_tools = false

		//If program uses VR set button
		if(Editor.program_running.vr)
		{
			if(App.webvrAvailable())
			{
				Editor.vr_effect = new THREE.VREffect(Editor.renderer);
				
				//Show VR button
				tab.show_buttons_vr = true;

				//Create VR switch callback
				var vr_state = true;
				tab.vr_button.setCallback(function()
				{
					if(Editor.vr_effect !== null)
					{
						Editor.vr_effect.setFullScreen(vr_state);
						vr_state = !vr_state;
					}
				});
			}
		}

		//Set mouse lock
		if(Editor.program_running.lock_pointer)
		{
			Mouse.setLock(true);
		}

		//Update tab to show buttons
		tab.updateInterface();

		//Set renderer size
		Editor.renderer.setViewport(0, 0, Editor.canvas.width, Editor.canvas.height);
		Editor.renderer.setScissor(0, 0, Editor.canvas.width, Editor.canvas.height);

		//Set run button text
		Interface.run.setText("Stop");
		Interface.run.visible = true;
		Interface.run.updateInterface();
	}
	else if(state === Editor.STATE_IDLE)
	{
		//Dispose running program
		Editor.disposeRunningProgram();

		//Hide run button
		Interface.run.visible = false;
		Interface.run.updateInterface();
	}

	//Set editor state
	Editor.state = state;
}

//Dispose running program if there is one
Editor.disposeRunningProgram = function()
{
	//Dispose running program if there is one
	if(Editor.program_running !== null)
	{
		Editor.program_running.dispose();
		Editor.program_running = null;
		Editor.vr_effect = null;
	}

	//Unlock mouse
	Mouse.setLock(false);
}

//Set performance meter to be used
Editor.setPerformanceMeter = function(stats)
{
	Editor.stats = stats;
}

//Set render canvas
Editor.setRenderCanvas = function(canvas)
{
	Mouse.setCanvas(canvas);
	Editor.canvas = canvas;
	Editor.initializeRenderer(canvas);
}

//Initialize renderer
Editor.initializeRenderer = function(canvas)
{
	Editor.renderer = new THREE.WebGLRenderer({canvas: canvas, antialias: Settings.render.antialiasing});
	Editor.renderer.setSize(canvas.width, canvas.height);
	Editor.renderer.autoClear = false;
	Editor.renderer.shadowMap.enabled = Settings.render.shadows;
	Editor.renderer.shadowMap.type = Settings.render.shadows_type;
}

// Opens a different window
Editor.openWindow = function(options) {
	
	var title = (options.title !== undefined) ? options.title : Editor.NAME
	var w = (options.width !== undefined) ? options.width : 800
	var h = (options.height !== undefined) ? options.height : 600

	var wind = window.open("", "", "width="+w+", height="+h+", location=no, status=no, menubar=no, titlebar=no, fullscreen=yes")
	wind.document.write(`<head><title>${title}</title></head><body oncontextmenu='return false'></body>`)

	// transfer files
	wind.document.write("<script src='Engine/App.js'></script>")
	wind.document.write("<script src='Editor/Editor.js'></script>")

	wind.document.close()

	wind.window.editor = Editor

	return wind
}

//Exit editor
Editor.exit = function()
{
	Settings.store();
	if(App.gui !== undefined)
	{
		App.gui.App.closeAllWindows();
		App.gui.App.quit();
	}
}
