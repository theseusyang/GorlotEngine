class VRControls {
	constructor(object, onError) {
		this.vr_input = null
		this.scale = 1 // Scale from real units to world units
		this.standing = false
		this.userHeight = 1.6 // Meters
		this.object = null

		if (object !== undefined) {
			this.object = object
		}

		// Position and rotation matrix
		this.position = new THREE.Vector3()
		this.quaternion = new THREE.Quaternion()

		// Self pointer
		var self = this

		// Get VR Display devices
		if (navigator.getVRDisplays !== undefined) {
			navigator.getVRDisplays().then(gotVRDevices)
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
			var pose = this.vr_input.getPose()

			// Orientation
			if (pose.orientation !== null) {
				this.quaternion.fromArray(pose.orientation)
			}

			// Position
			if (pose.position !== null) {
				this.position.fromArray(pose.position)
			} else {
				this.position.set(0, 0, 0)
			}

			// If standing mode enabled
			if (this.standing) {
				this.position.y += this.userHeight
			}

			// Scale
			this.position.multiplyScalar(this.scale)

			if (this.object !== null) {
				this.object.position.copy(this.position)
				this.object.quaternion.copy(this.quaternion)
			}
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
			this.vr_input.resetPose()
		}
	}

	attachObject(object) {
		this.object = object
	}
}