<template>
	<section id="me-wrap" class="">	
        <div v-if="!hasEntered" class="mymodal">
            <div>
                <span class="close-btn" @click="setEnterHistory">&#215;</span>
                <img src="../../assets/images/entry2.png" @click="onRedict">
            </div>
        </div>
		<header class="me-wrap-header flex-parent">
			<p class="wrap-header__no" v-if="$store.state.user.data.student.isInPractice == 1">No.{{$store.state.user.data.student.studentNo}}</p>
			<img class="wrap-header__icon" :src="$store.state.user.data.student.avatarUrl" height="80px" width="80px" />
			<div class="wrap-header-infobox flex-child">
				<p class="header-infobox__name">{{$store.state.user.data.student.realName || $store.state.user.data.student.nickName || '第二大学学员'}}</p>
				<template v-if="$store.state.user.data.student.isInPractice == 1">
					<p class="header-infobox-item">
						<span class="header-infobox-item__title">School:</span>
						<span class="header-infobox-item__detail">{{$store.state.user.data.student.virtualSchoolBO.schoolName}}</span>
					</p>
					<p class="header-infobox-item">
						<span class="header-infobox-item__title">College:</span>
						<span class="header-infobox-item__detail">{{$store.state.user.data.student.virtualSchoolBO.academyName}}</span>
					</p>
					<p class="header-infobox-item">
						<span class="header-infobox-item__title">Major:</span>
						<span class="header-infobox-item__detail">{{$store.state.user.data.student.virtualSchoolBO.profession}}</span>
					</p>
				</template>
				<template v-else>
					<p class="header-infobox-item" v-if="$store.state.user.data.student.schoolName">
						<span class="header-infobox-item__title">School:</span>
						<span class="header-infobox-item__detail">{{$store.state.user.data.student.schoolName}}</span>
					</p>
					<p class="header-infobox-item" v-if="$store.state.user.data.student.academyName">
						<span class="header-infobox-item__title">College:</span>
						<span class="header-infobox-item__detail">{{$store.state.user.data.student.academyName}}</span>
					</p>
					<p class="header-infobox-item" v-if="$store.state.user.data.student.profession">
						<span class="header-infobox-item__title">Major:</span>
						<span class="header-infobox-item__detail">{{$store.state.user.data.student.profession}}</span>
					</p>
				</template>
			</div>
		</header>
		<nav class="me-wrap-nav">
			<router-link tag="button" :to="{path: '/schoolRoll'}" class="wrap-nav__btn status-btn normal-btn" v-if="$store.state.identity">学籍管理</router-link>
			<router-link tag="button" :to="{path: '/mine'}" class="wrap-nav__btn mine-btn normal-btn">我的课程{{$store.state.user.data.courseNum || 0}}门</router-link>
			<router-link tag="button" :to="{path: '/practice/'+  $store.state.user.data.practiceComboId +'/news/'}" class="wrap-nav__btn news-btn" v-if="$store.state.user.data.student.isInPractice == 1">
				<button class="news-num" v-if="$store.state.user.unReadNum">{{$store.state.user.unReadNum}}</button>
			</router-link>
		</nav>

		<!-- 新媒体营销学院
		<router-link tag="nav" class="me-wrap-training-nav" :to="{path: '/Institute/newmediamarketing'}" v-if="$store.state.user.data.student.cityName == '广州市' && $store.state.user.data.student.isInPractice != 1"><img :src="require('@/assets/images/me/trainingBg.png')" width="100%" /></router-link>

		-->
		<section class="me-wrap-course">
			<header class="wrap-course-header clearfix">
				<span class="wrap-course-header__title">正在学习</span>
				<span class="wrap-course-header__num">共
					<span class="symbol"> {{unfinishedCoursesNum || 0}} </span>门课</span>
			</header>
			<section class="wrap-course-container">

				<div class="wrap-couse-container-box null-box" v-if="$store.state.user.data.courseNum == 0">
					<img :src="require('@/assets/images/noCourse.png')" width="100px" />
					<p class="null-box__tip">欢迎来到第二大学<br/>学习在大学里学不到的职场知识</p>
					<router-link tag="button" :to="{path: '/course'}" class="null-box__btn selected-btn normal-btn">去选课</router-link>
				</div>
				<div class="wrap-couse-container-box null-box" v-if="$store.state.user.data.courseNum != 0 && list.length == 0">
					<img :src="require('@/assets/images/noCourse.png')" width="100px" />
					<p class="null-box__tip">恭喜你已完成{{$store.state.user.data.courseNum}}门课程的学习，<br/>学些新知识，给未来多一个选择！</p>
					<router-link tag="button" :to="{path: '/course'}" class="null-box__btn selected-btn normal-btn">去选课</router-link>
					<!-- <router-link tag="button" :to="{path: '/course'}" class="null-box__btn add-btn">添加课程
						<span class="symbol"></span>
					</router-link> -->
				</div>
				<template v-for="value in list">
					<courseBox v-if="value.courseType == 0" :key="'class_'+value.id" :classInfo="value"></courseBox>
					<packageBox v-else :key="'class_'+value.id" :classInfo="value"></packageBox>
				</template>
			</section>
		</section>
		<section class="me-wrap-hot">
			<header class="wrap-hot-header">
				<span class="wrap-hot-header__title">热门课程</span>
			</header>
			<section class="wrap-hot-container" v-if="pushList.length">
				<template v-for="value in pushList">
					<courseBox v-if="value.courseType == 0" :key="'class_'+value.id" :isExhibition="true" :classInfo="value"></courseBox>
					<packageBox v-else :key="'class_'+value.id" :isExhibition="true" :classInfo="value"></packageBox>
				</template>
			</section>
		</section>
	</section>
</template>

<script>
// import _methods from "../../plugins/methods";
// import API from "@/plugins/API";
import Vue from "vue";
import courseBox from "@/components/courseBox.vue";
import packageBox from "@/components/packageBox.vue";

export default {
  name: "me",
  components: {
    courseBox,
    packageBox
  },
  data() {
    return {
      list: [],
      pushList: [],
      unfinishedCoursesNum: 0,
      intervalEvent: "",
      hasEntered:false,
      entryLink: 'http://www.super.cn/activity/other/1536824634000/man.html'
    };
  },
  beforeRouteEnter(to, from, next) {
    window.scrollTo(0, 1);
    next();
  },
  mounted() {
    let that = this;
    if(window.localStorage.getItem('hasEntered')){
        this.hasEntered = true;
    }else{
      let gender = 1;
      try{
         gender = this.$store.state.user.data.student.gender;
      }catch(e){
          gender=1;
      }
      let type = 'h5baping';
      const u = window.navigator.userAgent;
      //如果是微信
      if(/micromessenger/i.test(u.toLowerCase())){
        type = 'h5bapingzhanwai'
      }
        this.entryLink = (gender === 1)
        ? `http://www.super.cn/activity/other/1536824634000/man.html?from=${type}`
        :`http://www.super.cn/activity/other/1536824634000/woman.html?from=${type}`
    }
    if (this.$store.state.identity) {
      this.$API
        .getMyUnfinishedCourses()
        .then(data => {
          this.unfinishedCoursesNum = data.myCourses.list.length;
          this.list.push(...data.myCourses.list);
        })
        .catch(err => {
          if (err.message.indexOf("timeout") != -1) {
            // console.log('超时囖囖囖囖咯');
            this.$super.toast.text("请求超时了，请稍后再试");
          } else {
            err.message &&
              this.$super.toast.text(
                err.message == "Network Error"
                  ? "请求出错了，请稍后再试"
                  : err.message
              );
          }
        });

      this.$store.state.user.data.student.isInPractice == 1 &&
        this.$API.getTipsUnReadNum().then(data => {
          that.$store.state.user.unReadNum != data &&
            that.$store.dispatch("updateUnReadNum", data);
        });
    } else {
      window.location.replace(
        window.location.origin +
          window.location.pathname +
          (this.$utils.isWXBrowser ? "?" : "") +
          "#/course"
      );
    }

    this.$API.getIndexPushCourses().then(data => {
      this.pushList.push(...data);
    });

    this.$nextTick(() => {
      this.$bus.$emit("super:blazy-revalidate");
    });


		          
  },
  methods: {
      setEnterHistory(){
        window.localStorage.setItem('hasEntered', 'true');
        this.hasEntered = true;
      },
      onRedict(){
        window.localStorage.setItem('hasEntered', 'true');
        window.location.href= this.entryLink;
      }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="postcss" scoped>
@import "../../styles/home/home.me.pcss";
.mymodal{
  position: fixed;
  height: 100vh;
  width: 100vw;
  overflow-y: hidden;
  background: rgba(0,0,0,0.8);
  z-index: 99999;
  vertical-align: middle;
  img{
      width: 100%;
      position: absolute;
      top: 200px;
  }
  .close-btn{
      color: #fff;
      position: absolute;
      top: 20px;
      right: 20px;
      padding: 5px;
      font-size: 64px;
      z-index:999;
     &:active{
         opacity: 0.3;
     }
  }
}
</style>
