
const os = require("os");
const vscode = require("vscode");
const express = require("express")
const getPort = require("get-port");
const share = require("./share.js");
const open = require("open");

const interfaces = os.networkInterfaces();
const getNetworkAddress = () => {
	for (const name of Object.keys(interfaces)) {
		for (const item of interfaces[name]) {
			const {address, family, internal} = item;
			if (family === 'IPv4' && !internal) {
				return address;
			}
		}
	}
};

module.exports = async function () {

    let port = await getPort({ port: 7777 });

    const app = express();

    app.use(express.static(__dirname + "/page"));
    app.use("/sounds", express.static(__dirname + "/sounds"));
    app.get("/playsound", (req, res) => {
        share.playsoundRes = res;
    });

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