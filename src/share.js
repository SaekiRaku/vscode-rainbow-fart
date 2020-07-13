/**
 * This module share data and objects between modules.
 */
const vscode = require('vscode');
const os = require("os");

module.exports = {
    play(name) {
        if (!name || !this.playVoiceRes) {
            return;
        }
        console.log("Playing voice - " + name);
        this.playVoiceRes && this.playVoiceRes.send(name);
        this.playVoiceRes = null;
    },
    uri(thepath) {
        if (os.type() == "Windows_NT") {
            thepath = "file:///"+thepath.replace(/\\/g,"/");
        } else {
            // The earlier version of VSCode can not deal with the path without a scheme name
            thepath = "file://" + thepath;
        }
        console.log(vscode.Uri.parse(thepath));
        return vscode.Uri.parse(thepath);
    },
    uriToPath(uri) {
        if (os.type() == "Windows_NT") {
            return uri.path.replace("/", "").replace(/\//g, "\\");
        }
        return uri.path;
    }
};