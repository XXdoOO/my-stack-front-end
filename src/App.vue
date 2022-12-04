<template>
  <div id="app">
    <HeaderBlock v-if="!$route.path.includes('/admin/')" />
    <router-view></router-view>
    <FooterBlock v-if="!$route.path.includes('/admin/')" />
  </div>
</template>

<script>
import HeaderBlock from "./components/block/HeaderBlock.vue"
import FooterBlock from "./components/block/FooterBlock.vue"
export default {
  name: "App",
  components: { HeaderBlock, FooterBlock },
  data() {
    return {
      timer: null
    }
  },
  created() {
    const userInfo = JSON.parse(sessionStorage.getItem("userInfo"))

    if (userInfo !== null) {
      this.$store.state.userInfo = userInfo;
    }
  }
};
</script>

<style lang="less">

</style>
