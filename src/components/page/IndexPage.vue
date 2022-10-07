<template>
  <main>
    <ListBlock />
  </main>
</template>
<script>
import ListBlock from "../block/ListBlock.vue";
export default {
  name: "IndexPage",
  components: { ListBlock },
  beforeRouteEnter(to, from, next) {
    console.log(22222)
    next((vm) => {
      vm.axios.get("/getBlogByKeywords?startIndex=10&pageSize=20").then((res) => {
        console.log(res);
        if (res.data.code === 200) {
          res.data.data.forEach((item) => {
            item.isUp = false;
            item.isDown = false;
            item.isStar = false;
          });
          vm.$store.state.blogList = res.data.data;
        }
      });
    });
  }
};
</script>
<style lang="less" scoped>

</style>