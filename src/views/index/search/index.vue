<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import BlogList from '@/components/BlogList.vue';
import { getBlogList } from '@/api/blog'
import { useRoute } from 'vue-router';

const list = reactive<object[]>([])

getBlogList({
  keywords: useRoute().params.keywords as string
}).then((data: any) => {
  console.log(data.list)

  list.push(...data.list)

  console.log(list)

})


onMounted(() => {
  const blog = ref()
  console.log(blog.value);
})

</script>

<template>
  <BlogList :list="list" :page-num="1"></BlogList>
  <div ref="blog"></div>
</template>

<style lang="less" scoped>

</style>