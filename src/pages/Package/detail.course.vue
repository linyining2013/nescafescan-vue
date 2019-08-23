<template>
    <section class="course-wrap" id="package-course-data-wrap">
        <div class="data-wrap">
            <div v-on:click="openTip(value.course)" class="course-item" v-for="(value, index) in list" :key="value.id">
                <div class="icon-box">
                    <s-img class="icon" :src="value.course.avatar" :width="90" :height="90" :defaultType="'teacher'" />
                </div>
                <div class="intro-box">
                    <div class="txt-box">
                        <div class="title-box">
                            <div class="course-label-box">
                                <button class="label" v-if="value.course.isAudition == 1 && value.course.sellPrice != 0">试听</button>
                                <button class="label" v-else-if="value.course.operationLabel == 1">热门</button>
                                <button class="label" v-else-if="value.course.tags.length > 0">{{value.course.tags[0].name}}</button>
                                <span class="title" v-html="$utils.setWordBreak({type: 'packageIntroTitle',text: value.course.name, width: (value.isAudition == 1 && value.sellPrice != 0 ? 100 + 35: value.course.tags.length>0 ?100+(value.course.tags[0].name.length * 12 + 20):100)})"></span>
                            </div>
                        </div>
                        <!-- <p class="title" v-html="$utils.setWordBreak({type: 'packageIntroTitle',text: value.course.name,})"></p> -->
                        <p class="detail">{{value.course.teacherName}} | {{value.course.teacherTitle}}</p>
                    </div>
                    <footer class="intro-footer">
                        <div class="price-box">
                            <span class="tip">课程组合内学费:</span>
                            <span class="price">￥{{(((value.mealPrice) || 0)/100).toFixed(2)}} </span>
                        </div>
                        <div class="addition-box">
                            <span class="num">{{value.course.joinNum4V}}</span> 已学 ·
                            <span class="num">{{value.course.likeNum4V}}</span> 赞</div>
                    </footer>
                </div>
            </div>
        </div>
        <!-- <footer class="package-footer">
            <button class="btn more-btn">点击查看更多课程</button>
        </footer> -->
    </section>
</template>

<script>
export default {
  props: {
    list: Array,
    isBuy: {
      type: Number,
      default: 0
    }
  },
  computed: {},
  created() {},
  mounted() {
    this.$bus.$emit("super:blazy-revalidate");
  },
  methods: {
    openTip(course) {
      if (course.onSell || this.isBuy) {
        this.$router.push({
          name: "CourseDetail",
          params: {
            id: course.id
          }
        });
      } else {
        // this.$super.buyTip.show({
        //   type: "normal",
        //   infoType: "noSell"
        // });
        this.$super.modalTip.show({
          type: "normal",
          content: "sorry，本课程是课程组合限定课程，不能单独报名查看",
          close: true,
          autoHide: true,
        });
      }
    }
  }
};
</script>