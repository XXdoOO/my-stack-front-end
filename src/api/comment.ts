import request from '@/util/request'
import qs from 'qs'

export const getCommentList = (data: { blogId: string, parent?: string, orderBy?: string }) => {
  return request.get(`/getCommentsList?${qs.stringify(data)}`)
}