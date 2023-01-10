<script setup lang="ts">
import { ref, reactive, useSlots } from 'vue'
import { getDictData } from '@/api/dict'

const props = withDefaults(defineProps<{
  table?: {
    form?: object,
    column?: {
      label: string,
      prop: string,
      dict?: string
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

const formColumn = reactive<{ prop: string, label: string, type: 'text' | 'time' | 'date' | 'dict', placeholder: string }[]>([])
const dict = reactive({})


const reqs = []
const column = []
props.table.column.map(item => {
  if (item.dict) {
    reqs.push(getDictData({ dictName: item.dict }))
    column.push(item.prop)
  }
})

Promise.all(reqs).then(res => {
  column.map((item, index) => {
    dict[item] = res[index].list
  })

  if (props.table.form) {
    for (const prop in props.table.form) {
      let label: string, placeholder = '请输入', type: 'text' | 'time' | 'date' | 'dict' = 'text'

      const temp = prop.toLowerCase()
      if (temp.includes('time')) {
        type = 'time'
        placeholder = '请选择'
      } else if (temp.includes('date')) {
        type = 'date'
        placeholder = '请选择'
      }

      for (const item of props.table.column) {
        if (prop == item.prop) {
          label = item.label

          if (item.dict) {
            type = 'dict'
            placeholder = '请选择'
          }
        }
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
})

const formRef = ref()
const reset = () => {
  formRef.value.resetFields()
  $emit('getList')
}

const matchDict = (dictName, value) => {
  return dict[dictName].find(item => item.value == value).label
}

</script>

<template >
  <el-form v-if="formColumn.length > 0 && table.data.length > 0" inline :model="table.form" ref="formRef">
    <el-form-item v-for="item in formColumn" :key="item.prop" :prop="item.prop" :label="item.label">
      <el-input v-if="item.type == 'text'" v-model="table.form[item.prop]" :placeholder="item.placeholder"></el-input>

      <el-date-picker v-if="item.type == 'time'" v-model="table.form[item.prop]" value-format="YYYY-MM-DD HH:mm:ss"
        type="datetimerange" range-separator="至" start-placeholder="开始时间" end-placeholder="结束时间">
      </el-date-picker>

      <el-select v-if="item.type == 'dict'" v-model="table.form[item.prop]" :placeholder="item.placeholder">
        <el-option v-for="i in dict[item.prop]" :label="i.label" :value="i.value"></el-option>
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

  <el-table v-if="formColumn.length > 0 && table.data.length > 0" :data="table.data">
    <el-table-column align="center" label="序号" type="index" min-width="50px"></el-table-column>
    <el-table-column v-for="item in table.column" :key="item.prop" align="center" :label="item.label" :prop="item.prop">
      <template #default="scope">
        <slot :name="item.prop" :row="scope.row"
          :label="item.dict ? matchDict(item.prop, scope.row[item.prop]) : scope.row[item.prop]">{{
  item.dict ? matchDict(item.prop, scope.row[item.prop]) : scope.row[item.prop]
          }}</slot>
      </template>
    </el-table-column>
  </el-table>

</template>

<style lang="less" scoped>

</style>