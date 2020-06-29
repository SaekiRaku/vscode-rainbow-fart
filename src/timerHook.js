const share = require("./share.js");

var startTime = Date.now();
var lastHour = (() => {
    let date = new Date();
    return date.getHours();
})();

var schedule = {
    "$time_morning": "0930",
    "$time_before_noon": "1130",
    "$time_noon": "1200",
    "$time_after_noon": "1400",
    "$time_evening": "2100",
    "$time_midnight": "2330"
}

var scheduleFlag = {
    "$time_morning": false,
    "$time_before_noon": false,
    "$time_noon": false,
    "$time_after_noon": false,
    "$time_evening": false,
    "$time_midnight": false
};

(() => {
    for (let timeName in schedule) {
        let timeString = schedule[timeName];
        if (checkTimeString(timeString)) {
            scheduleFlag[timeName] = true;
            // 跳过今天已经过的时间
        }
    }
})();

function checkTimeString(timeString) {
    let current = new Date();
    let hour = Number(timeString.slice(0, 2));
    let minutes = Number(timeString.slice(2, 4));
    if (current.getHours() >= hour && current.getMinutes() >= minutes) {
        return true;
    } else {
        return false;
    }
}

function playSpecialKeyword(keyword) {
    var candidate = [];

    share.maindata.forEach(voicePackage => {
        if (!voicePackage.enabled) {
            return;
        }
        voicePackage.contributes.forEach(contribute => {
            if (!Array.isArray(contribute.keywords)) {
                contribute.keywords = [contribute.keywords];
            }
            if (contribute.keywords.indexOf(keyword) != -1) {
                if (!Array.isArray(contribute.voices)) {
                    contribute.voices = [contribute.voices];
                }
                candidate.push(voicePackage.name + "/" + contribute.voices[Math.floor(contribute.voices.length * Math.random())])
            }
        });
    });

    if (candidate.length) {
        inputHistory = "";
        share.play(candidate[Math.floor(Math.random() * candidate.length)]);
    }
}

module.exports = function() {
    setInterval(() => {
        let current = new Date();
        if (Date.now() - startTime > 1000 * 60 * 60 * 24) {
            startTime = Date.now();
            scheduleFlag = {
                "$time_morning": false,
                "$time_before_noon": false,
                "$time_noon": false,
                "$time_after_noon": false,
                "$time_evening": false,
                "$time_midnight": false
            }
        }
        if (lastHour != current.getHours()) {
            lastHour = current.getHours();
            playSpecialKeyword("$time_each_hour");
        }
        for (let timeName in schedule) {
            let timeString = schedule[timeName];
            if (checkTimeString(timeString) && !scheduleFlag[timeName]) {
                playSpecialKeyword(timeName);
                scheduleFlag[timeName] = true;
            }
        }

    }, 10000);
}