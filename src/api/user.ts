import request from "@/util/request"
import qs from 'qs'

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

export const getUserList = (params) => {
  return request.get(`/admin/getUserList?${qs.stringify(params)}`)
}

export const getUserInfo = (userId) => {
  return request.get(`/getUserInfo/${userId}`)
}

export const getUserInfo2 = () => {
  return request.get(`/user/userInfo`)
}

export const disableUser = (disable: { userId: string, enabled: boolean, reason: string, minutes: string }) => {
  return request.put(`/admin/disableUser`, disable)
}

export const updateInfo = (user: FormData) => {
  return request.put(`/user/updateInfo`, user)
}

export const uploadImage = (image: FormData) => {
  return request.post(`/user/uploadImage`, image)
}