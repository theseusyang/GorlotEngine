"use strict"

function Tree(value) {
	this.value = (value !== undefined) ? value : null
	this.uuid = Math.ceil(Math.random() * 65536)
	this.parent = null
	this.children = []
}

// Add element to tree
Tree.prototype.add = function(tree) {
	if (tree instanceof Tree) {
		this.children.push(tree)
		this.parent = this
		return tree
	} else {
		var tree = new Tree(tree)
		tree.parent = this
		this.children.push(tree)
		return tree
	}
}

// Remove element from tree
Tree.prototype.remove = function(tree) {
	var uuid = (typeof tree === "number") ? tree : tree.uuid

	for(var i = 0; i < this.children.length; i++) {
		if (this.children[i].uuid === uuid) {
			this.children.splice(i, 1)
			return
		}
	}
}

// Clone tree
Tree.prototype.clone = function(tree) {
	var tree = new Tree()
	tree.uuid = this.uuid
	tree.value = this.value

	for(var i = 0; i < this.children.length; i++) {
		tree.add(this.children[i].clone())
	}

	return tree
}

// Print tree
Tree.prototype.print = function(level) {
	if (level === undefined) {
		level = 1
	}

	var space = ""
	for(var i = level - 1; i > 0; i--) {
		space += "----"
	}
	space += "--->"

	for(var i = 0; i < this.children.length; i++) {
		console.log(space + this.children[i].value + "(" + this.children[i].uuid + ")")
		this.children[i].print(level + 1)
	}
}

// Tree changes mode
Tree.DIFF_ADD = 0
Tree.DIFF_REM = 1
Tree.DIFF_MOVE = 2

// Compare two trees and return list of changes
Tree.compare = function(a, b, diffs, missing) {
	if (diffs === undefined) {
		diffs = []
	}

	if (missing === undefined) {
		missing = []
	}

	var length = (a.children.length < b.children.length) ? a.children.length : b.children.length

	for(var i = 0, j = 0; i < length; i++, j++) {
		if (a.children[i + 1].uuid === b.children[j].uuid) {
			for(var k = 0; k < missing.length; k++) {
				if (missing[k] === b.children[j].uuid) {
					diffs.push("Moved (" + b.children[j].uuid + ")")
				}

				if (k === missing.length) {
					diffs.push("Removed (" + b.children[j].uuid + ")")
				}
			} else {
				diffs.push("Added (" + b.children[j].uuid + ")")
			}

			i++
		}
	}

	return diffs
}