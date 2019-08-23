<template>
  <div class="sui-toast-wrap">
    <div class="mask_transparent" v-show="isShowMask && show"></div>
    <transition :name="currentTransition">
      <div class="sui-toast" v-show="show">
        <div class="sui-toast-content" :class="toastCSS" v-html="text"></div>
      </div>
    </transition>
  </div>
</template>

<script>
import SafariFixIssue from "@/libs/mixin-safari-fix";

export default {
  name: "sui-toast",
  mixins: [SafariFixIssue],
  props: {
    value: Boolean,
    toastCSS: {
      type: String,
      default: ""
    },
    time: {
      type: Number,
      default: 2000
    },
    type: {
      type: String,
      default: "success"
    },
    width: {
      type: String,
      default: "7.6em"
    },
    isShowMask: {
      type: Boolean,
      default: false
    },
    text: String
  },
  data() {
    return {
      show: false,
      currentTransition: "fade"
    };
  },
  created() {
    if (this.value) {
      this.show = true;
    }
  },
  computed: {},
  watch: {
    show(val) {
      if (val) {
        this.$emit("on-show");
        this.fixSafariOverflowScrolling("auto");
        clearTimeout(this.timeout);
        this.timeout = setTimeout(() => {
          this.show = false;
          this.$emit("on-hide");
          this.fixSafariOverflowScrolling("touch");
        }, this.time);
      }
    },
    value(val) {
      this.show = val;
    }
  }
};
</script>

<style lang="postcss" scoped>
.sui-toast-wrap {
  position: absolute;
  .mask_transparent {
    position: fixed;
    z-index: 5000;
    right: 0;
    left: 0;
    bottom: 0;
    top: 0;
    background: rgba(17, 17, 17, 0.5);
  }
  .sui-toast {
    position: fixed;
    z-index: 5000;
    right: 0;
    left: 0;
    bottom: 0;
    top: 0;
    text-align: center;
    .sui-toast-content {
      margin-top: 50%;
      display: inline-block;
      font-size: 28px;
      padding: 20px 20px;
      color: #fff;
      background: rgba(17, 17, 17, 0.7);
      text-align: center;
      max-width: 80%;
      line-height: 1.4;
      border-radius: 12px;
      &.loading-content{
        padding: 40px 20px 20px;
        background: #fff;
        color: #666;
        border-radius: 26px;
      }
    }
  }
}
</style>
