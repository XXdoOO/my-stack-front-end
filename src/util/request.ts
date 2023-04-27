import axios from "axios"
import LoginRegister from '@/components/login'
import xMessage from '@/components/message/index'
import { store } from '@/stores/index'
import pinia from '@/stores/pinia'
import { storeToRefs } from 'pinia'

const $store = store(pinia)
const setUserInfo = $store.setUserInfo
const removeUserInfo = $store.removeUserInfo
const { userInfo } = storeToRefs($store)

axios.defaults.baseURL = "/api"
axios.defaults.withCredentials = true
axios.defaults.timeout = 10000

const CancelToken = axios.CancelToken
const source = CancelToken.source()
const urls = ['/user/handleBlog', '/user/postBlog', '/admin/auditBlog', '/user/deleteBlog', '/user/updateInfo']
let isTokenRefreshing = false
let subscriberList = []

axios.interceptors.request.use((req) => {
  if (isTokenRefreshing && req.url != '/user/getToken') {
    return new Promise((resolve) => {
      subscriberList.push(() => {
        req.headers.token = localStorage.getItem('token')
        resolve(req)
      })
    })
  }

  req.headers.token = localStorage.getItem('token')
  if (/^\/user/.test(req.url) && !userInfo || /^\/admin/.test(req.url) && !userInfo.value.admin) {
    LoginRegister()
    source.cancel()
  } else {
    start()
    return req
  }
}, (error) => {
  xMessage({
    type: 'error',
    message: error.message,
  })
})

axios.interceptors.response.use((res) => {
  done()

  if (res.status == 201 && !isTokenRefreshing) {
    isTokenRefreshing = true
    axios({
      headers: {
        token: localStorage.getItem('token')
      },
      url: '/user/getToken'
    }).then((data: any) => {
      localStorage.setItem('token', data)
      isTokenRefreshing = false

      subscriberList.map(cb => cb())
      subscriberList = []
    })
  }

  if (res.data.code == 200) {
    if (urls.some(item => RegExp('^' + item).test(res.config.url))) {
      setUserInfo()
    }

    return Promise.resolve(res.data.data)
  } else if (res.data.code == 403) {
    if (res.config.url != '/user/userInfo') {
      localStorage.removeItem('token')
      removeUserInfo()

      LoginRegister()
    }
  }

  return Promise.reject(res.data.msg)
}, (error) => {
  done()

  if (error.code === 'ECONNABORTED' && error.message.indexOf('timeout') !== -1) {
    xMessage({
      message: error.message,
      type: 'error',
    })
    return Promise.reject("请求超时")
  } else if (error.message.includes("cancelToken") != -1) {
    return Promise.reject("用户未登录")
  } else {
    xMessage({
      message: error.message,
      type: 'error',
    })
    return Promise.reject("其他错误")
  }
})

let timer

const start = () => {
  const progress: HTMLElement | null = document.querySelector('.header-block')

  progress?.style.setProperty('--transition-time', '.3s')

  let progressWidth = 0

  clearInterval(timer)
  timer = setInterval(() => {
    progress?.style.setProperty('--progress-width', progressWidth + '%')

    if (progressWidth < 70) {
      progressWidth += Math.random() * 5
    }
  }, 300)
}

const done = () => {
  clearInterval(timer)

  const progress: HTMLElement | null = document.querySelector('.header-block')

  progress?.style.setProperty('--transition-time', '0')
  progress?.style.setProperty('--progress-width', '100%')

  setTimeout(() => {
    progress?.style.setProperty('--progress-width', '0')
  }, 200)
}

export default axios