
<script setup lang="ts">
</script>

<template>
  <footer class="footer-block">
    <nav class="container">
      <div>
        <a href="https://github.com/XXdoOO/my-stack-front-end-vue3" target="_blank">
          GitHub前端地址：https://github.com/XXdoOO/my-stack-front-end-vue3
        </a>
        <a href="https://github.com/XXdoOO/my-stack-front-end" target="_blank">
          GitHub后端地址：https://github.com/XXdoOO/my-stack-back-end
        </a>
      </div>
      <a href="https://beian.miit.gov.cn/" target="_blank">湘ICP备2022006790号</a>
    </nav>
  </footer>
</template>

<style lang="less" scoped>
.footer-block {
  width: 100%;
  padding: 2em;
  background-color: white;
  margin-top: @gap;
  position: sticky;
  top: 100%;

  nav.container {
    display: flex;
    justify-content: space-around;
    align-items: center;

    div {
      display: flex;
      flex-direction: column;
    }
  }
}
</style>