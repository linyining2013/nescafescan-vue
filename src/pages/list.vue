<template>
  <div class="list" >
    <ul class="menu" style="clear:both">
      <li :class=" {active:menuIndex==1,menulist:true}" @click="menushow(1)">最新</li>
      <li :class=" {active:menuIndex==2,menulist:true}" @click="menushow(2)">最热</li>
    </ul>
    <div class="list-content" v-show="menuIndex==1"   ref="myScroll1" @scroll.passive="onScroll($event)"  @touchmove="onScroll($event)">
      <div class="content" v-for="(item,index) in newList" :key="index">
        <div class="content-img" @click="showBigPic(item,index)">
          <img :src="item.picUrl+'?imageView2/0/w/381/h/500'" class="img" alt width="100%" />
        </div>
        <div class="content-footer">
          <div class="left">
            <div class="left-avator">
              <img :src="item.avatar" alt width="100%" />
            </div>
            <div class="left-content">
              <div class="first">{{item.nickName}}</div>
              <div class="item">{{item.schoolName}}</div>
            </div>
          </div>
          <div class="right">
            <div class="right-img" @click="hundelLike(item,index)">
              <img src="@/assets/images/like.png" alt width="100%" v-if="item.isLike" />
              <img src="@/assets/images/nolike.png" alt width="100%" v-else />
            </div>
            <div class="right-content">{{item.likes}}</div>
          </div>
        </div>
      </div>
    </div>
    <div v-show="menuIndex==2" class="list-content"  ref="myScroll2" @scroll.passive="onScroll($event)"  @touchmove="onScroll($event)">
        <div class="content" v-for="(item,index) in hotList" :key="index">
        <div class="content-img" @click="showBigPic(item,index)">
          <img :src="item.picUrl+'?imageView2/1/h/433'" class="img" alt width="100%" />
        </div>
        <div class="content-footer">
          <div class="left">
            <div class="left-avator">
              <img :src="item.avatar" alt width="100%" />
            </div>
            <div class="left-content">
              <div class="first">{{item.nickName}}</div>
              <div class="item">{{item.schoolName}}</div>
            </div>
          </div>
           <div class="right">
            <div class="right-img" @click="hundelLike(item,index)">
              <img src="@/assets/images/like.png" alt width="100%" v-if="item.isLike" />
              <img src="@/assets/images/nolike.png" alt width="100%" v-else />
            </div>
            <div class="right-content">{{item.likes}}</div>
          </div>
        </div>
      </div>
    </div>
    <router-link class="rules" to="/rules">活动规则</router-link>
    <jump-ad
      :parentMessage="parentMessage"
      :stylebig="big"
      class="timeJump"
      @click.native="zh_uploadFile"
    ></jump-ad>
      <input type="file" ref="evfile" @change="zh_uploadFile_change" class="hide" />

    <!-- 遮罩 -->
    <div class="mask" v-show="isShow" @touchmove.prevent @mousewheel.prevent>
      <div class="head" v-if="showPre">
        <div class="left">
          <div class="left-avator">
            <img :src="item.avatar" alt width="100%" />
          </div>
          <div class="left-content">
            <div class="first">{{item.nickName}}</div>
            <div class="item">{{item.schoolName}}</div>
          </div>
        </div>
        <div class="right">
          <div class="right-img" @click="isShow=false">
            <img src="@/assets/images/close.png" alt width="100%" />
          </div>
        </div>
      </div>
      <div class="bigimg">
        <img :src="dataimg+'?imageView2/1/h/1000'" class="bmg" alt  width="100%" />
        <div class="right-img" @click="isShow=false" v-if="!showPre">
          <img src="@/assets/images/close.png" alt width="100%" />
        </div>
        <div class="bottom-img"  v-if="showPre">
          <div class="img" @click="hundelLike(item,index)">
           <img src="@/assets/images/likelook.png" alt width="100%" v-if="item.isLike" />
              <img src="@/assets/images/nolikelook.png" alt width="100%" v-else />
          </div>
          <div class="img-item active" v-if="item.isLike">{{item.likes}}</div>
          <div class="img-item " v-else >{{item.likes}}</div>
        </div>
        <div class="maskbig"></div>
      </div>
      <div class="foot" v-if="showPre">
        <jump-ad :parentMessage="pre" :stylebig="prebig" class="pre " :class="{activePre:activePre}" v-show="menuIndex==1" @click.native="showBigPic(newList[preIndex],preIndex,1)"></jump-ad>
        <jump-ad :parentMessage="next" :stylebig="prebig" v-show="menuIndex==1" @click.native="showBigPic(newList[nextIndex],nextIndex,1)" :class="{activePre:activeNext}"></jump-ad>

        <jump-ad :parentMessage="pre" :stylebig="prebig" class="pre"  :class="{activePre:activePre}" v-show="menuIndex==2" @click.native="showBigPic(hotList[preIndex],preIndex,1)"></jump-ad>
         <jump-ad :parentMessage="next" :stylebig="prebig"  :class="{activePre:activePre}" v-show="menuIndex==2" @click.native="showBigPic(hotList[nextIndex],nextIndex,1)"></jump-ad>
      </div>
      <div class="foot" v-else>
        <jump-ad :parentMessage="reChose" :stylebig="prebig" class="pre" @click.native="clearImg"></jump-ad>
        <jump-ad :parentMessage="upload" :stylebig="prebig" @click.native="uploadSubmit"></jump-ad>
      </div>
    </div>
    <!-- 广告 -->
     <modal-diago :isShow='mShow' class="modal-dg"  :kill2='mShow'  @on-hide='hideMd' ></modal-diago>
     <killJump></killJump>
    <div id="pageLoad" v-show="upimg" class="page-load loading loading-content">
      <div class="load">

            <img src="@/assets/loading.gif" alt="" />
            <p>正在上传中</p>
      </div>
        </div>
  </div>
</template>
<script>
import JumpAd from "@/components/JumpAd";
import ModalDiago from "@/components/ModalDiago";
import * as qiniu from "qiniu-js";


export default {
  components: {
    JumpAd,
    ModalDiago
  },
  inject:['reload'],
  data() {
    return {
      menuIndex: 1,
      parentMessage: "上传弹润嘭嘭肌美照",
      big: "padding:0 0.82rem;",
      isShow: false,
      next: "下一个",
      pre: "上一个",
      preIndex:0,
      nextIndex:1,
      reChose: "重新选择",
      upload: "确认上传",
      prebig: "padding:0 0.95rem;",
      showPre: true,
      token: "",
      item:{},
      dataimg: "",
      complate:false,
      damaion: "http://qiniu.myfriday.cn/",
      newList:[],
      hotList:[],
      newPage:1,
      hotPage:1,
      mShow:false,
      showText:false,
      clientHeight:0,
      timeoutId:'',
      page:true,
      upimg:false,
      activePre:false,
      activeNext:false,
      index:0
    };
  },
  created() {
    // if(!this.$utils.isSuperBrowser){
    //      this.$router.push('./')
    //      return
    // }
    this.$API.getQiNiuInfo().then(data => {
      console.log(data);
    });
    this.$API.getQiNiuToken().then(res => {
      this.token = res.uptoken;
    });
    this.listImg()
  },
  mounted(){
    this.$nextTick(()=>{
//  this.clientHeight = document.documentElement.clientHeight
      // window.addEventListener('scroll', this.onScroll())
    
  
    })
  },
  watch:{
    //  complate(val){
    //      if(val){
    //          setInterval(() => {
    //              this.$super.loading.hide();
    //          }, 1000);
    //                  this.isShow = true
    //                   this.complate=false
    //      }
    //  } 
  },
  methods: {
    //  P.imageLoader(LOADINGS).then((res) => {
    //             fn(res);
    //         });
    onScroll() {
      this.$nextTick(()=>{
        if(this.menuIndex==1){
        this.clientHeight =this.$refs.myScroll1.offsetHeight +this.$refs.myScroll1.offsetTop
        }else{
          this.clientHeight =this.$refs.myScroll2.offsetHeight+this.$refs.myScroll1.offsetTop
         

        }

      const _this = this
      const scrollTop = (document.documentElement.scrollTop || document.body.scrollTop)+window.innerHeight
    console.log(scrollTop);
    console.log(this.clientHeight);
      if ( scrollTop + 50 >= this.clientHeight) {
        if(this.page){
          this.page =false
          if(this.menuIndex==1){
              this.newPage++
              this.listImg()
            }else{
                    this.hotPage++
                    this.hotListImg()
          }
          setTimeout(() => {
            this.page= true
          }, 1000);
        }
      }
      })
    },
    menushow(index) {

      this.menuIndex = index;
      if(index==1){
         if(this.newList.length>0  ){

        return}
      
          this.listImg()
      }else{
        if(this.hotList.length>0  ){

        return
      }
          this.hotListImg()
      }
    },
    listImg(){
        this.$API.getList({page:this.newPage}).then(res=>{
            // console.log(res);
            this.newList.push(...res.data)
        })
    },
    hotListImg(page){
        this.$API.getListOrderByLike
        ({page:this.hotPage}).then(res=>{
            // console.log(res);
            this.hotList.push(...res.data)
        })
    },
    showBigPic(item,index,a) {
      // var arr = []
      // arr.push(item.picUrl)
      // console.log(item.picUrl);
       this.dataimg = item.picUrl
     this.ImageLoader([item.picUrl]).then(()=>{

       // console.log(a);
         this.index = index
         this.item = item
       this.showPre=true
       this.isShow = true;
     });
        if(index<=0  ){
            this.nextIndex=1
          this.activePre=true
          return
        }
          this.activePre=false

        // if(index <0 && a==1){
        //         this.preIndex=-1
        //         this.nextIndex=1
        //         this.activePre=true
        //         this.$super.toast.text('已经是第一个了')
        //         return
        //     }
      index>0?    this.preIndex = index-1:''
        if(this.menuIndex==1){
          
          if (index==this.newList.length-1){
            this.activeNext=true
            }else{

              this.activeNext=false
            }
          index<this.newList.length-1?this.nextIndex = index+1:''
        } else{
                if (index==this.hotList.length-1){
                this.activeNext=true
                }else{

                  this.activeNext=false
                }
              index<this.hotList.length-1?this.nextIndex = index+1:''
        }   
        
      
    },
    ImageLoader(images) {
    let ps = [];
    images.forEach(e=>{  
      ps.push(new Promise((res, rej) => {
            let image = new Image();
            image.onload = () => {
                res(image);
                image = null;
            }
            image.onerror = () => {
                res(image);
                image = null;
            }

            let src = '';
            if (e.indexOf('http://') > -1) {
                src = e;
            } else {
                src = require.toUrl('images/' + e);
                src = src.slice(0, src.indexOf('?'));
            }
    console.log(src);
            image.src = src;
        }))
    });
    // sunny.helper.each(images, (e) => {
       
    // });
    return Promise.all(ps);
},
    uploadSubmit(){
        this.$API.submit({picUrl:this.dataimg}).then(res=>{
            if(res.data.id){
                this.$super.toast.text('上传成功')
                // location.reload()
              this.isShow = false;
              this.mShow = true

            }
        })

    },
    hideMd(){
      this.mShow=false
      location.reload()
    },
    clearImg() {
      this.isShow = false;
      this.dataimg = ''
      this.$refs.evfile.click();
    },
    hundelLike(item,index){
    //     item.likes++
    //    item.isLike=true
    var index = index || this.index
    console.log(index);
         
        this.$API.like({showId:item.id}).then(res=>{
          if(res.status==1){
             if(this.menuIndex==1){
            this.newList[index].likes=this.newList[index].likes+1
            this.newList[index].isLike=1
          }else{
            this.hotList[index].likes=this.hotList[index].likes+1
            this.hotList[index].isLike=1
          }
          }
        })
    },
    zh_uploadFile() {
     //   this.isShow = true;
      this.showPre = false;
      this.$refs.evfile.click();
    },
    //选择文件后触发的事件
    zh_uploadFile_change(evfile) {
      //后端获取token
      this.dataimg=''
      var uptoken = this.token;
      var file = evfile.target.files[0]; //Blob 对象，上传的文件
      var key = file.name; // 上传后文件资源名以设置的 key 为主，如果 key 为 null 或者 undefined，则文件资源名会以 hash 值作为资源名。
        let config = {
          useCdnDomain: true, //表示是否使用 cdn 加速域名，为布尔值，true 表示使用，默认为 false。
          region: qiniu.region.z0 // 根据具体提示修改上传地区,当为 null 或 undefined 时，自动分析上传域名区域
        };

        let putExtra = {
          fname: "", //文件原文件名
          params: {}, //用来放置自定义变量
          mimeType: null //用来限制上传文件类型，为 null 时表示不对文件类型限制；限制类型放到数组里： ["image/png", "image/jpeg", "image/gif"]
        };
        // var requestUrl = qiniu.createMkFileUrl(
        // uploadUrl,
        // file.size,
        // key,
        // putExtra
        // );
        var observable = qiniu.upload(file, key, uptoken, putExtra, config);
        this.$refs.evfile.value = null;
        var that = this
        observable.subscribe({
          next: result => {
            this.upimg=true
            
          },
          error: errResult => {
            // 失败报错信息
            // console.log(errResult);
          },
          complete: result => {
            // 接收成功后返回的信息
            
            // that.$super.loading.hide();
            let imgurl = this.damaion + result.key;
          this.dataimg = imgurl
        this.ImageLoader([imgurl]).then(()=>{
            this.upimg=false
          this.isShow = true
        })
          }
      });
   
    }
  }
};
</script>
<style lang="postcss" >
.activePre{
  color: #000!important;
  background: #ccc!important;
}
</style>
<style lang="postcss" scoped>
.hide {
  display: none;
}
.loading {
    z-index: 9999;
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    margin: auto;
    /* display: none; */
    color: #fff;
    background: rgba(0,0,0,0.6);
    text-align: center;
    .load{
      /* background-color: #fff; */
      width: ;
    }
    img {
        width: 30%;
        margin-top: 30%;
    }
}
.list {
  background: #e2f1ff;
  height: 100%;
  padding: 16px 0;
  position: relative;
  .mask {
    position: fixed;
    z-index: 4002;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    padding: 46px;
    background: rgba(0, 0, 0, 0.6);
    .head {
      display: flex;
      justify-content: space-between;
      /* align-items: baseline; */
      color: #fff;
      .left {
        display: flex;

        &-avator {
          width: 102px;
          height: 102px;
          flex-shrink: 0;
          margin-right: 26px;
          img {
            border-radius: 50%;
          }
        }
        &-content {
          font-size: 36px;
          /* height: 100px; */
          .first {
            height: 56px;
          }
          .item{
            font-weight: 26px;
            word-break:break-all;
        display:-webkit-box;
        -webkit-line-clamp:2;
        -webkit-box-orient:vertical;
        overflow:hidden;
          }
        }
      }
      .right {
        display: flex;
        &-img {
          width: 76px;
          height: 76px;
        }
      }
    }
    .bigimg {
      margin-bottom: 40px;
      margin-top: 15px;
      /* height:1000px; */
      height: 79%;
      /* overflow: hidden; */
      /* background-color: #000; */
      .bmg{
      height: 100%;
      overflow: hidden;
      /* height:1000px; */
      object-fit:cover ;
      overflow: hidden;
        -webkit-mask:-webkit-linear-gradient(rgba(0,0,0,1),rgba(0,0,0,1),rgba(0,0,0,1),rgba(0,0,0,.9));
      }
      display: flex;
      align-items: center;
      position: relative;
      .right-img {
        position: absolute;
        width: 76px;
        height: 76px;
        top: -27px;
        right: -27px;
      }
      .bottom-img{
           position: absolute;
        bottom: 12px;
        left: 383px;
        align-items:center;
        z-index: 99;
        .img{
             width: 83px;
        height: 67px;
        margin-right:20px;
        }
        display: flex;
        .img-item{
          	font-size:58px;
	          color: #fff;
        }
        .active{
          color: #ff7495;
        }
      }
      .maskbig{
         position: absolute;
          bottom: 0;
        left: 383px;
        /* width: 100%; */
        left: 0;
        right: 0;
        height: 70px;
        background-color: rgba(0,0,0,.7);
        -webkit-mask:-webkit-linear-gradient(rgba(0,0,0,.001),rgba(0,0,0,.001),rgba(0,0,0,.1),rgba(0,0,0,.1));

      }
    }
    .foot {
      /* margin: auto; */
      text-align: center;
      .pre {
        margin-right: 53px;
      }
    }
  }
  .timeJump {
    margin: 0 auto;
    /* margin-top: 120%; */
    position: fixed;
    left: 0;
    right: 0;
    width: 304px;
    bottom: 137px;
  }
  .rules {
    width: 64px;
    height: 190px;
    background-color: #ff7495;
    position: fixed;
    right: 0;
    top: 113px;
    writing-mode: vertical-rl;
    border-radius: 10px 0px 0px 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 30px;
    letter-spacing: 3px;
    color: #fff;
  }
  .menu {
    display: flex;
    position: fixed;
    top: 0;
    background-color: #e2f1ff;
    width: 100%;
    padding-top: 19px;
    &list {
      flex: 1;
      font-size: 30px;
      color: #ff7495;
      text-align: center;
      font-family: PingFangSC-Medium;
      padding: 20px 0 27px 0;
    }
    .active {
      background-image: url('http://qiniu.myfriday.cn/tab2.png');
      background-size: contain;
      background-position: center;
      background-repeat: no-repeat;
      color: #fff;
    }
  }
  .list-content {
    margin-top: 96px;
    display: flex;
    flex-wrap: wrap;
    background: #e2f1ff;
    padding: 0 31px;
    .content {
      width: 48%;
      margin-bottom: 18px;
      background: #fff;
      border-radius: 20px;
      overflow: hidden;
      .img {
         object-fit:cover ;
        height: 433px;
      }
    }
    .content:nth-child(2n) {
      margin-left: 4%;
    }
    .content-footer {
      display: flex;
      padding: 15px 11px 15px;
      justify-content: space-between;
      /* align-items: baseline; */

      .left {
        display: flex;
        width:200px;
        overflow: hidden;
        &-avator {
          width: 52px;
          height: 52px;
          flex-shrink: 0;
          margin-right: 8px;
          img {
            border-radius: 50%;
          }
        }
        &-content {
          font-size: 20px;
          height: 52px;
          flex-shrink: 0;
          color: #404040;
          .first {
            height: 30px;
          }
          .item{
            white-space: nowrap; 
        overflow: hidden;

          }
        }
      }
      .right {
        display: flex;
        align-items: flex-end;
        vertical-align: bottom;
        &-img {
          width: 38px;
          height: 32px;
        }
        &-content {
          color: #626262;
          font-size: 19px;
        }
      }
    }
  }
}
.modal-dg{
  margin: auto;
}
</style>