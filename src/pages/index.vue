<template>
 <div class="index">
     <div class="time">
         <div class="time-head">距离珊珂品牌日好礼开抢{{isEnd?'':'还有'}}</div>
         <div class="time-body" v-if="isEnd" >
             <div class="data endData" >已结束</div>
         </div>
         <div class="time-body" v-else>
             <div class="data" v-text="time.d">00</div>
             <div class="data-other">天</div>
             <div class="data depend first" v-text="time.h">0</div>
             <div class="data depend" v-text="time.h2">0</div>
             <div class="data-time">:</div>
            <div class="data depend first" v-text="time.m">0</div>
             <div class="data depend" v-text="time.m2">0</div>
             <div class="data-time">:</div>
             <div class="data depend first" v-text="time.s">0</div>
             <div class="data depend" v-text="time.s2">0</div>
         </div>
     </div>
     <!-- <div class="img">
         <img src="http://qiniu.myfriday.cn/index2.png" width="100%" alt="">
     </div> -->

     <!-- <jump-ad :parentMessage="parentMessage" :stylebig="big" v-if="super2"  class='timeJump' @click.native="jumpTime"></jump-ad> -->
     <router-link to='/list' class="link link2"  v-if="super2" >进入弹润嘭嘭肌的世界</router-link>
      <a class="link" v-else  @click='jumpApp'>
                       前往超级课程表<br>进入水嫩素颜世界
                    </a>
     <killJump></killJump>
     <div class='maskAPP' v-if="maskAPP">
         <div class="img">
             <img src="http://qiniu.myfriday.cn/Fu0DQWGQLk8n_ZBy34oSqHzrZ5b0" width='100%' alt="">
         </div>
     </div>
 </div>
</template>
<script>
// import jsuper from "exports-loader?jsuper!@/../node_modules/SuperBrowserLibs/dist/jsuperV2.js";
// import * as qiniu from "qiniu-js";
import '@/plugins/font/font.css'
import JumpAd from "@/components/JumpAd"

 
export default {
  components:{
      JumpAd,
  },
  data() {
    return {
     parentMessage:'进入弹润嘭嘭肌的世界',
     big:'padding:0 0.7rem;',
     isEnd:false,//倒计时是否结束
        endTime:this.$store.state.endTime,//应为接口获取到的结束时间
        startTime:this.$store.state.startTime,//应为接口获取到的结束时间
      time:{
          d:'00',
          h:'0',
          h2:'0',
          m:'0',
          m2:'0',
          s:'0',
          s2:'0'
      }  ,
    super2:true,
    maskAPP:false
    };
  },
  created() {
      if(!this.$utils.isSuperBrowser){
                this.super2 =false
      }
      if(this.$utils.isWXBrowser){
                this.maskAPP = true
            }
      localStorage.removeItem('kill')
            this.setEndTime()
      this.initData()
  },
  mounted() {
    //  console.log( $('.btn'));
    //选择上传文件
  },
  watch:{
      isEnd(){
          if((new Date(this.endTime)) - (new Date())<=0){
              return true
          }else{
              return false
          }
      }
  },
  methods: {
      initData(){
          this.$API.sign().then(res=>{
              if(res.data.sign){
                //   this.$router.push('./list')
            this.setEndTime()
              }
          })
           var inte= setInterval(() => {
      
                if ((new Date(this.endTime)).getTime() <=(new Date()).getTime()) {
                    clearInterval(inte)
                    this.isEnd=true
                } else {
                    this.isEnd=false
                }
                // console.log(this.isEnd);
            }, 1000);
            
      },
     jumpTime(){
          if(this.$utils.isSuperBrowser){
         this.$router.push('./list')
            }else{
                window.location.href='http://www.super.cn'

            }
     },
      setEndTime(){
        var that = this;
        var mm,hh,ss

            // console.log(new Date().getTime());
            // console.log(new Date('2017/08/12 23:00:00').getTime());
		var interval = setInterval(function timestampToTime(){
        var date = (new Date(that.startTime)) - (new Date()); //计算剩余的毫秒数
		if(date <= 0){
			clearInterval(interval)
		}else{
			that.time.d = parseInt(date / 1000 / 60 / 60 / 24 , 10)<10?'0'+parseInt(date / 1000 / 60 / 60 / 24 , 10):parseInt(date / 1000 / 60 / 60 / 24 , 10);
			hh = parseInt(date / 1000 / 60 / 60 % 24 , 10);
			if(hh < 10){
				 hh = "0" +　hh
			}
            mm = parseInt(date / 1000 / 60 % 60, 10);//计算剩余的分钟
			if(mm < 10){
				 mm = "0" +　mm
			} 
	  		ss= parseInt(date / 1000 % 60, 10);//计算剩余的秒数 
	  		if(ss< 10){
				 ss= "0" +　ss
            }
            // console.log(that.time.d);
            that.time.s=ss.toString().substring(0,1)
            that.time.s2=ss.toString().substring(1,2)
            that.time.m=mm.toString().substring(0,1)
            that.time.m2=mm.toString().substring(1,2)
            that.time.h=hh.toString().substring(0,1)
            that.time.h2=hh.toString().substring(1,2)
		}
            },1000);
        },
        jumpApp(){
            
                if(this.$utils.isIOS){
    
                        window.location.href='xtuonesuperfriday://webView/webView?action=redirectUrl&url=http://a.super.cn/shanke/index.html'
                    }else{
                        window.location.href='xtuonefriday://webView/webView?action=redirectUrl&url=http://a.super.cn/shanke/index.html'
                    }
        },
      tow(n) { 
            return n >= 0 && n < 10 ? '0' + n : '' + n; 
        } 
  }
};
</script>  

<style lang="postcss" scoped>
.maskAPP{
       position: fixed;
        z-index: 4003;
        top: 0;
        bottom: 0;
        right: 0;
        left: 0;
        /* position: relative; */
        .img{
            position: absolute;
            top:0;
            right:0;
            width: 60%;
        }
            /* padding:144px 62px 0; */
        background: rgba(0, 0, 0, 0.5);
}
.hide {
  display: none;
}
    /* background: #e2f1ff; */

.index{
    overflow: hidden;
    /* background:url(http://qiniu.myfriday.cn/index.png) 0 0 no-repeat scroll transparent;
    background-size: cover; */
    /* http://qiniu.myfriday.cn/FmloykBC3rMWQRpWCYAIHBB6ZLGp  640 760 */
    /* http://qiniu.myfriday.cn/FvOLP06uagc6ecSxRsWJmpHnJur0 640 850 */
    /* http://qiniu.myfriday.cn/FnkpxeoyKYPuiIZr3OGOwWfhGT6G  小 */
    /* http://qiniu.myfriday.cn/FlwnkGapJU-CO01svkXh0SxhANOP 小 */
    /* http://qiniu.myfriday.cn/Fg0WRY3MDzAYNV5jBsQqq4MvzVt8 大 */
    /* background-image: url('http://qiniu.myfriday.cn/FlwnkGapJU-CO01svkXh0SxhANOP ');   */
    /* background-image: url('../assets/index/13.png');   */
    background-image: url('http://qiniu.myfriday.cn/FpRUh9LyfdoMIFmEM8ktymmSI4rc');
     background-repeat: no-repeat;
    background-position: center ;
    background-size: cover;
    overflow: hidden;
    /* background: #e2f1ff; */
    width: 100%;
    height:  100vh;
    position: relative;
}

.link{
              width: 412px;
                   box-sizing: border-box;
	    height: 130px;
       text-align: center;
       vertical-align: center;
       padding-top: 28px;
       line-height: 40px;
        /* line-height: 95px; */
                	background-color: #ff7495;
	border-radius: 75px;
               font-size: 32px;
                  display: inline-block;
                font-weight: normal;
                font-stretch: normal;
               color: #ffffff;
                right: 0;
                margin: auto;
                left: 0;
                position: absolute;
                bottom: 40px;
            }
.link2{ 
	    height: 80px;
              width: 450px;
       padding-top:0px;
        line-height: 80px;
}        
.time{
    width: 635px;
	height: 240px;
	background-color: #e6434c;
	border-radius: 8px;
    margin: 0 auto;
    /* margin-top: 120%; */
    position: absolute;
    left: 0;
    right: 0;
    bottom: 190px;

    &-head{
	width: 505px;
	height: 71px;
    line-height: 71px;
	background-color: #ffffff;
	box-shadow: 0px 3px 0px 0px 
		rgba(209, 22, 45, 0.49);
	border-radius: 0px 0px 10px 10px;
    margin:0 auto;
    font-size: 33px;
    color: #e6434c;
    text-align:center;
    margin-top:-5px;
    }
    &-body{
        display: flex;
        margin: 22px 28px;
        justify-content: center;
        align-items: center;
            color:#fff;
        .data{
            /* width: 110px; */
            height: 109px;
            background-color: #dc2d42;
            border-radius: 4px;
            font-family: AB;
	        font-size: 90px;
            text-align:center;
            line-height: 109px;
            padding-right:15px;
        } 
        .endData{
             background-color: #e6434c;
        }
        .depend{
            /* width: 55px; */
            padding:0 4px;

        }
        .first{
            margin-right: 7px;
        }
        .data-other{
            font-size: 25px;
            margin:0 25px 0 6px;
        }
        .data-time{
            font-size: 45px;
            margin: 0 10px;
        }
    }
}
.timeJump{
     margin: 0 auto;
    /* margin-top: 120%; */
    position: absolute;
    left: 0;
    right: 0;
    width: 412px;
    bottom: 81px;
}
.img{
    img{
width: 100%;
    /* height: 100%; */
    }
    height:100vh;
    width: 100vw;
}
/* @media only  screen and (max-width:480px) {
    .index{
    background-image: url('http://qiniu.myfriday.cn/FnkpxeoyKYPuiIZr3OGOwWfhGT6G');
    background-image: url('../assets/index/12.png');  

    }
    .time{
    }
}
@media only  screen and (min-width: 480px) {
    .index{
    background-image: url('http://qiniu.myfriday.cn/Fg0WRY3MDzAYNV5jBsQqq4MvzVt8');
    background-image: url('../assets/index/12.png');  

    }
} */
</style>