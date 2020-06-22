// A function created by me, to make the console in the Editor to function properly
var logOfConsole = []

var _log = console.log,
	_warn = console.warn,
	_error = console.error

console.log = function() {
	logOfConsole.push({method: 'log', arguments: arguments})
	// TODO: Do dis in a non-so shitty way
	var str = ""
	for(var i = 0; i < arguments.length; i++) {
		str += arguments[i] + " "
	}
	EditorUI.console.addMessage("Log: " + str.toString(), "con-log")
	return _log.apply(console, arguments)
}

console.warn = function() {
	logOfConsole.push({method: 'warn', arguments: arguments})
	// TODO: Do dis in a non-so shitty way
	var str = ""
	for(var i = 0; i < arguments.length; i++) {
		str += arguments[i] + " "
	}
	EditorUI.console.addMessage("Warning: " + str, "con-warn")
	return _warn.apply(console, arguments)
}

console.error = function() {
	logOfConsole.push({method: 'error', arguments: arguments})
	// TODO: Do dis in a non-so shitty way
	var str = ""
	for(var i = 0; i < arguments.length; i++) {
		str += arguments[i] + " "
	}
	EditorUI.console.addMessage("Error: " + str, "con-error")
	return _error.apply(console, arguments)
}