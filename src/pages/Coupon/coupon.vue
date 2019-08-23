<template>
  <section id="receive-coupon-wrap" class="">
    <div class="mark"></div>
    <div class="ticket-wrap">
      <div class="ticket-box">
        <div class="ticket-header">
          <p class="title">学点课外的知识 遇见更好的自己</p>
          <p class="tip">Super classroom</p>
          <p class="header-line"></p>
          <p class="header-icon left"></p>
          <p class="header-icon right"></p>
        </div>
        <div class="ticket-container">
          <div class="content-box" v-if="couponDetail">
            <div id="price-box" class="price-box">
              <div v-html="renderPrice"></div>
            </div>
            <ul id="rule-box" class="rule-box">
              <li class="item">{{couponDetail.coupon4G.title}}</li>
              <li class="item">限时{{setTime(couponDetail.coupon4G.receivableEndTime)}}天</li>
              <li class="item course-item">课程{{couponDetail.coupon4G.courseType == 1? '套餐' : ''}}奖学金</li>
            </ul>
          </div>
        </div>
        <div class="ticket-footer">
          <p class="bg-icon"></p>
          <button id="receive-btn" class="receive-btn" v-track-event="'奖学金领取页面,领取按钮'" :disabled="isReceived" @click="receiveCoupon()"></button>
        </div>
      </div>
    </div>
    <div id="tip-modal" v-show="isSuccess">
      <div class="modal-mark">
        <div class="modal-box">
          <div class="modal-header">
            <p class="bg-icon left-1"></p>
            <p class="bg-icon left-2"></p>
            <p class="bg-icon right-1"></p>
            <p class="bg-icon right-2"></p>
            <p class="bg-icon"></p>
            <p class="icon"></p>
            <p class="txt">
              <span class="tip">恭喜您</span><br/>奖学金领取成功</p>
          </div>
          <div class="modal-footer">
            <router-link :to="{path:'/couponList'}" tag="a" class="btn back-btn">前往查看奖学金</router-link>
            <router-link :to="{path:'/'}" tag="a" class="btn index-btn">前往第二大学</router-link>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
// import API from "@/plugins/API";

export default {
  name: "receive",
  data() {
    return {
      cpIde: this.$route.params.cpIde,
      isSuccess: false,
      isReceived: false, //是否已经领取
      couponDetail: null
    };
  },
  computed: {
    renderPrice: {
      get() {
        var couponDetail = this.couponDetail;
        var coupon4G = couponDetail.coupon4G;

        if (coupon4G) {
          var discountType = coupon4G.discountType,
            discounts = 0,
            discountY = 0,
            discountF = 0;

          if (discountType != 1) {
            discounts = coupon4G.discount.toString().split(".");
            discountY = discounts[0];
            discountF = discounts[1] || ".0";
          }
          return discountType == 1
            ? '<p class="price"><span class="symbol">￥</span><span class="num">' +
                coupon4G.discountAmount / 100 +
                "</span></p>"
            : '<p class="discount"><span class="num">' +
                discountY +
                '</span><span class="num-s">' +
                discountF +
                '</span><span class="symbol"> 折</span></p>';
        } else {
          return "";
        }
      },
      set(val) {
        this.couponDetail = val;
        this.isReceived = val.isReceived == 0 ? false : true;
      }
    }
  },
  mounted() {
    document.title = "奖学金领取";
    // if (this.$utils.isSuperBrowser) {
    this.$API
      .G4CouponDetail({
        cpIde: this.cpIde
      })
      .then(res => {
        this.renderPrice = res;
      })
      .catch(err => {
        this.$super.toast.text(err.message);
      });
    // } else {
    //   this.$super.toast.text("请在表表App中打开哦~");
    // }
  },
  // beforeDestroy() {
  //   this.$super.buyTip.hide();
  // },
  methods: {
    setTime(data) {
      var data = (data - new Date().getTime()) / 24 / 60 / 60 / 1000;
      return data > 0 ? (data > 1 ? Math.ceil(data) : 1) : 0;
    },
    receiveCoupon() {
      var that = this;
      if (this.$utils.isSuperBrowser) {
        this.$API
          .receiveCoupon({
            cpIde: this.cpIde
          })
          .then(res => {
            if (res == undefined) {
              this.$super.toast.text("领取失败哦~ 请稍后再试");
              setTimeout(() => {
                window.location.reload();
              }, 1000);
            } else {
              that.isSuccess = true;
            }
          })
          .catch(err => {
            this.$super.toast.text(err.message);
            setTimeout(() => {
              window.location.replace("/");
            }, 1000);
          });
      } else {
        this.$super.modalTip.show({
          type: "download",
          content: "下载超级课程表app领取奖学金",
          onClose: res => {
            if (res == 1) {
              window.location.href = "http://www.super.cn/jump.php";
            } else {
              this.$utils.deepLinkTo();
            }
          }
        });
        // this.$super.buyTip.show({
        //   type: "download",
        //   infoType: "counpon",
        //   onClose: res => {
        //     if (res == 1) {
        //       window.location.href = "http://www.super.cn/jump.php";
        //     } else {
        //       this.$utils.deepLinkTo();
        //     }
        //   }
        // });
      }
    }
  }
};
</script>

<style lang="postcss" >
#receive-coupon-wrap {
  .discount {
    .num-s {
      font-size: 80px;
    }
    .symbol {
      font-size: 46px;
    }
  }
  .price {
    .symbol {
      vertical-align: top;
      font-size: 60px;
    }
  }
}
</style>
<style lang="postcss" src="@/styles/coupon/coupon.pcss" scoped></style>