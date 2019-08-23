<template>
  <!-- 优惠券列表 -->
  <transition name="slide-left">
    <div id="order-list-wrap">
      <!-- <button v-on:click="add">Add</button> -->
      <nav id="order-type-nav">
        <ul class="btn-wrap">
          <router-link :to="{path: '/order'}" exact-active-class='active' tag="li" class="item-btn" replace>
            <p>未报名</p>
          </router-link>
          <router-link :to="{path: '/order/pay'}" exact-active-class='active' tag="li" class="item-btn pay" replace>
            <p>已报名</p>
          </router-link>
        </ul>
      </nav>
      <div class="transition-parent" id="data-wrap">
        <transition name="slide-left">
          <router-view/>
        </transition>
      </div>
    </div>
  </transition>

</template>

<script>
// import axios from 'axios';
// import API from "@/plugins/API";

export default {
  data: function() {
    return {
      orders: []
    };
  },
  beforeDestroy() {
    // this.$super.buyTip.hide();
    this.$store.dispatch("updateOrderTip", true);
  },
  mounted: function() {
    document.title = "订单管理";

    if (this.$utils.isSuperBrowser) {
      this.$utils.setShare(this.$store.state.courseInfo);
    } else if (this.$utils.isWXBrowser) {
      this.$weixin.init(this.$store.state.courseInfo);
    }

    this.$bus.$emit("super:blazy-revalidate");

    // if (this.$store.state.checkBuy == 2) {
    //   let outTradeNo = this.$utils.cookie.get("outTradeNo");

    //   this.$store.dispatch("updateCheckBuy", 0);
    //   this.$super.buyTip.show({
    //     type: "buyTip",
    //     isMaskClicker: false,
    //     onClose: res => {
    //       if (res == 1) {
    //         //支付成功
    //         API.checkPayStatus({
    //           outTradeNo: outTradeNo
    //         }).then(data => {
    //           if (data.hasPay == 1) {
    //             this.$ba.trackEvent(
    //               "购买成功",
    //               `购买成功:${window.location.href}`,
    //               `购买成功区:${this.$utils.isSuperBrowser
    //                 ? "表表"
    //                 : this.$utils.isWXBrowser ? "微信" : "外部浏览器"}`
    //             );

    //             this.$router.replace(`/order/pay`);
    //             if (this.$utils.isSuperBrowser) {
    //               this.$super.buyTip.show({
    //                 type: "superPay",
    //                 isMaskClicker: false,
    //                 onClose: res => {
    //                   //进入课程学习
    //                   this.$router.push(
    //                     (data.orderBO.courseType == 0
    //                       ? "/course/"
    //                       : "/package/") + data.orderBO.courseId
    //                   );
    //                 }
    //               });
    //             } else {
    //               this.$super.buyTip.show({
    //                 type: "otherPay",
    //                 isMaskClicker: false,
    //                 onClose: res => {}
    //               });
    //             }
    //           } else {
    //             // router.push(`/order`);
    //             this.$super.toast.text("支付失败~");
    //             // setTimeout(() => {
    //             //   window.location.reload();
    //             // }, 1000);
    //           }
    //           this.$nextTick(() => {
    //             this.$emit("on-hide");
    //           });
    //         });
    //       } else {
    //         //取消支付
    //         window.location.reload();
    //       }
    //     }
    //   });
    // }
  }
};
</script>
<!-- @import "../../styles/label&Course&pack.pcss"; -->
<style lang="postcss">
@import "../../styles/common.pcss";

@import "../../styles/order/orderList.pcss";

body,
html {
  /* background-color: #f7f7f7; */
}
.list-item {
  margin-right: 10px;
}
.list-enter-active,
.list-leave-active {
  transition: all 1s;
}
.list-enter,
.list-leave-to {
  opacity: 0;
  transform: translateY(30px);
}
</style>