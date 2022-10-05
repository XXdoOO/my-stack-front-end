import Vue from 'vue'
import Vuex from 'vuex'
import axios from "axios";

axios.defaults.baseURL = "http://localhost:8080";
axios.defaults.withCredentials = true;

Vue.prototype.axios = axios;
Vue.use(Vuex)

const store = new Vuex.Store({
  mutations: {
    logout(state) {
      axios.get("/user/logout").then((res) => {
        console.log(res);
        state.userInfo = {
          isLogin: false,
          info: {
            avatar: "../../assets/img/cover.webp",
            nickname: "点击登录",
          },
        }
      });
    }
  },
  state: {
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
})

export default store