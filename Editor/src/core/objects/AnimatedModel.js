"use strict"

// Animated model class
class AnimatedModel extends THREE.SkinnedMesh {
	constructor(geometry, material, useVertexTexture) {
		super(geometry, material, useVertexTexture)

		this.name = "model"

        this.receiveShadow = true
            this.castShadow = true

		this.components = []
		this.defaultComponents = []
	
		this.defaultComponents.push(new ElementComponent())
		this.defaultComponents.push(new Object3DComponent())
	}

	initialize() {
		for(var i = 0; i < this.children.length; i++) {
			this.children[i].initialize()
		}
	}

	update() {
		for(var i = 0; i < this.children.length; i++) {
			this.children[i].update()
		}
	}

	stop() {
		for(var i = 0; i < this.children.length; i++) {
			this.children[i].stop()
		}
	}

    // Dispose model
    dispose() {
        // Dispose material and geometry
        this.material.dispose()
        this.geometry.dispose()

        // Dispose children
        for(var i = 0; i < this.children.length; i++) {
            this.children[i].dispose()
        }
    }

	addComponent(compo) {
		if (compo instanceof Component) {
			this.components.push(compo)
		}
	}
}
