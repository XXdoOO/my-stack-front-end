<template>
  <main class="container">
    <div class="user-info">
      <img :src="userInfo.avatar" alt="个人头像" width="50" height="50">
      <span class="nickname">{{userInfo.nickname}}</span>
    </div>
    <nav>
      <router-link to="/my/pass" :class="{active:type === 'pass'}">已发布
        ({{userInfo.postCount}})
      </router-link>
      <router-link to="/my/auditing" :class="{active:type === 'auditing'}">审核中
        ({{userInfo.auditingCount}})
      </router-link>
      <router-link to="/my/noPass" :class="{active:type === 'noPass'}">未通过
        ({{userInfo.noPassCount}})
      </router-link>
      <router-link to="/my/up" :class="{active:type === 'up'}">顶过
        ({{userInfo.upCount}})</router-link>
      <router-link to="/my/down" :class="{active:type === 'down'}">踩过
        ({{userInfo.downCount}})
      </router-link>
      <router-link to="/my/star" :class="{active:type === 'star'}">收藏
        ({{userInfo.starCount}})
      </router-link>
    </nav>
    <ListBlock :blog-list="blogList" />
  </main>
</template>

<script>
import ListBlock from "../block/ListBlock.vue"
export default {
  name: "MyPage",
  components: { ListBlock },
  data() {
    return {
      userInfo: {},
      blogList: [],
      type: null
    }
  },
  methods: {
    getMyInfo(path) {
      this.$axios.myRequest.getMyInfo().then((res) => {
        console.log(res)
        this.userInfo = res.data.data

        const type = path.split("/")
        this.type = type[type.length - 1]

        if (this.type === "auditing") {
          this.$axios.myRequest.getMyPostList(null, 0, 20).then((res) => {
            console.log(res)
            this.blogList = res.data.data
          })
        } else if (this.type === "pass") {
          this.$axios.myRequest.getMyPostList(1, 0, 20).then((res) => {
            console.log(res)
            this.blogList = res.data.data
          })
        } else if (this.type === "noPass") {
          this.$axios.myRequest.getMyPostList(0, 0, 20).then((res) => {
            console.log(res)
            this.blogList = res.data.data
          })
        } else if (this.type === "up") {
          this.$axios.myRequest.getMyUpList(0, 20).then((res) => {
            console.log(res)
            this.blogList = res.data.data
          })
        }
        else if (this.type === "down") {
          this.$axios.myRequest.getMyDownList(0, 20).then((res) => {
            console.log(res)
            this.blogList = res.data.data
          })
        } else {
          this.$axios.myRequest.getMyStarList(0, 20).then((res) => {
            console.log(res)
            this.blogList = res.data.data
          })
        }
      })
    }
  },
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      if (vm.$store.state.userInfo.isLogin) {
        vm.$store.dispatch("refresh").then((res) => {
          vm.$store.commit("refresh", res)


          vm.getMyInfo(to.path)
        })
      }
    })
  }
}
</script>

<style lang="less" scoped>
.user-info {
  position: relative;
  background-color: white;
  width: 100%;
  height: 100px;
  border-radius: 5px;
  display: flex;
  align-items: center;
  padding: 10px 30px;

  img {
    border-radius: 50%;
  }

  .nickname {
    margin-left: 20px;
  }
}

nav+.articles {
  border-radius: 0 0 5px 5px;
}

nav {
  width: 100%;
  height: 40px;
  display: flex;
  align-items: center;
  background-color: white;
  padding: 0 20px;
  border-bottom: 1px solid @gray-color;
  border-radius: 5px 5px 0 0;
  margin-top: 2px;

  a {
    padding: 2px 15px;
    border-radius: 5px;
    border-bottom-color: transparent;
    position: relative;
    transition: @transition-time;
    display: flex;
    justify-content: center;
  }

  a:after {
    content: "";
    position: absolute;
    bottom: -3px;
    width: 0;
    height: 2px;
    border-radius: 50px;
    background-color: @theme-color;
    transition: @transition-time;
  }

  a:hover,
  a.active {
    color: @theme-color;
  }

  a:hover:after,
  a.active:after {
    width: 30%;
  }
}
</style>