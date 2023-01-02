<script setup lang="ts">
import { ref, reactive } from 'vue'
import { useRoute } from 'vue-router'
import BlogList from '@/components/BlogList.vue';
import { getBlogList } from '@/api/blog'
import { getUserInfo } from '@/api/user'

const userInfo = ref(null)
const list = reactive<object[]>([])
const translateX = ref(0)
const route = useRoute()
const page = reactive({
  pageNum: 1,
  total: '0'
})
const toggle = (value) => {
  translateX.value = value

  let type

  if (value == 0) {
    type = null
  } else if (value == 100) {
    type = 0
  } else if (value == 200) {
    type = 1
  }

  console.log(route);

  list.length = 0
  getBlogList({
    authorId: route.params.userId as string,
    type
  }).then((data: any) => {
    list.push(...data.list)
  })
}
getUserInfo(route.params.userId).then(data => {
  userInfo.value = data

  toggle(0)
})
</script>

<template>
  <div class="container info" v-if="userInfo">
    <img :src="`/api/${userInfo.avatar}`" width="50" height="50" alt="">
    <span class="nickname">{{ userInfo.nickname }}</span>
    <span class="ip">{{ userInfo.ip }}</span>
  </div>
  <div class="container menu" v-if="userInfo">
    <div :class="{ active: translateX == 0 }" @click="toggle(0)">发布({{ userInfo.passCount }})</div>
    <div :class="{ active: translateX == 100 }" @click="toggle(100)">顶过({{ userInfo.up }})</div>
    <div :class="{ active: translateX == 200 }" @click="toggle(200)">踩过({{ userInfo.down }})</div>
    <div class="bar" :style="{ transform: `translateX(${translateX}%)` }"></div>
  </div>
  <BlogList v-model:list="list" v-model:pageNum="page.pageNum" :total="page.total" @nextPage="getList"></BlogList>
</template>

<style lang="less" scoped>
.info {
  background-color: white;
  margin-bottom: @gap;
  border-radius: 5px;
  padding: 15px 25px;
  display: flex;
  align-items: center;

  .nickname {
    margin-left: 10px;
  }
}

.menu {
  background-color: white;
  display: flex;
  align-items: center;
  position: relative;
  padding: 7px 10px;
  border-radius: 5px 5px 0 0;

  >div {
    width: 80px;
    text-align: center;
    cursor: pointer;
    transition: @transition-time;
  }

  .bar {
    position: absolute;
    left: 10px;
    bottom: 0;
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