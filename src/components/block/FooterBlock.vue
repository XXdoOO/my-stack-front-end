<template>
  <footer class="footer-block">
    <nav class="container">
      <nav>
        <div>导航</div>
        <router-link to="">首页</router-link>
        <router-link to="">热门</router-link>
        <router-link to="">我的</router-link>
      </nav>

      <nav>
        <div>联系</div>
        <router-link to="">邮箱</router-link>
        <router-link to="">热门</router-link>
        <router-link to="">我的</router-link>
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
  background-color: @theme-color-shallow;

  nav.container {
    display: flex;
    justify-content: space-around;

    > nav {
      display: flex;
      flex-direction: column;
    }
  }
}
</style>