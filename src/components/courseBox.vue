<template>
  <section class="class-box">
    <router-link tag="header" :to="{path: '/course/' + classInfo.id}" class="class-header">
      <s-img class="icon" :src="classInfo.cover" :defaultType="'package'" :offset="500" />
      <section class="class-header-progress-box" v-if="!isExhibition">
        <p class="class-header-progress-box__line  class-header-progress-box__bg"></p>
        <p class="class-header-progress-box__line class-header-progress-box__progress" :style="{width: classInfo.progressRate * 100 + '%'}"></p>
        <p class="class-header-progress-box__num" :style="{left: classInfo.progressRate * 100 + '%'}">{{(classInfo.progressRate * 100).toFixed(0)}}%</p>
      </section>
      <p class="class-header__type">
        {{classInfo.lessonType == 1?'选修课程': classInfo.lessonType == 2?'必修课程': classInfo.lessonType == 3?'拓展课程': '辅修课程'}}
      </p>
    </router-link>
    <section class="class-container">
      <header class="class-container__info">{{classInfo.name}}</header>
      <section class="class-container-control">
        <template v-if="isExhibition">
          <p class="class-container-control__intro">{{classInfo.courseShortIntro}}</p>
          <p class="class-container-control__data">
            <span class="symbol">{{classInfo.joinNum4V}}</span> 已学 |
            <span class="symbol">{{classInfo.likeNum4V}}</span> 赞
          </p>
        </template>
        <template v-else-if="classInfo.courseType == 0 && classInfo.lastReSectionBO">
          <span class="symbol">{{isPractice? '教材阅读进度': '你正在学习'}}</span>
          <span class="class-container-control__name" @click="toLearning( classInfo.id, classInfo.progress, classInfo.lastReSectionBO.thirdUrl)">{{classInfo.lastReSectionBO.name}}</span>
        </template>
        
      </section>
    </section>
  </section>
</template>
<script>
// import API from "@/plugins/API";

export default {
  data() {
    return {};
  },
  props: ["classInfo", "isExhibition", "isPractice"], //isExhibition 是否仅为展示 , isPractice 是否为训练营课程
  computed: {},
  mounted() {
    this.$bus.$emit("super:blazy-revalidate");
  },
  methods: {
    toLearning(id, progress, thirdUrl) {
      if (thirdUrl) {
        //第三方跳转
        window.location.href = thirdUrl;
      } else {
        this.$router.push({
          name: "Learning",
          params: {
            id: id,
            pageNum: (progress*1+1) || 1
          }
        });
      }
    }
  }
};
</script>