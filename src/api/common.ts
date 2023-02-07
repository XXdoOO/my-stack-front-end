import request from '@/util/request'
import qs from 'qs'

export const enableItem = (table: string, id: string | number) => {
  return request.put(`/admin/enabledItem?table=${table}&id=${id}`)
}

export const deleteItem = (table: string, id: string | number) => {
  return request.delete(`/admin/deleteItem?table=${table}&id=${id}`)
}