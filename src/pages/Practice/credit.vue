<template>
  <section id="practice-credit-wrap">
    <header class="credit-wrap-banner">
      <p class="wrap-banner-title">
        <span class="wrap-banner-title__name">当前学分</span>
        <router-link :to="{path: '/practice/'+ comboId +'/creditRule'}" tag="span" class="wrap-banner-title__rule">学分规则</router-link>
      </p>
      <div class="wrap-info-progress">
        <p class="wrap-info-progress__res">
          <span class="num">{{totalCredit}}</span>
          <span class="symbol">学分</span>
        </p>
        <div class="info-progress-container">
          <p class="info-progress-container__line info-progress-container__bg"></p>
          <p class="info-progress-container__line info-progress-container__progress" :style="{width: (totalCredit * 5) + '%'}"></p>
          <p class="info-progress-container__tip info-progress-container__0">
            <span class="symbol">学习进程</span>
          </p>
          <p class="info-progress-container__tip info-progress-container__60">
            <span class="symbol">低调结课</span>
          </p>
          <p class="info-progress-container__tip info-progress-container__85">
            <span class="symbol">优秀学员</span>
          </p>
        </div>
      </div>
    </header>
    <section class="credit-wrap-lists">
      <p class="credit-wrap-lists__title">学习记录</p>
      <template v-if="typeof(data) == 'object'">
        <div class="credit-null-wrap" v-if="!data.length">
          <img :src="require('@/assets/images/noCourse.png')" width="100px" />
          <p class="credit-null-wrap__txt">
            开班后，完成学习任务即可获得学分<br/>具体开班时间与学习任务详情<br/>请在学习群中咨询<br/>
          </p>
          <a href="http://qm.qq.com/cgi-bin/qm/qr?k=XiQ3ApmQMKEkHFPoEG28OmyOF6pw0YZi" class="credit-null-wrap__btn">点击加群</a>
        </div>
        <div class="wrap-lists-item" v-for="(value, index) in data" :key="value.id" v-else>
          <div class="wrap-lists-item__txt">
            <p class="title">{{value.title}}</p>
            <p class="date">{{$utils.setIssueTime(value.gmtCreate, 'mm-dd')}}</p>
          </div>
          <p class="wrap-lists-item__credit">+{{value.credit}}</p>
        </div>
      </template>
    </section>
  </section>
</template>

<script>
export default {
  name: "PracticeCredit",
  data() {
    return {
      totalCredit: 0,
      data: "",
      comboId: this.$route.params.id
    };
  },
  beforeDestroy() {},
  created: function() {
    let that = this;
    this.$API
      .getCreditDetailList({
        comboId: this.comboId //this.$store.state.user.data.practiceComboId
      })
      .then(data => {
        for (var total = 0, i = 0, len = data.length; i < len; i++) {
          total += data[i].credit;
        }
        this.totalCredit = total;
        this.data = data;
      });
  },
  mounted: function() {
    if (this.$utils.isSuperBrowser) {
      this.$utils.setShare({ institute: true });
    } else if (this.$utils.isWXBrowser) {
      this.$weixin.init({ institute: true });
    }
  },
  methods: {}
};
</script>
<!-- Add "scoped" attribute to limit CSS to this component only-->
<style lang="postcss" scoped>
@import "../../styles/common.pcss";
#practice-credit-wrap {
  background-color: #fff;
  .credit-wrap-banner {
    padding: 30px;
    height: 300px;
    background: url(../../assets/images/practice/bg.png) 100% 100% no-repeat;
    color: #fefefe;
    font-size: 32px;
    ine-height: 36px;
    background-size: cover;
    .wrap-banner-title {
      height: 100px;
      .wrap-banner-title__name {
        float: left;
      }
      .wrap-banner-title__rule {
        float: right;
        &:after {
          content: "";
          display: inline-block;
          width: 0;
          height: 0;
          margin-left: 20px;
          border-top: 8px solid transparent;
          border-bottom: 8px solid transparent;
          border-left: 11px solid #fefefe;
        }
      }
    }
    .wrap-info-progress {
      .wrap-info-progress__res {
        color: #fff;
        font-size: 24px;
        .num {
          font-size: 54px;
        }
        .symbol {
          color: #8fb1e2;
        }
      }
      .info-progress-container {
        margin-top: 20px;
        height: 10px;
        position: relative;
        .info-progress-container__progress {
          background-color: #ffffff;
          z-index: 4;
        }
        .info-progress-container__bg {
          background-color: #8fb1e2;
          width: 100%;
          z-index: 2;
        }
        .info-progress-container__line {
          height: 10px;
          border-radius: 5px;
          position: absolute;
          top: 0;
        }
        .info-progress-container__tip {
          position: absolute;
          top: 10px;
          line-height: 74px;
          color: #8fb1e2;
          width: 120px;
          z-index: 10;
          font-size: 24px;
          text-align: center;
          .symbol {
            position: absolute;
            display: inline-block;
            width: 120px;
          }
          &:before {
            content: "";
            position: absolute;
            top: -10px;
            left: 0px;
            display: inline-block;
            width: 8px;
            height: 10px;
            background-color: #6c95cf;
          }
        }
        .info-progress-container__0 {
          left: 0;
          .symbol {
            left: 0;
          }
          &:before {
            display: none;
          }
        }
        .info-progress-container__60 {
          left: 60%;
          .symbol {
            left: -50px;
          }
        }
        .info-progress-container__85 {
          left: 85%;
          .symbol {
            left: -50px;
          }
        }
      }
    }
  }
  .credit-wrap-lists {
    padding: 40px;
    .credit-wrap-lists__title {
      font-size: 32px;
      color: #404040;
      margin-bottom: 30px;
    }
    .credit-null-wrap {
      text-align: center;
      font-size: 0;
      line-height: 0;
      padding-top: 40px;
      .credit-null-wrap__txt {
        margin: 40px 0;
        font-size: 28px;
        line-height: 40px;
        color: #999;
      }
      .credit-null-wrap__btn {
        @extend %normal-btn;
        height: 60px;
        line-height: 60px;
        padding: 0 40px;
        border-radius: 30px;
        display: inline-block;
      }
    }
    .wrap-lists-item {
      @extend %flex-parent;
      height: 123px;
      border-bottom: 2px solid #e6e6e6;
      .wrap-lists-item__txt {
        @extend %flex-child;
        padding-right: 20px;
        overflow: hidden;
        .title {
          font-size: 28px;
          height: 80px;
          line-height: 80px;
          color: #404040;
          white-space: nowrap;
          text-overflow: ellipsis;
          overflow: hidden;
        }
        .date {
          font-size: 24px;
          color: #8c8c8c;
        }
      }
      .wrap-lists-item__credit {
        font-size: 40px;
        color: #e56161;
        line-height: 123px;
      }
    }
  }
}
</style>
