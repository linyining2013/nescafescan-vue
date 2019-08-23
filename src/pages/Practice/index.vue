<template>
  <section id="practice-wrap" v-if="packageData" :style="{'min-height': (getWindowStyle().height) + 'px'}">
    <header class="practice-wrap-banner" :style="{'background-size': 'cover', 'background-image': 'url('+ packageData.banner +')'}">
      <!-- <s-img :defaultType="'packageBanner'" :src="packageData.banner" /> -->
      <div class="practice-wrap-banner-bg">
        <section class="practice-wrap-info">
          <div class="wrap-info-header">
            <p class="wrap-info-header__title">{{packageData.name}}</p>
            <router-link :to="{path: '/practice/'+  comboId +'/credit'}" tag="div" class="info-header-score">
              <p class="info-header-score__res">{{packageData.sumCredit || 0}}</p>
              <p class="info-header-score__txt">当前学分</p>
            </router-link>
          </div>
          <div class="wrap-info-progress">
            <p class="wrap-info-progress__res">学期进度</p>
            <div class="info-progress-container">
              <p class="info-progress-container__line info-progress-container__bg"></p>
              <p class="info-progress-container__line info-progress-container__progress" :style="{width: packageData.extraBO.progressRate * 100 + 5 + '%'}"></p>
              <p class="info-progress-container__control" :style="{left: packageData.extraBO.progressRate * 100 + '%'}">{{packageData.extraBO.progressRate * 100}}%</p>
            </div>
          </div>
          <div class="wrap-info-detail">
            <div class="info-detail-item info-detail-flex">
              <p class="info-detail-item__title">QQ群号</p>
              <p class="info-detail-item__txt">723842078</p>
            </div>
            <div class="info-detail-item info-detail-wx">
              <p class="info-detail-item__title">班主任微信</p>
              <p class="info-detail-item__txt">wanghequn0415</p>
            </div>
            <div class="info-detail-item info-detail-flex">
              <p class="info-detail-item__title">你的学号</p>
              <p class="info-detail-item__txt">{{$store.state.user.data.student.studentNo}}</p>
            </div>
          </div>
        </section>
        <footer class="practice-wrap-nav">
          <section class="practice-wrap-nav__boxstyle">
            <router-link :to="{path: '/practice/'+ comboId}" exact-active-class='active' tag="button" class="practice-wrap-nav__btn" replace>
              学习计划
            </router-link>
            <router-link :to="{path: '/practice/'+  comboId +'/news'}" exact-active-class='active' tag="button" class="practice-wrap-nav__btn" replace>
              学习通知
            </router-link>
          </section>
        </footer>
      </div>
    </header>
    <section class="transition-parent">
      <transition name="slide-left">
        <keep-alive>
          <router-view :comboPlanDetails="packageData.comboPlanDetails" :extraBO="packageData.extraBO" :tips="packageData.tips" />
        </keep-alive>
      </transition>
    </section>
    <!-- <footer id="practice-plan-footer" class="practice-plan-footer" v-if="packageData.extraBO.endTime <= new Date().getTime()">
      <router-link tag="button" :to="{path: '/practice/'+  comboId +'/course'}" class="practice-plan-footer__btn" type="button">回顾全部课程</router-link>
    </footer> -->
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
  beforeDestroy() {},
  created: function() {},
  mounted: function() {
    this.getDetailCombo(data => {
      this.updateData(data);
      this.$nextTick(() => {
        document.title = data.name;
        this.$bus.$emit("super:blazy-revalidate");
      });
    });

    if (this.$utils.isSuperBrowser) {
      this.$utils.setShare({ institute: true });
    } else if (this.$utils.isWXBrowser) {
      this.$weixin.init({ institute: true });
    }
  },
  methods: {
    getWindowStyle() {
      return {
        height: window.innerHeight, //document.body.clientWidth / 25 * 7 + "px",
        width: window.innerWidth
      };
    },
    updateData(data) {
      // this.isBuy = data.isBuy;
      this.packageData = data;
    },
    getDetailCombo(fn) {
      this.$API
        .getDetailCombo({
          comboId: this.comboId
        })
        .then(data => {
          this.$ba.trackEvent(`套餐访问:${this.packageData.name}`);
          fn(data);
        });
    }
  }
};
</script>
<!-- Add "scoped" attribute to limit CSS to this component only-->
<style lang="postcss">
@import "../../styles/common.pcss";
@import "../../styles/practice/practice.index.pcss";
</style>
