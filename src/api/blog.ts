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
  return request.get(`/user/getBlogList`, { params })
}

export const getBlogDetails = (blogId: string | number | string[]) => {
  return request.get(`/blog/${blogId}`)
}

export const getBlogDetails2 = (blogId: string | number | string[]) => {
  return request.get(`/admin/blog/${blogId}`)
}

export const handleBlog = (blogId: string | number, type: 0 | 1 | 2) => {
  return request.put(`/user/handleBlog?blogId=${blogId}&type=${type}`)
}

export const postBlog = (blog: FormData) => {
  return request.post(`/user/postBlog`, blog)
}

export const auditBlog = (blogId, status: 0 | 1 | 2) => {
  return request.put(`/admin/auditBlog?blogId=${blogId}&status=${status}`)
}

export const deleteBlog = (blogId) => {
  return request.delete(`/user/deleteBlog/${blogId}`)
}

export const updateBlog = (blog: FormData) => {
  return request.put(`/user/updateBlog`, blog)
}