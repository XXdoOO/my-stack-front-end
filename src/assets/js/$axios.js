import axios from "axios";

const $axios = axios.create({
  baseURL: "http://localhost:8080",
  withCredentials: true,
  timeout: 10000
});

const login = (username, password) => { return $axios.post(`/login?username=${username}&password=${password}`) }

const logout = () => { return $axios.get("/user/logout") }

const getMyStarList = () => { return $axios.get("/user/getMyStarList") }

const getMyUpList = () => { return $axios.get("/user/getMyUpList") }

const getMyDownList = () => { return $axios.get("/user/getMyDownList") }

const up = (blogId) => { return $axios.put(`/user/upBlog?id=${blogId}`) }

const down = (blogId) => { return $axios.put(`/user/downBlog?id=${blogId}`) }

const star = (blogId) => { return $axios.put(`/user/starBlog?id=${blogId}`) }

// const postBlog = (blog) => {
//   return $axios.put(`/user/starBlog?id=${obj.blogId}`)
// }

$axios.myRequest = { login, logout, getMyStarList, getMyUpList, getMyDownList, up, down, star }

export default $axios