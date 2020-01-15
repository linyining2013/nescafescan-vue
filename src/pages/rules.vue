<template>
  <div class="rules">
    <!-- <div class="head">珊珂寻找最美弹润嘭嘭肌</div> -->
    <!-- <div class="content">
      <div class="content-head">活动规则</div>
      <div class="item">
        <p>1、上传你认为最具能体现自己弹润嘭嘭肌的照片，即视为活动参与成功；</p>
        <p>2、9月12日（周四）为珊珂品牌日，当天17点准时开抢，上传照片成功的用户即可参与，珊珂海量礼品放送，还你弹润嘭嘭肌；</p>
        <p>3、用户可对已参与活动的最美嘭嘭肌照片进行点赞，最终点赞数量前五名用户均可获得由珊珂提供的拯救“干”尬症大礼包；</p>
        <p>4、实物奖品将在30日内以快递形式送达获奖用户的手中；</p>
        <p>5、活动时间为9月8日-12日</p>
      </div>
    </div>
    <div class="content">
      <div class="content-head">活动奖品</div>
      <div class="item">
        <p>1、上传照片点赞前5位用户均可获得拯救“干”尬症大礼包</p>
        <p>
          2、品牌日活动好礼免费抢礼品:
          <br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;1000元弹润之旅携程旅行券
          <br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;珊珂丝润焕白4件套
          <br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;珊珂绵润胶原洁面膏
          <br />
        </p>
        <div class="item-img">
          <div class="item-img-first">
            <img src="@/assets/images/first.png" alt srcset width="100%" />
          </div>
          <div class="item-img-second">
            <img src="@/assets/images/second.png" alt srcset width="100%" />
          </div>
          <div class="item-img-three">
            <img src="@/assets/images/three.png" alt srcset width="100%" />
          </div>
        </div>
      </div>
    </div> -->
    <div class="img">
            <img src="http://qiniu.myfriday.cn/article/2019/11/o_1dqud7jjq1holjas5h1bpo8tsh" alt="" srcset="" width="100%">
            <img src="http://qiniu.myfriday.cn/article/2019/11/o_1dqud9bkr1ghr18pn1od511fm16sbm" alt="" srcset="" width="100%">
    </div>
    <div class="img">
    </div>
     

  </div>
</template>
<script>

export default {
 
  data() {
    return {
      menuIndex: 1,
      parentMessage: "立即get同款弹润好礼",
      big: "padding:0 0.7rem;",
      back: "返回",
      backBig: "padding:0 2.4rem;"
    };
  },
  created() {
          document.body.style.overflow='auto';

     if(!this.$utils.isSuperBrowser){
        //  this.$router.push('./')
        //  return
    }},
  methods: {
      backto(){
         
      },
      jumpTo(){
        window.location.href='https://detail.tmall.com/item.htm?spm=a1z10.1-b-s.w5003-21968564465.14.fef236f13FhPDk&id=590428515064&rn=0e7f04f32297245ecca4da008e4735ad&abbucket=15&skuId=4040577752112'
      }
  }
};
</script>
<style lang="postcss" scoped>
.rules {

  background: #e2f1ff;
  /* height: 100%; */
  /* padding: 83px 58px; */
  /* padding-bottom: 60px; */
  width: 100vw;
    height:  100vh;
  position: relative;
    background-color: #f5c622;
  img{
    display:block;
  }
  margin: auto;
  .head {
    height: 41px;
    font-size: 44px;
    text-align: center;
    color: #e07b8b;
  }
  .footer {
      text-align: center;
    .timeJump {
      width: 320px;
    }
    .top{
        margin-top: 53px;
        margin-bottom: 36px;
    }
  }
  .content {
    background-color: #ffffff;
    border-radius: 20px;
    margin-top: 78px;
    &-head {
      width: 284px;
      line-height: 82px;
      text-align: center;
      background-color: #ff7495;
      font-size: 44px;
      color: #fff;
      margin: auto;
      /* margin-top: -5px; */
      position: relative;
      top: -10px;
    }
    .item {
      font-size: 30px;
      color: #e07b8b;
      padding: 58px 33px 0px;
      p {
        line-height: 50px;
        padding-bottom: 50px;
      }
      .item-img {
        display: flex;
        align-items: baseline;
        justify-content: center;
        padding-bottom: 57px;
        &-first {
          height: 108px;
          width: 173px;
          margin-right: 52px;
        }
        &-second {
          height: 124px;
          width: 153px;
          margin-right: 52px;
        }
        &-three {
          height: 161px;
          width: 70px;
        }
      }
    }
  }
}
</style>