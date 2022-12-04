import request from "@/util/request"

export default {
  sendCode(email) {
    return request.get(`/sendCode?email=${email}`)
  },
  login(data) {
    return request.post(`/login`, data)
  },
  register(data) {
    return request.post(`/register`, data)
  }
}