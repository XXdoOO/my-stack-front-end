<template>
  <main class="containner">
    <ListBlock :blog-list="blogList" />
  </main>
</template>

<script>
import ListBlock from "../block/ListBlock.vue"
export default {
  name: "MyPage",
  components: { ListBlock },
  data() {
    return {
      blogList: []
    }
  },
  // beforeRouteEnter(to, from, next) {
  //   console.log(to)
  //   // next((vm) => {
      
  //   // })
  // }

}
</script>

<style lang="less" scoped>

</style>