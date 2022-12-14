<script setup lang="ts">
import { ref, reactive } from 'vue'
import BlogList from '@/components/BlogList.vue';
import { getBlogList } from '@/api/blog'

const list = reactive<object[]>([])

getBlogList().then((data: any) => {
  console.log(data.list)

  list.push(...data.list)

  console.log(list)

})


</script>

<template>
  <BlogList :list="list" :page-num="1"></BlogList>
</template>

<style lang="less" scoped>

</style>