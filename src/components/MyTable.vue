<script setup lang="ts">
import { ref, reactive, useSlots } from 'vue'
import { getDictData } from '@/api/dict'

const props = withDefaults(defineProps<{
  table?: {
    form?: any,
    column: {
      label: string,
      prop: string
    }[]
    data: object[]
  }
}>(), {
  table: () => {
    return {
      form: {
        column: [{ label: '标题', prop: 'title', type: 'text' }],
        data: {
          title: ''
        }
      },
      column: [
        { label: '标题', prop: 'title' }
      ],
      data: [{}]
    }
  },
})
const $slots = useSlots()
const $emit = defineEmits(['getList'])

const formColumn = reactive<{ prop: string, label: string, type: 'text' | 'time', placeholder: string }[]>([])


if (props.table.form) {
  for (const prop in props.table.form) {
    let prefix = '请'
    let label
    let type
    for (const item of props.table.column) {
      if (item.prop == prop) {
        label = item.label
        break
      }
    }

    const temp = prop.toLowerCase()
    if (temp.includes('time')) {
      type = 'time'
    } else if (temp.includes('_')) {
      type = 'time'
    } else {
      type = 'text'
    }
    if (item.type == 'text') {
      prefix += '输入'
    } else {
      prefix += '选择'
    }
  }
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
      <el-select v-if="item.type == 'isDeleted'" v-model="form[item.prop]" :placeholder="item.placeholder">
        <el-option label="" value=""></el-option>
        <el-option label="" value=""></el-option>
      </el-select>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="$emit('getList')">查找</el-button>
      <el-button @click="reset">重置</el-button>
    </el-form-item>
    <el-row v-if="$slots.default">
      <el-form-item>
        <slot></slot>
      </el-form-item>
    </el-row>
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