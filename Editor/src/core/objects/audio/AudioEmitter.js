"use strict";

function AudioEmitter(audio)
{
	THREE.Audio.call(this, AudioEmitter.listener);

	// Name and type
	this.name = "audio";
	this.type = "Audio";

	// Audio data
	this.encoding = ""
	this.data = null

	// Load audio file
	if (audio !== undefined) {
		this.encoding = audio.split(".").pop()
		this.data = App.readFileArrayBuffer(audio)
	}

	// Playback control
	this.autoplay = true;
	this.playbackRate = 1;
	this.startTime = 0;
	this.source.loop = true;
}

// Default audio listener
AudioEmitter.listener = new THREE.AudioListener();

// Super prototypes
AudioEmitter.prototype = Object.create(THREE.Audio.prototype);

// Initialise audio object
AudioEmitter.prototype.initialize = function()
{
	var self = this;

	// Decode audio data
	THREE.AudioContext.decodeAudioData(this.data, (buffer) => {
		self.setBuffer(buffer)
	})

	// Initialise children
	for(var i = 0; i < this.children.length; i++)
	{
		this.children[i].initialize();
	}
}

// Dispose audio object
AudioEmitter.prototype.dispose = function()
{
	if(this.isPlaying)
	{
		this.stop();
		this.disconnect();
	}

	// Dispose children
	for(var i = 0; i < this.children.length; i++)
	{
		this.children[i].dispose();
	}
}

// Create JSON description
AudioEmitter.prototype.toJSON = function(meta)
{
	var data = THREE.Object3D.prototype.toJSON.call(this, meta);

	data.object.encoding = this.encoding
	data.object.data = base64ArrayBuffer(this.data)

	data.object.autoplay = this.autoplay;
	data.object.startTime = this.startTime;
	data.object.playbackRate = this.playbackRate;

	data.object.source = {};
	data.object.source.loop = this.source.loop;

	return data;
}