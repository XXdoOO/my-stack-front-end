<template>
  <div class="articles">
    <article v-for="(blog, index) in blogList" :key="blog.id" @click="getDetails(blog.id)">
      <div>
        <ul class="topContent">
          <li>
            <router-link :to="`/user/${blog.authorUsername}/postBlogList`">{{blog.authorUsername}}</router-link>
          </li>
          <li>{{util.formatTime(blog.postTime)}}</li>
        </ul>
        <h2>{{blog.title}}</h2>
        <p>{{blog.description}}</p>
        <ul class="bottomContent">
          <li :class="{'up-hover':blog.isUp}" title="顶数">
            <i title="顶" @click.stop="up(index, blog.id)"></i>
            <span>{{blog.up}}</span>
          </li>
          <li :class="{'down-hover':blog.isDown}" title="踩数">
            <i title="踩" @click.stop="down(index, blog.id)"></i>
            <span>{{blog.down}}</span>
          </li>
          <li :class="{'star-hover':blog.isStar}" title="收藏数">
            <i title="收藏" @click.stop="star(index, blog.id)"></i>
            <span>{{blog.star}}</span>
          </li>
          <li title="浏览数">
            <i></i>
            <span>{{blog.views}}</span>
          </li>
          <li class="delete-icon" title="删除此博客" v-if="blog.authorUsername === $store.state.userInfo.username"
            @click.stop="deleteBlog(blog.id)">
            <i></i>
          </li>
        </ul>
      </div>
      <img v-if="blog.cover" :src="blog.cover" alt="" height="100">
    </article>
  </div>
</template>

<script>

export default {
  name: "ListBlock",
  props: {
    blogList: Array,
    modifyList: Function
  },
  methods: {
    getDetails(blogId) {
      this.$router.push(`/details/${blogId}`);
    },
    up(index, blogId) {
      this.$axios.myRequest.up(blogId).then((res) => {
        console.log(res)

        if (res) {
          this.modifyList(index, "isUp")
        }
      })
    },
    down(index, blogId) {
      this.$axios.myRequest.down(blogId).then((res) => {
        console.log(res)

        if (res) {
          this.modifyList(index, "isDown")
        }
      })
    },
    star(index, blogId) {
      this.$axios.myRequest.star(blogId).then((res) => {
        console.log(res)

        if (res) {
          this.modifyList(index, "isStar")
        }
      })
    },
    deleteBlog(blogId) {
      this.$axios.myRequest.deleteBlog(blogId).then((res) => {
        console.log(res)

        if (res.data.code === 200) {
          this.$xMessage.show({
            title: '删除成功！',
            message: "",
            type: 'success',
            duration: 3000
          });
        }
      })
    }
  },
}
</script>

<style lang="less" scoped>
.articles {
  border-radius: 5px;
  overflow: hidden;
  margin-bottom: 10px;

  article {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 15px 30px;
    transition: 0.1s;
    cursor: pointer;
    background-color: white;
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

  li:first-child i:hover,
  li:nth-child(2) i:hover,
  li.up-hover i,
  li.down-hover i {
    background-image: url(../../assets/img/up-hover.png);
  }

  li:nth-child(3) i {
    background-image: url(../../assets/img/star.png);
  }

  li:nth-child(3) i:hover,
  li.star-hover i {
    background-image: url(../../assets/img/star-hover.png);
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

  }
}
</style>