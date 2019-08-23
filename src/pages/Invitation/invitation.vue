<template>
  <transition name="fade">
    <section id="invitation-wrap">
      <section class="invitation-box">
        <img :src="require('@/assets/images/invitation/letter_01.png')" width="100%" />
        <s-img :src="require('@/assets/images/invitation/letter_02.png')" :offset="500" />
        <s-img :src="require('@/assets/images/invitation/letter_03.png')" :offset="500" />
        <s-img :src="require('@/assets/images/invitation/letter_04.png')" :offset="500" />
      </section>
      <footer class="invitation-footer" :class="{'btn-group': ($store.state.user.data.student.cityName == '广州市')}">
        <router-link tag="button" :to="{path: '/Institute/newmediamarketing'}" class="invitation-footer__btn">进入新媒体营销学院</router-link>
        <router-link tag="button" :to="{path: '/'}" class="invitation-footer__btn">进入第二大学</router-link>
      </footer>
    </section>
  </transition>
</template>

<script>
// import API from "../../plugins/API";
// import _ from "lodash";
export default {
  data() {
    return {};
  },
  beforeDestroy() {
    window.scrollTo(1, 1);
  },
  mounted() {
    document.title = "第二大学的一封信";

    if (this.$utils.isSuperBrowser) {
      this.$utils.setShare({ institute: true });
    } else if (this.$utils.isWXBrowser) {
      this.$weixin.init({ institute: true });
    }
    this.$bus.$emit("super:blazy-revalidate");
  }
};
</script>
<!-- Add "scoped" attribute to limit CSS to this component only-->
<style lang="postcss" scoped>
@import "../../styles/common.pcss";
#invitation-wrap {
  padding-bottom: 100px;
  /* position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0; */
  background: #fff;
  /* background-size: contain; */
  /* overflow: auto; */
  /* -webkit-overflow-scrolling: touch; */
  .invitation-box {
    padding: 30px;
    background: #2a4d8a;
    img {
      display: block;
      font-size: 0;
      line-height: 0;
      width: 100%;
      background-color: #fdfbec;
    }
  }
  .invitation-footer {
    @extend %normal-footer;
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 100;
    background: #fff;
    .invitation-footer__btn {
      &:nth-child(1) {
        display: none;
      }
      &:active {
        background: color(#3f6cad shade(10%));
      }
    }

    &.btn-group {
      .invitation-footer__btn {
        width: 48%;
        display: inline-block;
        &:nth-child(2) {
          display: inline-block;
          border-top-left-radius: 0;
          border-bottom-left-radius: 0;
        }
        &:nth-child(1) {
          background-color: #4a79b8;
          border-top-right-radius: 0;
          border-bottom-right-radius: 0;
        }
      }
    }
  }
}
</style>
