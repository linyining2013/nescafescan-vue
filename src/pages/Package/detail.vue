<template>
  <section class="package-wrap" id="package-detail-wrap" v-if="packageData.id">
    <header class="cover">
      <s-img :defaultType="'packageBanner'" :src="packageData.banner" />
    </header>
    <!-- <header class="cover" :style="{width: banner.w + 'px', height: banner.h + 'px'}"><img :style="[transformStyle]" :src="packageData.banner"/></header> -->
    <section class="info-box">
      <p class="title">【{{packageData.comboDetails.length}}节课】{{packageData.name}}</p>
      <div class="package-label">
        <div class="label-box">
          <p class="label audition" v-if="packageData.isAudition == 1 && packageData.sellPrice != 0">试听</p>
          <p class="label hot" v-if="packageData.operationLabel == 1">热门</p>
          <p class="label" v-for="(tag, tagIndex) in packageData.tags" :key="tag.id">{{tag.name}}</p>
        </div>
        <div class="addition">
          <span class="num">{{packageData.joinNum4V}}</span> 已学 ·
          <span class="num">{{packageData.likeNum4V}}</span> 赞</div>
      </div>
      <div class="intro" :class="{'slideUp': isSlide,'slide-box': isSlideBox}">
        <div id="intro-box" class="intro-box" v-html="packageData.intro"></div>
        <div class="intro-mask" v-show="isSlide"></div>
        <div class="intro-btn-box">
          <button class="intro-slide-btn" @click="isSlide = !isSlide">{{isSlide == true ? "点击查看更多": "点击收起"}}</button>
        </div>
      </div>
      <p class="price">
        <span class="tip">组合学费:</span>
        <span class="cur-price">￥{{((packageData.sellPrice || 0)/100).toFixed(2)}} </span>
        <span class="ori-price">原学费共计:￥{{( (packageData.originPrice || 0)/100).toFixed(2)}}</span>
      </p>
    </section>
    <nav id="package-nav">
      <ul class="btn-wrap">
        <router-link :to="{path: `/package/${id}`}" exact-active-class='active' tag="li" class="item-btn" replace>
          <p>包含课程({{packageData.comboDetails.length}})</p>
        </router-link>
        <template v-if="$utils.isSuperBrowser || $utils.isWXBrowser">
          <router-link :to="{path: `/package/${id}/comments`}" exact-active-class='active' tag="li" class="item-btn" replace>
            <p>用户评价
              <span class="symbol">({{packageData.score4V == 0 ? '暂无评分': packageData.score4V + '分'}})</span>
            </p>
          </router-link>
        </template>
        <template v-else>
          <li class="item-btn package me" v-on:click="openTip">
            <p>用户评价
              <span class="symbol">({{packageData.score4V == 0 ? '暂无评分': packageData.score4V + '分'}})</span>
            </p>
          </li>
        </template>

      </ul>
    </nav>
    <section class="transition-parent">
      <transition name="package-nav">
        <keep-alive>
          <router-view :list="packageData.comboDetails" :isBuy="packageData.isBuy" :score="packageData.score4V" />
        </keep-alive>
      </transition>
    </section>

    <payBtn :course="packageData"></payBtn>
    <!-- <footer class="package-footer" v-show="!packageData.isBuy">
      <button class="btn buy-btn" @click="buyNow">打包购买 ￥{{((packageData.sellPrice||0)/100).toFixed(2)}}</button>
    </footer> -->
  </section>
</template>

<script>
// import this.$API from "../../plugins/this.$API";
import jsuper from "exports-loader?jsuper!@/../node_modules/SuperBrowserLibs/dist/jsuperV2.js";
import _ from "lodash";
import payBtn from "@/components/PayBtn.vue";

// import {mapState, mapMutations, mapActions} from 'vuex';
// <p @click="addAction">{{$store.state.count}} - {{count}}- {{testCount}}</p>
// ...mapState({
//         count: 'count',
//         testCount: state=>state.test.count  //理解为传入state对象，修改state.count属性
//     })
// ...mapMutations([
//             'add','reduce'
//         ]),
//     ...mapActions(['addAction','reduceAction']),

export default {
  components: {
    payBtn: payBtn
  },
  data() {
    return {
      isSlideBox: false,
      isSlide: true,
      id: this.$route.params.id,
      packageData: {},
      // isBuy: 0,
      banner: {
        w: document.body.clientWidth,
        mxh: parseInt(document.body.clientWidth * 2 / 5),
        h: parseInt(document.body.clientWidth * 2 / 5)
      },
      acceleration: { x: 0, y: 0, z: 0 }
    };
  },
  beforeRouteEnter(to, from, next) {
    if (to.params.id == 10) {
      // next('/Institute/newmediamarketing');
      window.location.replace(window.location.origin + window.location.pathname + '#/Institute/newmediamarketing')
    } else {
      next();
    }
  },
  mounted: function() {
    document.title = "课程组合";

    this.getDetailCombo(data => {
      this.updateData(data);
      this.$nextTick(() => {
        //dom已更新
        let that = this;
        setTimeout(() => {
          if (document.getElementById("intro-box").offsetHeight >= 250) {
            that.isSlideBox = true;
          }
        });
        window.scrollTo(0, 1);
        window.scrollTo(0, 0);

        this.renderShare();

        this.$bus.$emit("super:blazy-revalidate");
      });
    });
  },
  methods: {
    // setSlide(value){
    //   return !value ? false : (value.replace(/<[^>]+>/g, "").substr(0, 100).replace(/(&)|(n)|(b)|(s)|(p)|(;)/g, '').length > 50? true: false);
    // },
    updateData(data) {
      // this.isBuy = data.isBuy;
      this.packageData = data;
    },
    getDetailCombo(fn) {
      this.$API
        .getDetailCombo({ comboId: this.$route.params.id })
        .then(data => {
          this.$ba.trackEvent(`套餐访问:${this.packageData.name}`);
          fn(data);
        });
    },
    openTip() {
      // this.$super.buyTip.show({
      //   type: "download",
      //   onClose: res => {
      //     if (res == 1) {
      //       window.location.href = "http://www.super.cn/jump.php";
      //     } else {
      //       this.$utils.deepLinkTo();
      //     }
      //   }
      // });
      this.$super.modalTip.show({
        type: "download",
        content: `查看评论需要下载<br/>超级课程表APP哦~快去下载吧`,
        autoHide: true,
        onClose: res => {
          if (res == 1) {
            window.location.href = "http://www.super.cn/jump.php";
          } else {
            this.$utils.deepLinkTo();
          }
        }
      });
    },
    renderShare() {
      if (this.$utils.isSuperBrowser) {
        this.$utils.setShare(this.packageData);
      } else if (this.$utils.isWXBrowser) {
        this.$weixin.init(this.packageData);
      } else {
      }
    }
    // buyNow() {
    //   this.$store.dispatch("updateCourseInfo", this.packageData); //把当前支付信息存储起来
    //   this.$super.payment.createOrder({
    //     courseId: this.id,
    //     courseType: 1,
    //     loginData: { id: this.id, name: "Package", checkBuy: 1 }
    //   });
    // }
  }
};
</script>

<!--@import "../../styles/label&Course&pack.pcss"; -->
<style lang="postcss" >
@import "../../styles/common.pcss";

@import "../../styles/package/package.pcss";
@import "../../styles/package/package.comments.pcss";

#package-detail-wrap .cover img {
  transition: transform 0s ease;
}
.package-nav-enter-active,
.package-nav-leave-active {
  position: absolute;
  top: 0;
  width: 100%;
  transition: all 0.5s cubic-bezier(0.55, 0, 0.1, 1);
}

.package-nav-enter-to {
  transform: translate3d(0, 0, 0);
}

.package-nav-leave {
  transform: translate3d(0, 0, 0);
}
.package-nav-enter {
  transform: translate3d(80px, 0, 0);
  opacity: 0;
}
.package-nav-leave-to {
  transform: translate3d(-80px, 0, 0);
  opacity: 0;
}
</style>
