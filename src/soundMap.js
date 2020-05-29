var map = [
    {
        keywords: [
            "function",
            "=>"
        ],
        sounds: ["function.mp3"]
    },
    {
        keywords: ["ajax"],
        sounds: ["ajax.mp3"]
    },
    {
        keywords: ["alert"],
        sounds: ["alert.mp3"]
    },
    {
        keywords: ["document"],
        sounds: ["document.mp3"]
    },
    {
        keywords: ["Vue"],
        sounds: ["vue.mp3"]
    },
]

if (typeof exports === 'object') {
    module.exports = map;
} else {
    window.SoundMap = map;
}