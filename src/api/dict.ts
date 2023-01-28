import request from '@/util/request'
import qs from 'qs'

interface DictDTO extends Page {
  dictName?: string,
  label?: string,
  value?: string,
  createTime?: string[],
  enabled?: boolean
}

export const getDictType = (dictType?: DictDTO) => {
  console.log(qs.stringify(dictType));

  return request.get(`/admin/dictType?${qs.stringify(dictType)}`)
}

export const postDictType = (dictType: DictDTO) => {
  return request.post(`/admin/dictType`, dictType)
}

export const putDictType = (dictType: DictDTO) => {
  return request.put(`/admin/dictType`, dictType)
}

export const deleteDictType = (dictTypeId: string) => {
  return request.delete(`/admin/dictType/${dictTypeId}`)
}


export const getDictData = (dictData: DictDTO) => {
  return request.get(`/admin/dictData`, { params: dictData })
}

export const postDictData = (dictData: DictDTO) => {
  return request.post(`/admin/dictData`, dictData)
}

export const putDictData = (dictData: DictDTO) => {
  return request.put(`/admin/dictData`, dictData)
}

export const deleteDictData = (dictTypeId: string) => {
  return request.delete(`/admin/dictData/${dictTypeId}`)
}