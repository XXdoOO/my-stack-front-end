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
    let CancelToken = this.$axios.CancelToken;
    let source = CancelToken.source();

    this.$axios.interceptors.request.use((req) => {
      console.log("请求：", req.url);
      console.log(req)

      if ((req.url.includes("/user/") || req.url.includes("/admin/")) && this.$store.state.userInfo === null) {
        source.cancel(this.$loginRegister.showLoginRegister())
      } else {
        clearInterval(this.timer);
        this.timer = setInterval(() => {
          if (this.$store.state.progressWidth < 70) {
            this.$store.state.progressWidth += Math.random() * 5
          }
        }, 100);
        return req;
      }
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
      console.log("响应", res);

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
      } else if (code === 613) {
        this.$loginRegister.showLoginRegister()
      }

      if (res.data.data !== null && res.data.data.total !== undefined) {
        res.data.data.total = parseInt(res.data.data.total)
      }

      return res.data
    }, (error) => {
      console.log(error.message);

      if (error.code === 'ECONNABORTED' && error.message.indexOf('timeout') !== -1) {
        this.$xMessage.show({
          title: '请求超时，请刷新！',
          message: error.message,
          type: 'error',
          duration: 3000
        })
        return Promise.reject("请求超时")
      } else if (error.message.includes("cancelToken" !== -1)) {
        return Promise.reject("用户未登录")
      } else {
        return Promise.reject("其他错误")
      }
    })

    const userInfo = JSON.parse(sessionStorage.getItem("userInfo"))

    if (userInfo !== null) {
      this.$store.state.userInfo = userInfo;
    }
  }
};
</script>

<style lang="less">

</style>
