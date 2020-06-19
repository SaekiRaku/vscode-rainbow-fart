const vscode = require("vscode");
const fs = vscode.workspace.fs;
const share = require("./share.js");

var settings = {
    disableList: []
}

var voices = {
    isDisable(item) {
        return (settings.disableList.indexOf(item) != -1);
    },
    addDisable(item) {
        item && !this.isDisable(item) && settings.disableList.push(item);
        save();
    },
    removeDisable(item) {
        if (item) {
            let index = settings.disableList.indexOf(item);
            if (index != -1) {
                settings.disableList.splice(index, 1);
                save();
            }
        }
    }
}

function save() {
    var uri = share.uri(share.PATH_SETTINGS);
    var data = Buffer.from(JSON.stringify(settings));
    fs.writeFile(uri, data);
}

async function load() {
    try {
        var uri = share.uri(share.PATH_SETTINGS);
        settings = JSON.parse((await fs.readFile(uri)).toString());
    } catch (e) {
        // TODO: Ignore this error only if settings.json is not exists.
        // console.error(e)
    }
}

module.exports = {
    raw: settings,
    voices,
    save,
    load
}