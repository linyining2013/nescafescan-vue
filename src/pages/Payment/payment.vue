<template>
  <section id="payment-wrap">
    <header class="payment-title">
      <p class="payment-title__name">报名参加</p>
    </header>
    <section class="payment-course payment-box">
      <div class="payment-course__title">{{courseInfo.name}}</div>
      <div class="payment-course__price">￥{{(sellPrice/100).toFixed(2)}}</div>
    </section>
    <header class="payment-title">
      <p class="payment-title__name">支付方式</p>
    </header>
    <section class="payment-way payment-box" v-if="payWayBOs.length">
      <template v-for="payway in payWayBOs">
        <div :key="payway.payWayId">
          <input class="payment__radio payment-way__radio" :id="`payway-${payway.payWayId}`" type="radio" name="payway" :value="payway.payWayId" v-model.trim="payWayId" :data-checked="(payWayId == '' && payway.isDefault == 1 && (payWayId = payway.payWayId))" />
          <label :for="`payway-${payway.payWayId}`" class="payment-way-box payment-group" :class="[(payway.payWayId == 1? 'payment-way-wx': 'payment-way-ali')]">
            <div class="payment-way-box__name">
              <p class="payment-way-box__icon"></p>{{payway.name}}
            </div>
            <div class="payment-way-box__select payment-group__select"></div>
          </label>
        </div>
      </template>
    </section>
    <header class="payment-title payment-ticket payment-flex" v-if="coupons">
      <p class="payment-title__name">奖学金
        <!-- <label class="payment-ticket__num">{{coupons.length}}张可用</label> -->
      </p>
      <p class="payment-title__sider payment-title__discount">- ￥{{(coupons.discountAmount/100).toFixed(2)}}</p>
    </header>
    <section class="payment-line payment-box" v-if="coupons"></section>
    <header class="payment-title payment-pay payment-flex">
      <p class="payment-title__name">报名学费</p>
      <p class="payment-title__sider payment-title__price">￥{{(disSellPrice/100).toFixed(2)}}</p>
    </header>
    <section class="payment-agreement payment-box">
      <input class="payment__radio" id="agreement" type="checkbox" name="agreement" value="1" v-model.trim="agreement" />
      <label for="agreement" class="payment-group">
        <div class="payment-agreement__select payment-group__select"></div>
        我已经阅读并同意
        <router-link tag="span" :to="{path: '/agreement'}" class="payment-agreement__detail">《超级课程表第二大学课程用户付费协议》</router-link>
      </label>
    </section>
    <footer class="payment-footer">
      <button class="payment-footer__btn" @click="beforeCreateOrder()" :disabled="!agreement">确认报名</button>
    </footer>
  </section>
</template>

<script>
// import this.$API from "../../plugins/this.$API";
import jsuper from "exports-loader?jsuper!@/../node_modules/SuperBrowserLibs/dist/jsuperV2.js";
import wx from "weixin-js-sdk";
// import _ from "lodash";

// let defaultData = {
//   couponListShow: false, //优惠列表是否显示
//   createOrderShow: false, //创建订单是否显示
//   choicePaymentShow: false, //支付方式是否显示
//   sellPrice: 0, //销售价格
//   oriPrice: 0, //存储销售价格
//   coupons: [], //优惠券列表
//   selectedCoupon: null, //已选择的优惠券
//   payWayBOs: [], //支付方式
//   expandId: null, //记录展开的id
//   os: this.$utils.isSuperBrowser ? 0 : this.$utils.isWXBrowser ? 1 : 2 //支付平台 0: app 1：公众号 2：h5
// };

export default {
  data() {
    return {
      agreement: false,
      sellPrice: 0, //销售价格
      disSellPrice: 0, //折扣价
      coupons: "", //优惠券
      payWayId: "",
      payWayBOs: [],
      courseInfo: {},
      orderInfo: {
        courseId: this.$route.params.id,
        courseType: this.$route.params.type,
        os: this.$utils.isSuperBrowser ? 0 : this.$utils.isWXBrowser ? 1 : 2, //支付平台 0: app 1：公众号 2：h5,
        openId: ""
        // openId: this.orderInfo.os == 1 ? store.state.user.openid : ""
      },
      orderId: this.$router.currentRoute.query.orderId
    };
  },
  created() {
    if (this.$utils.isWXBrowser) {
      this.renderShare();
      setTimeout(() => {
        if (typeof WeixinJSBridge == "undefined") {
          if (document.addEventListener) {
            document.addEventListener(
              "WeixinJSBridgeReady",
              this.onBridgeReady,
              false
            );
          } else if (document.attachEvent) {
            document.attachEvent("WeixinJSBridgeReady", this.onBridgeReady);
            document.attachEvent("onWeixinJSBridgeReady", this.onBridgeReady);
          }
        } else {
          this.onBridgeReady();
        }
      }, 2000);
    }

    document.title = "订单支付";
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
    if (!this.$utils.isSuperBrowser && !this.$utils.isWXBrowser) {
      // this.$super.buyTip.show({
      //   type: "download",
      //   infoType: "notBuy",
      //   autoClose: false,
      //   onClose: res => {
      //     if (res == 1) {
      //       window.location.href = "http://www.super.cn/jump.php";
      //     } else {
      //       this.$utils.deepLinkTo();
      //     }
      //   }
      // });

      this.$super.modalTip.show({
        type: "download",
        content: `暂不支持站外报名，请下载超级课程表app或关注微信公众号“超级课程表第二大学”报名学习吧！`,
        autoHide: true,
        onClose: res => {
          if (res == 1) {
            window.location.href = "http://www.super.cn/jump.php";
          } else {
            this.$utils.deepLinkTo();
          }
        }
      });
    } else {
      let that = this;

      this.orderInfo.openId =
        this.orderInfo.os == 1 ? this.$store.state.user.openid : "";

      if (
        !this.$store.state.courseInfo ||
        this.$store.state.courseInfo.id != this.orderInfo.courseId
      ) {
        //重新获取课程信息
        this.getDetail(data => {
          this.courseInfo = data;
        });
      } else {
        this.courseInfo = this.$store.state.courseInfo;
      }

      if (this.orderId) {
        //重新购买

        this.$API.getOrderDetail({ orderId: this.orderId }).then(data => {
          let couponDiscountAmount = data.couponDiscountAmount;
          if (couponDiscountAmount) {
            this.coupons = { discountAmount: data.couponDiscountAmount };
          }
          this.disSellPrice = data.sellPrice;
          this.sellPrice = data.originPrice;
        });

        this.$API
          .getPayWays({ orderId: this.orderId, os: this.orderInfo.os })
          .then(data => {
            if (data) {
              this.payWayBOs = data;
            }
          });
      } else {
        this.$API.orderPreCreate(this.orderInfo).then(
          data => {
            if (data) {
              let coupons;
              if (data.coupons) {
                coupons = data.coupons[0];

                coupons && (this.coupons = coupons);
              }

              this.disSellPrice = coupons
                ? data.sellPrice - coupons.discountAmount
                : data.sellPrice;
              this.sellPrice = data.sellPrice;
              this.payWayBOs = data.payWayBOs;
            }
          },
          err => {
            if (err.message.indexOf("您已购买该商品") != -1) {
              this.$router.replace({ name: "Order.pay" });
              this.$super.toast.text("您已报名该课程");
            } else {
              this.$super.toast.text(err.message);
            }
          }
        );
      }
    }
  },
  // beforeDestroy() {
  //   this.$super.buyTip.hide();
  // },
  methods: {
    renderShare() {
      if (this.$utils.isSuperBrowser) {
        this.$utils.setShare();
      } else if (this.$utils.isWXBrowser) {
        this.$weixin.init();
      }
    },
    checkPayStatus(outTradeNo) {
      let that = this;
      this.$API
        .checkPayStatus({
          outTradeNo: outTradeNo
        })
        .then(data => {
          if (data.hasPay == 1) {
            this.$ba.trackEvent(
              "购买成功",
              `购买成功:id=${data.orderBO.courseId}`,
              `购买成功区:${
                this.$utils.isSuperBrowser
                  ? "表表"
                  : this.$utils.isWXBrowser ? "微信" : "外部浏览器"
              }`
            );

            //
            if (
              data.orderBO.courseId ==
              this.$store.state.user.data.practiceComboId
            ) {
              //购买训练营
              //
              
              // if (this.$utils.isWXBrowser) {
              //   this.$super.modalTip.show({
              //     type: "instituteWXPay",
              //     isMaskClicker: false,
              //     content: `<p class="icon" style="background: url(${require("@/assets/images/modal/headerIcon.png")}) 0 0 no-repeat;background-size: 104px 89px;width: 104px;height: 89px;margin: 0 auto 20px;"></p><p style="font-weight: bold;">你已经成功入学新媒体营销学院！</p><br/><p style="font-size: 12px;">目前正处于开班准备期<br/>请按照指示操作<br/>不然将无法参与学习</p>`,
              //     close: true,
              //     onClose: res => {
              //       //进入课程学习
              //     }
              //   });
              // } else {
              this.$store.dispatch("updateStudentNo", data.studentNo);
              this.$super.modalTip.show({
                type: "institutePay",
                isMaskClicker: false,
                content: `<p class="icon" style="background: url(${require("@/assets/images/modal/bingo.png")}) 0 0 no-repeat;background-size: 64px;width: 64px;height: 64px;margin: 0px auto 20px;"></p>
                    <div style="font-size: 15px;">
                    <p style="font-weight: bold">恭喜您成为第二大学新媒体营销学院学员，开始学习前：</p>
                    </div>`,
                renderData: {
                  studentNo: data.studentNo
                },
                onClose: res => {
                  //进入课程学习
                }
              });
              this.$router.push("/Institute/schoolCard");
              // }
            } else {
              if (this.$utils.isSuperBrowser) {
                this.$super.modalTip.show({
                  type: "superPay",
                  isMaskClicker: false,
                  close: true,
                  content: `<p class="icon" style="background: url(${require("@/assets/images/bingo.png")}) 0 0 no-repeat;background-size: 38px;width: 38px;height: 38px;margin: 0px auto 10px;"></p><p><span style="font-size: 0.373333rem;">恭喜你</span><br/>你已报名该课程</p>`,
                  onClose: res => {
                    //进入课程学习
                    that.$router.push(
                      (data.orderBO.courseType == 0
                        ? "/course/"
                        : "/package/") + data.orderBO.courseId
                    );
                  }
                });
              } else {
                this.$super.modalTip.show({
                  type: "otherPay",
                  isMaskClicker: false,
                  close: true,
                  content: `<p class="icon" style="background: url(${require("@/assets/images/bingo.png")}) 0 0 no-repeat;background-size: 38px;width: 38px;height: 38px;margin: 0px auto 10px;"></p><p style="font-size: 0.453333rem;">报名成功<br/><br/><span style="font-size: 0.373333rem;">你已成功报名该课程，搜索关注公众号“超级课程表第二大学”，学习更方便哦~</span></p>`,
                  onClose: res => {}
                });
              }

              this.$router.replace({ name: "Order.pay" });
            }
          } else {
            this.$router.replace({ name: "Order.unpay" });
            this.$super.toast.text("支付失败~");
          }
          // this.$nextTick(() => {
          //   this.$emit("on-hide");
          // });
        });
    },
    onPayBridge(paywayId, data) {
      if (this.$utils.isSuperBrowser) {
        let nativePayMethod = paywayId === 1 ? "wxpay" : "alipay";
        jsuper[nativePayMethod]({
          data: {
            orderInfo: JSON.stringify(data.paymentInfoBO)
          },
          fail: message => {
            this.$super.toast.text(message);
          }
        });
      } else if (this.$utils.isWXBrowser) {
        //微信支付
        // this.onBridgeReady(data.paymentInfoBO.wxPrePayInfoBO);
        // let wxPrePayInfoBO = data.paymentInfoBO.wxPrePayInfoBO;
        this.onBridgeReady(data.paymentInfoBO.wxPrePayInfoBO);
        // wx.chooseWXPay({
        //   timestamp: wxPrePayInfoBO.timestamp, // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
        //   nonceStr: wxPrePayInfoBO.noncestr, // 支付签名随机串，不长于 32 位
        //   package: wxPrePayInfoBO.packaging, // 统一支付接口返回的prepay\_id参数值，提交格式如：prepay\_id=\*\*\*）
        //   signType: wxPrePayInfoBO.signType, // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
        //   paySign: wxPrePayInfoBO.sign, // 支付签名
        //   success: res => {
        //   },
        //   fail: res => {
        //     this.$super.toast.text("取消支付");
        //   }
        // });
      } else {
        //H5  支付
      }
      // this.$super.buyTip.show({
      //   type: "buyTip",
      //   isMaskClicker: false,
      //   onClose: res => {
      //     if (res == 1) {
      //       this.checkPayStatus(data.outTradeNo);
      //     } else {
      //       //取消支付
      //       // window.location.reload();
      //     }
      //   }
      // });
      this.$super.modalTip.show({
        type: "buyTip",
        content: `<p>请确认是否完成了支付</p>`,
        isMaskClicker: false,
        onClose: res => {
          if (res == 1) {
            this.checkPayStatus(data.outTradeNo);
          } else {
            //取消支付
            // window.location.reload();
          }
        }
      });

      // this.$emit("on-pay", data);
      // this.hide();
    },
    onBridgeReady(wxPrePayInfoBO) {
      WeixinJSBridge.invoke(
        "getBrandWCPayRequest",
        {
          appId: wxPrePayInfoBO.appId, //公众号名称，由商户传入
          timeStamp: wxPrePayInfoBO.timestamp, //时间戳，自1970年以来的秒数
          nonceStr: wxPrePayInfoBO.noncestr, //随机串
          package: wxPrePayInfoBO.packaging,
          signType: wxPrePayInfoBO.signType, //微信签名方式：
          paySign: wxPrePayInfoBO.sign //微信签名
        },
        function(res) {
          // if (res.err_msg == "get_brand_wcpay_request:ok") {
          // } // 使用以上方式判断前端返回,微信团队郑重提示：res.err_msg将在用户支付成功后返回    ok，但并不保证它绝对可靠。
        }
      );
    },
    beforeCreateOrder() {
      let that = this;

      if (
        this.orderInfo.courseId == this.$store.state.user.data.practiceComboId
      ) {
        //训练营
        if (this.courseInfo.online == 2) {
          // this.$super.buyTip.show({
          //   type: "normal",
          //   isMaskClicker: false,
          //   infoType: "practice"
          // });
          this.$super.modalTip.show({
            type: "normal",
            isMaskClicker: false,
            close: true,
              content: `<p>第二大学新媒体营销学院第一期已人满开学，第二期招生即将开始，报名请添加老师QQ进行咨询<br><br><a href="http://qm.qq.com/cgi-bin/qm/qr?k=AZSeJFeG94UoXChnm8VqYCsq5KENCkaC" style="color: #3a64a6;background: #3a64a6;line-height: .88rem;border: .04rem solid #3a64a6;border-radius: .5rem;height: .88rem;color:#fff;display:inline-block;width: 40%">点击咨询</a></p>`,
          });

          return false;
        }
      }

      this.createOrder();
    },
    createOrder() {
      this.orderInfo.payWay = this.payWayId;
      if (this.orderId) {
        this.$API
          .dualCreate({
            orderId: this.orderId,
            payWay: this.orderInfo.payWay,
            os: this.orderInfo.os,
            openId: this.orderInfo.openid
          })
          .then(data => this.onPayBridge(this.payWayId, data))
          .catch(res => {
            this.$super.toast.text(res.message);
            // this.hide();
          });
      } else {
        this.coupons && (this.orderInfo.couponId = this.coupons.id);

        this.$API
          .orderCreate(this.orderInfo)
          .then(data => {
            // setTimeout(() => {
            //   router.push(`/order`);
            // }, 500);
            this.onPayBridge(this.payWayId, data);
          })
          .catch(res => {
            this.$super.toast.text(res.message);
            // this.hide();
          });
      }
    },
    getDetail(fn) {
      this.orderInfo.courseType == 1
        ? this.$API
            .getDetailCombo({ comboId: this.orderInfo.courseId })
            .then(data => {
              fn(data);
            })
        : this.$API
            .getCourseDetail({
              id: this.orderInfo.courseId
            })
            .then(data => {
              fn(data.course);
            });
    }
  },
  watch: {}
};
</script>
<!-- Add "scoped" attribute to limit CSS to this component only-->
<style lang="postcss" scoped>
@import "../../styles/common.pcss";
@import "../../styles/payment/payment.pcss";

#agreement-word-wrap {
  font-family: Sans-serif;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
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
