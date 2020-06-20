const vscode = require("vscode");

const share = require("./share.js");

var inputHistory = "";

function keywordsCheck() {
    var candidate = [];

    share.maindata.forEach(voicePackage => {
        if (!voicePackage.enabled) {
            return;
        }
        voicePackage.contributes.forEach(contribute => {
            if (!Array.isArray(contribute.keywords)) {
                contribute.keywords = [contribute.keywords];
            }
            contribute.keywords.forEach(keyword => {
                if (inputHistory.indexOf(keyword) != -1) {
                    if (!Array.isArray(contribute.voices)) {
                        contribute.voices = [contribute.voices];
                    }
                    candidate.push(voicePackage.name + "/" + contribute.voices[Math.floor(contribute.voices.length * Math.random())])
                }
            })
        });
    });

    if (candidate.length) {
        inputHistory = "";
        share.play(candidate[Math.floor(Math.random() * candidate.length)]);
    }
}

module.exports = function () {
    vscode.workspace.onDidChangeTextDocument(evt => {
        evt.contentChanges.forEach(change => {
            if (change.text.length > 30) {
                // Some user may enabled the `format on save`, that will also cause `onDidChangeTextDocument` event.
                // So, If contents are too large, it's may not a keyword.
                return;
            }
            inputHistory += change.text;
            if (inputHistory.replace(/\s/g, "").length > 100) {
                inputHistory = inputHistory.slice(inputHistory.length - 100 - 1);
            }
            try {
                keywordsCheck();
            } catch (e) {
                console.error(e);
            }
        })
    })
}