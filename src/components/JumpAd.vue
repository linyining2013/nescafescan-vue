<template>
  <router-link to='' class="link" :style="stylebig">
      {{ parentMessage }}
  </router-link>
</template>
<script>
    export default {
        props: {
            parentMessage: {
                type: String,
                default: '进入弹润嘭嘭肌的世界'
                // require: true // 必填
            },
            stylebig:{
                type:String,
                default:'padding:0 0.7rem'
            }
        }
    }
</script>
<style lang="postcss" scoped>
    .link{
        font-size: 30px;
        color: #fff;
        /* width: 412px; */
	height: 83px;
    display: inline-block;
    text-align: center;
    line-height: 83px;
    /* padding: 0 53px; */
	background-color: #ff7495;
	border-radius: 42px;
    }
</style>