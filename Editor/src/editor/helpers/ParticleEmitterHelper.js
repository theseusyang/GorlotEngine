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
			this.particle.getWorldPosition(this.runtime.position)
			this.particle.getWorldScale(this.runtime.scale)
			this.particle.getWorldRotation(this.runtime.rotation)
			this.runtime.update()
		}
	}
}