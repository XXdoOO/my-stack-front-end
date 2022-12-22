import request from "@/util/request"

interface Login {
  email: string,
  password: string,
  code: string
}

export const sendCode = (email: string) => {
  return request.get(`/sendCode?email=${email}`)
}

export const login = (data: Login) => {
  return request.post(`/login`, data)
}

export const logout = () => {
  return request.get('/user/logout')
}

export const register = (data: Login) => {
  return request.post(`/register`, data)
}