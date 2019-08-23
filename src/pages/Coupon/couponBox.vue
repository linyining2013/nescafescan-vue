<template>
    <section id="main-wrap" class="">
        <div id="coupon-wrap">
            <div class="empty-wrap" v-show="isEmpty">
                <p class="bg"></p>
                <p class="txt">没有任何奖学金哦~</p>
            </div>
            <transition-group name="list" tag="section" class="coupon-list" :items="coupons">
              <couponBox v-for="(value, index) in coupons" :value="value" :expandId="expandId" v-on:setExpandId="setExpandId" :key="value.id"></couponBox>
            </transition-group>
        </div>
    </section>
</template>

<script>
import Vue from "vue";
import couponBox from "@/components/Coupon.vue";

export default {
  components: {
    couponBox
  },
  name: "coupon",
  props: ["isEmpty", "coupons"],
  data() {
    return {
      expandId: null //记录展开的id
    };
  },
  methods: {
    setExpandId(id){
      this.expandId = id;
    },
    // linkTo(courseIds, courseType) {
    //   if (courseIds) {
    //     if (courseIds.indexOf(",") == -1) {
    //       //多个课程
    //       this.$router.push({
    //         name: courseType == 0 ? "CourseDetail" : "Package",
    //         params: {
    //           id: courseIds
    //         }
    //       });
    //     } else {
    //       this.$router.push("/");
    //     }
    //   } else {
    //     this.$router.push("/");
    //   }
    // },
    // setDiscount: function(data, discountType) {
    //   //输出奖学金 优惠价格/折扣
    //   if (discountType == 1) {
    //     //现金券
    //     var data = data / 100;
    //   }
    //   var datas = data
    //     .toFixed(2)
    //     .toString()
    //     .split(".");
    //   return (
    //     datas[0] +
    //     '<span class="symbol">.' +
    //     datas[1] +
    //     (discountType == 1 ? "元" : "折") +
    //     "</span>"
    //   );
    // },
    // setSlide: function(data) {
    //   //滚动
    //   var quota = data.quota > 0 ? 1 : 0;
    //   var limitMessageCou = data.limitMessageCou ? 1 : 0;
    //   var limitMessageCaTe = data.limitMessageCaTe ? 1 : 0;
    //   if (quota + limitMessageCou + limitMessageCaTe >= 2) {
    //     //两行以上
    //     return "slide-box";
    //   } else {
    //     let bw = document.body.clientWidth,
    //       h = (36 / 75 * bw / 10).toFixed(3), //rem => px 换算
    //       w = bw - (50 + 50 + 40 + 20) / 75 * bw / 10, // /10是因为尺寸750
    //       line = 2,
    //       foneSize = 24 / 75 * bw / 10 / 2, //单字节宽度
    //       len = (data.limitMessageCou + data.limitMessageCaTe).replace(
    //         /[^\x00-\xff]/g,
    //         "01"
    //       ).length, //双字节换算为单字节的长度
    //       max = parseInt(w * line / foneSize),
    //       lineHeight = 1.4 * foneSize * 2;
    //     if (h > lineHeight && len >= max) {
    //       return "slide-box";
    //     }
    //   }
    // },
    // setLimitMessage: function(data, s, l, r) {
    //   var datas = data.split(s);
    //   for (var i = 0, html = "", len = datas.length; i < len; i++) {
    //     html += l + datas[i] + r;
    //   }
    //   return html;
    // },
    // couponType: function(isLimited, discountType) {
    //   //判断奖学金类型
    //   var className = {};
    //   if (isLimited != 1) {
    //     //是否可用
    //     if (discountType == 1) {
    //       //现金：1
    //       className.cash = true;
    //     } else if (discountType == 2) {
    //       //奖学金：2
    //       className.discount = true;
    //     }
    //   } else {
    //     className.overdue = true;
    //   }
    //   return className;
    // }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="postcss" >
@import "../../styles/common.pcss";
@import "../../styles/Coupon/couponList.pcss"
</style>