const initCommands = require("./commands.js");
const initInputHook = require("./inputHook.js");
const initService = require("./service.js");

function activate(context) {
    initCommands(context);
    initInputHook();
    initService();
}

function deactivate() {}

module.exports = {
	activate,
	deactivate
}
