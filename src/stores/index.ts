import { ref } from 'vue'
import { defineStore } from 'pinia'
import { getUserInfo2 } from '@/api/user'

export const store = defineStore('counter', {
  state: () => ({
    userInfo: ref(),
    timeStamp: ref()
  }),
  actions: {
    setUserInfo() {
      console.log('获取用户信息')
      return getUserInfo2().then((data: any) => {
        this.userInfo = data
      }).catch(() => {
        this.removeUserInfo()
      })
    },
    removeUserInfo() {
      this.userInfo = undefined
    }
  }
})
