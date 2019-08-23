<template>
  <section id="practice-course-wrap">
    <p class="practice-course-wrap__title">本学期全部课程
      <span class="symbol">共{{comboDetails.length || 0}}门课</span>
    </p>
    <div class="course-wrap-container" v-if="comboDetails">
      <template v-for="(value, index) in comboDetails">
        <courseBox :key="'class_'+value.id" :classInfo="value.course" :isPractice="true"></courseBox>
      </template>
    </div>
  </section>
</template>

<script>
import courseBox from "@/components/courseBox.vue";

export default {
  name: "PracticeCourse",
  components: {
    courseBox
  },
  data() {
    return {
      comboDetails: "",
      comboId: this.$route.params.id
    };
  },
  beforeDestroy() {},
  created: function() {
    this.$API
      .getComboDetailV2({
        comboId: this.comboId //this.$store.state.user.data.practiceComboId
      })
      .then(data => {
        this.comboDetails = data.comboDetails;
      });
  },
  mounted: function() {}
};
</script>
<!-- Add "scoped" attribute to limit CSS to this component only-->
<style lang="postcss" scoped>
#practice-course-wrap {
  background: #fff;
  padding: 40px;
  color: #404040;
  line-height: 36px;
  .practice-course-wrap__title {
    font-size: 32px;
    margin-bottom: 40px;
    font-weight: bold;
    .symbol {
      font-size: 24px;
      color: #8c8c8c;
      float: right;
    }
  }
  .course-wrap-container {
  }
}
</style>
