class VRControls {
	constructor(object, onError) {
		this.vr_input = null
		this.standing_matrix = new THREE.Matrix4()
		this.object = object

		// The Rift SDK returns the position in meters, this scale factor allows the user to define how meters are converted into scene units
		this.scale = 1

		// If true, will use "standing space" coordinate system where y=0 is the floor, and x=0, z=0 is the center of the room
		this.standing = false

		// Distance from the user's eyes to the floor in meters, used when standing mode enabled but the VRDisplay doesn't provide stageParameters
		this.userHeight = 1.6

		// Self pointer
		var self = this

		// Get VR Display devices
		if (navigator.getVRDisplays) {
			navigator.getVRDisplays().then(gotVRDevices)
		} else if (navigator.getVRDevices) {
			//Deprecated API
			navigator.getVRDevices().then(gotVRDevices)
		}

		// Return VR display devices
		function gotVRDevices(devices) {
			// Get first VRDisplay found
			for(var i = 0; i < devices.length; i++) {
				if (("VRDisplay" in window && devices[i] instanceof VRDisplay) || ("PositionSensorVRDevice" in window && devices[i] instanceof PositionSensorVRDevice)) {
					self.vr_input = devices[i]
					break
				}
			}

			// If no display found, call error
			if (!self.vr_input) {
				if (onError) {
					onError("VR input not available")
				}
			}
		}

		this.components = []
		this.defaultComponents = []

		this.defaultComponents.push(new ElementComponent())
		this.defaultComponents.push(new Object3DComponent())
	}

	update() {
		if (this.vr_input !== null) {
			//if (this.vr_input.getPose) {
				var pose = this.vr_input.getPose()

				if (pose.orientation !== null) {
					this.object.quaternion.fromArray(pose.orientation)
				}

				if (pose.position !== null) {
					this.object.position.fromArray(pose.position)
				} else {
					this.object.position.set(0, 0, 0)
				}
			//}

			// If standing mode enabled
			if (this.standing) {
				if (this.vr_input.stageParameters) {
					this.object.updateMatrix()

					this.standing_matrix.fromArray(this.vr_input.stageParameters.sittingFromStandingTransform)
					this.object.applyMatrix(this.standing_matrix)
				} else {
					this.object.position.setY(this.object.position.y + this.userHeight)
				}
			}

			this.object.position.multiplyScalar(this.scale)
		}
	}

	dispose() {
		this.vr_input = null
	}

	addComponent(compo) {
		if (compo instanceof Component) {
			this.components.push(compo)
		}
	}

	resetPose() {
		if (this.vr_input !== null) {
			// TODO: This
		}
	}
}