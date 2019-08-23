<template>
  <div id="buy-tip-modal" v-show="show" :class="`${type}-tip-moal`">
    <div @click="maskClickHandler" class="mask"></div>
    <!-- 训练营购买成功 -->
    <!-- 训练营微信购买成功 -->
    <div class="modal-wrap" v-show="type == 'instituteWXPay'">
      <header class="modal-header" :class="type">
        <p class="modal-header__title">你已经成功入学新媒体营销学院！</p><br/>
        <p>目前正处于开班准备期<br/>请按照指示操作<br/>不然将无法参与学习</p>
      </header>
      <section class="modal-detail-group">
        <img :src="require('@/assets/images/code.jpg')" width="250px" />
        <section class="modal-tip-box">请长按识别二维码关注公众号，点击底部按钮“第二大学”根据指示进行下一步操作</section>
      </section>
    </div>

    <div class="modal-wrap" v-show="type == 'institutePay'">
      <header class="modal-header" :class="type">
        <button class="close-btn" v-on:click="destory"></button>
        <p>新媒体营销学院正在开班准备期，请加入学习群，进行学习准备工作，学习群将会通知具体开班时间"</p>
      </header>
      <section class="modal-detail-group">
        <div class="detail-group-item input-group">
          <span class="input-group-addon group-item__name">你的学号:</span>
          <input class="group-item__input form-control" id="copy-type-1" type="text" readonly="readonly" :value="renderData && renderData.studentNo" />
          <span class="input-group-btn">
            <button class="group-item__btn" v-on:click="copy(1)">点此复制</button>
          </span>
        </div>
        <div class="detail-group-item input-group">
          <span class="input-group-addon group-item__name">QQ群号:</span>
          <input class="group-item__input form-control" id="copy-type-2" type="text" readonly="readonly" value="723842078" />
          <span class="input-group-btn">
            <a href="http://qm.qq.com/cgi-bin/qm/qr?k=XiQ3ApmQMKEkHFPoEG28OmyOF6pw0YZi" class="group-item__btn">点击进群</a>
          </span>
        </div>
        <div class="detail-group-item input-group">
          <span class="input-group-addon group-item__name">班主任微信:</span>
          <input class="group-item__input form-control" id="copy-type-3" type="text" readonly="readonly" value="wanghequn0415" />
          <span class="input-group-btn">
            <button class="group-item__btn" v-on:click="copy(3)">点此复制</button>
          </span>
        </div>
        <section class="modal-tip-box">必须备注：你的学号+姓名，才能够加入学习群</section>
      </section>
    </div>
    <!-- 表表购买成功 -->
    <div class="modal-wrap" v-show="type == 'superPay'">
      <header class="modal-header" :class="type">
        <!-- <div class="bg-box bg-right"></div> 
        <div class="bg-box bg-left"></div> -->
        <p class="icon"></p>
        <p class="txt">
          <span class="tip">恭喜你</span><br/>你已报名该课程</p>
      </header>
      <section class="modal-section">
        <button @click="$emit('on-close');" class="btn left-btn">进入课程学习</button>
        <button @click="showShare" class="btn right-btn download">分享课程</button>
      </section>
      <footer class="modal-footer">
        在我的界面里可找到所有已报名的课程
      </footer>
    </div>
    <!-- 站外购买成功 -->
    <div class="modal-wrap" v-show="type == 'otherPay'">
      <header class="modal-header" :class="type">
        <button class="close-btn" v-on:click="destory"></button>
        <div class="bg-box bg-right"></div>
        <div class="bg-box bg-left"></div>
        <p class="icon"></p>
        <div class="txt">
          <p class="tip">报名成功</p>
          <p class="">你已成功报名该课程，搜索关注公众号“超级课程表第二大学”，学习更方便哦~</p>
        </div>
      </header>
    </div>
    <!-- 支付结果询问 -->
    <div class="modal-wrap" v-show="type == 'practice'">
      <header class="modal-header">
        <div class="bg-box bg-right"></div>
        <div class="bg-box bg-left"></div>
        <p class="txt">
          <template v-if="!$utils.isSuperBrowser">需登陆超级课程表账号进行付费报名，本学院由超级课程表联合13家名企共同成立，包含线下参观、实训服务，非广州地区用户无法参加，是否继续报名？</template>
          <template v-else>本学院由超级课程表联合13家名企共同成立，包含线下参观、实训服务，非广州地区用户无法参加，是否继续报名？</template>
        </p>
      </header>
      <section class="modal-section">
        <!-- 支付结果询问 -->
        <button @click="$emit('on-close', 0);" class="btn left-btn cancel">取消</button>
        <button @click="$emit('on-close', 1);" class="btn right-btn pay">报名</button>
      </section>
    </div>
    <!-- 支付结果询问 -->
    <div class="modal-wrap" v-show="type == 'buyTip'">
      <header class="modal-header">
        <div class="bg-box bg-right"></div>
        <div class="bg-box bg-left"></div>
        <p class="txt">请确认是否完成了支付</p>
      </header>
      <section class="modal-section">
        <!-- 支付结果询问 -->
        <button @click="$emit('on-close', 0);" class="btn left-btn cancel">取消</button>
        <button @click="$emit('on-close', 1);" class="btn right-btn pay">已支付</button>
      </section>
    </div>
    <!-- 手机号码注册失败 -->
    <div class="modal-wrap" v-show="type == 'register'">
      <header class="modal-header" :class="type">
        <div class="bg-box bg-right"></div>
        <div class="bg-box bg-left"></div>
        <p class="icon"></p>
        <p class="txt">手机已被注册</p>
      </header>
      <section class="modal-section">
        <!-- 手机号码注册失败 -->
        <button @click="$emit('on-close');" class="btn left-btn login">去登陆</button>
        <button @click="reload" class="btn right-btn reload">换个手机号</button>
      </section>
    </div>
    <!-- 下载引导 -->
    <div class="modal-wrap" v-show="type == 'download'">
      <header class="modal-header">
        <!-- <button class="close-btn" v-on:click="destory"></button> -->
        <div class="bg-box bg-right"></div>
        <div class="bg-box bg-left"></div>
        <p class="txt" v-html="infos[infoType||'comment']"></p>
      </header>
      <section class="modal-section">
        <button @click="$emit('on-close', 0);" class="btn left-btn link">打开APP</button>
        <button @click="$emit('on-close', 1);" class="btn right-btn download">去下载</button>
      </section>
    </div>
    <!-- 普通弹窗提示 -->
    <div class="modal-wrap" v-show="type == 'normal'">
      <header class="modal-header" :class="type">
        <button class="close-btn" v-on:click="destory"></button>
        <div class="bg-box bg-right"></div>
        <div class="bg-box bg-left"></div>
        <p class="txt" v-html="infos[infoType]"></p>
      </header>
    </div>
  </div>
</template>

<script>
import jsuper from "exports-loader?jsuper!@/../node_modules/SuperBrowserLibs/dist/jsuperV2.js";
export default {
  name: "sui-buy",
  props: {
    type: {
      type: String,
      default: ""
    },
    infoType: {
      type: String,
      default: ""
    },
    name: {
      type: String,
      default: ""
    },
    renderData: {},
    isMaskClicker: true
  },
  data() {
    return {
      show: false,
      infos: {
        comment: "查看评论需要下载<br/>超级课程表APP哦~快去下载吧",
        isBuy:
          "您已购买过该课程<br/>搜索关注公众号“表表超级课堂”，学习更方便哦~",
        noSell: "sorry，本课程是课程套餐限定课程，不能单独购买查看",
        download: "请下载超级课程表应用",
        counpon: "下载超级课程表app领取优惠券",
        notBuy:
          "暂不支持站外购买，请下载超级课程表app或关注微信公众号“表表超级课堂”购买学习吧！",
        practice:
          "本期招生已经满额，关注公众号“第二研习社，下一期招生开始时将会及时通知你~"
      }
    };
  },
  methods: {
    copy(id) {
      let inputText = document.getElementById(`copy-type-${id}`);
      inputText.focus();
      inputText.setSelectionRange(0, inputText.value.length);
      document.execCommand("copy", true);

      this.$super.toast.text("复制成功了~");
    },
    /**
     * 点击遮罩
     */
    maskClickHandler() {
      this.isMaskClicker && this.hide();
    },
    // close() {
    //   //<!-- 手机号码注册失败 --> <!-- 支付结果询问 -->
    //   this.$emit("on-close");
    //   // this.destory();
    // },
    reload() {
      window.location.reload();
    },
    destory() {
      this.$emit("on-hide");
      this.hide();
    },
    hide() {
      this.show = false;
    },
    /**
     * 分享
     */
    showShare() {
      jsuper.showShareMenu();
    }
  }
};
</script>

<style lang="postcss" scoped>
@import "../styles/common.pcss";
#buy-tip-modal {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 4002;
  .mask {
    position: fixed;
    z-index: 4002;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    background: rgba(0, 0, 0, 0.2);
  }
  .modal-wrap {
    position: relative;
    z-index: 5003;
    width: 90%;
    margin: 20% auto 0;
    background: #fff url(../assets/images/modalBg.png) 0 bottom no-repeat;
    background-size: cover;
    border-radius: 25px;
    .modal-section {
      text-align: center;
      padding-bottom: 50px;
      .btn {
        min-width: 40%;
        height: 60px;
        border-radius: 30px;
        font-size: 26px;
        &.left-btn {
          margin-right: 20px;
          background-color: #416eae;
          border: 3px solid #416eae;
          color: #fff;
        }
        &.right-btn {
          background-color: #fff;
          border: 3px solid #416eae;
          color: #416eae;
        }
      }
    }
    .modal-header {
      position: relative;
      color: #404040;
      text-align: center;
      padding: 80px 0 60px;
      font-size: 36px;
      border-top-left-radius: 25px;
      border-top-right-radius: 25px;
      line-height: 1.5;
      overflow: hidden;
      .close-btn {
        position: absolute;
        right: 30px;
        top: 30px;
        width: 31px;
        height: 31px;
        z-index: 10;
        border: 0;
        background: transparent;
        &:after,
        &:before {
          position: absolute;
          content: "";
          top: 0;
          height: 30px;
          width: 4px;
          background: #999;
        }
        &:after {
          transform: rotate(45deg);
        }
        &:before {
          transform: rotate(-45deg);
        }
      }
      .icon {
        width: 75px;
        height: 75px;
        background: url(../assets/images/bingo.png) 0 0 no-repeat;
        background-size: 75px;
        margin: 0 auto 20px;
      }
      .txt {
        padding: 0 10px;
        position: relative;
        z-index: 5;
      }
      &.register {
        .icon {
          background: url(../assets/images/warning.png) 0 0 no-repeat;
          background-size: 88px;
          width: 88px;
          height: 88px;
        }
      }
      &.superPay,
      &.register {
        padding: 60px 0 30px;
        .txt {
          font-size: 27px;
          .tip {
            font-size: 34px;
          }
        }
      }
      &.normal {
        .txt {
          padding: 0 30px;
        }
      }
      &.otherPay {
        .txt {
          font-size: 28px;
          padding: 0 30px;
          .tip {
            font-size: 34px;
            margin-bottom: 10px;
          }
        }
      }
    }
  }
  .modal-footer {
    padding: 0 0 40px;
    color: #999;
    font-size: 26px;
    text-align: center;
  }

  &.institutePay-tip-moal,
  &.instituteWXPay-tip-moal {
    .modal-wrap {
      background: #fff;
      padding-bottom: 30px;
      line-height: 36px;
      .modal-header {
        background: url(../assets/images/invitation/invitation_success.png) 0 0
          no-repeat;
        background-size: 420px 237px;
        padding: 250px 100px 20px;
        font-size: 28px;
        line-height: 36px;
        color: #404040;
      }
      .modal-detail-group {
        width: 90%;
        margin: 0 auto;
        font-size: 26px;
        color: #404040;
        .detail-group-item {
          position: relative;
          input {
            border: 0;
            color: #404040;
          }
          .group-item__name {
            text-align: right;
            color: #949494;
          }
          .group-item__btn {
            display: inline-block;
            position: relative;
            border-radius: 24px;
            height: 48px;
            color: #ffffff;
            font-size: 26px;
            line-height: 50px;
            border: 0;
            background-color: #3f6cad;
            width: 190px;
            transition: background-color 0.3s;
            text-align: center;
            &:after {
              content: "";
              display: inline-block;
              width: 0;
              height: 0;
              margin-left: 20px;
              border-top: 8px solid transparent;
              border-bottom: 8px solid transparent;
              border-left: 11px solid #fff;
            }
          }
        }
      }
      .modal-tip-box {
        margin-top: 20px;
        text-align: center;
        font-size: 24px;
        color: #df7373;
      }
    }
  }
  &.instituteWXPay-tip-moal {
    .modal-wrap {
      .modal-header {
        padding: 250px 20px 20px;
        .modal-header__title {
          font-size: 34px;
          font-weight: bold;
          color: #404040;
          line-height: 56px;
        }
      }

      .modal-detail-group {
        text-align: center;
        img {
          width: 250px;
          height: 250px;
        }
      }
    }
  }
  .input-group {
    position: relative;
    display: table;
    border-collapse: separate;
    .input-group-addon {
      display: table-cell;
      width: 1%;
      white-space: nowrap;
      vertical-align: middle;
    }
    .form-control {
      position: relative;
      z-index: 2;
      float: left;
      width: 86%;
      margin-bottom: 0;
      display: table-cell;
      height: 64px;
      padding: 10px 16px;
      font-size: 26px;
      line-height: 64px;
      vertical-align: middle;
    }
    .input-group-btn {
      display: table-cell;
      width: 1%;
      white-space: nowrap;
      vertical-align: middle;
    }
  }
}
</style>
