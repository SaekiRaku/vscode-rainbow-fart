
const path = require("path");
const vscode = require("vscode");
const express = require("express")
const bodyParser = require("body-parser");
const multer  = require('multer')
const getPort = require("get-port");
const open = require("open");
const _ = require("lodash");

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

module.exports = async function () {

    let port = await getPort({ port: 7777 });

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