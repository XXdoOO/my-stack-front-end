<script setup lang="ts">
import { ref, reactive, watch } from 'vue'
import { RefreshRight, Download, Search } from '@element-plus/icons-vue'
import { getUserList } from '@/api/user'

const userList = reactive([])
const form = reactive({
  title: '',
  description: '',
  status: '',
  nickname: '',
  isAdmin: null,
  createTime: '',
  startTime: '',
  endTime: '',
  pageNum: 1,
  pageSize: 10,
  total: 100
})
const loading = ref(false)

const getList = () => {
  loading.value = true
  form.startTime = form.createTime[0]
  form.endTime = form.createTime[1]

  getUserList(form).then((data: any) => {
    form.total = parseInt(data.total)
    userList.length = 0
    data.list.map(item => {
      userList.push({
        id: item.id,
        nickname: item.nickname,
        email: item.email,
        avatar: '/api' + item.avatar,
        status: item.disable,
        isAdmin: item.admin,
        isDisable: item.disable,
        createTime: item.createTime
      })
    })
    loading.value = false
  })
}

watch(() => form.pageNum, () => {
  getList()
})

watch(() => form.pageSize, () => {
  form.pageNum = 1
  getList()
})

const tableForm = ref()
const reset = () => {
  tableForm.value.resetFields()
  getList()
}

getList()
</script>

<template>
  <el-form inline ref="tableForm" :model="form">
    <el-form-item label="用户昵称：" prop="nickname">
      <el-input v-model="form.nickname" placeholder="请输入作者昵称"></el-input>
    </el-form-item>
    <el-form-item label="状态：" prop="status">
      <el-input v-model="form.status" placeholder="请输入状态"></el-input>
    </el-form-item>
    <el-form-item label="身份：" prop="isAdmin">
      <el-select v-model="form.isAdmin" placeholder="请选择身份">
        <el-option label="普通用户" value="0"></el-option>
        <el-option label="管理用户" value="1"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="注册时间：" prop="createTime">
      <el-date-picker v-model="form.createTime" value-format="YYYY-MM-DD HH:mm:ss" type="datetimerange"
        range-separator="至" start-placeholder="开始时间" end-placeholder="结束时间" clearable />
    </el-form-item>
    <el-form-item>
      <el-button :icon="RefreshRight" @click="reset">重置</el-button>
      <el-button :icon="Download" type="warning">导出</el-button>
      <el-button type="primary" :icon="Search" @click="getList">查找</el-button>
    </el-form-item>
  </el-form>

  <el-table v-loading="loading" :data="userList">
    <el-table-column label="序号" align="center" type="index" min-width="50"></el-table-column>
    <el-table-column label="用户昵称" align="center" prop="nickname"></el-table-column>
    <el-table-column label="邮箱" align="center" prop="email"></el-table-column>
    <el-table-column label="头像" align="center" prop="avatar">
      <template #default="scope">
        <el-avatar :src="scope.row.avatar"></el-avatar>
      </template>
    </el-table-column>
    <el-table-column label="状态" align="center" prop="status">
      <template #default="scope">
        <el-tag v-if="scope.row.status == 0" type="success" effect="dark">正常</el-tag>
        <el-tag v-if="scope.row.status == 1" type="danger" effect="dark">封禁中</el-tag>
      </template>
    </el-table-column>
    <el-table-column label="身份" align="center">
      <template #default="scope">
        <el-tag v-if="scope.row.isAdmin == 0" type="info" effect="dark">普通用户</el-tag>
        <el-tag v-if="scope.row.isAdmin == 1" effect="dark">管理用户</el-tag>
      </template>
    </el-table-column>
    <el-table-column label="注册时间" align="center" prop="createTime"></el-table-column>
  </el-table>

  <el-pagination class="pagination" v-model:current-page="form.pageNum" v-model:page-size="form.pageSize" background
    layout="total, sizes, prev, pager, next" :total="form.total" />
</template>

<style lang="less" scoped>
.pagination {
  padding: 20px;
  justify-content: end;
}
</style>