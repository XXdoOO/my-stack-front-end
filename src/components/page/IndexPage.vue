<template>
  <main>
    <ListBlock :blogList=blogList :modifyList=modeifyList />
  </main>
</template>
<script>
import ListBlock from "../block/ListBlock.vue";
export default {
  name: "IndexPage",
  components: { ListBlock },
  data() {
    return {
      blogList: []
    }
  },
  methods: {
    modeifyList(list) {
      this.blogList = list;
    }
  },
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      vm.$axios.get("/getBlogByKeywords?startIndex=10&pageSize=20").then((res) => {
        console.log(res);
        if (res.data.code === 200) {
          vm.blogList = res.data.data;
        }
      });
    });
  }
};
</script>
<style lang="less" scoped>

</style>