const path = require("path");
const share = require("./share.js");
const initAssets = require("./initAssets.js");
const initCommands = require("./commands.js");
const initInputHook = require("./inputHook.js");
const initService = require("./service.js");

function activate(context) {
    share.PATH_GLOBAL = context.globalStoragePath;
    share.PATH_VOICE_PACKAGES = path.resolve(share.PATH_GLOBAL, "voice-packages");

    initAssets(context);
    initCommands(context);
    initInputHook();
    initService();

    share.play();
}

function deactivate() {}

module.exports = {
	activate,
	deactivate
}
