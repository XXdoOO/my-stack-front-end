<template>
  <main class="container">
    <ListBlock :nextPage="getBlogList" />

    <GoTop></GoTop>
  </main>
</template>
<script>
import ListBlock from "../block/ListBlock.vue";
import GoTop from "../block/GoTop.vue";
export default {
  name: "IndexPage",
  components: { ListBlock, GoTop },
  data() {
    return {
      blogList: []
    }
  },
  methods: {
    getBlogList() {
      this.$axios.myRequest.getBlogList(null, this.$store.state.currentPage * 10, 10).then((res) => {
        this.$store.state.blogList = this.$store.state.blogList.concat(res.data.list)
      })
    }
  },
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      vm.getBlogList()
    });
  }
};
</script>
<style lang="less" scoped>
// main {
//   margin: ;
// }
</style>