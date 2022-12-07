import { ref } from 'vue'
import { defineStore } from 'pinia'

export const store = defineStore('counter', () => {
  const userInfo = ref<object>({})


  return { userInfo }
})
