<script setup lang="ts">
import { ref, reactive } from 'vue'
import util from '@/util/util'

const authorInfo = {
  nickname: '作者昵称',
  avatar: '',
  passCount: 1221,
  upCount: 2304,
  downCount: 1030
}

const blog = {
  up: 2124,
  down: 2304,
  star: 1020,
  views: 23000
}
const text = '# ss'
</script>

<template>
  <!-- <v-md-editor id="markdown" v-model="text"></v-md-editor> -->

  <main class="container">
    <div class="content">
      <v-md-preview :text="text"></v-md-preview>
    </div>
    <div class="sidebar">
      <div class="author-info">
        <router-link :to="`/user/${authorInfo.nickname}/postBlogList`" class="face">
          <img src="@/assets/images/bg.jpg" width="50" height="50" />
          <span> {{ authorInfo.nickname }}</span>
        </router-link>
        <nav class="account">
          <router-link :to="`/user/${authorInfo.nickname}/postBlogList`">
            <span>{{ authorInfo.passCount }}</span>
            <span>发布</span>
          </router-link>
          <router-link :to="`/user/${authorInfo.nickname}/upBlogList`">
            <span>{{ authorInfo.upCount }}</span>
            <span>顶过</span>
          </router-link>
          <router-link :to="`/user/${authorInfo.nickname}/downBlogList`">
            <span>{{ authorInfo.downCount }}</span>
            <span>踩过</span>
          </router-link>
        </nav>
      </div>
      <ul class="icon-bar">
        <li><my-icon icon="up-active">{{ util.formatNum(blog.up) }}</my-icon></li>
        <li><my-icon icon="down-active">{{ util.formatNum(blog.down) }}</my-icon></li>
        <li><my-icon icon="star-active">{{ util.formatNum(blog.star) }}</my-icon></li>
        <li><my-icon icon="view">{{ util.formatNum(blog.views) }}</my-icon></li>
      </ul>
    </div>
  </main>
</template>

<style lang="less" scoped>
.container {
  display: flex;
  align-items: flex-start;

  .content {
    flex-grow: 1;
    border-radius: 5px;
    overflow: hidden;
  }
}

.sidebar {
  margin-left: @gap;
}

.author-info {
  width: 230px;
  padding: 20px 30px;
  border-radius: 5px;
  background-color: white;

  .face {
    display: flex;
    align-items: center;

    img {
      border-radius: 50%;
    }

    span {
      color: @gray-color-dep;
      margin-left: 10px;
    }
  }

  .account {
    display: flex;
    justify-content: space-between;
    margin-top: 10px;

    a {
      display: flex;
      flex-direction: column;
      align-items: center;
      color: black;
      font-size: 20px;

      span:last-child {
        font-size: 12px;
        color: @gray-color-dep;
      }
    }
  }
}

.icon-bar {
  background-color: white;
  border-radius: 5px;
  margin-top: @gap;
  display: flex;
  font-size: 12px;
  align-items: center;
  justify-content: space-between;
  padding: 5px 10px;
}
</style>