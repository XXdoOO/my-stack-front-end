<script setup lang="ts">
import { ref, reactive, onMounted, inject } from 'vue'
import { User, Notebook } from '@element-plus/icons-vue'
import MyTable from '@/components/MyTable.vue'
import { getDictType, getDictData, postDictType, postDictData, putDictType, putDictData, deleteDictData, deleteDictType } from '@/api/dict'

const table1 = reactive({
  form: {
    name: undefined,
    createTime: undefined,
    createBy: undefined,
    enabled: undefined
  },
  column: [
    { label: '字典名称', prop: 'name' },
    { label: '创建人', prop: 'createBy' },
    { label: '是否启用', prop: 'enabled', dict: 'is_enabled' },
    { label: '创建时间', prop: 'createTime' },
    { label: '操作', prop: 'operation', minWidth: '100px' },
  ],
})

const visible1 = ref(false)
const visible2 = ref(false)
const isEdit1 = ref(false)
const isEdit2 = ref(false)
const form1 = reactive({
  id: undefined,
  dictName: undefined,
  enabled: true
})
const form2 = reactive({
  id: undefined,
  dictName: undefined,
  label: undefined,
  value: undefined,
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

const tableRef1 = ref()
const formRef1 = ref()
const handlePostDictType = () => {
  formRef1.value.validate(isValid => {
    if (isValid) {
      if (isEdit1.value) {
        putDictType(form1).then(data => {
          tableRef1.value.getList()
          visible1.value = false
        })
      } else {
        postDictType(form1).then(data => {
          tableRef1.value.getList()
          visible1.value = false
        })
      }
    }
  })
}

const tableRef2 = ref()
const formRef2 = ref()
const handlePostDictData = () => {
  console.log(form2);

  formRef2.value.validate(isValid => {
    if (isValid) {
      if (isEdit2.value) {
        putDictData(form2).then(data => {
          tableRef2.value?.getList()
          visible2.value = false
        })
      } else {
        postDictData(form2).then(data => {
          tableRef2.value?.getList()
          visible2.value = false
        })
      }
    }
  })
}

const tables = reactive({})
const expandChange = (e) => {
  console.log(e)

  tables[e.id] = {
    $trigger: true,
    form: {
      dictName: e.name
    },
    column: [
      { label: 'label', prop: 'label' },
      { label: 'value', prop: 'value' },
      { label: '是否启用', prop: 'enabled' },
      { label: '创建时间', prop: 'createTime' },
      { label: '操作', prop: 'operation' },
    ],
  }
}

const deleteItem: Function = inject('$deleteItem')
const enableItem: Function = inject('$enableItem')

const edit1 = (row) => {
  console.log(row);

  form1.id = row.id
  form1.dictName = row.name
  form1.enabled = row.enabled

  isEdit1.value = true
  visible1.value = true
}

const edit2 = (row) => {
  console.log(row);
  form2.id = row.id
  form2.dictName = row.dictName
  form2.label = row.label
  form2.value = row.value
  form2.enabled = row.enabled

  isEdit2.value = true
  visible2.value = true
}

const add2 = (dictName) => {
  isEdit2.value = false
  form2.dictName = dictName
  visible2.value = true
}
</script>

<template>
  <my-table :table="table1" :get-list="getDictType" ref="tableRef1" @expand-change="expandChange">
    <el-button type="primary" @click="isEdit1 = false; visible1 = true">新增</el-button>

    <template #expand="scope">
      <div class="sub-table">
        <my-table :table="tables[scope.row.id]" :get-list="getDictData" :trigger="tables[scope.row.id].$trigger"
          ref="tableRef2">
          <template #enabled="scope">
            <el-switch v-model="scope.row.enabled"
              @change="enableItem('dict_data', 'label', scope.row.label, scope.row)" />
          </template>
          <template #operation="scope">
            <el-button type="primary" text @click="edit2(scope.row)">编辑</el-button>
            <el-button type="danger" text
              @click="deleteItem('dict_data', 'label', scope.row.label, scope.row.id, tableRef1)">删除</el-button>
          </template>
        </my-table>
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
      <el-switch v-model="scope.row.enabled" @change="enableItem('dict_type', '字典名称', scope.row.name, scope.row)" />
    </template>
    <template #operation="scope">
      <el-button type="primary" text @click="add2(scope.row.name)">新增</el-button>
      <el-button type="primary" text @click="edit1(scope.row)">编辑</el-button>
      <el-button type="danger" text
        @click="deleteItem('dict_type', '字典名称', scope.row.name, scope.row.id)">删除</el-button>
    </template>
  </my-table>

  <el-dialog v-model="visible1" :title="isEdit1 ? '编辑字典类型' : '新增字典类型'" width="350px">
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

  <el-dialog v-model="visible2" :title="isEdit2 ? '编辑字典数据' : '新增字典数据'" width="350px">
    <el-form :model="form2" :rules="rules2" ref="formRef2">
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
      <el-button type="primary" @click="handlePostDictData">确认</el-button>
    </template>
  </el-dialog>
</template>

<style lang="less" scoped>
.sub-table {
  padding: 10px 30px;
}
</style>