<script setup lang="ts">
import { ref, reactive } from 'vue'
import BlogList from '@/components/BlogList.vue';
import { getBlogList } from '@/api/blog'
import { store } from '@/stores/index'

const userInfo = store().userInfo
const list = reactive<object[]>([])
const translateX = ref(0)

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

  list.length = 0

  console.log(list);

  getBlogList({
    authorId: userInfo?.id ?? '',
    type
  }).then((data: any) => {
    console.log(data.list)

    list.push(...data.list)
  })
}

toggle(0)
</script>

<template>
  <div class="container info">
    <img :src="`/api/${userInfo.avatar}`" width="50" height="50" alt="">
    <span class="nickname">{{ userInfo.nickname }}</span>
    <span class="ip">{{ userInfo.ip }}</span>
  </div>
  <div class="container menu">
    <div :class="{ active: translateX == 0 }" @click="toggle(0)">发布</div>
    <div :class="{ active: translateX == 100 }" @click="toggle(100)">顶过</div>
    <div :class="{ active: translateX == 200 }" @click="toggle(200)">踩过</div>
    <div class="bar" :style="{ transform: `translateX(${translateX}%)` }"></div>
  </div>
  <BlogList :list="list" :page-num="1"></BlogList>
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
    width: 70px;
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