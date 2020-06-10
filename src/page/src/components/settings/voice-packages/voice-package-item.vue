<template>
    <q-panel class="container" secondary>
        <q-switch class="active-switch"></q-switch>
        <q-avatar :src="avatarLight" :src-dark="avatarDark" shape="rounded-square" size="large"></q-avatar>
        <div class="info">
            <q-title :level="3">{{ data["display-name"] || data["name"] }}</q-title>
            <q-footnote mode="normal">{{ data["description"] }}</q-footnote>
        </div>
        <q-divider class="divider"></q-divider>
        <div class="panel">
            <div class="panel-item">
                <q-icon name="code"></q-icon>
                <q-text>{{ $t(data["version"]) }}</q-text>
            </div>
            <q-divider type="vertical"></q-divider>
            <div class="panel-item">
                <q-icon name="user"></q-icon>
                <q-text>{{ $t(data["gender"]) }}</q-text>
            </div>
            <q-divider type="vertical"></q-divider>
            <div class="panel-item">
                <q-icon name="dots"></q-icon>
                <q-text>Details</q-text>
            </div>

            <q-theme class="panel-item" style="float: right;" color="enjolras">
                <q-icon name="trash"></q-icon>
                <q-text @click.native="doRemove"><strong>{{ $t("remove") }}</strong></q-text>
            </q-theme>
        </div>
    </q-panel>
</template>

<style lang="less" scoped>
@import "~@qiqi1996/qi-design-vue/standard.less";

.container {
    border-radius: 10px;
    padding: 3*@grid;
    padding-bottom: @grid;
    position: relative;

    .active-switch {
        position: absolute;
        top: 3*@grid;
        right: 3*@grid;
    }

    .q-avatar {
        display: inline-block;
        vertical-align: top;
        margin-right: 2*@grid;
    }

    .info {
        display: inline-block;
        vertical-align: top;

        .q-footnote {
            margin-top: @grid;
        }
    }

    .divider {
        margin-top: 2*@grid;
    }

    .panel {
        .q-divider {
            height: 8px;
        }

        * {
            display: inline-block;
            vertical-align: middle;
            margin-right: @grid;
        }
    }

    .panel-item {
        cursor: pointer;
        padding: 2*@grid 0px;

        .q-icon {
            margin-right: @grid;
        }

        * {
            display: inline-block;
            vertical-align: middle;
        }
    }
}
</style>

<script>
import axios from "axios";;

import defaultAvatarLight from "./default-avatar-light.png";
import defaultAvatarDark from "./default-avatar-dark.png";
import messages from "./voice-package-item.i18n.json";

export default {
    i18n: {
        messages
    },
    props: {
        data: Object
    },
    mounted(){
        console.log(this.data);
    },
    computed: {
        avatarLight(){
            let avatar = this.data["avatar"];
            if(avatar){
                avatar = `/voices/${this.data.name}/${avatar}`;
                return avatar;
            }
            return defaultAvatarLight;
        },
        avatarDark(){
            let avatar = this.data["avatar-dark"] || this.data["avatar"];
            if(avatar){
                avatar = `/voices/${this.data.name}/${avatar}`;
                return avatar;
            }
            return defaultAvatarDark;
        }
    },
    methods: {
        doRemove(){
            this.$emit("remove", {name:this.data.name});
        }
    }
}
</script>