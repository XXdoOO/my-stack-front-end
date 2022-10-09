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
    next((vm) => {
      vm.axios.get("/getBlogByKeywords?startIndex=10&pageSize=20").then((res) => {
        console.log(res);
        if (res.data.code === 200) {
          res.data.data.forEach((item) => {
            const myStarList = vm.$store.state.myStarList
            const myUpList = vm.$store.state.myUpList
            const myDownList = vm.$store.state.myDownList

            item.isUp = false;
            item.isDown = false;
            item.isStar = false;

            for (const up of myUpList) {
              if (up.id === item.id) {
                item.isUp = true;
              }
            }

            for (const down of myDownList) {
              if (down.id === item.id) {
                item.isDown = true;
              }
            }

            for (const star of myStarList) {
              if (star.id === item.id) {
                item.isStar = true;
              }
            }
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