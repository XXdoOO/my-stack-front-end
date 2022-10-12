<template>
  <footer class="footer-block">
    <nav class="container">
      <router-link to="">
        本项目已开源，GitHub地址：
      </router-link>
      <router-link to="">作者邮箱：1972524359@qq.com</router-link>
    </nav>
  </footer>
</template>

<script>
export default {
  name: "FooterBlock",
  data() {
    return {};
  },
};
</script>

<style lang="less" scoped>
.footer-block {
  width: 100%;
  padding: 2em;
  background-color: white;

  nav.container {
    display: flex;
    justify-content: space-around;

    >nav {
      display: flex;
      flex-direction: column;
    }
  }
}
</style>