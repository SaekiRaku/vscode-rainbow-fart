const path = require("path");
const vscode = require("vscode");
const express = require("express")
const bodyParser = require("body-parser");
const multer = require('multer')
const findAvailablePort = require("./findAvailablePort.js");
const open = require("open");
const _ = require("lodash");
const message = require("./message");

const assets = require("./assets.js");
const share = require("./share.js");
const settings = require("./settings.js");

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

function requireCustomPort() {
    let checkTimeoutID, currentInput;

    let inputbox = vscode.window.createInputBox();
    inputbox.ignoreFocusOut = true;
    inputbox.title = message("service.require-port.title");
    inputbox.placeholder = message("service.require-port.placeholder");
    inputbox.show()

    inputbox.onDidChangeValue((value) => {
        currentInput = value;
        if (checkTimeoutID) {
            clearTimeout(checkTimeoutID);
        }
        checkTimeoutID = setTimeout(async () => {
            let isAvailable = await findAvailablePort(value, 1);
            if (isAvailable !== undefined) {
                inputbox.validationMessage = message("service.require-port.available");
            } else {
                inputbox.validationMessage = message("service.require-port.unavailable");
            }
        }, 500);
    })

    return new Promise((resolve, reject) => {
        inputbox.onDidAccept(async (value) => {
            resolve(currentInput);
            inputbox.hide();
            inputbox.dispose();
        });
    })

}

module.exports = async function() {

    var port = await findAvailablePort(7777, 3)

    if (!port) {
        port = await requireCustomPort();
        let isAvailable = await findAvailablePort(port, 1);
        if (!isAvailable) {
            vscode.window.showInformationMessage(message("service.failed"));
            return;
        }
    }

    const app = express();

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.text());
    app.use(bodyParser.raw());
    app.use(express.static(path.resolve(__dirname, "page/dist")));

    app.use("/voices", express.static(share.PATH_VOICE_PACKAGES));
    app.get("/playsound", (req, res) => {
        share.playVoiceRes = res;
    });

    app.get("/voice-packages", async (req, res) => {
        const { reload } = req.query;
        if (reload) {
            await assets.load();
        }
        res.json(share.maindata);
    })

    app.get("/open-voice-packages-directory", async (req, res) => {
        open(share.PATH_VOICE_PACKAGES);
        res.send();
    })

    var upload = multer({ dest: share.PATH_TEMP });
    app.post("/import-voice-package", upload.single("file"), async (req, res, next) => {
        try {
            await assets.add(req.file.path)
        } catch (e) {
            console.error(e);
            res.json({
                err: true,
                errmsg: e.toString()
            });
            return;
        }

        res.send({ err: false });
        next();
    })

    app.post("/remove-voice-package", async (req, res) => {
        const {
            name
        } = req.body;

        try {
            await assets.remove(name);
        } catch (e) {
            res.json({
                err: true,
                errmsg: e.toString()
            });
            return;
        }

        res.json({ err: false });
    });

    // TODO: All router above that related to voice-package should change to `/voice-packages/...`
    app.post("/voice-packages/change-enabled-state", (req, res) => {
        const {
            name,
            enable
        } = req.body

        if (enable) {
            settings.voices.enable(name);
        } else {
            settings.voices.disable(name);
        }

        assets.applySettings();

        res.json({ err: false });
    })

    share.app = app;

    share.showTip = function() {
        vscode.window.showInformationMessage(`🌈 Rainbow Fart is running on http://127.0.0.1:${port}/`, "open").then(result => {
            if (result === "open") {
                open(`http://127.0.0.1:${port}/`);
            }
        })
    }

    // Limit the web server can only be access by current machine to avoid CSRF.
    // Thanks to Kirill from Snyk Secrity for discovered the issue and help me out on fixing.
    app.listen(port, "127.0.0.1", function() {
        share.showTip();
    })

}