<template>
    <section id="preview-img-wrap" v-show="urls.length">
        <div class="pos-wrap">
            <button type="button" class="close-btn" v-on:click="urls = []">X</button>
            <button type="button" class="prev-btn btn" :disabled="index == 0" v-on:click="prevImg"></button>
            <div class="img-data-wrap">
                <transition name="imgPreview">
                    <img :key="index" 
                    :src="urls[index]" 
                    :class="{active: this.move.moving}"
                    :width="this.imgInfo.scaleWidth?this.imgInfo.scaleWidth  + 'px' : '100%'"  
                    v-on:touchstart.prevent.stop="imgMove($event)" 
                    v-on:touchmove.prevent.stop="imgMove($event)"
                     v-on:touchend.prevent.stop="imgMove($event)" 
                     :style="{marginTop: imgInfo.marginTop + 'px','-webkit-transform': transformStyle}"/>
                </transition>
            </div>
            <button type="button" class="next-btn btn" :disabled="!(index <= urls.length -2 )" v-on:click="nextImg"></button>
        </div>
    </section>
</template>

<script>
export default {
  name: "img-preview",
  props: {
    urls: {
      type: Array,
      default: function(val) {
        return val || [];
      }
    },
    index: {
      type: Number,
      default: function(val) {
        return val || 0;
      }
    }
  },
  computed: {
      transformStyle(){
        return "translate3d(" + this.imgInfo.top + "px, " + this.imgInfo.left + "px, 0)"
      }
  },
  data() {
    return {
      imgInfo: {
          w: 0,
          h: 0,
          marginTop: 0,
          top: 0,
          left: 0,
          scaleHeight: 0,
          scaleWidth: 0,
          baseHeight: 0,
          baseWidth: 0,
          newHeight: 0,
          newWidth: 0
      },
      move: {
          moving: false,
          x: 0,
          y: 0,//记录变化的xy距离
          startX: 0,
          startY: 0,//记录事件开始的xy
          curX: 0,
          curY: 0,//记录当前变化的xy
          newX: 0,
          newY: 0,//记录最新的xy
          touchLen: 1,//触屏手指
          startFingerDist: 0,//两根手指直线距离
          finger: false,
      }
    };
  },
//   updated(val) {
    // console.log(this.urls[this.index])
//   },
  methods: {
      getTouchDist: function(e) {
        var x1 = 0,
            y1 = 0,
            x2 = 0,
            y2 = 0,
            x3 = 0,
            y3 = 0,
            result = {};
        x1 = e.touches[0].pageX;
        x2 = e.touches[1].pageX;
        y1 = e.touches[0].pageY - document.body.scrollTop;
        y2 = e.touches[1].pageY - document.body.scrollTop;
        if (!x1 || !x2) {
            return
        }
        if (x1 <= x2) {
            x3 = (x2 - x1) / 2 + x1
        } else {
            x3 = (x1 - x2) / 2 + x2
        }
        if (y1 <= y2) {
            y3 = (y2 - y1) / 2 + y1
        } else {
            y3 = (y1 - y2) / 2 + y2
        }
        result = {
            dist: Math.round(Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2))),
            x: Math.round(x3),
            y: Math.round(y3)
        };
        return result
    },
      imgMove(event){
          switch (event.type) {
            case "touchstart":
                this.move.touchLen = event.targetTouches.length;

                if(this.move.touchLen == 1){//移动
                    this.move.startX = event.touches[0].pageX;
                    this.move.startY = event.touches[0].pageY;
                    this.move.finger = false;
                }else{//缩放
                    let touchDist = this.getTouchDist(event);
                    this.move.startFingerDist = touchDist.dist;
                    this.move.startFingerX = touchDist.x;
                    this.move.startFingerY = touchDist.y;
                    this.move.finger = true;
                }
                
            break;
            case "touchmove":
                this.move.touchLen = event.targetTouches.length;
                this.move.moving = true;
                if (this.move.touchLen == 1 && !this.move.finger) {
                    // if(this.imgInfo.scaleWidth == this.imgInfo.baseWidth){
                        this.move.x = this.move.startX - event.touches[0].pageX; //<1 右滑  >1 左滑
                        this.move.y = this.move.startY - event.touches[0].pageY;
                        this.move.curX = this.move.x * -1;
                        this.move.curY = this.move.y * -1;
                        this.imgInfo.top = this.move.curX + this.move.newX;
                        this.imgInfo.left = this.move.curY+ this.move.newY;
                    // }else{
                        // this.imgInfo.top = -1 * Math.round(this.move.startFingerX * this.move.ratio - this.move.startFingerX);
                        // this.imgInfo.left =  -1 * Math.round((this.move.startFingerY * this.move.ratio - this.move.startFingerY) /2);
                    // }
                    this.move.finger = false
                }else{
                    let touchDist = this.getTouchDist(event);
                    let curDist = touchDist.dist;

                    // this.imgInfo.scaleHeight = Math.round(this.imgInfo.baseHeight * ratio);
                    this.move.ratio = curDist / this.move.startFingerDist;
                    let curW = Math.round(this.imgInfo.newWidth * this.move.ratio);

                    // if(curW >= this.imgInfo.baseWidth){
                        this.imgInfo.scaleWidth = curW;
                        this.imgInfo.top = -1 * Math.round(this.move.startFingerX * this.move.ratio - this.move.startFingerX - this.move.newX* this.move.ratio );
                        this.imgInfo.left =  -1 * Math.round((this.move.startFingerY * this.move.ratio - this.move.startFingerY) /2 - this.move.newY* this.move.ratio );
                    // } else {
                    //     if (curW < this.imgInfo.baseWidth) {
                    //         this.imgInfo.scaleWidth = this.imgInfo.baseWidth;
                    //         // this.imgInfo.top = 0;
                    //         // this.imgInfo.left = 0;
                    //     }
                    // }

                    // this.imgInfo.baseHeight 
                    // let imgWidth = Math.round(this.imgInfo.scaleWidth * ratio),
                    //  console.log(this.imgInfo.scaleWidth)
                        // console.log(this.imgInfo.scaleHeight)
                    this.move.finger= true;
                }
                
            break;
            case "touchend":
                // if (this.move.touchLen == 1 && !this.move.finger) {
                //     this.move.moving = false;
                //     this.move.newX = this.imgInfo.top;
                //     this.move.newY = this.imgInfo.left;
                    // this.imgInfo.top = 0;
                    // this.imgInfo.left = 0;
                // }
                
                this.move.newX = this.imgInfo.top;
                this.move.newY = this.imgInfo.left;
                this.imgInfo.newHeight = this.imgInfo.scaleHeight;
                this.imgInfo.newWidth = this.imgInfo.scaleWidth;
            break;
          }
      },
      setMarginTop(){//判断是否显示提示滚动的箭头动画
            let src = this.urls[this.index];
            let img = new Image();
            img.src = src;
            this.imgInfo.w = img.width;
            this.imgInfo.h = img.height;
            this.move.newX = this.move.newY = this.imgInfo.top = this.imgInfo.left = 0;
            this.imgInfo.newWidth = this.imgInfo.baseWidth = this.imgInfo.scaleWidth  = document.body.clientWidth;
            this.imgInfo.baseHeight = this.imgInfo.scaleHeight = this.imgInfo.scaleWidth * this.imgInfo.h / this.imgInfo.w; //当前屏幕比例吓，图片的高度
            this.imgInfo.marginTop = this.imgInfo.scaleHeight/2 * -1;
        },
    nextImg(){
        this.transitionName='imgPreview-left';
        this.index+=1;
        this.$nextTick(()=> {
            //dom已更新
            this.setMarginTop()
        })
    },
    prevImg(){
        this.transitionName='imgPreview-right';
        this.index-=1;
        this.$nextTick(()=> {
            //dom已更新
            this.setMarginTop()
        })
    },
  }
};
</script>
<style lang="postcss" scoped>
#preview-img-wrap {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  z-index: 999;
  background: rgba(0, 0, 0, 0.8);
  overflow: hidden;
  .pos-wrap {
    position: relative;
    width: 100%;
    height: 100%;
    max-width: 100%;
    max-height: 100%;
    overflow: hidden;
    .img-data-wrap{
        img{
            position: absolute;
            top: 50%;
            font-size: 0;
            line-height: 0;
            transition: transform .2s ease-in-out, opacity 1s, width .2s ease-in-out, height .2s ease-in-out;
            &.active{
                transition: transform 0s ease, opacity 1s, width 0s ease, height 0s ease;
            }
        }
    }
    .close-btn {
      color: #fff;
      height: 60px;
      width: 60px;
      line-height: 60px;
      background: #000;
      text-align: center;
      position: absolute;
      right: 5px;
      top: 5px;
      border: 0;
      z-index: 10;
    }
    .btn {
      position: absolute;
      top: 50%;
      margin-top: -45px;
      width: 90px;
      height: 90px;
      border-radius: 90px;
      background: rgba(0, 0, 0, 0.8);
      border: 0;
      z-index: 10;
      &[disabled] {
        opacity: 0.5;
      }
      &:after,
      &:before {
        position: absolute;
        content: "";
        display: block;
        width: 4px;
        height: 40%;
        border-radius: 5px;
        background: #fff;
      }
      &:after {
        top: 15px;
      }
      &:before {
        top: 40px;
      }
      &:active {
        opacity: 0.5;
      }
    }
    .prev-btn {
      left: 16px;
    }
    .prev-btn,
    .next-btn {
      &:after,
      &:before {
        left: 40px;
      }
      &:before {
        transform: rotate(-45deg);
        -ms-transform: rotate(-45deg);
        -moz-transform: rotate(-45deg);
        -webkit-transform: rotate(-45deg);
        -o-transform: rotate(-45deg);
      }
      &:after {
        transform: rotate(45deg);
        -ms-transform: rotate(45deg);
        -moz-transform: rotate(45deg);
        -webkit-transform: rotate(45deg);
        -o-transform: rotate(45deg);
      }
    }
    .next-btn {
      right: 16px;
      transform: rotateY(180deg);
      -ms-transform: rotateY(180deg);
      -moz-transform: rotateY(180deg);
      -webkit-transform: rotateY(180deg);
      -o-transform: rotateY(180deg);
    }
  }
}

.imgPreview-enter-active,
.imgPreview-leave-active{
  position: absolute;
}
.imgPreview-enter,
.imgPreview-leave-to{
    opacity: 0;
}
</style>