<template>
  <div class="course-comment">
    <div class="block">
      <div class="item-header comment-header">
        <label class="item-box">
          综合评价
          <span class="score" :class="{noScore: course.score4V == 0}">
            <template v-if="course.score4V != 0">{{(course.score4V).toFixed(1)}}分</template>
            <template v-else>暂无评分</template>
          </span>
        </label>
      </div>
      <div v-if="(allReady && comments.length === 0)" class="empty">
        <img class="empty-image" :src="require('@/assets/images/noClass.png')" alt="" />
        <p>还没有任何评价哦~</p>
      </div>

      <div class="course-comment-list">
        <div v-for="comment in comments" :key="'comment_'+comment.id" class="course-comment-item">
          <div class="avatar-block">
            <span class="label pendant" v-show="comment.rate >= 10"></span>
            <s-img :width="80" :height="80" :src="comment.avatarUrl  || require('@/assets/images/noAvatar.jpg')" />
            <span class="label identification" :class="(
              comment.certificationType != 3?'id-0':
              comment.vipLevel == '1'? 
              'id-1': comment.publishType == 1? 
              'id-2': 'id-3')"></span>
          </div>
          <div class="comment-block">
            <p class="name">{{comment.nickName}}</p>
            <p class="date">{{dateformat(comment.gmtCreate)}}</p>
            <p class="content">{{comment.content}}</p>
          </div>
        </div>
      </div>
      <div v-show="isMore" class="course-comment-loading">
        加载中…
      </div>
    </div>
  </div>
</template>


<script>
// import API from "../../plugins/API";
import _ from "lodash";

import InfiniteScroll from "@/utils/infiniteScroll";

export default {
  name: "course-comment",
  mounted() {
    // if (this.$utils.isSuperBrowser) {
    this.infiniteScroll = new InfiniteScroll(this.scrollHandler);
    this.fetchData();
    // }else{
    //   this.allReady = true;
    //   this.isMore = false;
    //   this.$super.buyTip.show({type: 'comment'});
    // }
  },
  beforeDestroy() {
    this.infiniteScroll.destroy();
  },
  data() {
    return {
      comments: [],
      page: 1,
      hasMore: false,
      isMore: true,
      allReady: false
    };
  },
  props: {
    courseId: String,
    course: Object
  },
  methods: {
    scrollHandler() {
      if (this.hasMore) {
        this.infiniteScroll.pause();
        this.page++;
        this.fetchData();
      }
    },
    dateformat(time) {
      return this.$utils.setIssueTime(time);
    },
    fetchData() {
      this.$API.getCommentByCourseIdPage({
        courseId: this.courseId,
        isAudit: true,
        pageNum: this.page
      })
        .then(data => {
          if (data.pageNo >= data.totalPage) {
            this.infiniteScroll.destroy();
          } else {
            this.infiniteScroll.restart();
          }
          this.allReady = true;
          this.isMore = this.hasMore = data.hasMore;
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

<style lang="postcss" src="@/styles/course/detail.comment.pcss" >

</style>
