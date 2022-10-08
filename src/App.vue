<template>
  <div id="app">
    <HeaderBlock />
    <router-view></router-view>
    <FooterBlock />
  </div>
</template>

<script>
import HeaderBlock from "./components/block/HeaderBlock.vue"
import FooterBlock from "./components/block/FooterBlock.vue"
export default {
  name: "App",
  components: { HeaderBlock, FooterBlock },
  mounted() {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));

    if (userInfo !== null) {
      this.$store.state.userInfo = userInfo;
      this.$store.dispatch("refresh");
    }
  }
};
</script>

<style lang="less">

</style>
