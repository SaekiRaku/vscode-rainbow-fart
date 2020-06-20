<template>
    <div class="container">
        <input ref="file" type="file" hidden @change="requestImport">
        <div class="action-bar">
            <q-button @click="handleClickImport" type="primary">{{ $t("import") }}</q-button>
            <q-button @click="requestVoicePackagesList(true)">{{ $t("refresh") }}</q-button>
            <q-button @click="requestOpenVoicePackagesDirectory()">{{ $t("open-voice-packages-directory") }}</q-button>
            <q-button href="https://github.com/topics/rainbow-fart" target="_blank">{{ $t("get-more") }}</q-button>
        </div>
        <q-divider class="divider"></q-divider>
        <center v-if="loading">
            <q-icon class="loading" name="loading" animation="rotate"></q-icon>
        </center>

        <VoicePackageItem
            v-else
            class="voice-package-item"
            v-for="(item, index) in list"
            :key="index"
            :data="item"
            @remove="requestRemove(item)"
            @showDetails="doShowDetails(item)"
            @changeEnableState="doChangeEnableState(item)"
        ></VoicePackageItem>

        <VoicePackageDetails :data="currentDetails"></VoicePackageDetails>
    </div>
</template>

<style lang="less" scoped>
@import "~@qiqi1996/qi-design-vue/standard.less";

.action-bar {
    padding: 2 * @grid;
}

.divider {
    margin-bottom: 3 * @grid;
}

.loading {
    font-size: 24px;
    margin: 0px auto;
}

.voice-package-item {
    margin-bottom: 2*@grid;
}
</style>

<script>
import axios from "axios";
import messages from "./voice-package.i18n.json";
import VoicePackageItem from "./voice-package-item.vue";
import VoicePackageDetails from "./voice-package-details.vue";

export default {
    i18n: {
        messages
    },
    components: {
        VoicePackageItem,
        VoicePackageDetails
    },
    data() {
        return {
            loading: true,
            currentDetails: {},
            list: []
        };
    },
    mounted() {
        this.requestVoicePackagesList();
    },
    methods: {
        handleClickImport(){
            this.$refs["file"].value = null;
            this.$refs["file"].click();
        },
        async requestVoicePackagesList(reload) {
            this.loading = true;
            let response = await axios.get("/voice-packages", {
                params: { reload }
            });
            this.list = response.data;
            this.loading = false;
        },
        async requestImport(evt){
            let file = evt.target.files[0];
            let form = new FormData();
            form.append("file", file);
            let response = await axios.post("/import-voice-package", form);
            if(response.data.err){
                this.$qidesign.toast(`Import Failed: ${response.data.errmsg}`);
                return;
            }
            this.requestVoicePackagesList(true);
            this.$qidesign.toast(`Import Succeed`);
        },
        async requestRemove(evt){
            let response = await axios.post("/remove-voice-package", {name: evt.name});
            if(response.data.err){
                this.$qidesign.toast(`Remove Failed: ${response.data.errmsg}`);
            }else{
                this.requestVoicePackagesList(true);
            }
        },
        requestOpenVoicePackagesDirectory(){
            axios.get("/open-voice-packages-directory");
        },
        doShowDetails(item){
            this.currentDetails = item;
            this.$qidesign.open("voice-package-details")
        },
        async doChangeEnableState(item){
            try{
                await axios.post("/voice-packages/change-enabled-state", {
                    name: item.name,
                    enable: !item.enabled
                });
            }catch(e){
                this.$qidesign.toast(`Failed to change the enabled state.`);
                return;
            }
            item.enabled = !item.enabled;
        }
    }
};
</script>