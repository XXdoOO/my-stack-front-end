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
        title: ''
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

const formColumn = reactive<{ prop: string, label: string, type: 'text' | 'time' | 'select', placeholder: string }[]>([])
const dict = reactive([])

if (props.table.form) {
  for (const prop in props.table.form) {
    let prefix = '请'
    let label: string, type: 'text' | 'time' | 'select', placeholder = '请'
    for (const item of props.table.column) {
      if (item.prop == prop || item.prop == prop.split('$')[0]) {
        label = item.label
        break
      }
    }

    const temp = prop.toLowerCase()
    if (temp.includes('time')) {
      type = 'time'
      placeholder += '选择'
    } else if (temp.includes('$')) {
      type = 'select'
      placeholder += '选择'

      getDictData({
        dictName: temp.split('$')[1]
      }).then((data: any) => {
        console.log(data);
        data.list.map(item => {
          dict.push({
            label: item.label,
            value: item.value
          })
        })
      })
    } else {
      type = 'text'
      placeholder += '输入'
    }
    placeholder += label

    formColumn.push({
      prop,
      label,
      type,
      placeholder
    })
  }
}

const formRef = ref()
const reset = () => {
  formRef.value.resetFields()
  $emit('getList')
}



</script>

<template>
  <el-form v-if="table.form" inline :model="table.form" ref="formRef">
    <el-form-item v-for="item in formColumn" :key="item.prop" :prop="item.prop" :label="item.label">
      <el-input v-if="item.type == 'text'" v-model="table.form[item.prop]" :placeholder="item.placeholder"></el-input>
      <el-date-picker v-if="item.type == 'time'" v-model="table.form[item.prop]" value-format="yyyy-MM-dd HH:mm:ss"
        type="datetimerange" range-separator="至" start-placeholder="开始时间" end-placeholder="结束时间">
      </el-date-picker>
      <el-select v-if="item.type == 'select'" v-model="table.form[item.prop]" :placeholder="item.placeholder">
        <el-option v-for="item in dict" :label="item.label" :value="item.value"></el-option>
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