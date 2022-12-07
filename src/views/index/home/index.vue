<script setup lang="ts">
import { ref, reactive } from 'vue'
import BlogList from '@/components/BlogList.vue';


</script>

<template>
  <BlogList :list="[]" :page-num="1"></BlogList>
</template>

<style lang="less" scoped>

</style>