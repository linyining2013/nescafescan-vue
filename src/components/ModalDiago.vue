<template>
  <div class="maskDg" v-if="isShow" :class="{kill3:kill3,kill:kill}" @touchmove.prevent @mousewheel.prevent>
       <div class="contentDg" v-if="kill">
           <!-- <div  v-show="showText" class="content-head" >
               <div v-if="prizeType==0">

               <div class="content-head-tip">
                   很遗憾！
               </div>
               <div class="content-head-detail">
                来晚一步，奖品都被抢完了！
               </div>
               </div>
               <div v-else>

               <div class="content-head-tip">
                   恭喜你！
               </div>
               <div class="content-head-detail">
                获得珊珂提供的价值
               </div>
               <div v-if="prizeType==1" class="content-head-detail">
                1000元的弹润携程之旅礼品卡
               </div>
               <div v-else-if="prizeType==2" class="content-head-detail">
                价值345元珊珂丝润焕白4件套
               </div>
               <div v-else-if="prizeType==3" class="content-head-detail">
                珊珂绵润胶原洁面膏
               </div>
               </div>
           </div>
        <div :class="{bigimgDg:true,win:win}" v-if="!kill">

            <img src="@/assets/images/first.png" v-if="prizeType==1" alt="" srcset="" width="100%">
            <img class="second" src="@/assets/images/second.png" v-else-if="prizeType==2" alt="" srcset="" width="100%">
            <img class="three" src="@/assets/images/three.png" v-else-if="prizeType==3" alt="" srcset="" width="100%">
            <img src="@/assets/images/big.png" v-else alt="" srcset="" width="100%">
        </div>
        <div :class="{bigimgDg:true,kill:kill,kill2:!kill2}" v-else>
            <img src="@/assets/images/big.png" alt="" srcset="" width="100%">
        </div>
        <p v-show="win" v-if="prizeType!=0">
            超级课程表客服人员将在9月18日之前通过小纸条和短信的形式向您确认奖品和物流信息，请留意手机推送短信。
        </p>
      
         <jump-ad :parentMessage="parentMessage" class='pre' @click.native="jump"></jump-ad>
    <div class="right-img-dg" @click="hide">
                <img src="@/assets/images/close.png" alt="" width="100%">
            </div> -->
            <div class="contentDg-img">
            <img src="@/assets/images/mask.png" alt="" srcset="" width="100%">
                   <div class="close" @click="hideJump"></div>
                <div class="content">
                <div class="content-head" >
                    <div v-if="prizeType==0">
                    <div class="content-head-tip">
                        很遗憾！
                    </div>
                    <div class="content-head-detail">
                        来晚一步，奖品都被抢完了！
                    </div>
                    <div class="content-head-detail">
                        （限量10000套）
                    </div>
                    </div>
                    <div v-else>

                    <div class="content-head-tip">
                        恭喜你！
                    </div>
                    <div class="content-head-detail" >
                        获得珊珂提供的
                    </div>
                    <div v-if="prizeType==1" class="content-head-detail dd">
                        价值1000元的弹润携程之旅礼品卡
                    </div>
                    <div v-else-if="prizeType==2" class="content-head-detail  ">
                        价值345元珊珂丝润焕白4件套
                    </div>
                    <div v-else-if="prizeType==3" class="content-head-detail  ">
                        珊珂绵润胶原洁面膏
                    </div>
               </div>
               <div :class="{bigimg:true,kill:prizeType>0,firstpt:prizeType==1}" >
                    <img class="oo"  src="@/assets/images/first.png" v-if="prizeType==1" alt="" srcset="" width="100%">
                    <img class="oo2" src="@/assets/images/second.png" v-else-if="prizeType==2" alt="" srcset="" width="100%">
                    <img class="oo3" src="@/assets/images/three.png" v-else-if="prizeType==3" alt="" srcset="" width="100%">
                    <img class="oo4" src="@/assets/images/big2.png" v-else alt="" srcset="" width="100%">
                </div>
                 <p  v-if="prizeType>0">
                    超级课程表客服人员将在9月18日之前通过小纸条和短信的形式向您确认奖品和物流信息，请留意手机推送短信。
                </p>
                 <a class="link" v-if="prizeType>0" href="https://detail.tmall.com/item.htm?spm=a1z10.1-b-s.w5003-21968564465.14.fef236f13FhPDk&id=590428515064&rn=0e7f04f32297245ecca4da008e4735ad&abbucket=15&skuId=4040577752112">
                       GET限量礼包
                    </a>
                 <a class="link" v-else href="https://detail.tmall.com/item.htm?spm=a1z10.1-b-s.w5003-21968564465.14.fef236f13FhPDk&id=590428515064&rn=0e7f04f32297245ecca4da008e4735ad&abbucket=15&skuId=4040577752112">
                       立即拥有
                    </a>
           </div>
                </div>
            </div>
            

       </div>
        <div class="content-tip"  v-else-if="kill2">
                   <div class="img-tip">
            <img src="@/assets/images/list2.png" alt="" srcset="" width="100%">
                   </div>
                   <div class="close" @click="hideJump"></div>
                   <div class="jump" @click="jumpNew"></div>
      </div>
        <div class="content-tip"  v-else-if="kill3">
                   <div class="img-tip">
            <img src="@/assets/images/happy2.png" alt="" srcset="" width="100%">
                   </div>
                   <div class="close" @click="hideJump"></div>
                   <div class="jump push" @click="pushSec" v-if="super2">happy 开抢</div>
                   <div class="jump push2" @click="pushSec" v-else>前往超级课程表<br>happy 开抢</div>
      </div>
    </div> 
    
</template>
<script>
import JumpAd from "@/components/JumpAd";

    export default {
         props: {
            parentMessage: {
                type: String,
                default: '进入弹润嘭嘭肌的世界'
                // require: true // 必填
            },
            isShow: {
                type: Boolean,
                default: false
                // require: true // 必填
            },
            win: {
                type: Boolean,
                default: false
                // require: true // 必填
            },
            kill: {
                type: Boolean,
                default: false
                // require: true // 必填
            },
            showText: {
                type: Boolean,
                default: true
                // require: true // 必填
            },
            kill2: {
                type: Boolean,
                default: false
                // require: true // 必填
            },
            kill3: {
                type: Boolean,
                default: false
                // require: true // 必填
            },
            killJump: {
                type: Boolean,
                default: false
                // require: true // 必填
            },
            prizeType: {
                type: Number,
                default: 0
                // require: true // 必填
            },

        },
       components:{
        JumpAd
         },
      data(){
          return{
              super2:true
          }
      },
      created(){
            if(!this.$utils.isSuperBrowser){
                            this.super2=false
                        }
      },
      methods:{
          hide(){

              this.$emit("on-hide");
            //    this.isShow=false
          }
          ,
          jump(){
              if(this.killJump){
                  this.$router.push('/seckill')
              }else{

              }
          },
          hideJump(){
              this.$emit("on-hide");
          },
          jumpNew(){
            //   立即拥有
            //   this.$emit("on-hide");
            window.location.href='https://detail.tmall.com/item.htm?spm=a1z10.1-b-s.w5003-21968564465.14.fef236f13FhPDk&id=590428515064&rn=0e7f04f32297245ecca4da008e4735ad&abbucket=15&skuId=4040577752112'
          },
          jumpNew(){
            //   立即拥有
            //   this.$emit("on-hide");
            // if(this.$utils.isSuperBrowser){

                window.location.href='https://detail.tmall.com/item.htm?spm=a1z10.1-b-s.w5003-21968564465.14.fef236f13FhPDk&id=590428515064&rn=0e7f04f32297245ecca4da008e4735ad&abbucket=15&skuId=4040577752112'
            // }else{
            //     window.location.href='http://www.super.cn'

            // }
          },
          pushSec(){
            //   开抢
            if(this.$utils.isSuperBrowser){
                this.$router.push('/seckill')
            }else{
                if(this.$utils.isIOS){

                    window.location.href='xtuonesuperfriday://webView/webView?action=redirectUrl&url=http://a.super.cn/shanke/index.html'
                }else{
                    window.location.href='xtuonefriday://webView/webView?action=redirectUrl&url=http://a.super.cn/shanke/index.html'
                }

            }
          }
      }
    }
</script>
<style lang="postcss" scoped>
    .maskDg {
        position: fixed;
        z-index: 4002;
        top: 0;
        bottom: 0;
        right: 0;
        left: 0;
            padding:144px 62px 0;
        background: rgba(0, 0, 0, 0.5);
        .content-tip{
            position: relative;
            .close{
                width: 76px;
                height: 76px;
                /* background: red; */
                position: absolute;
                top: 52px;
                right: 0;
            }
            .jump{
                width: 457px;
                height: 83px;
                /* background-color: #ff7495; */
                border-radius: 41.5px;
                position: absolute;
                bottom: 52px;
                right: 0;
                left:0;
                margin:auto;
            }
        }
       .contentDg{
           .contentDg-img{

           }
           /* background: #fff;
           border-radius: 30px;
            padding:63px 54px 52px;
            text-align:center;
                color: #ff7495;
            position: relative;    
            .content-head-tip{
                font-size: 48px;
                height: 65px;
            }
            .content-head-detail{
                font-size: 36px;
            }
            .content-tip{
                font-size: 48px;
                height: 65px;
                margin-top: 40px;
                margin-bottom: 50px;
            }
            .right-img-dg{
                position: absolute;
                top:-27px;
                right:-27px;
                width: 76px;
            	height: 76px;
            }
           p{
               font-size: 26px;
               line-height: 39px;
            letter-spacing: 1px;
            color: #797778;
            text-align: left;
            margin-bottom: 29px;
           }  */
       }
       .bigimgDg{
               margin: auto;
           /* height: 300px; */
           width: 469px;
           margin-top: 88px;
           margin-bottom: 96px;
       }
       .win{
           margin-bottom: 45px;
       }
       .kill{
           margin-bottom: 0;
       }
       .kill2{
             margin-bottom: 96px;
       }
       .second{
         /* width:259px; */
          height: 330px;
       }
       .three{
             width: 140px;
              height: 300px;
       }
    }
    .kill3{
        padding-left: 20px;
        padding-right: 20px;
         .content-tip{
            position: relative;
            .close{
                width: 76px;
                height: 76px;
                /* background: red; */
                position: absolute;
                top: 108px;
                right: 0;
            }
            .jump{
                width: 400px;
	            height: 114px;
                /* background-color: #ff7495; */
                border-radius: 41.5px;
                position: absolute;
                bottom: 58px;
                right: 0;
                left:0;
                margin:auto;
            }
            .push{
                width: 412px;
                height: 114px;
                background-color: #ffdd68;
                border-radius: 57px;
                font-size: 51px;
                text-align: center;
                line-height: 114px;
                color: #f64060;
            }
            .push2{
                width: 412px;
                height: 114px;
                background-color: #ffdd68;
                border-radius: 57px;
                font-size: 40px;
                text-align: center;
                
                /* line-height: 114px; */
                color: #f64060;
                padding-top: 17px
            }
        }
    }
    .kill{
          padding-left: 20px;
        padding-right: 20px;
          
         .contentDg{
             position: relative;
           .contentDg-img{
              .content{
                  position: absolute;
                  top:0;
                  bottom:0;
               width: 100%;
               padding-top:80px;
               /* background-color: rgba(0,0,1,0.5); */
                      color: #fd5d83;
                      font-family: NotoSansHans-Medium;
            .content-head-tip{

                font-size: 48px;
                height: 65px;
            }
            .content-head-detail{
                font-size: 36px;
                margin-bottom: 20px;
            }
            .content-tip{
                font-size: 48px;
                height: 65px;
                margin-top: 40px;
                margin-bottom: 50px;
            }
            .dd{
                color: #ff9703;
                font-size: 36px;
            }
            .link{
                width: 529px;
                height: 106px;
                background-color: #ffdd68;
                border-radius: 53px;
                font-size: 36px;
                line-height: 106px;
                  display: inline-block;
                font-weight: normal;
                font-stretch: normal;
                color: #ff3156;
                right: 0;
                margin: auto;
                left: 0;
                position: absolute;
                bottom: 52px;
            }
            p{
                padding: 0 75px;
                text-align: left;
                	font-size: 24px;
                font-weight: normal;
                font-stretch: normal;
                line-height: 34px;
                letter-spacing: 0.6px;
                color: #fd5d83;
            }
            .bigimg{
               margin: auto;
         
                /* width: 480px; */
              margin-top: 0px;
                /* height: 180px; */
                margin-bottom: 5px;
            }
            /* .kill{
                margin-bottom: 30px;
                img{
                    width: 283px;
                    height: 180px;
                }
            } */
            .oo{
               width: 377px;
                    height: 240px;
            }
            .firstpt{
                margin-top: 0px;
                /* height: 180px; */
                margin-bottom: 5px;
            }
            .oo2{
                width: 255px;
                height: 230px;
            }
            .oo3{
                width: 100px;
                height: 231px;
            }
            .oo4{
                width: 475px;
                height: 283px;
            }
              }
               .close{
                width: 76px;
                height: 76px;
                /* background: red; */
                z-index: 55;
                position: absolute;
                top: 9px;
                right: 24px;
            }
           }
           
         }
       
    }
    
</style>