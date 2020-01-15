<template>
  <div>
    <div class="x-ground  " >
         <img :src="imgsrc" class='fixed' width="100%" alt="">
      <div class="maskAPP">

        <div class="img-send" >
           <div class="x-ground-header2">
            <img src="../assets/image/sub.png" width='100%'>
          </div>
          <div class="number">共有{{number}}人瓜分</div>
          <div class="bonur">

                         <img src="../assets/image/bonus.png" width='100%' class='send'>
              <div class="bonur-text" v-if="this.accept == 0">
                <div class="text" v-if="tips==1">恭喜集齐第一阶段所有签</div>
                <div class="text" v-if="tips==2">恭喜集齐第二阶段所有签</div>
                <div class="tickets-header-input">
                            <input type="text" id="inputMobile" class='inputMobile' @blur="scrollTop" v-model="phone" placeholder='请输入你的超级课程表账号（手机号）' >
                        </div>
                        <div class="text1" v-if="tips==1">第二阶段现已正式开始<br>
            奖金加码，同学们继续加油～</div>
                        <div class="red" @click='redGive'>
                <img src="../assets/image/btn_red.png" width='100%'>
              </div>
             </div>
              <div class="bonur-text" v-if="this.accept == 1">
                <div class="text2">    
                 <span>{{money}}</span>元
                </div>
                <div class="text3">    
                 <span>提交成功，请返回公众号领取您的红包。谢谢您的参与</span>
                </div>
             </div>

          </div>

         </div>
      </div>
    </div>
    <!-- <div class="x-ground" v-if="this.super == 2">
      <div class="x-ground-header2">
        <img src="../assets/images/headline.png">
      </div>
      <div class="x-ground-content2">
        <img src="../assets/images/wx.png">
        <div class="x-ground-content2-item">
          <img :src="this.url">
          <p>恭喜获得一个Meco蜜谷果汁茶的{{this.name}}</p>
          <img src="../assets/images/wxbtn.png" @click="goSuper">
        </div>
      </div>
    </div> -->
    <div class='maskAPP' v-if="mark">
         <div class="img">
             <img src="http://qiniu.myfriday.cn/Fu0DQWGQLk8n_ZBy34oSqHzrZ5b0" width='100%' alt="">
         </div>
         
     </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
     parentMessage:'收下好运签',
      identity: '',
      identity2: '',
      accept:0,
      giveurl:'http://qiniu.myfriday.cn/FvMLWKKucDc61ob3nzJEiIjl0rTD',
     imgsrc:'http://qiniu.myfriday.cn/FqAHycqDJ3dnin69THZTzgZlvEJM',
      mark: false,
         endTime:this.$store.state.endTime,//应为接口获取到的结束时间
        startTime:this.$store.state.startTime,//应为接口获取到的结束时间
      super: 2,
      cardId: 0,
      type: 2,
      id:1,
      url: "",
      number:0,
      phone:'',
      openId: 'oLfSMuJDZoISZSPPcSQFC_GIDn48',
      money: 888,
      name: '',
          tips:1,
      day: 0,
      netUrl:'http://192.168.20.122:9080/#/',
      netUrl2:'http://192.168.20.122:9080/',
      date: ''
    }
  },
 
  created () {
    let url = location.href
     if(url.indexOf('9080')==-1){
      this.netUrl='https://a.super.cn/nescafescan/#/red'
      this.netUrl2='https://a.super.cn/nescafescan/'
    }
    this.wx();

        if((new Date().getTime()>=this.startTime)&&(this.endTime>new Date().getTime())){
                this.tips=1
              }
              // 1575561600000 1576080000000
              if(this.endTime<=new Date().getTime()){
                this.tips=2
              }
   
  //  
    
    // if(this.$utils.isWXBrowser) {
      // if(!sessionStorage.getItem('openid')) {
      //   twoGetopenId();
      //   this.identity2 = sessionStorage.getItem('openid');
      // } 
    // }
          this.findStatus();
 
    var client =document.body.clientWidth/document.body.clientHeight
        if(client<0.6){
            this.imgsrc='http://qiniu.myfriday.cn/FqAHycqDJ3dnin69THZTzgZlvEJM'
        }
   
  },
  methods: {
   scrollTop() {
      document.documentElement.scrollTop = document.body.scrollTop = 0;
      let u = navigator.userAgent, app = navigator.appVersion;
      let isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1;
      if(isAndroid){
        setTimeout(function() {
         document.activeElement.scrollIntoViewIfNeeded();
         document.activeElement.scrollIntoView();
        }, 500);       
      }
    },
    wx() {
      if(this.$utils.isWXBrowser){
          let openid = sessionStorage.getItem('openid') || this.$utils.getUrlParam("openid") || '';
            // let openid = sunny.helper.cookies.get('openid2') || sunny.helper.getUrlParams().openid || '';
            var url = 'https://a.super.cn/nescafescan?yes=1'
            var code = '3a38dafe0717d2c400c258c78d300c5f'
    
            if (!openid) {
                let url1 = location.href
              if(url1.indexOf('9080')==-1){

                window.location.href = `https://wx.super.cn/oauth2/api/wx/oauth_redirect.action?uri=${url}&up=${encodeURIComponent('author=1')}&v=${code}&scope=1`;
              }
                // window.location.href = `http://wx.super.cn/oauth2/V3/wechat/oauth_redirect.action?prefix=${WX_PREFIX}&scope=0&uri=${encodeURIComponent(
                //     window.location.pathname + window.location.search
                // )}`;
                return;
            } else {
                // sunny.helper.cookies.set();
                // res();
                // sunny.helper.cookies.set("openid2", openid)
                sessionStorage.setItem('openid', openid)
              window.location.replace(`https://a.super.cn/nescafescan/#/red`)

          this.openId = openid
                }
       
        setTimeout(() => {
        }, 100);
      }
    },
     findStatus() {
      
      this.$API.findCount({id: this.tips}).then(res=>{
        if(res.data != 0) {
        
          this.number = res.data
        }
      })
    },
    redGive(){
       var data = {
          'identity': this.openId,
          'account': this.phone
        }
            if (/^1[\d]{10}$/.test(this.phone)) {

          
                if(this.tips==1){
                  
                
                this.$API.SmallRecordLog(data).then(res=>{
                    // console.log(666);
                    if (res.status == 1) {
                                  this.money = res.data/ 100
                      this.accept = 1

                    }
                })
                }
                if(this.tips==2){
                   this.$API.submit(data).then(res=>{
                    // console.log(666);
                    if (res.status == 1) {
                                  this.money = res.data/ 100
                      this.accept = 1

                    }
                })
                }
                 
            } else {

                 this.$super.toast.text("手机号码不正确")
            }
    },
    goSuper () {
      sessionStorage.setItem('x-day',0)
      
        
      if(!this.$utils.isWXBrowser) {
        var b=encodeURIComponent(this.netUrl+'?cardId='+ this.cardId +'&cardType='+ this.type +'&identity='+ this.identity+'')
        var b2='?cardId='+ this.cardId +'&cardType='+ this.type +'&identity='+ this.identity+''
           let Base64 = require("js-base64").Base64//还是require
        var b22=this.netUrl2+Base64.encode(b2)
                //还是那些操作
        var url_ios =  'super://redirectUrl?url=' + b;
        var url_ios_download =  'http://deeplink.super.cn/?action=redirectUrl?url=' + encodeURIComponent(this.netUrl+'?cardId='+ this.cardId +'&cardType='+ this.type +'&identity='+ this.identity);
        var url_android = 'xtuonefriday://webView/webView?action=redirectUrl&url=' + b22
        var url_android_download = 'https://a.app.qq.com/dom/micro/open.jsp?pkgname=com.xtuone.android.syllabus&android_schema=' + encodeURIComponent('xtuonefriday://webView/webView?action=redirectUrl&url='+this.netUrl+'?cardId='+ this.cardId +'&cardType='+ this.type +'&identity='+ this.identity +'');

        if (this.$utils.isIOS){
          var loadTime = new Date();
          location.href = url_ios;
          setTimeout(function(){
              var outTime = new Date()
              if(outTime - loadTime > 800){
                  location.href = 'http://www.super.cn/'
              }           
          },1000)
        }else if (this.$utils.isAndroid){
          var loadTime = new Date();
          
          location.href = url_android;
          if(url_android) {
            
          }else {
            location.href = "http://www.super.cn/"
            }
          setTimeout(function(){
            var outTime = new Date()
            if(outTime - loadTime > 800){
              // location.href = url_android_download;
            }
          },1000)
        }
      }else {
        console.log(55);
        this.mark = 1;
      }
    },
    markOff() {
      this.mark = 0;
    }
  }
}
</script>

<style scoped>
.fixed{
       position: fixed;
  top:0;
  left:0;
}
.maskAPP{
       position: fixed;
        z-index: 4004;
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
        background: rgba(0, 0, 0, 0.75);
}
  .x-ground {
    position: fixed;
    width: 100vw;
    height:  100vh;
    z-index:999;
     display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    background: #dbc393;
    background-size: contain;
    overflow-y: scroll;
  }
  .scan1{

  }
  .other{
      width: 330px;
    height: 600px;
              position: fixed;
     top: 25%;
        bottom: 0;
        right: 0;
        left: 0;
    margin:0 auto;

  }
  .text2{
      font-size: 40px;    
    font-weight: normal;
    font-stretch: normal;
    line-height: 48px;
    letter-spacing: 2px;
    color: #ff8258;
    span{
      font-size: 100px;
      padding-right:5px;
    }
    margin-top:40px;
    margin-bottom:50px;

    }
    .text3{
      font-size: 28px;
	font-weight: normal;
	font-stretch: normal;
  line-height: 40px;
    margin:0 auto;
  
  letter-spacing: 1px;
  width: 437px;
	color: #bd6200;
    }
 .img-send{
  margin-top:144px;
    .x-ground-header2{
    margin:0 auto;
width: 632px;
    }
    .number{
      width: 240px;
	height: 40px;
	background-color: #ffe000;
  border-radius: 20px;
    margin:0 auto;
    margin-top:10px;
    margin-bottom:30px;

    font-size: 22px;
	font-weight: normal;
  font-stretch: normal;
  text-align:center;
	line-height: 40px;
	letter-spacing: 1px;
	color: #221815;
    }
    .bonur{
    position: relative;
    width:92%;
    margin: 0 auto;

    .bonur-text{
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    margin: 0 auto;
      text-align:center;
      padding-top:70px;
      .text{
          font-size: 24px;
        font-weight: normal;
        font-stretch: normal;
        line-height: 40px;
        letter-spacing: 1px;
        color: #bd6200;
      }
      .text1{
        font-size: 24px;
      font-weight: normal;
      font-stretch: normal;
      line-height: 40px;
      letter-spacing: 1px;
      color: #bd6200;
        margin-top:39px;

      }
    }
      .tickets-header-input{
  margin:auto;
        text-align:center;
        margin-top:39px;
            }
                    .inputMobile{
    box-sizing: border-box;
         width: 450px;
	height: 80px;
         font-size: 28px;
	font-weight: normal;
	font-stretch: normal;
  padding: 26px 0;
   color: #bd6200;
	letter-spacing: 1px;
    outline:none;
    padding-left:20px;
    border-radius: 12px;
  border: solid 2px #ff8258;
  background-color:#fffff0;
              }
              .inputMobile::placeholder{
                            width:100%;
                            font-weight: normal;
                            font-stretch: normal;
                                    font-size: 24px;
                      font-weight: normal;
                      font-stretch: normal;
                      line-height: 40px;
                      letter-spacing: 1px;
                      color: #bd6200;
                      opacity: 0.6;
                            /* line-height: 36px; */
                            /* letter-spacing: 3px; */
                            
                        }
                        ::-webkit-input-placeholder{
                font-weight: normal;
                            font-stretch: normal;
                                    font-size: 24px;
                      font-weight: normal;
                      font-stretch: normal;
                      line-height: 40px;
                      letter-spacing: 1px;
                      color: #bd6200;
                      opacity: 0.6;
                        }
    }
    .red{
      width: 320px;
  height: 80px; 
    margin: 0 auto;
        margin-top:39px;
  
    }
 }
</style>