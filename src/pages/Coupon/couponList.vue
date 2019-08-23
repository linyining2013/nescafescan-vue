<template>
  <!-- 奖学金列表 -->
  <div id="coupon-list-wrap">
    <!-- <button v-on:click="add">Add</button> -->
    <div class="coupon-tip-btn" data-modal="btn" @click="isTip = !isTip">
      <p class="bg"></p>
      <p class="txt">奖学金使用说明</p>
    </div>
    <coupon :isEmpty="isEmpty" :coupons="coupons" v-show="!isTip"></coupon>
    <div id="user-wrap" class="user-wrap" v-show="isTip">
      <div class="u-w-content">
        1.奖学金仅能在第二大学中使用；<br/> 2.每位用户每次报名课程仅限使用一张奖学金；
        <br/> 3.每张奖学金有固定的使用要求，请根据奖学金上所标识的使用要求来报名课程；
        <br/> 4.奖学金过期后失效，不可使用，请您留意奖学金的有效期并在有效期内使用；
        <br/> 5.奖学金不可赠送，转让；
        <br/> 6.某些特价课程可能不支持奖学金使用，请留意课程相关信息；
        <br/> 7.如有其他疑问请点击产品内设置—帮助与反馈按钮与我们联系
        <br/>
      </div>
      <footer class="normal-footer">
        <button class="normal-footer__btn back-btn" data-modal="btn"  @click="isTip = !isTip">知道了</button>
      </footer>
    </div>
    <!-- <router-link :to="{path:'/me'}" tag="a" id="back-course-btn" class="btn">返回我的课程</router-link> -->
  </div>
</template>

<script>
// import axios from 'axios';
import coupon from "@/pages/coupon/couponBox.vue";
// import API from "@/plugins/API";

export default {
  components: {
    coupon
  },
  data: function() {
    return {
      isTip: false, //显示使用说明
      isEmpty: true, //判断是否有奖学金显示空页面
      coupons: []
    };
  },
  mounted: function() {
    document.title = "我的奖学金";

    if (this.$utils.isSuperBrowser) {
      this.$utils.setShare();
    } else if (this.$utils.isWXBrowser) {
      this.$weixin.init();
    }

    var that = this;
    this.$API.getMyCouponList()
      .then(function(res) {
        // console.log(res);
        var coupons = res.coupons,
          len = coupons.length;
        that.coupons = coupons;
        that.isEmpty = !(len > 0);
      })
      .catch(err => {
        this.$super.toast.text(err.message);
      });
  }
};
</script>

<style lang="postcss">
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

