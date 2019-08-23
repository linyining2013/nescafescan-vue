<template>
  <section id="invitation-letter-wrap">
    <div class="letter-box">
      <button class="letter-box__btn" @click="$emit('hideInvitation')"></button>
      <img class="letter-box__bg" :src="require('@/assets/images/invitation/letter.png')" width="70%"/>
    </div>
  </section>
</template>

<style lang="postcss">
#invitation-letter-wrap{
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, .8);
  text-align: center;
  z-index: 100;
  .letter-box{
    position: relative;
    top: 300px;
    left: 0;
    right: 0;
    font-size: 0;
    line-height: 0;
  }
  .letter-box__btn{
    position: absolute;
    top: 50%;
    margin-top: -75px;
    left: 50%;
    margin-left: -75px;
    border: 0;
    width: 150px;
    height: 150px;
    background: url(../assets/images/invitation/letter_btn.png) 0 0 no-repeat;
    background-size: 150px;
    //transition: transform .1s;
    //-moz-transition: transform .1s;	
    //-webkit-transition: transform .1s;
    //-o-transition: transform .1s;
    &:active{
      transform: scale(.9);
    }
  }
}
</style>