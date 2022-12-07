<script setup lang="ts">
import { ref, reactive, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { store } from '@/stores/index'
import MyEmpty from '@/components/MyEmpty.vue'
import util from '@/util/util'

interface Blog {
  id: string | number,
  authorUsername: string,
  authorNickname: string,
  postTime: string,
  title: string,
  description: string,
  isUp: boolean,
  isDown: boolean,
  isStar: boolean | null,
  up: string | number,
  down: string | number,
  star: string | number,
  views: string | number,
  cover: string
}

const $props = withDefaults(defineProps<{
  list: Blog[],
  isMy?: boolean,
  pageNum?: number
}>(), {
  isMy: false,
  pageNum: 1
})

const userInfo = store().userInfo

const $emit = defineEmits(['getBlogList'])
const $router = useRouter()

const blogList = $props.list
const pageSize: number = 10
const total: number = 0


const getDetails = (blogId) => {
  $router.push(`/details/${blogId}`)
}

const up = (index: number) => {

}

const down = (index: number) => {

}

const star = (index: number) => {

}

const deleteBlog = (index: number) => {

}

const editBlog = (blogId: string | number) => {

}

const scroll = () => {
  const doc = document.documentElement

  // console.log(doc.scrollHeight, doc.scrollTop, doc.clientHeight)

  if (doc.scrollHeight - doc.scrollTop - doc.clientHeight < 1 && $props.pageNum * pageSize < total) {
    $emit('getBlogList', {
      pageNum: $props.pageNum + 1,
      pageSize,
      total
    })
  }
}

onMounted(() => {
  window.addEventListener("scroll", scroll)
})

onUnmounted(() => {
  window.removeEventListener("scroll", scroll)
})
</script>

<template>
  <div>
    <div class="articles" v-if="blogList.length > 0">
      <article v-for="(blog, index) in blogList" :key="blog.id" @click="getDetails(blog.id)">
        <div>
          <ul class="topContent">
            <li>
              <router-link class="wrapper-icon" :to="`/user/${blog.authorUsername}/postBlogList`"><i
                  class="icon-user"></i>
                <span>{{ blog.authorNickname }}</span>
              </router-link>
            </li>
            <li class="wrapper-icon">
              <i class="icon-time"></i>
              <span>{{ util.formatTime(blog.postTime) }}</span>
            </li>
          </ul>
          <h2>{{ blog.title }}</h2>
          <p>{{ blog.description }}</p>
          <ul class="bottomContent">
            <li :class="{ 'up-hover': blog.isUp }" title="顶数">
              <i title="顶" @click.stop="up(index)"></i>
              <span>{{ util.formatNum(blog.up) }}</span>
            </li>
            <li :class="{ 'down-hover': blog.isDown }" title="踩数">
              <i title="踩" @click.stop="down(index)"></i>
              <span>{{ util.formatNum(blog.down) }}</span>
            </li>
            <li :class="{ 'star-hover': blog.isStar }" title="收藏数">
              <i title="收藏" @click.stop="star(index)"></i>
              <span>{{ util.formatNum(blog.star) }}</span>
            </li>
            <li title="浏览数">
              <i></i>
              <span>{{ util.formatNum(blog.views) }}</span>
            </li>
            <li class="delete-icon" title="删除此博客" v-if="isMy && blog.authorUsername === userInfo.username"
              @click.stop="deleteBlog(index)">
              <i></i>
            </li>
            <li class="edit-icon" title="编辑此博客" v-if="isMy && blog.authorUsername === userInfo.username"
              @click.stop="editBlog(blog.id)">
              <i></i>
            </li>
          </ul>
        </div>
        <img v-if="blog.cover" :src="blog.cover" alt="" height="100">
      </article>
    </div>
    <MyEmpty v-else-if="blogList.length == 0"></MyEmpty>
  </div>
</template>

<style lang="less" scoped>

</style>