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
    this.$axios.interceptors.request.use((req) => {
      console.log("请求信息：", req.url);
      clearInterval(this.timer);
      this.timer = setInterval(() => {
        if (this.$store.state.progressWidth < 70) {
          this.$store.state.progressWidth++;
        }
      }, 100);
      return req;
    }, (error) => {
      console.log("error");
      this.$xMessage.show({
        title: '请求或相应错误！',
        message: error.message,
        type: 'error',
        duration: 3000
      });
    });

    this.$axios.interceptors.response.use((res) => {
      console.log("清除定时器", res);

      const code = res.data.code

      clearInterval(this.timer);

      this.$store.state.progressWidth = 100;

      setTimeout(() => {
        this.$store.state.progressWidth = 0;
      }, 500);

      if (code === 612) {
        this.$xMessage.show({
          title: '您的权限不足！',
          message: res.data.msg,
          type: 'error',
          duration: 3000
        })
      }

      return res.data
    }, (error) => {
      console.log(error);

      if (error.code === 'ECONNABORTED' && error.message.indexOf('timeout') !== -1) {
        this.$xMessage.show({
          title: '请求超时，请刷新！',
          message: error.message,
          type: 'error',
          duration: 3000
        });
      } else {
        this.$xMessage.show({
          title: '请求或相应错误！',
          message: error.message,
          type: 'error',
          duration: 3000
        });
      }
    });

    const userInfo = JSON.parse(sessionStorage.getItem("userInfo"))

    if (userInfo !== null) {
      this.$store.state.userInfo = userInfo;
    }
  }
};
</script>

<style lang="less">

</style>
