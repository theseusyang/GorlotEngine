class TextureFile extends File {
	constructor(name) {
		super(name)
	}

	attachTexture(texture) {
		if (texture instanceof THREE.Texture) {
			this.attachedTo = texture
		}
	}
}