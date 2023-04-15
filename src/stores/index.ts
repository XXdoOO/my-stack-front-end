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
      getUserInfo2().then(data => {
        this.userInfo = data
      })
    },
    removeUserInfo() {
      this.userInfo = undefined
    }
  }
})
