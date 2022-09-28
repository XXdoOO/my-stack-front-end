<template>
  <header class="header-block" :style="{
    top: scroll + 'px',
    'box-shadow':
      scroll === -70 ? 'none' : '0px 8px 25px 20px rgba(44, 16, 111, 0.06)',
  }">
    <div class="container">
      <router-link class="logo" to="/">
        <img src="../../assets/img/logo.png" alt="" width="35" />
        <span>稀土挖矿</span>
      </router-link>

      <nav>
        <router-link to="/" :class="{active: this.$route.path == '/'}">首页</router-link>
        <router-link to="/top" :class="{active: this.$route.path == '/top'}">热门</router-link>
        <router-link to="/user" :class="{active: this.$route}.path == '/user'">我的</router-link>
      </nav>

      <SearchInput />

      <router-link class="face" :to="isLogin ? '/logout' : '/loginRegister'">
        <img src="../../assets/img/logo.png" alt="" width="35" :hidden="!isLogin" />
        <span @mouseover="mouseoverLogout" @mouseout="mouseoutLogout" :style="{ '--loginMsg': loginMsg }"></span>
      </router-link>
    </div>
  </header>
</template>

<script>
import SearchInput from "../block/SearchInput.vue";

export default {
  name: "HeaderBlock",
  components: { SearchInput },
  data() {
    return {
      isLogin: false,
      links: [],
      user: {
        username: "用户名",
        avatar: "",
      },
      headerPosition: "relative",
      scrollTop: 0,
      scroll: 0,
    };
  },
  computed: {
    loginMsg() {
      return this.isLogin ? `'${this.user.username}'` : "'登录/注册'";
    },
  },
  methods: {
    mouseoverLogout() {
      console.log(this.isLogin);
      if (this.isLogin) {
        this.loginMsg = "'退出登录'";
      }
    },
    mouseoutLogout() {
      console.log(this.isLogin);
      if (this.isLogin) {
        this.loginMsg = "'用户名'";
      }
    },
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

  >div {
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

    nav {
      display: flex;
      width: 270px;
      height: 100%;
      justify-content: space-between;
      align-items: center;

      a {
        color: black;
        font-size: 20px;
        flex-grow: 1;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        transition: @transition-time;
      }

      a:hover, a.active {
        color: @theme-color;
        background-color: @gray-color;
      }
    }

    .face {
      display: inline-flex;
      justify-content: center;
      align-items: center;
      color: black;
      transition: @transition-time;

      img {
        border-radius: 50%;
      }

      span {
        margin-left: 10px;
      }

      span:before {
        content: var(--loginMsg);
      }
    }

    .face:hover {
      color: @theme-color;
    }
  }
}
</style>