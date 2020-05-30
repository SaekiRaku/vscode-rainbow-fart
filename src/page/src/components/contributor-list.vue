<template>
    <div class="container">
        <q-footnote>欢迎各位小姐姐到 GitHub 提交录音贡献</q-footnote>
        <div class="line">
            <q-text>
                <strong>关键字</strong>
            </q-text>
            <q-text>
                <strong>声优</strong>
            </q-text>
        </div>
        <div class="line" v-for="(people, key) in list" :key="key">
            <q-text>{{ key }}</q-text>
            <q-text>{{ people }}</q-text>
        </div>
    </div>
</template>

<style lang="less" scoped>
@import "~@qiqi1996/qi-design-vue/standard.less";

.line {
    margin: 2*@grid 0px;
    * {
        width: calc(~"50% - " 2 * @grid);
        display: inline-block;
        vertical-align: middle;
    }
}
</style>

<script>
export default {
    data() {
        return {
            list: {
                document: "MissL Li",
                function: "Alice Moon",
                alert: "Sara",
                Vue: "Alena Fu",
                ajax: "Miss Chen"
            }
        };
    }
};
</script>