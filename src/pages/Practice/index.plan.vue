<template>
  <section id="practice-plan-wrap">
    <section class="plan-wrap-item" v-for="(value, index) in comboPlanDetails" :key="value.id" :class="{'slide-out': (value.id == slideOutId)}">
      <template v-if="isRender && renderSlide(value)"></template>
      <p class="plan-wrap-item__title" @click="(slideOutId == value.id?slideOutId='':slideOutId = value.id)">{{value.title}}</p>
      <section class="plan-wrap-slidebox">
        <div class="plan-wrap-item__content" v-html="value.content"></div>
        <div class="wrap-item-list" v-if="value.comboPlanSectionBOs.length">
          <p class="wrap-item-list__title">本周学习计划</p>
          <div class="item-list-item" v-for="(sectionBOs, indexSection) in value.comboPlanSectionBOs" :key="sectionBOs.sId" v-if="sectionBOs.sectionBO">
            <p class="item-list-item__title">{{sectionBOs.sectionBO && sectionBOs.sectionBO.name}}</p>
            <template v-if="value.startTime <= nowDateTime">
              <button class="item-list-item__btn " v-if="!sectionBOs.sectionBO" disabled>BUG</button>
              <button @click="toLearning( sectionBOs.sectionBO.courseId, sectionBOs.sectionBO.id, sectionBOs.sectionBO.thirdUrl)" class="item-list-item__btn" :class="{disabled: sectionBOs.isReadFinished == 1}" v-else>{{sectionBOs.isReadFinished == 1 ?'已学习' :'去学习'}}</button>
            </template>
          </div>
        </div>
      </section>
    </section>
  </section>
</template>

<script>
// import API from "../../plugins/API";
// import _ from "lodash";
export default {
  data() {
    return {
      packageData: "",
      slideOutId: 0,
      isRender: true,
      nowDateTime: new Date().getTime()
    };
  },
  props: ["comboPlanDetails", "extraBO"],
  beforeDestroy() {},
  created: function() {},
  mounted: function() {
  },
  methods: {
    renderSlide(value) {
      if (
        value.endTime > this.nowDateTime &&
        value.startTime < this.nowDateTime
      ) {
        this.slideOutId = value.id;
      }
      if (this.extraBO.endTime == value.endTime) {
        this.isRender = false;
      }

      return false;
    },
    toLearning(id, sectionId, thirdUrl) {
      if (thirdUrl) {
        //第三方跳转
        window.location.href = thirdUrl;
      } else {
        this.$router.push({
          name: "Learning",
          params: {
            id: id,
            pageNum: 1
          },
          query: { sectionId: sectionId }
        });
      }
    }
  }
};
</script>