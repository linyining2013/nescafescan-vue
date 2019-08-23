<template>
  <section>
    <transition name="slide-left">
      <div v-show="!finishedInfo.isFinished" v-if="course && section">
        <section id="learning-warp">
          <transition name="slide-left">
            <keep-alive>
              <router-view v-on:hideDiscuss="hideDiscuss" v-on:progressSet="progressSet" v-on:finished="finished" :course="course" :section="section" v-bind:discussInfo="discussInfo"></router-view>
            </keep-alive>
          </transition>
        </section>
        <footer id="learning-footer">
          <section class="pos-box">
            <section class="footer-box first-box" :class="{active: !((this.isSubmit&&!this.isDiscuss) || this.isDiscuss)}">
              <div class="input-box box" v-on:click="focusKeyBorad($event)">参与课程讨论</div>
              <!-- <input class="input" type="text" placeholder="参与课程讨论" /> -->
              <div class="icon-wrap box">
                <div class="icon-box discuss">
                  <button type="button" class="discuss-btn btn" v-on:click="openDiscuss">
                    <span class="discuss-num" :key="discussInfo.discussNum">
                      <template v-if="discussInfo.discussNum >= 99">99+</template>
                      <template v-else>{{discussInfo.discussNum }}</template>
                    </span>
                    <span class="icon"></span>
                  </button>
                </div>
                <p class="icon-box like">
                  <button type="button" class="btn" :class="{active: this.course.isLike}" v-on:click="addLike">
                    <span class="icon"></span>
                  </button>
                </p>
                <p class="icon-box share" v-if="$utils.isWXBrowser || $utils.isSuperBrowser">
                  <button type="button" class="btn" v-on:click="showShare">
                    <span class="icon"></span>
                  </button>
                </p>
              </div>
              <footer id="progress-wrap">
                <p class="progress" :style="{width: setProgress + 'px'}"></p>
              </footer>
            </section>
            <section class="second-box" :class="{active: ((this.isSubmit&&!this.isDiscuss) || this.isDiscuss)}">
              <form name="discuss-form" v-on:submit.prevent="submit()">
                <div class="form-box footer-box">
                  <div class="input-box">
                    <input id="discuss-input" class="input" type="text" name="content" v-model.trim="submitData.content" :placeholder="!this.isSubmit?'参与课程讨论':'请输入你的观点不超过200字'" maxlength="200" v-on:focus="focusKeyBorad" v-on:blur="blurKeyBorad" />
                  </div>
                  <p class="btn-box">
                    <button class="btn submit-btn" type="submit">发送</button>
                  </p>
                </div>
              </form>
            </section>
          </section>
        </footer>
      </div>
    </transition>
    <transition name="slide-left">
      <finishedWrap :ref="'finishedMethod'" v-on:routerTo="routerTo" v-show="finishedInfo.isFinished" :course="course" :finishedInfo="finishedInfo"></finishedWrap>
    </transition>
  </section>
</template>

<script>
import Vue from "vue";
// import this.$API from "../../plugins/this.$API";
import jsuper from "exports-loader?jsuper!@/../node_modules/SuperBrowserLibs/dist/jsuperV2.js";
import _ from "lodash";
// import _methods from "../../plugins/methods";

import finishedWrap from "./Learning.finished";

export default {
  components: {
    finishedWrap
  },
  data() {
    return {
      submitData: { content: "" },
      discussInfo: { discussNum: 0, list: {} },
      course: null,
      section: null,
      isGotDiscuss: this.$route.name == "Learning.discuss" ? true : false,
      isSubmit: this.$route.name == "Learning.discuss" ? true : false, //底部是否触发发布评论
      isDiscuss: this.$route.name == "Learning.discuss" ? true : false, //是否打开了讨论组件
      progress: this.$route.params.pageNum,
      finishedInfo: {
        isFinished: false,
        startTime: 0,
        courseId: 0,
        discussNum: 0,
        progress: 0,
        categoryId: 0
      }
    };
  },
  computed: {
    setProgress() {
      return document.body.clientWidth / this.section.length * this.progress;
    }
  },
  beforeCreate() {

    document.title = "课程详情";
  
  let that = this;
    this.$API
      .getCourseDetail({ id: this.$route.params.id })
      .then(data => {
        this.course = data.course;
        this.discussInfo.discussNum = this.course.discussNum;

        for (let i = 0, len = data.section.length; i < len; i++) {
          
          if(data.section[i].id == that.$route.query.sectionId){
            that.$route.params.pageNum = (i+1);
            break;
          }
        }
        this.section = data.section;

        this.$ba.trackEvent(`课程学习访问:${data.course.name}`);
        this.$nextTick(() => {
          //dom已更新
          this.renderShare();
        });
      })
      .catch(err => {
        this.$super.toast.text(err.message);
      });
  },
  methods: {
    showShare() {
      this.$utils.isSuperBrowser
        ? jsuper.showShareMenu()
        : this.$utils.isWXBrowser ? this.$super.shareTip.show() : "";
    },
    renderShare() {
      if (this.$utils.isSuperBrowser) {
        this.$utils.setShare(this.course, {
          href:
            window.location.origin +
            window.location.pathname +
            `#/course/${this.course.id}`
        });
        // this.$ba.trackEvent('表表进入',"表表进入：课程学习", this.course.id);
      } else if (this.$utils.isWXBrowser) {
        this.$weixin.init(this.course, {
          href:
            window.location.origin +
            window.location.pathname +
            `#/course/${this.course.id}`
        });

        // this.$ba.trackEvent('微信分享渠道进入',"微信分享渠道进入：课程学习", this.course.id);
      } else {
        // this.$ba.trackEvent('其他渠道进入',"其他渠道进入：课程学习", this.course.id);
      }
    },
    progressSet(val) {
      this.progress = val + 1;
    },
    routerTo(url) {
      this.$router.push({ path: url });
    },
    finished(startTime) {
      this.finishedInfo = {
        startTime: startTime,
        isFinished: true,
        courseId: this.$route.params.id,
        discussNum: this.discussInfo.discussNum,
        progress: this.section.length,
        categoryId: this.course.categoryId
      };

      // this.$refs.finishedMethod.getData();
    },
    addLike() {
      this.$API
        .addLike({
          courseId: this.$route.params.id
        }) //
        .then(data => {
          if (!data) {
            this.$super.toast.text("已经喜欢该课程");
          }
          this.course.isLike = true;
        })
        .catch(err => {
          this.$super.toast.text(err.message);
        });
    },
    submit() {
      if (this.submitData.content) {
        this.$API
          .addEvaluate({
            courseId: this.$route.params.id,
            type: 0, // 评论类型(0taolun,1:dianp)
            content: this.submitData.content,
            courseType: 0
          }) //
          .then(data => {
            // console.log(data)
            if (this.isGotDiscuss) {
              this.discussInfo.discussNum += 1;
              this.discussInfo.list = data;
            }
            this.submitData.content = "";
            this.$super.toast.text("你的观点已成功发表在讨论区");
          })
          .catch(err => {
            this.$super.toast.text(err.message);
          });
      } else {
        this.$super.toast.text("讨论不能为空哦~");
      }

      // console.log(this.submitData);
    },
    hideDiscuss() {
      this.isDiscuss = false;
      this.isSubmit = false;
    },
    openDiscuss() {
      if (!this.isDiscuss) {
        this.isDiscuss = true; //打开讨论组件
        this.isGotDiscuss = true; //已经成功请求数据
        // this.isSubmit = true;
        // this.focusKeyBorad();
        // console.log(this.$route.params.pageNum)
        this.$router.replace(
          `/learning/${this.$route.params.id}/${
            this.$route.params.pageNum
          }/discuss`
        );
      }
    },
    focusKeyBorad() {
      this.isSubmit = true;
      document.getElementById("discuss-input").focus();
      setTimeout(() => {
        window.scrollTo(0, document.body.scrollHeight);
      }, 500);
    },
    blurKeyBorad() {
      this.isSubmit = false;
    }
  }
};
</script>
<!-- Add "scoped" attribute to limit CSS to this component only #app {
  height: 100%;
  .wrapper {
    height: 100%;
  }
}-->
<style lang="postcss">
@import "../../styles/common.pcss";
@import "../../styles/learning/learning.pcss";
@import "../../styles/learning/learning.discuss.pcss";
@import "../../styles/learning/learning.finished.pcss";

.slide-footer-left-enter-active,
.slide-footer-left-leave-active,
.slide-footer-right-enter-active,
.slide-footer-right-leave-active {
  position: absolute;
  top: 0;
  width: 100%;
  transition: all 0.5s cubic-bezier(0.55, 0, 0.1, 1);
}

.slide-footer-left-enter-to,
.slide-footer-right-enter-to {
  transform: translate3d(0, 0, 0);
}

.slide-footer-left-leave,
.slide-footer-right-leave {
  transform: translate3d(0, 0, 0);
}
.slide-footer-left-enter {
  transform: translate3d(80px, 0, 0);
  opacity: 0;
}
.slide-footer-left-leave-to {
  transform: translate3d(-80px, 0, 0);
  opacity: 0;
}
.slide-footer-right-enter {
  transform: translateX(-100%);
}
.slide-footer-right-leave-to {
  transform: translateX(100%);
}

</style>
