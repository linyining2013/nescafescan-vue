<template>
  <section id="finished-wrap">
    <div class="finished-container" v-show="!isEvaluate">
      <header class="header-box">
        <div class="header-bg-box">
          <p class="bg"></p>
          <p class="title">恭喜您完成课程</p>
        </div>
        <div class="info-box">
          <p class="time txt">
            <span class="symbol">学习时长：</span>{{finishedTime}}</p>
          <p class="num txt">
            <span class="symbol">讨论：</span>{{finishedInfo.discussNum}}条</p>
        </div>
        <p class="btn-box">
          <button class="evaluate-btn" type="button" :disabled="(!canScore && !canEvaluate)" v-on:click="isEvaluate = true">
            <template v-if="(canScore || canEvaluate)">点评课程</template>
            <template v-else-if="(!canScore && !canEvaluate)">已点评</template>
          </button>
        </p>
      </header>
      <section class="finished-course-wrap" v-show="courseLists">
        <p class="finished-course-title">可能感兴趣的课程</p>
        <div class="finished-course-box">
          <template v-for="(value, index) in courseLists">
            <router-link :to="{path: '/course/' + value.id}" tag="div" class="item-course-box" :key="value.id">
              <div class="intro">
                <div class="txt-box">
                  <p class="title" :class="{single: $utils.setWordBreak({type: 'packageTitleCurCourse',text: value.name,isBoole: 1})}" v-html="$utils.setWordBreak({type: 'packageTitle',text: value.name,})"></p>
                </div>
                <div class="addition">
                  <img class="icon" :src="value.avatar" />
                </div>
              </div>
            </router-link>
          </template>
        </div>
      </section>
    </div>
    <div id="evaluate-wrap" class="evaluate-wrap" v-show="isEvaluate">
      <div class="eval-res-wrap" v-show="isScore">
        <section class="item-box active" v-if="submitData.score !== ''" v-on:click="isScore = !canScore">
          <p class="item-icon" :class="'icon-' + submitData.score"></p>
          <div class="item-tip">
            <p class="tip-title">{{evaluateList[submitData.score].title}}</p>
            <p class="tip-detail">{{evaluateList[submitData.score].detail}}</p>
          </div>
          <p class="item-select btn-select"></p>
        </section>
        <section v-else class="item-box active" v-on:click="isScore = !canScore">
          <p class="item-tip no-score">暂无评分</p>
          <p class="item-select btn-select"></p>
        </section>
      </div>
      <div class="eval-select-wrap" v-show="!isScore">
        <section v-for="(value, index) in evaluateList" :key="index" v-on:click="addEvalScore(index)" class="item-box" :class="{active: value.isActive}">
          <p class="item-icon" :class="'icon-' + index"></p>
          <div class="item-tip">
            <p class="tip-title">{{value.title}}</p>
            <p class="tip-detail">{{value.detail}}</p>
          </div>
          <p class="item-select btn-select"></p>
        </section>
      </div>
      <form name="evaluate-form" v-on:submit.prevent="submit">
        <div class="eval-content-wrap">
          <textarea name="content" placeholder="你对这个课程有什么建议或者想法呢？" maxlength="200" v-on:focus="toFocus($event)" v-model.trim="submitData.content" :disabled="!canEvaluate"></textarea>
          <div class="content-num-wrap">
            <span id="content-num">{{submitData.content.length}}</span>/200</div>
        </div>
        <div v-if="$store.state.identity && canEvaluate" class="eval-share-wrap" :class="{active: submitData.isSharedByTreehole}" v-on:click="submitData.isSharedByTreehole = 1 - submitData.isSharedByTreehole">
          <p class="share-select"></p>把评价同步到下课聊
        </div>
        <div class="eval-btn-wrap">
          <button type="button" class="back-btn" v-on:click="isEvaluate = false">返回</button>
          <button type="submit" class="submit-evaluate-btn">提交评价</button>
        </div>
      </form>
    </div>
    <!-- 完成评价区 -->
    <div id="evaluate-success-wrap" v-show="evaluateSuccess">
      <div class="mask"></div>
      <div class="modal-wrap">
        <header class="modal-header">
          <p class="txt">
            <span class="icon"></span>评价成功</p>
        </header>
        <section class="modal-section">
          <router-link :to="{path: '/course/'+ this.$route.params.id}" tag="button" class="btn left-btn">返回课程详情</router-link>
          <router-link :to="{path: '/course'}" tag="button" class="btn right-btn">去看其他课程</router-link>
        </section>
      </div>
    </div>

  </section>
</template>

<script>
// import this.$API from "@/plugins/API";
// import evaluateBox from "@/components/Evaluate.vue";

export default {
  //   components: {
  //     evaluateBox
  //   },
  props: {
    course: {
      type: Object,
      default: function(val) {
        return val || {};
      }
    },
    finishedInfo: {
      type: Object,
      default: function(val) {
        return val || {};
      }
    }
  },
  data() {
    return {
      submitData: {
        content: "",
        score: "",
        isSharedByTreehole: 0
      },
      evaluateSuccess: false,
      isScore: false, //是否评分 true显示成功评分区，
      isEvaluate: false, //显示评分评论区
      canScore: false, //是否允许提交评分
      canEvaluate: false, //是否允许提交评论
      courseLists: [],
      evaluateList: [
        {
          title: "太好了",
          detail: "生动有趣，我学到了很多东西",
          isActive: false
        },
        {
          title: "还可以",
          detail: "内容详实，逻辑清晰，容易吸收",
          isActive: false
        },
        {
          title: "一般般",
          detail: "讲得还算过得去，普普通通",
          isActive: false
        },
        {
          title: "不满意",
          detail: "感觉没啥效果",
          isActive: false
        },
        {
          title: "非常差",
          detail: "课程差，听不清",
          isActive: false
        }
      ]
    };
  },
  computed: {
    finishedTime() {
      return this.formatSeconds(
        (new Date().getTime() - this.finishedInfo.startTime) / 1000,
        "MM分ss秒"
      );
    }
  },
  created() {},
  mounted() {},
  watch: {
    // course(cur, old) {
    // this.getData();
    // console.log(old);
    // console.log(cur);
    // },
    finishedInfo(cur, old) {
      this.getData();
    }
  },
  methods: {
    toFocus(event) {
      this.isScore = true;
      setTimeout(() => {
        window.scrollTo(0, event.target.offsetTop + "px");
      }, 500);
    },
    // evalSuccess() {
    //0评分 1评价
    // if (!this.canScore && !this.canEvaluate) {
    //   this.isEvaluate = false; //关闭界面
    //   this.evaluateSuccess = true; //弹出成功
    // }
    // else if (
    //   (this.submitData.content == "") !=
    //   (this.submitData.score == "")
    // ) {
    //   this.$super.toast.text(`${!type ? "评分" : "评价"}成功~`);
    // }
    // },
    addScore() {
      if (this.$store.state.identity)
        this.$API.addScore({
          courseId: this.finishedInfo.courseId,
          score: 5 - this.submitData.score
        })
          .then(data => {
            this.canScore = false; //不允许评分
            this.isScore = true; //显示评分结果
            // this.evalSuccess(0);
            // if (this.submitData.content !== "" && this.canEvaluate) {
            //有内容
            this.addEvaluate();
            // }
          })
          .catch(err => {
            this.$super.toast.text(err.message);
          });
      else this.addEvaluate();
    },
    addEvaluate() {
      this.$API.addEvaluate({
        courseId: this.finishedInfo.courseId,
        type: 1,
        content: this.submitData.content,
        isSharedByTreehole: this.submitData.isSharedByTreehole
      })
        .then(data => {
          this.canEvaluate = false; //禁止评论
          // this.evalSuccess();
          this.isEvaluate = false; //关闭界面
          this.evaluateSuccess = true; //弹出成功
        })
        .catch(err => {
          this.$super.toast.text(err.message);
        });
    },
    submit() {
      let submitData = this.submitData;

      if (typeof submitData.score == "string" && this.canScore) {
        //未选择分数
        this.$super.toast.text(`请选择评分~`);
        return false;
      }
      if (submitData.content == "" && this.canEvaluate) {
        this.$super.toast.text(`请填写评价~`);
        return false;
      }
      //允许评分
      this.addScore();
      //有内容
      // this.addEvaluate();
      // if (submitData.score !== "" && this.canScore) {
      //   //允许评分
      //   this.addScore();
      // } else {
      //   //不允许评分的时候单独发送评论
      //   if (submitData.content !== "" && this.canEvaluate) {
      //     //有内容
      //     this.addEvaluate();
      //   }
      // }
    },
    addEvalScore(index) {
      let isActive = this.evaluateList[index].isActive;
      if (isActive) {
        // isActive = false;
        this.submitData.score = "";
      } else {
        // isActive = true;
        this.isScore = true;
        this.submitData.score !== "" &&
          (this.evaluateList[this.submitData.score].isActive = false);
        this.submitData.score = index;
      }
      this.evaluateList[index].isActive = !this.evaluateList[index].isActive;
    },
    routerTo(id) {
      this.$emit("routerTo", "/course/" + id);
    },
    formatSeconds(value, format) {
      var parameter = 60;
      var minute = parseInt(value / parameter);
      var second = Math.round(value % parameter);

      if (!format) {
        return second == 60
          ? "01:00"
          : (minute ? (minute >= 10 ? minute : "0" + minute + ":") : "00:") +
              (second >= 10 ? second : "0" + second);
      } else {
        return format.replace("MM", minute).replace("ss", second);
      }
    },
    getData() {
      // console.log(this)
      if (this.$store.state.identity) {
        this.$API.isScore({ courseId: this.finishedInfo.courseId })
          .then(data => {
            // console.log(data);
            this.canScore = false; //不能评分
            this.addEvalScore(5 - data);
          })
          .catch(err => {
            if (err.message == "暂无评分") {
              this.canScore = true;
            } else {
              // this.$super.toast.text(err.message);
            }
          });
        this.$API.isEvaluateOfComment({ courseId: this.finishedInfo.courseId })
          .then(data => {
            this.submitData.content = data;
            this.canEvaluate = false;
          })
          .catch(err => {
            if (err.message == "暂无评价") {
              this.canEvaluate = true;
            } else {
              // this.$super.toast.text(err.message);
            }
          });
      } else {
        //没有identity => 未登录
        this.canScore = false;
        this.isScore = true;
        this.canEvaluate = true;
      }

      this.$API.finshCourse({
        courseId: this.finishedInfo.courseId,
        progress: this.finishedInfo.progress
      });
      this.$API.getCoursesByRecommend({
        categoryId: this.finishedInfo.categoryId
      }).then(data => {
        this.courseLists = data;
        // console.log(this.courseLists);
      });
    }
  }
};
</script>
<!-- Add "scoped" attribute to limit CSS to this component only
<style lang="postcss" >
@import "../../styles/common.pcss";
@import "../../styles/learning/learning.finished.pcss";
</style>-->

