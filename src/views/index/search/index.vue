<script setup lang="ts">
import BlogList from '@/components/BlogList.vue'
import { getBlogList } from '@/api/blog'
import { useRoute } from 'vue-router'

</script>

<template>
  <BlogList :get-list="getBlogList" :form="{
    keywords: useRoute().params.keywords as string
  }"></BlogList>
  <div ref="blog"></div>
</template>

<style lang="less" scoped>

</style>