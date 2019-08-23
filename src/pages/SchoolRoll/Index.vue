<template>
  <section id="school-roll-wrap" v-if="data.studentInfoBO">
    <div class="school-roll-wrap__tip">*第二大学学籍资料是推荐实习就业的主要依据，请填写真实信息</div>
    <header class="school-roll-wrap-header">
      <div class="school-roll-wrap-header__table">
        <img class="school-roll-wrap__avatar" :src="data.studentInfoBO.avatarUrl || require('@/assets/images/me/default.png')" height="70px" width="70px" />
        <!-- <p class="school-roll-wrap__title">我的职业照</p> -->
      </div>
    </header>
    <section class="school-roll-wrap-box base-info">
      <header class="wrap-box-header">
        <p class="wrap-box-header__name normal-header__title">基本信息</p>
        <router-link tag="p" :to="{path: '/schoolRoll/base'}" class="wrap-box-header__btn">编辑</router-link>
      </header>
      <div class="wrap-box-container">
        <p class="wrap-box-container__item">
          <span class="symbol">*</span> 姓&emsp;&emsp;名:
          <label v-html="this.checkVal(data.studentInfoBO.realName || data.studentInfoBO.nickName)"></label>
        </p>
        <p class="wrap-box-container__item">
          <span class="symbol">*</span> 性&emsp;&emsp;别:
          <label v-html="this.checkVal(data.studentInfoBO.gender == 1?'男': data.studentInfoBO.gender == 0?'女':'')"></label>
        </p>

        <template v-if="data.studentInfoBO.isInPractice == 1">
          <p class="wrap-box-container__item">
            <span class="symbol">*</span> 学&emsp;&emsp;号:
            <label v-html="this.checkVal(data.studentInfoBO.studentNo)"></label>
          </p>
          <p class="wrap-box-container__item">
            <span class="symbol">*</span> 所属学院: {{data.studentInfoBO.virtualSchoolBO.academyName}}</p>
          <p class="wrap-box-container__item">
            <span class="symbol">*</span> 班&emsp;&emsp;级: {{data.studentInfoBO.virtualSchoolBO.profession}}</p>
        </template>
        <p class="wrap-box-container__item">
          <span class="symbol">*</span> 手机号码:
          <label v-html="this.checkVal(data.studentInfoBO.mobileNumber)"></label>
        </p>
      </div>
    </section>
    <section class="school-roll-wrap-box roll-info">
      <header class="wrap-box-header">
        <p class="wrap-box-header__name normal-header__title">教育经历</p>
        <router-link tag="p" :to="{path: '/schoolRoll/edu'}" class="wrap-box-header__btn">编辑</router-link>
      </header>
      <div class="wrap-box-container">
        <div class="box-container-item" v-for="(value, index) in data.studentEduBOs" :key="value.id">
          <p class="wrap-box-container-item__sider">
            <span class="symbol"></span>
          </p>
          <div class="container-item-content">
            <p class="container-item-content__title">{{value.schoolName}}</p>
            <p class="container-item-content__detail">教育时间: {{$utils.setIssueTime(value.enrollmentDate, 'yyyy/mm')}}-{{(value.graduationDate > new Date().getTime())?'至今':$utils.setIssueTime(value.graduationDate, 'yyyy/mm')}}</p>
            <p class="container-item-content__detail">所学专业: {{value.profession}}</p>
            <p class="container-item-content__detail">学&emsp;&emsp;历: {{value.schoolRoll == 0? '本科':value.schoolRoll == 1?'硕士':value.schoolRoll == 2?'博士':'专科'}}</p>
          </div>
        </div>
      </div>
    </section>
    <section class="school-roll-wrap-box study-info" v-if="data.studentInfoBO.isInPractice == 1">
      <header class="wrap-box-header">
        <p class="wrap-box-header__name normal-header__title">学习经历</p>
      </header>
      <div class="wrap-box-container">
        <div class="box-container-item" v-for="(value, index) in data.practiceCourses" :key="value.id">
          <p class="wrap-box-container-item__sider">
            <span class="symbol"></span>
          </p>
          <div class="container-item-content">
            <p class="container-item-content__title">{{value.name}}</p>
            <p class="container-item-content__detail">教育时间: {{$utils.setIssueTime(value.learnStartTime, 'yyyy/mm')}}-{{(!value.learnFinishedTime || value.learnFinishedTime > new Date().getTime())?'至今':$utils.setIssueTime(value.extraBO.learnFinishedTime, 'yyyy/mm')}}</p>
            <p class="container-item-content__detail">课程属性: {{value.lessonType == 1?'选修':value.lessonType == 2?'必修':value.lessonType == 3?'拓展': '辅修'}}</p>
            <p class="container-item-content__detail">学&emsp;&emsp;分: {{value.sumCredit}}</p>
          </div>
        </div>
      </div>
    </section>

    <template v-if="data.studentInfoBO.isInPractice == 1 || (data.studentInfoBO.isInPractice != 1 && data.studentInfoBO.cityName == '广州市')">
      <section class="school-roll-wrap-box job-info">
        <header class="wrap-box-header">
          <p class="wrap-box-header__name normal-header__title">实践经历</p>
        </header>
        <div class="wrap-box-container">
          <p class="wrap-box-container__tip" v-if="data.studentInfoBO.isInPractice != 1">申请入学第二大学新媒体营销学院，可获得实践机会，完成实践任务后，实践经历将会在这里显示，快去申请入学吧！</p>
          <p class="wrap-box-container__tip" v-else-if="data.studentInfoBO.isInPractice == 1 && !data.job.length">努力学习完成实践任务吧</p>
          <div class="box-container-item" v-for="(value, index) in data.job" :key="value.id" v-else>
            <p class="wrap-box-container-item__sider">
              <span class="symbol"></span>
            </p>
            <div class="container-item-content">
              <p class="container-item-content__title">22222</p>
              <p class="container-item-content__detail">职&emsp;&emsp;务: 1111</p>
            </div>
          </div>
        </div>
      </section>
    </template>

    <button class="school-roll__resume" @click="resumeTips">立即生成简历</button>
    <footer class="school-roll-footer">
      <router-link tag="button" :to="{path: '/order'}" class="school-roll-footer__btn order-btn">我的选课记录</router-link>
      <router-link tag="button" :to="{path: '/couponList'}" class="school-roll-footer__btn coupon-btn">我的奖学金</router-link>
    </footer>
  </section>
</template>

<script>
// import API from "../../plugins/API";
// import _ from "lodash";
export default {
  data() {
    return {
      data: {
        job: [],
        // studentInfoBO: {},
        // studentEduBOs: [],
        practiceCourses: []
      }
    };
  },
  beforeRouteEnter(to, from, next) {
    if (document.querySelectorAll("input:focus").length) {
      document.querySelectorAll("input:focus")[0].blur();
    }
    next();
  },
  mounted() {
    document.title = "学籍管理";

    let that = this;
    this.$API.getMySchoolRollInfo().then(data => {
      this.data = data;

      this.$store.dispatch("updateEduInfo", data.studentEduBOs);
    });

    if (this.$utils.isSuperBrowser) {
      this.$utils.setShare();
    } else if (this.$utils.isWXBrowser) {
      this.$weixin.init();
    }
  },
  methods: {
    resumeTips() {
      this.$super.modalTip.show({
        type: "resume",
        content: `<p class="icon" style="background: url(${require("@/assets/images/modal/resumeIcon.png")}) 0 0 no-repeat;background-size: 115px 97px;width: 115px;height: 97px;margin: 0px auto 20px;"></p><p style="font-size: 14px;color: #494949;">你的职业简历正在构建中，<br/>完成第二大学职业必修课的学习，<br/>毕业时给自己一个更具竞争力的简历。<br/>(目前仅针对广州地区用户开放)</p>`,
        autoHide: true,
        close: true,
        onClose: res => {
          if (res == 1) {
            window.scrollTo(1, 1);
            this.$router.push("/practice");
          }
        }
      });
    },
    checkVal(val) {
      return !val ? `<span class="symbol">待填写</span>` : val;
    }
  }
};
</script>


<!-- Add "scoped" attribute to limit CSS to this component only-->
<style lang="postcss">
@import "../../styles/common.pcss";
@import "../../styles/schoolRoll/schoolRoll.index.pcss";
</style>