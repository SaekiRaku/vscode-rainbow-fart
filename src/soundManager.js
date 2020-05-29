const share = require("./share.js");

exports.play = function (name) {
    console.log("Play sound - " + name);
    share.playsoundRes.send(name);
}