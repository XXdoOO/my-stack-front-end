<script setup lang="ts">
import { ref, reactive } from 'vue'
import { User, Notebook } from '@element-plus/icons-vue'
import { getCommentList2 } from '@/api/comment'
import MyTable from '@/components/MyTable.vue'

const table = reactive({
  form: {
    blogId: undefined,
    content: undefined,
    nickname: undefined,
    enabled: undefined,
    createTime: undefined
  },
  column: [
    { label: '所属博客ID', prop: 'blogId' },
    { label: '评论', prop: 'content' },
    { label: '发布者', prop: 'nickname' },
    { label: '是否启用', prop: 'enabled', dict: 'is_enabled' },
    { label: '发布时间', prop: 'createTime' },
  ],
  data: []
})
</script>

<template>
  <my-table :table="table" :get-list="getCommentList2">
    <template #blogId="scope">
      <el-link type="primary" :icon="Notebook" :href="`/blog/${scope.row.blogId}`">{{
        scope.row.blogId
      }}</el-link>
    </template>
    <template #nickname="scope">
      <el-link type="primary" :icon="User" :href="`/user/${scope.row.sender.id}`">{{
        scope.row.sender.nickname
      }}</el-link>
    </template>
    <template #enabled="scope">
      <el-switch v-model="scope.row.enabled" @change=""></el-switch>
    </template>
  </my-table>
</template>

<style lang="less" scoped>

</style>