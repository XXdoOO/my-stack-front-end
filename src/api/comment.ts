import request from '@/util/request'

interface Page {
  pageNum?: string | number,
  pageSize?: string | number
}

interface Comment extends Page {
  blogId: string,
  parent?: string,
  orderBy?: string
}


export const getCommentList = (params: Comment) => {
  return request.get(`/getCommentsList`, { params: params })
}