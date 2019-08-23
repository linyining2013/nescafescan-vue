<template>
  <section class="" id="discuss-wrap">
    <header class="discuss-header">
      <button class="back-btn" type="button" v-on:click="hideWrap">返回课程</button>
    </header>
    <section id="discuss-data-wrap">
      <header class="discuss-data-name">大家都在聊
        <span class="num">(
          <span>{{setList}}</span>个讨论)</span>
      </header>
      <template v-for="(value, index) in list">
        <div class="discuss-box" :key="value.id">
          <div class="avatar-block">
            <span class="label pendant" v-show="value.rate >= 10"></span>
            <img class="user-icon" :src="(value.avatarUrl + '?imageView2/1/w/200/h/200') || require('@/assets/images/noAvatar.jpg')" width="40px" height="40px">
            <span class="label identification" :class="(
              value.certificationType != 3?'id-0':
              value.vipLevel == '1'? 
              'id-1': value.publishType == 1? 
              'id-2': 'id-3')"></span>
          </div>
          <div class="detail">
            <p class="name">{{value.nickName}}</p>
            <p class="date">{{$utils.dateFormat(value.gmtCreate)}}</p>
            <div class="content">{{value.content}}</div>
          </div>
        </div>
      </template>
    </section>
  </section>
</template>

<script>
// import API from "../../plugins/API";
import InfiniteScroll from "@/utils/infiniteScroll";

export default {
  props: ["discussInfo"],
  data() {
    return {
      id: this.$route.params.id,
      pageNum: 1,
      list: [],
      hasMore: false
    };
  },
  computed: {
    setList() {
      if (this.discussInfo.list.id || this.discussInfo.list.studentType == 0)
        this.list.unshift(...[this.discussInfo.list]);
      // return this.discussInfo.discussNum + this.list.length;
      return this.discussInfo.discussNum;
    }
  },
  created() {},
  mounted() {
    this.infiniteScroll = new InfiniteScroll(this.scrollHandler, {
      el: document.getElementById("discuss-wrap")
    });
    this.getDiscussByCourseIdPage();
  },
  beforeDestroy() {
    this.infiniteScroll.destroy();
  },
  methods: {
    hideWrap() {
      this.$emit("hideDiscuss");
      this.$router.replace(
        `/learning/${this.id}/${this.$route.params.pageNum}`
      );
      // this.$router.go(-1);
    },
    scrollHandler() {
      if (this.$route.name == "Learning.discuss" && this.hasMore) {
        this.infiniteScroll.pause();
        this.getDiscussByCourseIdPage();
      }
    },
    getDiscussByCourseIdPage() {
      this.$API.getDiscussByCourseIdPage({
        courseId: this.$route.params.id,
        pageNum: this.pageNum
      })
        .then(data => {
          // console.log(data)
          if (this.pageNum++ >= data.totalPage) {
            this.infiniteScroll.destroy();
          } else {
            this.infiniteScroll.restart();
          }
          this.hasMore = data.hasMore;
          this.list.push(...data.list);
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
<!-- Add "scoped" attribute to limit CSS to this component only getDiscussByCourseIdPage-->
<style lang="postcss">

</style>
