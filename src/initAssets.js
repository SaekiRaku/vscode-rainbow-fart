const vscode = require("vscode");
const fs = vscode.workspace.fs;
const path = require("path");
const glob = require("glob").sync;

const share = require("./share.js");

module.exports = async function (ctx) {
    console.log(share.PATH_GLOBAL);

    await fs.createDirectory(vscode.Uri.parse(share.PATH_VOICE_PACKAGES));
    
    const sourceFiles = glob("*", {
        cwd: __dirname + "/built-in-voice-packages"
    });
    const targetFiles = glob("*", {
        cwd: share.PATH_VOICE_PACKAGES
    });


    for (let i in sourceFiles) {
        var sourceName = sourceFiles[i];
        let sourceFolderUri = vscode.Uri.parse(path.resolve(__dirname, "built-in-voice-packages", sourceName));
        let targetFolderUri = vscode.Uri.parse(path.resolve(share.PATH_VOICE_PACKAGES, sourceName));

        if (targetFiles.indexOf(sourceName) == -1) {
            await fs.copy(sourceFolderUri, targetFolderUri);
        } else {
            var sourceManifest, targetManifest;
            let sourceManifestUri = vscode.Uri.parse(path.resolve(sourceFolderUri.path, "manifest.json"));
            let targetManifestUri = vscode.Uri.parse(path.resolve(targetFolderUri.path, "manifest.json"));

            try {
                sourceManifest = JSON.parse((await fs.readFile(sourceManifestUri)).toString());
                targetManifest = JSON.parse((await fs.readFile(targetManifestUri)).toString());
            } catch (e) { }
            if (sourceManifest.version != targetManifest.version) {
                await fs.copy(sourceFolderUri, targetFolderUri, { overwrite: true });
            }
        }
    }

    const voicePackages = glob("*", {
        cwd: share.PATH_VOICE_PACKAGES,
        absolute: true
    });

    var maindata = []

    voicePackages.forEach(async (voicePackagePath) => {
        var files = glob("*.json", { cwd: voicePackagePath, absolute: true });
        var config = {};
        files.forEach(async (filepath) => {
            try {
                let filecontent = await fs.readFile(vscode.Uri.parse(filepath));
                config = Object.assign(config, JSON.parse(filecontent.toString()));
            } catch (e) {
                console.error(e);
            }
        })

        maindata.push(config);
    });

    share.maindata = maindata;

}