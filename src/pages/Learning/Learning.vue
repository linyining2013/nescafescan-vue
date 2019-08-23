<template>
  <section id="page-data-wrap">
    <transition :name="transitionName">
      <div class="page-container" :key="pageNum" v-if="course && section">
        <!-- <div class="pos-box"> -->
        <div class="scroll-box" v-if="sessionDetail.length">
          <template v-if="sessionDetail[pageNum].isAudition == 1 || course.isBuy == 1">
            <p class="title">{{sessionDetail[pageNum].name}}</p>
            <template v-for="(value, index) in sessionDetail[pageNum].detail" v-if="value.type == 1">
              <!-- 图 -->
              <p class="pic-box" :key="value.id">
                <img class="pic zoom-pic" v-on:click="previewImage" :src="(picLists[pageNum] == undefined?(picLists[pageNum]=[],picLists[pageNum][picLists[pageNum].length] = value.url):(picLists[pageNum][picLists[pageNum].length] = value.url))" :data-src="value.url" width="100%">
              </p>
            </template>
            <template v-else-if="value.type == 0">
              <!-- 图文富文本 -->
              <section class="editor-txt" v-html="value.content" :key="value.id" v-on:click="previewImage($event)"></section>
            </template>
            <template v-else-if="value.type == 3">
              <!-- 视频 -->
              <!-- <section class="video-box" :key="value.id">
                            <img class="video-bg" src="../../assets/images/videoBg.png" width="100%"/>
                            <p class="video-btn" v-on:click="videoRender(value.url, $event.target.parentNode)" :data-url="value.url"></p>
                        </section> -->
              <videoBox :ref="'videoChild'+ value.id" v-on:endedPlayer="endedPlayer" v-on:saveVideo="saveVideo" :id="value.id" :url="value.url"></videoBox>
            </template>
            <template v-else-if="value.type == 2">
              <!-- 音频 -->
              <audioBox :ref="'audioChild'+ value.id" v-on:loadAudio="loadAudio" :id="value.id" :url="value.url" :index="value.index" :timelength="value.timelength"></audioBox>
            </template>
          </template>
          <template v-else>
            <div class="buy-wrap">
              <p class="txt"> 试听完意犹未尽？<br> 报名课程<br> 获取更多干货知识</p>
              <p class="btn-box">
                <payBtn :course="course" :name="'Learning'"></payBtn>
              </p>
            </div>
          </template>
        </div>
        <div class="progress-footer">
          <div class="progress-mask"></div>
          <p class="footer-page-box">
            <span class="symbol">单元</span> {{pageNum + 1}}/{{sessionDetail.length}}</p>
          <div class="footer-page-btn-wrap">
            <p class="btn-prev btn" v-show="pageNum != 0" v-on:click="pagePrev">上一单元</p>
            <p class="btn-next btn active" v-on:click="pageNext">
              <template v-if="(pageNum + 1) == sessionDetail.length">完成阅读</template>
              <template v-else>下一单元</template>
            </p>
          </div>
        </div>
        <!-- </div> -->
      </div>
    </transition>
    <audio id="audio-player" src="" v-on:canplay="this.audioCanplay" v-on:ended="this.endedPlayer"></audio>
  </section>
</template>

<script>
import _ from "lodash";
import Vue from "vue";
// import this.$API from "@/plugins/this.$API";
import audioBox from "@/components/Audio.vue";
import videoBox from "@/components/Video.vue";
import jsuper from "exports-loader?jsuper!@/../node_modules/SuperBrowserLibs/dist/jsuperV2.js";
import { ImagePlugin } from "@/plugins/SUI";
import payBtn from "@/components/PayBtn.vue";

Vue.use(ImagePlugin);

export default {
  components: {
    audioBox,
    videoBox,
    payBtn
  },
  props: {
    course: Object,
    section: Array
  },
  data() {
    //detailNum
    return {
      id: this.$route.params.id,
      transitionName: "page-left",
      pageNum: this.$route.params.pageNum - 1 || 0,
      newPageNum: 0,
      auditionList: [], //存储试听章节章节索引
      detailNum: 0,
      sessionDetail: [], //完整的课程章节数据
      picLists: {},
      player: "",
      audior: "",
      startTimestamp: new Date().getTime(),
      rateList: {},
      setInterval: 0
      //   test: 0
    };
  },
  computed: {},
  beforeDestroy() {
    // this.$super.buyTip.hide();
    window.clearInterval(this.setInterval);

    if (this.player.id) {
      //已经有音频渲染//已经有音频渲染
      this.getProgressRate();
      this.player.destory();
      this.player = "";
    }
    // if (this.videor.id) {

    //   // console.log(this.videor.getInfo());
    //   this.videor.end();
    // }
  },
  mounted() {
    this.audior = document.getElementById("audio-player");

    if (this.course.isBuy == 1) {
      this.$API
        .getDetailByCourseId({ courseId: this.id })
        .then(res => {
          this.sessionDetail = res;
          this.$nextTick(() => {
            let type = this.sessionDetail[0].type;
            if (type == 2 || type == 3) this.renderGetRate();
            this.getProgressRate(this.pageNum);
          });
        })
        .catch(err => {
          this.$super.toast.text(err.message);
        });
    } else {
      //未购买.
      let _section = [];
      this.$API
        .findAuditionByCourseId({ courseId: this.id })
        .then(res => {
          for (let i = 0, j = 0, len = this.section.length; i < len; i++, j++) {
            var section = this.section[i], //总课程列表
              auditionSection = res[this.newPageNum]; //试听课程列表
            if (section.isAudition == 1) {
              //当前章节为试听
              if (auditionSection != undefined) {
                //试听列表存当前索引有试听数据
                if (section.id == auditionSection.id) {
                  //索引的试听课程是当前索引课程
                  this.section.splice(i, 1, auditionSection);
                  this.newPageNum++;
                  this.auditionList[this.auditionList.length] = j;
                }
              }
            }
          }
          _section = this.section;
          // console.log((this.auditionList));
          for (let i = 0, j = 0, len = _section.length; i < len; i++) {
            var auditionIndex = this.auditionList[j];
            // console.log('i '+ i);
            // console.log('j '+ j);
            // console.log('auditionIndex '+ auditionIndex);
            if (auditionIndex == undefined) {
              // console.log('undefined j' + j)
              _section.splice(this.auditionList[j - 1] + 2);
              break;
            } else {
              if (i <= auditionIndex) {
                //删除
                if (j == 0) {
                  //第一个试听章节[j]，之前只显示最多一个章节
                  if (auditionIndex - i <= 1) {
                    j++;
                    continue;
                  } else {
                    //删除前面的多余章节
                    j++;
                    let delNum = auditionIndex - i - 1;
                    _section.splice(0, delNum);
                    len = _section.length;
                    // console.log('======');
                    // console.log(this.auditionList)
                    // console.log('delNum ' + delNum)
                    for (
                      let x = 0, xlen = this.auditionList.length;
                      x < xlen;
                      x++
                    ) {
                      this.auditionList[x] = this.auditionList[x] - delNum;
                    }
                    // this.$route.params.pageNum = 1;
                    // console.log(delNum);
                    // this.$route.params.pageNum -= delNum;
                    let pageNum = this.$route.params.pageNum - delNum - 1;
                    this.pageNum = pageNum < 0 ? 0 : pageNum;
                    // console.log(this.pageNum)
                    // console.log(this.$route.params.pageNum)
                    // console.log('++++++');
                    // console.log('jj ' + j)
                    // console.log(this.auditionList)
                  }
                } else {
                  j++;
                  continue;
                }
              } else {
                //  let lastIndex = this.auditionList[j];
                if (j == 0) {
                  //第一个章节，保留后面一个章节
                  _section.splice(auditionIndex + 1);
                } else if (j == this.auditionList.length - 1) {
                  //不是第一个章节， 不删除前面章节， 只保留后一个章节
                  // console.log('----');
                  // console.log(this.auditionList)
                  // console.log('auditionIndex ' + auditionIndex)
                  _section.splice(auditionIndex + 2);
                  break;
                }
                //  if(!lastIndex){//已经没有试听章节了
                //     this.sessionDetail.splice(j + 2);
                //  }else{
                //     //  console.log('j ' + j)
                //     //  console.log(this.auditionList.length)
                //     if(j == 0){//第一个章节，保留后面一个章节
                //         this.sessionDetail.splice(lastIndex + 1);
                //     }else if(j == this.auditionList.length -1){//不是第一个章节， 不删除前面章节， 只保留后一个章节
                //         console.log('----');
                //         console.log(this.auditionList)
                //         console.log('lastIndex ' + lastIndex)
                //         this.sessionDetail.splice(lastIndex + 2);
                //         break;
                //     }
                //  }
              }
            }
          }
          this.sessionDetail = _section;
          // this.$nextTick(() => {
          //   //dom已更新
          //   this.setOverFlow(0);
          // });
        })
        .catch(err => {
          this.$super.toast.text(err.message);
        });
    }

    // this.$nextTick(() => {
    //   //dom已更新

    //   if (this.$store.state.checkBuy == 1) {
    //     this.$store.dispatch("updateCheckBuy", 0);
    //     //检查是否购买
    //     if (this.course.isBuy == 1) {
    //       //已经购买该课程
    //       this.$super.buyTip.show({
    //         type: "normal",
    //         infoType: "isBuy"
    //       });
    //     } else {
    //       //未购买
    //       this.buyNow();
    //     }
    //   }
    // });
  },
  watch: {
    pageNum(newVal, oldVal) {
      //   if (newVal > oldVal) {
      //下一页
      // this.getProgressRate(oldVal);
      //   }
      //   console.log('newVal' + newVal + ', oldVal' + oldVal );

      this.stopPlay(newVal);
      var sessionDetail = this.sessionDetail[newVal]; //当前展示的章节
      // id = sessionDetail.id,
      // detail = sessionDetail.detail;

      if (sessionDetail.type == 2 || sessionDetail.type == 3) {
        // if (typeof this.rateList[id] != "object") {
        //   this.rateList[id] = {};
        // }
        // for (var i = 0, len = detail.length; i < len; i++) {
        // 	this.rateList[id][detail[i].id] = 0
        // }
        this.renderGetRate(); //存储一次
      } else {
        window.clearInterval(this.setInterval);
      }
    }
  },
  methods: {
    // buyNow() {
    //   this.$store.dispatch("updateCourseInfo", this.course); //把当前支付信息存储起来
    //   this.$super.payment.createOrder({
    //     courseId: this.id,
    //     loginData: { id: this.id, name: "Learning", checkBuy: 1 }
    //   });
    // },
    previewImage(event) {
      if (event.target.nodeName === "IMG" || !event) {
        let imgNodeList = document
          .getElementById("page-data-wrap")
          .getElementsByTagName("img");
        let imgList = [],
          index = 0;
        for (let i = 0, len = imgNodeList.length; i < len; i++) {
          let obj = imgNodeList[i];
          let src = obj.getAttribute("src").split("?")[0];
          if (obj.className.indexOf("video-bg") != -1) {
            continue;
          }

          if (obj == event.target) index = imgList.length;
          imgList[imgList.length] = src;
        }
        if (this.$utils.isSuperBrowser) {
          jsuper.previewImage({
            data: {
              urls: imgList, //可支持多张图片
              index: index //默认点开显示的哪一张图片
            }
          });
        } else {
          this.$super.previewImage.render({
            urls: imgList, //可支持多张图片
            index: index //默认点开显示的哪一张图片
          });
        }
      } else {
        return;
      }
    },
    endedPlayer() {
      this.getProgressRate();
    },
    stopPlay(pageNum) {
      // window.clearInterval(this.setInterval);
      pageNum > 0 && this.getProgressRate(pageNum - 1);
      this.getProgressRate(pageNum);

      if (this.player.id) {
        //已经有音频渲染//已经有音频渲染
        this.player.destory();
        this.player = "";
      }
    },
    saveVideo(id) {
      this.stopPlay();
      this.player = this.$refs["videoChild" + id];
    },
    audioCanplay() {
      this.player.playing(); //触发子组件 load模式
    },
    loadAudio(id) {
      //点击了待命状态的音频， 取消正在播放或者暂停状态的音频
      this.stopPlay();
      this.player = this.$refs["audioChild" + id];
      this.player.loading(this.audior); //触发子组件 load模式
    },

    renderGetRate() {
      window.clearInterval(this.setInterval);
      this.setInterval = window.setInterval(() => {
        this.getProgressRate();
      }, 10000);
    },

    getProgressRate(pageNum) {
      let that = this;
      (function(num) {
        let _pageNum = typeof num == "number" ? num : that.pageNum,
          sessionDetail = that.sessionDetail[_pageNum],
          type = sessionDetail.type,
          id = sessionDetail.id,
          detail = sessionDetail.detail;
        //   if (type == 3 || type == 2) {
        //视频，音频，混合
        let info,
          curRate,
          progressSectionDetail = [];

        if (typeof that.rateList[id] != "object") {
          that.rateList[id] = {};
        }
        if (that.player.id) {
          info = that.player.getInfo();
          curRate = (info.currentTime / info.duration).toFixed(2);

          if (
            that.rateList[id][info.id] != undefined &&
            that.rateList[id][info.id] == curRate
          ) {
            console.log("数据不变，不提交");
            return false;
          }
        }

        if (that.player.id || _pageNum != undefined) {
          // if (!isNaN(info.duration)) {
          for (var i = 0, len = detail.length; i < len; i++) {
            var _detail = detail[i],
              _rate = 0;
            if (_detail.type == 2 || _detail.type == 3) {
              if (info && _detail.id == info.id) {
                that.rateList[id][info.id] = curRate; //当前播放
                _rate = curRate;
              } else if (that.rateList[id][_detail.id] != undefined) {
                _rate = that.rateList[id][_detail.id]; //有数据，但是不是当前播放
              } else {
                that.rateList[id][_detail.id] = 0; //无数据，默认为0
                _rate = 0;
              }
            } else {
              //有图文混合、
              that.rateList[id][_detail.id] = 1; //无数据，默认为0
              _rate = 1;
            }

            progressSectionDetail[progressSectionDetail.length] = {
              sectionDetailId: _detail.id,
              progressRate: _rate
            };
          }
          that.saveOrUpdae({
            progress: _pageNum, //存粗进度
            sectionId: id,
            progressSectionDetail: JSON.stringify(progressSectionDetail)
          });
        }
      })(pageNum);
    },
    saveOrUpdae(data) {
      let that = this;
      (function(_data) {
        if (
          that.$store.state.identity &&
          (that.course.isBuy || that.course.sellPrice == 0)
        ) {
          that.$API
            .saveOrUpdae(_.extend({ courseId: that.id, preProgress: 1 }, _data))
            .then(data => {});
        }
      })(data);
    },
    pagePrev() {
      if (this.pageNum == 0) {
        //已经在第一页
      } else {
        this.transitionName = "page-right";

        this.$emit("progressSet", (this.pageNum -= 1));
      }

      //   this.stopPlay();
    },
    pageNext() {
      this.transitionName = "page-left";
      if (this.pageNum + 1 == this.sessionDetail.length) {
        //最后一页
        //进入完成阅读
        if (this.course.isBuy == 1 || this.course.sellPrice == 0) {
          window.clearInterval(this.setInterval);
          this.finishCourse();
        } else {
          this.$super.toast.text("最后一页啦");
        }
      } else {
        this.$emit("progressSet", (this.pageNum += 1));
      }

      //   this.stopPlay();
    },
    finishCourse() {
      //结束课程
      this.$emit("finished", this.startTimestamp);
    }
    // setOverFlow(index) {
    //   //判断是否显示提示滚动的箭头动画
    //   let obj = document.getElementsByClassName("scroll-box")[index];

    //   this.isOverflow = obj.offsetHeight < obj.scrollHeight;
    //   // console.log(this.isOverflow)
    // }
  }
};
</script>
<!-- Add "scoped" attribute to limit CSS to this component only-->
<style lang="postcss" >
.page-left-enter-active,
.page-left-leave-active,
.page-right-enter-active,
.page-right-leave-active {
  position: absolute;
  transition: transform 1s, opacity 1s;
  opacity: 1;
}

.page-left-enter-to,
.page-right-enter-to {
  transform: translate3d(0, 0, 0) !important;
}
.page-left-leave,
.page-right-leave {
  transform: translate3d(0, 0, 0) !important;
}
.page-left-enter {
  transform: translate3d(100%, 0, 0) !important;
}
.page-left-leave-to {
  transform: translate3d(-100%, 0, 0) !important;
  opacity: 0;
}
.page-right-enter {
  transform: translate3d(-100%, 0, 0) !important;
}
.page-right-leave-to {
  transform: translate3d(100%, 0, 0) !important;
  opacity: 0;
}
</style>
