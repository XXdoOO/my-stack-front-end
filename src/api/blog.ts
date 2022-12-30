import request from "@/util/request"

interface Blog extends Page {
  keywords?: string,
  authorId?: string | number,
  type?: number,
  title?: string,
  description?: string,
  authorNickname?: string,
  status?: string,
  createTime?: string,
}

export const getBlogList = (params: Blog = { pageSize: 5 }) => {
  return request.get(`/getBlogList`, { params })
}

export const getBlogList2 = (params: Blog = { pageSize: 5 }) => {
  return request.get(`/admin/getBlogList`, { params })
}

export const getBlogDetails = (blogId: string | number | string[]) => {
  return request.get(`/blog/${blogId}`)
}

export const handleBlog = (blogId: string | number, type: 0 | 1 | 2) => {
  return request.put(`/user/handleBlog?blogId=${blogId}&type=${type}`)
}

export const postBlog = (blog: FormData) => {
  return request.post(`/user/postBlog`, blog)
}