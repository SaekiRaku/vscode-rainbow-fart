<template>
  <q-panel class="container" secondary>
    <div class="player-setting">
      <div class="setting-item">
        <span class="item-label">{{ $t("playerMode") }}:</span>
        <!-- <q-radio value="web" v-model="playerSetting.type">{{ $t("web") }}</q-radio>
        <q-radio value="server" v-model="playerSetting.type">{{ $t("server") }}</q-radio>-->
        <select name="player-type" v-model="playerSetting.type">
          <option value="web">{{ $t("web") }}</option>
          <option value="server">{{ $t("server") }}</option>
        </select>
      </div>
      <div class="setting-item" v-if="playerSetting.type === 'server'">
        <span class="item-label">{{ $t("playerServer") }}:</span>
        <q-input v-model="playerSetting.server" placeholder="websocket player address"></q-input>
      </div>
      <div class="setting-item">
        <q-button @click="saveSetting" type="primary">{{ $t("save") }}</q-button>
      </div>
    </div>
  </q-panel>
</template>

<script>
import messages from "./player.i18n.json";
import axios from "axios";

export default {
  i18n: {
    messages
  },

  data() {
    return {
      playerSetting: {
        type: "",
        server: ""
      }
    };
  },
  mounted() {
    this.loadSettings();
  },
  methods: {
    loadSettings() {
      axios.get("/player-setting").then(resp => {
        this.$nextTick(() => {
          this.playerSetting = resp.data;
        });
      });
    },

    async saveSetting(item) {
      try {
        await axios.post("/player-setting", this.playerSetting);
        this.$qidesign.toast(`save success.`);
      } catch (e) {
        this.$qidesign.toast(`Failed to save player setting.`);
        return;
      }
    }
  }
};
</script>

<style lang="less" scoped>
@import "~@qiqi1996/qi-design-vue/standard.less";

.player-setting {
  width: 100%;
  .setting-item {
    margin: 1 * @grid;
    padding: 1 * @grid;

    .item-label {
      display: inline-block;
      min-width: 100px;
      font-weight: bold;
      text-align: right;
      padding: 0px 3 * @grid;
    }
  }
}
</style>