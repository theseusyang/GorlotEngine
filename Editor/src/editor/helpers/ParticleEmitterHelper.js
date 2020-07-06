"use strict"

// Particle Emitter Helper class
class ParticleEmitterHelper extends THREE.Object3D {
	constructor() {
		super()

		// TODO: This

		this.particle = null
		this.particle_runtime = null
	}

	update() {
		// Update attached particle

		if (this.particle_runtime !== null) {
			this.particle_runtime.update()
		}
	}
}