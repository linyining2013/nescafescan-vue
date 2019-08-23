<template>
  <section class="class-box">
    <router-link tag="header" :to="{path: (((classInfo.lineType == 1)?('/practice/'):('/package/'))  + classInfo.id)}" class="class-header">
      <s-img class="icon" :src="classInfo.cover" :defaultType="'package'" :offset="500" />
      <section class="class-header-progress-box" v-if="!isExhibition">
        <p class="class-header-progress-box__line  class-header-progress-box__bg"></p>
        <template v-if="classInfo.lineType == 1">
          <p class="class-header-progress-box__line class-header-progress-box__progress" :style="{width: classInfo.extraBO.progressRate * 100 + '%'}"></p>
          <p class="class-header-progress-box__num" :style="{left: classInfo.extraBO.progressRate * 100 + '%'}">{{(classInfo.extraBO.progressRate * 100).toFixed(0)}}%</p>
        </template>
        <template v-else>
          <p class="class-header-progress-box__line class-header-progress-box__progress" :style="{width: classInfo.progressRate * 100 + '%'}"></p>
          <p class="class-header-progress-box__num" :style="{left: classInfo.progressRate * 100 + '%'}">{{(classInfo.progressRate * 100).toFixed(0)}}%</p>
        </template>
      </section>
      <p class="class-header__type">
        {{classInfo.lessonType == 1?'选修课程': classInfo.lessonType == 2?'必修课程': classInfo.lessonType == 3?'拓展课程': '辅修课程'}}
      </p>
      <!-- classInfo.courseType == 1 && (classInfo.id == $store.state.user.data.practiceComboId)?'新媒体营销学院': -->
    </router-link>
    <section class="class-container">
      <header class="class-container__info">
        <template v-if="classInfo.lineType == 1">{{classInfo.name}}</template>
        <template v-else>
          【{{classInfo.courseNum}}节课】{{classInfo.name}}
        </template>
      </header>
      <section class="class-container-control">
        <template v-if="isExhibition">
          <p class="class-container-control__data">
            <span class="symbol">{{classInfo.joinNum4V}}</span> 已学 |
            <span class="symbol">{{classInfo.likeNum4V}}</span> 赞
          </p>
        </template>
        <template v-else-if="(classInfo.lineType == 1 || classInfo.lineType == 2)">
          <p>
            <span class="symbol">当前学分</span>
            <span @click="toLink(('/practice/'  + classInfo.id + '/credit'), classInfo.name)" class="score">{{classInfo.sumCredit}}</span>
          </p>
        </template>
        <template v-else-if="classInfo.lastReCourseBO">
          <span class="symbol">你正在学习</span>
          <router-link tag="span" class="class-container-control__name" :to="{path: ('/course/'+ classInfo.lastReCourseBO.id)}">{{classInfo.lastReCourseBO.name}}</router-link>
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
  props: ["classInfo", "isExhibition"],
  computed: {},
  mounted() {},
  methods: {
    toLink(url, name){
      document.title = name;
      this.$router.push(url);
    }
  }
};
</script>