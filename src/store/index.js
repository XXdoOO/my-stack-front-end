import Vue from 'vue'
import Vuex from 'vuex'
import $axios from "../assets/js/$axios";

Vue.prototype.$axios = $axios;
Vue.use(Vuex)

const actions = {
  modifyList(context, obj) {
    const opt = obj.opt
    const index = obj.index

    console.log(index, opt)

    if (opt === "delete") {
      context.state.blogList.splice(index, 1)

      context.dispatch("setMyInfo")
    } else {
      const item = context.state.blogList[index]
      const key = opt.slice(2, opt.lenght).toLowerCase()

      item[opt] = !item[opt]

      if (item[opt]) {
        item[key]++
      } else {
        item[key]--
      }
    }
  },
  setMyInfo(context) {
    $axios.myRequest.getMyInfo().then((res) => {
      console.log(res)
      context.state.userInfo = res.data.data
      context.state.userInfo.isLogin = true
    })
  }
}

const mutations = {

}

const state = {
  userInfo: {
    isLogin: false,
    username: null,
    avatar: null,
    nickname: "登录/注册",
    identity: false
  },
  blogList: [],
  total: 100,
  
  progressWidth: 0,
}

const store = new Vuex.Store({
  actions,
  mutations,
  state
})

export default store