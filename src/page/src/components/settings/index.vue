<template>
    <div class="container">
        <q-tab v-model="currentTab">
            <q-tab-item value="0" :text="$t('voice-packages')"></q-tab-item>
            <q-tab-item value="1" :text="$t('customization')"></q-tab-item>
            <q-tab-item value="2" :text="$t('preference')"></q-tab-item>
            <q-tab-item value="3" :text="$t('about')"></q-tab-item>
        </q-tab>
        <VoicePackages v-if="isTab('0')"></VoicePackages>
        <About v-else-if="isTab('3')"></About>
        <div class="none" v-else>
            <q-icon name="sad"></q-icon>
            <q-text>{{ $t("developing") }}</q-text>
        </div>
    </div>
</template>

<style lang="less" scoped>
@import "~@qiqi1996/qi-design-vue/standard.less";

.none {
    text-align: center;

    .q-icon {
        font-size: 48px;
        margin-top: 4*@grid;
        margin-bottom: 2*@grid;
    }
}
</style>

<script>
import VoicePackages from "./voice-packages/index.vue";
import About from "./about/index.vue";

import messages from "./settings.i18n.json";

export default {
    i18n: {
        messages
    },
    components: {
        VoicePackages,
    },
    data(){
        return{
            currentTab: "0"
        }
    },
    methods: {
        isTab(val){
            return this.currentTab === val
        }
    }
}
</script>