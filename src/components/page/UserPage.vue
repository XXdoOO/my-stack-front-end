<template>
  <main class="container">
    <div class="user-info">
      <img :src="userInfo.avatar" alt="个人头像" width="50" height="50">
      <span class="nickname">{{ userInfo.nickname }}</span>
      <time class="register-time">入栈天数：{{ new Date(parseInt(userInfo.registerTime)).getDay() }}天</time>
    </div>
    <nav>
      <router-link :to="`/user/${userInfo.username}/postBlogList`" :class="{ active: type === 'postBlogList' }">发布
        ({{ userInfo.passCount }})
      </router-link>
      <router-link :to="`/user/${userInfo.username}/upBlogList`" :class="{ active: type === 'upBlogList' }">顶过
        ({{ userInfo.upCount }})</router-link>
      <router-link :to="`/user/${userInfo.username}/downBlogList`" :class="{ active: type === 'downBlogList' }">踩过
        ({{ userInfo.downCount }})
      </router-link>
    </nav>
    <ListBlock />
  </main>
</template>

<script>
import ListBlock from "../block/ListBlock.vue"
export default {
  name: "UserPage",
  components: { ListBlock },
  data() {
    return {
      userInfo: {},
      blogList: [],
      type: null
    }
  },
  methods: {
    getUserInfo(path, username) {
      this.$axios.myRequest.getUserInfo(username).then((res) => {
        console.log(res)
        this.userInfo = res.data

        const type = path.split("/")
        this.type = type[type.length - 1]

        if (this.type === "postBlogList") {
          this.$axios.myRequest.getUserPostBlogList(username, 0, 10).then((res) => {
            this.$store.state.blogList = res.data.list
            this.$store.state.total = res.data.total
          })
        } else if (this.type === "upBlogList") {
          this.$axios.myRequest.getUserUpBlogList(username, 0, 10).then((res) => {
            this.$store.state.blogList = res.data.list
            this.$store.state.total = res.data.total
          })
        } else {
          this.$axios.myRequest.getUserDownBlogList(username, 0, 10).then((res) => {
            this.$store.state.blogList = res.data.list
            this.$store.state.total = res.data.total
          })
        }
      })
    }
  },
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      vm.getUserInfo(to.path, to.params.username)
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

  .register-time {
    margin-left: 50px;
    color: @theme-color;
    font-size: 14px;
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
  border-radius: 5px;
  margin-top: 2px;
  border-radius: 5px 5px 0 0;

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