<template>
  <section class="pay-btn-wrap">
    <button type="button" class="pay-btn" @click="buyNow" v-if="name === 'Learning'">报名该课程&nbsp;￥{{(course.sellPrice*0.01).toFixed(2)}}</button>
    <div class="course-detail-bottom-btn" v-else-if="course.courseType === 0">
      <div class="course-btn-box">
        <router-link tag="button" :to="{path: '/learning/' + course.id + '/1'}" v-if="course.isBuy && course.operator == 'chaoBiao'" class="btn-item">开始学习 (已报名) </router-link>
        <button @click="create4Free(1)" v-if="!course.isBuy && course.sellPrice===0" class="btn-item">免费参与 </button>
        <button @click="buyNow" v-if="!course.isBuy && course.sellPrice!==0" class="btn-item">立即报名
          <span class="bold">&yen;{{(course.sellPrice*0.01).toFixed(2)}}</span>
        </button>
      </div>
      <div class="package-btn-box" v-if="!course.isBuy && typeof(course.comboDetails) == 'object' && course.comboDetails.length">
        <router-link tag="button" :to="{path: '/package/' + course.comboDetails[0].comboId}" class="btn-item package-btn">优惠课程组合</router-link>
      </div>
    </div>
    <footer class="package-footer" v-show="!course.isBuy" v-else>
      <button class="btn buy-btn" @click="buyNow">立即报名 ￥{{((course.sellPrice||0)/100).toFixed(2)}}</button>
    </footer>

  </section>
</template>
<script>
// import this.$API from "@/plugins/this.$API";
export default {
  data() {
    return {};
  },
  props: ["course", "name"],
  computed: {},
  mounted() {},
  methods: {
    toLearning(pageNo) {
      this.$router.push({
        name: "Learning",
        params: {
          id: this.course.id,
          pageNum: pageNo
        }
      });
    },
    create4Free(pageNo) {
      //创建免费订单
      if (this.$store.state.identity) {
        this.$API
          .create4Free({
            courseId: this.course.id,
            courseType: 0,
            os: this.$utils.isSuperBrowser ? 0 : this.$utils.isWXBrowser ? 1 : 2 //支付平台 0: app 1：公众号 2：h5
          })
          .then(data => {
            this.toLearning(pageNo || 1);
          });
      } else {
        this.toLearning(pageNo || 1);
      }
    },
    buyNow() {
      this.$store.dispatch("updateCourseInfo", this.course); //把当前支付信息存储起来

      if (!this.$store.state.identity) {
        // vue.$super.buyTip.show({ type: "download", infoType: "download" }); //12.1 暂时去除站外登陆
        window.location.href = `${window.location.origin}${
          window.location.pathname
        }#/login?id=${this.course.id}&name=${this.name ||
          (this.course.courseType === 0 ? "CourseDetail" : "Package")}&type=${
          this.course.courseType === 0 ? 0 : 1
        }`;
        return false;
      } else if (!this.$utils.isSuperBrowser && !this.$utils.isWXBrowser) {
        // this.$super.buyTip.show({
        //   type: "download",
        //   infoType: "notBuy",
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
          content: `暂不支持站外报名，请下载超级课程表app或关注微信公众号“超级课程表第二大学”报名学习吧！`,
          autoHide: true,
          onClose: res => {
            if (res == 1) {
              window.location.href = "http://www.super.cn/jump.php";
            } else {
              this.$utils.deepLinkTo();
            }
          }
        });
      } else {
        //未购买课程
        this.$router.push({
          name: "payment",
          params: {
            id: this.course.id,
            type: this.course.courseType == 0 ? 0 : 1
          }
        });
      }
    }
  }
};
</script>

<style lang="postcss"></style>