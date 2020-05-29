const vscode = require('vscode');
const { registerCommand } = vscode.commands;
const share = require("./share.js");

module.exports = function (context) {
    context.subscriptions.push(registerCommand('rainbow-fart.enable', function () {
        share.showTip && share.showTip();
    }));
}
