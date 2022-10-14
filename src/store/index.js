import Vue from 'vue'
import Vuex from 'vuex'
import $axios from "../assets/js/$axios";

Vue.prototype.$axios = $axios;
Vue.use(Vuex)

const actions = {
  refresh() {
    const getMyStarList = $axios.myRequest.getMyStarList()
    const getMyUpList = $axios.myRequest.getMyUpList()
    const getMyDownList = $axios.myRequest.getMyDownList()

    return Promise.all([getMyStarList, getMyUpList, getMyDownList])
  },
}

const mutations = {
  refresh(state, res) {
    state.myStarList = res[0].data.data;
    state.myUpList = res[1].data.data;
    state.myDownList = res[2].data.data;
  },
  togglePopup(state) {
    state.isShowPopup = !state.isShowPopup;
  }
}

const state = {
  userInfo: {
    isLogin: false,
    username: null,
    avatar: null,
    nickname: "登录/注册",
    identity: false
  },
  myStarList: [],
  myUpList: [],
  myDownList: [],
  progressWidth: 0,
}

const store = new Vuex.Store({
  actions,
  mutations,
  state
})

export default store