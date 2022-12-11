
<script setup lang="ts">
</script>

<template>
  <footer class="footer-block">
    <nav class="container">
      <a href="https://github.com/XXdoOO/graduation-design2" target="_blank">
        GitHub地址：https://github.com/XXdoOO/graduation-design2
      </a>
      <a href="https://beian.miit.gov.cn/" target="_blank">湘ICP备2022006790号</a>
    </nav>
  </footer>
</template>

<style lang="less" scoped>
.footer-block {
  width: 100%;
  padding: 2em;
  background-color: white;
  margin-top: 10px;

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