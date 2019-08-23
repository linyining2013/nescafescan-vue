<template>
  <section class="orders-box">
    <header class="order-header">
      <s-img class="icon" :src="order.courseBaseBO.cover" :defaultType="'package'" :offset="200" />
    </header>
    <section class="order-container">
      <header class="order-container-info">
        <p class="container-info__num">报名编号 {{order.orderNum}}</p>
        <p class="container-info__name">{{order.courseBaseBO.name}}</p>
      </header>
      <section class="container-control">
        <div class="container-control-prize" :class="{nocoupon: order.isInCoupon != 1}">
          <p class="container-control-prize__sell">学费
            <span class="container-control-prize__symbol">￥{{(order.sellPrice / 100).toFixed(2)}}</span>
          </p>
          <p class="container-control-prize__cut" v-if="order.isInCoupon == 1">奖学金折扣 ￥{{(order.couponDiscountAmount/ 100).toFixed(2)}}</p>
        </div>
        <div class="container-control-btn-box">
          <template v-if="order.payStatus == 1 && order.courseBaseBO.id == $store.state.user.data.practiceComboId">
            <router-link tag="button" :to="{path: '/practice/' + $store.state.user.data.practiceComboId}" class="btn normal-btn">去学习</router-link>
          </template>
          <template v-else-if="order.payStatus == 1">
            <router-link tag="button" :to="{path:(order.courseBaseBO.courseType == 0?'/course/' : '/package/') + order.courseBaseBO.id}" class="btn normal-btn">去学习</router-link>
          </template>
          <template v-else-if="order.payStatus == 0">
            <button class="btn success-btn" @click="orderPay(order.courseBaseBO)">立即报名</button>
            <button class="btn normal-btn" @click="orderCancel">取消报名</button>
          </template>
          <template v-else-if="order.payStatus == 21">
            <button class="btn invalid-btn">已取消</button>
          </template>
          <template v-else-if="order.payStatus == 4">
            <button class="btn invalid-btn">已退款</button>
          </template>
          <template v-else-if="order.payStatus == 2">
            <button class="btn invalid-btn">已失效</button>
          </template>
        </div>
      </section>
    </section>
    <!-- <footer class="order-footer">
      <div class="price-box" :class="{nocoupon: order.isInCoupon != 1}">
        <p class="total-price">
          <span class="name">总价:</span> ￥{{(order.sellPrice / 100).toFixed(2)}}</p>
        <p class="cut-price" v-if="order.isInCoupon == 1">
          <span class="name">优惠券:</span> -￥{{(order.couponDiscountAmount/ 100).toFixed(2)}}</p>
      </div>
      <div class="btn-box" :class="{hascoupon: order.isInCoupon == 1}">
        <template v-if="order.payStatus == 1 && order.courseBaseBO.id == $store.state.user.data.practiceComboId">
          <button class="btn invalid-btn" v-on:click="instituteEvent(order.payStatus)">未开始</button>
        </template>
        <template v-else-if="order.payStatus == 1">
          <router-link tag="button" :to="{path:(order.courseBaseBO.courseType == 0?'/course/' : '/package/') + order.courseBaseBO.id}" class="btn normal-btn">去学习</router-link>
        </template>
        <template v-else-if="order.payStatus == 0">
          <button class="btn success-btn" @click="orderPay(order.courseBaseBO)">立即支付</button>
          <button class="btn normal-btn" @click="orderCancel">取消订单</button>
        </template>
        <template v-else-if="order.payStatus == 21">
          <button class="btn invalid-btn">已取消</button>
        </template>
        <template v-else-if="order.payStatus == 4">
          <button class="btn invalid-btn">已退款</button>
        </template>
        <template v-else-if="order.payStatus == 2">
          <button class="btn invalid-btn">已失效</button>
        </template>
      </div>
    </footer> -->
  </section>
</template>


<script>
import Vue from "vue";
// import this.$API from "@/plugins/this.$API";

Vue.component("courseBox", {
  // 在 JavaScript 中使用 camelCase
  props: ["courseBaseBO", "originPrice"],
  template: `<div class="intro">
            <div class="txt-box">
              <p class="title" v-html="$utils.setWordBreak({type: 'orderTitle',text: courseBaseBO.name,})"></p>
              <p class="price">￥ {{(originPrice/ 100).toFixed(2)}}</p>
            </div>
            <div class="addition">
              <s-img class="icon" :defaultType="'teacher'" :src="courseBaseBO.cover" />
            </div>
          </div>`
});

Vue.component("packageBox", {
  // 在 JavaScript 中使用 camelCase
  props: ["courseBaseBO"],
  template: `<div><div class="title" v-if="courseBaseBO.id != $store.state.user.data.practiceComboId">{{courseBaseBO.courseNum}}节课</div>
          <s-img class="icon" :src="courseBaseBO.cover" :defaultType="'package'" :offset="200"/></div>`
});

export default {
  name: "orderBox",
  props: ["order", "index"],
  data() {
    return {
      os: this.$utils.isSuperBrowser ? 0 : this.$utils.isWXBrowser ? 1 : 2 //支付平台 0: app 1：公众号 2：h5
    };
  },
  mounted() {
    // if (this.order.payStatus == 0 && this.$store.state.orderTip) {
    //   //等待支付
    //   this.$emit("updataUnpay", 1);
    // }

    this.$bus.$emit("super:blazy-revalidate");
  },
  methods: {
    orderPay(courseBaseBO) {
      this.$store.dispatch("updateCourseInfo", courseBaseBO); //把当前支付信息存储起来

      if (this.$utils.isSuperBrowser) {
        this.$utils.setShare(courseBaseBO);
      } else if (this.$utils.isWXBrowser) {
        this.$weixin.init(courseBaseBO);
      }

      this.$router.push({
        name: "payment",
        params: {
          id: courseBaseBO.id,
          type: courseBaseBO.courseType
        },
        query: {
          orderId: this.order.id
        }
      });
    },
    orderCancel() {
      this.$API
        .cancelOrder({ orderId: this.order.id })
        .then(data => {
          if (data == 1) {
            this.$super.toast.text("取消成功");
            this.order.payStatus = 21;
            this.$emit("updataUnpay", 0);
          }
        })
        .catch(err => {
          if (err.message.indexOf("timeout") != -1) {
            // console.log('超时囖囖囖囖咯');
            this.$super.toast.text("请求超时了，请稍后再试");
          } else {
            err.message &&
              this.$super.toast.text(
                err.message == "Network Error"
                  ? "请求出错了，请稍后再试"
                  : err.message
              );
          }
        });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
