import { ref } from 'vue'
import { defineStore } from 'pinia'

export const store = defineStore('counter', () => {
  const userInfo = ref()


  return { userInfo }
})
