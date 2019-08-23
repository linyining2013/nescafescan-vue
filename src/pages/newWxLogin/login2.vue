<template>
  <section>
    <section class="form-box2" v-if="isBind === 0">
      <!-- <header class="form-box-header">
        <p class="form-box-header__title">绑定超级课程表账号</p>
        <p class="form-box-header__tip">学习体验更佳，并有不定时福利</p>
      </header> -->
      <form name="login-form" v-on:submit.prevent="login()">
        <div class="form-group flex-parent">
          <div class="form-group-box flex-child">
            <input type="text" placeholder="请输入手机号" class="form-group__control" name="mobileNumber" maxlength="11" v-on:blur="isMobile?'':($super.toast.text('请输入有效的手机号码'))" v-model.trim="mobileNumber" />
          </div>
        </div>
        <!-- <div class="form-group flex-parent" v-show="loginType ==2">
          <label class="form-group__name">密码:</label>
          <div class="form-group-box flex-child">
            <input type="password" placeholder="请输入密码" class="form-group__control" name="password" v-model.trim="password" maxlength="16" />
          </div>
        </div> -->
        <div class="form-group flex-parent" v-show="loginType == 1">
          <div class="form-group-box flex-child">
            <input type="text" placeholder="请输入验证码" class="form-group__control" name="captcha" v-model.trim="captcha" maxlength="6" />
          </div>
          <button type="button" class="captcha-btn" :class="{'captcha-false': !canCaptcha}" :disabled="!canCaptcha" v-on:click="getCaptcha" v-html="captchaHtml">获取验证码</button>
        </div>
        <div class="title-box">
          <p>1.如果您是超级课程表APP的注册用户，强烈建议您绑定相同手机账号，才可以把在APP已购买的课程同步到微信观看。</p>
          <p>2.如果您没有注册过超级课程表APP，绑定手机号后可同时在超级课程表APP或微信观看课程，也可以点击“跳过”直接购买课程。</p>
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
          <button type="submit" class="submit-btn" :class="{'ds-submit': (!isMobile || !isCaptcha)}" :disabled="(loginType == 2 && (!isMobile || !isPassword)) || (loginType == 1 && (!isMobile || !isCaptcha))">提交绑定</button>
        </p>
        <!-- <p class="swap-box">
          <button type="button" @click="swapLogin" class="swap">跳过</button>
        </p> -->
      </form>
    </section>
    <section class="model-box" v-show="nowSuccess">
      <div class="content-box">
        <img :src="require('@/assets/images/newWxLogin/phone@3x.png')">
        <div class="font-box">
          <p class="p1">绑定超级课程表账号成功！</p>
          <p>当前绑定账号：{{codePhone}}</p>
        </div>
      </div>
      <div class="bg"></div>
    </section>
    <section class="bind-success" v-if="isBind === 1">
      <img :src="require('@/assets/images/newWxLogin/phone@3x.png')">
      <div class="content-font">
        <p class="p1">绑定超级课程表账号成功！</p>
        <p v-if="nickname">当前绑定账号：{{nickname}}</p>
        <p v-if="!nickname">当前绑定账号：{{mobileNumber}}</p>
        <p v-if="nickname">{{mobileNumber}}</p>
      </div>
      <button type="button" @click="goMe" class="btn1">确定</button>
    </section>
    <!-- <footer class="login-footer">
      <a class="login-footer__item" href="javascript:void(0)" @click="loginType = 3 - loginType">{{loginType == 1?"账号密码登录":"手机验证码登录"}}</a>&emsp;|&emsp;
      <router-link tag="a" class="login-footer__item" :to="{path: '/register', query: { id: routeQuery.id,name: routeQuery.name, type: routeQuery.type }}">注册</router-link>
    </footer> -->
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
      canCaptchaFont: '获取验证码',
      mobileNumber: "", //存放已经生成的验证码对应的手机号码
      password: "",
      captcha: "",
      routeQuery: { name: "", id: "" },
      bindSuccess: false,
      nowSuccess: false,
      isThree: false,
      isBind: 0,
      nickname: '',
      regist: {
        count: 3,
        isSuccess: false,
        isShow: false,
        timeout: null
      },
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
    // this.isBand()
    if (this.$utils.isWXBrowser) {
      this.isBand()      
    }
  },
  computed: {
    captchaHtml() {
      return this.canCaptcha ? this.canCaptchaFont : `${this.count}s`;
    },
    isCaptcha() {
      return /^([A-Z0-9a-z]{6})$/.test(this.captcha);
    },
    isMobile() {
      return /^([1][0-9]{10})$/.test(this.mobileNumber);
    },
    isPassword() {
      return /^[A-Z0-9a-z~!@#$%^&*_+-=.?]{6,16}$/.test(this.password);
    },
    codePhone() {
      return `${this.mobileNumber.substring(0, 3)}****${this.mobileNumber.substring(7)}`;
    }
  },
  methods: {
    isBand () {
      // 打通代码1
      //测试代码
      var chars = ['0','1','2','3','4','5','6','7','8','9','A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];
      function generateMixed(n) {
         var res = "";
         for(var i = 0; i < n ; i ++) {
           var id = Math.ceil(Math.random()*35);
           res += chars[id];
         }
         return res;
      }
      // if (!this.$utils.isWXBrowser) {
      //   this.$store.dispatch("updateUnionId", 'RRIB6OOMDBWTNW8PEMK1P75O2BJO');
      //   this.$store.dispatch("updateOpenId", 'PWN6CALURCLQ4UJBHWNOCXK3JUGG');
      //   this.$store.dispatch("updateAvatarUrl", 'http://himg.bdimg.com/sys/portrait/item/2bde7275626973686b6164656e6745aa.jpg');
      // }
      //测试代码
      this.$API.newGetIdentity({
        openId: this.$store.state.user.openid,
        unionId: this.$store.state.user.unionid,
        nickname: this.$store.state.user.nickname,
        avatarUrl: this.$store.state.user.avatarUrl,
        gender: this.$store.state.user.gender
      }).then(res => {
        this.$utils.cookie.set("identity", res.identity, { expires: 30 });
        this.$store.dispatch("updateId", res.identity);
        if (res.isBind == 1) {
          this.isBind = 1
          this.$API.getStudentInfo({
            identity: res.identity
          }).then(data => {
            this.nickname = data.student.nickName;
            this.mobileNumber = data.student.mobileNumber;
          })
        }
      })
    },
    getCaptcha() {
      if (this.isMobile) {
        if (this.canCaptcha) {
          this.canCaptcha = false; //暂时不能获取验证码，进入倒计时
          // this.$API.newGetCaptcha({
          //   m: this.mobileNumber
          // }).then(data => {
          //   console.log(data, 1)
          //   this.interval = setInterval(() => {
          //     if (this.count-- <= 0) {
          //       this.canCaptchaFont = '重新发送'
          //       this.canCaptcha = true;
          //       this.count = 60;
          //       clearInterval(this.interval);
          //     }
          //   }, 1000);
          // }).catch(e => {
          //   console.log(e, 2)
          //   this.canCaptcha = true;            
          // })
          //旧的获取验证码
          this.$API
            .getBindCaptchaForH5({
              mobileNumber: this.mobileNumber
            })
            .then(data => {
              this.isThree = false;
              this.$super.toast.text(data);
              this.interval = setInterval(() => {
                if (this.count-- <= 0) {
                  this.canCaptchaFont = '重新发送'
                  this.canCaptcha = true;
                  this.count = 60;
                  clearInterval(this.interval);
                }
              }, 1000);
            })
            .catch(err => {
              // if (err.message == "手机号码已被注册，请直接登录") {
              //   this.hasRegister();
              // } else {
              // this.$super.toast.text(err.message);
              // this.canCaptcha = true;
              // }
              if (err.message == "你的操作太频繁了，请稍后再试。") {
                this.$super.toast.text(err.message);
                this.canCaptcha = true;
              }
              //新增的注册代码
             if (err.name == 3) {
              this.$API.getRegisterCaptchaForH5({
                m: this.mobileNumber
              })
              .then(data => {
                this.isThree = true;
                this.$super.toast.text(data);
                this.interval = setInterval(() => {
                  if (this.count-- <= 0) {
                    this.canCaptcha = true;
                    this.count = 60;
                    clearInterval(this.interval);
                  }
                }, 1000);
              }).catch(err => {
                  this.$super.toast.text(err.message);
                  this.canCaptcha = true;
                });
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
      if (!this.isThree) {
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
        } else {
          // 模拟非微信的微信绑定
          submitData.isForceBind = isForceBind;
          submitData.unionId = this.$store.state.user.unionid;
          submitData.openId = this.$store.state.user.openid;
        }
        this.bindWXForH5(submitData);
      } else {
        var chars = ['0','1','2','3','4','5','6','7','8','9','A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];
        function generateMixed(n) {
           var res = "";
           for(var i = 0; i < n ; i ++) {
             var id = Math.ceil(Math.random()*35);
             res += chars[id];
           }
           return res;
        }
        // 新增注册代码
        this.$API
        .registerForH5({
          mobileNumber: this.mobileNumber,
          captcha: this.captcha,
          unionId: this.$store.state.user.unionid,
          openId: this.$store.state.user.openid,
          password: generateMixed(15)
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
      }
    },
    finishRegist(identity, isSuccess = true) {  //新增注册的结束代码
      this.regist = {
        count: 3,
        isSuccess: isSuccess,
        isShow: true,
        timeout: null
      };
      this.nowSuccess = true;
      this.$store.dispatch("updateId", identity);
      this.$API.getStudentInfo({
        identity: identity
      }).then(data => {
        this.$store.dispatch("updateUserinfo", data);        
      });
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
              setTimeout(() => {
                this.$router.replace({ name: "Home.me" });
              }, 3000)
              // this.$router.replace({ name: "Home.index.course" });
            }
          } else {
            window.location.reload();
          }
        }
      }, 1000);
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
      this.nowSuccess = true;
      this.$API.getStudentInfo({
        identity: identity
      }).then(data => {
        this.$store.dispatch("updateUserinfo", data);      
      })

      if (that.routeQuery.name == "WXAuthor") {
        //微信认证
        return;
      } else {
        // this.$super.toast.text("登录成功，正在为您跳转");
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
          setTimeout(() => {
            that.$router.replace({ name: "Home.me" });
          }, 3000)
        }
      }
    },
    swapLogin () {
      this.$router.replace("/course")
    },
    goMe () {
      this.$router.replace({ name: "Home.me" })      
    }
  }
};
</script>
<!-- Add "scoped" attribute to limit CSS to this component only-->
<style lang="postcss">
.form-box2 {
  padding: 0 40px;
  .form-group {
    border-bottom: 1px solid #EBEBEB;
    margin-top: 40px;
    align-items: center;
    .form-group-box {
      height: 120px;
      input {
        height: 120px;
        background: transparent;
        border: 0;
        font-size: 32px;
        color: #999999;
        width: 100%;
      }
    }
    .captcha-btn {
      width: 170px;
      height: 64px;
      background: #60ABFF;
      border-radius: 32px;
      border: 0;
      font-size: 24px;
      color: #fff;
    }
    .captcha-false {
      background: #fff;
      border: 1px solid #DBDBDB;
      color: #999999;
    }
  }
  .title-box {
    padding: 58px 10px;
    p {
      font-size: 28px;
      color: #999;
      line-height: 40px;
      margin-bottom: 40px;
    }
  }
  .submit-box {
    text-align: center;
    .submit-btn {
      height: 96px;
      width: 600px;
      border-radius: 48px;
      background: #60ABFF;
      border: 0;
      font-size: 32px;
      color: #fff;
    }
    .ds-submit {
      opacity: .5;
    }
  }
  .swap-box {
    padding: 48px 0;
    .swap {
      border: 0;
      height: 42px;
      font-size: 30px;
      color: #666;
      background: transparent;
      width: 100%;
    }
  }
}
.bind-success {
  padding-top: 102px;
  img {
    display: block;
    width: 120px;
    margin: 0 auto 60px auto;
  }
  .content-font {
    text-align: center;
    p {
      padding: 12px 0;
      color: #999;
      font-size: 28px;
      display: block;
    }
    .p1 {
      padding: 0 0 12px 0;
      font-size: 36px;
      font-weight: 600;
      color: #666;
    }
  }
  .btn1 {
    height: 96px;
    width: 600px;
    border-radius: 48px;
    background: #60ABFF;
    border: 0;
    font-size: 32px;
    color: #fff;
    margin: 72px auto;
    display: block;
  }
}
.model-box {
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 100;
  background: rgba(0,0,0,0.40);
  .content-box {
    background: #fff;
    padding: 64px 0;
    width: 90%;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    border-radius: 20px;
    z-index: 101;
    img {
      display: block;
      margin: 0 auto 60px auto;
      width: 120px;
    }
    .font-box {
      text-align: center;
      .p1 {
        color: #666666;
        font-size: 36px;
        line-height: 50px;
        padding-bottom: 26px;
      }
      p {
        color: #999999;
        font-size: 28px;
        line-height: 40px;
      }
    }
  }
  .bg {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 100;
  }
}
</style>
