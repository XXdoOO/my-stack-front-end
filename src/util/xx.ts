import { ElMessage, ElMessageBox } from 'element-plus'

import { enableItem, deleteItem } from '@/api/common'

export const handleDeleteItem = (table: string, type, name, id, tableRef) => {
  ElMessageBox.confirm(
    `确认删除 ${type} 为“${name}”的选项吗?`,
    '提示',
    {
      confirmButtonText: '确认',
      cancelButtonText: '取消',
      type: 'warning',
    }
  )
    .then(() => {
      deleteItem(table, id).then(() => {
        tableRef.getList()
        ElMessage({
          type: 'success',
          message: '删除成功',
        })
      })
    })
    .catch(() => {
      ElMessage({
        type: 'info',
        message: '取消删除',
      })
    })
}

export function handleEnableItem(table: string, type, name, row) {
  const text = row.enabled ? '启用' : '停用'
  ElMessageBox.confirm(
    `确认${text} ${type} 为“${name}”的选项吗?`,
    '提示',
    {
      confirmButtonText: '确认',
      cancelButtonText: '取消',
      type: 'warning',
    }
  )
    .then(() => {
      enableItem(table, row.id,).then(() => {
        ElMessage({
          type: 'success',
          message: '启用成功',
        })
      })
    })
    .catch(() => {
      row.enabled = !row.enabled
    })
}