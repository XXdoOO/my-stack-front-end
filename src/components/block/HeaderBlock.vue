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
        <router-link to="/my" :class="{active: this.$route.path == '/my'}">我的</router-link>
      </nav>

      <SearchInput />

      <div class="face" @click="isLogin ? logout() : loginRegister()">
        {{loginMsg }}
      </div>
    </div>

    <LoginRegister :isShowPopup="isShowPopup" :togglePopup="loginRegister" />
  </header>
</template>

<script>
import SearchInput from "../block/SearchInput.vue";
import LoginRegister from './LoginRegister.vue';
export default {
  name: "HeaderBlock",
  components: { SearchInput, LoginRegister },
  data() {
    return {
      isLogin: false,
      links: [],
      headerPosition: "relative",
      scrollTop: 0,
      scroll: 0,
      isShowPopup: false,
    };
  },
  computed: {
    loginMsg() {
      return this.isLogin ? `退出登录` : "登录/注册";
    },
  },
  methods: {
    loginRegister(){
      this.isShowPopup = !this.isShowPopup;
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
      transition: @transition-time;
      cursor: pointer;
    }

    .face:hover {
      color: @theme-color;
    }
  }
}
</style>