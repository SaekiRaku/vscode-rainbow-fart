<template>
    <q-panel class="page" :theme="store.theme" :color="store.color">
        <div class="layout-left-background" :style="{ backgroundImage: `url(${background})`}"></div>
        <div class="layout-left">
            <div class="margin-block">
                <q-title class="headline" :level="1" colorful>RAINBOW<br>FART</q-title>
                <q-text class="description" mode="normal">{{ $t("description") }}</q-text>
                <q-popover position="bottom-left" :text="$t('tip-rainbow-fart-content')" width="240px">
                    <q-footnote class="tip" mode="normal" v-show="store.i18n.locale != 'zh'"><q-icon name="question-circle"></q-icon> {{ $t("tip-rainbow-fart") }}</q-footnote>
                </q-popover>
            </div>
        </div>
        <div class="layout-actions">
            <span class="dark-mode" @click="toggleTheme">
                <q-text>{{ $t("dark-mode") }}</q-text>
                <q-switch size="small" :value="store.isDarkModeEnabled"></q-switch>
            </span>
            <q-divider type="vertical" style="height: 8px"></q-divider>
            <q-popover>
                <q-button size="small" icon="earth">Language</q-button>
                <div class="popover-language" slot="content">
                    <q-radio v-model="store.i18n.locale" value="zh">简体中文</q-radio>
                    <q-radio v-model="store.i18n.locale" value="en">English</q-radio>
                </div>
            </q-popover>
            <q-button size="small" icon="open" href="https://github.com/SaekiRaku/vscode-rainbow-fart">GitHub</q-button>
        </div>
        <div class="layout-right">
            <div class="margin-block">
                <q-title :level="1">{{ $t("permission-required") }}</q-title>
                <player></player>
                <q-title :level="1">{{ $t("settings") }}</q-title>
                <settings></settings>
            </div>
        </div>
    </q-panel>
</template>

<style lang="less" scoped>
@import "~@qiqi1996/qi-design-vue/standard.less";

.page {
    width: 100%;
    height: 100%;

    .layout-left, .layout-right, .layout-left-background{
        height: 100%;
        position: absolute;

        .margin-block {
            margin: 12*@grid;
        }
    }

    .layout-left-background {
        opacity: 0.15;
        width: 38.2%;
        background-repeat: no-repeat;
        background-size: cover;
        left: 0px;
        top: 0px;
    }

    .layout-actions {
        position: absolute;
        left: 12*@grid;
        bottom: 12*@grid;

        * {
            display: inline-block;
            vertical-align: middle;
            margin: 0px @grid/2;
        }

        .dark-mode {
            cursor: pointer;

            .q-switch {
                pointer-events: none;
            }
        }

        .popover-language {
            padding: @grid;
            * {
                white-space: nowrap;
                line-height: 32px;
            }
        }
    }

    .layout-left {
        .noselect();
        width: 38.2%;
        left: 0px;
        top: 0px;

        .headline {
            font-size: 48px;
            line-height: 72px;
            letter-spacing: 16px;
            font-weight: bolder;
        }

        .description {
            margin-top: 4*@grid;
        }

        .tip {
            margin-top: @grid;
        }
    }

    .layout-right {
        width: 61.8%;
        right: 0px;
        top: 0px;
        overflow: auto;

        .margin-block {
            // max-width: 720px;
        }

        .q-title {
            margin-top: 6*@grid;
            margin-bottom: 3*@grid;
        }
    }
}
</style>

<script>
import store from "/store.js";

import player from "./components/player/index.vue";
import settings from "./components/settings/index.vue";

import messages from "./app.i18n.json";
import background1 from "./assets/background/1.jpg";
import background2 from "./assets/background/2.jpg";
import background3 from "./assets/background/3.jpg";
import background4 from "./assets/background/4.jpg";
import background5 from "./assets/background/5.jpg";
import background6 from "./assets/background/6.jpg";
import background7 from "./assets/background/7.jpg";
import background8 from "./assets/background/8.jpg";
import background9 from "./assets/background/9.jpg";
import background10 from "./assets/background/10.jpg";

const backgroundList = [
    background1,
    background2,
    background3,
    background4,
    background5,
    background6,
    background7,
    background8,
    background9,
    background10
]

export default {
    components: {
        player,
        settings
    },
    i18n: {
        messages
    },
    data(){
        return {
            store,
            manual: false,
            background: backgroundList[Math.floor(Math.random() * backgroundList.length)],
        }
    },
    mounted(){
        if(this.$qidesign.isSystemDarkmode()!==undefined){
            this.autoDarkMode();
        }
    },
    methods: {
        toggleTheme(){
            this.store.toggleTheme();
            this.manual = true;
        },
        autoDarkMode(){
            if(this.manual){
                return;
            }
            if(this.$qidesign.isSystemDarkmode() != store.isDarkModeEnabled){
                store.toggleTheme();
            }
            setTimeout(this.autoDarkMode, 1000);
        }
    }
}
</script>