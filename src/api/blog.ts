import request from "@/util/request"

export const getBlogList = (keywords: string = '') => {
  return request.get(`/getBlogByKeywords?keywords=${keywords}`)
}

export const getBlogDetails = (blogId: string | number | string[]) => {
  return request.get(`/blog/${blogId}`)
}