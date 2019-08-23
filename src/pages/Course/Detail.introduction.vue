<template>
  <div class="course-introduction">
      <div class="block">
        <div class="item-header"><label class="item-box">老师介绍</label></div>
        <div class="content content-teacher">
            <div class="teacher-info">
                <img :src="course.avatar" class="teacher-img" width="160px" height="160px" /> 
                <span class="name">{{course.teacherName}}</span>
            </div>
            <p class="teacher-title">
              {{course.teacherTitle}}
            </p>
        </div>
      </div>
      <div class="block">
        <div class="item-header">
          课程简介
        </div>
        <div v-html="course.intro" class="content content-html">
            
        </div>
      </div>
  </div> 
</template>


<script>
export default {
  name: "course-introduction",
  props: {
    course: Object
  }
};
</script>

<style src="@/styles/course/detail.introduction.pcss" lang="postcss" />

