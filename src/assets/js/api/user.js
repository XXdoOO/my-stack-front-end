import axios from "axios"

axios.defaults.baseURL = "http://localhost:8080"
axios.defaults.withCredentials = true
axios.defaults.timeout = 10000

export default {
  sendCode(email) {
    return axios.get(`/sendCode?email=${email}`)
  },
  login(data) {
    return axios.post(`/login`, data)
  },
  register(data) {
    return axios.post(`/register`, data)
  }
}