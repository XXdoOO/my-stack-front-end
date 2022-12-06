import request from "@/util/request"

interface Login {
  email: string,
  password: string,
  code: string
}

export default {
  sendCode(email: string) {
    return request.get(`/sendCode?email=${email}`)
  },
  login(data: Login) {
    return request.post(`/login`, data)
  },
  register(data: Login)   {
    return request.post(`/register`, data)
  }
}