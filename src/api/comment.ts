import request from "@/util/request"

export const getCommentList = (blogId: string) => {
  request.get(`/getCommentsList?blogId=${blogId}`)
}