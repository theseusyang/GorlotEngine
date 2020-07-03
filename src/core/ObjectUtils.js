//Object tools contains some object managing helpers
function ObjectUtils(){}

// Get all materials in object
ObjectUtils.getMaterials = function(obj, materials) {
	// If undefined, create new array to store materials
	if (materials === undefined) {
		materials = []
	}

	// Add materials from children and call func for them
	for(var i = 0; i < obj.children.length; i++) {
		var child = obj.children[i]

		// Check if material is mesh or sprite
		if (child instanceof THREE.Mesh || child instanceof THREE.Sprite) {
			var material = child.material
			if (materials.indexOf(material) === -1) {
				materials.push(material)
			}
		}
		ObjectUtils.getMaterials(child, materials)
	}

	return materials
}

// Get all textures in object
ObjectUtils.getTextures = function(obj, textures) {
	// If undefined, create new array to store materials
	if (textures === undefined) {
		textures = []
	}

	// Add textures from children and call func for them
	for(var i = 0; i < obj.children.length; i++) {
		var child = obj.children[i]
		if (child.material !== undefined) {
			// TODO: This
		} else if (child instanceof ParticleEmitter) {
			var texture = child.group.texture

			if (textures.indexOf(texture) === -1) {
				textures.push(texture)
			}
		}

		ObjectUtils.getTextures(child, textures)
	}

	return textures
}

// Get object scene
ObjectUtils.getScene = function(obj) {
	var node = obj

	while(node.parent !== null) {
		node = node.parent
		if (node instanceof Scene) {
			return node
		}
	}

	return null
}

// Get object tree root
ObjectUtils.getRoot = function(obj) {
	var node = obj
	while(node.parent !== null) {
		node = node.parent
	}

	return node
}

// Convert threejs type to internal types
ObjectUtils.convertFromThreeType = function(obj) {
	var data = obj.toJSON()
	var loader = new ObjectLoader()
	return loader.parse(data)
}

// Set static
ObjectUtils.setMatrixAutoUpdate = function(obj, value) {
	obj.matrixAutoUpdate = value

	for(var i = 0; i < obj.children.length; i++) {
		ObjectUtils.setMatrixAutoUpdate(obj.children[i], value)
	}
}

// Set shadow receiving
ObjectUtils.setShadowReceiving = function(obj, value) {
	obj.receiveShadow = value

	for(var i = 0; i < obj.children.length; i++) {
		ObjectUtils.setShadowReceiving(obj.children[i], value)
	}
}

// Set shadow casting
ObjectUtils.setShadowCasting = function(obj, value) {
	obj.castShadow = value

	for(var i = 0; i < obj.children.length; i++) {
		ObjectUtils.setShadowCasting(obj.children[i], value)
	}
}

//Check if object is child of another object
ObjectUtils.isChildOf = function(parent, child)
{
	for(var i = 0; i < parent.children.length; i++) {
		if (parent.children[i] === child || ObjectUtils.isChildOf(parent.children[i], child)) {
			return true
		}
	}
	return false
}

// Creates a cylinder between two points, a and b
ObjectUtils.createCylinderBetweenPoints = function(a, b) {
	var dist = Math.sqrt(Math.pow((a.x - b.x),2) + Math.pow((a.y - b.y), 2) + Math.pow((a.z - b.z)), 2)

	var geometry = new THREE.CylinderGeometry(0.1, 0.1, dist, 16, 32, false)
	var material = new MeshPhongMaterial({color: 0xff0000})
	var cylinder = new Model3D(geometry, material)
	cylinder.position.set(0, dist/2, 0)

	var obj = new THREE.Object3D()
	obj.position.set(a.x, a.y, a.z)
	obj.add(cylinder)
	obj.lookAt(b)

	return obj
}