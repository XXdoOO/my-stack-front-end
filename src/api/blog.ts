import request from "@/util/request"

export default {
  getBlogList(keywords: string = '') {
    return request.get(`/getBlogByKeywords?keywords=${keywords}`)
   }
}