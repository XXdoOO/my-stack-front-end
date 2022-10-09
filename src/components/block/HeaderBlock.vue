<template>
  <header class="header-block" :style="{
    top: scroll + 'px',
    'box-shadow':
      scroll === -70 ? 'none' : '0px 8px 25px 20px rgba(44, 16, 111, 0.06)',
      '--progress-width':$store.state.progressWidth + '%',
      'transition':$store.state.progressWidth == 100 || $store.state.progressWidth == 0? '0':'@transition-time'
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

    </div>

    <div class="progress"></div>
  </header>
</template>

<script>
import SearchInput from "../block/SearchInput.vue";
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
    loginMsg() {
      return this.$store.state.isLogin ? `退出登录` : "登录/注册";
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

    nav {
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
  }
}

.header-block:after {
  content: "";
  display: block;
  width: var(--progress-width);
  height: 2px;
  background-color: @theme-color;
}
</style>