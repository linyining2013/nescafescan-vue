<template>
  <section id="list-data-wrap">
    <header class="header">
      <span class="name" v-if="list[0]">{{list[0].categoryName}}</span>
      <!-- <span class="alias"></span> -->
    </header>
    <section class="container">
      <template v-for="(value, index) in list" v-if="value.courseType == 0">
        <courseBox :classInfo="value" :isExhibition="true" :key="value.id"></courseBox>
        <!-- <router-link :to="{path: '/course/' + value.id}" tag="div" class="course-box box" :key="value.id">
        <div class="intro">
          <div class="txt-box">
            <p class="title" v-html="$utils.setWordBreak({type: 'title',text: value.name,})"></p>
            <p class="detail" v-html="$utils.setWordBreak({type: 'detail',text: value.courseShortIntro,})"></p>
          </div>
          <div class="addition">
            <s-img class="icon" :src="value.cover" :defaultType="'teacher'" />
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
            <p class="label audition" v-if="value.isAudition == 1  && value.sellPrice != 0">试听</p>
            <p class="label hot" v-if="value.operationLabel == 1">热门</p>
            <p class="label" v-for="(tag, tagIndex) in value.tags" :key="tag.id">{{tag.name}}</p>
          </div>
          <div class="addition"><span class="num">{{value.joinNum4V}}</span> 已学 · <span class="num">{{value.likeNum4V}}</span> 赞</div>
        </div>
      </router-link> -->
      </template>
      <template v-else-if="value.courseType == 1">
        <packageBox :classInfo="value" :isExhibition="true" :key="value.id"></packageBox>
        <!-- <router-link :to="{path: '/package/' + value.id}" tag="div" class="package-box">
        <div class="title">{{value.courseNum}}节课</div>
        <s-img class="icon" :src="value.cover" :defaultType="'package'" />
        <footer class="package-footer">
            <div class="label-box">
              <p class="label audition" v-if="value.isAudition == 1 && value.sellPrice != 0">试听</p>
              <p class="label hot" v-if="value.operationLabel == 1">热门</p>
              <p class="label" v-for="(tag, tagIndex) in value.tags" :key="tag.id">{{tag.name}}</p>
            </div>
            <div class="addition">
              <span class="num">{{value.joinNum4V}}</span> 已学 ·
              <span class="num">{{value.likeNum4V}}</span> 赞</div>
          </footer>
      </router-link> -->
      </template>
    </section>

  </section>
</template>

<script>
// import API from "../../plugins/API";
import InfiniteScroll from "@/utils/infiniteScroll";
import courseBox from "@/components/courseBox.vue";
import packageBox from "@/components/packageBox.vue";

export default {
  components: {
    courseBox,
    packageBox
  },
  data() {
    return {
      cover: {
        w: document.body.clientWidth,
        h: parseInt(document.body.clientWidth * 2 / 5)
      },
      list: [],
      // id: this.$route.params.id,
      hasMore: false,
      submitInfo: { categoryId: this.$route.params.id, udScore: 0 }
    };
  },
  computed: {},
  created() {
    this.infiniteScroll = new InfiniteScroll(this.scrollHandler);
    this.getCourse();
  },
  beforeDestroy() {
    // this.$super.buyTip.hide();
    this.infiniteScroll.destroy();
  },
  mounted() {
    document.title = "课程列表";
    if (this.$utils.isSuperBrowser) {
      this.$utils.setShare();
    } else if (this.$utils.isWXBrowser) {
      this.$weixin.init();
    }
    this.$bus.$emit("super:blazy-revalidate");
  },
  methods: {
    scrollHandler() {
      if (this.hasMore) {
        this.infiniteScroll.pause();
        this.getCourse();
      }
    },
    getCourse() {
      this.$API
        .getCourseByCategoryId(this.submitInfo)
        .then(res => {
          this.udScore = res.udScore;
          if (!(this.hasMore = res.hasMore)) {
            this.infiniteScroll.destroy();
          } else {
            this.infiniteScroll.restart();
          }
          this.submitInfo.udScore = res.udScore;
          this.list.push(...res.list);
          // console.log(this.list.length)
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
<!-- @import "../../styles/common.pcss";  @import "../../styles/label&Course&pack.pcss"; -->
<style lang="postcss">
#list-data-wrap {
  background: #fff;
  .header {
    position: relative;
    padding: 40px 0 20px;
    margin: 0 40px;
    border-bottom: 1px solid #efefef;
    word-break: keep-all;
    white-space: nowrap;
    overflow: hidden;
    &:after {
      content: "";
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      width: 60px;
      background-image: -webkit-linear-gradient(
        90deg,
        rgba(255, 255, 255, 0.2),
        #fff
      );
      background-image: linear-gradient(90deg, rgba(255, 255, 255, 0.2), #fff);
    }
    .name {
      font-size: 54px;
      color: #333;
      font-weight: bold;
      margin-right: 20px;
    }
    .alias {
      font-size: 30px;
      color: #999;
    }
  }
  /*
  .course-box,
  .package-box {
    border-bottom: 1px solid #efefef;
  }
  .package-box {
    .label-box {
      bottom: 80px;
      right: 45px;
    }
  }*/
  .container{
    padding: 40px;
  }
}
</style>