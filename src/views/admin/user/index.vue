<script setup lang="ts">
import { ref, reactive, watch } from 'vue'
import { RefreshRight, Download, Search, User } from '@element-plus/icons-vue'
import { getUserList, disableUser } from '@/api/user'
import { ElMessage, ElMessageBox } from 'element-plus'
import 'element-plus/es/components/message/style/css'
import 'element-plus/es/components/message-box/style/css'
import MyTable from '@/components/MyTable.vue'

const dialogVisible = ref(false)
const disableForm = reactive({
  userId: undefined,
  reason: undefined,
  minutes: undefined,
  enabled: true
})

const table = reactive({
  form: {
    nickname: undefined,
    email: undefined,
    ipTerritory: undefined,
    admin: undefined,
    enabled: undefined,
    createTime: undefined
  },
  column: [
    { label: '用户昵称', prop: 'nickname' },
    { label: '邮箱', prop: 'email' },
    { label: '头像', prop: 'avatar' },
    { label: '身份', prop: 'admin', dict: 'is_admin' },
    { label: 'ip', prop: 'ip' },
    { label: 'ip属地', prop: 'ipTerritory' },
    { label: '是否启用', prop: 'enabled', dict: 'is_enabled' },
    { label: '注册时间', prop: 'createTime' },
  ],
  data: []
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

const disableFormRef = ref()
const handleDisableUser = () => {
  disableFormRef.value.validate((isValid) => {
    if (isValid) {
      disableForm.minutes = disableForm.minutes[0] * 24 * 60 + disableForm.minutes[1] * 60 + disableForm.minutes[2]

      disableUser(disableForm).then(data => {
        dialogVisible.value = false
        ElMessage({
          type: 'success',
          message: '停用成功',
        })
      })
    }
  })
}

const handleSwitch = (row, e) => {
  disableForm.userId = row.id
  disableForm.enabled = e
  row.enabled = !e
  console.log(row);


  if (e) {
    ElMessageBox.confirm(
      `确认启用用户“${row.nickname}”吗？`,
      '警告',
      {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        type: 'warning',
      }
    )
      .then(() => {
        disableUser(disableForm).then(data => {
          row.enabled = true
          ElMessage({
            type: 'success',
            message: '启用成功',
          })
        })
      })
  } else {
    dialogVisible.value = true
  }
}
</script>

<template>
  <my-table :table="table" :get-list="getUserList">
    <template #nickname="scope">
      <el-link type="primary" :icon="User" :href="`/user/${scope.row.id}`">{{ scope.row.nickname }}</el-link>
    </template>
    <template #avatar="scope">
      <el-avatar :src="`/api${scope.row.avatar}`" />
    </template>
    <template #admin="scope">
      <el-tag v-if="!scope.row.admin" type="info">{{ scope.label }}</el-tag>
      <el-tag v-if="scope.row.admin">{{ scope.label }}</el-tag>
    </template>
    <template #ipTerritory="scope">
      <el-tag>{{ scope.row.ipTerritory }}</el-tag>
    </template>
    <template #enabled="scope">
      <el-switch v-model="scope.row.enabled" @change="handleSwitch(scope.row, $event)"></el-switch>
    </template>
  </my-table>

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