const vscode = require("vscode");
const fs = vscode.workspace.fs;
const share = require("./share.js");

var settings = {
    enabledVoicePackages: []
}

var voices = {
    isEnabled(item) {
        return (settings.enabledVoicePackages.indexOf(item) != -1);
    },
    enable(item) {
        item && !this.isEnabled(item) && settings.enabledVoicePackages.push(item);
        save();
    },
    disable(item) {
        if (item) {
            let index = settings.enabledVoicePackages.indexOf(item);
            if (index != -1) {
                settings.enabledVoicePackages.splice(index, 1);
                save();
            }
        }
    }
}

function save() {
    var uri = share.uri(share.PATH_SETTINGS);
    var data = Buffer.from(JSON.stringify(settings));
    console.log(vscode.workspace);
    fs.writeFile(uri, data);
}

async function load() {
    try {
        var uri = share.uri(share.PATH_SETTINGS);
        settings = JSON.parse((await fs.readFile(uri)).toString());
    } catch (e) {
        // TODO: Ignore this error only if settings.json is not exists.
        let locale = JSON.parse(process.env.VSCODE_NLS_CONFIG).locale;
        if (locale.indexOf("zh") == 0) {
            settings.enabledVoicePackages = ["built-in-voice-chinese"];
        } else {
            settings.enabledVoicePackages = ["built-in-voice-english"];
        }
        save();
    }
}

module.exports = {
    raw: settings,
    voices,
    save,
    load
}