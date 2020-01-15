<template>
  <div>
    <div class="x-ground " >
         <img :src="imgsrc" class='fixed' width="100%" alt="">
        <div class="img-send" >
             <img src="@/assets/image/product.png" width='100%' alt="">
         </div>
        <div class="x-ground-footer" v-if="this.super == 1">
        <img src="../assets/image/download.png" @click="goSuper(1)">
      </div>
      <div class="other" v-if="this.super == 2" >

        <img class='img' :src="'http://qiniu-test.super.cn/quechao/image/0'+type+'.png'" >
        <div class="img2">
         <img :src="giveurl" width='100%' alt="" @click="goSuper">
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
      giveurl:'http://qiniu.myfriday.cn/FvMLWKKucDc61ob3nzJEiIjl0rTD',
     imgsrc:'http://qiniu.myfriday.cn/Fi9JTeIY5-78TQSSIwr-PTvo1w2T',
      mark: false,
      super: 0,
      cardId: 0,
      type: 1,
      url: "",
      name: '',
      day: 0,
      netUrl:'http://192.168.20.122:9080/#/',
      netUrl2:'http://192.168.20.122:9080/?',
      date: ''
    }
  },
  created () {
    let url = location.href
     if(url.indexOf('9080')==-1){
      this.netUrl='https://a.super.cn/nescafescan/#/'
      this.netUrl2='https://a.super.cn/nescafescan/?'
    }
    if(this.$utils.isAndroid){

           let Base64 = require("js-base64").Base64//还是require
      if(url.indexOf('P2NhcmRJZD0')!=-1){
        if(url.indexOf('9080')!=-1){
          let url2=  url.split('9080/')[1].split('#/')
          location.href=this.netUrl+Base64.decode(url2)
        
        // console.log(Base64.decode(url2));
        }else{
        let url2=  url.split('nescafescan/')[1].split('#/')
          location.href=this.netUrl+Base64.decode(url2)

        }
      }
    }

    var bbb = this.$utils.getUrlParam("cardType") || this.$route.query.cardType||sessionStorage.getItem('x-type')
    if(bbb==5) {
     this.giveurl= 'http://qiniu.myfriday.cn/FpKy6fb1CzEqBK8umrZPgql3TMi6'
    }
  //  
    
    // if(this.$utils.isWXBrowser) {
      // if(!sessionStorage.getItem('openid')) {
      //   twoGetopenId();
      //   this.identity2 = sessionStorage.getItem('openid');
      // } 
    // }
    if(bbb){
      console.log(666);
            this.imgsrc='http://qiniu.myfriday.cn/Fi9JTeIY5-78TQSSIwr-PTvo1w2T'
          var client =document.body.clientWidth/document.body.clientHeight
        if(client<0.6){
           this.imgsrc='http://qiniu.myfriday.cn/FvXMC--r1wc4oHbt25xdF1TaPqZY'
        }  
    }else{
    var client =document.body.clientWidth/document.body.clientHeight
        if(client<0.6){
            this.imgsrc='http://qiniu.myfriday.cn/Fh0TF0sQFFpRWlUhfK9UP4LbVBhk'
        }
    }
    if(this.$utils.getUrlParam("yes") || this.$route.query.yes) {
      this.$router.replace("/red");
      }
    this.date = new Date();
    this.day = this.date.getDate();

    if(this.$utils.isWXBrowser) {
      if(this.$utils.getUrlParam("ground") || this.$route.query.ground) {
      if(sessionStorage.getItem('x-day')) {
        if(this.day == sessionStorage.getItem('x-day')) {
          this.cardId = sessionStorage.getItem('x-cardId');
          this.type = sessionStorage.getItem('x-type');
          this.identity = sessionStorage.getItem('x-identity');
          this.name = sessionStorage.getItem('x-name');
          // this.url = "https://a.super.cn/mecoscan1/static/images/0" + this.type + ".png";
          if(this.$utils.isSuperBrowser) {
            this.$router.push({path:'/index',query:{
              cardId: this.cardId,
              identity: this.identity,
              type: this.type,
            }})
          }else {
            this.super = 2;
          }
        }else {
          if(this.$utils.getUrlParam("cardType") || this.$route.query.cardType) {
               this.cardId = this.$utils.getUrlParam("cardId") || this.$route.query.cardId;
          this.type = this.$utils.getUrlParam("cardType") || this.$route.query.cardType;
          this.identity = this.$utils.getUrlParam("identity") || this.$route.query.identity;
            this.super = 2
          }else {
            // this.$router.replace("/index");
            if(!this.$utils.isSuperBrowser) {
              this.super = 1
            }else {
              this.$router.replace("/index");
            }
          }
        }
      }else {
        if(this.$utils.getUrlParam("cardType") || this.$route.query.cardType) {
             this.cardId = this.$utils.getUrlParam("cardId") || this.$route.query.cardId;
          this.type = this.$utils.getUrlParam("cardType") || this.$route.query.cardType;
          this.identity = this.$utils.getUrlParam("identity") || this.$route.query.identity;
            this.super = 2
        }else {
          // this.$router.replace("/index");
          if(!this.$utils.isSuperBrowser) {
            this.super = 1
          }else {
            this.$router.replace("/index");
          }
        }
      }
    }else {
      if(this.$utils.getUrlParam("cardId") || this.$route.query.cardId) {
        if(this.$utils.getUrlParam("cardType") || this.$route.query.cardType) {
          this.cardId = this.$utils.getUrlParam("cardId") || this.$route.query.cardId;
          this.type = this.$utils.getUrlParam("cardType") || this.$route.query.cardType;
          this.identity = this.$utils.getUrlParam("identity") || this.$route.query.identity;
          // this.url = "https://a.super.cn/mecoscan1/static/images/0" + this.type + ".png";
             sessionStorage.setItem('x-cardId',this.cardId)
          sessionStorage.setItem('x-type',this.type)
          sessionStorage.setItem('x-identity',this.identity)
          sessionStorage.setItem('x-name',this.name)
          sessionStorage.setItem('x-day',this.day)
          setTimeout(() => {
            window.location.href = `${this.netUrl}?ground=1&cardId=` + this.cardId +`&cardType=` + this.type + `&identity=` + this.identity
            // window.location.href = `https://a.super.cn/mecoscan1/#/?ground=1&cardId=` + this.cardId +`&cardType=` + this.type + `&identity=` + this.identity
            // this.$router.replace('/');
          }, 30);
        }else {
          if(!this.$utils.isSuperBrowser) {
            this.super = 1
          }else {
            this.$router.replace("/index");
          }
        }
      }else {
        if(!this.$utils.isSuperBrowser) {
          this.super = 1
        }else {
          this.$router.replace("/index");
        }
      }  
    }
    }else {
      if(this.$utils.getUrlParam("cardId") || this.$route.query.cardId) {
        if(this.$utils.getUrlParam("cardType") || this.$route.query.cardType) {
          this.cardId = this.$utils.getUrlParam("cardId") || this.$route.query.cardId;
          this.type = this.$utils.getUrlParam("cardType") || this.$route.query.cardType;
          this.identity = this.$utils.getUrlParam("identity") || this.$route.query.identity;
          // this.url = "https://a.super.cn/mecoscan1/static/images/0" + this.type + ".png";
          if(this.$utils.isSuperBrowser) {
            this.$router.push({path:'/index',query:{
              cardId: this.cardId,
              type: this.type,
              identity: this.identity
            }})
          }else {
            this.super = 2;
          }
        }else {
          if(!this.$utils.isSuperBrowser) {
            this.super = 1
          }else {
            this.$router.replace("/index");
          }
        }
      }else {
        if(!this.$utils.isSuperBrowser) {
          this.super = 1
        }else {
          this.$router.replace("/index");
        }
      }
    }
    
  },
  methods: {
 
  
    goSuper (down) {
      sessionStorage.setItem('x-day',0)
      
        
      if(!this.$utils.isWXBrowser) {
      if(down==1) {
        console.log(4);
        var b=encodeURIComponent(this.netUrl)
        
        var b22=this.netUrl2
      }else{
        var b=encodeURIComponent(this.netUrl+'?cardId='+ this.cardId +'&cardType='+ this.type +'&identity='+ this.identity+'')
        var b2='?cardId='+ this.cardId +'&cardType='+ this.type +'&identity='+ this.identity
           let Base64 = require("js-base64").Base64//还是require
        var b22=this.netUrl2+Base64.encode(b2)
        console.log(5);

      }
        
                
        var url_ios =  'xtuonesuperfriday://webView/webView?action=redirectUrl&url=' + b;
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
    background: url("../assets/image/ground.jpg")0 0 round;
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
    .x-ground .img{
   width: 330px;
    height: 480px;
            /* position: absolute; */
    margin:0 auto;
    margin-bottom:60px;
    margin-top:60px;
  }
  .x-ground-header {
    width: 100%;
    padding: 0 0.41rem;
    padding-top: 0.6rem;
  }
  .x-ground-header img {
    width: 6.67rem;
    height: 2.78rem;
  }
  .x-ground-header2 {
    position: relative;
    width: 100%;
    padding: 0 0.61rem;
    padding-top: 0.46rem;
  }
  .x-ground-header2 img {
    width: 6.3rem;
    height: 1.5rem;
  }
  .x-ground-content {
    width: 100%;
    padding: 0.45rem 0 0 0.47rem;
    text-align: center;
  }
  .x-ground-content img {
    width: 6.74rem;
    height: 4.82rem;
  }
  .x-ground-content p {
    font-size: 0.32rem;
    color: #3d8688;
    font-family: "PingFangSC-Regular";
    letter-spacing: 0.02rem;
  }
  .x-ground-content img:nth-child(3) {
    float: left;
    width: 2.14rem;
    height: 0.3rem;
    margin: 0.28rem 0 0.29rem 2.4rem;
  }
  .x-ground-content2 {
    width: 100%;
  }
  .x-ground-content2 img {
    margin-top: 0.14rem;
    margin-left: 0.45rem;
    width: 6.6rem;
    height: 9.96rem;
  }
  .img-send {
     position: absolute;
   left: 0;
   bottom:20px;
 width: 342px;
	height: 144px;
  }
  .x-ground-footer img {
    position: absolute;
   left: 0;
   right: 0;
   bottom:18%;
   margin: 0 auto;
    width: 420px;
	height: 136px;
  }
  .mark {
    position: fixed;
    width: 100%;
    height: 100%;
    z-index: 999;
    /* background: url("../assets/images/guide_img.png") round; */
    background-size: 100% 100%;
  }
  .x-ground-content2-item img {
    position: absolute;
    width: 1.98rem;
    height: 2.34rem;
    left: 2.76rem;
    top: 3.2rem;
    margin: 0;
    /* margin-bottom: 6.52rem; */
    /* margin-left: 2.26rem; */
  }
  .x-ground-content2-item img:nth-child(3) {
    position: absolute;
    width: 4.2rem;
    height: 1.15rem;
    left: 1.65rem;
    top: 7.1rem;
    margin: 0;
  }
  .x-ground-content2-item p {
    position: absolute;
    display: block;
    top: 0;
    text-align: center;
    font-size: 0.28rem;
    color: #bd6200;
    letter-spacing: 0.01rem;
    width: 3.99rem;
    margin-left: 1.74rem;
    top: 5.93rem;
  }
</style>