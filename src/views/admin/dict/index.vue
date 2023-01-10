<script setup lang="ts">
import { ref, reactive } from 'vue'
import { User, Notebook } from '@element-plus/icons-vue'
import { getCommentList2 } from '@/api/comment'
import MyTable from '@/components/MyTable.vue'
import { getDictType } from '@/api/dict'

const loading = ref(false)
const table = reactive({
  form: {
    name: '',
    createTime: '',
    createBy: '',
    isDeleted$is_deleted: '',
  },
  column: [
    { label: '字典名称', prop: 'name' },
    { label: '更新时间', prop: 'updateTime' },
    { label: '创建时间', prop: 'createTime' },
    { label: '创建人', prop: 'createBy' },
    { label: '是否删除', prop: 'isDeleted' },
  ],
  data: []
})

const getList = () => {
  getDictType().then((data: any) => {
    console.log(data);
    table.data.push(...data.list)
  })
}

const beforeChange = () => {
  return false
}

getList()
</script>

<template>
  <my-table :table="table">
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