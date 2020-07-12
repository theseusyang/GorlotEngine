"use strict"

// Texture Asset Class
class TextureAsset extends Asset {
	constructor(name) {
		super(name)
	}

	attachTexture(texture) {
		if (texture instanceof THREE.Texture) {
			this.attachedTo = texture
		}
	}

	updatePreview() {
		if (this.asset !== null) {
			// TODO: this
		}
	}
}