<template>
  <section id="comments-data-wrap">
    <header class="comments-header">
      <label class="item-box">综合评价
        <span class="score" :class="{noScore: score == 0}">
          <template v-if="score != 0">{{(score).toFixed(1)}}分</template>
          <template v-else>暂无评分</template>
        </span>
      </label>
    </header>
    <div class="comments-wrap" v-if="comments.length">
      <div class="comments-box" v-for="(value, index) in comments" :key="value.id">
        <div class="avatar-block">
          <span class="label pendant" v-show="value.rate >= 10"></span>
          <s-img class="user-icon" :src="value.avatarUrl  || require('@/assets/images/noAvatar.jpg')" :width="80" :height="80" />
          <span class="label identification" :class="(
              value.certificationType != 3?'id-0':
              value.vipLevel == '1'? 
              'id-1': value.publishType == 1? 
              'id-2': 'id-3')"></span>
        </div>
        <div class="user-box">
          <header class="info">
            <p class="name">{{value.nickName}}</p>
            <p class="date">{{$utils.dateFormat(value.gmtCreate)}}</p>
          </header>
          <section class="comments">{{value.content}}</section>
        </div>
      </div>
    </div>
    <div class="empty" v-else>
      <img class="empty-image" :src="require('@/assets/images/noClass.png')" alt="" />
      <p>还没有任何评价哦~</p>
    </div>
  </section>
</template>

<script>
// import this.$API from "../../plugins/this.$API";
import InfiniteScroll from "@/utils/infiniteScroll";

export default {
  props: ["score"],
  data() {
    return {
      comments: [],
      page: 1,
      hasMore: false
    };
  },
  mounted() {
    this.infiniteScroll = new InfiniteScroll(this.scrollHandler);
    this.fetchData();
    this.$bus.$emit("super:blazy-revalidate");
  },
  beforeDestroy() {
    this.infiniteScroll.destroy();
  },
  created() {},
  methods: {
    scrollHandler() {
      if (this.$route.name == "Package.Comments" && this.hasMore) {
        this.infiniteScroll.pause();
        this.page++;
        this.fetchData();
      }
    },
    fetchData() {
      this.$API.getComboEvaluateList({
        comboId: this.$route.params.id,
        pageNo: this.page
      })
        .then(data => {
          if (data.pageNo >= data.totalPage) {
            this.infiniteScroll.destroy();
          } else {
            this.infiniteScroll.restart();
          }
          this.hasMore = data.hasMore;
          this.comments.push(...data.list);
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