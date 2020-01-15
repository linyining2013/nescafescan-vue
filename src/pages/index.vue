<template>
 <div class="index" >
     <div class="x-index-loading" v-if="this.loading == 1">
      <div class="maskAPP"></div>
      <img src="@/assets/image/loading.gif">
    </div>
     <!-- <div class="time"> -->
         <!-- <div class="time-head">距离珊珂品牌日好礼开抢{{isEnd?'':'还有'}}</div>
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
         </div> -->
     <!-- </div> -->
      <div class="show maskAPP" v-if="this.show == 1">
          <div class="center">

      <div class="show-content">
        <div class="show-line">
          <img src="../assets/image/scanline.png">
        </div>
        <div class="show-content-img">
          <span></span>
          <img :src="this.url+'?imageView2/1/h/500'" width='100%'>
        </div>
        <div class="show-content-t">正在识别你的「雀巢咖啡」...</div>
      </div>
      <div class="show-fruit">
        <div class="fruit1 fruittransform">
          <img src="../assets/image/lemon.png" width='100%'>
        </div>
        <div class="fruit2 fruittransform">
          <img src="../assets/image/lime.png" width='100%'>
        </div>
        <div class="fruit3 fruittransform">
          <img src="../assets/image/peach.png" width='100%'>
        </div>
      </div>
          </div>
    </div>
        <div class="show2 maskAPP" v-if="this.show2 == 1">
            <div class="center">

        <div class="show-content2">
          <div class="show-line2">
            <img src="../assets/image/mask1.png" width='100%' class='img1' v-if="reward<3">
            <img src="../assets/image/success7.png" width='100%' class='img1' v-if="reward>=3">
            <img src="../assets/image/mask2.png" width='100%' class='img'>
          </div>
          <div class="show-content-img2">
            
            <img src="../assets/image/bonus.png" width='100%'>
              <div class="content-item"  v-if="reward==1">
                <div class="text">    
                  很遗憾，截止至12月6日23:59<br>
                  您未集齐第一阶段所有签<br>
                  无缘大奖
                </div>
                <div class="text-img">
                <img src="../assets/image/bonus2.png" width='100%'>

                </div>
                <div class="text">    
                第二阶段现已正式开始<br>
            奖金加码，同学们继续加油～
                </div>
              </div>
              <div class="content-item"  v-if="reward==4">
                <div class="text">    
                 很遗憾，截止至12月11日23:59<br>
                  您未集齐第二阶段所有签<br>
                  无缘大奖
                </div>
                <div class="text-img">
                <img src="../assets/image/bonus2.png" width='100%'>

                </div>
                <div class="text">    
                雀巢咖啡祝您<br>
            考试不跪，高能起飞～
                </div>
              </div>
              <div class="content-item"  v-if="reward==2">
                <div class="text2">    
                 <span>{{money}}</span>元
                </div>
                <div class="text text3">    
               恭喜集齐第一阶段所有签
                </div>
                <div class="text-img2" @click='jumpweixin'>    
                              <img src="../assets/image/btn_jump2.png" width='100%'>
                </div>

              </div>
              <div class="content-item"  v-if="reward==3">
                <div class="text2">    
                 <span>{{money}}</span>元
                </div>
                <div class="text text3">    
               恭喜集齐第二阶段所有签
                </div>
                 <div class="text-img2" @click='jumpweixin'>    
                              <img src="../assets/image/btn_jump2.png" width='100%'>
                </div>
              </div>
          </div>
            <div class="other-close2" @click='closeMs2'>
                <img src="@/assets/image/closed.png" width='100%' alt="">
            </div>
        </div>
       
      </div>
      </div>

      
          <div class="luckyshow maskAPP" v-if="this.luckyshow != 0">
      <div class="success-recognition" v-if="this.success != 0">
        <img v-if="this.success < 7&&this.gettype == 0" class='success' src="../assets/image/success13.png">
        <img v-if="this.success < 5&&this.gettype == 0" class='success1' src="../assets/image/success.png">
        <img v-if="this.success == 5&&this.gettype == 0" class='success1' src="../assets/image/success4.png">
        <img v-if="this.success ==6&&this.gettype == 0" class='success1' src="../assets/image/success2.png">
        <img v-if="this.success == 7&&this.gettype == 0" class='success' src="../assets/image/success8.png">
        <img v-if="this.success == 7&&this.gettype == 0" class='success1' src="../assets/image/success9.png">
        <img v-if="this.gettype != 0&&this.success <=5"  class='success' src="../assets/image/success10.png">
        <img v-if="this.gettype != 0&&this.success <5"  class='success1' src="../assets/image/success3.png">
        <img v-if="this.gettype != 0&&this.success == 5"  class='success1' src="../assets/image/success12.png">

        <img class='img' src="../assets/image/01.png" v-if="this.success == 1" >
        <img class='img' src="../assets/image/02.png" v-if="this.success == 2" >
        <img class='img' src="../assets/image/03.png" v-if="this.success == 3" >
        <img class='img' src="../assets/image/04.png" v-if="this.success == 4" >
        <img class='img' src="../assets/image/05.png" v-if="this.success == 5" >
         <div class="other" v-if="this.success == 6">
             <div class="other-logo">
                <img src="@/assets/image/logo.png" width='100%' alt="">
            </div>
             <div class="other-content">
                <img src="@/assets/image/group1.png" width='100%' alt="">
            </div>
             <div class="other-text">
                *我们将通过小纸条和短信联系您，请注意领取*
            </div>
             </div>   
         <div class="other" v-if="this.success == 7">
             <div class="other-logo">
                <img src="@/assets/image/logo.png" width='100%' alt="">
            </div>
             <div class="other-close" @click='closeMs'>
                <img src="@/assets/image/closed.png" width='100%' alt="">
            </div>
             <div class="other-content">
                <img src="@/assets/image/group.png" width='100%' alt="">
            </div>
             <div class="other-text">
                *今天剩余{{time}}次扫描机会*
            </div>
             </div>   
               <jump-ad v-if="success == 6" class='scan1' :stylebig='stylebig' :parentMessage='parentMessage2'  @click.native="getcard(6)"  ></jump-ad>
               <jump-ad v-if="success == 7" class='scan1 scan3'  :num='time'    @click.native="getcard(7)"  ></jump-ad>
               <jump-ad v-if='success <5&&this.gettype == 0' class='scan1' :parentMessage='parentMessage'  @click.native="getcard(5)"  ></jump-ad>
               <jump-ad v-if='success ==5&&this.gettype == 0' class='scan1' :parentMessage='parentMessage3'  @click.native="getcard(5)"  ></jump-ad>
               <jump-ad v-if="this.gettype != 0&&success <5" class='scan1' :parentMessage='parentMessage'  @click.native="cardgetCard"  ></jump-ad>
               <jump-ad v-if="this.gettype != 0&&success ==5" class='scan1' :parentMessage='parentMessage3'  @click.native="cardgetCard"  ></jump-ad>
               <form enctype="multipart/form-data"  v-if="success == 7&&time>0">
                <input type="file" id='image' @change="fileChange(1)" accept="image/*" >
              </form>
      </div>
      </div>

     <div class="img">
         <img class='fixed' :src="imgsrc" width="100%" alt="">
        <div class="index-end" @touchmove.prevent>
         <div class='pre'>
             
        <jump-ad class='scan'   :num2='time22' :num='time' :stylebig2="stylebig2"></jump-ad>
         <form enctype="multipart/form-data" v-if="time>0">
                <input type="file" id='image' @change="fileChange(1)" accept="image/*" >
              </form>
             </div>   
        <div class="img-send" @click='sharecard'>
             <img src="@/assets/image/btn_send.png" width='100%' alt="">
           
         </div>
             <div class="tips-send tips-send2" :class="tips==1?'tops':''" v-if="tips2==2" @click='getState'>
             <img src="@/assets/image/open.png" width='100%' alt="">
             </div>
             <div class="tips-send tips-send2" :class="tips==1?'tops':''" v-if="tips2==3" @click='Small'>
             <img src="@/assets/image/open2.png" width='100%' alt="">
             </div>
           <div class="tips-send" v-if="tips==1" >
             <img src="@/assets/image/first.png" width='100%' alt="">
             </div>
        <div class="img-rule" @click='jumpTO'>
             <img src="@/assets/image/btn_rule.png" width='100%' alt="">
         </div>
        <div class="img-rule2" >
             <img src="@/assets/image/btnimg.png" width='100%' alt="">
         </div>
        <div class="img-subtitle" v-if='complete==1'>
            雀巢咖啡集签活动开启
         </div>
        <div class="img-subtitle img-subtitle2" v-if='complete==2' >
            恭喜您集齐第一阶段所有签
         </div>
        <div class="img-subtitle img-subtitle2"  v-if='complete==3' >
            恭喜您集齐第二阶段所有签
         </div>
   

         <div class="x-index-footer">
            <div class="x-index-footer-item">
                <img class='gray'  src="../assets/image/01.png"  width='100%' v-if="this.lemon == 0">
                <img src="../assets/image/01.png"  width='100%' v-else>
                <!-- <img src="../assets/image/numberbg2.png"  width='100%' v-if="this.lemon > 0"> -->
                <span v-if="this.lemon > 0">X{{this.lemon}}</span>
            </div>
            <div class="x-index-footer-item">
                <img class='gray'  src="../assets/image/02.png"  width='100%' v-if="this.apple == 0">
                <img src="../assets/image/02.png"  width='100%' v-else>
                <!-- <img src="../assets/image/numberbg2.png"  width='100%' v-if="this.apple > 0"> -->
                <span v-if="this.apple > 0">X{{this.apple}}</span>
            </div>
            <div class="x-index-footer-item">
                <img class='gray' src="../assets/image/03.png"  width='100%' v-if="this.lime == 0">
                <img src="../assets/image/03.png"  width='100%' v-else>
                <!-- <img src="../assets/image/numberbg2.png"  width='100%' v-if="this.lime > 0"> -->
                <span v-if="this.lime > 0">X{{this.lime}}</span>
            </div>
            <div class="x-index-footer-item">
                <img class='gray' src="../assets/image/04.png"  width='100%' v-if="this.peach == 0">
                <img src="../assets/image/04.png"  width='100%' v-else>
                <!-- <img src="../assets/image/numberbg2.png"  width='100%' v-if="this.peach > 0"> -->
                <span v-if="this.peach > 0">X{{this.peach}}</span>
            </div>
            <div class="x-index-footer-item">
                <img class='gray' src="../assets/image/05.png"  width='100%' v-if="this.grapefruit == 0">
                <img src="../assets/image/05.png"  width='100%' v-else>
                <!-- <img src="../assets/image/numberbg2.png"  width='100%' v-if="this.grapefruit > 0"> -->
                <span v-if="this.grapefruit > 0">X{{this.grapefruit}}</span>
            </div>
            </div>
        </div>
     </div>
    
     <!-- <jump-ad :parentMessage="parentMessage" :stylebig="big" v-if="super2"  class='timeJump' @click.native="jumpTime"></jump-ad> -->
     <!-- <router-link to='/list' class="link link2"  v-if="super2" >进入弹润嘭嘭肌的世界</router-link>
      <a class="link" v-else  @click='jumpApp'>
                       前往超级课程表<br>进入水嫩素颜世界
                    </a> -->
     <!-- <killJump></killJump> -->
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
import JumpAd from "@/components/JumpAd"

import * as qiniu from "qiniu-js";
 
export default {
  components:{
      JumpAd,
  },
  data() {
    return {
     parentMessage:'收下考试签',
     parentMessage3:'收下高能起飞签',
     parentMessage2:'收下我的雀巢咖啡',
     big:'padding:0 0.7rem;',
     stylebig:'width: 5.3rem;',
     stylebig2:"display:block",
     imgsrc:'http://qiniu.myfriday.cn/Fup7YGQKGHzrf7UOcKXN_Dr1nYFD',
     isEnd:false,//倒计时是否结束
     time:5,
     time22:5,
        endTime:this.$store.state.endTime,//应为接口获取到的结束时间
        startTime:this.$store.state.startTime,//应为接口获取到的结束时间
      // time:{ d:'00', h:'0', h2:'0', m:'0', m2:'0', s:'0', s2:'0' }  ,
      lemon: 0,
    apple: 0,
    tips2:1,
    lime: 0,
    peach: 0,
    tips:0,
    money:0,
    grapefruit: 0,
    lemonId: '',
    appleId: '',
    limeId: '',
    peachId: '',
    grapefruitId: '',
    complete:1,
    share: 0,
    show: 0,
    show2: 0,
    reward:1,
    url: '',
    luckyshow:0,
    success: 0,
    mask: 0,
    loading: 0,
    super2:true,
    maskAPP:false,
     getcardId: 0,
    gettype: 0,
    getidentity: '',
    geturl: '',
    getname: '',
    personId: '',
    token:''
    };
  },
  created() {
    // var dd =   document.getElementsByClassName('index-end')[0]
    //     dd.addEventListener('touchmove', function (e) {
    //       e.preventDefault(); 
    //   });
      
        // document.body.style.overflow='hidden';
        var client =document.body.clientWidth/document.body.clientHeight
        if(client<0.6){
            this.imgsrc='http://qiniu.myfriday.cn/FvrcnU7z7iyDu68Dv09DTBUfRMnx'
        }
      

         this.$API.getQiNiuToken().then(data => {
      this.token=data.uptoken
     console.log(location.href);
     console.log(this.$route.query.cardId);
          if(this.$route.query.cardId||this.$utils.getUrlParam("cardId")) {
              this.getcardId = this.$route.query.cardId||this.$utils.getUrlParam("cardId")
              this.gettype = this.$route.query.type||this.$utils.getUrlParam("cardType")
              console.log(this.$utils.getUrlParam("cardType"));
              this.getidentity = this.$route.query.identity||this.$utils.getUrlParam("identity")
                this.getcardId = this.$route.query.cardId

              this.success = this.gettype
              this.luckyshow=1
            }
            this.findStatus();
      this.findCard(1);
      // this.findCount();
    });
    //   if(!this.$utils.isSuperBrowser){
    //             this.super2 =false
    //   }
    //   if(this.$utils.isWXBrowser){
    //             this.maskAPP = true
    //         }
    //   localStorage.removeItem('kill')
    //         this.setEndTime()
    
    //   this.initData()
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
          //  var inte= setInterval(() => {
      
          //       if ((new Date(this.endTime)).getTime() <=(new Date()).getTime()) {
          //           clearInterval(inte)
          //           this.isEnd=true
          //       } else {
          //           this.isEnd=false
          //       }
          //       // console.log(this.isEnd);
          //   }, 1000);
            
      },
      findStatus(){
         this.$API.findStatus().then(res=>{
            if(res.status==1){

              this.time=res.data
              if(this.time<=0){
                this.tips=1

              }
              this.comput()
            }
      // this.time=2

        })
      },
      comput(){
          if((new Date().getTime()>=this.startTime)&&(this.endTime>new Date().getTime())){
                this.tips2=2
              }
              // 1575561600000 1576080000000
              if(this.endTime<=new Date().getTime()){
                
                this.tips2=3
              }
      },
      getState(){
         this.$API.getState().then(res=>{
            if(res.status==1){
              if(res.data.personId){
                this.money=res.data.money/100
                this.reward=2
              }else{
                this.reward=1
              }
              this.show2=1
            }
        })
      },
      Small(){
         this.$API.Small().then(res=>{
            if(res.status==1){
              if(res.data.personId){
                this.money=res.data.money/100
                this.reward=3
              }else{
                this.reward=4
              }
              this.show2=1
              
            }
        })
      },
      findCard(a){
         this.$API.findCard().then(res=>{
            console.log(res);
            if(res.data){

              this.lemon = res.data[0].cardCount ||0
               this.apple = res.data[1].cardCount ||0
                this.lime = res.data[2].cardCount ||0
                 this.peach = res.data[3].cardCount ||0
                 this.grapefruit = res.data[4].cardCount ||0
                 if(this.lemon >= 1&&this.apple >= 1&& this.lime >= 1&& this.peach >= 1 ) {
                     if(this.endTime<=new Date().getTime()){
                      this.complete=1 
                    }else{

                      this.complete= 2
                    }
                 }
                 if(this.lemon >= 1&&this.apple >= 1&& this.lime >= 1&& this.peach >= 1 &&this.grapefruit>=1) {
                    this.complete= 3
                 }
                 if(!a){

                   this.luckyshow = 0
                 this.success = 0
                 }
            }
            // this.num=res.data
        })
      },
      async fileChange (id) {
        this.luckyshow = 0
        this.show = 0
        this.success = 0
        this.mask = 0
        this.loading = 1
        const prefix = 'http://qiniu.myfriday.cn/'
        let that = this
        if (id == 1) {
          var img = document.getElementById('image')
        }
        // console.log("token: "+ JSON.stringify(token))
        let config = {
          useCdnDomain: false, // 表示是否使用 cdn 加速域名，为布尔值，true 表示使用，默认为 false。
          region: null // 根据具体提示修改上传地区,当为 null 或 undefined 时，自动分析上传域名区域
        }
        let putExtra = {
          fname: '', // 文件原文件名
          params: {}, // 用来放置自定义变量
          mimeType: null // 用来限制上传文件类型，为 null 时表示不对文件类型限制；限制类型放到数组里： ["image/png", "image/jpeg", "image/gif"]
        }
        if(img.files[0]){

          var observable = qiniu.upload(img.files[0], null, this.token, putExtra, config)
          var observer = {
            next (res) {
            },
            error (err) {
              that.loading = 0
  
              console.log(err)
            },
            complete (res) {
              that.loading = 0
              let key = res.key
              let url = prefix + key
              that.url = url
              that.show = 1
              console.log(url)
              that.scanCard(url);
            }
          }
          var subscription = observable.subscribe(observer)
        }else{
              that.loading = 0
        }
    },
       scanCard(url) {
        var data = {
          "url": url
        }
        this.$API.scan(data).then(res=>{
          console.log(res.status);
          setTimeout(() => {
            if(res.status == 1) {
              this.time = this.time - 1
              if(this.time <= 0) {
                this.time = 0
                this.tips=1
              this.comput()

              }
              this.success = res.data.cardType
              switch (res.data.cardType) {
                case 1:
                  ++this.lemon 
                  break;
                case 2:
                  ++this.apple 
                  break;
                case 3:
                  ++this.lime
                  break;
                case 4:
                  ++this.peach 
                  break;
                case 5:
                  ++this.grapefruit 
                  break;
              }
              // console.log(res.data.cardType)
              this.show = 0
              this.luckyshow = 1
              this.mask = 1
            }else if(res.status == -2) {
              this.time = parseInt(this.time) - 1
              if(this.time <= 0) {
                this.time = 0
                this.tips=1
              this.comput()

                
              }
              this.show = 0
              this.luckyshow = -2
              this.mask = 1
              // this.success = -2
            }else if(res.status == -1) {
              if(res.message != ''|| res.message != null) {
                // this.$super.toast.text(res.message)
              }
              this.time = parseInt(this.time) - 1
              if(this.time <= 0) {
                this.time = 0
                this.tips=1
              this.comput()

              }
              this.success =7
            this.show = 0
              this.luckyshow = 1
              this.mask = 1
            }else if(res.status == 2) {
              this.success =6
            this.show = 0
              this.luckyshow = 1
              this.time = parseInt(this.time) - 1

        // this.$super.toast.text(res.message)
              // if(res.code == 1) {
              //   this.luckyshow = 2
              // }else if (res.code == 2) {
              //   this.luckyshow = 3
              // }else if (res.code == 3) {
              //   this.luckyshow = 4
              // }else if (res.code == 4) {
              //   this.luckyshow = 5
              // }
            }
          }, 1500);
        })
    },
    jumpweixin(){
      location.href='weixin://'
    },
     sharecard() {
       if(this.lemon > 1|| this.apple > 1|| this.lime > 1|| this.peach > 1 || this.grapefruit > 1) {
       this.tips=0
        this.$router.push({path: '/share'})
      }else {
        this.$super.toast.text('你还没有多余的签哦~')
      }
    },
    getcard(id){
      this.luckyshow=0
      this.success=0
    },
    closeMs(){
      this.luckyshow=0
      this.success=0
    },
    closeMs2(){
      this.show2=0
      
    },
     cardgetCard() {
      var data = {
        "cardId": this.getcardId,
        "cardType": this.gettype,
        "original": this.getidentity
      }
      this.$API.get(data).then(res=>{
        if(res.status != -1 && res.status != 404) {
              
            this.findCard()
        }else {
          this.gettype = 0
          this.luckyshow = 0
          this.show = 0
          this.success = 0
          this.mask = 0
          this.$super.toast.text(res.message)
        }
      })
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
        jumpTO(){
          console.log(66);
        this.$router.push({path: '/rule'})

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
        background: rgba(0, 0, 0, 0.75);
}
.maskAPP1{
        background: rgba(145, 138, 122, .9);
}
.hide {
  display: none;
}
    /* background: #e2f1ff; */
img{
    display:block;
}
.fixed{
       position: fixed;

}
.index{
    overflow: hidden;
    display: flex;
    flex-direction: column;
    /* background:url(http://qiniu.myfriday.cn/index.png) 0 0 no-repeat scroll transparent;
    background-size: cover; */
    /* http://qiniu.myfriday.cn/FmloykBC3rMWQRpWCYAIHBB6ZLGp  640 760 */
    /* http://qiniu.myfriday.cn/FvOLP06uagc6ecSxRsWJmpHnJur0 640 850 */
    /* http://qiniu.myfriday.cn/FnkpxeoyKYPuiIZr3OGOwWfhGT6G  小 */
    /* http://qiniu.myfriday.cn/FlwnkGapJU-CO01svkXh0SxhANOP 小 */
    /* http://qiniu.myfriday.cn/Fg0WRY3MDzAYNV5jBsQqq4MvzVt8 大 */
    /* background-image: url('http://qiniu.myfriday.cn/FlwnkGapJU-CO01svkXh0SxhANOP ');   */
    /* background-image: url('../assets/index/13.png');   */
    /* background-image: url('http://qiniu.myfriday.cn/FpRUh9LyfdoMIFmEM8ktymmSI4rc');
   
    overflow: hidden; */
    /* background: #e2f1ff; */
    width: 100vw;
    height:  100vh;
    position: relative;
    .img{
        position: relative;

        flex-shrink: 0;
        width:100%;
          .index-end{
            width: 100%;
            height: 260px;
                position:fixed;
                bottom:0;
            background-image: linear-gradient(
                #ffd000, 
                #ffd000), 
            linear-gradient(
                #f7efdb, 
                #f7efdb);
                
            }
            .pre{
                position:absolute;
                top:-124px;
                left:0;
                right:0;
                margin:0 auto;
                .scan{
                margin:0 auto;
            position:absolute;
                left:0;
                right:0;
                top:-50px;
                }
            }
              #image {
                position: absolute;
                z-index: 9;
                     top:-50px;
                right:0;
                left: 0;
                margin:0 auto;
                width: 320px;
              height: 100px;
                opacity: 0;
            }
            .img-send{
                width: 120px;
            height: 120px;
            position:absolute;
                top:-175px;
                right:18px;
            }
                .tips-send{
             position:absolute;
                  width: 218px;
	              height: 100px;
                top:-330px;
                right:18px;
                }
                .tips-send2{
             position:absolute;
                  width: 120px;
	          height: 200px;
                top:-380px;
                right:28px;
                }
            .tops{
                top:-520px;
            }
            .img-rule{
             width: 120px;
            height: 120px;
                        position:absolute;
               top:-175px;
                left:30px;
            }
            .img-rule2{
           width: 540px;
	            height: 40px;
                        position:absolute;
               top:-55px;
               left:0;
               right:0;
               margin:0 auto;
            }
            
            .img-subtitle{
                width: 400px;
                height: 50px;
                line-height:50px;
                text-align:center;
                margin:0 auto;
                background-color: #ffec84;
                box-shadow: inset 0px -4px 10px 0px 
                    rgba(255, 204, 68, 0.1);
                border-radius: 0px 0px 24px 24px;
                margin-bottom:30px;
                color: #6b2916;
            }
            .img-subtitle2{
                width: 460px;
            }
            .x-index-footer {
                width: 100%;
                /* padding: 0.2rem 0.1rem; */
                 display: flex;
                .x-index-footer-item {
                    position: relative;
                    width: 110px;
                    height: 161px;
                  margin-left: 30px;
                }
                .x-index-footer-item:first-child {
                   
                  margin-left: 40px;
                }
                .x-index-footer-item span {
                        display: block;
                        position: absolute;
                        right: -20px;;
                        top:-15px;
                        width: 60px;
                        text-align:center;
                        height: 30px;
                        line-height: 30px;
                        background-color: #ff5a00;
                        
                        border-radius: 14px;
                        top: -0.14rem;
                        margin: 0 auto;
                        font-size: 22px;
	                    color: #ffffff;
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
            }
    }
 
/*  加载中*/
    .x-index-loading {
    position: fixed;
    width: 100%;
    height: 100%;
    z-index: 99999;
  }
  .x-index-loading img {
    position: absolute;
    z-index: 99999;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto auto;
    width: 15%;
  }
}
 .show2 {
    position: fixed;
    top: 0;
    left: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 99;
    width: 100%;
    height: 100%;
    /* background: url("../assets/images/mask.png") round; */
    background-size: 100% 100%;
    .show-content2{
      .img1{
        	width: 496px;
	height: 54px;
    margin: 0 auto;

      }
      .img{
        width: 274px;
	height: 39px;
    margin: 0 auto;
   margin-top: 23px;
    margin-bottom: 20px;
      }
      .show-content-img2{
        width: 600px;
    position: relative;

      }
      .content-item{
        position: absolute;
    left: 0;
    right: 0;
    margin: 0 auto;
    top: 0;
        width: 400px;
	height: 400px;
   margin-top: 80px;
  font-size: 24px;
	font-weight: normal;
	font-stretch: normal;
	line-height: 40px;
	letter-spacing: 1px;
  text-align:center;
	color: #bd6200;
  .text-img2{
    width: 420px;
	height: 136px;
  margin-top:50px;
  }
    /* background-color: red; */
    .text-img img{
    margin: 35px auto;
    height:2px;

    width: 340px;
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
    margin-bottom:40px;
    }
    
      }
    }
    .other-close2{
      width: 80px;
    	height: 80px;
    margin: 0 auto;

    }
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
<style scoped>
 .show {
    position: fixed;
    top: 0;
    left: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 99;
    width: 100%;
    height: 100%;
    /* background: url("../assets/images/mask.png") round; */
    background-size: 100% 100%;
  }
  .center{
      
  }
  .luckyshow {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 99;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
  }
  .show-content {
    position: relative;
    width: 580px;
	height: 650px;
    margin: 0 auto;
    background-color: #ffffff;
	border-radius: 12px;
    background-size: 100% 100%;
  }
  .show-content-img {
    position: absolute;
    top: 0.4rem;
    left: 0;
    right:0;
   width: 500px;
   margin:0 auto;
  height: 500px;
  
    overflow: hidden;
  }
  .show-content-img img {
    min-width:500px;
    height:500px;
         object-fit:cover ;

  }
  .show-line img:nth-child(1) {
    position: absolute;
    z-index: 99;
   position: absolute;
    top: 0.4rem;
    left: 0;
    right:0;
   width: 500px;
   margin:0 auto;
    animation:mymove 4s infinite;
    -webkit-animation:mymove 4s infinite; 
    animation-direction:alternate;
    -webkit-animation-direction:alternate; /* Safari 和 Chrome */
  }
  .show-line-img {
    position: absolute;
    top: 0.4rem;
    left: 0.4rem;
    width: 5rem;
    height:5rem;
    overflow: hidden;
  }
  .show-line-img img {
    width: 100%;
    min-height: 5rem;
  }
  @keyframes mymove { from {top: 0.5rem;} to {top: 500px;} }
  @-webkit-keyframes mymove { from {top: 0.4rem;} to {top: 500px;} }
  .fruittransform {
   animation:fruitmove 0.36s infinite;
    -webkit-animation:fruitmove 0.36s infinite;
    animation-direction:alternate;
    -webkit-animation-direction:alternate; 
  }
  @keyframes fruitmove { 0% { transform:rotate(-30deg); -ms-transform:rotate(-30deg); 	-moz-transform:rotate(-30deg); 	-webkit-transform:rotate(-30deg);  -o-transform:rotate(-30deg); 	 } 33% { transform:rotate(0deg); -ms-transform:rotate(0deg); 	-moz-transform:rotate(0deg); 	-webkit-transform:rotate(0deg);  -o-transform:rotate(0deg); 	 } 66% { transform:rotate(30deg); -ms-transform:rotate(30deg); 	-moz-transform:rotate(30deg); 	-webkit-transform:rotate(30deg);  -o-transform:rotate(30deg); 	 } 99% { transform:rotate(0deg); -ms-transform:rotate(0deg); 	-moz-transform:rotate(0deg); 	-webkit-transform:rotate(0deg);  -o-transform:rotate(0deg); 	 } }
  @-webkit-keyframes fruitmove  { 0% { transform:rotate(-30deg); -ms-transform:rotate(-30deg); 	-moz-transform:rotate(-30deg); 	-webkit-transform:rotate(-30deg);  -o-transform:rotate(-30deg); 	 } 30% { transform:rotate(0deg); -ms-transform:rotate(0deg); 	-moz-transform:rotate(0deg); 	-webkit-transform:rotate(0deg);  -o-transform:rotate(0deg); 	 } 60% { transform:rotate(30deg); -ms-transform:rotate(30deg); 	-moz-transform:rotate(30deg); 	-webkit-transform:rotate(30deg);  -o-transform:rotate(30deg); 	 } 90% { transform:rotate(0deg); -ms-transform:rotate(0deg); 	-moz-transform:rotate(0deg); 	-webkit-transform:rotate(0deg);  -o-transform:rotate(0deg); 	 } }
  .show-fruit {
    position: relative;
    width: 100%;
    height: 1rem;
    overflow: hidden;
    padding: 0 2.05rem;
    margin-top: 0.4rem;
  }
  .show-content-t{
    position: absolute;
     bottom: 40px;
    left: 0;
    right:0;
    text-align:center;
      font-size: 32px;
	font-weight: normal;
	font-stretch: normal;
	line-height: 48px;
	color: #6b2916;
  }
  .fruit1 {
    position: absolute;
    left: 1.89rem;
    width: 64px;
	height: 62px;
  }
  .fruit2 {
    position: absolute;
    left: 3.48rem;
    width: 64px;
	height: 62px;
  }
  .fruit3 {
    position: absolute;
    left: 5rem;
    width: 64px;
	height: 62px;
  }
   .success-recognition {
    position: relative;
  
    margin:0 auto;
   text-align:center;
  }
   .success-recognition .img{
   width: 330px;
    height: 480px;
    margin:0 auto;
  }
   .success-recognition .success{
   height: 53px;
    margin:0 auto;
    margin-bottom:23px;

  }
   .success-recognition .success1{
   height: 39px;
    margin:0 auto;
    margin-bottom:40px;

  }
   .success-recognition .other{
   width: 630px;
    height: 584px;
    padding:30px;
	background-image: linear-gradient(180deg, 
		#ffd000 0%, 
		#ffe104 100%);
	border-radius: 12px;
  }
  .scan1{
    margin-top:60px;

  }
  .other{
    position: relative;
    
  }
   .other .other-logo{
   width: 180px;
	height: 72px;
  }
   .other .other-close{
  width: 80px;
  height: 80px;
  position: absolute;
    right: -25px;
    top:-40px;
  }
   .other .other-text{
   font-size: 24px;
	font-weight: normal;
	font-stretch: normal;
	line-height: 40px;
	letter-spacing: 1px;
	color: #6b2916;
  }
   .other .other-content{
    margin-bottom:30px;
    margin-top:24px;
	
	border-radius: 12px;
  }
  #image {
                position: absolute;
                z-index: 9;
                bottom: 0;
                right:0;
                left: 0;
                margin:0 auto;
                width: 320px;
              height: 100px;
                opacity: 0;
            }
  
</style>