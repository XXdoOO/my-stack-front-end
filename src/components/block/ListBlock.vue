<template>
  <div>
    <div class="articles" v-if="blogList.length > 0">
      <article v-for="(blog, index) in blogList" :key="blog.id" @click="getDetails(blog.id)">
        <div>
          <ul class="topContent">
            <li>
              <router-link :to="`/user/${blog.authorUsername}/postBlogList`">{{ blog.authorNickname }}</router-link>
            </li>
            <li>{{ util.formatTime(blog.postTime) }}</li>
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
    <Empty v-else-if="blogList.length == 0"></Empty>
  </div>
</template>

<script>
import Empty from "./Empty.vue"
import { mapState, mapActions } from "vuex"
export default {
  name: "ListBlock",
  components: { Empty },
  props: {
    nextPage: {
      type: Function,
      default() {
        console.log("next")
      }
    },
    isMy: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    ...mapState(["blogList"])
  },
  methods: {
    getDetails(blogId) {
      if (this.isAdmin) {
        this.$router.push(`/admin/blog/details/${blogId}`)
      } else {
        this.$router.push(`/details/${blogId}`)
      }
    },
    up(index, blogId) {
      this.$axios.myRequest.up(blogId).then((res) => {
        console.log(res)

        if (res && res.code === 600) {
          this.modifyList({ index: index, opt: "isUp" })
        } else {
          this.$xMessage.show({
            title: '顶失败！',
            message: "不能顶未通过审核博客！",
            type: 'error',
            duration: 3000
          })
        }
      })
    },
    down(index, blogId) {
      this.$axios.myRequest.down(blogId).then((res) => {
        console.log(res)

        if (res && res.code === 600) {
          this.modifyList({ index: index, opt: "isDown" })
        } else {
          this.$xMessage.show({
            title: '踩失败！',
            message: "不能踩未通过审核博客！",
            type: 'error',
            duration: 3000
          });
        }
      })
    },
    star(index, blogId) {
      this.$axios.myRequest.star(blogId).then((res) => {
        console.log(res)

        if (res && res.code === 600) {
          this.modifyList({ index: index, opt: "isStar" })
        } else {
          this.$xMessage.show({
            title: '收藏失败！',
            message: "不能收藏未通过审核博客！",
            type: 'error',
            duration: 3000
          });
        }
      })
    },
    deleteBlog(index, blogId) {
      this.$axios.myRequest.deleteBlog(blogId).then((res) => {
        console.log(res)

        if (res && res.code === 600) {
          this.modifyList({ index: index, opt: "delete" })

          this.$xMessage.show({
            title: '删除成功！',
            message: "",
            type: 'success',
            duration: 3000
          });
        }
      })
    },
    updateBlog(blogId) {
      this.$router.push(`/user/edit/${blogId}`)
    },
    scrollToTop() {
      let doc = document.documentElement

      // console.log(doc.scrollHeight, doc.scrollTop, doc.clientHeight)

      if (doc.scrollHeight - doc.scrollTop - doc.clientHeight < 1 && (this.$store.state.currentPage + 1) * 10 < this.$store.state.total) {
        this.$store.state.currentPage++
        this.nextPage()
      }
    },
    ...mapActions(["modifyList"])
  },
  mounted() {
    window.addEventListener("scroll", this.scrollToTop)
  },
  destroyed() {
    window.removeEventListener('scroll', this.scrollToTop)
  }
}
</script>

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

.articles {
  border-radius: 5px;
  margin-bottom: 10px;
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

    >img {
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

  article:after {
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
    color: @theme-color;
  }

  article:hover p {
    color: @theme-color;
  }

  article:first-child {
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
  }

  article:last-child {
    border-bottom-left-radius: 5px;
    border-bottom-right-radius: 5px;
  }
}

.topContent {
  display: flex;
  margin-bottom: 10px;

  li {
    padding: 0 10px;
    color: @gray-color-dep;
  }

  li:first-child {
    border-right: 2px solid @gray-color;
    padding-left: 0;
  }
}

.bottomContent {
  display: flex;
  margin-top: 10px;

  li {
    width: 70px;
    cursor: pointer;
    display: flex;
    align-items: center;

    i {
      width: 20px;
      height: 20px;
      display: block;
      background-size: cover;
      transition: @transition-time;
      position: relative;
    }

    i::before {
      content: "+1";
      position: absolute;
      top: 0;
      color: @theme-color;
      opacity: 0;
      font-size: 12px;
    }

    span {
      font-size: 14px;
      line-height: 14px;
      color: @gray-color-dep;
    }
  }

  li:first-child {
    padding-left: 0;
  }

  li:first-child i {
    background-image: url(../../assets/img/up.png);
  }

  li:nth-child(2) i {
    background-image: url(../../assets/img/down.png);
  }

  li:first-child i:hover {
    transform: scale(1.3);
  }

  li:first-child i:hover,
  li.up-hover i {
    background-image: url(../../assets/img/up-hover.png);
  }

  li:nth-child(2) i:hover,
  li.down-hover i {
    background-image: url(../../assets/img/down-hover.png);
  }

  li:nth-child(2) i:hover {
    transform: scale(1.3);
  }

  li:nth-child(3) i {
    background-image: url(../../assets/img/star.png);
  }

  li:nth-child(3) i:hover {
    background-image: url(../../assets/img/star-hover.png);
    transform: scale(1.3);
  }

  li.star-hover i {
    background-image: url(../../assets/img/star-hover.png);
  }

  li.up-hover i::before,
  li.down-hover i::before,
  li.star-hover i::before {
    animation: plusOne 1s;
  }

  li:nth-child(4) i {
    background-image: url(../../assets/img/views.png);
  }

  .delete-icon i {
    background-image: url(../../assets/img/delete.png);
    transition: @transition-time;
  }

  .delete-icon i:hover {
    background-image: url(../../assets/img/delete-hover.png);
    transform: scale(1.3);
  }

  .edit-icon i {
    background-image: url(../../assets/img/edit.png);
    transition: @transition-time;
  }

  .edit-icon i:hover {
    background-image: url(../../assets/img/edit-hover.png);
    transform: scale(1.3);
  }
}
</style>