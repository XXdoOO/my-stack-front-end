import request from '@/util/request'

interface Comment extends Page {
  blogId: string,
  parent?: string,
  orderBy?: string
}

export const getCommentList = (params: Comment) => {
  return request.get(`/getCommentsList`, { params })
}

export const postComment = (data: {
  blogId: string | number,
  parent?: string | number,
  receiveId?: string | number,
  content: string
}) => {
  return request.post('/user/postComments', data)
}
