import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  mutations: {
    logout(state) {
      this.axios.get("/user/logout").then((res) => {
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