<template>
  <div class="articles">
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
            <span>{{ blog.up }}</span>
          </li>
          <li :class="{ 'down-hover': blog.isDown }" title="踩数">
            <i title="踩" @click.stop="down(index, blog.id)"></i>
            <span>{{ blog.down }}</span>
          </li>
          <li :class="{ 'star-hover': blog.isStar }" title="收藏数">
            <i title="收藏" @click.stop="star(index, blog.id)"></i>
            <span>{{ blog.star }}</span>
          </li>
          <li title="浏览数">
            <i></i>
            <span>{{ blog.views }}</span>
          </li>
          <li class="delete-icon" title="删除此博客" v-if="blog.authorUsername === $store.state.userInfo.username"
            @click.stop="deleteBlog(index, blog.id)">
            <i></i>
          </li>
          <li class="edit-icon" title="编辑此博客" v-if="blog.authorUsername === $store.state.userInfo.username"
            @click.stop="updateBlog(blog.id)">
            <i></i>
          </li>
        </ul>
      </div>
      <img v-if="blog.cover" :src="blog.cover" alt="" height="100">
    </article>

    <div id="pagination">
      <div>总共{{ $store.state.total }}页</div>
      <div>&lt;</div>
      <div>{{ $store.state.currentPage }}</div>
      <div>></div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex"

export default {
  name: "ListBlock",
  computed: {
    ...mapState(["blogList"])
  },
  methods: {
    getDetails(blogId) {
      if (this.isAdmin) {
        this.$router.push(`/admin/blog/details/${blogId}`)
      } else {
        this.$router.push(`/details/${blogId}`);
      }
    },
    up(index, blogId) {
      this.$axios.myRequest.up(blogId).then((res) => {
        console.log(res)

        if (res.data.code === 200) {
          this.modifyList({ index: index, opt: "isUp" })
        } else {
          this.$xMessage.show({
            title: '顶失败！',
            message: "不能顶未通过审核博客！",
            type: 'error',
            duration: 3000
          });
        }
      })
    },
    down(index, blogId) {
      this.$axios.myRequest.down(blogId).then((res) => {
        console.log(res)

        if (res.data.code === 200) {
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

        if (res.data.code === 200) {
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

        if (res.data.code === 200) {
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
    ...mapActions(["modifyList"])
  },
}
</script>

<style lang="less" scoped>
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
    background-image: url(../../assets/img/up.png);
    transform: rotate(180deg);
  }

  li:first-child i:hover {
    transform: scale(1.3);
  }

  li:first-child i:hover,
  li:nth-child(2) i:hover,
  li.up-hover i,
  li.down-hover i {
    background-image: url(../../assets/img/up-hover.png);
  }

  li:nth-child(2) i:hover {
    transform: scale(1.3) rotate(180deg);
  }

  li:nth-child(3) i {
    background-image: url(../../assets/img/star.png);
  }

  li:nth-child(3) i:hover,
  li.star-hover i {
    background-image: url(../../assets/img/star-hover.png);
    transform: scale(1.3);
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

#pagination {
  display: flex;
}
</style>