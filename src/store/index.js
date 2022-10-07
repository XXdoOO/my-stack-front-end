import Vue from 'vue'
import Vuex from 'vuex'
import axios from "axios";

axios.defaults.baseURL = "http://localhost:8080";
axios.defaults.withCredentials = true;

Vue.prototype.axios = axios;
Vue.use(Vuex)

const actions = {
  login(context) {
    const getMyStarList = axios.get("/user/getMyStarList");

    const getMyUpList = axios.get("/user/getMyUpList");

    const getMyDownList = axios.get("/user/getMyDownList");

    Promise.all([getMyStarList, getMyUpList, getMyDownList]).then((res) => {
      console.log(res);
      context.commit("login", res);
    })
  },
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
  login(state, res) {
    console.log(state);
    let myStarList = res[0].data.data;
    let myUpList = res[1].data.data;
    let myDownList = res[2].data.data;

    for (const star of myStarList) {
      for (const blog of state.blogList) {
        if (star.id === blog.id) {
          blog.isStar = true;
        }
      }
    }

    for (const up of myUpList) {
      for (const blog of state.blogList) {
        if (up.id === blog.id) {
          blog.isUp = true;
        }
      }
    }

    for (const down of myDownList) {
      for (const blog of state.blogList) {
        if (down.id === blog.id) {
          blog.isDown = true;
        }
      }
    }
  },
  logout(state) {
    state.userInfo = {
      isLogin: false,
      info: {
        avatar: "../../assets/img/cover.webp",
        nickname: "点击登录",
      }
    }
  },
  up(state) {
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