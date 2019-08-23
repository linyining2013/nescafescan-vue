<template>
  <section id="category-wrap">
    <transition-group id="category-list-wrap" name="list-complete" tag="ul">
      <router-link v-if="value.id != 0" v-for="(value, index) in category" class="category-item" :class="{'right-box': (index + 1)%3 == 0}" :key="value.id" tag="li" :to="{path: '/courseList/' + value.id}">
        <div class="pos-box" >
          <img class="icon" :src="value.iconUrl" width="80px" height="80px" />
          <span class="txt">{{value.name}}</span>
        </div>
      </router-link>
      <div class="category-item" :key="value.id" :class="{'right-box': (index + 1)%3 == 0}" v-else>
        <div class="pos-box more-box" >
          <p class="txt">更多<br/>敬请期待</p>
        </div>
      </div>
    </transition-group>
  </section>
</template>

<script>
// import API from "../../plugins/API";
// import _ from "lodash";
export default {
  data() {
    return {
      category: []
    };
  },
  // beforeDestroy() {
  //   this.$super.buyTip.hide();
  // },
  mounted() {
    document.title = "全部分类";
    if (this.$utils.isSuperBrowser) {
      this.$utils.setShare();
    } else if (this.$utils.isWXBrowser) {
      this.$weixin.init();
    }

    this.$API.indexCourse().then(res => {
      var banner = res.banner,
        category = res.category;
      this.category = category;
      this.category.push(...[{ id: 0 }]);
    });
  },
  watch: {}
};
</script>
<!-- Add "scoped" attribute to limit CSS to this component only-->
<style lang="postcss" scoped>
@import "../../styles/common.pcss";
.category-item {
  transition: all 0.6s;
  transform: translateY(0);
}
.list-complete-enter,
.list-complete-leave-to {
  opacity: 0;
  transform: translateY(30px);
}

#category-wrap {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background: #fff url(../../assets/images/normalBg.png) 0 bottom no-repeat;
  background-size: contain;
  overflow: auto;
  -webkit-overflow-scrolling: touch;
}
#category-list-wrap {
  @extend %clearfix;
  border-top: 4px solid #f6f7fc;
  .category-item {
    float: left;
    text-align: center;
    width: 33%;
    .txt {
      color: #666;
      font-size: 26px;
    }
    .icon {
      line-height: 0;
      font-size: 0;
      width: 50px;
      height: 50px;
      vertical-align: middle;
    }
    .pos-box {
      height: 145px;
      line-height: 130px;
      border-right: 4px solid #f6f7fc;
      border-bottom: 4px solid #f6f7fc;
      &.more-box {
        .txt{
          padding-top: 30px;
          line-height: 1.5;
        }
      }
    }
    &.right-box {
      width: 34%;
      border-right: 0;
      .pos-box{
        border-right: 0;
      }
    }
    
  }
}
</style>
