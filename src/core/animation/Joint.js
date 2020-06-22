/*function Joint(name)
{
	this.name = name;
	this.position = new THREE.Vector3(0,0,0);
	this.children = [];
}

//Add joint children
Joint.prototype.add = function(joint)
{
	this.children.push(joint);
}

//Get children from name
Joint.prototype.getChildren = function(name)
{
	if(this.name == name)
	{
		return this;
	}

	for(var i = 0; i < this.children.length; i++)
	{
		var child = this.children[i].getChildren(name);

		if(child != null)
		{
			return child;
		}
	}

	return null;
}
//Create string with skeleton info
Joint.prototype.printTree = function(level)
{
	if(level === undefined)
	{
		level = 0;
	}

	var string = "";
	for(var i = 0; i <= level; i++)
	{
		string = string + "---";
	}

	console.log(string + this.name);

	for(var j = 0; j < this.children.length; j++)
	{
		this.children[j].printTree(level + 1);
	}
}
*/
class Join {
	constructor(name) {
		this.name = name;
		this.position = new THREE.Vector3(0,0,0);
		this.children = [];
	}

	add(joint) {
		this.children.push(joint);
	}

	getChildren(name) {
		if(this.name == name)
		{
			return this;
		}
	
		for(var i = 0; i < this.children.length; i++)
		{
			var child = this.children[i].getChildren(name);
	
			if(child != null)
			{
				return child;
			}
		}
	
		return null;
	}

	printTree(level) {
		if(level === undefined)
		{
			level = 0;
		}
	
		var string = "";
		for(var i = 0; i <= level; i++)
		{
			string = string + "---";
		}
	
		console.log(string + this.name);
	
		for(var j = 0; j < this.children.length; j++)
		{
			this.children[j].printTree(level + 1);
		}
	}
}