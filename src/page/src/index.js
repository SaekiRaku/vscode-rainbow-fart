import 'regenerator-runtime/runtime';
import Vue from "vue/dist/vue.js";
import VueI18N from "vue-i18n";
import QiDesignVue from "@qiqi1996/qi-design-vue";
import "@qiqi1996/qi-design-vue/style.css";
import "./styles/common.less";

import App from "./app.vue";
import store from './store';

Vue.use(VueI18N);
Vue.use(QiDesignVue);

var locale = "en";
const currentLanguage = navigator.language;
const supportLanguage = ["en", "zh"]
if (supportLanguage.indexOf(currentLanguage) != -1) {
    locale = currentLanguage
} else {
    for (let lang of supportLanguage) {
        if (currentLanguage.indexOf(lang) == 0) {
            locale = lang;
            break;
        }
    }
}
const i18n = new VueI18N({
    locale,
    silentFallbackWarn: true,
})

store.i18n = i18n;

const vm = new Vue({
    el: "#app",
    i18n,
    render: (h)=>h(App)
})

// var vm = new Vue({
//     el: "#app",
//     data: function () {
//         return {
//             authorized: false
//         }
//     },
//     mounted: function () {
//         this.requestPlaySound();
//     },
//     methods: {
//         doAuthorize: function () {
//             this.play("duang.mp3");
//             this.authorized = true;
//         },
//         play(name) {
//             console.log("play - " + name);
//             let audio = this.$refs["audio"];
//             audio.src = "/sounds/" + name;
//             audio.currentTime = 0;
//             audio.play();
//         },
//         requestPlaySound() {
//             var request = new XMLHttpRequest();
//             request.open("GET", "/playsound", true);
//             request.send();
//             request.onreadystatechange = function() {
//                 if (request.readyState == 4) {
//                     if (request.status == 200 || request.status == 0) {
//                         vm.play(request.responseText)
//                         vm.requestPlaySound();
//                     } else {
//                         vm.requestPlaySound();
//                     }
//                 }
//             };
//         }
//     }
// })