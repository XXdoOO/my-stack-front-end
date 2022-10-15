import axios from "axios"

axios.defaults.baseURL = "http://localhost:8080"
axios.defaults.withCredentials = true
axios.defaults.timeout = 10000

const $axios = axios;

const login = (username, password) => { return $axios.post(`/login?username=${username}&password=${password}`) }

const logout = () => { return $axios.get("/user/logout") }

const getBlogList = (startIndex, pageSize) => { return $axios.get(`/getBlogByKeywords?startIndex=${startIndex}&pageSize=${pageSize}`) }

const getBlogByKeywords = (keywords, startIndex, pageSize) => { return $axios.get(`/getBlogByKeywords?keywords=${keywords}&startIndex=${startIndex}&pageSize=${pageSize}`) }

const getUserInfo = (username) => { return $axios.get(`/getUserInfo?username=${username}`) }

const getUserPostBlogList = (username) => { return $axios.get(`/getUserPostBlogList?username=${username}`) }

const getUserUpBlogList = (username) => { return $axios.get(`/getUserUpBlogList?username=${username}`) }

const getUserDownBlogList = (username) => { return $axios.get(`/getUserDownBlogList?username=${username}`) }

const getMyStarList = () => { return $axios.get("/user/getMyStarList") }

const getMyUpList = () => { return $axios.get("/user/getMyUpList") }

const getMyDownList = () => { return $axios.get("/user/getMyDownList") }

const getBlogDetails = (blogId) => { return $axios.get(`/getBlogDetails?id=${blogId}`) }

const up = (blogId) => { return $axios.put(`/user/upBlog?id=${blogId}`) }

const down = (blogId) => { return $axios.put(`/user/downBlog?id=${blogId}`) }

const star = (blogId) => { return $axios.put(`/user/starBlog?id=${blogId}`) }

// const postBlog = (blog) => {
//   return $axios.put(`/user/starBlog?id=${obj.blogId}`)
// }

$axios.myRequest = { login, logout, getBlogList, getBlogByKeywords, getUserInfo, getUserPostBlogList, getUserUpBlogList, getUserDownBlogList, getMyStarList, getMyUpList, getMyDownList, getBlogDetails, up, down, star }

export default $axios