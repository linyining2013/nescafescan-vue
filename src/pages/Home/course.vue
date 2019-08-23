<template>
  <section>
    <section class="course-wrap" id="course-data-wrap" :class="{hasMore: hasMore}">
      <template v-for="(value, index) in list" v-if="value.isPreview == 1">
        <!-- <div class="course-box" :key="value.id"> -->
          <img class="preview-bg" :key="value.id" src="data:image/png;base64,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" />
        <!-- </div> -->
      </template>
      <template v-else>
        <!-- <router-link :to="{path: '/course/' + value.id}" tag="div" class="course-box" :key="value.id"> -->
          <courseBox :classInfo="value" :isExhibition="true" :key="value.id"></courseBox>
          <!-- <div class="intro">
            <div class="txt-box">
              <p class="title" v-html="$utils.setWordBreak({type: 'title',text: value.name,})"></p>
              <p class="detail" v-html="$utils.setWordBreak({type: 'detail',text: value.courseShortIntro,})"></p>
            </div>
            <div class="addition">
              <s-img class="icon" :defaultType="'teacher'" :src="value.cover" />
              <div class="score" :class="{noScore: value.score4V == 0}">
                <p class="txt">
                  <template v-if="value.score4V != 0">
                    {{(value.score4V).toFixed(1)}}
                    <span class="symbol"> 分</span>
                  </template>
                  <template v-else>暂无评分</template>
                </p>
              </div>
            </div>
          </div>
          <div class="info">
            <div class="label-box">
              <p class="label audition" v-if="value.isAudition == 1 && value.sellPrice != 0">试听</p>
              <p class="label hot" v-if="value.operationLabel == 1">热门</p>
              <p class="label" v-for="(tag, tagIndex) in value.tags" :key="tag.id">{{tag.name}}</p>
            </div>
            <div class="addition">
              <span class="num">{{value.joinNum4V}}</span> 已学 ·
              <span class="num">{{value.likeNum4V}}</span> 赞</div>
          </div>
        </router-link> -->
      </template>

    </section>
    <footer v-show="!isMore" class="footer-tip">更多课程陆续上线中，敬请期待！</footer>
  </section>
</template>

<script>
// import API from "@/plugins/API";
import InfiniteScroll from "@/utils/infiniteScroll";
import courseBox from "@/components/courseBox.vue";
export default {
  components: {
    courseBox
  },
  data() {
    return {
      cover: {
        w: document.body.clientWidth,
        h: parseInt(document.body.clientWidth * 180 / 234)
      },
      list: [
        { id: 1, isPreview: 1, type: 0 },
        { id: 2, isPreview: 1, type: 0 },
        { id: 3, isPreview: 1, type: 0 },
        { id: 4, isPreview: 1, type: 0 },
        { id: 5, isPreview: 1, type: 0 }
      ],
      submitInfo: { pageNo: 1 },
      hasMore: false,
      isMore: true
    };
  },
  computed: {},
  created: function() {
    this.infiniteScroll = new InfiniteScroll(this.scrollHandler);
    this.getAllCourse();
  },
  beforeDestroy() {
    this.infiniteScroll.destroy();
  },
  mounted: function() {
    this.$bus.$emit("super:blazy-revalidate");
  },
  methods: {
    scrollHandler() {
      if (this.$route.name == "Home.index.course" && this.hasMore) {
        this.infiniteScroll.pause();
        this.getAllCourse();
      }
    },
    getAllCourse() {
      this.$API
        .getAllCourse(this.submitInfo)
        .then(data => {
          if (this.submitInfo.pageNo >= data.totalPage) {
            this.infiniteScroll.destroy();
          } else {
            this.infiniteScroll.restart();
          }
          this.isMore = this.hasMore = data.hasMore;
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
            err.message && this.$super.toast.text(err.message == 'Network Error'?'请求出错了，请稍后再试' : err.message);
          }
          this.infiniteScroll.restart();
        });
    }
  }
};
</script>