<template>
  <div v-if="course" class="course-detail" :class="this.tabbarCss">
    <img v-on:click="$utils.deepLinkTo" class="gd-banner" v-if="!$utils.isSuperBrowser && !$utils.isWXBrowser" src="../../assets/images/footerBtn.jpg" width="100%" />
    <header class="cover" :class="{'paddingTop': !$utils.isSuperBrowser && !$utils.isWXBrowser}">
      <img :src="course.banner" width="100%" />
    </header>
    <div class="course-detail-header">
      <h1 class="header-title">{{course.name}}</h1>
      <div class="header-info">
        <div class="label-box">
          <p class="label audition" v-if="course.isAudition == 1 && course.sellPrice != 0">试听</p>
          <p class="label hot" v-if="course.operationLabel == 1">热门</p>
          <p class="label" v-for="(tag, tagIndex) in course.tags" :key="tag.id">{{tag.name}}</p>
        </div>
        <div class="addition">
          <span class="num">{{course.joinNum4V}}</span> 已学 ·
          <span class="num">{{course.likeNum4V}}</span> 赞</div>
      </div>
      <div class="header-price">￥{{((course.sellPrice || 0)/100).toFixed(2)}} </div>
      <div class="header-label">
        <p class="label">课程时长：{{course.during}} 分钟</p>
        <!-- <p class="label">有{{course.joinNum4V}}人参与</p> -->
      </div>
      <!-- <p class="header-paytime">课程时长：{{course.during}} 分钟</p> -->
      <!-- <div class="header-members" :class="{'header-member_no-avatar':avatarUrls.length<1}">
				<img width="80px" height="80px" class="user-img" :src="avatar" v-for="(avatar,index) in avatarUrls" :key="'course-detail-header-avatar_'+index" />
				<span class="header-joinnum">
					等{{course.joinNum4V}}人参与
				</span>
			</div> -->
      <!-- <div class="header-score">
				<span class="score" :class="{noScore: score == 0}">
					<template v-if="score != 0">{{score.toFixed(1)}}分</template>
					<template v-else>暂无评分</template>
				</span>
			</div>   -->
    </div>
    <ul class="course-detail-tabbar" id="course-detail-tabbar" :class="this.tabbarCss">
      <li class="tabbar-item">
        <router-link :to="{path:'/course/'+id}" exact-active-class='active' replace>介绍</router-link>
        <!-- <a @click="changeTab('introduction')" :class="{'active':detailShowTag==='introduction'}" href="javascript:;">介绍</a> -->
      </li>
      <li class="tabbar-item">
        <router-link :to="{path:'/course/'+id+'/section'}" exact-active-class='active' replace>目录
          <span v-if="course.operator == 'chaoBiao' && hasAudition && course.sellPrice" class="has-audition">(可试听)</span>
        </router-link>
      </li>
      <li class="tabbar-item">
        <template v-if="$utils.isSuperBrowser || $utils.isWXBrowser">
          <router-link :to="{path:'/course/'+id+'/comments'}" exact-active-class='active' replace>评价
            <span class="symbol">({{course.score4V == 0 ? '暂无评分': course.score4V + '分'}})</span>
          </router-link>
        </template>
        <template v-else>
          <a v-on:click="openTip" href="javasctipt:void(0)">评价
            <span class="symbol">({{course.score4V == 0 ? '暂无评分': course.score4V + '分'}})</span>
          </a>
        </template>
      </li>
    </ul>

    <div class="transition-parent">
      <transition :name="courseDetailTransitionName">
        <router-view class="course-detail-content-wrap" :courseId="id" :course="course" :sections="section" v-on:create4Free="create4Free" />
        <!-- :progress="progress" :preProgress="preProgress"  -->
      </transition>
    </div>

    <payBtn :course="course"></payBtn>
  </div>
</template>


<script>
// import "@/utils/jquery.min";
// import "@/utils/vhallSDK";
// import API from "@/plugins/API";
import _ from "lodash";
import DetailIntroduction from "./Detail.introduction";
import DetailSection from "./Detail.section";
import DetailComment from "./Detail.comment";
import payBtn from "@/components/PayBtn.vue";

// let checkPayStatusDelay = 1000;
// let checkPayTimes = 0;

export default {
  components: {
    "course-introduction": DetailIntroduction,
    "course-section": DetailSection,
    "course-comment": DetailComment,
    payBtn: payBtn
  },
  data() {
    return {
      id: this.$route.params.id,
      course: null,
      avatarUrls: null,
      section: null,
      comments: null,
      // detailShowTag: this.routeChangeTab(),
      courseDetailTransitionName: "slide-left",
      score: 5,
      tabbarCss: "",
      scroll: {
        top: 0,
        offsetTop: 0
      }
      // preProgress: 0,
      // progress: 0
    };
  },
  // created(){
  //   while (API.sources.length > 0) {
  //       console.log(1111);
  //       API.sources.pop()("中断请求！")
  //   };
  // },
  mounted() {
    // console.log(VHALL_SDK);
    console.log(this.$utils.isSuperBrowser, 11)
    document.title = "课程详情";

    this.getCourseDetail(data => {
      // this.updateData(data);
      // let len = (data.course.operationLabel == 1 ? 1: 0) + ((data.course.isAudition == 1 && data.course.sellPrice != 0) ?1: 0);
      // data.course.tags.length = 5 - len;

      this.score = data.course.score4V;
      this.course = data.course;
      this.section = data.section;
      this.avatarUrls = data.avatarUrls;

      // API.addRecord({
      //   //记录用户访问
      //   courseId: data.course.id,
      //   courseType: 0
      // });

      this.$nextTick(() => {
        //dom已更新
         window.scrollTo(0, 1);
        this.renderShare();
        // if (this.$store.state.checkBuy == 1) {
        //   //检查是否购买
        //   this.$store.dispatch("updateCheckBuy", 0);
        //   if (this.course.isBuy == 1) {
        //     //已经购买该课程
        //     this.$super.buyTip.show({
        //       type: "normal",
        //       infoType: "isBuy"
        //     });
        //   } else {
        //     //未购买
        //     this.buyNow();
        //   }
        // }

        (this.course.isBuy || this.course.sellPrice === 0) &&
          this.changeTab("section");
      });
    });

    if (this.$utils.isAndroid)
      window.addEventListener("scroll", this.handleScroll, false);
    else {
      this.tabbarCss = "sticky";
    }
  },

  beforeDestroy() {
    // this.$super.buyTip.hide();
    if (this.$utils.isAndroid)
      window.removeEventListener("scroll", this.handleScroll);
  },
  methods: {
    handleScroll() {
      let obj = document.getElementById("course-detail-tabbar");
      if (!obj) {
        return false;
      }
      let scrollTop =
          window.pageYOffset ||
          document.documentElement.scrollTop ||
          document.body.scrollTop,
        _height = obj.offsetHeight,
        _top = obj.offsetTop;

      this.scroll.offsetTop =
        this.scroll.offsetTop > _top ? this.scroll.offsetTop : _top;
      let dis = this.scroll.offsetTop - this.scroll.top;

      if (scrollTop + (dis < 0 ? 0 : -1 * _height) >= this.scroll.offsetTop) {
        this.tabbarCss = "fixTop";
      } else {
        this.tabbarCss = "";
      }

      this.scroll.top = scrollTop;
    },
    // updateData(data) {
    //   this.score = data.course.score4V;
    //   this.course = data.course;
    //   this.section = data.section;
    //   this.avatarUrls = data.avatarUrls;
    // },
    getCourseDetail(fn) {
      // fetch('http://192.168.10.237:9080/course/Course/getCourseDetail.action');

      this.$API
        .getCourseDetail({
          id: this.id
        })
        .then(data => {
          this.$ba.trackEvent(`课程访问:${data.course.name}`);
          fn(data);
        })
        .catch(error => {
          console.log(error);
        });
    },
    routerTo(pageNo) {
      this.$router.push({
        name: "Learning",
        params: {
          id: this.id,
          pageNum: pageNo
        }
      });
    },
    create4Free(pageNo) {
      //创建免费订单
      if (this.$store.state.identity) {
        this.$API
          .create4Free({
            courseId: this.id,
            courseType: 0,
            os: this.$utils.isSuperBrowser ? 0 : this.$utils.isWXBrowser ? 1 : 2 //支付平台 0: app 1：公众号 2：h5
          })
          .then(data => {
            this.routerTo(pageNo || 1);
          });
      } else {
        this.routerTo(pageNo || 1);
      }
    },
    openTip() {
      this.$super.modalTip.show({
        type: "download",
        content: "查看评论需要下载<br/>超级课程表APP哦~快去下载吧",
        close: true,
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
        this.$utils.setShare(this.course);
      } else if (this.$utils.isWXBrowser) {
        this.$weixin.init(this.course);
      }
    },
    buyNow() {
      //调起支付
      // store.state.user.id = ;
      // this.$store.dispatch("updateCourseInfo", this.course); //把当前支付信息存储起来
      // this.$super.payment.createOrder({
      //   courseId: this.id,
      //   loginData: { id: this.id, name: "CourseDetail", checkBuy: 1 }
      // });
    },
    changeTab(tabTag) {
      // this.detailShowTag = tabTag;
      this.$router.replace(`/course/${this.id}/${tabTag}`);
    }
    // routeChangeTab() {
    //   let detailShowTag = "introduction";
    //   let routerName = this.$route.name;

    //   if (routerName === "CourseDetail.Section") {
    //     detailShowTag = "section";
    //   }
    //   if (routerName === "CourseDetail.Comment") {
    //     detailShowTag = "comments";
    //   }
    //   return detailShowTag;
    // }
  },
  computed: {
    hasAudition() {
      return !this.course.isBuy && !!_.find(this.section, { isAudition: 1 });
    }
  }
  // watch: {
  // detailShowTag(newTag) {
  // if (newTag === "comments") {

  // setTimeout(() => {
  // this.$bus.$emit("super:blazy-revalidate");
  // }, 0);
  // }
  // },
  // $route(to, from) {
  //   this.detailShowTag = this.routeChangeTab();
  // }
  // }
};
</script>

<style lang="postcss" >
@import "../../styles/common.pcss";
@import "../../styles/course/detail.pcss";
@import "../../styles/course/detail.section.pcss";
</style>

