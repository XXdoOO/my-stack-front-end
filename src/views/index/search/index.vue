<script setup lang="ts">
import { watch, ref } from 'vue'
import BlogList from '@/components/BlogList.vue'
import { getBlogList } from '@/api/blog'
import { useRoute } from 'vue-router'

const route = useRoute()
let keywords
watch(() => route.params.keywords, (newVal) => {
  keywords = newVal
}, { immediate: true })
</script>

<template>
  <BlogList :get-list="getBlogList" :form="{
    keywords: keywords
  }" :keywords="keywords"></BlogList>
  <div ref="blog"></div>
</template>

<style lang="less" scoped></style>