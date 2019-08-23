<template>
  <section id="agreement-word-wrap">
    <s-img :src="require('@/assets/images/agreement/words_01.png')" />
    <s-img :src="require('@/assets/images/agreement/words_02.png')" :offset="1000" />
    <s-img :src="require('@/assets/images/agreement/words_03.png')" :offset="1000" />
    <footer class="normal-footer">
      <button class="normal-footer__btn" v-on:click="toBack()" :disabled="isDisabled">知道了</button>
    </footer>
  </section>
</template>

<script>
import jsuper from "exports-loader?jsuper!@/../node_modules/SuperBrowserLibs/dist/jsuperV2.js";

export default {
  data() {
    return {
      isDisabled: false
    };
  },
  // beforeDestroy() {
  //   this.$super.buyTip.hide();
  // },
  created() {
    if (this.$utils.isSuperBrowser) {
      jsuper.browserConfig({
        data: {
          openWithBrowser: 0, //是否允许外部浏览器打开
          orientation: 1 //横竖屏,1竖屏,2横屏,3跟随手机方向
        }
      });
    }
  },
  mounted() {
    this.$nextTick(() => {
      window.scrollTo(0, 0);
      this.$bus.$emit("super:blazy-revalidate");
    });
  },
  methods: {
    toBack() {
      this.isDisabled = true;
      this.$router.go(-1);
    }
  }
};
</script>
<!-- Add "scoped" attribute to limit CSS to this component only-->
<style lang="postcss" scoped>
@import "../../styles/common.pcss";
#agreement-word-wrap {
  font-family: Sans-serif;
  background: #fff;
  overflow: auto;
  z-index: 100;
  -webkit-overflow-scrolling: touch;
  img {
    display: block;
    font-size: 0;
    line-height: 0;
    width: 100%;
    background-color: #fff;
  }
  .normal-footer {
    @extend %normal-footer;
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 100;
    background: #fff;
    .normal-footer__btn:after {
      display: none;
    }
  }
}
</style>
