<template>
    <div class="container">
        <q-tab v-model="currentTab">
            <q-tab-item value="0" :text="$t('voice-packages')"></q-tab-item>
            <q-tab-item value="1" :text="$t('customization')" disable></q-tab-item>
            <q-tab-item value="2" :text="$t('preference')"></q-tab-item>
            <q-tab-item value="3" :text="$t('about')"></q-tab-item>
        </q-tab>
        <VoicePackages v-if="isTab('0')"></VoicePackages>
    </div>
</template>

<script>
import VoicePackages from "./voice-packages/index.vue";

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