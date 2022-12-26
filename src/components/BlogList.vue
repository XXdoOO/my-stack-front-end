<script setup lang="ts">
import { ref, reactive, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { store } from '@/stores/index'
import MyEmpty from '@/components/MyEmpty.vue'
import util from '@/util/util'
import { handleBlog } from '@/api/blog'

const $props = withDefaults(defineProps<{
  list: any[],
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
  $router.push(`/blog/${blogId}`)
}

const handle = (blogId: string | number, type: 0 | 1 | 2) => {
  handleBlog(blogId, type).then(data => {
    console.log(data);

  })
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
          <div class="top" @click.stop>
            <my-icon icon="user" type="link" :href="`/${blog.authorId}`">{{ blog.authorNickname }}</my-icon>
            <my-icon icon="history" type="text" :enable-hover="false">{{ util.formatTime(blog.createTime) }}</my-icon>
          </div>
          <h2>{{ blog.title }}</h2>
          <p>{{ blog.description }}</p>
          <div class="bottom" @click.stop>
            <my-icon @click="handle(blog.id, 0)" v-model:num="blog.up" v-model:active="blog.isUp" icon="up-active" />
            <my-icon @click="handle(blog.id, 1)" v-model:num="blog.down" icon="down-active"
              v-model:active="blog.isDown" />
            <my-icon @click="handle(blog.id, 2)" v-model:num="blog.star" icon="star-active"
              v-model:active="blog.isStar" />
            <my-icon icon="view" type="text">{{ util.formatNum(blog.views) }}</my-icon>
            <div class="delete" title="删除此博客" v-if="isMy && blog.authorUsername === userInfo.username"
              @click.stop="deleteBlog(index)">
              <my-icon icon="delete"></my-icon>
            </div>
            <div class="edit" title="编辑此博客" v-if="isMy && blog.authorUsername === userInfo.username"
              @click.stop="editBlog(blog.id)">
              <my-icon icon="edit"></my-icon>
            </div>
          </div>
        </div>
        <img v-if="blog.cover" :src="`/api/${blog.cover}`" alt="" height="100">
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

@tt: 0.1s;

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
      margin: 0.7em 0;
      transition: @tt;
    }

    p {
      font-size: 14px;
      color: @gray-color-dep;
      transition: @tt;
      margin-bottom: 0.5em;
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

  article:hover p,
  article:hover h2 {
    color: @theme-color;
  }

  article:last-child {
    border-bottom-left-radius: 5px;
    border-bottom-right-radius: 5px;
  }
}

.top {
  display: flex;
  font-size: 10px;

  .icon {
    display: flex;
    align-items: center;
  }

  .icon:first-child {
    border-right: 2px solid @gray-color;
    padding-right: 15px;
    margin-right: 15px;
  }
}

.bottom {
  display: flex;

  .icon {
    margin-right: 2em;
    font-size: 12px;
  }
}
</style>