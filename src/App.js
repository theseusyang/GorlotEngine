//App class
function App(){}

//App initialization (entry point)
App.initialize = function(main)
{
	// Node modules
	try {
		App.fs = require("fs")
	} catch(e) {}

	//Stas tool
	App.stats = new Stats();
	App.stats.setMode(0);
	App.stats.domElement.style.position = "absolute";
	App.stats.domElement.style.left = "0px";
	App.stats.domElement.style.top = "0px";
	App.stats.domElement.style.zIndex = "10000"
	document.body.appendChild(App.stats.domElement);

	//Init Input
	Keyboard.initialize();
	Mouse.initialize();

	//Create main program
	App.main = main;
	App.main.initialize(App.canvas);

	//Time control
	App.delta_time = 0;
	App.time = Date.now();

	//Start Loop
	App.loop();
}

// Read File
App.readFile = function(fname) {
	if (App.fs !== undefined) {
		return App.fs.readFileSync(fname, "utf8")
	} else {
		var file = new XMLHttpRequest()
		var ready = false
		var data = null

		// Request file to server
		file.open("GET", fname, false)

		// Get file
		file.onreadystatechange = function() {
			if (file.readyState === 4) {
				if (file.status === 200 || file.status === 0) {
					data = file.responseText
				}
				ready = true
			}
		}

		// Send null to ensure that file was received
		file.send(null)

		return data
	}
}

// Write File
App.writeFile = function(fname, data) {
	if (App.fs !== undefined) {
		App.fs.writeFileSync(fname, data)
	}
}

//Load Main program
App.loadMain = function(main)
{
	App.main = main;
	App.main.initialize();
}

// Show stats
App.showStats = function(value)
{
	if(value === true)
	{
		App.stats.domElement.style.visibility = "visible";
	}
	else
	{
		App.stats.domElement.style.visibility = "hidden";
	}
}

//Set if mouse locked
App.setMouseLock = function(value)
{
	if(value === true)
	{
		document.body.onclick = function()
		{
			try
			{
				document.body.requestPointerLock = canvas.mozRequestPointerLock || canvas.requestPointerLock || canvas.webkitRequestPointerLock;
				document.body.requestPointerLock();
			}
			catch(e){}
		}
	}
	else
	{
		document.body.onclick = function(){}
	}
}

//App loop
App.loop = function()
{
	//Prepare next frame render
	requestAnimationFrame(App.loop);

	App.stats.begin();

	//Update Mouse Values
	Mouse.update();

	//Update time values
	App.delta_time = Date.now() - App.time;
	App.time += App.delta_time;

	//Update and draw
	App.main.update();
	App.main.draw();

	App.stats.end();
}

//Called every time page is resized
App.resize = function()
{
	App.main.resize();
}
