import Vue from 'vue'
import Vuex from 'vuex'
import axios from "axios";

axios.defaults.baseURL = "http://localhost:8080";
axios.defaults.withCredentials = true;

Vue.prototype.axios = axios;
Vue.use(Vuex)

const actions = {
  refresh(context) {
    const getMyStarList = axios.get("/user/getMyStarList");

    const getMyUpList = axios.get("/user/getMyUpList");

    const getMyDownList = axios.get("/user/getMyDownList");

    Promise.all([getMyStarList, getMyUpList, getMyDownList]).then((res) => {
      context.commit("refresh", res);
    })
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
        context.dispatch("refresh");
      });
    } else {
      context.commit('togglePopup');
    }
  },
  down(context, blogId) {
    if (context.state.userInfo.isLogin) {
      axios.put(`/user/downBlog?id=${blogId}`).then((res) => {
        console.log(res);
        context.dispatch("refresh");
      });
    } else {
      context.commit('togglePopup');
    }
  },
  star(context, blogId) {
    if (context.state.userInfo.isLogin) {
      axios.put(`/user/starBlog?id=${blogId}`).then((res) => {
        console.log(res);
        context.dispatch("refresh");
      });
    } else {
      context.commit('togglePopup');
    }
  },
}

const mutations = {
  refresh(state, res) {
    console.log(state);
    state.myStarList = res[0].data.data;
    state.myUpList = res[1].data.data;
    state.myDownList = res[2].data.data;

    // for (const star of state.myStarList) {
    //   for (const blog of state.blogList) {
    //     if (star.id === blog.id) {
    //       blog.isStar = true;
    //     }
    //   }
    // }

    // for (const up of state.myUpList) {
    //   for (const blog of state.blogList) {
    //     if (up.id === blog.id) {
    //       blog.isUp = true;
    //     }
    //   }
    // }

    // for (const down of state.myDownList) {
    //   for (const blog of state.blogList) {
    //     if (down.id === blog.id) {
    //       blog.isDown = true;
    //     }
    //   }
    // }
  },
  refreshHome() { },
  refresh() { },
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
  },
  togglePopup(state) {
    state.isShowPopup = !state.isShowPopup;
  }
}

const state = {
  userInfo: {
    username: null,
    avatar: "../../assets/img/cover.webp",
    nickname: "点击登录",
  },
  blogList: [],
  myStarList: [],
  myUpList: [],
  myDownList: [],
  progressWidth: "10%",
  isShowPopup: false
}

const store = new Vuex.Store({
  actions,
  mutations,
  state
})

export default store