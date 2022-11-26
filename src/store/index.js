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
      context.state.userInfo = res.data
    })
  },
  logout(context, that) {
    console.log(that)

    that.$xConfirm.show({
      msg: "此操作将会退出该账号，确定继续吗？",
      success: () => {
        $axios.myRequest.logout().then((res) => {
          console.log(res)

          sessionStorage.removeItem("userInfo");
          window.location.href = "/#"
          window.location.reload();
        })
      }
    })
  }
}

const mutations = {

}

const state = {
  userInfo: null,
  blogList: [],
  currentPage: 0,
  total: 100,
  progressWidth: 0,
}

const store = new Vuex.Store({
  actions,
  mutations,
  state
})

export default store