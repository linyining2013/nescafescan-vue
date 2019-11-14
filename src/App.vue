<template>
  <div id="app" >
    <router-view />
   <!-- 第二大学的一封信
    <transition :duration="1000" name="invitation-fade">
      <invitation-box v-if="isInvitation" v-on:hideInvitation="hideInvitation"></invitation-box>
    </transition>

    -->
  </div>
</template>

<script>
import jsuper from "exports-loader?jsuper!@/../node_modules/SuperBrowserLibs/dist/jsuperV2.js";
export default {
 
  data() {
    return {
      isInvitation: false
    };
  },
  name: "app",
  provide () {
    return {
      reload: this.reload
    }
  },
  created(){
     if(!this.$utils.isSuperBrowser){
         this.$router.push('./')
         return
    }
  },
  mounted() {
    if (this.$utils.isSuperBrowser) {
      this.$utils.setShare();
    } else if (this.$utils.isWXBrowser) {
      this.$weixin.init();
    }
    let that = this;
    //当前是为了去掉第二大学的一封信，调用下面方法，页面才能滚动
    this.setScroll();
    // if (this.$store.state.identity)
  },
  methods: {
    hideInvitation() {
      this.isInvitation = false;
      //设置存储对象
      // jsuper.store({
      //   data: { isInvitation: "true" },
      //   success: function(data) {}
      // });
      // this.$utils.cookie.set("hadInvitation", 1);
      // this.$router.push({ name: "invitation" });
    },
    setScroll(){
       this.isInvitation = false;
      //设置存储对象
      // jsuper.store({
      //   data: { isInvitation: "true" },
      //   success: function(data) {}
      // });
      // this.$utils.cookie.set("hadInvitation", 1);
    }
  },
  watch: {
    // $route(to, form) {
    //   if (form.name == "login") {
    //     this.getStudentInfo();
    //   }
    //   this.$super.modalTip.hide();
    // }
  }
};
</script>



<style lang="postcss">
@import "./styles/app.pcss";
@import "./styles/common.pcss";
#app.fixed {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  overflow: hidden;
}
#app{
  font-size: 32px;
  height: 100%;

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
