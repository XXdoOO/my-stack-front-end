<script setup lang="ts">
import BlogList from '@/components/BlogList.vue'
import { getBlogList } from '@/api/blog'

</script>

<template>
  <BlogList :get-list="getBlogList"></BlogList>
</template>

<style lang="less" scoped>

</style>