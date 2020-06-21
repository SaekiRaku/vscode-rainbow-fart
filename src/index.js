const path = require("path");
const share = require("./share.js");
const assets = require("./assets.js");
const settings = require("./settings.js");
const initCommands = require("./commands.js");
const initTimerHook = require("./timerHook.js");
const initInputHook = require("./inputHook.js");
const initService = require("./service.js");

function activate(context) {
    share.PATH_GLOBAL = context.globalStoragePath;
    share.PATH_TEMP = path.resolve(share.PATH_GLOBAL, "temp");
    share.PATH_SETTINGS = path.resolve(share.PATH_GLOBAL, "settings.json");
    share.PATH_VOICE_PACKAGES = path.resolve(share.PATH_GLOBAL, "voice-packages");

    initCommands(context);
    
    process.nextTick(() => {
        settings.load();
        assets.init();
        initTimerHook(); 
        initInputHook();
        initService();
    })
}

function deactivate() {}

module.exports = {
	activate,
	deactivate
}
