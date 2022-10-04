<template>
  <main>
    <MyBlock />
    <ListBlock/>
  </main>
</template>
<script>
import ListBlock from "../block/ListBlock.vue";
import MyBlock from "../block/MyBlock.vue";
export default {
  name: "IndexPage",
  components: { ListBlock, MyBlock },
  created() {
    this.axios.get("/getBlogByKeywords?startIndex=10&pageSize=20").then((res) => {
      console.log(res);
      if (res.data.code === 200) {
        this.$store.state.blogList = res.data.data;
      }
    });
  }
};
</script>
<style lang="less" scoped>

</style>