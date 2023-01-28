<script setup lang="ts">
import { ref, reactive, watch } from 'vue'
import { useRoute } from 'vue-router'
import BlogList from '@/components/BlogList.vue'
import { getBlogList } from '@/api/blog'
import { getUserInfo } from '@/api/user'

const userInfo = ref(null)
const translateX = ref(0)
const route = useRoute()
const type = ref(null)
const userId = route.params.userId
let path = useRoute().path

watch(route, (newVal) => {
  path = newVal.path
  toggle()
})

const toggle = () => {
  if (/^\/user\/\d+$/.test(path)) {
    type.value = null
    translateX.value = 0
  } else if (/^\/user\/\d+\/up$/.test(path)) {
    type.value = 0
    translateX.value = 100
  } else if (/^\/user\/\d+\/down$/.test(path)) {
    type.value = 1
    translateX.value = 200
  }

  getUserInfo(userId).then(data => {
    userInfo.value = data
  })
}
toggle()
</script>

<template>
  <div class="container info" v-if="userInfo">
    <img :src="`/api/${userInfo.avatar}`" alt="用户头像">
    <span class="nickname">{{ userInfo.nickname }}</span>
    <my-ip class="ip">{{ userInfo.ipTerritory }}</my-ip>
  </div>
  <div class="container menu" v-if="userInfo">
    <router-link :to="`/user/${userId}`" :class="{ active: translateX == 0 }">发布({{
      userInfo.passCount
    }})</router-link>
    <router-link :to="`/user/${userId}/up`" :class="{ active: translateX == 100 }">顶过({{
      userInfo.up
    }})</router-link>
    <router-link :to="`/user/${userId}/down`" :class="{ active: translateX == 200 }">踩过({{
      userInfo.down
    }})</router-link>
    <div class="bar" :style="{ transform: `translateX(${translateX}%)` }"></div>
  </div>
  <BlogList :key="path" :get-list="getBlogList" :form="{
    createBy: userId ?? '',
    type: type
  }"></BlogList>
</template>

<style lang="less" scoped>
.info {
  background-color: white;
  margin-bottom: @gap;
  border-radius: 5px;
  padding: 15px 25px;
  display: flex;
  align-items: center;

  img {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    border: 1px solid @border-color;
  }

  .nickname {
    margin-left: 10px;
  }

  .ip {
    margin-left: auto;
  }
}

.menu {
  background-color: white;
  display: flex;
  align-items: center;
  position: relative;
  padding: 7px 10px;
  border-radius: 5px 5px 0 0;

  >a {
    width: 80px;
    text-align: center;
    transition: @transition-time;
  }

  .bar {
    position: absolute;
    left: 10px;
    bottom: 0;
    width: 80px;
    height: 3px;
    transition: @transition-time;
  }

  .bar::before {
    content: "";
    display: block;
    width: 50%;
    margin: 0 auto;
    height: 100%;
    border-radius: 3px;
    background-color: @theme-color;
  }
}

.active {
  color: @theme-color;
}
</style>