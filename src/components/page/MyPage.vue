<template>
  <main class="container">
    <div class="user-info">
      <div>
        <img :src="userInfo.avatar" alt="个人头像" width="50" height="50" />
      </div>
      <span class="nickname">{{ userInfo.nickname }}</span>
      <time class="register-time">入栈天数：{{ new Date(parseInt(userInfo.registerTime)).getDay() }}天</time>
      <button class="edit-btn" @click="edit">编辑</button>
      <button class="delete-btn" @click="deleteAccount">注销账号</button>
      <button class="logout" @click="logout">退出登录</button>
    </div>
    <nav>
      <router-link to="/my/pass" :class="{ active: type === 'pass' }">已发布
        ({{ userInfo.passCount }})
      </router-link>
      <router-link to="/my/auditing" :class="{ active: type === 'auditing' }">审核中
        ({{ userInfo.auditingCount }})
      </router-link>
      <router-link to="/my/noPass" :class="{ active: type === 'noPass' }">未通过
        ({{ userInfo.noPassCount }})
      </router-link>
      <router-link to="/my/up" :class="{ active: type === 'up' }">顶过
        ({{ userInfo.upCount }})</router-link>
      <router-link to="/my/down" :class="{ active: type === 'down' }">踩过
        ({{ userInfo.downCount }})
      </router-link>
      <router-link to="/my/star" :class="{ active: type === 'star' }">收藏
        ({{ userInfo.starCount }})
      </router-link>
    </nav>
    <ListBlock :next-page="getMyInfo" :is-my="true" />
  </main>
</template>

<script>
import ListBlock from "../block/ListBlock.vue"
import { mapState } from "vuex"
export default {
  name: "MyPage",
  components: { ListBlock },
  data() {
    return {
      blogList: [],
      type: null
    }
  },
  computed: {
    ...mapState(["userInfo"]),
  },
  watch: {
    $route: {
      immediate: true,
      handler() {
        this.getMyInfo()
      }
    }
  },
  methods: {
    getMyInfo() {
      const type = this.$route.path.split("/")
      this.type = type[type.length - 1]

      console.log(this.type)

      this.$store.dispatch("setMyInfo")

      if (this.type === "auditing") {
        this.$axios.myRequest.getMyPostList(null, this.$store.state.currentPage * 10, 10).then((res) => {
          this.$store.state.blogList = res.data.list
          this.$store.state.total = res.data.total
        })
      } else if (this.type === "pass") {
        this.$axios.myRequest.getMyPostList(1, this.$store.state.currentPage * 10, 10).then((res) => {
          this.$store.state.blogList = res.data.list
          this.$store.state.total = res.data.total
        })
      } else if (this.type === "noPass") {
        this.$axios.myRequest.getMyPostList(0, this.$store.state.currentPage * 10, 10).then((res) => {
          this.$store.state.blogList = res.data.list
          this.$store.state.total = res.data.total
        })
      } else if (this.type === "up") {
        this.$axios.myRequest.getMyUpList(this.$store.state.currentPage * 10, 10).then((res) => {
          this.$store.state.blogList = res.data.list
          this.$store.state.total = res.data.total
        })
      }
      else if (this.type === "down") {
        this.$axios.myRequest.getMyDownList(this.$store.state.currentPage * 10, 10).then((res) => {
          this.$store.state.blogList = res.data.list
          this.$store.state.total = res.data.total
        })
      } else {
        this.$axios.myRequest.getMyStarList(this.$store.state.currentPage * 10, 10).then((res) => {
          this.$store.state.blogList = res.data.list
          this.$store.state.total = res.data.total
        })
      }
    },
    logout() {
      this.$xConfirm.show({
        msg: "此操作将会退出该账号，确定继续吗？",
        success: () => {
          this.$axios.myRequest.logout().then((res) => {
            console.log(res)

            sessionStorage.removeItem("userInfo");
            this.$router.push("/")
            window.location.reload();
          })
        }
      })
    },
    deleteAccount() {
      this.$xConfirm.show({
        msg: "此操作将会删除该账号，确定继续吗？",
        success: () => {

        }
      })
    },
    edit() { },
  },
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

  button {
    border-radius: 5px;
    display: block;
    border: 1px solid @theme-color;
    color: white;
    background-color: @theme-color;
    padding: 5px 20px;
    cursor: pointer;
    transition: @transition-time;
  }

  .edit-btn {
    margin-left: 50px;
    background-color: white;
    color: @theme-color;
  }

  .edit-btn:hover {
    background-color: @theme-color;
    color: white;
  }

  .logout {
    color: @danger-color;
    border-color: @danger-color;
    background-color: white;
    margin-left: auto;
  }

  .logout:hover {
    color: white;
    background-color: @danger-color;
  }

  .delete-btn {
    border: none;
    color: @warning-color;
    border-color: @warning-color;
    background-color: white;
    margin-left: 50px;
    transition: @transition-time;
  }

  .delete-btn:hover {
    color: @danger-color;
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