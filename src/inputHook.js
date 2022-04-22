const vscode = require("vscode");

const share = require("./share.js");

var inputHistory = "";
var playHistory = [];
// 存放音频触发的历史记录，以便于判断是否因为tab补全而二次触发或被立刻打断，这些音频会取消或延时播放。
// Save the history of triggered voices, so that some
// voices that are triggered right after others can be cancelled or delayed.
// The situation may happen especially when you use "tab" to auto-complete. 
// example:  playHistory = [ 
//            [ ['if'], 1650457549077 ] ,
//            [ ['=>'], 1650457589074 ] 
//        ]

function keywordsCheck() {
    var candidate = [];

    share.maindata.forEach(voicePackage => {
        if (!voicePackage.enabled) {
            return;
        }
        var playHistoryIsAdded = false;
        voicePackage.contributes.forEach(contribute => {
            var triggered = false;
            var keywords = [].concat(contribute.keywords || []);
            keywords.forEach(keyword => {
                if (inputHistory.indexOf(keyword) != -1) {
                    triggered = true;
                }
            })
            var regexps = [].concat(contribute.regexps || []);
            regexps.forEach(regexp => {
                if (RegExp(regexp).test(inputHistory)) {
                    triggered = true;
                }
            })
            if (triggered) {
                var voices = [].concat(contribute.voices);
                candidate.push(voicePackage.name + "/" + voices[Math.floor(voices.length * Math.random())])
                if (!playHistoryIsAdded) {
                    // playHistory will add a new element first, then it will be deleted if duplicate is found.
                    playHistory.push([contribute.keywords, Date.now()]);
                    // One keyword may exits in many contributes.keywords. Only add once.
                    playHistoryIsAdded = true;
                }
            }
        });
    });

    if (candidate.length) {
        inputHistory = "";
        if(duplicateCheck()){
            share.play(candidate[Math.floor(Math.random() * candidate.length)]);
        }
        
    }
}


function duplicateCheck(){
    if (playHistory.length > 10) {
        playHistory.shift();
    }

    if (playHistory.length == 1) {
        return true;
    }
    else if (playHistory[playHistory.length - 1][1] - playHistory[playHistory.length - 2][1] <= 1000) {
        console.log("Two voices triggered in %i milliseconds, so the latter one is cancelled.",
            playHistory[playHistory.length - 1][1] - playHistory[playHistory.length - 2][1]);
        playHistory.pop();
        return false;
    }
    else if (playHistory[playHistory.length - 2][0] == playHistory[playHistory.length - 1][0] 
            && playHistory[playHistory.length - 1][1] - playHistory[playHistory.length - 2][1] <= 2000) {
        console.log("SAME voices triggered in %i milliseconds, so the latter one is cancelled.",
            playHistory[playHistory.length - 1][1] - playHistory[playHistory.length - 2][1]);
        playHistory.pop();
        return false;
    }
    else {
        return true;
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