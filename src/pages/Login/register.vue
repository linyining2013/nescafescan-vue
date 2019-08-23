<template>
  <section class="wrapper">
    <section id="register-wrap">
      <section class="form-box">
        <header class="form-box-header">
          <p class="form-box-header__title">绑定超级课程表账号</p>
          <p class="form-box-header__tip">学习体验更佳，并有不定时福利</p>
        </header>
        <form name="register-form" v-on:submit.prevent="register()">
          <div class="form-group flex-parent">
            <label class="form-group__name">手机:</label>
            <div class="form-group-box flex-child">
              <input type="text" placeholder="请输入手机号码" class="form-group__control" name="mobileNumber" maxlength="11" v-on:blur="isMobile?'':($super.toast.text('请输入有效的手机号码'))" v-model.trim="mobileNumber" />
            </div>
          </div>
          <div class="form-group flex-parent">
            <label class="form-group__name">验证码:</label>
            <div class="form-group-box flex-child">
              <input type="text" placeholder="请输入验证码" class="form-group__control" name="captcha" v-model.trim="captcha" maxlength="6" />
            </div>
            <button type="button" class="captcha-btn" :disabled="!canCaptcha || !isMobile" v-on:click="getCaptcha" v-html="captchaHtml">点击获取验证码</button>
          </div>
          <div class="form-group flex-parent">
            <label class="form-group__name">密码:</label>
            <div class="form-group-box flex-child">
              <input type="password" placeholder="请输入密码" class="form-group__control" name="password" v-model.trim="password" maxlength="16" />
            </div>
          </div>
          <p class="submit-box">
            <button type="submit" class="submit-btn normal-btn" :disabled="!isMobile || !isPassword || !isCaptcha">注册并绑定</button>
          </p>
        </form>
      </section>

      <footer class="login-footer">
        <router-link tag="a" class="login-footer__item" href="javascript:void(0)" :to="{path: '/login', query: { id: routeQuery.id,name: routeQuery.name, type: routeQuery.type }}">手机验证码登录</router-link>
      </footer>

    </section>
    <div class="success-tip-modal" v-show="regist.isShow">
      <div class="mask"></div>
      <div class="modal-wrap">
        <!-- 普通提示 -->
        <header class="modal-header">
          <p class="icon"></p>
          <p v-if="regist.isSuccess">&nbsp;&nbsp;注册成功！</p>
          <p v-else>&nbsp;&nbsp;注册失败！</p>
        </header>
        <section class="modal-section">
          <template v-if="regist.isSuccess">
            <p class="txt">{{regist.count}}秒后返回报名页面</p>
          </template>
          <template v-else>
            <p class="txt">
              <span class="tip">请检查您的网络</span><br/>{{regist.count}}秒后返回上一步重新注册</p>
          </template>
        </section>
        <div class="modal-bg"></div>
      </div>
    </div>
  </section>
</template>

<script>
// import this.$API from "@/plugins/this.$API";

export default {
  data() {
    return {
      regist: {
        count: 3,
        isSuccess: false,
        isShow: false,
        timeout: null
      },
      loginType: 0, //0 验证码登陆  1 账号登陆
      count: 60,
      canCaptcha: true,
      mobileNumber: "", //存放已经生成的验证码对应的手机号码
      password: "",
      captcha: "",
      routeQuery: { name: "", id: "" },
      interval: null
    };
  },
  computed: {
    captchaHtml() {
      return this.canCaptcha ? `点击获取验证码` : `重发验证码(${this.count})s`;
    },
    isCaptcha() {
      return /^([A-Z0-9a-z]{6})$/.test(this.captcha);
    },
    isMobile() {
      return /^([1][0-9]{10})$/.test(this.mobileNumber);
    },
    isPassword() {
      return /^[A-Z0-9a-z~!@#$%^&*_+-=.?]{6,16}$/.test(this.password);
    }
  },
  mounted() {
    // this.finishRegist("");
    this.routeQuery = this.$router.currentRoute.query;
  },
  methods: {
    finishRegist(identity, isSuccess = true) {
      this.regist = {
        count: 3,
        isSuccess: isSuccess,
        isShow: true,
        timeout: null
      };
      this.regist.timeout = window.setInterval(() => {
        this.regist.count--;
        if (this.regist.count == 0) {
          window.clearInterval(this.regist.timeout);
          if (this.regist.isSuccess) {
            //22F1A27FF4FF0DB2106E86CBBA5F17C5
            this.$utils.cookie.set("identity", identity, { expires: 30 });
            this.$store.dispatch("updateId", identity);
            this.$emit("bindAccount", this.mobileNumber);
            this.$emit("updateAuthInfo");
            if (this.routeQuery.id) {
              if (!this.$utils.isSuperBrowser || !this.$utils.isWXBrowser) {
                this.$router.replace({
                  name: this.routeQuery.name.replace(/_/g, "."),
                  params: {
                    id: this.routeQuery.id,
                    type:
                      this.routeQuery.name == "payment"
                        ? this.routeQuery.type
                        : "",
                    pageNum: this.routeQuery.name == "Learning" ? 1 : ""
                  }
                });
              } else {
                //未购买课程
                this.$router.replace({
                  name: "payment",
                  params: {
                    id: this.routeQuery.id,
                    type: this.routeQuery.type
                  }
                });
              }
            } else if (this.routeQuery.name) {
              this.$router.replace({
                name: this.routeQuery.name.replace(/_/g, ".")
              });
            } else {
              this.$router.replace({ name: "Home.index.course" });
            }
          } else {
            window.location.reload();
          }
        }
      }, 1000);
    },
    hasRegister() {
      this.$super.modalTip.show({
        type: "register",
        content: `<p class="icon" style="background: url(${require("@/assets/images/warning.png")}) 0 0 no-repeat;background-size: 44px;width: 44px;height: 44px;margin: 0 auto 20px;"></p><p>手机已被注册</p>`,
        onClose: data => {
          this.$router.replace({
            path: "/login",
            query: {
              id: this.routeQuery.id,
              name: this.routeQuery.name,
              type: this.routeQuery.type,
              phone: this.mobileNumber
            }
          });
        }
      });
    },
    register() {
      this.$API
        .registerForH5({
          mobileNumber: this.mobileNumber,
          captcha: this.captcha,
          password: this.password,
          unionId: this.$store.state.user.unionid,
          openId: this.$store.state.user.openid
        })
        .then(data => {
          this.finishRegist(data);
        })
        .catch(err => {
          if (err.message.indexOf("timeout") != -1) {
            this.finishRegist(err, false); //网络请求出错
          } else if (err.message == "验证码错误，请重新输入") {
            this.$super.toast.text("短信验证码错误，请重新输入");
            // this.canCaptcha = true;
            // this.count = 60;
            // clearInterval(this.interval);
          } else {
            this.$super.toast.text(err.message);
          }
        });
    },
    getCaptcha() {
      if (this.isMobile) {
        if (this.canCaptcha) {
          this.canCaptcha = false; //暂时不能获取验证码，进入倒计时
          this.$API
            .getRegisterCaptchaForH5({
              m: this.mobileNumber
            })
            .then(data => {
              this.interval = setInterval(() => {
                if (this.count-- <= 0) {
                  this.canCaptcha = true;
                  this.count = 60;
                  clearInterval(this.interval);
                }
              }, 1000);
            })
            .catch(err => {
              if (err.message == "手机号码已被注册，请直接登录") {
                this.hasRegister();
              } else {
                this.$super.toast.text(err.message);
                this.canCaptcha = true;
              }
            });
        }
      } else {
        this.$super.toast.text("请输入有效的手机号码");
      }
    }
  }
};
</script>
<!-- Add "scoped" attribute to limit CSS to this component only-->
<style lang="postcss">
</style>
