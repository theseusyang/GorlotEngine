class Key {
	constructor() {
		this.isPressed = false
		this.justPressed = false
		this.justReleased = false
	}

	update(action) {
		this.justPressed = false;
		this.justReleased = false;

		if(action === 0) //Key Down
		{
			if(!this.isPressed)
			{
				this.justPressed = true;
			}
			this.isPressed = true;
		}
		else //Key Up
		{
			if(this.isPressed)
			{
				this.justReleased = true;
			}
			this.isPressed = false;
		}
	}

	isPressed() {
		return this.isPressed
	}

	justPressed() {
		return this.justPressed
	}

	justReleased() {
		return this.justReleased
	}

	set(just_pressed, is_pressed, just_released) {
		this.justPressed = just_pressed;
		this.isPressed = is_pressed;
		this.justReleased = just_released;
	}

	toString() {
		return "Pressed:" + this.isPressed + " JustPressed:" + this.justPressed + " JustReleased:" + this.justReleased;
	}
}

Key.KEY_DOWN = 0
Key.KEY_UP = 1
