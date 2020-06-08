/**
 * This module share data and objects between modules.
 */

module.exports = {
    play(name) {
        console.log("Playing voice - " + name);
        this.playVoiceRes && this.playVoiceRes.send(name);
    }
};