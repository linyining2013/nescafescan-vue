<template>
  <section>
    <section class="package-wrap" id="package-data-wrap">
      <template v-for="(value, index) in list" v-if="value.isPreview == 1">
        <div class="package-box" :key="value.id">
          <img class="preview-bg" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAp4AAAFrCAYAAAB4wYmkAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA4RpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNS1jMDIxIDc5LjE1NTc3MiwgMjAxNC8wMS8xMy0xOTo0NDowMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDo3NzFjMGNjNS04Mzc5LTQzZTUtOWY4MS02ZWJkZWUzOWZjYzYiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6QkQyQjJERENFRkJDMTFFNzk5NTJBNjg3MjFFRDU4MzMiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6QkQyQjJEREJFRkJDMTFFNzk5NTJBNjg3MjFFRDU4MzMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTQgKFdpbmRvd3MpIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6M2NjMzJhOGEtMzc4YS01ZTRiLTk5YzMtZmQ1NGQ5NDA4ODI0IiBzdFJlZjpkb2N1bWVudElEPSJhZG9iZTpkb2NpZDpwaG90b3Nob3A6YjdiNTRmMWEtMjdiZC0xMTdiLWEyMzUt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" />
        </div>
      </template>
      <template v-else-if="value.id != $store.state.user.data.practiceComboId">
        <packageBox :classInfo="value" :isExhibition="true" :key="value.id"></packageBox>
        <!-- <router-link :to="{path: '/package/' + value.id}" tag="div" class="package-box" :key="value.id">
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
    <footer v-show="!isMore" class="footer-tip">更多课程陆续上线中，敬请期待！</footer>
  </section>
</template>

<script>
// import API from "../../plugins/API";
import InfiniteScroll from "@/utils/infiniteScroll";
import packageBox from "@/components/packageBox.vue";

export default {
  components: {
    packageBox
  },
  data() {
    return {
      cover: {
        w: document.body.clientWidth,
        h: parseInt(document.body.clientWidth * 30 / 67)
      },
      list: [
        { id: 1, isPreview: 1, type: 1 },
        { id: 2, isPreview: 1, type: 1 },
        { id: 3, isPreview: 1, type: 1 },
        { id: 4, isPreview: 1, type: 1 },
        { id: 5, isPreview: 1, type: 1 }
      ],
      submitInfo: { pageNo: 1 },
      hasMore: false, //阻止进入页面重复加载
      isMore: true //是否显示没有更多文案
    };
  },
  computed: {},
  created: function() {
    this.infiniteScroll = new InfiniteScroll(this.scrollHandler);
    this.getAllCombo();
  },
  beforeDestroy() {
    this.infiniteScroll.destroy();
  },
  mounted: function() {
    this.$bus.$emit("super:blazy-revalidate");
  },
  methods: {
    scrollHandler() {
      if (this.$route.name == "Home.index.package" && this.hasMore) {
        this.infiniteScroll.pause();
        this.getAllCombo();
      }
    },
    getAllCombo() {
      this.$API.getAllCombo(this.submitInfo)
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