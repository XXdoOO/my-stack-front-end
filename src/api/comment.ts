import request from '@/util/request'

interface Comment extends Page {
  blogId: string,
  parent?: string,
  orderBy?: string
}

export const getCommentList = (params: Comment) => {
  return request.get(`/getCommentsList`, { params })
}

export const getCommentList2 = (params?: {
  blogId?: string,
  content?: string,
  nickname?: string,
  startTime?: string,
  endTime?: string,
  isDeleted?: boolean
}) => {
  return request.get(`/admin/getCommentsList`, { params })
}

export const postComment = (data: {
  blogId: string | number,
  parent?: string | number,
  receiveId?: string | number,
  content: string
}) => {
  return request.post('/user/postComments', data)
}

export const deleteComment = (commentId: string | number) => {
  return request.delete(`/user/deleteComment/${commentId}`)
}

export const handleComment = (commentId: string | number, type: 0 | 1) => {
  return request.put(`/user/handleComment?commentId=${commentId}&type=${type}`)
}