import request from "@/util/request"

interface Blog extends Page {
  keywords?: string,
  authorId?: string | number,
  type?: number
}

export const getBlogList = (params: Blog = { pageSize: 5 }) => {
  return request.get(`/getBlogList`, { params })
}

export const getBlogDetails = (blogId: string | number | string[]) => {
  return request.get(`/blog/${blogId}`)
}