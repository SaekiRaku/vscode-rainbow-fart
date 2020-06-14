import fs from "fs";
import path from "path";
import jsonFormat from "json-format";

const VERSION = fs.readFileSync(path.resolve(__dirname, "../VERSION")).toString().trim();
const PATH_PACKAGEJSON = path.resolve(__dirname, "../package.json");

let json = JSON.parse(fs.readFileSync(PATH_PACKAGEJSON).toString());
json.version = VERSION;
fs.writeFileSync(PATH_PACKAGEJSON, jsonFormat(json, {
    type: 'space',
    size: 2
}));

const PATH_GLOBALJS = path.resolve(__dirname, "../docs/global.js");
let globaljs = fs.readFileSync(PATH_GLOBALJS).toString();
let winversion = globaljs.match(/window\.VERSION\ ?=\ ?\".*\";/g);
if (winversion != null) {
    winversion = winversion[0];
}
let version = winversion.match(/\".*\"/g)[0].replace(/\"/g, "");
globaljs = globaljs.replace(winversion, winversion.replace(version, VERSION));
fs.writeFileSync(PATH_GLOBALJS, globaljs);
