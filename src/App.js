//App class
function App(){}

//App initialization (entry point)
App.initialize = function(main)
{
	// Node modules
	try {
		App.fs = require("fs")
		App.gui = nw
		App.clipboard = App.gui.Clipboard.get()
	} catch(e) {console.error("Error: " + e)}

	//Stas tool
	App.stats = new Stats();
	App.stats.setMode(0);
	App.stats.domElement.style.position = "absolute";
	App.stats.domElement.style.left = "0px";
	App.stats.domElement.style.top = "0px";
	App.stats.domElement.style.zIndex = "10000"
	App.stats.domElement.style.opacity = "0.7"
	App.stats.domElement.style.pointerEvents = "none"
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

// File chooser callback receives event object
App.chooseFile = function(callback, filter, savemode) {
	// Create file chooser element
	var chooser = document.createElement("input")
	chooser.type = "file"
	chooser.style.display = "none"
	if (filter !== undefined) {
		chooser.accept = filter
	}
	if (savemode === true) {
		chooser.nwsaveas = "file"
	}
	document.body.appendChild(chooser)

	// Create onchange event and trigger it
	chooser.onchange = function(e) {
		if (callback !== undefined) {
			console.log(e.srcElement)
			callback(e)
		}
	}
	chooser.click()
}

// Read File
App.readFile = function(fname, sync, callback) {
	
	// Check if sync defined
	if (sync === undefined) {
		sync = true
	}

	// Check if node available
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
App.writeFile = function(fname, data, sync, callback) {
	if (App.fs !== undefined) {
		App.fs.writeFile(fname, data, (err) => {
			if (err) {throw err}
		})
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

	//Update Input Values
	Mouse.update();
	Keyboard.update()

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
