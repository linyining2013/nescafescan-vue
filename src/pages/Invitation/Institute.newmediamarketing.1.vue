<template>
  <section id="institute-1-wrap">
    <img :src="require('@/assets/images/invitation/1.png')" width="100%" />
  </section>
</template>
<script>
export default {
  mounted() {
    this.$bus.$emit("super:blazy-revalidate");
  }
};
</script>