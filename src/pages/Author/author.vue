<template>
  <div style="color:#aaa;text-align:center;padding-top:20%;font-size:16px;">
    正在前往第二大学
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  created() {
    let openid = this.$utils.cookie.get("openid");
    if (!openid) {
      if (this.$utils.isWXBrowser) {
        // 跳转到微信授权页面
        openid = this.$utils.getUrlParam("openid");

        if (openid) {
          // store.state.user.id
          this.$utils.cookie.set("openid", openid, { expires: 30 });
          this.$store.dispatch("updateOpenId", openid);
          this.gobeforeLoginUrl();
        } else {
          // let vcode = "600bddfe1f64f8d80b4d256567f81261",
          //   url = "http://test.ke.super.cn";
          let vcode = "b7ad630d995f08fff10efd2b76c847be",
            url = "http://ke.super.cn";

          window.location.replace(
            //
            "http://wx.super.cn/oauth3/api/wx/oauth_redirect.action?uri=" +
              url +
              "&up=" +
              encodeURIComponent("author=1") +
              "&v=" +
              vcode +
              "&scope=2"
          );
        }
      }
    } else {
      // 如果有openid 但是vuex中没有用户登录信息则做登录操作
      this.$store.dispatch("updateOpenId", openid);
      this.gobeforeLoginUrl();
    }
  },
  methods: {
    gobeforeLoginUrl() {
      let url = this.$utils.cookie.get("beforeLoginUrl");
      if (!url || url.indexOf("/author") != -1) {
        // this.$router.replace("/");
        window.location.replace(window.location.origin + "/?#");
      } else {
        this.$utils.cookie.set("beforeLoginUrl", "");
        // this.$router.push(url);
        window.location.replace(window.location.origin + "/#" + url);
      }
    }
  }
};
</script>