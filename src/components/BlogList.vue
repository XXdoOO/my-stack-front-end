<script setup lang="ts">
import { ref, reactive, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { store } from '@/stores/index'
import MyEmpty from '@/components/MyEmpty.vue'
import util from '@/util/util'
import { handleBlog, deleteBlog } from '@/api/blog'
import confirm from '@/components/confirm'
import xMessage from '@/components/message/index'
import { handleIcon } from '@/util/xx'

const $props = withDefaults(defineProps<{
  isMy?: boolean,
  getList: Function,
  form?: any,
  [key: string]: any,
  keywords?: string,
}>(), {
  isMy: false,
  form: {}
})

const userInfo = store().userInfo

const $router = useRouter()
const ready = ref(false)

$props.form.pageNum = 1
$props.form.pageSize = 10
$props.form.total = 0

const blogList = reactive([])

const getBlogList = () => {
  $props.getList($props.form).then((data: any) => {
    blogList.push(...data.list)
    $props.form.total = data.total
    ready.value = true
  })
}

const getDetails = (blogId) => {
  $router.push(`/blog/${blogId}`)
}

const handle = (blog, type: 0 | 1 | 2) => {
  handleBlog(blog.id, type).then(data => {
    handleIcon(blog, type)
  })
}

const handleDeleteBlog = (index) => {
  confirm('确认删除此博客吗？', () => {
    deleteBlog(blogList[index].id).then(() => {
      blogList.splice(index, 1)

      xMessage({
        type: 'success',
        message: '删除成功',
      })
    })
  })
}

const scroll = () => {
  const doc = document.documentElement

  if (doc.scrollHeight - doc.scrollTop - doc.clientHeight < 1 && $props.form.pageNum * $props.form.pageSize < parseInt($props.form.total)) {
    $props.form.pageNum++
    getBlogList()
  }
}

onMounted(() => {
  window.addEventListener("scroll", scroll)
})

onUnmounted(() => {
  window.removeEventListener("scroll", scroll)
})

const replaceKeywords = (text) => {
  if ($props.keywords) {
    return text.replaceAll($props.keywords, `<strong>${$props.keywords}</strong>`)
  }
  return text
}

getBlogList()
</script>

<template>
  <div class="container root">
    <div class="articles" v-if="blogList.length > 0">
      <article v-for="(blog, index) in blogList" :key="blog.id" @click="getDetails(blog.id)">
        <div>
          <div class="top" @click.stop>
            <my-icon icon="user" type="link" :href="`/user/${blog.createBy}`">{{ blog.authorNickname }}</my-icon>
            <my-icon icon="history" type="text" :enable-hover="false">{{ util.formatTime(blog.createTime) }}</my-icon>
          </div>
          <h2 v-html="replaceKeywords(blog.title)"></h2>
          <p v-html="replaceKeywords(blog.description)"></p>
          <div class="bottom" @click.stop>
            <my-icon @click="handle(blog, 0)" :num="blog.up" :active="blog.isUp" icon="up-active" />
            <my-icon @click="handle(blog, 1)" :num="blog.down" :active="blog.isDown" icon="down-active" />
            <my-icon @click="handle(blog, 2)" :num="blog.star" :active="blog.isStar" icon="star-active" />
            <my-icon icon="comment" type="text">{{ util.formatNum(blog.comment) }}</my-icon>
            <my-icon icon="view" type="text">{{ util.formatNum(blog.view) }}</my-icon>

            <my-icon v-if="isMy && blog.authorUsername === userInfo.username" :href="`/edit/${blog.id}`"
              icon="edit"></my-icon>
            <my-icon v-if="isMy && blog.authorUsername === userInfo.username" @click.stop="handleDeleteBlog(index)"
              icon="delete"></my-icon>
          </div>
        </div>
        <img v-if="blog.cover" :src="`/api/${blog.cover}`" alt="" height="100">
      </article>
    </div>
    <MyEmpty v-if="ready && blogList.length == 0"></MyEmpty>
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
      border-radius: 5px;
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

    :deep(strong) {
      color: @theme-color;
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

  .my-icon {
    display: flex;
    align-items: center;
  }

  .my-icon:first-child {
    border-right: 2px solid @gray-color;
    padding-right: 15px;
    margin-right: 15px;
  }
}

.bottom {
  display: flex;

  .my-icon {
    margin-right: 2em;
    font-size: 12px;
  }
}
</style>