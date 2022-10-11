import Vue from 'vue'
import Vuex from 'vuex'
import $axios from "../assets/js/$axios";

Vue.prototype.$axios = $axios;
Vue.use(Vuex)

const actions = {
  refresh() {
    const getMyStarList = $axios.getMyStarList();
    const getMyUpList = $axios.getMyUpList();
    const getMyDownList = $axios.getMyDownList();

    return Promise.all([getMyStarList, getMyUpList, getMyDownList]);
  }
}

const mutations = {
  refresh(state, res) {
    state.myStarList = res[0].data.data;
    state.myUpList = res[1].data.data;
    state.myDownList = res[2].data.data;
  },
  logout(state) {
    sessionStorage.clear();
    state.userInfo = {
      isLogin: false,
      avatar: "../../assets/img/cover.webp",
      nickname: "点击登录",
    }
    window.location.reload();
  },
  togglePopup(state) {
    state.isShowPopup = !state.isShowPopup;
  }
}

const state = {
  userInfo: {
    isLogin: false,
    username: null,
    avatar: "../../assets/img/cover.webp",
    nickname: "点击登录",
  },
  myStarList: [],
  myUpList: [],
  myDownList: [],
  progressWidth: 0,
  isShowPopup: false,
}

const store = new Vuex.Store({
  actions,
  mutations,
  state
})

export default store