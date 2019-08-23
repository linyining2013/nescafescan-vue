<template>
  <section id="agreement-word-wrap">
    <s-img :src="require('@/assets/images/agreement/words_01.png')"/>
    <s-img :src="require('@/assets/images/agreement/words_02.png')" :offset="500"/>
    <s-img :src="require('@/assets/images/agreement/words_03.png')" :offset="500"/>
    <s-img :src="require('@/assets/images/agreement/words_04.png')" :offset="500"/>
    <s-img :src="require('@/assets/images/agreement/words_05.png')" :offset="500"/>
    <footer class="normal-footer">
      <button class="normal-footer__btn">知道了</button>
    </footer>
  </section>
</template>
<style lang="postcss" scoped>
#agreement-word-wrap{
  font-family: Sans-serif;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: #fff;
  overflow: auto;
  z-index: 100;
  -webkit-overflow-scrolling: touch;
  img{
    display: block;
    font-size: 0;
    line-height: 0;
    width: 100%;
    background-color: #fdfbec;
  }
  .normal-footer{
     @extend %normal-footer
  }
}
</style>