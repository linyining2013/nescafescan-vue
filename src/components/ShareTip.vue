<template>
  <div class="sui-share-wrap" v-show="show">
    <header>
      <img src="http://super-web.qiniudn.com/common/images/wxstp.png" width="207px" height="80px"/>
    </header>
    <footer>
      <img src="http://super-web.qiniudn.com/mobile/weixinBtn.png" v-on:click="show=false" width="119px" height="50px"/>
    </footer>
  </div>
</template>

<script>

export default {
  name: "sui-share",
  data() {
    return {
      show: false
    };
  },
  created() {},
};
</script>

<style lang="postcss" scoped>
.sui-share-wrap {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0,0,0, .8);
  z-index: 999;
  text-align: center;
  header{
    text-align: right;
  }
  footer{
    margin-top: 50%;
  }
}
</style>
