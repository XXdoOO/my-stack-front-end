<script setup lang="ts">
import { ref, reactive } from 'vue'
import BlogList from '@/components/BlogList.vue';
import { getBlogList } from '@/api/blog'

const list = reactive<object[]>([])
const translateX = ref('0%')

getBlogList().then((data: any) => {
  console.log(data.list)

  list.push(...data.list)

  console.log(list)

})

const toggle = (value) => {
  translateX.value = value
}
</script>

<template>
  <div class="info">

  </div>
  <div class="container menu">
    <div @click="toggle(0)">发布</div>
    <div @click="toggle(100)">未通过</div>
    <div @click="toggle(200)">审核中</div>
    <div @click="toggle(300)">顶过</div>
    <div @click="toggle(400)">踩过</div>
    <div @click="toggle(500)">收藏</div>
    <div @click="toggle(600)">历史</div>
    <div class="bar" :style="{ transform: `translateX(${translateX}%)` }"></div>
  </div>
  <BlogList :list="list" :page-num="1"></BlogList>
</template>

<style lang="less" scoped>
.menu {
  background-color: white;
  display: flex;
  align-items: center;
  position: relative;
  padding: 7px 10px;

  >div {
    width: 70px;
    text-align: center;
    cursor: pointer;
  }

  .bar {
    position: absolute;
    left: 10px;
    bottom: 0;
    height: 3px;
    transition: @transition-time;
    transform: translateX(-100%);
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
</style>