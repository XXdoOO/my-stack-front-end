<template>
  <footer class="footer-block">
    <nav class="container">
      <nav>
        <router-link to="">首页</router-link>
        <router-link to="">热门</router-link>
        <router-link to="">我的</router-link>
      </nav>

      <nav>
        <router-link to="">邮箱：</router-link>
        <router-link to="">GitHub：</router-link>
      </nav>
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
  max-width: 1200px;
  margin: 0 auto;
  padding: 2em;
  background-color: white;
  border-radius: 5px;

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