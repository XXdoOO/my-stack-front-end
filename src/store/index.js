import Vue from 'vue'
import Vuex from 'vuex'
import axios from "axios";

axios.defaults.baseURL = "http://localhost:8080";
axios.defaults.withCredentials = true;

Vue.prototype.axios = axios;
Vue.use(Vuex)

const actions = {
  logout(context) {
    axios.get("/user/logout").then((res) => {
      console.log(res);

      context.commit("logout");
    });
  },
  up(context, blogId) {
    axios.put(`/user/upBlog?id=${blogId}`).then((res) => {
      console.log(res);

      context.commit("up");
    });
  }
}

const mutations = {
  logout(state) {
    state.userInfo = {
      isLogin: false,
      info: {
        avatar: "../../assets/img/cover.webp",
        nickname: "点击登录",
      }
    }
  },
  up(state){
    console.log(state.blogList);
  }
}

const state = {
  userInfo: {
    isLogin: false,
    info: {
      avatar: "../../assets/img/cover.webp",
      nickname: "点击登录",
    },
  },
  blogList: [],
  progressWidth: "10%",
}

const store = new Vuex.Store({
  actions,
  mutations,
  state
})

export default store