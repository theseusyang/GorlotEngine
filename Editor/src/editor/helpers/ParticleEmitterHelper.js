"use strict"

// Particle Emitter Helper class
class ParticleEmitterHelper extends THREE.Object3D {
	constructor(particle) {
		super()

		this.particle = particle
		this.runtime = null

		if (particle instanceof ParticleEmitter) {
			this.runtime = new ObjectLoader().parse(particle.toJSON())
			this.add(this.runtime)
			this.runtime.initialize()
		}
	}

	update() {
		// Update attached particle
		if (this.runtime !== null) {
			this.runtime.position.copy(this.particle.position)
			this.runtime.scale.copy(this.particle.scale)
			this.runtime.rotation.copy(this.particle.rotation)
			this.runtime.update()
		}
	}
}