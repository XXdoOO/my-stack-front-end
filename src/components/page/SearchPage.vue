<template>
  <main class="container">
    <ListBlock :blogList=blogList />

    <GoTop></GoTop>
  </main>
</template>
<script>
import ListBlock from "../block/ListBlock.vue";
import GoTop from "../block/GoTop.vue";
export default {
  name: "SearchPage",
  components: { ListBlock, GoTop },
  data() {
    return {
      blogList: []
    }
  },
  watch: {
    $route: {
      immediate: true,
      handler(to) {
        this.$axios.myRequest.getBlogList(to.params.keywords, 0, 100).then((res) => {
          console.log(res.data.data);
          this.blogList = res.data.data;

        })
      }
    }
  },
};
</script>
<style lang="less" scoped>

</style>