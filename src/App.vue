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
  data() {
    return {
      timer: null
    }
  },
  created() {
    // const CancelToken = this.axios.CancelToken;
    // const source = CancelToken.source();

    console.log(this);
    this.$xMessage.show({
      title: '这是标题',
      message: '失败',
      type: 'error',
      duration: 50000
    });

    // this.axios.interceptors.request.use((req) => {
    //   console.log("请求信息：", req);
    //   if (req.url.split("/")[1] === "user" || req.url.split("/")[1] === "admin") {
    //     if (!this.$store.state.userInfo.isLogin) {
    //       req.cancelToken = source.token;
    //       source.cancel(this.$store.commit("togglePopup"));
    //     }
    //   } else {
    //     clearInterval(this.timer);
    //     this.timer = setInterval(() => {
    //       if (this.$store.state.progressWidth < 60) {
    //         this.$store.state.progressWidth++;
    //       }
    //     }, 100);
    //     console.log("定时器", this.timer)
    //   }
    //   return req;
    // });

    // this.axios.interceptors.response.use((res) => {
    //   console.log("清除定时器", res);
    //   clearInterval(this.timer);

    //   this.$store.state.progressWidth = 100;

    //   setTimeout(() => {
    //     this.$store.state.progressWidth = 0;
    //   }, 100);
    //   return res;
    // });


    // const userInfo = JSON.parse(sessionStorage.getItem("userInfo"));

    // if (userInfo !== null) {
    //   userInfo.isLogin = true;
    //   this.$store.state.userInfo = userInfo;
    //   this.$store.dispatch("refresh").then((res) => {
    //     this.$store.commit("refresh", res);
    //   });
    // }
  }
};
</script>

<style lang="less">

</style>
