import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    isLogin: false,
    user: {
      avatar: "../../assets/img/cover.webp",
      nickname: "未登录",
    },
    progressWidth: "10%",
  }
})

export default store