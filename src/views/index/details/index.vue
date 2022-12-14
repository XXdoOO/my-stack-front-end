<script setup lang="ts">
import { ref, reactive } from 'vue'
import { useRoute } from 'vue-router';
import { getBlogDetails } from '@/api/blog'
import util from '@/util/util'

const $route = useRoute()
let blog = ref(null)

getBlogDetails($route.params.blogId).then(res => {
  blog.value = res
})
</script>

<template>
  <!-- <v-md-editor id="markdown" v-model="text"></v-md-editor> -->

  <main class="container" v-if="blog">
    <div class="content">
      <v-md-preview :text="blog.content"></v-md-preview>
    </div>
    <div class="sidebar">
      <div class="author-info">
        <router-link :to="`/user/${blog.authorInfo.id}/postBlogList`" class="face">
          <img :src="blog.authorInfo.avatar" width="50" height="50" />
          <span> {{ blog.authorInfo.nickname }}</span>
        </router-link>
        <nav class="account">
          <router-link :to="`/user/${blog.authorInfo.nickname}/postBlogList`">
            <span>{{ blog.authorInfo.passCount }}</span>
            <span>发布</span>
          </router-link>
          <router-link :to="`/user/${blog.authorInfo.nickname}/upBlogList`">
            <span>{{ blog.authorInfo.upCount }}</span>
            <span>顶过</span>
          </router-link>
          <router-link :to="`/user/${blog.authorInfo.nickname}/downBlogList`">
            <span>{{ blog.authorInfo.downCount }}</span>
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