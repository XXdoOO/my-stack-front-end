<script setup lang="ts">
import { ref, reactive } from 'vue'
import { User, Notebook } from '@element-plus/icons-vue'
import { getCommentList2 } from '@/api/comment'
import MyTable from '@/components/MyTable.vue'

const loading = ref(false)
const table = reactive({
  form: {
    blogId: '',
    content: '',
    senderNickname: '',
    createTime: []
  },
  column: [
    { label: '所属博客ID', prop: 'blogId' },
    { label: '评论', prop: 'content' },
    { label: '发布者', prop: 'senderNickname' },
    { label: '发布时间', prop: 'createTime' },
    { label: '是否删除', prop: 'isDeleted' },
  ],
  data: []
})

const getList = (form) => {
  console.log(form);

  getCommentList2(form).then((data: any) => {
    console.log(data);
    table.data = data.list
    form.total = parseInt(data.total)
  })
}

getList(table.form)
</script>

<template>
  <my-table :table="table" @get-list="getList">
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
  </my-table>
</template>

<style lang="less" scoped>

</style>