<template>
  <section class="coupon-item" :class="couponType(value.isLimited, value.discountType)">
    <div class="coupon-item-container">
      <header class="item-container__title">{{value.title}}</header>
          <ul class="item-container-tips-box">
			<li class="tips-item">有效期至<span v-html="$utils.dateFormat(value.limitedTime, 'yyyy-mm-dd')"></span></li>
			<li class="tips-item">课程{{value.courseType == 1? '套餐':''}}奖学金</li>
			<li class="tips-item">
				<template v-if="value.limitMessageCou"><span v-html="setLimitMessage(value.limitMessageCou, ',', '《', '》')"></span>使用</template>
				<template v-if="value.limitMessageCaTe">本券限<span v-html="setLimitMessage(value.limitMessageCaTe,'，','【', '】')"></span>课程类型使用</template>
				<template v-if="value.quota">满{{(value.quota/100).toFixed(2)}}元可用</template>
				<template v-else>无门槛使用</template>
			</li>			
          </ul>
    </div>
    <div class="coupon-item-discount">
		<div class="item-discount-box">
			<div class="item-discount__num" v-html="setDiscount((value.discountAmount||value.discount), value.discountType)"></div>
			<p class="coupon-item__tip" v-if="value.isLimited == 1">已过期</p>
          	<button class="coupon-item__btn" @click="linkTo(value.courseIds, value.courseType)" v-else>去使用</button>
		</div>
    </div>
   <!-- <div class="coupon-item-detail">
      <div class="item-detail__price">
          <p v-html="setDiscount((value.discountAmount||value.discount), value.discountType)"></p>
      </div>
      <div class="item-detail-txt">
          <p class="item-detail-txt__name">{{value.title}}</p>
          <div class="item-detail-txt__date">有效期至
              <span v-html="$utils.dateFormat(value.limitedTime, 'yyyy-mm-dd')"></span>
              <br/>
              <span>课程{{value.courseType == 1? '套餐':''}}专用券</span>
          </div>
      </div>
      <div class="t-d-box">
          <button class="d-b-btn" v-if="value.isLimited == 1">已过期</button>
          <button class="d-b-btn" @click="linkTo(value.courseIds, value.courseType)" v-else>去使用</button>
      </div>
  </div>
  <div class="l-t-tips" :class="[{'slideup': !(expandId == value.id), 'limited': value.isLimited == 1},setSlide(value)]" @click="$emit('setExpandId',(expandId != value.id?value.id: null))">
      <template v-if="value.quota || value.limitMessageCou || value.limitMessageCaTe">
          <ul class="tips-box">
              <template v-if="value.limitMessageCou">
                  <li class="t-item">本券限
                      <span v-html="setLimitMessage(value.limitMessageCou, ',', '《', '》')"></span>使用</li>
              </template>
              <template v-if="value.limitMessageCaTe">
                  <li class="t-item">本券限
                      <span v-html="setLimitMessage(value.limitMessageCaTe,'，','【', '】')"></span>课程类型使用</li>
              </template>
              <template v-if="value.quota">
                  <li class="t-item">满{{(value.quota/100).toFixed(2)}}可用</li>
              </template>
          </ul>
      </template>
      <template v-else>
          <ul>
              <li class="t-item">无门槛使用</li>
          </ul>
      </template>
  </div> -->
  </section> 
</template>
<script>
import API from "@/plugins/API";
export default {
  data() {
    return {}
  },
  props: ["value", "expandId"],
  computed: {},
  mounted() {
    this.player = document.getElementById("video" + this.id);
    // console.log(this.player)
  },
  methods: {
    couponType: function(isLimited, discountType) {
      //判断优惠券类型
      var className = {};
      if (isLimited != 1) {
        //是否可用
        // if (discountType == 1) {
        //   //现金：1
        //   className.cash = true;
        // } else if (discountType == 2) {
        //   //优惠券：2
        //   className.discount = true;
        // }
      } else {
        className.overdue = true;
      }
      return className;
    },
    setLimitMessage: function(data, s, l, r) {
      var datas = data.split(s);
      for (var i = 0, html = "", len = datas.length; i < len; i++) {
        html += l + datas[i] + r;
      }
      return html;
    },
    // setSlide: function(data) {
    //   //滚动
    //   var quota = data.quota > 0 ? 1 : 0;
    //   var limitMessageCou = data.limitMessageCou ? 1 : 0;
    //   var limitMessageCaTe = data.limitMessageCaTe ? 1 : 0;
    //   if (quota + limitMessageCou + limitMessageCaTe >= 2) {
    //     //两行以上
    //     return "slide-box";
    //   } else {
    //     let bw = document.body.clientWidth,
    //       h = (36 / 75 * bw / 10).toFixed(3), //rem => px 换算
    //       w = bw - (50 + 50 + 40 + 20) / 75 * bw / 10, // /10是因为尺寸750
    //       line = 2,
    //       foneSize = 24 / 75 * bw / 10 / 2, //单字节宽度
    //       len = (data.limitMessageCou + data.limitMessageCaTe).replace(
    //         /[^\x00-\xff]/g,
    //         "01"
    //       ).length, //双字节换算为单字节的长度
    //       max = parseInt(w * line / foneSize),
    //       lineHeight = 1.4 * foneSize * 2;
    //     if (h > lineHeight && len >= max) {
    //       return "slide-box";
    //     }
    //   }
    // },
    setDiscount: function(data, discountType) {
      //输出优惠券 优惠价格/折扣
      return (
        (discountType == 1?(data / 100).toFixed(2):data) +
        '<span class="symbol">' +
        (discountType == 1 ? "元" : "折") +
        "</span>"
      );
    },
    linkTo(courseIds, courseType) {
      if (courseIds) {
        if (courseIds.indexOf(",") == -1) {
          //多个课程
          this.$router.push({
            name: courseType == 0 ? "CourseDetail" : "Package",
            params: {
              id: courseIds
            }
          });
        } else {
          this.$router.push("/course");
        }
      } else {
        this.$router.push("/course");
      }
    },
  }
};
</script>

<style lang="postcss">
@import "../styles/common.pcss";
.coupon-item{
  @extend %flex-parent;
  position: relative;
  min-height: 230px;
  background: #fff;
  border-radius: 20px;
  box-shadow: 0px 4px 26px 0px rgba(146, 146, 146, 0.2);
  margin-bottom: 40px;
  .coupon-item-container{
    @extend %flex-child;
    padding: 40px;
    .item-container__title{
      font-size: 28px;
      color: #494949;
      line-height: 36px;
      font-weight: bold;
    }
    .item-container-tips-box{
      font-size: 24px;
      color: #979797;
      line-height: 38px;
	  margin-top: 30px;
      .tips-item{
		position: relative;
		padding-left: 20px;
        &:before {
            content: "";
            display: block;
            position: absolute;
            top: 16px;
            left: 0;
            width: 6px;
            height: 6px;
            border-radius: 6px;
            background: #406cad;
        }
      }
    }
  }
  .coupon-item-discount{
	position: relative;
    padding: 40px;
    width: 263px;
    background: #4472b2;
    border-top-right-radius: 20px;
    border-bottom-right-radius: 20px;
	color: #fff;
	.item-discount-box{
		position: absolute;
		top: 50%;
		margin-top: -80px;
		left: 0;
		right: 0;
		text-align: center;
	}
	.coupon-item__tip{
		display: inline-block;
		height: 54px;
        color: #fff;
        font-size: 26px;
        width: 150px;
	}
	.coupon-item__btn{
		position: relative;
        border-radius: 26px;
        height: 54px;
        color: #fff;
        font-size: 26px;
        background-color: #4472b2;
		border: solid 2px #fff;
        width: 150px;
        &:after {
            content: '';
            display: inline-block;
            width: 0;
            height: 0;
            margin-left: 20px;
            border-top: 8px solid transparent;
            border-bottom: 8px solid transparent;
            border-left: 12px solid #fff;
        }
	}
	.item-discount__num{
		font-size: 54px;
		line-height: 74px;
		.symbol{
			margin-left: 10px;
			font-size: 28px;
			line-height: 36px;
		}
	}
  }

  &.overdue{
		.coupon-item-container{
    		.item-container__title, .item-container-tips-box{
				color: #d0d0d0;
			}
			.item-container-tips-box{
				.tips-item{
					&:before {
						background: #d0d0d0;
					}
				}
			}
		}
		.coupon-item-discount{
			background-color: #d0d0d0;
		}
  	}
}
</style>