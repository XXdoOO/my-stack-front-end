<script setup lang="ts">
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import MyEmpty from '@/components/MyEmpty.vue'

withDefaults(defineProps<{
  isMy: boolean
}>(), {
  isMy: false
})

const $router = useRouter()

const getDetails = (blogId) => {
  $router.push(`/details/${blogId}`)
}

const up = () => { }
const down = () => { }
const star = () => { }
const deleteBlog = () => { }
const editBlog = () => { }
const scroll = () => {
  let doc = document.documentElement

  // console.log(doc.scrollHeight, doc.scrollTop, doc.clientHeight)

  if (doc.scrollHeight - doc.scrollTop - doc.clientHeight < 1 && (this.$store.state.currentPage + 1) * 10 < this.$store.state.total) {
    this.$store.state.currentPage++
    this.nextPage()
  }
}
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
              <i title="顶" @click.stop="up(index, blog.id)"></i>
              <span>{{ util.formatNum(blog.up) }}</span>
            </li>
            <li :class="{ 'down-hover': blog.isDown }" title="踩数">
              <i title="踩" @click.stop="down(index, blog.id)"></i>
              <span>{{ util.formatNum(blog.down) }}</span>
            </li>
            <li :class="{ 'star-hover': blog.isStar }" title="收藏数">
              <i title="收藏" @click.stop="star(index, blog.id)"></i>
              <span>{{ util.formatNum(blog.star) }}</span>
            </li>
            <li title="浏览数">
              <i></i>
              <span>{{ util.formatNum(blog.views) }}</span>
            </li>
            <li class="delete-icon" title="删除此博客" v-if="isMy && blog.authorUsername === $store.state.userInfo.username"
              @click.stop="deleteBlog(index, blog.id)">
              <i></i>
            </li>
            <li class="edit-icon" title="编辑此博客" v-if="isMy && blog.authorUsername === $store.state.userInfo.username"
              @click.stop="updateBlog(blog.id)">
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