/**
 * This module share data and objects between modules.
 */
const vscode = require('vscode');
const os = require("os");

module.exports = {
    play(name) {
        if (!name) {
            return;
        }
        console.log("Playing voice - " + name);
        this.playVoiceRes && this.playVoiceRes.send(name);
    },
    uri(thepath) {
        if (os.type() == "Windows_NT") {
            thepath = "file:///"+thepath.replace(/\\/g,"/");
        }
        return vscode.Uri.parse(thepath);
    },
    uriToPath(uri) {
        if (os.type() == "Windows_NT") {
            return uri.path.replace("/", "").replace(/\//g, "\\");
        }
        return uri.path;
    }
};