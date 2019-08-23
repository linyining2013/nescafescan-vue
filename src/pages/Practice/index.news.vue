<template>
  <section id="practice-news-wrap">
    <p class="practice-news-wrap__title">学习通知</p>
    <div class="news-wrap-container">
      <div class="wrap-container-item" v-for="(value, index) in tips" :key="value.id">
        <div class="wrap-container-item__timeline" :class="{today: index == 0}">
          <p class="pointer-box">
            <span class="pointer"></span>
            <span class="symbol">{{setTime(value.sendTime)}}</span>
          </p>
        </div>
        <div class="container-item-content" v-html="value.content"></div>
      </div>
    </div>
    <footer class="practice-news-wrap__tip">到底了~</footer>
  </section>
</template>

<script>
// import API from "../../plugins/API";
// import _ from "lodash";
export default {
  data() {
    return {
      packageData: "",
       comboId: this.$route.params.id
    };
  },
  props: ["tips"],
  beforeDestroy() {},
  created: function() {},
  mounted: function() {
    // if (this.$store.state.user.unReadNum >= 0) {
      this.$API
        .updateTipsReadRecord({
          courseType: 1,
          courseId: this.comboId //this.$store.state.user.data.practiceComboId
        })
        .then(data => {
          this.$store.dispatch("updateUnReadNum", 0);
        });
    // }
  },
  methods: {
    setTime(date) {
      var str = this.$utils.setIssueTime(date, "yyyy/mm/dd HH:MM");
      var d = new Date(str);
      var todaysDate = new Date();
      if (d.setHours(0, 0, 0, 0) == todaysDate.setHours(0, 0, 0, 0)) {
        return "今日";
      } else {
        if (d.getYear() == todaysDate.getYear()) {
          //今年
          return this.$utils.setIssueTime(date, "mm-dd");
        } else {
          return this.$utils.setIssueTime(date, "yyyy-mm-dd");
        }
      }
      // $utils.setIssueTime()
    }
  }
};
</script>

