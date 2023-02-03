<script setup lang="ts">
import { ref, reactive, useSlots, watch, defineExpose, onUpdated } from 'vue'
import { Search, RefreshLeft } from '@element-plus/icons-vue'
import { getDictData } from '@/api/dict'

const $props = withDefaults(defineProps<{
  getList: Function,
  table: {
    form?: any,
    column: {
      label: string,
      prop: string,
      [propName: string]: any
    }[]
    data?: object[]
  },
  trigger?: boolean
}>(), {
  trigger: true
})

const $slots = useSlots()
console.log($slots);


const $emits = defineEmits(['expand-change'])
const formColumn = reactive<{ prop: string, label: string, type: 'text' | 'time' | 'date' | 'dict', placeholder: string }[]>([])
const dict = reactive({})
const loading = ref(true)
const total = ref(0)

const reqs = []
const column = []
const formRef = ref()

if ($props.trigger) {
  $props.table.column.map(item => {
    if (item.dict) {
      reqs.push(getDictData({ dictName: item.dict }))
      column.push(item.prop)
    }
  })

  Promise.all(reqs).then(res => {
    column.map((item, index) => {
      dict[item] = res[index].list
    })

    for (const prop in $props.table.form) {
      let label: string, placeholder = '请输入', type: 'text' | 'time' | 'date' | 'dict' = 'text'

      const temp = prop.toLowerCase()
      if (temp.includes('time')) {
        type = 'time'
        placeholder = '请选择'
      } else if (temp.includes('date')) {
        type = 'date'
        placeholder = '请选择'
      }

      for (const item of $props.table.column) {
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
    $props.table.form.pageNum = 1
    $props.table.form.pageSize = 10
  })
}

const reset = () => {
  formRef.value.resetFields()

  $props.table.form.pageNum = 1
  $props.table.form.pageSize = 10
  getList()
}

const matchDict = (dictName, value) => {
  return dict[dictName].find(item => item.value == value).label
}

const getList = () => {
  loading.value = true
  $props.getList($props.table.form).then((data) => {
    total.value = parseInt(data.total)
    $props.table.data = data.list
    loading.value = false
  })
}

watch(() => $props.table.form.pageNum, getList)
watch(() => $props.table.form.pageSize, () => {
  $props.table.form.pageNum = 1
  getList()
})
defineExpose({ getList })
</script>

<template >
  <el-form v-if="formColumn.length" inline :model="table.form" ref="formRef">
    <el-form-item v-for="item in formColumn" :key="item.prop" :prop="item.prop" :label="item.label">
      <el-input v-if="item.type == 'text'" v-model="table.form[item.prop]" @keydown.enter="getList"
        :placeholder="item.placeholder"></el-input>

      <el-date-picker v-if="item.type == 'time'" v-model="table.form[item.prop]" value-format="YYYY-MM-DD HH:mm:ss"
        type="datetimerange" range-separator="至" start-placeholder="开始时间" end-placeholder="结束时间">
      </el-date-picker>

      <el-select v-if="item.type == 'dict'" v-model="table.form[item.prop]" :placeholder="item.placeholder">
        <el-option v-for="i in dict[item.prop]" :label="i.label" :value="i.value"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="getList" :icon="Search">查找</el-button>
      <el-button @click="reset" :icon="RefreshLeft">重置</el-button>
    </el-form-item>
    <el-row v-if="$slots.default">
      <el-form-item>
        <slot></slot>
      </el-form-item>
    </el-row>
  </el-form>

  <div v-loading="loading">
    <el-table :data="table.data" @expand-change="$emits('expand-change', $event)">
      <el-table-column v-if="$slots.expand" align="center" type="expand" width="50px">
        <template #default="scope">
          <slot name="expand" :row="scope.row">666</slot>
        </template>
      </el-table-column>

      <el-table-column align="center" label="序号" type="index" min-width="50px"></el-table-column>

      <el-table-column v-for="item in table.column" :key="item.prop" align="center" :label="item.label"
        :prop="item.prop" :width="item.width" :min-width="item.minWidth">
        <template #default="scope">
          <slot :name="item.prop" :row="scope.row"
            :label="item.dict ? matchDict(item.prop, scope.row[item.prop]) : scope.row[item.prop]">{{
              item.dict ? matchDict(item.prop, scope.row[item.prop]) : scope.row[item.prop]
            }}</slot>
        </template>
      </el-table-column>
    </el-table>

    <el-pagination class="pagination" v-model:current-page="table.form.pageNum" v-model:page-size="table.form.pageSize"
      background layout="total, sizes, prev, pager, next" :total="total" />
  </div>
</template>

<style lang="less" scoped>
.pagination {
  padding: 20px;
  justify-content: end;
}
</style>