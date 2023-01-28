<script setup lang="ts">
import { ref, reactive } from 'vue'
import { RefreshRight, Download, Search, User, Notebook } from '@element-plus/icons-vue'
import { getBlogList2, getBlogDetails2, auditBlog } from '@/api/blog'
import { getDictData } from '@/api/dict'
import MyTable from '@/components/MyTable.vue'
import xMessage from '@/components/message/index'


const table = reactive({
  form: {
    title: '',
    description: '',
    authorNickname: '',
    status: '',
    createTime: undefined,
  },
  column: [
    { label: '标题', prop: 'title' },
    { label: '描述', prop: 'description', minWidth: '150px' },
    { label: '封面', prop: 'cover' },
    { label: '作者', prop: 'authorNickname' },
    { label: '审核状态', prop: 'status', dict: 'audit_status', width: '120px' },
    { label: '创建时间', prop: 'createTime' },
    { label: '操作', prop: 'operation' },
  ],
  data: []
})
const getBlogList = () => {
}

getBlogList()

const getBlogDetails = (blogId) => {
  getBlogDetails2(blogId).then((data: any) => {
    details.value = data.content
    visible.value = true
  })
}

const handleAuditBlog = (blogId, status) => {
  console.log(blogId, status);
  auditBlog(blogId, status).then(data => {
    console.log(data);
    xMessage({
      type: 'success',
      message: '修改成功',
    })
  })
}

const visible = ref(false)
const details = ref('')
const options = ref()

getDictData({
  dictName: 'audit_status'
}).then((data: any) => {
  console.log(data);
  options.value = data.list
})

</script>

<template>
  <my-table :table="table" :get-list="getBlogList2">
    <template #title="scope">
      <router-link :to="`/blog/${scope.row.id}`">{{ scope.row.title }}</router-link>
    </template>
    <template #cover="scope">
      <el-image v-if="scope.row.cover" :src="scope.row.cover" :preview-src-list="[scope.row.cover]"
        style="height: 100px"></el-image>
    </template>
    <template #authorNickname="scope">
      <el-link type="primary" :icon="User" :href="`/user/${scope.row.createBy}`">{{
        scope.row.authorNickname
      }}</el-link>
    </template>
    <template #status="scope">
      <el-select v-model="scope.row.status" @change="handleAuditBlog(scope.row.id, scope.row.status)">
        <el-option v-for="item in options" :key="item.value" :label="item.label"
          :value="parseInt(item.value)"></el-option>
      </el-select>
    </template>
    <template #operation="scope">
      <el-button type="primary" text @click="getBlogDetails(scope.row.id)">详情</el-button>
    </template>
  </my-table>

  <el-dialog v-model="visible" title="博客详情" width="1000">
    <v-md-preview :text="details"></v-md-preview>
  </el-dialog>
</template>

<style lang="less" scoped>
.pagination {
  padding: 20px;
  justify-content: end;
}
</style>