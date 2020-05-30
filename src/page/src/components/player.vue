<template>
    <div>
        <audio ref="audio"></audio>
        <q-panel class="permission" border v-if="!authorized" @click="doAuthorize">
            <q-icon class="icon" name="warning-circle"></q-icon>
            <q-text mode="normal">
                请点击此处以授权音频播放<br />
                您将听到钢琴的音色以代表授权成功
            </q-text>
        </q-panel>
        <q-panel class="permission" style="pointer-events: none;" border v-else>
            <q-icon class="icon" name="smile"></q-icon>
            <q-text mode="normal">
                授权成功<br />
                祝您编码愉快
            </q-text>
        </q-panel>
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

    * {
        display: inline-block;
        vertical-align: middle;
    }

    .icon {
        margin-right: 2 * @grid;
        font-size: 48px;
    }
}

.permission:hover {
    transform: scale(1.05);
}
</style>

<script>
export default {
    data(){
        return {
            authorized: false
        }
    },
    mounted(){
        this.requestPlaySound();
    },
    methods: {
        doAuthorize() {
            this.play("duang.mp3");
            this.authorized = true;
        },
        play(name) {
            console.log("play - " + name);
            let audio = this.$refs["audio"];
            audio.src = "/sounds/" + name;
            audio.currentTime = 0;
            audio.play();
        },
        requestPlaySound() {
            var request = new XMLHttpRequest();
            request.open("GET", "/playsound", true);
            request.send();
            request.onreadystatechange = () => {
                if (request.readyState == 4) {
                    if (request.status == 200 || request.status == 0) {
                        this.play(request.responseText)
                        this.requestPlaySound();
                    } else {
                        this.requestPlaySound();
                    }
                }
            };
        }
    }
}
</script>