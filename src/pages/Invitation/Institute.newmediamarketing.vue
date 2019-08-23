<template>
  <section id="institute-wrap">
    <header class="institute-wrap__header">
      <img :src="require('@/assets/images/invitation/institute_header.jpg')" width="100%" />
    </header>
    <nav v-show="show" id="nav-data-wrap" class="institute-wrap-nav" :class="this.navCss">
      <router-link :to="{path: '/Institute/newmediamarketing'}" v-track-event="'第二大学介绍页, 学院简介, 学院简介'" exact-active-class='active' tag="p" class="wrap-nav__item" replace>学院简介</router-link>
      <router-link :to="{path: '/Institute/newmediamarketing/2'}" v-track-event="'第二大学介绍页, 课程内容, 课程内容'" exact-active-class='active' tag="p" class="wrap-nav__item" replace>课程内容</router-link>
      <router-link :to="{path: '/Institute/newmediamarketing/3'}" v-track-event="'第二大学介绍页, 学习说明, 学习说明'" exact-active-class='active' tag="p" class="wrap-nav__item" replace>学习说明</router-link>
    </nav>
    <section class="institute-wrap-detail" :class="this.navCss">
      <transition name="slide-left">
        <keep-alive>
          <router-view/>
        </keep-alive>
      </transition>
    </section>
    <footer class="institute-footer">
      <a href="http://qm.qq.com/cgi-bin/qm/qr?k=AZSeJFeG94UoXChnm8VqYCsq5KENCkaC" class="institute-footer__btn link-btn btn">咨询老师</a>
      <router-link tag="button" :to="{path: '/practice/' + $store.state.user.data.practiceComboId}" v-if="$store.state.user.data.student.isInPractice == 1" class="institute-footer__btn">去学习</router-link>
      <button v-else v-on:click="toLink" class="institute-footer__btn">￥699 申请入学</button>
    </footer>
  </section>
</template>

<script>
// import API from "../../plugins/API";
import institute_header from "@/assets/images/invitation/institute_header.jpg";
export default {
  data() {
    return {
      navCss: "",
      show: false,
      scroll: {
        offsetT: 0
      }
    };
  },
  watch: {
    $route(to, from) {
      let that = this;
      let scrollTop =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop;

      if (that.scroll.offsetT < scrollTop) {
        window.scrollTo(0, that.scroll.offsetT);
      }
    }
  },
  created() {
    let that = this;
    let img = new Image();
    img.src = institute_header;
    img.onload = () => {
      that.show = true;
      that.scroll.offsetT = 300 * document.body.clientWidth / 750;
    };

    // this.$router.beforeEach(function(to, from, next) {
    //   let scrollTop =
    //     window.pageYOffset ||
    //     document.documentElement.scrollTop ||
    //     document.body.scrollTop;

    //   if (that.scroll.offsetT < scrollTop) {
    //     window.scrollTo(0, that.scroll.offsetT);
    //   }

    //   next();
    // });
  },
  mounted() {
    document.title = "第二大学新媒体营销学院";
    if (this.$utils.isSuperBrowser) {
      this.$utils.setShare({ institute: true });
    } else if (this.$utils.isWXBrowser) {
      this.$weixin.init({ institute: true });
    }

    // if (this.$utils.isAndroid)
    window.addEventListener("scroll", this.handleScroll, false);
    // else {
    //   this.navCss = "sticky";
    // }
    this.$bus.$emit("super:blazy-revalidate");
  },
  beforeDestroy() {
    // this.$super.modalTip.hide();
    window.scrollTo(1, 1);
    // if (this.$utils.isAndroid)
    window.removeEventListener("scroll", this.handleScroll);
  },
  methods: {
    toLink() {
      let that = this;

      this.$API
        .getDetailCombo({
          comboId: this.$store.state.user.data.practiceComboId
        })
        .then(data => {
          if (data.online == 2) {
            // this.$super.buyTip.show({
            //   type: "normal",
            //   isMaskClicker: false,
            //   infoType: "practice"
            // });
            this.$super.modalTip.show({
              type: "normal",
              content: `<p>第二大学新媒体营销学院第一期已人满开学，第二期招生即将开始，报名请添加老师QQ进行咨询<br><br><a href="http://qm.qq.com/cgi-bin/qm/qr?k=AZSeJFeG94UoXChnm8VqYCsq5KENCkaC" style="color: #3a64a6;background: #3a64a6;line-height: .88rem;border: .04rem solid #3a64a6;border-radius: .5rem;height: .88rem;color:#fff;display:inline-block;width: 40%">点击咨询</a></p>`,
              isMaskClicker: false,
              close: true,
              autoHide: true
            });
          } else if (this.$utils.isSuperBrowser) {
            if (data.isBuy == 0) {
              if (that.$store.state.user.data.student.cityName == "广州市") {
                this.$router.push(
                  `/payment/${that.$store.state.user.data.practiceComboId}/1`
                );
              } else
                this.$super.modalTip.show({
                  type: "practiceBuyTip",
                  isMaskClicker: false,
                  autoHide: true,
                  content: `本学院由超级课程表联合13家名企共同成立，包含线下参观、实训服务，非广州地区用户无法参加，是否继续报名？`,
                  onClose: res => {
                    if (res == 1) {
                      that.$router.push(
                        `/payment/${
                          that.$store.state.user.data.practiceComboId
                        }/1`
                      );
                    } else {
                    }
                  }
                });
              // this.$super.buyTip.show({
              //   type: "practice",
              //   isMaskClicker: false,
              //   onClose: res => {
              //     if (res == 1) {
              //       that.$router.push(
              //         `/payment/${
              //           that.$store.state.user.data.practiceComboId
              //         }/1`
              //       );
              //       // if (!that.$store.state.identity) {
              //       //   window.location.href = `${window.location.origin}${
              //       //     window.location.pathname
              //       //   }#/login?id=${
              //       //     that.$store.state.user.data.practiceComboId
              //       //   }&name=${"payment"}&type=1`;
              //       //   return false;
              //       // } else {
              //       //   that.$router.push(
              //       //     `/payment/${
              //       //       that.$store.state.user.data.practiceComboId
              //       //     }/1`
              //       //   );
              //       // }
              //     } else {
              //     }
              //   }
              // });
            } else {
              that.$router.replace({ name: "Order.pay" });
              that.$super.toast.text("您已报名该课程");
            }
          } else {
            this.$super.modalTip.show({
              type: "practiceBuyTip",
              isMaskClicker: false,
              autoHide: true,
              content: `需登陆超级课程表账号进行付费报名，本学院由超级课程表联合13家名企共同成立，包含线下参观、实训服务，非广州地区用户无法参加，是否继续报名？`,
              onClose: res => {
                if (res == 1) {
                  if (!that.$store.state.identity) {
                    window.location.href = `${window.location.origin}${
                      window.location.pathname
                    }#/login?id=${
                      that.$store.state.user.data.practiceComboId
                    }&name=${"payment"}&type=1`;
                    return false;
                  } else {
                    that.$router.push(
                      `/payment/${
                        that.$store.state.user.data.practiceComboId
                      }/1`
                    );
                  }
                } else {
                }
              }
            });
            // this.$super.buyTip.show({
            //   type: "practice",
            //   isMaskClicker: false,
            //   onClose: res => {
            //     if (res == 1) {
            //       if (!that.$store.state.identity) {
            //         window.location.href = `${window.location.origin}${
            //           window.location.pathname
            //         }#/login?id=${
            //           that.$store.state.user.data.practiceComboId
            //         }&name=${"payment"}&type=1`;
            //         return false;
            //       } else {
            //         that.$router.push(
            //           `/payment/${
            //             that.$store.state.user.data.practiceComboId
            //           }/1`
            //         );
            //       }
            //     } else {
            //     }
            //   }
            // });
          }
        });
    },
    handleScroll() {
      let scrollTop =
          window.pageYOffset ||
          document.documentElement.scrollTop ||
          document.body.scrollTop,
        offsetT = document.getElementById("nav-data-wrap").offsetTop,
        offsetH = document.getElementById("nav-data-wrap").offsetHeight;

      this.scroll.offsetT = Math.max(this.scroll.offsetT, offsetT);

      if (this.scroll.offsetT && this.scroll.offsetT - scrollTop < 10) {
        this.navCss = "fixTop";
      } else if (scrollTop < this.scroll.offsetT) {
        this.navCss = "";
      }

      // this.scroll.top = scrollTop;
    }
  }
};
</script>
<!-- Add "scoped" attribute to limit CSS to this component only-->
<style lang="postcss">
@import "../../styles/common.pcss";
#institute-wrap {
  padding-bottom: 100px;
  width: 100%;
  min-height: 1100px;
  background: #fff;
  .institute-wrap__header {
    min-height: 338px;
  }
  img {
    width: 100%;
    display: block;
    font-size: 0;
    line-height: 0;
  }
  .institute-wrap-nav {
    @extend %clearfix;
    padding: 20px 0;
    text-align: center;
    background: #fff;
    .wrap-nav__item {
      position: relative;
      display: inline-block;
      margin-left: 2%;
      width: 25%;
      height: 64px;
      line-height: 65px;
      border-radius: 32px;
      font-size: 32px;
      color: #696969;
      &.active {
        color: #373737;
        font-weight: bold;
        &:after {
          content: "";
          position: absolute;
          display: block;
          bottom: -20px;
          left: 60px;
          width: 40%;
          background: #3d69aa;
          border-radius: 16px;
          height: 6px;
        }
      }
    }
    &.sticky {
      /*滚过初始位置时自动吸顶*/
      position: -webkit-sticky;
      position: sticky;
      /*吸顶时的定位*/
      top: -5px;
      left: 0;
      width: 100%;
      /*z比下方所有z高*/
      z-index: 10;
    }
    &.fixTop {
      position: fixed;
      top: 0;
      width: 100%;
      z-index: 10;
    }
  }
  .institute-wrap-detail {
    margin: 20px 0 0;
    position: relative;
    &.fixTop {
      margin: 140px 0 0;
    }
  }
  .institute-footer {
    @extend %normal-footer;
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 100;
    background: #fff;

    .institute-footer__btn {
      width: 50%;
      &.link-btn {
        width: 30%;
        display: inline-block;
        color: #3a64a6;
        background: #fff;
        line-height: 66px;
        border: solid 3px #3a64a6;
        margin-right: 40px;
        &:after {
          border-left: 11px solid #3a64a6;
        }
      }
      &:active {
        background: color(#3f6cad shade(10%));
      }
    }
  }
}
</style>
