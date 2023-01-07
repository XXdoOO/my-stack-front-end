<script setup lang="ts">
import { ref, reactive } from 'vue'

interface TableColumn {
  label: string,
  prop: string
}

interface FormColumn {
  label: string,
  prop: string,
  type: 'text' | 'status' | 'auditStatus' | 'isAdmin' | 'isDisable' | 'time',
  placeholder?: string
}

const props = withDefaults(defineProps<{
  table?: {
    column: TableColumn[]
    data: object[]
  },
  form?: {
    column: FormColumn[],
    data: any
  }
}>(), {
  table: () => {
    return {
      column: [
        { label: '标题', prop: 'title' }
      ],
      data: [{}]
    }
  },
  form: () => {
    return {
      column: [{ label: '标题', prop: 'title', type: 'text' }],
      data: {
        title: ''
      }
    }
  }
})

const $emit = defineEmits(['getList'])

if (props.form) {
  props.form.column.forEach(item => {
    let prefix = '请'
    if (item.type == 'text') {
      prefix += '输入'
    } else {
      prefix += '选择'
    }
    item.placeholder = prefix + item.label
  })
}

const formRef = ref()
const reset = () => {
  formRef.value.resetFields()
  $emit('getList')
}



</script>

<template>
  <el-form v-if="form" inline :model="form" ref="formRef">
    <el-form-item v-for="item in form.column" :key="item.prop" :prop="item.prop" :label="item.label">
      <el-input v-if="item.type == 'text'" v-model="form[item.prop]" :placeholder="item.placeholder"></el-input>
      <el-date-picker v-if="item.type == 'time'" v-model="form.data.time" value-format="yyyy-MM-dd HH:mm:ss"
        type="datetimerange" range-separator="至" start-placeholder="开始时间" end-placeholder="结束时间">
      </el-date-picker>
      <el-select v-if="item.type == 'status'" v-model="form[item.prop]" :placeholder="item.placeholder">
        <el-option label="" value=""></el-option>
        <el-option label="" value=""></el-option>
      </el-select>
      <el-select v-if="item.type == 'auditStatus'" v-model="form[item.prop]" :placeholder="item.placeholder">
        <el-option label="" value=""></el-option>
        <el-option label="" value=""></el-option>
      </el-select>
      <el-select v-if="item.type == 'isAdmin'" v-model="form[item.prop]" :placeholder="item.placeholder">
        <el-option label="" value=""></el-option>
        <el-option label="" value=""></el-option>
      </el-select>
      <el-select v-if="item.type == 'isDisable'" v-model="form[item.prop]" :placeholder="item.placeholder">
        <el-option label="" value=""></el-option>
        <el-option label="" value=""></el-option>
      </el-select>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="$emit('getList')">查找</el-button>
      <el-button @click="reset">重置</el-button>
    </el-form-item>
  </el-form>

  <el-table :data="table.data">
    <el-table-column align="center" label="序号" type="index"></el-table-column>
    <el-table-column v-for="item in table.column" :key="item.prop" align="center" :label="item.label" :prop="item.prop">
      <template #default="scope">
        <slot :name="item.prop" :row="scope.row">{{ scope.row[item.prop] }}</slot>
      </template>
    </el-table-column>
  </el-table>

</template>

<style lang="less" scoped>

</style>