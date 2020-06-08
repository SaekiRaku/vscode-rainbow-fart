<template>
    <div class="container">
        <div class="action-bar">
            <q-button type="primary">Import</q-button>
            <q-button>Get More</q-button>
        </div>
        <q-divider class="divider"></q-divider>
        <center v-if="loading">
            <q-icon class="loading" name="loading" animation="rotate"></q-icon>
        </center>
        <VoicePackageItem v-else v-for="(item, index) in list" :key="index" :data="item"></VoicePackageItem>
    </div>
</template>

<style lang="less" scoped>
@import "~@qiqi1996/qi-design-vue/standard.less";

.action-bar {
    padding: 2*@grid;
}

.divider {
    margin-bottom: 3*@grid;
}

.loading {
    font-size: 24px;
    margin: 0px auto;
}
</style>

<script>
import axios from "axios";
import VoicePackageItem from "./voice-package-item.vue";

export default {
    components: {
        VoicePackageItem
    },
    data(){
        return {
            loading: true,
            list: []
        }
    },
    mounted(){
        this.requestVoicePackagesList();
    },
    methods: {
        async requestVoicePackagesList(){
            this.loading = true;
            let response = await axios.get("/voice-packages");
            this.list = response.data;
            this.loading = false;
        }
    }
}
</script>