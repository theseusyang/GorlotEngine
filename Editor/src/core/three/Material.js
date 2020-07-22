"use strict"

THREE.Material.prototype.nodes = {}

THREE.Material.prototype.updateNodes = function(nodes) {
	if (this.nodes !== undefined) {
		this.nodes = {}
		this.nodes = nodes
	}
}