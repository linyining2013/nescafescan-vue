<template>
  <div class="x-share">
    <div class="x-share-header">
        <div class='headline'>
          <img src="../assets/image/headline.png" width='100%'>

        </div>
      <div class="x-share-card-line1">
        <img src="../assets/image/01.png" v-if="this.lemon>1" :class="_module" @click="share(1,'柠檬“真”')">
        <img  class='gray' src="../assets/image/01.png" v-else>
        <img src="../assets/image/02.png" v-if="this.apple>1" :class="_module2" @click="share(2,'乌龙“茶”')">
        <img  class='gray' src="../assets/image/02.png" v-else>
        <img src="../assets/image/03.png" v-if="this.lime>1" :class="_module3" @click="share(3,'青柠“真”')">
        <img class='gray' src="../assets/image/03.png" v-else>
      </div>
      <div class="x-share-card-line2">
        <img src="../assets/image/04.png" v-if="this.peach>1" :class="_module4" @click="share(4,'苹果“果”')">
        <img class='gray' src="../assets/image/04.png" v-else>
        <img src="../assets/image/05.png" v-if="this.grapefruit>1" :class="_module5" @click="share(5,'红柚“汁”')">
        <img class='gray' src="../assets/image/05.png" v-else>
      </div>
      <!-- <div class="x-share-btn">
        <img src="../assets/image/sharebtn.png" @click="sharebtn">
      </div>
      <div class="x-share-tip">
        <p>赠送后，你将直接送出该卡片</p>
      </div> -->
    </div>
    <!-- <div class="x-toast" v-if="this.showToast"><p>{{toastText}}</p></div> -->
    <!-- <toast v-model="showToast" type="text" width="3rem" :text="toastText" :time="800" is-show-mask position="middle"></toast> -->
  </div>
</template>

<script>
// import { ua, setConfig, setShare, post, get, twoGetopenId, getQueryString} from '@/assets/js/util'
// import { api } from '@/assets/js/api'
// import { ViewBox,Toast, XDialog, TransferDomDirective as TransferDom } from 'vux'
// import {mapMutations, mapGetters} from 'vuex'
// import { wxShare } from "@/assets/js/weixin"
import jsuper from "exports-loader?jsuper!@/../node_modules/SuperBrowserLibs/dist/jsuperV2.js";

export default {
  data() {
    return {
      identity: '',
      toastText: '',
      showToast: false,
      lemon: 0,
      apple: 0,
      lime: 0,
      peach: 0,
      grapefruit: 0,
      lemonId: '',
      appleId: '',
      limeId: '',
      peachId: '',
      grapefruitId: '',
      lemonborder: 0,
      appleborder: 0,
      limeborder: 0,
      peachborder: 0,
      grapefruitborder: 0,
      shareId: '',
      id: '',
      name: ''
    }
  },
  
    created() {
        this.findCard()
    },
  mounted() {

  },
  computed: {
    // ...mapGetters([
    //   'isRefresh'
    // ]),
    _module:{
      get: function () {
        if(this.lemonborder == 1) {
          return "addborder";
        }
      }
    },
    _module2:{
      get: function () {
        if(this.appleborder == 1) {
          return "addborder";
        }
      }
    },
    _module3:{
      get: function () {
        if(this.limeborder == 1) {
          return "addborder";
        }
      }
    },
    _module4:{
      get: function () {
        if(this.peachborder == 1) {
          return "addborder";
        }
      }
    },
    _module5:{
      get: function () {
        if(this.grapefruitborder == 1) {
          return "addborder";
        }
      }
    },
  },
  methods: {
   findCard(){
         this.$API.findCard().then(res=>{
            console.log(res);
            if(res.data){

              this.lemon = res.data[0].cardCount ||0
              this.lemonId = res.data[0].cardId
               this.apple = res.data[1].cardCount ||0
               this.appleId = res.data[1].cardId
                this.lime = res.data[2].cardCount ||0
               this.limeId = res.data[2].cardId
                 this.peach = res.data[3].cardCount ||0
               this.peachId = res.data[3].cardId
                 this.grapefruit = res.data[4].cardCount ||0
               this.grapefruitId= res.data[4].cardId
                
            }
            // this.num=res.data
        })
      },
    giveCard(id) {
      var data = {
        "cardType": id
      }
      var that = this;
          console.log(8);
       that.$API.give(data).then(res=>{
           if(res.status ==1) {
               if(this.$utils.isSuperBrowser){
           this.$utils.setShare({url:`cardId=${res.data.cardId}&cardType=${id}&identity=${res.data.personId}`,id:id})
           jsuper.showShareMenu();
          }
        //   setTimeout(() => {
        //     location.reload();
        //   }, 4000);
        }else {
          this.$super.toast.text(res.message)
        }
      })
    },
    showToastfunc (text) {
      this.toastText = text
      this.showToast = true
      setTimeout(() => {
        this.toastText = ''
        this.showToast = false
      }, 1200);
    },
    sharebtn () {
      if(this.id == 0) {
        this.$super.toast.text("请选择要分享的雀巢咖啡好运签");
      }else {
        // this.giveCard(this.id);
        // this.showToastfunc()
      }
    },
    share(id,name) {
      this.id = id;
      this.name = name
      if(id == 1) {
        this.lemonborder = 1
        this.appleborder = 0
        this.limeborder = 0
        this.peachborder = 0
        this.grapefruitborder = 0
        this.shareId = this.lemonId
      }else if(id == 2) {
        this.lemonborder = 0
        this.appleborder = 1
        this.limeborder = 0
        this.peachborder = 0
        this.grapefruitborder = 0
        this.shareId = this.appleId
      }else if(id == 3) {
        this.lemonborder = 0
        this.appleborder = 0
        this.limeborder = 1
        this.peachborder = 0
        this.grapefruitborder = 0
        this.shareId = this.limeId
      }else if(id == 4) {
        this.lemonborder = 0
        this.appleborder = 0
        this.limeborder = 0
        this.peachborder = 1
        this.grapefruitborder = 0
        this.shareId = this.peachId
      }else if(id == 5) {
        this.lemonborder = 0
        this.appleborder = 0
        this.limeborder = 0
        this.peachborder = 0
        this.grapefruitborder = 1
        this.shareId = this.grapefruitId
      }
      this.giveCard(id)
    },
    // async submitApi (url, data, cb) {
    //   const res = await post(url, data)
    //   cb(res)
    // },
   
  }
}
</script>

<style scoped>
  img {
    width: 100%;
    display: block;
     -webkit-box-sizing: border-box; 
     -moz-box-sizing: border-box;    
     box-sizing: border-box;
  }
 
  .x-share {
    position: relative;
    width: 100%;
    height: 100%;

    background: url("../assets/image/base.png") round;
    background-size: 100% 100%;
    font-family: "PingFangSC-Medium";
    font-size: 0.3rem;
    color: #8c341e;
    padding-top: 0.46rem;
    overflow-y: scroll;
  }
  .x-share-header {
    width: 100%;
    padding-top: 32px;
  }
  .x-share-header .headline img {
    width: 560px;
	height: 92px;
    margin:0 auto;
  }
 .gray { 
                        -webkit-filter: grayscale(100%);
                        -moz-filter: grayscale(100%);
                        -ms-filter: grayscale(100%);
                        -o-filter: grayscale(100%);
                        filter: grayscale(100%);
                        filter: gray;
                        opacity:0.2;
                    }
  .x-share-card-line1,.x-share-card-line2 {
    width: 100%;
    padding: 0 38px;
    margin-top: 0.5rem;
    overflow: hidden;
     display: flex;
    justify-content: center;
  }
  .x-share-card-line1{
    margin-top: 46px;
  }
  .x-share-card-line1 img{
    width: 198px;
    height: 288px;
    float: left;
    margin-left: 38px;
    
  }
  .x-share-card-line1 img:nth-child(1) {
    
    margin: 0;
    /* margin-left: 30px; */
  }
  .x-share-card-line1 img:nth-child(2) {
    
    float: left;
    margin: 0;
    margin-left: 38px;

  }
  .x-share-card-line2 img{
    width: 198px;
    height: 288px;
    float: left;
   
  }
  .x-share-card-line2 {
    
   
  }
  .x-share-card-line2 img:nth-child(1) {
   
    margin: 0;
  }
  .x-share-card-line2 img:nth-child(2) {
   
    margin: 0;
    margin-left: 38px;
  }
  .x-share-card-line2 img:nth-child(3) {
   
    margin: 0;
    margin-left: 38px;
  }
  .addborder {
    border-radius: 16px;
	  border: solid 8px #ffe000;
  }
  .x-share-btn {
    width: 100%;
    margin-top: 0.8rem;
    text-align: center;
  }
  .x-share-btn img {
    width: 4.2rem;
    height: 1rem;
    display: block;
  }
  .x-share-tip {
    width: 100%;
    text-align: center;
    font-size: 0.32rem;
    color: #3d8688;
    letter-spacing: 0.02rem;
    margin-top: 0.4rem;
  }
  .x-toast {
    position: fixed;
    z-index: 99999;
    width: 4rem;
    height: 2rem;
    /* background: url("../assets/images/mask.png") round; */
        background: rgba(145, 138, 122, .9);

    background-size: 100% 100%;
    font-size: 0.24rem;
    color: #ffffff;
    text-align: center;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
    display: flex;
    align-items:center;
    justify-content:center;
    padding: 0 0.5rem;
    border-radius: 0.1rem;
    opacity: 0.9;
    font-size: 0.3rem;
    line-height: 0.5rem;
    letter-spacing: 0.02rem;
  }
   .headline img{
 
  }
</style>
