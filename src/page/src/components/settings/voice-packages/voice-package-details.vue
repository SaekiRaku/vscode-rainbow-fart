<template>
    <q-modal name="voice-package-details">
        <div class="container">
            <audio ref="audio"></audio>
    
            <q-image class="avatar" mode="cover" :src="avatarLight" :src-dark="avatarDark"></q-image>
    
            <div class="header">
                <q-title :level="1" mode="normal" colorful>{{ data["display-name"] || data.name }}</q-title>
                <q-text mode="normal" v-show="data.description">{{ data.description }}</q-text>
                <div>
                    <q-text>作者</q-text>
                    <q-text>{{data.author}}</q-text>
                </div>
                <q-divider></q-divider>
            </div>
    
            <div class="assets">
                <q-title :level="2" style="margin-bottom: 16px">{{ $t("voice-assets") }}</q-title>
    
                <q-panel class="contribute" v-for="(contribute, cindex) in data.contributes" :key="'c'+cindex" secondary>
                    <q-title :level="3">{{ $t("keywords") }}</q-title>
                    <q-panel class="keyword" v-for="(keyword, kindex) in  UniteToArray(contribute.keywords)" :key="'k'+kindex" border><q-text>{{keyword}}</q-text></q-panel>
                    <q-title :level="3" style="margin-top: 16px;">{{ $t("voices") }}</q-title>
                    <q-panel class="voice" v-for="(voice, vindex) in UniteToArray(contribute.voices)" :key="'v'+vindex" border>
                        <q-text>{{voice}}</q-text>
                        <div class="controller">
                            <q-button size="small" @click="play(`${data.name}/${voice}`)">{{ $t("play") }}</q-button>
                        </div>
                    </q-panel>
                </q-panel>
            </div>
        </div>
    </q-modal>
</template>

<style lang="less" scoped>
@import "~@qiqi1996/qi-design-vue/standard.less";

.container {
    width: 720px;
}

.avatar {
    width: 720px;
    height: 480px;
}

.header {
    padding: 4*@grid;
    text-align: center;
    .q-text {
        margin: 2*@grid 0px;
    }
}

.assets {
    margin: 4*@grid;
    margin-top: 0px;

    .contribute {
        margin-bottom: 2*@grid;
        padding: 2*@grid;

        .keyword {
            margin-top: @grid;
            margin-right: @grid;
            display: inline-block;
            padding: @grid 2*@grid;
            border-radius: 24px;
        }

        .voice {
            margin: @grid 0px;
            padding: 2*@grid;
            overflow: hidden;

            .q-text {
                display: inline-block;
                margin-top: @grid/2;
            }

            .controller {
                float: right;
            }
        }
    }
}
</style>

<script>
import defaultAvatarLight from "./default-avatar-light.png";
import defaultAvatarDark from "./default-avatar-dark.png";
import messages from "./voice-package-details.i18n.json";

export default {
    i18n: {
        messages
    },
    props: {
        data: {}
    },
    computed: {
        avatarLight() {
            let avatar = this.data["avatar"];
            if (avatar) {
                avatar = `/voices/${this.data.name}/${avatar}`;
                return avatar;
            }
            return defaultAvatarLight;
        },
        avatarDark() {
            let avatar = this.data["avatar-dark"] || this.data["avatar"];
            if (avatar) {
                avatar = `/voices/${this.data.name}/${avatar}`;
                return avatar;
            }
            return defaultAvatarDark;
        }
    },
    methods: {
        UniteToArray(thevar){
            if(!Array.isArray(thevar)){
                return [thevar];
            }
            return thevar
        },
        play(name){
            let audio = this.$refs["audio"];
            audio.src = "/voices/" + name;
            audio.currentTime = 0;
            audio.play();
        }
    }
};
</script>