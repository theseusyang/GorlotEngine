"use strict";

//Sprite constructor
function Sprite(material)
{
	THREE.Sprite.call(this, material);

	this.name = "sprite";
	this.type = "Sprite";

	this.components = []
	this.defaultComponents = []

	this.defaultComponents.push(new ElementComponent())
	this.defaultComponents.push(new ObjectComponent())
}

// Super prototype
Sprite.prototype = Object.create(THREE.Sprite.prototype);

// Dispose sprite
Sprite.prototype.dispose = function()
{
	// Dispose material
	if(this.material.dispose !== undefined)
	{
		this.material.dispose();
	}

	// Dispose children
	for(var i = 0; i < this.children.length; i++)
	{
		this.children[i].dispose();
	}
}
