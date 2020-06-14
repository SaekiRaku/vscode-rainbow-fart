import fs from "fs";
import path from "path";
import { sync as glob } from "glob";

let files = glob("*.vsix", { cwd: path.resolve(__dirname, "../"), absolute: true });
files.forEach((filepath) => {
    let targetpath = path.resolve(__dirname, "../docs/releases", path.basename(filepath));
    fs.renameSync(filepath, targetpath);
})