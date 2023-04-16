import { ElMessage, ElMessageBox } from 'element-plus'

export const handleDeleteItem = (func: Function, type, name, id, tableRef) => {
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
      func(id).then(() => {
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

export function handleEnableItem(func: Function, type, name, row) {
  const text = row.enabled ? '启用' : '停用'

  return ElMessageBox.confirm(
    `确认${text} ${type} 为“${name}”的选项吗?`,
    '提示',
    {
      confirmButtonText: '确认',
      cancelButtonText: '取消',
      type: 'warning',
    }
  )
    .then(() => {
      return func(row.id)
    })
    .then(() => {
      ElMessage({
        type: 'success',
        message: `${text}成功`,
      })
    })
    .catch(() => {
      row.enabled = !row.enabled
      ElMessage({
        type: 'success',
        message: `${text}失败`,
      })
    })
}

export const handleIcon = (item, type) => {
  if (type == 0) {
    if (item.isUp) {
      item.up--
    } else {
      item.up++
    }
    item.isUp = !item.isUp
  } else if (type == 1) {
    if (item.isDown) {
      item.down--
    } else {
      item.down++
    }
    item.isDown = !item.isDown
  }
  else if (type == 2) {
    if (item.isStar) {
      item.star--
    } else {
      item.star++
    }
    item.isStar = !item.isStar
  }
}