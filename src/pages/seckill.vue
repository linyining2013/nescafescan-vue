<template>
  <div class="seckill">
    <!-- <div class="head">
        珊珂品牌日
    </div> -->
    <div class="first">
        <!-- <div class="item-img-first">
            <img src="@/assets/images/first.png" alt srcset width="100%" />
          </div>
         <div class="item-content">一等奖</div>
         <div class="item-detail">价值1000元弹润之旅携程旅行券</div> -->
            <img src="@/assets/images/first2.png" alt srcset width="100%" />
    </div>
    <div class="second">
        <div class="first">
        <!-- <div class="item-img-first second">
            <img src="@/assets/images/second.png" alt srcset width="100%" />
          </div>
         <div class="item-content">二等奖</div>
         <div class="item-detail">价值345元</div>
         <div class="item-detail">珊珂丝润焕白4件套</div> -->
            <img src="@/assets/images/second3.png" alt srcset width="100%" />

         </div>
        <div class="first three-item">
            <img src="@/assets/images/three3.png" alt srcset width="100%" />
        <!-- <div class="item-img-first three">
            <img src="@/assets/images/three.png" alt srcset width="100%" />
          </div>
         <div class="item-content">三等奖</div>
         <div class="item-detail">珊珂绵润胶原洁面膏</div> -->
         </div>
    </div>
      <jump-ad :parentMessage="parentMessage" class="timeJump" @click.native="seckill"></jump-ad>
        <router-link class='rules2' to='/list'>进入弹润嘭嘭肌的世界</router-link>
      <modal-diago :isShow='isShow' :prizeType='prizeType' class="" :kill='isShow'  @on-hide='isShow=false'></modal-diago>
  </div>
</template>
<script>
import JumpAd from "@/components/JumpAd";
import ModalDiago from "@/components/ModalDiago";

export default {
  components: {
    JumpAd,
    ModalDiago
  },
  data() {
    return {
      parentMessage: "开抢",
      isShow:false,
      win:false,
      kill:true,
      prizeType:0
    };
  },
  created() {
     if(!this.$utils.isSuperBrowser){
         this.$router.push('./')
         return
    }
        localStorage.setItem('kill','kill')
  },
  methods: {
      seckill(){
          //     this.isShow= true
          //    this.win= true 
          // this.prizeType= 3
          // console.log(88);
        if(this.kill){
             this.kill= false
             setTimeout(() => {
               this.kill= true
             }, 1000);
          this.$API.kill().then(res=>{
            if(res.status==1){
                      this.isShow= true
             this.win= true
          this.prizeType=   res.data.prizeType
              }
              })
        }
      
        
          
      }
  }
};
</script>
<style lang="postcss" scoped>
.seckill{
           .rules2{
        width: 64px;
	/* height: 358px; */
	background-color: #ff7495;
    position: fixed;
    right:0;
    top:113px;
    padding:28px 0 39px;
    writing-mode: vertical-rl;
	border-radius: 10px 0px 0px 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 28px;
    letter-spacing: 3px;
    color: #fff;
    }
  background: #e2f1ff;
  padding: 0 58px 60px;
 height: 100%;
 text-align: center;
 .timeJump{
     width: 320px;
	height: 99px;
    line-height: 99px;
    font-size: 56px;
    margin-top: 60px;

 }
 /* .head {
    height: 41px;
    font-size: 44px;
    text-align: center;
    color: #e07b8b;
  } */
  .first{
      /* padding: 88px 0 72px; */
      height: 550px;
      /* background-color: #fff; */
      /* margin-top: 58px; */
      border-radius: 20px;
      /* text-align: center;
          color: #e07b8b;
      .item-img-first{
      margin: auto;
          width: 189px;
          height: 120px;
          margin-bottom: 29px;
      }
      .item-content{
          font-size: 36px;
          height: 45px;
          font-weight: 900;
      }
      .item-detail{
          font-size: 26px;
          height: 30px;
      } */
  }
  .second{
      display: flex;
      .first{
        height: 400px;
      border-radius: 18px;
      padding: 50px 0 38px;

          /* width: 48%; */
          /* .three{
              width: 76px;
              height: 170px;
          }
          .second{
              height: 170px;

          } */
      }
          .three-item{
              margin-left: 4%;
          }
  }
}
</style>