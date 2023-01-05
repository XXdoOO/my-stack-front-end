<script setup lang="ts">
import { ref, reactive, watch } from 'vue'
import { useRoute } from 'vue-router'
import BlogList from '@/components/BlogList.vue'
import { getBlogList2 } from '@/api/blog'
import { store } from '@/stores/index'

const userInfo = store().userInfo
const list = reactive<object[]>([])
const translateX = ref(0)
const isMy = ref(false)
const page = reactive({
  pageNum: 1,
  total: '0'
})
const type = ref(null)
let path = useRoute().path
console.log(path);

watch(useRoute(), (newVal) => {
  path = newVal.path
  console.log(path);
  toggle()
  getList()
})

const toggle = () => {
  if (path == '/my') {
    type.value = null
    isMy.value = true
    translateX.value = 0
  } else if (path == '/my/noPass') {
    type.value = 3
    isMy.value = true
    translateX.value = 100
  } else if (path == '/my/auditing') {
    type.value = 2
    isMy.value = true
    translateX.value = 200
  } else if (path == '/my/up') {
    type.value = 0
    isMy.value = false
    translateX.value = 300
  } else if (path == '/my/down') {
    type.value = 1
    isMy.value = false
    translateX.value = 400
  } else if (path == '/my/star') {
    type.value = 4
    isMy.value = false
    translateX.value = 500
  } else if (path == '/my/history') {
    type.value = 5
    isMy.value = false
    translateX.value = 600
  }
  list.length = 0
  page.pageNum = 1
}

const getList = () => {
  console.log(page.pageNum);

  getBlogList2({
    authorId: userInfo?.id ?? '',
    type: type.value,
    pageNum: page.pageNum
  }).then((data: any) => {
    console.log(data.list)

    list.push(...data.list)
    page.total = data.total
  })
}
toggle()
getList()
</script>

<template>
  <div class="container info">
    <div class="avatar">
      <img :src="`/api/${userInfo.avatar}`" alt="用户头像" />
      <my-icon class="icon" icon="edit"></my-icon>
    </div>
    <span class="nickname">{{ userInfo.nickname }}</span>
    <my-icon class="icon" icon="edit"></my-icon>
    <span class="ip">{{ userInfo.ip }}</span>
  </div>
  <div class="container menu">
    <router-link to="/my" :class="{ active: path == '/my' }">发布({{ userInfo.passCount }})</router-link>
    <router-link to="/my/noPass" :class="{ active: path == '/my/noPass' }">未通过({{ userInfo.noPassCount }})</router-link>
    <router-link to="/my/auditing" :class="{ active: path == '/my/auditing' }">审核中({{
      userInfo.auditingCount
    }})</router-link>
    <router-link to="/my/up" :class="{ active: path == '/my/up' }">顶过({{ userInfo.up }})</router-link>
    <router-link to="/my/down" :class="{ active: path == '/my/down' }">踩过({{ userInfo.down }})</router-link>
    <router-link to="/my/star" :class="{ active: path == '/my/star' }">收藏({{ userInfo.star }})</router-link>
    <router-link to="/my/history" :class="{ active: path == '/my/history' }">历史({{ userInfo.history }})</router-link>
    <div class="bar" :style="{ transform: `translateX(${translateX}%)` }"></div>
  </div>
  <BlogList v-model:list="list" v-model:pageNum="page.pageNum" :total="page.total" @nextPage="getList" :isMy="isMy">
  </BlogList>
</template>

<style lang="less" scoped>
.info {
  background-color: white;
  margin-bottom: @gap;
  border-radius: 5px;
  padding: 15px 25px;
  display: flex;
  align-items: center;

  .avatar {
    position: relative;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    border: 1px solid @border-color;
    overflow: hidden;
    transition: @transition-time;

    .icon {
      display: none;
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
    }
  }

  .avatar:hover {
    background-color: rgba(0, 0, 0, 0.5);
  }

  .avatar:hover .icon {
    display: block;
  }

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