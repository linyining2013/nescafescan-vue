<template>
  <section id="unpay-wrap" :class="{upPay: isUnpay || isTop == 1}">
    <transition name="slide-unpay">
      <header id="unpay-header" class="unpay-header" v-if="isUnpay">
        <span class="icon"></span>订单24小时支付有效，过期“取消订单”
        <button @click="hideHeader" class="close-btn"></button>
      </header>
    </transition>
    <div id="order-wrap">
      <div class="empty-wrap" v-show="!list.length">
        <p class="bg"></p>
        <p class="txt">您还没有订单哦~</p>
      </div>
      <section class="orders-list">
        <orderBox v-for="(value, index) in list" :key="value.id" :order="value" :index="index" v-on:updataUnpay="updataUnpay"></orderBox>
      </section>
    </div>
  </section>
</template>

<script>
import orderBox from "@/pages/Order/orderBox.vue";
// import this.$API from "@/plugins/this.$API";
import InfiniteScroll from "@/utils/infiniteScroll";

export default {
  components: {
    orderBox
  },
  name: "unpayList",
  data() {
    return {
      hasMore: false,
      isUnpay: false,
      isTop: 0,
      unpayLen: 0,
      list: [],
      submitInfo: {
        pageNo: 1,
        payStatusExt: 0
      }
    };
  },
  created: function() {
    // if (this.$store.state.courseInfo != null) {
    //   //有预支付课程
    //   this.list.unshift([])
    // }
    this.infiniteScroll = new InfiniteScroll(this.scrollHandler);
    this.getMyOrders();
  },
  beforeDestroy() {
    this.infiniteScroll.destroy();
  },
  mounted: function() {
    
    setTimeout(()=>{this.$bus.$emit("super:blazy-revalidate");}, 300);
  },
  methods: {
    updataUnpay(data) {
      if (data == 1) {
        //记录有多少未支付单子
        this.unpayLen++;
        this.isUnpay = true;
        this.isTop = 1;
      } else {
        //取消订单
        if (--this.unpayLen == 0) {
          this.isUnpay = false;
        }
      }
    },
    scrollHandler() {
      if (this.$route.name == "Order.unpay" && this.hasMore) {
        this.infiniteScroll.pause();
        this.getMyOrders();
      }
    },
    getMyOrders() {
      this.$API.getMyOrders(this.submitInfo)
        .then(data => {
          if (this.submitInfo.pageNo >= data.totalPage) {
            this.infiniteScroll.destroy();
          } else {
            this.infiniteScroll.restart();
          }
          this.hasMore = data.hasMore;
          if (this.submitInfo.pageNo++ == 1) {
            this.list = data.list;
          } else {
            this.list.push(...data.list);
          }
        })
        .catch(err => {
          if (err.message.indexOf("timeout") != -1) {
            // console.log('超时囖囖囖囖咯');
            this.$super.toast.text("请求超时了，请稍后再试");
          } else {
            err.message &&
              this.$super.toast.text(
                err.message == "Network Error" ? "请求出错了，请稍后再试" : err.message
              );
          }
          this.infiniteScroll.restart();
        });
    },
    hideHeader() {
      this.isUnpay = false;
    },
    handleScroll() {
      let scrollTop =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop;
      if (scrollTop == 0) {
        this.isTop = 0;
        window.removeEventListener("scroll", this.handleScroll);
      }
    }
  },
  watch: {
    isTop(value) {
      if (!value) {
        this.$store.dispatch("updateOrderTip", false);
      }
    },
    isUnpay(value) {
      if (!value) {
        //false  取消置顶消息
        let scrollTop =
          window.pageYOffset ||
          document.documentElement.scrollTop ||
          document.body.scrollTop;
        if (scrollTop == 0) {
          this.isTop = 0;
        } else {
          window.addEventListener("scroll", this.handleScroll);
        }
      }
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->


<style lang="postcss" scoped>
/* 展开课程包 动画 */
.slide-unpay-leave-active {
  transition: all 0.6s;
  .close-btn {
    transition: transform 0.6s;
  }
}

.slide-unpay-leave-to {
  opacity: 0;
  transform: translateX(-30px);
  .close-btn {
    transform: rotate(-45deg);
  }
}
</style>