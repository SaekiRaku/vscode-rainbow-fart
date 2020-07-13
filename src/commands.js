const vscode = require('vscode');
const { registerCommand } = vscode.commands;
const share = require("./share.js");
const initService = require("./service.js");

module.exports = function (context) {
    context.subscriptions.push(registerCommand('rainbow-fart.enable', function () {
        if (share.showTip) {
            share.showTip();
        } else {
            initService();
        }
    }));
}
