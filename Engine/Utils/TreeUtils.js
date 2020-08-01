"use strict"

function TreeUtils() {}

TreeUtils.compare = function(a, b) {
	// TODO: This
}

TreeUtils.test = function() {
	// TODO: Test
}

function Tree() {
	this.value = null
	this.parent = null
	this.children = null
}

Tree.prototype.add = function(tree) {
	if (tree instanceof Tree) {
		this.children.push(tree)
	}
}

Tree.prototype.remove = function(tree) {
	if (tree instanceof Tree) {
		var index = this.children.indexOf(tree)
		if (index !== -1) {
			this.children.splice(index, 1)
		}
	}
}