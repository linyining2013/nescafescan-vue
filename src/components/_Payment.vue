<template>
  <transition name="fade">
    <div v-show="show" class="payment-container">
      <div @click="maskClickHandler" v-on:touchmove="maskTouchMove" class="mask"></div>
      <transition-group name="payment-slideup">
        <div key="createOrderSlide" v-show="createOrderShow" class="payment-submit-order">
          <div @click="showCouponList" :class="{'coupon-cell_has':coupons.length>0}" class="coupon-cell cell">
            优惠券
            <span v-if="!selectedCoupon" class="cell-right">
              {{coupons.length}}张优惠券可用
            </span>
            <span v-if="selectedCoupon && selectedCoupon.discountType===1" class="coupon-name cell-right">
              {{ceil(selectedCoupon.discountAmount/100,2)}}元的{{selectedCoupon.title}}
            </span>
            <span v-if="selectedCoupon && selectedCoupon.discountType===2" class="coupon-name cell-right">
              {{selectedCoupon.discount}}折{{selectedCoupon.title}}
            </span>
          </div>
          <div class="total-pay-cell cell">
            应付总额
            <span class="cell-right">
              &yen; {{(sellPrice*0.01).toFixed(2)}}
            </span>
          </div>
          <div class="cell btn-cell">
            <button @click="submitOrder" class="btn">提交订单</button>
          </div>
        </div>
        <div key="choicePaymen" v-show="choicePaymentShow" class="payment-choice-payment">
          <div @click="createOrder(payway.payWayId)" v-for="payway in payWayBOs" :key="'payway_'+payway.payWayId" class="cell cell_islink">
            <img class="icon" :src="require('@/assets/images/payment/pay-way_'+payway.payWayId+'.png')" alt=""> {{payway.name}}
          </div>

        </div>
      </transition-group>
      <div v-show="couponListShow" v-on:touchstart="scrollFix" ref="couponList" class="payment-coupon-list">
        <template v-if="coupons.length">
          <button @click="cancleUseCoupon" class="btn-no-coupon">不使用优惠券</button>
          <div class="payment-coupon-box">
            <div @click="selectCoupon(coupon)" :class="{'coupon-item_price':coupon.discountType===1}" v-for="coupon in coupons" :key="coupon.id" class="coupon-item ">
              <div class="coupon-item_header">
                <div class="coupon-item_discount">
                  <template v-if="coupon.discountType===1">
                    <span class="value">{{floor(coupon.discountAmount / 100)}}.</span>
                    <!-- ceil(selectedCoupon.discountAmount/100,2) -->
                    <span class="small">{{padStart(ceil(coupon.discountAmount % 100))}}元</span>
                  </template>
                  <template v-if="coupon.discountType===2">
                    <span class="value">{{floor(coupon.discount)}}.</span>
                    <span class="small">{{padStart(ceil(coupon.discount*100 % 100))}}折</span>
                  </template>
                </div>
                <div class="coupon-item_info">
                  <p class="name">{{coupon.title}}</p>
                  <p class="deadline">有效期至{{$utils.dateFormat(coupon.limitedTime, 'yyyy-mm-dd')}}
                    <span> · 课程{{coupon.courseType == 1? '套餐':''}}专用券</span>
                  </p>
                </div>
                <div v-if="coupon === selectedCoupon" class="coupon-item_selected"></div>
              </div>
              <div class="coupin-item_footer">
                <ul class="restriction-list restriction-list_full" :class="[{'slideup': !(expandId == coupon.id)},setSlide(coupon)]" @click.prevent.stop="expandId = (expandId != coupon.id?coupon.id: null)">
                  <li v-if="!coupon.quota && !coupon.limitMessageCou && !coupon.limitMessageCaTe">
                    无门槛使用
                  </li>
                  <li v-if="coupon.quota">
                    满{{ceil(coupon.quota/100,2)}}可用
                  </li>
                  <li v-if="coupon.limitMessageCaTe">
                    本券限{{splitLimitMessage(coupon.limitMessageCaTe,'，','【','】')}}课程类型使用
                  </li>
                  <li v-if="coupon.limitMessageCou">
                    本券限{{splitLimitMessage(coupon.limitMessageCou,',','《','》')}}课程使用
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </template>
        <template v-else>
          <div class="no-coupon-wrap">
            <header></header>
            <p>您还没有优惠券哦~</p>
            <button @click="cancleUseCoupon">返回支付</button>
          </div>
        </template>
      </div>
    </div>
  </transition>
</template>


<script>
import _ from "lodash";
// import this.$API from "../plugins/this.$API";
import Vue from "vue";
import jsuper from "exports-loader?jsuper!@/../node_modules/SuperBrowserLibs/dist/jsuperV2.js";
import store from "../vuex/store";
import wx from "weixin-js-sdk";
import router from "./../router";

const ua = navigator.userAgent.toLowerCase(),
  isSuperBrowser = !!~ua.indexOf("superfriday"),
  isWXBrowser = !!~ua.indexOf("micromessenger");

// let checkPayStatusDelay = 1000;
// let checkPayTimes = 0;

let defaultData = {
  couponListShow: false, //优惠列表是否显示
  createOrderShow: false, //创建订单是否显示
  choicePaymentShow: false, //支付方式是否显示
  sellPrice: 0, //销售价格
  oriPrice: 0, //存储销售价格
  coupons: [], //优惠券列表
  selectedCoupon: null, //已选择的优惠券
  payWayBOs: [], //支付方式
  // tomeout: null, //记录计时时间
  expandId: null, //记录展开的id
  os: isSuperBrowser ? 0 : isWXBrowser ? 1 : 2 //支付平台 0: app 1：公众号 2：h5
};

export default {
  data() {
    return _.extend({}, defaultData, { isRepay: false });
  },
  props: {
    courseId: Number,
    orderId: Number,
    identity: Number,
    courseType: Number,
    action: {
      type: String,
      default: ""
    },
    show: {
      type: Boolean,
      default: false
    },
    loginData: Object,
    payWayBO: {
      type: Array,
      default: function() {
        return [];
      }
    }
  },
  created() {
    // if (isWXBrowser)
    //   if (typeof WeixinJSBridge == "undefined") {
    //     if (document.addEventListener) {
    //       document.addEventListener(
    //         "WeixinJSBridgeReady",
    //         this.onBridgeReady,
    //         false
    //       );
    //     } else if (document.attachEvent) {
    //       document.attachEvent("WeixinJSBridgeReady", this.onBridgeReady);
    //       document.attachEvent("onWeixinJSBridgeReady", this.onBridgeReady);
    //     }
    //   }
  },
  methods: {
    setSlide: function(data) {
      //滚动
      var quota = data.quota > 0 ? 1 : 0;
      var limitMessageCou = data.limitMessageCou ? 1 : 0;
      var limitMessageCaTe = data.limitMessageCaTe ? 1 : 0;
      if (quota + limitMessageCou + limitMessageCaTe >= 2) {
        //两行以上
        return "slide-box";
      } else {
        let bw = document.body.clientWidth,
          h = (36 / 75 * bw / 10).toFixed(3), //rem => px 换算
          w = bw - (50 + 50 + 40 + 20) / 75 * bw / 10, // /10是因为尺寸750
          line = 2,
          foneSize = 24 / 75 * bw / 10 / 2, //单字节宽度
          len = (data.limitMessageCou + data.limitMessageCaTe).replace(
            /[^\x00-\xff]/g,
            "01"
          ).length, //双字节换算为单字节的长度
          max = parseInt(w * line / foneSize),
          lineHeight = 1.4 * foneSize * 2;
        if (h > lineHeight && len >= max) {
          return "slide-box";
        }
      }
    },
    padStart(data) {
      // return _.padStart.apply(_, arguments);
      return data.toString().padStart(2, 0);
    },
    floor() {
      return _.floor.apply(_, arguments);
    },
    ceil() {
      return _.ceil.apply(_, arguments);
    },
    /**
     * 查询订单
     */
    // clearTimeout() {
    //   this.tomeout && window.clearTimeout(this.tomeout);
    // },
    checkPayStatus(outTradeNo) {
      this.$API.checkPayStatus({
        outTradeNo: outTradeNo
      }).then(data => {
        if (data.hasPay == 1) {
          this.$ba.trackEvent(
            "购买成功",
            `购买成功:id=${data.orderBO.courseId},from=${router.history.current.query.from}`,
            `购买成功区:${this.$utils.isSuperBrowser ? "表表" : this.$utils.isWXBrowser ? "微信" : "外部浏览器"}`
          );
          router.replace(`/order/pay`);
          if (this.$utils.isSuperBrowser) {
            this.$super.buyTip.show({
              type: "superPay",
              isMaskClicker: false,
              onClose: res => {
                //进入课程学习
                router.push(
                  (data.orderBO.courseType == 0 ? "/course/" : "/package/") +
                    data.orderBO.courseId
                );
              }
            });
          } else {
            this.$super.buyTip.show({
              type: "otherPay",
              isMaskClicker: false,
              onClose: res => {}
            });
          }
        } else {
          this.$super.toast.text("支付失败~");
        }
        this.$nextTick(() => {
          this.$emit("on-hide");
        });
      });
      // this.tomeout = window.setTimeout(() => {
      // }, this.getCheckPayStatusDelay());
    },
    /**
     * 计数间隔
     */
    // getCheckPayStatusDelay() {
    //   //改改吧，前10次每一秒，之后
    //   return checkPayStatusDelay * _.ceil(++checkPayTimes / 10);
    //   // return checkStatusDelay;
    // },
    /**
     * 隐藏支付弹窗
     */
    hide() {
      this.show = false;
      this.action = "";
      this.couponListShow = false; //优惠列表是否显示
      this.createOrderShow = false; //创建订单是否显示
      this.choicePaymentShow = false; //支付方式是否显示
      this.selectedCoupon = null; //取消优惠券选择
    },
    /** 
     * 分割限制条件的方法
    */
    splitLimitMessage(str, sep, padStart, padEnd) {
      return _.reduce(
        str.split(sep),
        (result, value) => {
          return (result += padStart + value + padEnd);
        },
        ""
      );
    },
    /**
     * 显示优惠券
     */
    showCouponList() {
      this.couponListShow = true;
    },
    /**
     * 限制滑动
     */
    maskTouchMove(event) {
      event.preventDefault();
      event.stopPropagation();
    },
    /**
     * 点击遮罩
     */
    maskClickHandler() {
      this.hide();
    },
    /**
     * 选择优惠券
     */
    selectCoupon(coupon) {
      this.selectedCoupon = coupon;
      this.couponListShow = false;
    },
    /**
     * 取消选择优惠券
     */
    cancleUseCoupon() {
      this.selectedCoupon = null;
      this.couponListShow = false;
    },
    /**
     * 创建订单
     */
    createOrder(paywayId) {
      this.choicePaymentShow = false;

      if (this.action == "choicePayment") {
        //重新支付
        this.$API.dualCreate({
          orderId: this.orderId,
          payWay: paywayId,
          os: this.os,
          openId: this.os == 1 ? store.state.user.openid : ""
        })
          .then(data => this.onPayBridge(paywayId, data))
          .catch(res => {
            this.$super.toast.text(res.message);
            this.hide();
          });
      } else {
        // this.$store.dispatch("updateOrderInfo", this.course);//把当前支付信息存储起来
        this.$API.orderCreate({
          courseId: this.courseId,
          payWay: paywayId,
          courseType: this.courseType || 0,
          couponId: this.selectedCoupon ? this.selectedCoupon.id : null,
          os: this.os,
          openId: this.os == 1 ? store.state.user.openid : ""
        })
          .then(data => {
            setTimeout(() => {
              router.push(`/order`);
            }, 500);
            this.onPayBridge(paywayId, data);
          })
          .catch(res => {
            this.$super.toast.text(res.message);
            this.hide();
          });
      }
    },
    onPayBridge(paywayId, data) {
      if (isSuperBrowser) {
        let nativePayMethod = paywayId === 1 ? "wxpay" : "alipay";
        jsuper[nativePayMethod]({
          data: {
            orderInfo: JSON.stringify(data.paymentInfoBO)
          },
          fail: message => {
            this.$super.toast.text(message);
          }
        });
      } else if (isWXBrowser) {
        //微信支付
        // this.onBridgeReady(data.paymentInfoBO.wxPrePayInfoBO);
        let wxPrePayInfoBO = data.paymentInfoBO.wxPrePayInfoBO;

        wx.chooseWXPay({
          timestamp: wxPrePayInfoBO.timestamp, // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
          nonceStr: wxPrePayInfoBO.noncestr, // 支付签名随机串，不长于 32 位
          package: wxPrePayInfoBO.packaging, // 统一支付接口返回的prepay\_id参数值，提交格式如：prepay\_id=\*\*\*）
          signType: wxPrePayInfoBO.signType, // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
          paySign: wxPrePayInfoBO.sign, // 支付签名
          success: res => {
            //   alert(JSON.stringify(res));
          },
          fail: res => {
            this.$super.toast.text("取消支付");
          }
        });
      } else {
        //H5  支付
        // this.$utils.cookie.set("checkBuy", 2);
        // this.$utils.cookie.set("outTradeNo", data.outTradeNo);
        // window.location.href =
        //   data.paymentInfoBO.wxPrePayInfoBO.mwebUrl;
        //  +
        // "&redirect_url=" +
        // encodeURIComponent("http://test.ke.super.cn/?#/order");
        // window.location.href =
        //   "weixin://wap/pay?" +
        //   encodeURIComponent(
        //     `appid=${data.paymentInfoBO.wxPrePayInfoBO.appId}&noncestr=${data
        //       .paymentInfoBO.wxPrePayInfoBO.noncestr}&package=${data
        //       .paymentInfoBO.wxPrePayInfoBO.packaging}&prepayid=${data
        //       .paymentInfoBO.wxPrePayInfoBO.prepayId}&sign=${data.paymentInfoBO
        //       .wxPrePayInfoBO.sign}&timestamp=${data.paymentInfoBO
        //       .wxPrePayInfoBO.timestamp}`
        //   );
      }
      // if (this.$utils.isSuperBrowser) {
      //       this.$utils.setShare(this.course);
      //     } else if (this.$utils.isWXBrowser) {
      //       this.$weixin.init(this.course);
      //     }

      // checkPayTimes = 0;
      // this.clearTimeout();
      // this.checkPayStatus(data.orderId);
      this.$super.buyTip.show({
        type: "buyTip",
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

      this.$emit("on-pay", data);
      this.hide();
    },
    // onBridgeReady(wxPrePayInfoBO) {
    //   let data = {
    //     appId: wxPrePayInfoBO.appId, //公众号名称，由商户传入
    //     timeStamp: wxPrePayInfoBO.timestamp, //时间戳，自1970年以来的秒数
    //     nonceStr: wxPrePayInfoBO.noncestr, //随机串
    //     package: wxPrePayInfoBO.packaging,
    //     signType: wxPrePayInfoBO.signType, //微信签名方式：
    //     paySign: wxPrePayInfoBO.sign //微信签名
    //   };
    //   wx.chooseWXPay({
    //     timestamp: wxPrePayInfoBO.timestamp, // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
    //     nonceStr: wxPrePayInfoBO.noncestr, // 支付签名随机串，不长于 32 位
    //     package: wxPrePayInfoBO.packaging, // 统一支付接口返回的prepay\_id参数值，提交格式如：prepay\_id=\*\*\*）
    //     signType: wxPrePayInfoBO.signType, // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
    //     paySign: wxPrePayInfoBO.sign, // 支付签名
    //     success: function(res) {
    //       //   alert(JSON.stringify(res));
    //     }
    //   });
    // WeixinJSBridge.invoke("getBrandWCPayRequest", data, res => {
    //   alert(JSON.stringify(res))
    //   if (res.err_msg == "get_brand_wcpay_request:ok") {
    //     this.$super.buyTip.show({
    //       type: "buyTip",
    //       onClose: res => {
    //         if (res) {
    //           //支付成功
    //         } else {
    //           //支付失败
    //         }
    //       }
    //     });
    //   }// 使用以上方式判断前端返回,微信团队郑重提示：res.err_msg将在用户支付成功后返回    ok，但并不保证它绝对可靠。
    // });
    // },

    /**
     * 提交订单
     */
    submitOrder() {
      this.createOrderShow = false;
      this.choicePaymentShow = true;
    },
    /**
     * 创建订单前请求
     */
    //store.state.user.openid
    fetchPreCreateOrder() {
      // this.clearTimeout();
      this.$API.orderPreCreate({
        courseId: this.courseId,
        courseType: this.courseType || 0,
        os: this.os,
        openId: this.os == 1 ? store.state.user.openid : ""
      }).then(
        data => {
          this.coupons = data.coupons || [];
          this.sellPrice = data.sellPrice;
          this.oriPrice = data.sellPrice;
          this.createOrderShow = true;
          this.payWayBOs = data.payWayBOs;
        },
        err => {
          this.show = false;
          this.$super.toast.text(err.message);
        }
      );
    },
    scrollFix() {
      let $el = this.$refs.couponList;
      if ($el.scrollTop === 0) {
        $el.scrollTop += 1;
      } else if ($el.scrollTop + $el.offsetHeight >= $el.scrollHeight) {
        $el.scrollTop -= 1;
      }
    }
  },
  watch: {
    action(value) {
      if (value === "createOrder") {
        this.isRepay = false;
        this.fetchPreCreateOrder();
      } else if (value == "choicePayment") {
        this.isRepay = true;
        this.payWayBOs = this.payWayBO;
        this.submitOrder();
      }
    },
    show(value) {
      if (!value) {
        _.extend(this.$data, defaultData);

        // _.map(defaultData, (v, k) => {
        //   console.log(k + " : " + v);
        //   this[k] = v;
        // });
      }
    },
    selectedCoupon(coupon) {
      if (coupon) {
        this.$API.getSellPriceX({
          courseId: this.courseId,
          couponId: coupon.id,
          courseType: this.courseType || 0,
          os: this.os,
          openId: this.os == 1 ? store.state.user.openid : ""
        })
          .then(data => {
            if (!data.isUsable) {
              this.selectedCoupon = null;
              this.$super.toast.text("该优惠券暂时无法使用，请选择其他优惠券");
            } else {
              this.sellPrice = data.sellPrice;
            }
          })
          .catch(res => {
            this.$super.toast.text(res.message);
          });
      } else {
        this.sellPrice = this.oriPrice;
      }
    }
  }
};
</script>


<style src="@/styles/payment.pcss" lang="postcss" scoped></style>
