<template>

	
  <router-link to='' class="link" :style="stylebig" :class="num==0?'other2':''">
      {{ parentMessage }}

  <span class="tips" v-if="num2>0" :style="num<=0?'display:none':''">X{{num}}</span>
  </router-link>

</template>
<script>
    export default {
        props: {
            parentMessage: {
                type: String,
                default: '扫一扫'
                // require: true // 必填
            },
            num:{
                 type:Number,
                default:5
            },
            num2:{
                 type:Number,
                default:0
            },
            stylebig:{
                type:String,
                default:''
            },
            stylebig2:{
                type:String,
                default:'display:none'
            }
        },
        created() {
            
        },
    }
</script>

<style lang="postcss" scoped>
    .link{
        font-size: 36px;
        color: #6b2916;
            position: relative;

        /* width: 412px; */
    display: inline-block;
    text-align: center;
    line-height: 100px;
    /* padding: 0 53px; */
	background-color: #ff7495;
    width: 320px;
    
	height: 100px;
    font-weight: normal;
	background-color: #ffde00;
	box-shadow: 0px 10px 10px 0px 
		rgba(240, 128, 19, 0.32);
	border-radius: 50px;
    }
    
    .tips{
         position:absolute;
        top:-30px;
        right:-20px;
        width: 72px;
        font-size: 26px;
	
	color: #ffffff;
         justify-content: center;
    display: flex;
    align-items: center;
	height: 60px;
    line-height:60px;
	background-color: #ff5a00;
	box-shadow: 0px 2px 6px 0px 
		rgba(240, 128, 19, 0.6);
	border-radius: 30px;
    }
    .other2{
        background-color: #dbdbdb;
	box-shadow: 0px 10px 10px 0px 
		rgba(40, 17, 4, 0.2);
     
	color: #808080;
    }
</style>