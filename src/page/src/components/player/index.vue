<template>
    <div>
        <audio ref="audio"></audio>
        <q-panel class="permission" secondary v-if="!authorized" @click="doAuthorize">
            <q-icon class="icon" name="warning-circle"></q-icon>
            <q-text mode="normal" v-html="$t('permission-required')"></q-text>
        </q-panel>
        <q-panel class="permission" style="pointer-events: none;" secondary v-else>
            <q-icon class="icon" name="smile"></q-icon>
            <q-text mode="normal">{{ $t("authorized") }}</q-text>
            <q-footnote mode="normal">{{ $t("authorized-tip") }}</q-footnote>
        </q-panel>
        <q-popover class="tip" :text="$t('permission-explain')" width="240px" position="bottom-left">
            <q-icon name="question-circle"></q-icon>
            <q-footnote>{{ $t("permission-why") }}</q-footnote>
        </q-popover>
    </div>
</template>

<style lang="less" scoped>
@import "~@qiqi1996/qi-design-vue/standard.less";

.permission {
    border-radius: 10px;
    cursor: pointer;
    overflow: hidden;
    text-align: left;
    padding: 3*@grid;
    .transition();

    .icon {
        float: left;
        margin-right: 2 * @grid;
        font-size: 48px;
    }
}

.permission:hover {
    transform: scale(1.05);
}

.tip {
    margin-top: @grid;
    * {
        display: inline-block;
        vertical-align: middle;
    }
}
</style>

<script>
import axios from "axios";
import piano from "/assets/piano.mp3";

import messages from "./player.i18n.json";

export default {
    i18n: {
        messages
    },
    data(){
        return {
            authorized: false,
        }
    },
    mounted(){
        this.requestPlaySound();
    },
    methods: {
        doAuthorize() {
            let audio = this.$refs["audio"];
            audio.src = piano;
            audio.currentTime = 0;
            audio.play();
            
            this.authorized = true;
        },
        play(name) {
            console.log("play - " + name);
            let audio = this.$refs["audio"];
            audio.src = "/voices/" + name;
            audio.currentTime = 0;
            audio.play();
        },
        async requestPlaySound() {
            var response;
            try {
                response = await axios.get("/playsound");
            }catch(e){
                this.requestPlaySound();
                return;
            }
            let voice = response.data;
            if(voice.lastIndexOf(".") < voice.length - 5){
                return;
            }
            this.play(voice);
            this.requestPlaySound();
        }
    }
}
</script>