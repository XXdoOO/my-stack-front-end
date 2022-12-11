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
  <div class="container root">
    <div class="articles" v-if="blogList.length > 0">
      <article v-for="(blog, index) in blogList" :key="blog.id" @click="getDetails(blog.id)">
        <div>
          <ul class="top">
            <li>
              <my-icon icon="user">{{ blog.authorNickname }}</my-icon>
            </li>
            <li>
              <my-icon icon="history" :enable-hover="false">{{ util.formatTime(blog.postTime) }}</my-icon>
            </li>
          </ul>
          <h2>{{ blog.title }}</h2>
          <p>{{ blog.description }}</p>
          <ul class="bottom">
            <li title="顶数">
              <my-icon icon="up-active">
                {{ util.formatNum(blog.up) }}
              </my-icon>
            </li>
            <li title="踩数">
              <my-icon icon="down-active">{{ util.formatNum(blog.down) }}</my-icon>
            </li>
            <li title="收藏数">
              <my-icon icon="star-active"></my-icon>
              <span>{{ util.formatNum(blog.star) }}</span>
            </li>
            <li title="浏览数">
              <my-icon icon="view"></my-icon>
              <span>{{ util.formatNum(blog.views) }}</span>
            </li>
            <li class="delete" title="删除此博客" v-if="isMy && blog.authorUsername === userInfo.username"
              @click.stop="deleteBlog(index)">
              <my-icon icon="delete"></my-icon>
            </li>
            <li class="edit" title="编辑此博客" v-if="isMy && blog.authorUsername === userInfo.username"
              @click.stop="editBlog(blog.id)">
              <my-icon icon="edit"></my-icon>
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
@keyframes plusOne {
  0% {
    opacity: 0;
    top: 0;
  }

  50% {
    opacity: 1;
    top: -15px;
  }

  100% {
    opacity: 0;
  }
}

.root {
  border-radius: 0 0 10px 10px;
  overflow: hidden;
}

.articles {
  width: 100%;
  background-color: white;

  article {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 15px 30px;
    transition: 0.1s;
    cursor: pointer;
    position: relative;

    img {
      object-fit: cover;
      margin-left: 20px;
    }

    h2 {
      font-size: 18px;
      margin-bottom: 10px;
    }

    p {
      font-size: 14px;
      color: @gray-color-dep;
      transition: 0.1s;
    }
  }

  article::before {
    content: "";
    width: 94%;
    height: 1px;
    background-color: @gray-color;
    position: absolute;
    bottom: 0;
    left: 3%;
  }

  article:hover {
    background-color: #f4f5f6;
  }

  article:hover p {
    color: @theme-color;
  }

  article:last-child {
    border-bottom-left-radius: 5px;
    border-bottom-right-radius: 5px;
  }
}

.top {
  display: flex;
  font-size: 12px;

  li {
    display: flex;
    align-items: center;

    span {
      margin-left: 5px;
    }
  }

  li:first-child {
    border-right: 2px solid @gray-color;
    padding-right: 15px;
    margin-right: 15px;
  }
}
</style>