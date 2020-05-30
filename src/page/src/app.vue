<template>
    <q-panel class="page" :theme="store.theme" :color="store.color">
        <div class="action-bar">
            <div class="theme-switcher" @click="toggleTheme">
                <q-text>夜间模式</q-text>
                <q-switch size="small" :value="store.isDarkModeEnabled"></q-switch>
            </div>

            <q-divider type="vertical" style="height: 16px"></q-divider>
            <q-button size="small" icon="open" href="https://github.com/SaekiRaku/vscode-rainbow-fart">GitHub</q-button>
        </div>

        <div class="header">
            <q-title class="title rainbow" :level="1">🌈 RAINBOW FART</q-title>
            <q-text class="description">这是一个在你编程时疯狂称赞你的 VSCode 扩展</q-text>
            <q-footnote class="footnote">编码时请保持本页面开启，建议使用 Chrome 浏览器。</q-footnote>
        </div>

        <player class="player"></player>

        <q-divider class="divider"></q-divider>

        <q-title :level="3" style="margin-bottom: 32px">更多内容</q-title>

        <div class="extra-content">
            <q-panel class="item" border>
                <q-collapse collapse title="声音贡献" :value="true">
                    <contributor-list></contributor-list>
                </q-collapse>
            </q-panel>
            <q-panel class="item" border>
                <q-collapse collapse title="已知问题">
                    <q-text>Safari 浏览器处于后台时，与 VSCode 的网络请求会中断且不再重连</q-text>
                </q-collapse>
            </q-panel>
        </div>

    </q-panel>
</template>

<style lang="less" scoped>
@import "~@qiqi1996/qi-design-vue/standard.less";

.page {
    width: 100%;
    height: calc(~"100% - 120px");
    overflow: auto;
    text-align: center;
    padding-top: 120px;

    .action-bar {
        padding: 2*@grid;
        position: absolute;
        top: 0px;
        left: 0px;
        width: calc(~"100% - "2*2*@grid);
        text-align: right;

        .theme-switcher {
            cursor: pointer;
            .q-switch {
                pointer-events: none;
            }
        }

        * {
            display: inline-block;
            vertical-align: middle;
            margin: 0px @grid/2;
        }
    }

    .header {
        .title {
            margin-bottom: 4*@grid;
        }

        .description {
            margin-bottom: 2*@grid;
        }
    }

    .player {
        display: inline-block;
        margin-top: 6*@grid;
    }

    .divider {
        margin: 6*@grid 0px;
    }

    .extra-content {
        width: 38.2%;
        margin: 0px auto;
        text-align: left;
        padding-bottom: 120px;

        .item {
            margin-bottom: 2*@grid;
        }
    }
}
</style>

<script>
import store from "/store.js";

import player from "./components/player.vue";
import contributorList from "./components/contributor-list.vue";

export default {
    components: {
        player,
        contributorList
    },
    data(){
        return {
            store,
            manual: false,
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