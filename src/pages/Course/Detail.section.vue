<template>
  <div class="course-section">
    <div class="block" :class="{'course-section-buy':course.sellPrice === 0 || course.isBuy}">
      <div class="item-header">
        <label class="item-box">课程目录</label>
      </div>
      <template v-if="course.sellPrice === 0 || section.isAudition == 1 || course.isBuy" v-for="(section,index) in sections">
        <div class="section-item" :key="'section_'+section.id" @click="toLearning((index * 1+1), section.thirdUrl)">
          <sectionBox :section="section" :course="course" :index="index"></sectionBox>
        </div>
      </template>
      <template v-else>
        <div class="section-item" :key="'section_'+section.id" @click="login">
          <sectionBox :section="section" :course="course" :index="index"></sectionBox>
        </div>
      </template>

      <!-- <template v-if="course.sellPrice === 0 || section.isAudition == 1 || course.isBuy">
            <a v-if="course.operator != 'chaoBiao'" :href="section.thirdUrl":href="section.thirdUrl" class="name">{{section.name}}</a>
            <a v-else @click="toLearning((index * 1+1))" href="javascript:;">{{section.name}}
                <span class="hastry small">可试听</span>
                <template v-if="course.operator == 'chaoBiao' && (course.isBuy || course.sellPrice === 0)">
                    <span class="small" v-if="course.preProgress === 0 && index === 0">点击这里开始学习</span>
                    <span class="small" v-if="course.preProgress === 1 && course.progress === index">上次学到这</span>
                </template>
            </a>
        </template>
        <template v-else>
            <a href="javascript:;" class="name" v-on:click="login">{{section.name}}</a>
        </template> -->
    </div>
  </div>
</template>
  
<script>
import Vue from "vue";
Vue.component("sectionBox", {
  // 在 JavaScript 中使用 camelCase
  props: ["section", "course", "index"],
  template: `<div>
              <div class="icon-box">
                  <p class="icon-mark" :class="['mark-type-'+ section.type]"></p>
                  <s-img class="icon" :src="course.avatar" :width="90" :height="90" :defaultType="'teacher'" />
              </div>
              <div class="intro-box">
                  <div class="txt-box">
                      <p class="title"><button class="label">{{section.type == 3 ? '视频': section.type == 2 ? '音频': '图文'}}</button>{{section.name}}</p>
                      <p class="detail">
                        {{section.type == 3 ? ('视频时长: ' +section.during): section.type == 2 ? ('音频时长: ' +section.during): ('阅读时长: ' +section.during)}}分钟
                        <span class="audition" v-show="section.isAudition == 1 && !course.isBuy && course.sellPrice !== 0">可试听</span>
                        <template v-if="course.operator == 'chaoBiao' && (course.isBuy || course.sellPrice === 0)">
                            <span class="audition readable" v-if="course.preProgress === 0 && index === 0">点击这里开始学习</span>
                            <span class="audition readable" v-if="course.preProgress === 1 && course.progress === index">上次学到这</span>
                        </template>
                      </p>
                  </div>
              </div>
            </div>`
});

export default {
  name: "course-section",
  props: {
    sections: Array,
    course: Object
    // preProgress: Number,
    // progress: Number
  },
  methods: {
    toLearning(pageNo, thirdUrl) {
      if (thirdUrl) {//第三方跳转
        window.location.href = thirdUrl;
      } else {
        if (this.course.sellPrice === 0 && !this.course.isBuy) {
          this.$emit("create4Free", pageNo);
        } else {
          this.$router.push({
            name: "Learning",
            params: {
              id: this.course.id,
              pageNum: pageNo || 1
            }
          });
        }
      }
    },
    login() {
      if (!this.$store.state.identity) {
        // this.$super.buyTip.show({ type: "download", infoType: "download"  }); //12.1 暂时去除站外登陆
        this.$router.push({
          name: "newLogin", //原来的为login
          query: { id: this.$route.params.id, type: 0, name: "CourseDetail_Section" }
        });
      }
    }
  }
};
</script>

