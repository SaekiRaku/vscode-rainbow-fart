
const os = require("os");
const vscode = require("vscode");
const express = require("express")
const bodyParser = require("body-parser");
const getPort = require("get-port");
const share = require("./share.js");
const open = require("open");

// const interfaces = os.networkInterfaces();
// const getNetworkAddress = () => {
// 	for (const name of Object.keys(interfaces)) {
// 		for (const item of interfaces[name]) {
// 			const {address, family, internal} = item;
// 			if (family === 'IPv4' && !internal) {
// 				return address;
// 			}
// 		}
// 	}
// };

module.exports = async function () {

    let port = await getPort({ port: 7777 });

    const app = express();

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.text());
    app.use(bodyParser.raw());
    app.use(express.static(__dirname + "/page/dist"));
    
    app.use("/voices", express.static(share.PATH_VOICE_PACKAGES));
    app.get("/playsound", (req, res) => {
        share.playVoiceRes = res;
    });

    app.get("/voice-packages", (req, res) => {
        res.json(share.maindata);
    })

    share.app = app;
    share.showTip = function () {
        vscode.window.showInformationMessage(`🌈 Rainbow Fart is running on http://127.0.0.1:${port}/`, "open").then(result => {
            if (result === "open") {
                open(`http://127.0.0.1:${port}/`);
            }
        })
    }

    app.listen(port, function () {
        share.showTip();
    })

}