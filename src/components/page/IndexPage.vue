<template>
  <main class="container">
    <ListBlock />

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
      this.$axios.myRequest.getBlogList(null, 0, 100).then((res) => {
        console.log(res)
        this.$store.state.blogList = res.data
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