"use strict"

// Shader Editor Class
class ShaderMaterialEditor {
	constructor() {

		// TODO: Fix this

		var self = this
		this.id = "Shader Editor " + ShaderMaterialEditor.id
		this.tab = EditorUI.tabs_widget.addTab(this.id, {selected: true, closable: true, onclose: () => {
			clearInterval(self.interval)
			ShaderMaterialEditor.id--

			self.material = null
			EditorUI.selectPreviousTab()
			Editor.updateObjectViews()
		}, callback: () => {
			if (self.preview !== undefined) {
				Mouse.canvas = self.preview
			}

			if (self.material !== undefined) {
				self.activate()
			}
		}})

		this.parent = EditorUI.tabs_widget.getTabContent(this.id)
		Editor.setState(Editor.STATE_IDLE)

		var w = (EditorUI.mainarea.getSection(0).getSection(0).getWidth())-10
		var h = (EditorUI.mainarea.getSection(0).getSection(0).getHeight())-10

		// ----- LEFT AREA -----

		this.preview = document.createElement("canvas")
		this.preview.id = "ShaderPreview"+ShaderMaterialEditor.id
		this.preview.style.position = "absolute"
		this.parent.appendChild(this.preview)

		Mouse.canvas = this.preview

		// Material preview renderer
		this.renderer = new THREE.WebGLRenderer({canvas: this.preview, alpha: false, antialias: Settings.render.antialiasing})
		this.renderer.setSize(w/2, h)
		this.renderer.shadowMap.enabled = Settings.render.shadows
		this.renderer.shadowMap.type = Settings.render.shadows_type

		// Material preview camera
		this.camera = new PerspectiveCamera(50, w/h, 0.1, 1000000)
		this.camera.position.set(0, 0, 5)

		// Material preview scene
		this.scene = new Scene()

		// Material preview Lights
		this.sky = new Sky()
		var sun = this.sky.children[0]
		sun.shadow.camera.left = -5
		sun.shadow.camera.right = 5
		sun.shadow.camera.top = 5
		sun.shadow.camera.bottom = -5
		this.scene.add(this.sky)

		this.scene.add(new PointLight(0x666666))
		this.scene.add(new AmbientLight(0x555555))

		this.obj = new Model3D(new THREE.SphereBufferGeometry(1, 32, 32), null)
		this.obj.position.set(0, 0, -2.5)
		this.scene.add(this.obj)

		// ----- END LEFT AREA -----

		// ----- RIGHT AREA -----

		this.fragment_editor = new CodeEditor(this.parent)
		this.fragment_editor.element.style.left = w/2
		this.fragment_editor.setSize(w/2, h/2)
		this.fragment_editor.setOnChange(() => {
			if (self.material !== null) {
				self.material.fragmentShader = self.fragment_editor.getValue()
				self.material.needsUpdate = true
				self.update()
			}
		})

		this.vertex_editor = new CodeEditor(this.parent)
		this.vertex_editor.setSize(w/2, h/2)
		this.vertex_editor.element.style.left = w/2		
		this.vertex_editor.setOnChange(() => {
			if (self.material !== null) {
				self.material.vertexShader = self.vertex_editor.getValue()
				self.material.needsUpdate = true
				self.update()
			}
		})

		// ----- END RIGHT AREA ------

		// Set editor font size
		this.setFontSize(Settings.code.font_size)

		// Material attached to the editor
		this.material = null
		this.file = null

		//this.interval = setInterval(() => {
		//	self.update()
		//}, 1000/60)

		this.updateInterface()

		ShaderMaterialEditor.id++
	}

	setContent(fragment, vertex) {
		if (fragment !== undefined) {
			this.fragment_editor.setValue(fragment)
		}
		if (vertex !== undefined) {
			this.vertex_editor.setValue(vertex)
		}
	}

	attachMaterial(mat) {
		this.material = mat
		this.obj.material = this.material

		var f = null
		for(var i = 0; i < EditorUI.asset_explorer_objects.length; i++) {
			if (EditorUI.asset_explorer_objects[i].attachedTo === this.material) {
				f = EditorUI.asset_explorer_objects[i]
			}
		}

		this.file = f
		console.log(f)

		this.setContent(this.material.fragmentShader, this.material.vertexShader)
	}

	activate() {
		// Set Editor state
		Editor.setState(Editor.STATE_IDLE)
		Editor.resetEditingFlags()

		// Update script and set font size
		this.setFontSize(Settings.code.font_size)
	}

	setFontSize(size) {
		if (size < 5) {
			size = 5
		}

		Settings.code.font_size = size
	}

	updateInterface(e) {
		var w = (EditorUI.mainarea.getSection(0).getSection(0).getWidth())-2
		var h = (EditorUI.mainarea.getSection(0).getSection(0).getHeight())-26

		this.preview.width = w/2
		this.preview.height = h
		this.renderer.setSize(this.preview.width, this.preview.height)

		this.camera.aspect = (w/2) / (h/2)

		this.fragment_editor.setSize(w/2, h/2)
		this.fragment_editor.element.style.left = w/2
		this.vertex_editor.setSize(w/2, h/2)
		this.vertex_editor.element.style.left = w/2
	}

	update() {
		if (this.material !== null) {
			this.renderer.render(this.scene, this.camera)

			if(this.file !== null) {
				this.file.updatePreview()
				this.material.needsUpdate = true
			}
		}
	}
}

ShaderMaterialEditor.id = 0