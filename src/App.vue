<template>
  <div id="app" :class="{fixed: isInvitation}">
    <router-view v-if="$store.state.user.data.practiceComboId && (!$utils.isWXBrowser || ($utils.isWXBrowser && $store.state.user.openid != -1))" />
   <!-- 第二大学的一封信
    <transition :duration="1000" name="invitation-fade">
      <invitation-box v-if="isInvitation" v-on:hideInvitation="hideInvitation"></invitation-box>
    </transition>

    -->
  </div>
</template>

<script>
import invitationBox from "@/components/Invitation.vue";
import Invitationletter from "@/assets/images/invitation/letter.png";
import jsuper from "exports-loader?jsuper!@/../node_modules/SuperBrowserLibs/dist/jsuperV2.js";

export default {
  components: {
    "invitation-box": invitationBox
  },
  data() {
    return {
      isInvitation: false
    };
  },
  name: "app",
  mounted() {
    let that = this;
    //当前是为了去掉第二大学的一封信，调用下面方法，页面才能滚动
    this.setScroll();
    // if (this.$store.state.identity)
    let openid = this.$store.state.user.openid;
    if (openid) {
      this.$API.get_user_info({ openId: openid }).then(res => {
        if (res.code == 0) {
          let data = res.data,
            unionid = data.unionid;
          let gender = data.sex == 2 ? 0 : data.sex

          this.$store.dispatch("updateUnionId", unionid);
          this.$store.dispatch("updateNickname", data.nickname);
          this.$store.dispatch("updateAvatarUrl", data.headimgurl);
          this.$store.dispatch("updateGender", gender);
          this.getUserBindWXInfo(openid, unionid);
        } else {
          this.$utils.cookie.set("openid", "");
          this.$utils.cookie.set("identity", "");
          this.$store.dispatch("updateId", "");
          //清除当前账号信息， 重新授权

          this.$router.replace("/author");
        }
      });
    } else {
      this.getStudentInfo();
    }
  },
  methods: {
    getUserBindWXInfo(openid, unionid) {
      let that = this;

      this.$API
        .getUserBindWXInfo({
          openID: openid,
          unionID: unionid
        })
        .then(res => {
          //成功
          let status = res.status;
          if (status == 1) {
            let data = res.data,
              identity = data.identity,
              account = data.account;
            if (identity) {
              //没有
              that.$store.dispatch("updateId", identity);

              that.$API.updateAuthInfo({
                unionId: unionid,
                openId: openid,
                identity: identity
              });

            }
            that.$store.dispatch("updateWXaccount", account);
          } else {
            this.$utils.cookie.set("identity", "");
            this.$store.dispatch("updateId", "");
          }

          that.getStudentInfo();
        });
    },
    getStudentInfo() {
      let that = this;
      this.$API
        .getStudentInfo({
          identity: this.$store.state.identity
        })
        .then(data => {
          if (!data.student) {
            data.student = {
              avatarUrl: require("@/assets/images/shareIcon.png"),
              nickName: "第二大学学员"
            };
          }

          this.$store.dispatch("updateUserinfo", data);

          if (data.student.isNeedAddEdu) {
            this.$router.replace("/Institute/schoolCard?type=1");
          } else {
            if (
              data.student &&
              // data.student.cityName == "广州市" &&
              !data.student.isInPractice &&
              this.$utils.isSuperBrowser &&
              (this.$router.history.current.name == "Home.me" ||
                this.$router.history.current.name == "Home.index.course" ||
                this.$router.history.current.name == "Home.index.package")
            ) {
              jsuper.store({
                success: function(data) {
                  if (data.isInvitation != "true") {
                    let img = new Image();
                    img.src = Invitationletter;
                    img.onload = () => {
                      that.isInvitation = true;
                    };
                  }
                }
              });
            }
          }

          data.student.isInPractice == 1 &&
            setInterval(that.getTipsUnReadNum, 90 * 1000);
        });
    },
    getTipsUnReadNum() {
      let that = this;
      if (this.$router.history.current.name == "Home.me")
        this.$API.getTipsUnReadNum().then(data => {
          that.$store.state.user.unReadNum != data &&
            that.$store.dispatch("updateUnReadNum", data);
        });

      return true;
    },
    hideInvitation() {
      this.isInvitation = false;
      //设置存储对象
      jsuper.store({
        data: { isInvitation: "true" },
        success: function(data) {}
      });
      this.$utils.cookie.set("hadInvitation", 1);
      this.$router.push({ name: "invitation" });
    },
    setScroll(){
       this.isInvitation = false;
      //设置存储对象
      jsuper.store({
        data: { isInvitation: "true" },
        success: function(data) {}
      });
      this.$utils.cookie.set("hadInvitation", 1);
    }
  },
  watch: {
    $route(to, form) {
      if (form.name == "login") {
        this.getStudentInfo();
      }
      this.$super.modalTip.hide();
    }
  }
};
</script>



<style lang="postcss">
@import "./styles/app.pcss";
@import "./styles/common.pcss";
@import "./styles/label&Course&pack.pcss";
#app.fixed {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  overflow: hidden;
}

.invitation-fade-enter-active {
  .letter-box {
    animation: bounce-in 0.6s;
  }
}

.invitation-fade-leave-active {
  transition: all 0.5s cubic-bezier(0.55, 0, 0.1, 1);
  .letter-box {
    animation: bounce-out 0.6s;
  }
}
.invitation-fade-leave-to {
  opacity: 0;
}

@keyframes bounce-out {
  100% {
    transform: scale(1.5);
    opacity: 0;
  }
}

@keyframes bounce-in {
  0% {
    transform: scale(0);
    opacity: 0;
  }
  50% {
    transform: scale(1.2);
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
}
/* .invitation-fade-enter {
  transform: translate3d(80px, 0, 0);
} */

#open_modal img{
  height: 150px;
  width: 150px;
}
</style>
