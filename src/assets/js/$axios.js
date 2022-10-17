import axios from "axios"

axios.defaults.baseURL = "http://localhost:8080"
// axios.defaults.headers = { 'Content-Type': 'application/json' }
axios.defaults.withCredentials = true
axios.defaults.timeout = 10000

const $axios = axios;

const login = (username, password) => { return $axios.post(`/login?username=${username}&password=${password}`) }

const logout = () => { return $axios.get("/user/logout") }

const getBlogList = (startIndex, pageSize) => { return $axios.get(`/getBlogByKeywords?startIndex=${startIndex}&pageSize=${pageSize}`) }

const getBlogByKeywords = (keywords, startIndex, pageSize) => { return $axios.get(`/getBlogByKeywords?keywords=${keywords}&startIndex=${startIndex}&pageSize=${pageSize}`) }

const getUserInfo = (username) => { return $axios.get(`/getUserInfo?username=${username}`) }

const getUserPostBlogList = (username, startIndex, pageSize) => { return $axios.get(`/getUserPostBlogList?username=${username}&startIndex=${startIndex}&pageSize=${pageSize}`) }

const getUserUpBlogList = (username, startIndex, pageSize) => { return $axios.get(`/getUserUpBlogList?username=${username}&startIndex=${startIndex}&pageSize=${pageSize}`) }

const getUserDownBlogList = (username, startIndex, pageSize) => { return $axios.get(`/getUserDownBlogList?username=${username}&startIndex=${startIndex}&pageSize=${pageSize}`) }

const getMyInfo = () => { return $axios.get(`user/getMyInfo`) }

const getMyPostList = (status, startIndex, pageSize) => {
  if (status === null) {
    return $axios.get(`user/getMyPostList?startIndex=${startIndex}&pageSize=${pageSize}`)
  }
  return $axios.get(`user/getMyPostList?status=${status}&startIndex=${startIndex}&pageSize=${pageSize}`)
}

const getMyStarList = (startIndex, pageSize) => { return $axios.get(`/user/getMyStarList?&startIndex=${startIndex}&pageSize=${pageSize}`) }

const getMyUpList = (startIndex, pageSize) => { return $axios.get(`/user/getMyUpList?&startIndex=${startIndex}&pageSize=${pageSize}`) }

const getMyDownList = (startIndex, pageSize) => { return $axios.get(`/user/getMyDownList?&startIndex=${startIndex}&pageSize=${pageSize}`) }

const getBlogDetails = (blogId) => { return $axios.get(`/getBlogDetails?id=${blogId}`) }

const up = (blogId) => { return $axios.put(`/user/upBlog?id=${blogId}`) }

const down = (blogId) => { return $axios.put(`/user/downBlog?id=${blogId}`) }

const star = (blogId) => { return $axios.put(`/user/starBlog?id=${blogId}`) }

const postComments = (data) => {
  return $axios.post("/user/postComments",data)
}

// const postBlog = (blog) => {
//   return $axios.put(`/user/starBlog?id=${obj.blogId}`)
// }

$axios.myRequest = {
  login, logout,
  getBlogList, getBlogByKeywords, getUserInfo, getUserPostBlogList, getUserUpBlogList, getUserDownBlogList, getMyInfo, getMyPostList, getMyStarList, getMyUpList, getMyDownList, getBlogDetails,
  up, down, star,
  postComments
}

export default $axios