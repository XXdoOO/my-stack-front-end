<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import BlogList from '@/components/BlogList.vue';
import { getBlogList } from '@/api/blog'

const list = reactive<object[]>([])
const page = reactive({
  pageNum: 1,
  total: 0
})

const getList = () => {
  getBlogList({ pageNum: page.pageNum }).then((data: any) => {
    console.log(data);

    list.push(...data.list)
    page.total = data.total
  })
}

getList()
</script>

<template>
  <BlogList :list="list" v-model:pageNum="page.pageNum" :total="page.total" @nextPage="getList"></BlogList>
</template>

<style lang="less" scoped>

</style>