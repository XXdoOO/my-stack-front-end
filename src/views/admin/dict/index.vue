<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import { User, Notebook } from '@element-plus/icons-vue'
import MyTable from '@/components/MyTable.vue'
import { getDictType, getDictData, postDictType, postDictData, putDictType, putDictData, deleteDictData, deleteDictType } from '@/api/dict'

const table1 = reactive({
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
    { label: '操作', prop: 'operation', minWidth: '100px' },
  ],
  data: []
})

const table2 = reactive({
  form: {
  },
  column: [
    { label: 'label', prop: 'label' },
    { label: 'value', prop: 'value' },
    { label: '创建人', prop: 'createBy' },
    { label: '操作', prop: 'operation' },
  ],
  data: []
})

const visible1 = ref(false)
const visible2 = ref(false)
const form1 = reactive({
  dictName: '',
  enabled: true
})
const form2 = reactive({
  dictName: '',
  label: '',
  value: '',
  enabled: true
})
const rules1 = reactive({
  dictName: {
    required: true,
    message: '字典名称不能为空'
  },
  enabled: {
    required: true,
  }
})
const rules2 = reactive({
  label: {
    required: true,
    message: '值不能为空'
  },
  value: {
    required: true,
    message: '键不能为空'
  },
  enabled: {
    required: true,
  }
})

const expandChange = (e) => {
  getDictData({
    dictName: e.name
  }).then((data: any) => {
    console.log(data);
    table2.data = data.list
  })
}

const tableRef = ref()
const formRef1 = ref()
const handlePostDictType = () => {
  console.log(tableRef.value);
  console.log(formRef1.value);

  formRef1.value.validate(isValid => {
    if (isValid) {
      postDictType(form1).then(data => {
        tableRef.value.getList()
        visible1.value = false
      })
    }
  })
}

</script>

<template>
  <my-table :table="table1" :get-list="getDictType" @expand-change="expandChange" ref="tableRef">
    <el-button type="primary" @click="visible1 = true">新增</el-button>

    <template #expand="scope">
      <div class="sub-table">
        <my-table :key="scope.row.id" :table="table2" :get-list="getDictData"></my-table>
      </div>
    </template>
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
    <template #enabled="scope">
      <el-switch v-model="scope.row.enabled" />
    </template>
    <template #operation="scope">
      <el-button type="primary" text @click="">新增</el-button>
      <el-button type="primary" text>编辑</el-button>
      <el-button type="danger" text @click="deleteDictType(scope.row.id)">删除</el-button>
    </template>
  </my-table>

  <el-dialog v-model="visible1" title="新增字典类型" width="350px">
    <el-form :model="form1" :rules="rules1" ref="formRef1">
      <el-form-item label="字典名称" prop="dictName">
        <el-input v-model="form1.dictName" placeholder="请输入字典名称"></el-input>
      </el-form-item>
      <el-form-item label="是否启用" prop="enabled">
        <el-switch v-model="form1.enabled"></el-switch>
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button @click="visible1 = false">取消</el-button>
      <el-button type="primary" @click="handlePostDictType">确认</el-button>
    </template>
  </el-dialog>

  <el-dialog v-model="visible2" title="新增字典数据" width="350px">
    <el-form :model="form2" :rules="rules2">
      <el-form-item label="键" prop="value">
        <el-input v-model="form2.value" placeholder="请输入键"></el-input>
      </el-form-item>
      <el-form-item label="值" prop="label">
        <el-input v-model="form2.label" placeholder="请输入值"></el-input>
      </el-form-item>
      <el-form-item label="是否启用" prop="enabled">
        <el-switch v-model="form2.enabled"></el-switch>
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button @click="visible2 = false">取消</el-button>
      <el-button type="primary">确认</el-button>
    </template>
  </el-dialog>
</template>

<style lang="less" scoped>
.sub-table {
  padding: 10px 30px;
}
</style>