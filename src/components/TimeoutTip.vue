<template>
  <div class="sui-tomeout-wrap" v-show="show">
    <header></header>
    <p>网络开小差，请重试</p>
    <button v-on:click="reload">再试一次</button>
  </div>
</template>

<script>

export default {
  name: "sui-tomeout",
  data() {
    return {
      show: false
    };
  },
  methods: {
    reload(){
      window.location.reload();
    }
  },
};
</script>

<style lang="postcss" scoped>
.sui-tomeout-wrap {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: #fff;
  z-index: 999;
  text-align: center;
  font-size: 26px;
  color: #000;
  header{
    background: url('http://qiniu.myfriday.cn/FisutHRt4VlXj1gxpzXCyeq8HDHG') 0 0 no-repeat;
    background-size: 334px 247px;
    width: 334px;
    height: 247px;
    margin: 20% auto 0;
  }
  p{
    margin: 50px 0 80px;
  }
  button{
    width: 50%;
    color: #fff;
    border: 0;
    background: #416eae;
    padding: 20px 0;
    border-radius: 40px;
  }
}
</style>
