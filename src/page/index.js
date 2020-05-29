var vm = new Vue({
    el: "#app",
    data: function () {
        return {
            authorized: false
        }
    },
    mounted: function () {
        this.requestPlaySound();
    },
    methods: {
        doAuthorize: function () {
            this.play("duang.mp3");
            this.authorized = true;
        },
        play(name) {
            console.log("play - " + name);
            let audio = this.$refs["audio"];
            audio.src = "/sounds/" + name;
            audio.currentTime = 0;
            audio.play();
        },
        requestPlaySound() {
            var request = new XMLHttpRequest();
            request.open("GET", "/playsound", true);
            request.send();
            request.onreadystatechange = function() {
                if (request.readyState == 4) {
                    if (request.status == 200 || request.status == 0) {
                        vm.play(request.responseText)
                        vm.requestPlaySound();
                    } else {
                        vm.requestPlaySound();
                    }
                }
            };
        }
    }
})