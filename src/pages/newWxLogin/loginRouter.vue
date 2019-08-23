<template>
  <section id="login-wrap">
    <div class="login-banner">
      <img :src="require('@/assets/images/newWxLogin/top_pic@3x.png')">
    </div>
    <!-- <header class="login-header">
      <p class="icon"></p>
    </header> -->
    <section class="transition-parent">
      <transition name="slide-left">
        <!-- <keep-alive> -->
        <router-view v-on:updateAuthInfo="updateAuthInfo" v-on:bindAccount="bindAccount"></router-view>
        <!-- </keep-alive> -->
      </transition>
    </section>
    <!-- <div class="success-tip-modal" v-show="$store.state.user.WXaccount && $store.state.user.unionid && $store.state.user.openid && $store.state.identity ">
      <div class="mask"></div>
      <div class="modal-wrap">
        <! 普通提示 
        <header class="modal-header">
          <p class="icon"></p>
          <p>绑定超级课程表账号成功！</p>
        </header>
        <section class="modal-section" v-if="$store.state.user.WXaccount">
          <p class="txt">当前绑定账号：{{$store.state.user.WXaccount}}</p>
        </section>
        <div class="modal-bg"></div>
      </div>
    </div> -->
  </section>
</template>

<script>
import login from "./login";

export default {
  components: {
    "login-component": login
  },
  beforeCreate: function() {
    // document.getElementsByTagName("body")[0].className = "login-bg";
  },
  beforeDestroy: function() {
    document.body.removeAttribute("class", "login-bg");
  },
  data() {
    return {
      title: this.$route.name == "login" ? "登录" : "账号绑定"
    };
  },
  // beforeDestroy() {
  // this.$super.buyTip.hide();
  // },
  mounted() {
    this.isLogin();
    document.title = this.title;

    if (this.$utils.isSuperBrowser) {
      this.$utils.setShare();
    } else if (this.$utils.isWXBrowser) {
      this.$weixin.init();
    }
  },
  watch: {
    $route(to, from) {
      this.activeName = to.name;
      if (to.name == "login") {
        this.title = "登录";
      } else {
        // this.title = "注册";
      }
      // document.title = this.title;
    }
  },
  // document.title = "课程详情";
  methods: {
    bindAccount(val) {
      this.$store.dispatch("updateWXaccount", val.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2'));
      this.$utils.cookie.set("WXaccount", val.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2'), { expires: 30 }); //保存绑定账号
    },
    updateAuthInfo() {
      this.$utils.isWXBrowser &&
        this.$API.updateAuthInfo({
          unionId: this.$store.state.user.unionid,
          openId: this.$store.state.user.openid
        });
    },
    isLogin () {
      
      if(this.$utils.cookie.get("identity")){
        if (this.$utils.cookie.get("WXaccount")) {
          this.$store.dispatch("updateWXaccount", this.$utils.cookie.get("WXaccount"));
        }
        // this.mobileNumber = this.$utils.cookie.get("mobileNumber").replace(/(\d{3})\d{4}(\d{4})/, '$1****$2')
      }
    }
  }
};
</script>
<!-- Add "scoped" attribute to limit CSS to this component only-->
<style lang="postcss" >
@import "../../styles/login/login.pcss";
.login-banner {
  width: 100%;
  img {
    display: block;
    width: 100%;
  }
}
</style>
