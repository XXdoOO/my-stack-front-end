<script setup lang="ts">
import { ref, reactive, watch } from 'vue'
import { RefreshRight, Download, Search } from '@element-plus/icons-vue'
import { getUserList, disableUser } from '@/api/user'
import { ElMessage, ElMessageBox } from 'element-plus'
import 'element-plus/es/components/message/style/css'
import 'element-plus/es/components/message-box/style/css'

const userList = reactive([])
const form = reactive({
  title: '',
  description: '',
  isDeleted: '',
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
const dialogVisible = ref(false)
const disableForm = reactive({
  userId: '',
  reason: '',
  minutes: null,
  isDisable: true
})

const minutes = [
  { label: '1分钟', value: 1 },
  { label: '30分钟', value: 30 },
]
const hours = [
  { label: '0小时', value: 0, children: minutes },
  { label: '1小时', value: 1, children: minutes },
]
const options = [
  {
    label: '0天', value: 0, children: hours
  }, {
    label: '1天', value: 1, children: hours
  }, {
    label: '7天', value: 7, children: hours
  }, {
    label: '30天', value: 30, children: hours
  }, {
    label: '365天', value: 365, children: hours
  }
]

const disableRules = reactive({
  reason: {
    required: true,
    message: '请输入封禁原因'
  },
  minutes: {
    required: true,
    message: '请选择封禁时间'
  },
})

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
        isAdmin: item.admin,
        isDisable: item.disable,
        createTime: item.createTime,
        isDeleted: item.deleted
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

const tableFormRef = ref()
const reset = () => {
  tableFormRef.value.resetFields()
  getList()
}

const beforeChange = () => {
  return false
}

const disableFormRef = ref()
const handleDisableUser = () => {
  disableFormRef.value.validate((isValid) => {
    if (isValid) {
      console.log(disableForm);
      disableForm.minutes = disableForm.minutes[0] * 24 * 60 + disableForm.minutes[1] * 60 + disableForm.minutes[2]

      console.log(disableForm);
      disableUser(disableForm).then(data => {
        getList()
        dialogVisible.value = false
        ElMessage({
          type: 'success',
          message: '封禁成功',
        })
      })
    }
  })
}

const clickSwitch = (data) => {
  if (data.isDeleted) {
    return
  }
  disableForm.userId = data.id
  disableForm.isDisable = !data.isDisable

  if (data.isDisable) {
    ElMessageBox.confirm(
      '确认解除该用户的封禁吗？',
      '警告',
      {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        type: 'warning',
      }
    )
      .then(() => {
        disableForm.isDisable = false
        console.log(disableForm);

        disableUser(disableForm).then(data => {
          getList()
          ElMessage({
            type: 'success',
            message: '解除封禁成功',
          })
        })
      })
  } else {
    dialogVisible.value = true
  }
}

getList()
</script>

<template>
  <el-form inline ref="tableFormRef" :model="form">
    <el-form-item label="用户昵称：" prop="nickname">
      <el-input v-model="form.nickname" placeholder="请输入用户昵称"></el-input>
    </el-form-item>
    <el-form-item label="状态：" prop="isDeleted">
      <el-select v-model="form.isDeleted" placeholder="请选择状态">
        <el-option label="正常" value="0"></el-option>
        <el-option label="已注销" value="1"></el-option>
      </el-select>
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
    <el-table-column label="身份" align="center">
      <template #default="scope">
        <el-tag v-if="scope.row.isAdmin == 0" type="info" effect="dark">普通用户</el-tag>
        <el-tag v-if="scope.row.isAdmin == 1" effect="dark">管理用户</el-tag>
      </template>
    </el-table-column>
    <el-table-column label="是否封禁" align="center">
      <template #default="scope">
        <el-switch v-model="scope.row.isDisable" @click.native="clickSwitch(scope.row)" :before-change="beforeChange"
          :disabled="scope.row.isDeleted" />
      </template>
    </el-table-column>
    <el-table-column label="注册时间" align="center" prop="createTime"></el-table-column>
    <el-table-column label="状态" align="center">
      <template #default="scope">
        <el-tag v-if="!scope.row.isDeleted" type="success" effect="dark">正常</el-tag>
        <el-tag v-if="scope.row.isDeleted" type="danger" effect="dark">已注销</el-tag>
      </template>
    </el-table-column>
  </el-table>

  <el-pagination class="pagination" v-model:current-page="form.pageNum" v-model:page-size="form.pageSize" background
    layout="total, sizes, prev, pager, next" :total="form.total" />

  <el-dialog v-model="dialogVisible" title="封禁设置" width="330">
    <el-form :model="disableForm" ref="disableFormRef" :rules="disableRules">
      <el-form-item label="封禁时间" prop="minutes">
        <el-cascader placeholder="请选择封禁时间" v-model="disableForm.minutes" :options="options" />
      </el-form-item>
      <el-form-item label="封禁原因" prop="reason">
        <el-input clearable rows="3" type="textarea" v-model="disableForm.reason" placeholder="请输入封禁原因"></el-input>
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button @click="dialogVisible = false">取消</el-button>
      <el-button type="primary" @click="handleDisableUser">确认</el-button>
    </template>
  </el-dialog>
</template>

<style lang="less" scoped>
.pagination {
  padding: 20px;
  justify-content: end;
}
</style>