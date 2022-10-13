<template>
  <footer class="footer-block">
    <nav class="container">
      <router-link to="">
        GitHub地址：https://github.com/XXdoOO/graduation-design2
      </router-link>
      <a href="https://beian.miit.gov.cn/" target="_blank">湘ICP备2022006790号</a>
      <span>作者邮箱：1972524359@qq.com</span>
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