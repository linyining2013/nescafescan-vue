<template>
  <!-- <section :id="'audio' + id" class="audio-box" :class="[status]" :data-src="url" :data-index="index" :data-id="id" :key="id">
        <div class="flex-parent">
            <button class="status status-btn" v-on:click="audioFn($event)"></button>
            <p :id="'curtime' + id" class="curtime">{{setCurrentTime}}</p>
            <div :id="'progress-box' + id" class="progress-box flex-child" v-on:touchstart.prevent.stop="progressMove($event)" v-on:touchmove.prevent.stop="progressMove($event)" v-on:touchend.prevent.stop="progressMove($event)">
                <p class="bg"></p>
                <p :id="'progress-bar' + id" class="cur progress-bar" :style="{width: progress}"></p>
                <p :id="'progress-btn' + id" class="progress-btn" :style="{left: progress}"></p>
            </div>
            <p class="duration" v-html="setTimeLen"></p>
        </div>meta
    </section> -->
  <section :id="'video-box' + id" class="video-box" :class=[status] :key="id" :style="{height: setVideoSize()}">
    <img class="video-bg" :src="require('@/assets/images/videoBg.png')" width="100%" />
    <p class="video-btn" :data-url="url" v-on:click="load"></p>
    <video preload="meta" controls="controls" :id="'video' + id" width="100%" v-on:ended="$emit('endedPlayer')" :height="setVideoSize()" :poster="require('@/assets/images/videoBg.png')" :src="url" v-on:play="play" v-on:pause="pause"></video>
    <!-- <video preload="meta" width="100%" src="http://qiniu.myfriday.cn/o_1c7ihf0qm1vnd15he1q41ilk1jer7.mp4" controls="controls"></video> -->
  </section>
</template>
<script>
import API from "@/plugins/API";
export default {
  data() {
    return {
      player: "",
      status: "pending"
    };
  },
  props: ["id", "url"],
  computed: {},
  mounted() {
    this.player = document.getElementById("video" + this.id);
    // console.log(this.player)
  },
  methods: {
    setVideoSize() {
      return parseInt(document.body.clientWidth * 9 / 16) + "px";
    },
    destory() {
      this.status = "pause";
      this.player.pause();
    },
    getInfo() {
      return {
        duration: this.player.duration,
        currentTime: this.player.currentTime,
        id: this.id
      };
    },
    pause() {
      //   this.test = 1111;
    },
    end() {
      this.player.src = "";
    },
    play() {
      if (this.status != "playing") {
        this.status = "playing";
      }
    },
    load() {
      if (this.status == "pause") {
      } else {
        if (navigator.userAgent.indexOf("UCBrowser") == -1)
          this.status = "loading";
      }
      this.$emit("saveVideo", this.id);
      this.player.play();
    }
  }
};
</script>