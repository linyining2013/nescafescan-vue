<template>
  <section>
    <section class="form-box">
      <header class="form-box-header">
        <p class="form-box-header__title">绑定超级课程表账号</p>
        <p class="form-box-header__tip">学习体验更佳，并有不定时福利</p>
      </header>
      <form name="login-form" v-on:submit.prevent="login()">
        <div class="form-group flex-parent">
          <label class="form-group__name">手机:</label>
          <div class="form-group-box flex-child">
            <input type="text" placeholder="请输入手机号码" class="form-group__control" name="mobileNumber" maxlength="11" v-on:blur="isMobile?'':($super.toast.text('请输入有效的手机号码'))" v-model.trim="mobileNumber" />
          </div>
        </div>
        <div class="form-group flex-parent" v-show="loginType ==2">
          <label class="form-group__name">密码:</label>
          <div class="form-group-box flex-child">
            <input type="password" placeholder="请输入密码" class="form-group__control" name="password" v-model.trim="password" maxlength="16" />
          </div>
        </div>
        <div class="form-group flex-parent" v-show="loginType == 1">
          <label class="form-group__name">验证码:</label>
          <div class="form-group-box flex-child">
            <input type="text" placeholder="请输入验证码" class="form-group__control" name="captcha" v-model.trim="captcha" maxlength="6" />
          </div>
          <button type="button" class="captcha-btn" :disabled="!canCaptcha || !isMobile" v-on:click="getCaptcha" v-html="captchaHtml">点击获取验证码</button>
        </div>

        <!-- <div class="account-box box">
          <input type="text" placeholder="请输入手机号码" class="input" name="mobileNumber" maxlength="11" v-on:blur="isMobile?'':($super.toast.text('请输入有效的手机号码'))" v-model.trim="submitData.mobileNumber" />
        </div> -->
        <!-- <div class="verification-box box" v-show="isVerification">
          <input type="text" placeholder="请输入图片验证码" class="input" name="verification" v-model.trim="submitData.verification" />
          <div class="verification">
            <img class="img" :src="'http://121.40.28.189:81/V2/StudentSkip/verification.action?mobileNumber='+ (isMobile?(mobileNumber = submitData.mobileNumber): mobileNumber) + '&v=' + verificationDate" />
            <button class="refresh-btn" type="button" v-on:click="(verificationDate = new Date().getTime())"></button>
          </div>
        </div> -->
        <!-- <div class="password-box box">
          <input :type="isPasswordInput?'password': 'text'" placeholder="请输入您的密码" class="input" name="password" v-model.trim="submitData.password" maxlength="16" />
          <button type="button" class="change-type-btn" @click="isPasswordInput = !isPasswordInput">{{isPasswordInput?"显示":"隐藏"}}</button>
        </div> -->
        <p class="submit-box">
          <button type="submit" class="submit-btn normal-btn" :disabled="(loginType == 2 && (!isMobile || !isPassword)) || (loginType == 1 && (!isMobile || !isCaptcha))">绑定</button>
        </p>
      </form>
    </section>
    <footer class="login-footer">
      <a class="login-footer__item" href="javascript:void(0)" @click="loginType = 3 - loginType">{{loginType == 1?"账号密码登录":"手机验证码登录"}}</a>&emsp;|&emsp;
      <router-link tag="a" class="login-footer__item" :to="{path: '/register', query: { id: routeQuery.id,name: routeQuery.name, type: routeQuery.type }}">注册</router-link>
    </footer>
  </section>
</template>

<script>
// import this.$API from "@/plugins/this.$API";

export default {
  props: ["formJson"],
  data() {
    return {
      // isVerification: false,
      // verificationDate: new Date().getTime(),
      // isPasswordInput: true,
      loginType: 1, //1为使用手机账号及验证码进行绑定，2为使用手机账号和账号密码进行绑定
      count: 60,
      canCaptcha: true,
      mobileNumber: "", //存放已经生成的验证码对应的手机号码
      password: "",
      captcha: "",
      routeQuery: { name: "", id: "" }
    };
  },
  mounted() {
    // if(this.$utils.cookie.get("identity")){
    //   // return window.location.href = '/';
    //   // console.log(this.$utils.cookie)
    //   console.log(this.$utils.cookie.get("mobileNumber").replace(/(\d{3})\d{4}(\d{4})/, '$1****$2'))
    // }
    this.routeQuery = this.$router.currentRoute.query;

    if (this.routeQuery.phone) {
      this.mobileNumber = this.routeQuery.phone;
    }
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
  methods: {
    getCaptcha() {
      if (this.isMobile) {
        if (this.canCaptcha) {
          this.canCaptcha = false; //暂时不能获取验证码，进入倒计时
          this.$API
            .getBindCaptchaForH5({
              mobileNumber: this.mobileNumber
            })
            .then(data => {
              this.$super.toast.text(data);
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
    },
    getDetail(fn) {
      this.routeQuery.type == 0
        ? this.$API
            .getCourseDetail({
              id: this.routeQuery.id
            })
            .then(data => {
              fn(data.course);
            })
        : this.$API
            .getDetailCombo({ comboId: this.routeQuery.id })
            .then(data => {
              fn(data);
            });
    },
    // getStudentInfo(identity) {
    //   let that = this;

    //   this.$API
    //     .getStudentInfo({
    //       identity: identity
    //     })
    //     .then(data => {
    //       that.$store.dispatch("updateUserinfo", data);

    //       if (data.student.isNeedAddEdu) {
    //         this.$router.replace("/Institute/schoolCard?type=1");
    //       }
    //       data.student.isInPractice == 1 &&
    //         // that.getTipsUnReadNum() &&
    //         setInterval(that.getTipsUnReadNum, 90 * 1000);
    //     });
    // },
    // getTipsUnReadNum() {
    //   let that = this;

    //   if (this.$router.history.current.name == "Home.me")
    //     this.$API.getTipsUnReadNum().then(data => {
    //       that.$store.state.user.unReadNum != data &&
    //         that.$store.dispatch("updateUnReadNum", data);
    //     });

    //   return true;
    // },
    login(isForceBind = false) {
      let that = this;
      let submitData = {
        mobileNumber: this.mobileNumber,
        type: this.loginType
      };

      if (this.loginType == 2) {
        submitData.password = this.password;
      } else {
        submitData.verification = this.captcha;
      }
      if (this.$utils.isWXBrowser) {
        submitData.isForceBind = isForceBind;
        submitData.unionId = this.$store.state.user.unionid;
        submitData.openId = this.$store.state.user.openid;
      }
      this.bindWXForH5(submitData);
    },
    bindWXForH5(submitData) {
      let that = this;
      this.$API.bindWXForH5(submitData).then(res => {
        if (res.status == 1) {
          // let data = res.data;
          // let identity = data;
          that.finishLogin(res.data);
          that.$emit("bindAccount", that.mobileNumber); //更新绑定账号
          that.$emit("updateAuthInfo"); //更新认证信息
        } else {
          that.failLogin(res);
        }
      });
    },
    failLogin(res) {
      let that = this;
      if (res.message == "账号或密码错误") {
        that.$super.toast.text(
          "账号或密码错误，忘记密码请下载超级课程表app修改"
        );
      } else if (res.code == 111) {
        that.$super.modalTip.show({
          type: "wxBind",
          content:
            "你的超表账户已有绑定的微信，继续绑定将解除你的账户和之前的微信的绑定，是否继续绑定？",
          onClose: res => {
            if (res == 1) {
              //重新绑定
              that.login(true);
            }
          }
        });
      } else {
        that.$super.toast.text(res.message);
      }
    },
    finishLogin(identity) {
      let that = this;

      console.log(identity);

      this.$utils.cookie.set("identity", identity, { expires: 30 });
      this.$store.dispatch("updateId", identity);

      if (that.routeQuery.name == "WXAuthor") {
        //微信认证
        return;
      } else {
        this.$super.toast.text("登录成功，正在为您跳转");
        // this.getStudentInfo(identity);
        if (that.routeQuery.id) {
          this.getDetail(courseInfo => {
            that.$store.dispatch("updateCourseInfo", courseInfo); //把当前支付信息存储起来
            

            if (
              that.$store.state.courseInfo.isBuy == 1 ||
              !that.$utils.isSuperBrowser ||
              !that.$utils.isWXBrowser
            ) {
              //判断课程是否已经购买
              //已经购买该课程
              if (that.$store.state.courseInfo.isBuy == 1)
                that.$super.modalTip.show({
                  type: "normal",
                  content:
                    "您已报名过该课程<br>搜索关注公众号“超级课程表第二大学”，学习更方便哦~",
                  close: true
                });
              that.$router.replace({
                name: that.routeQuery.name.replace(/_/g, "."),
                params: {
                  id: that.routeQuery.id,
                  type:
                    that.routeQuery.name == "payment"
                      ? that.routeQuery.type
                      : "",
                  pageNum: that.routeQuery.name == "Learning" ? 1 : ""
                }
              });
            } else {
              //未购买课程
              that.$router.replace({
                name: "payment",
                params: {
                  id: that.routeQuery.id,
                  type: that.routeQuery.type
                }
              });
            }
          });
        } else if (that.routeQuery.name) {
          that.$router.replace({
            name: that.routeQuery.name.replace(/_/g, ".")
          });
        } else {
          
          that.$router.replace({ name: "Home.me" });
        }
      }
    }
  }
};
</script>
<!-- Add "scoped" attribute to limit CSS to this component only-->
<style lang="postcss">
</style>
