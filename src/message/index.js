const messages = require("./messages.json");

let locale;
const currentLanguage = JSON.parse(process.env.VSCODE_NLS_CONFIG).locale;
const supportLanguage = ["en", "zh"]
if (supportLanguage.indexOf(currentLanguage) != -1) {
    locale = currentLanguage
} else {
    for (let lang of supportLanguage) {
        if (currentLanguage.indexOf(lang) == 0) {
            locale = lang;
            break;
        }
    }
}

module.exports = function (str) {
    let result = messages[locale] || messages["en"];
    let props = str.split(".");
    props.forEach(prop => { result = result[prop] });
    if (!result && locale != "en") {
        result = messages["en"];
        props.forEach(prop => { result = result[prop] });
    }
    return result;
}