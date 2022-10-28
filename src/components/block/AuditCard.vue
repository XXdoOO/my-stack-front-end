<template>
  <article class="article">
    
  </article>
</template>

<script>
export default {
  name: "AuditCard",
  mounted() {
    this.$axios.myRequest.getBlogList(null, 0, 100).then((res) => {
      console.log(res)
      this.$store.state.blogList = res.data.data
    })
  }
}
</script>

<style lang="less" scoped>
.article {
  background-color: white;
  border-radius: 5px;
}
</style>