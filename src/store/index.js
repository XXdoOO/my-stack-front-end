import Vue from 'vue'
import Vuex from 'vuex'
import axios from "axios";

axios.defaults.baseURL = "http://localhost:8080";
axios.defaults.withCredentials = true;

Vue.prototype.axios = axios;
Vue.use(Vuex)

const actions = {
  refresh() {
    const getMyStarList = axios.get("/user/getMyStarList");

    const getMyUpList = axios.get("/user/getMyUpList");

    const getMyDownList = axios.get("/user/getMyDownList");

    return Promise.all([getMyStarList, getMyUpList, getMyDownList]);
  },
  logout(context) {
    axios.get("/user/logout").then((res) => {
      console.log(res);

      context.commit("logout");
    });
  },
  up(context, blogId) {
    if (context.state.userInfo.isLogin) {
      axios.put(`/user/upBlog?id=${blogId}`).then((res) => {
        console.log(res);

        context.dispatch("refresh").then((res) => {
          context.commit("refresh", res);
        });
      });
    } else {
      context.commit('togglePopup');
    }
  },
  down(context, blogId) {
    if (context.state.userInfo.isLogin) {
      axios.put(`/user/downBlog?id=${blogId}`).then((res) => {
        console.log(res);

        context.dispatch("refresh").then((res) => {
          context.commit("refresh", res);
        });
      });
    } else {
      context.commit('togglePopup');
    }
  },
  star(context, blogId) {
    if (context.state.userInfo.isLogin) {
      axios.put(`/user/starBlog?id=${blogId}`).then((res) => {
        console.log(res);

        context.dispatch("refresh").then((res) => {
          

          
          context.commit("refresh", res);
        });
      });
    } else {
      context.commit('togglePopup');
    }
  },
}

const mutations = {
  refresh(state, res) {
    state.myStarList = res[0].data.data;
    state.myUpList = res[1].data.data;
    state.myDownList = res[2].data.data;
  },
  logout(state) {
    state.userInfo = {
      isLogin: false,
      info: {
        avatar: "../../assets/img/cover.webp",
        nickname: "点击登录",
      }
    }

    localStorage.clear();
  },
  up(state) {
    console.log(state.blogList);
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
  blogList: [],
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