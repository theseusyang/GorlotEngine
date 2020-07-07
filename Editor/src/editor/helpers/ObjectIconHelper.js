"use strict"

// Object Icon Helper Class
class ObjectIconHelper extends THREE.Sprite {
	constructor(obj, icon) {
		super(new THREE.SpriteMaterial({map: new Texture(icon), color: 0xffffff}))

		this.obj = null
		if (obj instanceof THREE.Object3D) {
			this.obj = obj
		}
	}

	update() {
		if (this.obj !== null) {
			this.obj.getWorldPosition(this.position)
		}
	}
}