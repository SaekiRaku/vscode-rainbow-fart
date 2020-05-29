const vscode = require("vscode");
const soundMap = require("./soundMap.js");
const soundManager = require("./soundManager.js");

var inputHistory = "";

function haveKeyword(content, keyword) {
    return (content.indexOf(keyword) != -1)
}

function keywordsCheck(content) {
    if (content.length > 30) {
        // Some user may enabled the `format on save`, that will also cause `onDidChangeTextDocument` event.
        // If contents are too large, it's may not a kewyword.
        return;
    }
    inputHistory += content;
    if (inputHistory.length > 100) {
        inputHistory = inputHistory.slice(inputHistory.length - 100 - 1);
    }
    for (let i in soundMap) {
        let item = soundMap[i]
        let have = false;
        if (Array.isArray(item.keywords)) {
            item.keywords.forEach(keyword => {
                if (haveKeyword(inputHistory, keyword)) {
                    have = true;
                }
            });
        } else if(typeof item.keywords === "string"){
            have = haveKeyword(inputHistory, item.keywords)
        } else {
            return;
        }

        if (have) {
            inputHistory = "";
            soundManager.play(item.sounds[Math.floor(Math.random() * item.sounds.length)]);
            break;
        }
    }
}

module.exports = function () {
    vscode.workspace.onDidChangeTextDocument(evt => {
        evt.contentChanges.forEach(change => {
            keywordsCheck(change.text);
        })
    })
}