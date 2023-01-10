<script setup lang="ts">
import { ref, reactive } from 'vue'
import { User, Notebook } from '@element-plus/icons-vue'
import MyTable from '@/components/MyTable.vue'
import { getDictType } from '@/api/dict'

const loading = ref(false)
const table = reactive({
  form: {
    name: '',
    createTime: [],
    createBy: '',
  },
  column: [
    { label: '字典名称', prop: 'name' },
    { label: '更新时间', prop: 'updateTime' },
    { label: '创建时间', prop: 'createTime' },
    { label: '创建人', prop: 'createBy' },
    { label: '操作', prop: 'operation' },
  ],
  data: []
})

const getList = () => {
  console.log(table.form);

  getDictType({
    createTime: table.form.createTime,
    dictName: table.form.name,
  }).then((data: any) => {
    table.data = data.list
  })
}

const beforeChange = () => {
  return false
}

getList()
</script>

<template>
  <my-table :table="table" @getList="getList">
    <el-button type="primary">新增</el-button>
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
    <!-- <template #isDeleted="scope">
      <el-switch v-model="scope.row.isDeleted" :before-change="beforeChange" />
    </template> -->
    <template #operation="scope">
      <el-button type="primary" text>编辑</el-button>
      <el-button type="danger" text>删除</el-button>
    </template>
  </my-table>
</template>

<style lang="less" scoped>

</style>