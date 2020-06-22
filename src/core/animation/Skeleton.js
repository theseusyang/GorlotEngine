/*function Skeleton()
{
	this.root = new Joint("");
}

//Create joint structure from name array
Skeleton.prototype.createJoints = function(names)
{
	for(var i = 0; i < names.length; i++)
	{
		var parent = this.root.getChildren(names[i][0]);

		//If parent dosent exist create root
		if(parent == null)
		{
			this.root = new Joint(names[i][0]);
			this.root.add(new Joint(names[i][1]));
		}

		//If parent exists add joint to parent
		else
		{
			parent.add(new Joint(names[i][1]));
		}
	}
}
//Update Points and recaulate bone meshes
Skeleton.prototype.updateJoints = function(joints)
{
	for(var i = 0; i < joints.length; i++)
	{
		var joint = this.root.getChildren(joints[i].name);
		if(joint != null)
		{
			joint.position.set(joints[i].x, joints[i].y, joints[i].z);
		}
	}
}
*/
class Skeleton {
	constructor() {
		this.root = new Join("")
	}

	createJoints(names) {
		for(var i = 0; i < names.length; i++)
		{
			var parent = this.root.getChildren(names[i][0]);
	
			//If parent dosent exist create root
			if(parent == null)
			{
				this.root = new Joint(names[i][0]);
				this.root.add(new Joint(names[i][1]));
			}
	
			//If parent exists add joint to parent
			else
			{
				parent.add(new Joint(names[i][1]));
			}
		}
	}

	updateJoints(joints) {
		for(var i = 0; i < joints.length; i++)
		{
			var joint = this.root.getChildren(joints[i].name);
			if(joint != null)
			{
				joint.position.set(joints[i].x, joints[i].y, joints[i].z);
			}
		}
	}
}