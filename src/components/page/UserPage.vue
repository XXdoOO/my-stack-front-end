<template>
  <main class="container">
    <div class="user-info">
      <img src="../../assets/img/cover.webp" alt="" width="50" height="50">
      <span>{{}}</span>

      <nav>
        <router-link to="/user/postBlog">发布的博客</router-link>
        <router-link to="/user/upBlog">顶过的博客</router-link>
        <router-link to="/user/downBlog">踩过的博客</router-link>
      </nav>
    </div>
    <ListBlock :blog-list="blogList" />
  </main>
</template>

<script>
import ListBlock from "../block/ListBlock.vue"
export default {
  name: "UserPage",
  components: { ListBlock },
  data() {
    return {
      blogList: []
    }
  },
}
</script>

<style lang="less" scoped>
.user-info {
  position: relative;
  background-color: white;
  width: 100%;
  height: 100px;
  border-radius: 5px;
  display: flex;
  align-items: center;
  padding: 0 20px 30px 20px;

  img {
    border-radius: 50%;

  }

  nav {
    position: absolute;
    bottom: 5px;
  }
}
</style>