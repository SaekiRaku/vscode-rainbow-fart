const vscode = require("vscode");
const fs = vscode.workspace.fs;
const path = require("path");
const glob = require("glob").sync;
const jszip = require("jszip")

const share = require("./share.js");
const settings = require("./settings.js");
const { file } = require("jszip");

var builtInVoicePackages = [];
const requiredProperties = ["name", "version", "contributes"];

async function init() {
    console.log(share.PATH_GLOBAL);

    await fs.createDirectory(share.uri(share.PATH_VOICE_PACKAGES));

    const sourceFiles = glob("*", {
        cwd: __dirname + "/built-in-voice-packages"
    });
    const targetFiles = glob("*", {
        cwd: share.PATH_VOICE_PACKAGES
    });


    for (let i in sourceFiles) {
        var sourceName = sourceFiles[i];
        builtInVoicePackages.push(sourceName);
        let sourceFolderUri = share.uri(path.resolve(__dirname, "built-in-voice-packages", sourceName));
        let targetFolderUri = share.uri(path.resolve(share.PATH_VOICE_PACKAGES, sourceName));

        if (targetFiles.indexOf(sourceName) == -1) {
            await fs.copy(sourceFolderUri, targetFolderUri);
        } else {
            var sourceManifest, targetManifest;
            let sourceManifestUri = share.uri(path.resolve(share.uriToPath(sourceFolderUri), "manifest.json"));
            let targetManifestUri = share.uri(path.resolve(share.uriToPath(targetFolderUri), "manifest.json"));

            try {
                sourceManifest = JSON.parse((await fs.readFile(sourceManifestUri)).toString());
                targetManifest = JSON.parse((await fs.readFile(targetManifestUri)).toString());
            } catch (e) {
                console.error(e);
            }
            if (sourceManifest.version != targetManifest.version) {
                await fs.copy(sourceFolderUri, targetFolderUri, { overwrite: true });
            }
        }
    }

    load();
}

async function load() {
    const voicePackages = glob("*", {
        cwd: share.PATH_VOICE_PACKAGES,
        absolute: true
    });

    var maindata = [];

    for (let voicePackagePath of voicePackages) {
        var files = glob("*.json", { cwd: voicePackagePath, absolute: true });
        var config = {};
        for (let filepath of files) {
            try {
                let filecontent = await fs.readFile(share.uri(filepath));
                config = Object.assign(config, JSON.parse(filecontent.toString()));
            } catch (e) {
                console.error(e);
            }
        }
        config.enabled = settings.voices.isEnabled(config.name);
        maindata.push(config);
    }

    share.maindata = maindata;
}

async function add(filepath) {
    var file = await fs.readFile(share.uri(filepath));
    var zip = await jszip.loadAsync(file);

    var manifest
    try {
        manifest = JSON.parse((await zip.file("manifest.json").async("string")).toString())
    } catch (e) {
        throw "Voice Package should have a 'manifest.json' file"
    }

    requiredProperties.forEach(property => {
        if (manifest[property] === undefined) {
            throw `Voice Package should have '${property}' property in the manifest.json`;
        }
    });

    let basepath = path.resolve(share.PATH_VOICE_PACKAGES, manifest.name);
    try {
        await fs.delete(share.uri(basepath), { recursive: true })
    } catch (e) {}

    fs.createDirectory(share.uri(basepath));
    for (let filename in zip.files) {
        if (zip.files[filename].dir) {
            continue;
        }
        // Filter the files that not extract to the base path to avoid Zip Slip loophole.
        // Thanks to Kirill from Snyk Secrity for discovered the issue and help me out on fixing.
        if (filename.indexOf("../") !== -1 || path.resolve(basepath, filename).indexOf(basepath) === -1) {
            continue;
        }
        await fs.writeFile(share.uri(path.resolve(basepath, filename)), await zip.file(filename).async("nodebuffer"));
    }
}

async function remove(name) {
    if (builtInVoicePackages.indexOf(name) != -1) {
        throw "Can not remove built-in voice packages";
    }
    await fs.delete(share.uri(path.resolve(share.PATH_VOICE_PACKAGES, name)), { recursive: true });
}

function applySettings() {
    share.maindata = share.maindata.map((item) => {
        item.enabled = settings.voices.isEnabled(item.name);
        return item;
    })
}

module.exports = {
    init,
    load,
    add,
    remove,
    applySettings
}