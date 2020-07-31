"use strict";

//Container constructor
function Container()
{
	THREE.Object3D.call(this);

	this.name = "empty";
	this.type = "Group";

	this.components = []
	this.defaultComponents = []

	this.defaultComponents.push(new ElementComponent())
	this.defaultComponents.push(new ObjectComponent())
}

// Super prototype
Container.prototype = Object.create(THREE.Object3D.prototype);
