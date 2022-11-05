<template>
  <header class="header-block" :style="{
    top: scroll + 'px',
    'box-shadow':
      scroll === -70 ? 'none' : '0px 8px 25px 20px rgba(44, 16, 111, 0.06)',
    '--progress-width': $store.state.progressWidth + '%',
    '--transition-time': $store.state.progressWidth == 100 || $store.state.progressWidth == 0 ? '0s' : '1s'
  }">
    <div class="container">
      <router-link class="logo" to="/">
        <img src="../../assets/img/logo.png" alt="" width="35" />
        <span>煤土挖矿</span>
      </router-link>

      <nav>
        <router-link to="/" :class="{ active: $route.path == '/' }">首页</router-link>
        <router-link to="/top" :class="{ active: $route.path == '/top' }">热门</router-link>
        <router-link to="/my/pass" :class="{ active: $route.path.split('/')[1] == 'my' }">我的</router-link>
      </nav>

      <SearchInput />

      <span class="login" v-if="!userInfo" @click="$loginRegister.showLoginRegister()">登录/注册</span>
      <div class="my" v-if="userInfo">
        <img :src="userInfo.avatar" alt="" width="50" height="50">

        <div class="hover-popup">
          <span class="nickname">{{ userInfo.nickname }}</span>
          <nav class="my-count">
            <router-link :to="`/my/pass`">
              <span>{{ userInfo.passCount }}</span>
              <span>已发布</span>
            </router-link>
            <router-link :to="`/my/up`">
              <span>{{ userInfo.upCount }}</span>
              <span>顶过</span>
            </router-link>
            <router-link :to="`/my/down`">
              <span>{{ userInfo.downCount }}</span>
              <span>踩过</span>
            </router-link>
          </nav>
          <router-link class="my-menu" to="/my/pass">个人中心</router-link>
          <router-link class="my-menu" to="/admin/blogList" v-if="userInfo.identity">管理后台</router-link>
          <router-link class="create-btn" to="/user/edit">开始创作</router-link>
          <button class="my-menu" @click="logout">退出登录</button>
        </div>
      </div>

    </div>

  </header>
</template>

<script>
import SearchInput from "../block/SearchInput.vue";
import { mapState } from "vuex";

export default {
  name: "HeaderBlock",
  components: { SearchInput },
  data() {
    return {
      links: [],
      headerPosition: "relative",
      scrollTop: 0,
      scroll: 0,
    };
  },
  computed: {
    ...mapState(["userInfo"])
  },
  methods: {
    logout() {
      this.$axios.myRequest.logout().then((res) => {
        console.log(res)

        sessionStorage.removeItem("userInfo");
        this.$router.push("/")
        window.location.reload();
      })
    }
  },
  mounted() {
    window.addEventListener("scroll", () => {
      let scrollTop =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop;
      let scroll = scrollTop - this.scrollTop;
      this.scrollTop = scrollTop;

      if (scroll < 0) {
        // 鼠标上滚
        this.scroll = this.scroll - scroll > 0 ? 0 : this.scroll - scroll;
      } else {
        // 鼠标下滚
        this.scroll = this.scroll - scroll < -70 ? -70 : this.scroll - scroll;
      }
    });
  },
};
</script>

<style lang="less" scoped>
.header-block {
  position: fixed;
  top: 0;
  width: 100%;
  height: 70px;
  margin: 0 auto;
  background-color: white;
  box-shadow: @shadow-color;
  z-index: 999;
  box-sizing: content-box;

  >.container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 100%;

    .logo {
      display: inline-flex;
      justify-content: center;
      align-items: center;

      span {
        margin-left: 10px;
        transition: @transition-time;
        color: black;
        font-size: 30px;
      }
    }

    .logo:hover span {
      color: @theme-color;
    }

    >nav {
      display: flex;
      width: 270px;
      height: 100%;
      justify-content: space-between;
      align-items: center;

      a {
        position: relative;
        color: black;
        font-size: 20px;
        flex-grow: 1;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        transition: @transition-time;
      }

      a:after {
        content: "";
        position: absolute;
        bottom: 15px;
        width: 0;
        height: 2.5px;
        border-radius: 50px;
        background-color: @theme-color;
        transition: @transition-time;
      }

      a:hover,
      a.active {
        color: @theme-color;
      }

      a:hover:after,
      a.active:after {
        width: 30%;
      }
    }

    .login {
      cursor: pointer;
      transition: @transition-time;
    }

    .login:hover {
      color: @theme-color;
    }

    .my {
      display: flex;
      position: relative;
      align-items: center;
      justify-content: space-between;
      cursor: pointer;
      transition: @transition-time;
      width: 100px;

      img {
        position: absolute;
        top: -25px;
        border-radius: 100%;
        transition: @transition-time;
        z-index: 1000;
      }

      .hover-popup {
        position: absolute;
        top: 15px;
        left: -60px;
        display: flex;
        visibility: hidden;
        opacity: 0;
        flex-direction: column;
        background-color: white;
        padding: 35px 0 15px 0;
        border-radius: 5px;
        width: 180px;
        z-index: 999;
        transition: @transition-time;
        box-shadow: @shadow-color;

        .nickname {
          text-align: center;
        }

        .my-count {
          display: flex;
          justify-content: space-between;
          margin-top: 15px;
          padding: 0 15px 12px 15px;
          border-bottom: 2px solid @gray-color;

          a {
            display: inline-flex;
            flex-direction: column;
            transition: @transition-time;

            span {
              text-align: center;
            }

            span:nth-child(2) {
              color: @gray-color-dep;
              font-size: 13px;
            }
          }

          a:hover span {
            color: @theme-color;
          }
        }

        .my-menu {
          padding: 10px 15px;
          cursor: pointer;
          transition: @transition-time;
          font-size: 14px;
        }

        .my-menu:hover {
          background-color: @gray-color;
          color: @theme-color;
        }

        .my-menu:first-of-type {
          margin-top: 10px;
        }

        button.my-menu {
          width: 80%;
          margin: 0 auto;
          border-radius: 5px;
          border: 1px solid red;
          color: red;
          background-color: white;
          transition: @transition-time;
          padding: 5px;
          font-size: 15px;
          font-weight: 500;
        }

        button.my-menu:hover {
          background-color: red;
          color: white;
        }

        .create-btn {
          width: 80%;
          margin: 10px auto 0 auto;
          border-radius: 5px;
          background-color: @theme-color;
          border: 1px solid @theme-color;
          color: white;
          text-align: center;
          padding: 5px;
          font-size: 15px;
          font-weight: 500;
        }
      }

      .hover-popup:hover {
        display: flex;
      }
    }

    .my:hover {
      color: @theme-color;
    }

    .my:hover img {
      top: -15px;
      width: 60px;
      height: 60px;
    }

    .my:hover .hover-popup {
      visibility: visible;
      opacity: 1;
    }
  }
}

.header-block:after {
  content: "";
  display: block;
  width: var(--progress-width);
  height: 3px;
  background-color: @theme-color;
  transition: var(--transition-time);
  box-shadow: 0 5px 10px @theme-color;
}
</style>