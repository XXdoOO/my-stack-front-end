<template>
  <main class="container">
    <ListBlock :nextPage="getBlogListByKeywords" />

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
      handler() {
        this.getBlogListByKeywords()
      }
    }
  },
  methods: {
    getBlogListByKeywords() {
      this.$axios.myRequest.getBlogList(this.$route.params.keywords, this.$store.state.currentPage * 10, 10).then((res) => {
        console.log(res.data.list);
        this.$store.state.blogList = res.data.list;
        this.$store.state.total = res.data.total
      })
    }
  }
};
</script>
<style lang="less" scoped>

</style>