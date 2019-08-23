<template>
    <section id="mine-wrap" class="">
        <header class="mine-wrap-header">
            <span class="mine-wrap-header__title">我的课程</span>
            <span class="mine-wrap-header__num">共
                <span class="symbol">{{$store.state.user.data.courseNum || 0}}</span>门课</span>
        </header>
        <section id="mine-course-data-wrap" class="mine-course-wrap" :class="{'padding-client': isClient}">
            <template v-if="!list.length && submitInfo.pageNo > 1">
                <div class="empty-wrap">
                    <p class="bg"></p>
                    <p class="txt">还没有参加任何课程哦~</p>
                </div>
            </template>
            <template v-else>
                <template v-for="(value, index) in list" >
                    <courseBox v-if="value.courseType == 0" :key="'class_'+value.id" :classInfo="value"></courseBox>
                    <packageBox v-else :key="'class_'+value.id" :classInfo="value"></packageBox>
                </template>
            </template>
        </section>
        <footer id="client-btn-wrap" class="" v-if="isClient">
            <button @click="linkTo" class="client-btn">去第二大学首页 >></button>
        </footer>
    </section>
</template>

<script>
// import _methods from "../../plugins/methods";
// import this.$API from "../../plugins/this.$API";
import Vue from "vue";
import InfiniteScroll from "@/utils/infiniteScroll";
import courseBox from "@/components/courseBox.vue";
import packageBox from "@/components/packageBox.vue";

export default {
  name: "mine",
  components: {
    courseBox,
    packageBox
  },
  data() {
    return {
      isClient: false,
      expandId: null, //记录展开的id
      couponsLen: 0,
      list: [],
      submitInfo: { pageNo: 1 },
      hasMore: false
    };
  },
  mounted() {
    document.title = "我的课程";

    if (this.$utils.cookie.get("isClient") == 1) {
      this.isClient = true;
      this.$utils.cookie.set("isClient", "");
    }

    this.$bus.$emit("super:blazy-revalidate");
  },
  created() {
    this.infiniteScroll = new InfiniteScroll(this.scrollHandler);
    this.getMyCourses();
  },
  beforeDestroy() {
    // this.$super.buyTip.hide();
    this.infiniteScroll.destroy();
  },
  methods: {
    linkTo() {
      window.location.replace(
        window.location.origin + window.location.pathname + "#"
      );
    },
    scrollHandler() {
      if (this.$route.name == "Home.index.me" && this.hasMore) {
        this.infiniteScroll.pause();
        this.getMyCourses();
      }
    },
    getMyCourses() {
      this.$API
        .getMyCoursesV2(this.submitInfo)
        .then(data => {
          this.couponsLen = data.couponNum;
          let myCourses = data.myCourses;

          if (myCourses) {
            if (this.submitInfo.pageNo++ >= data.myCourses.totalPage) {
              this.infiniteScroll.destroy();
            } else {
              this.infiniteScroll.restart();
            }
            this.hasMore = data.hasMore;
            this.list.push(...myCourses.list);
          }else{
            this.submitInfo.pageNo++
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
          this.infiniteScroll.restart();
        });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

<style lang="postcss">
@import "../../styles/common.pcss";
@import "../../styles/mine/mine.pcss";
/* 展开课程包 动画 */
.slide-package-enter-active,
.slide-package-leave-active {
  transition: all 0.4s;
}
.slide-package-enter-active {
  position: absolute;
}

.slide-package-enter,
.slide-package-leave-to {
  opacity: 0;
  transform: translateY(-30px);
}
</style>

<style lang="postcss">
</style>
