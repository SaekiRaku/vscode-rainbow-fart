const vscode = require("vscode");
const fs = vscode.workspace.fs;
const share = require("./share.js");
const settings = require("./settings.js");
var ws = require("nodejs-websocket");
var isConnected = false;
var conn;
var playerQueqe = [];

function connectws() {
    if (settings.loadSetting().type === "server" && settings.loadSetting().server) {
        conn = ws.connect(settings.loadSetting().server, {}, () => {
            isConnected = true;
            playFromWS();
        });

        conn.on("error", function (str) {
            isConnected = false;
            console.error("connect ws error");
        });

        // 断掉
        conn.on("close", function () {
            isConnected = false;
            console.log("connection closed");
        });
    }
}

function playFromWS() {
    while (playerQueqe.length) {
        let name = playerQueqe.shift();
        if (name) {
            conn.sendText(JSON.stringify({
                "command": "play",
                "arg": share.PATH_VOICE_PACKAGES + "/" + name
            }));
        }
    }
}

module.exports = {
    play(name) {
        if (!name) {
            return;
        }
        console.log("Playing voice - " + name);
        if (settings.loadSetting().type === "web") {
            share.playVoiceRes && share.playVoiceRes.send(name);
        } else {
            playerQueqe.push(name);
            if (!isConnected) {
                connectws();
            } else {
                playFromWS();
            }
        }
    },
    resetPlayer(){
        if(isConnected  && conn){
            conn.close();
        }
        if (settings.loadSetting().type === "server") {
            connectws()
        }
    }
}