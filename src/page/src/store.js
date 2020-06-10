import Vue from "vue/dist/vue.js";

var store = new Vue({
    data() {
        return {
            i18n: null,
            theme: "light",
            color: "poe"
        }
    },
    computed: {
        isDarkModeEnabled() {
            return this.theme === "dark";
        }
    },
    methods: {
        toggleTheme() {
            if (this.theme === "light") {
                this.theme = "dark";
            } else {
                this.theme = "light";
            }
        }
    }
})

document.addEventListener("click", () => {
    let colors = ["poe", "starrynight", "enjolras", "sunflower", "spring"];
    store.color = colors[Math.floor(Math.random() * colors.length)];
});

export default store;