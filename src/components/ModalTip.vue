<template>
  <div id="buy-tip-modal" v-show="show">
    <div @click="maskClickHandler" class="mask"></div>

    <div class="modal-wrap">
      <button class="close-btn" v-on:click="destory" v-if="close"></button>
      <!-- 下载引导 -->
      <template v-if="type == 'download'">
        <header class="modal-header">
          <p v-html="content"></p>
        </header>
        <section class="modal-section">
          <button @click="$emit('on-close', 0);" class="btn left-btn link">打开APP</button>
          <button @click="$emit('on-close', 1);" class="btn right-btn download">去下载</button>
        </section>
      </template>
      <!-- 购买成功询问 -->
      <template v-if="type == 'buyTip'">
        <header class="modal-header">
          <p v-html="content"></p>
        </header>
        <section class="modal-section">
          <button @click="$emit('on-close', 0);" class="btn left-btn cancel">取消</button>
          <button @click="$emit('on-close', 1);" class="btn right-btn pay">已支付</button>
        </section>
      </template>
      <!-- 微信解绑询问 -->
      <template v-if="type == 'wxBind'">
        <header class="modal-header">
          <p v-html="content"></p>
        </header>
        <section class="modal-section">
          <button @click="$emit('on-close', 0);" class="btn left-btn cancel">取消绑定</button>
          <button @click="$emit('on-close', 1);" class="btn right-btn pay">继续绑定</button>
        </section>
      </template>
      <!-- 简历提示 -->
      <template v-if="type == 'resume'">
        <header class="modal-header">
          <div v-html="content"></div>
        </header>
        <section class="modal-section section-sm">
          <button @click="$emit('on-close', 1);" class="btn pay">去学习</button>
        </section>
      </template>
      <!-- 表表购买成功 -->
      <template v-if="type == 'superPay'">
        <header class="modal-header">
          <div v-html="content"></div>
        </header>
        <section class="modal-section">
          <button @click="$emit('on-close');" class="btn left-btn">进入课程学习</button>
          <button @click="showShare" class="btn right-btn download">分享课程</button>
        </section>
        <footer class="modal-footer">
          在我的界面里可找到所有已报名的课程
        </footer>
      </template>
      <!-- 其他购买成功 -->
      <template v-if="type == 'otherPay'">
        <header class="modal-header">
          <div v-html="content"></div>
        </header>
      </template>
      <!-- 训练营购买提醒 -->
      <template v-if="type == 'practiceBuyTip'">
        <header class="modal-header">
          <p v-html="content"></p>
        </header>
        <section class="modal-section">
          <button @click="$emit('on-close', 0);" class="btn left-btn cancel">取消</button>
          <button @click="$emit('on-close', 1);" class="btn right-btn pay">报名</button>
        </section>
      </template>
      <!-- 训练营微信购买成功 -->
      <template v-if="type == 'instituteWXPay'">
        <header class="modal-header">
          <div v-html="content"></div>
        </header>
        <section class="modal-detail-group" style="text-align: center;">
          <img :src="require('@/assets/images/code.jpg')" width="125px" />
        </section>
        <section class="modal-footer" style="color: #df7373">请长按识别二维码关注公众号，点击底部按钮“第二大学”根据指示进行下一步操作</section>
      </template>
      <!-- 训练营加群提醒 -->
      <template v-if="type == 'institutePay'">
        <header class="modal-header">
          <div v-html="content"></div>
        </header>
        <section class="modal-detail-group">
          <p style="text-align: left;font-size: 14px;">1、请先加入学习QQ群领取学习手册了解开班时间；(
            <small style="color: #df7373">必须备注“你的学号+姓名”才能加入学习QQ群。</small>)</p><br/>
          <div class="detail-group-item input-group">
            <span class="input-group-addon group-item__name">你的学号:</span>
            <input class="group-item__input form-control" id="copy-type-1" type="text" readonly="readonly" :value="renderData && renderData.studentNo" />
            <span class="input-group-btn">
              <a href="javascript:void(0)" class="group-item__btn btn-default-triangle" v-on:click="copy(1)">点此复制</a>
            </span>
          </div>
          <div class="detail-group-item input-group">
            <span class="input-group-addon group-item__name">QQ群号:</span>
            <input class="group-item__input form-control" id="copy-type-2" type="text" readonly="readonly" value="723842078" />
            <span class="input-group-btn">
              <a href="http://qm.qq.com/cgi-bin/qm/qr?k=XiQ3ApmQMKEkHFPoEG28OmyOF6pw0YZi" class="group-item__btn btn-default-triangle">点击进群</a>
            </span>
          </div>
          <br/>
          <p style="text-align: left;font-size: 14px;">2、填写入学报名表，完善个人信息，以便企业参访实践活动顺利进行。</p>
          <!-- <div class="detail-group-item input-group">
            <span class="input-group-addon group-item__name">班主任微信:</span>
            <input class="group-item__input form-control" id="copy-type-3" type="text" readonly="readonly" value="wanghequn0415" />
            <span class="input-group-btn">
              <button class="group-item__btn" v-on:click="copy(3)">点此复制</button>
            </span>
          </div> -->
        </section>
        <section class="modal-section">
          <!-- 手机号码注册失败 -->
          <button @click="$emit('on-close');" class="btn btn-primary-triangle login">填写入学报名表</button>
        </section>
      </template>
      <!-- 注册问题提醒 -->
      <template v-if="type == 'register'">
        <header class="modal-header" :class="type">
          <p v-html="content"></p>
        </header>
        <section class="modal-section">
          <!-- 手机号码注册失败 -->
          <button @click="$emit('on-close');" class="btn left-btn login">去登陆</button>
          <button @click="reload" class="btn right-btn reload">换个手机号</button>
        </section>
      </template>
      <!-- 普通提示 -->
      <template v-if="type == 'normal'">
        <header class="modal-header">
          <p v-html="content"></p>
        </header>
      </template>
      <div class="modal-bg"></div>
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
    close: {
      type: Boolean,
      default: false
    },
    content: {
      type: String,
      default: ""
    },
    isMaskClicker: true
  },
  data() {
    return {
      show: false,
      autoHide: false
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
%btn-default {
  background-color: #fff;
  border: 3px solid #416eae;
  color: #416eae;
}
%btn-primary {
  background-color: #416eae;
  border: 3px solid #416eae;
  color: #fff;
}
%btn-triangle {
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

#buy-tip-modal {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 4002;
  overflow: auto;
  padding-bottom: 40px;
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
    border-radius: 25px;
    background: #fff url(../assets/images/modal/bgT.png) 0 0 no-repeat;
    background-size: 143px 194px;
    /* padding-bottom: 30px; */
    line-height: 36px;
    .modal-bg {
      position: absolute;
      right: 0;
      bottom: 0;
      width: 227px;
      height: 172px;
      background: #fff url(../assets/images/modal/bgB.jpg) 100% 100% no-repeat;
      background-size: 227px 172px;
      border-bottom-right-radius: 30px;
      z-index: -1;
    }
    .modal-section {
      text-align: center;
      padding-bottom: 40px;
      .btn {
        min-width: 40%;
        height: 60px;
        border-radius: 30px;
        font-size: 26px;
        &.left-btn {
          margin-right: 20px;
          @extend %btn-primary;
        }
        &.right-btn {
          @extend %btn-default;
        }
      }

      &.section-sm {
        .btn {
          background-color: #416eae;
          border: 3px solid #416eae;
          color: #fff;
          @extend %btn-primary;
          @extend %btn-triangle;
        }
      }
    }
    .modal-header {
      padding: 60px 40px;
      font-size: 36px;
      line-height: 46px;
      color: #404040;
      text-align: center;
    }

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

    .btn-default {
      @extend %btn-default;
    }
    .btn-primary {
      @extend %btn-primary;
    }
    .btn-default-triangle {
      @extend %btn-default;
      @extend %btn-triangle;

      &:after {
        border-left: 11px solid #416eae;
      }
    }
    .btn-primary-triangle {
      @extend %btn-primary;
      @extend %btn-triangle;
    }
  }
  .modal-footer {
    padding: 0 0 40px;
    color: #999;
    font-size: 24px;
    text-align: center;
  }

  .modal-detail-group {
    width: 90%;
    margin: 0px auto 40px;
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
        font-size: 26px;
        line-height: 50px;
        width: 190px;
        transition: background-color 0.3s;
        text-align: center;
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
