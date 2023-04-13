<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import type { Ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { store } from '@/stores/index'
import { logout } from '@/api/user'
import Confirm from '@/components/confirm'
import LoginRegister from '@/components/login'

let scrollTop: Ref<number> = ref(0)
let scroll: Ref<number> = ref(0)
const userInfo = store().userInfo

const onScroll = (): void => {
  let scrollTop2: number =
    window.pageYOffset ||
    document.documentElement.scrollTop ||
    document.body.scrollTop

  let scroll2: number = scrollTop2 - scrollTop.value
  scrollTop.value = scrollTop2

  if (scroll2 < 0) {
    // 鼠标上滚
    scroll.value = scroll.value - scroll2 > 0 ? 0 : scroll.value - scroll2
  } else {
    // 鼠标下滚
    scroll.value = scroll.value - scroll2 < -70 ? -71 : scroll.value - scroll2
  }
}

const keywords = ref<string>(useRoute().params.keywords as string)
const $router = useRouter()

const search = (keywords) => {
  $router.push(`/search/${keywords}`)
}

const handleLogout = () => {
  Confirm('确认退出账号吗?', () => {
    logout().then(() => {
      sessionStorage.clear()
      $router.push("/")
      window.location.reload()
    })
  })
}

onMounted(() => {
  window.addEventListener("scroll", onScroll)
})

onUnmounted(() => {
  window.removeEventListener("scroll", onScroll)
})
</script>

<template>
  <header class="header-block" :style="{
    top: scroll + 'px',
    'box-shadow':
      scroll === -70 ? 'none' : '0px 8px 25px 20px rgba(44, 16, 111, 0.06)',
  }">
    <div class="container">
      <router-link class="logo" to="/">
        <my-icon class="icon" icon="edit" :isActive="false"></my-icon>
        <span>My Stack</span>
      </router-link>

      <nav>
        <router-link to="/" :class="{ active: $route.path == '/' }">首页212222</router-link>
        <router-link to="/my" :class="{ active: $route.path.split('/')[1] == 'my' }">我的</router-link>
      </nav>

      <div class="search-input">
        <input type="text" placeholder="请输入搜索关键词" v-model="keywords" @keyup.enter="search(keywords)" />
        <my-icon icon="search" class="icon" @click="search(keywords)" title="点击搜索"></my-icon>
      </div>

      <span class="login" v-if="!userInfo" @click="LoginRegister()">登录/注册</span>
      <div class="my" v-if="userInfo">
        <img :src="`/api/${userInfo.avatar}`" alt="" width="50" height="50">

        <div class="hover-popup">
          <span class="nickname">{{ userInfo.nickname }}</span>
          <nav class="my-count">
            <router-link :to="`/my`">
              <span>{{ userInfo.passCount }}</span>
              <span>发布</span>
            </router-link>
            <router-link :to="`/my/up`">
              <span>{{ userInfo.up }}</span>
              <span>顶过</span>
            </router-link>
            <router-link :to="`/my/down`">
              <span>{{ userInfo.down }}</span>
              <span>踩过</span>
            </router-link>
          </nav>
          <router-link class="my-menu" to="/my">个人中心</router-link>
          <router-link class="my-menu" to="/admin/blog" v-if="userInfo.admin">管理后台</router-link>
          <my-button type="primary" href="/edit">开始创作</my-button>
          <my-button type="danger" @click="handleLogout">退出登录</my-button>
        </div>
      </div>
    </div>
  </header>
</template>

<style lang="less" scoped>
.header-block {
  position: sticky;
  top: 0;
  width: 100%;
  height: 70px;
  margin: 0 auto;
  background-color: white;
  box-shadow: @shadow-color;
  z-index: 999;
  box-sizing: content-box;
  margin-bottom: @gap;

  >.container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 100%;

    .logo {
      display: inline-flex;
      justify-content: center;
      align-items: center;

      .icon {
        font-size: 23px;
        color: @theme-color;
      }

      span {
        margin-left: 10px;
        transition: @transition-time;
        font-size: 30px;
        color: @theme-color;
      }
    }

    .logo:hover span {
      color: @theme-color;
    }

    >nav {
      display: flex;
      height: 100%;
      align-items: center;

      a {
        position: relative;
        color: black;
        font-size: 20px;
        flex-grow: 1;
        height: 100%;
        padding: 0 1em;
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
        border: 1px solid @border-color;
      }

      .hover-popup {
        position: absolute;
        top: 15px;
        left: -50px;
        display: flex;
        visibility: hidden;
        opacity: 0;
        flex-direction: column;
        background-color: white;
        padding: 35px 15px 15px 15px;
        border-radius: 5px;
        width: 160px;
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
          padding-bottom: 15px;
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
          padding: 7px 0;
          cursor: pointer;
          transition: @transition-time;
          font-size: 14px;
        }

        .my-menu:hover {
          color: @theme-color;
        }

        .my-menu:first-of-type {
          margin-top: 10px;
        }

        .my-menu:last-of-type {
          margin-bottom: 10px;
        }



        button:last-child {
          margin-top: 10px;
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

.search-input {
  position: relative;
  width: 220px;
  height: 35px;

  input {
    width: 100%;
    height: 100%;
    border: none;
    outline: none;
    padding: 0 10px;
    border: 1px solid @border-color;
    border-radius: 5px;
  }

  .icon {
    position: absolute;
    top: 50%;
    right: 5px;
    transform: translateY(-50%);
  }
}
</style>