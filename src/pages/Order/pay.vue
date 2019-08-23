<template>
    <section id="pay-wrap">
        <div id="order-wrap">
            <div class="empty-wrap" v-show="!list.length">
                <p class="bg"></p>
                <p class="txt">您还没有订单哦~</p>
            </div>
            <!-- <transition-group name="list" tag="section"  :items="list"> -->
            <section class="orders-list">
                <orderBox v-for="(value, index) in list" :key="value.id" :order="value" :index="index"></orderBox>
            </section>

            <!-- </transition-group> -->
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
  name: "payList",
  data() {
    return {
      hasMore: false,
      list: [],
      submitInfo: {
        pageNo: 1,
        payStatusExt: 1
      }
    };
  },
  created: function() {
    this.infiniteScroll = new InfiniteScroll(this.scrollHandler);
    this.getMyOrders();
  },
  beforeDestroy() {
    this.infiniteScroll.destroy();
  },
  mounted: function() {
    this.$bus.$emit("super:blazy-revalidate");
  },
  methods: {
    scrollHandler() {
      if (this.$route.name == "Order.pay" && this.hasMore) {
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
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
