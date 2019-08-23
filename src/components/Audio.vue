<template>
    <section :id="'audio' + id" class="audio-box" :class="[status]" :data-src="url" :data-index="index" :data-id="id" :key="id">
        <div class="flex-parent">
            <button class="status status-btn" v-on:click="audioFn($event)"></button>
            <p :id="'curtime' + id" class="curtime">{{setCurrentTime}}</p>
            <div :id="'progress-box' + id" class="progress-box flex-child" v-on:touchstart.prevent.stop="progressMove($event)" v-on:touchmove.prevent.stop="progressMove($event)" v-on:touchend.prevent.stop="progressMove($event)">
                <p class="bg"></p>
                <p :id="'progress-bar' + id" class="cur progress-bar" :style="{width: progress}"></p>
                <p :id="'progress-btn' + id" class="progress-btn" :style="{left: progress}"></p>
            </div>
            <p class="duration" v-html="setTimeLen"></p>
        </div>
    </section>
</template>
<script>
// import API from "@/plugins/API";

export default {
  data() {
    return {
      timeout: null,
      $progressBox: "", //进度条容器
      $progressBar: "", //进度条
      $progressBtn: "", //进度条按钮
      player: "",
      duration: 0,
      currentTime: 0,
      progress: 0,
      status: "pending", //正在加载
      interval: null, //倒计时计时
      move: {
        startX: 0,
        startY: 0,
        x: 0,
        y: 0,
        curX: 0,
        offsetLeft: 0
      }
    };
  },
  props: ["id", "url", "index", "timelength"],
  computed: {
    setCurrentTime() {
      return this.formatSeconds(this.currentTime);
    },
    setTimeLen() {
      return !this.duration
        ? this.timelength ? this.formatSeconds(this.timelength) : "00:00"
        : this.formatSeconds(this.duration);
    }
  },
  mounted() {
    this.$progressBox = document.getElementById("progress-box" + this.id);
    this.$progressBtn = document.getElementById("progress-btn" + this.id);
    this.$progressBar = document.getElementById("progress-bar" + this.id);
    this.$API.APIFactory(this.url + "?avinfo", { customer: true })().then(res => {
      var format = res.format,
        duration = format.duration;
      this.duration = duration;
    });
  },
  methods: {
    progressMove(event) {
      switch (event.type) {
        case "touchstart":
          this.move.startX = event.touches[0].pageX;
          this.move.startY = event.touches[0].pageY;
          this.move.offsetLeft = this.$progressBox.offsetLeft;
          this.move.curLeft = this.$progressBtn.offsetLeft;
          //   console.log(event.target.offsetLeft);
          //   console.log(event.target.parentNode.offsetLeft);
          //   console.log(this.move.startX);
          if (this.player && this.status == "playing") {
            this.pause();
          }
          break;
        case "touchmove":
          if (this.player && this.status == 'pause') {
            this.move.x = this.move.startX - event.touches[0].pageX; //<1 右滑  >1 左滑
            this.move.y = this.move.startY - event.touches[0].pageY;

            // if (this.player) {
            let duration = this.player.duration; //当前进度
            let progressW = this.$progressBox.offsetWidth;
            this.move.curX = this.move.curLeft + this.move.x * -1;

            //   console.log("curLeft " + this.move.curLeft);
            //   console.log("offsetLeft " + this.move.offsetLeft);
            //   console.log("curX " + this.move.curX);
            //   console.log("startX " + this.move.startX);
            //   console.log("pageX " + event.touches[0].pageX);
            //   console.log("x " + this.move.x);
            //   console.log("-------------------------");

            if (this.move.curX >= 0 && this.move.curX <= progressW) {
              //相对移动大于0 的时候
                // this.$progressBtn.style.left = this.move.curX + "px";
                // this.$progressBar.style.width = this.move.curX + "px";


                this.progress = this.move.curX + "px";
                this.currentTime  = (duration * (this.move.curX / progressW));

            } else if (this.move.curX < 0) {
            //   this.$progressBtn.style.left = 0 + "px";
            //   this.$progressBar.style.width = 0 + "px";
                this.progress = 0;
                this.currentTime = 0;
            }
          }
          //   }

          break;
        case "touchend":
          if (this.player  && this.status == 'pause') {
            this.player.currentTime = Math.round(
              this.move.curX /
                this.$progressBox.offsetWidth *
                this.player.duration
            );
            this.playing();
          } else {
              this.progress = 0;
              this.currentTime = 0;
            // this.$progressBtn.style.left = 0 + "px";
            // this.$progressBar.style.width = 0 + "px";
          }
          break;
      }
    },
    audioFn() {
      //判断进入何事件
      if (this.status == "pending") {
        //音频未加载，处于就绪状态
        this.load();
      } else if (this.status == "playing") {
        //正在播放
        this.pause();
      } else if (this.status == "pause") {
        //暂停状态
        this.playing();
      } else if (this.status == "end") {
        //播放完毕
        this.player.currentTime = 0;
        this.playing();
      }
    },
    cancelCount() {
      window.clearInterval(this.interval);
    },
    countDown() {
      // console.log(this.duration);
      // console.log(this.player.duration);
      if (!this.player.ended) {
        let currentTime = this.player.currentTime;
        let duration = this.duration;

        this.currentTime = this.player.currentTime;
        this.progress = (Math.round(currentTime) / Math.round(duration) * 100) + '%'; //进度条
      } else {
        //播放结束
        this.end();
      }
      // if (player.paused) { ///检测播放是否已暂停.audio.paused 在播放器播放时返回false.
      // 	_cancelCount(); //取消计时
      // }
    },
    setCount() {
      if (this.interval) {
        this.cancelCount();
        this.interval = null;
        this.interval = window.setInterval(this.countDown, 1000);
      } else {
        this.interval = window.setInterval(this.countDown, 1000);
      }
    },
    getInfo() {
      return { 
        duration: this.player.duration,
        currentTime: this.player.currentTime,
        id: this.id
      };
    },
    init() {
      this.player.pause();
      this.currentTime = 0;
      this.progress = 0; //进度条
      this.cancelCount(); //暂停计时
    },
    destory() {
      this.init();
      window.clearTimeout(this.timeout);
      this.status = "pending";
    },
    end() {
      this.init();
      this.status = "end";
    },
    pause() {
      this.player.pause();
      this.status = "pause"; //正在播放
      this.cancelCount(); //暂停计时
    },
    playing() {
      this.player.play();
      this.status = "playing"; //正在播放

      this.setCount();
    },
    loading(player) {
      this.player = player || this.player;

      this.status = "loading";
      this.player.src = this.url;
      this.player.load();
      this.timeout = window.setTimeout(()=>{
          if (this.status == 'loading') {
            this.destory();
            this.player.src = '';
            this.$super.toast.text('加载失败，请确认网络状态~');
          }
      }, 30000);
    },
    load() {
      this.$emit("loadAudio", this.id);
    },
    formatSeconds(value, format) {
      // console.log('value  ' + value);
      var parameter = 60;
      var minute = parseInt(value / parameter);
      var second = Math.round(value % parameter);

      if (!format) {
        if (second == 60) {
          second = 0;
          minute++;
        }
        // return second == 60
        //   ? "01:00"
        //   : (minute ? (minute >= 10 ? minute + ":" : "0" + minute + ":") : "00:") +
        //       (second >= 10 ? second : "0" + second);
        return (minute ? (minute >= 10 ? minute + ":" : "0" + minute + ":") : "00:") +
              (second >= 10 ? second : "0" + second);
      } else {
        return format.replace("MM", minute).replace("ss", second);
      }
    }
  }
};
</script>