<template>
  <section id="institute-3-wrap" >
    <img :src="require('@/assets/images/invitation/3.png')" width="100%"/>
  </section>
</template>
<script>
export default {
  mounted() {
    this.$bus.$emit("super:blazy-revalidate");
  }
};
</script>