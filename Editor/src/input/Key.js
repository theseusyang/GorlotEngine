"use strict"

// Key class
class Key {
	constructor() {
		this.isPressed = false
		this.justPressed = false
		this.justReleased = false
	}

	update(action) {
		this.justPressed = false;
		this.justReleased = false;

		if(action === Key.KEY_DOWN) //Key Down
		{
			if(!this.isPressed === false)
			{
				this.justPressed = true;
			}
			this.isPressed = true;
		}
		//Key Up
		else if(action === Key.KEY_UP) {
			if(this.isPressed === true)
			{
				this.justReleased = true;
			}
			this.isPressed = false;
		}
	}

	/*isPressed() {
		return this.isPressed
	}

	justPressed() {
		return this.justPressed
	}

	justReleased() {
		return this.justReleased
	}*/

	set(just_pressed, is_pressed, just_released) {
		this.justPressed = just_pressed;
		this.isPressed = is_pressed;
		this.justReleased = just_released;
	}

	reset() {
		this.justPressed = false
		this.isPressed = false
		this.justReleased = false
	}

	toString() {
		return "Pressed:" + this.isPressed + " JustPressed:" + this.justPressed + " JustReleased:" + this.justReleased;
	}
}

Key.KEY_DOWN = 0
Key.KEY_UP = 1
