<script setup lang="ts">
import { ref, reactive } from 'vue'
import MyTable from '@/components/MyTable.vue'

const table = reactive({
  column: [
    { label: '评论', prop: 'comment' },
    { label: '发布者', prop: 'user' },
    { label: '是否删除', prop: 'isDeleted' },
    { label: '发布时间', prop: 'createTime' },
  ],
  data: [{ title: 'xx' }]
})

const form = ref({
  column: [
    { label: '评论', prop: 'title', type: 'text' },
    { label: '发布者', prop: 'user', type: 'text' },
    { label: '是否删除', prop: 'status', type: 'isDeleted' },
    { label: '发布时间', prop: 'createTime', type: 'time' },
  ],
  data: {
    title: 'xx'
  }
})

</script>

<template>
  <my-table :form="form" :table="table"></my-table>
</template>

<style lang="less" scoped>

</style>