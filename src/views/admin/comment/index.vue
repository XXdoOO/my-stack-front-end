<script setup lang="ts">
import { ref, reactive } from 'vue'
import { User, Notebook } from '@element-plus/icons-vue'
import { getCommentList2 } from '@/api/comment'
import MyTable from '@/components/MyTable.vue'

const loading = ref(false)
const table = reactive({
  column: [
    { label: '所属博客ID', prop: 'blogId' },
    { label: '评论', prop: 'content' },
    { label: '发布者', prop: 'senderNickname' },
    { label: '发布时间', prop: 'createTime' },
    { label: '是否删除', prop: 'isDeleted' },
  ],
  data: []
})

const form = reactive({
  column: [
    { label: '所属博客ID', prop: 'blogId', type: 'text', },
    { label: '评论', prop: 'title', type: 'text', },
    { label: '发布者', prop: 'user', type: 'text' },
    { label: '发布时间', prop: 'createTime', type: 'time' },
    { label: '是否删除', prop: 'status', type: 'isDeleted' },
  ],
  data: {
    title: 'xx'
  }
})

const getList = () => {
  getCommentList2().then((data: any) => {
    console.log(data);
    table.data.push(...data.list)
  })
}

getList()
</script>

<template>
  <my-table :form="form" :table="table">
    <template #blogId="scope">
      <el-link type="primary" :icon="Notebook" :href="`/blog/${scope.row.blogId}`">{{
        scope.row.blogId
      }}</el-link>
    </template>
    <template #senderNickname="scope">
      <el-link type="primary" :icon="User" :href="`/user/${scope.row.senderId}`">{{
        scope.row.senderNickname
      }}</el-link>
    </template>
    <template #isDeleted="scope">
      <el-switch v-model="scope.row.isDeleted" :before-change="beforeChange" />
    </template>
  </my-table>
</template>

<style lang="less" scoped>

</style>