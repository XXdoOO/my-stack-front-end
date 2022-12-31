import request from "@/util/request"

interface Login {
  email: string,
  password: string,
  code: string
}

interface User {
  nickname?: string,
  status?: number | string,
  isAdmin?: boolean,
  startTime?: string,
  endTime?: string
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

export const getUserList = (params: User) => {
  return request.get(`/admin/getUserList`, { params })
}

export const getUserInfo = (userId) => {
  return request.get(`/user/${userId}`)
}