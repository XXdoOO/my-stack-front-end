<template>
  <main class="container">
    <div class="user-info">
      <img :src="userInfo.avatar" alt="个人头像" width="50" height="50">
      <span class="nickname">{{userInfo.nickname}}</span>
    </div>
    <nav>
      <router-link :to="`/user/${userInfo.username}/postBlogList`" :class="{active:type === 'postBlogList'}">发布
        ({{userInfo.postCount}})
      </router-link>
      <router-link :to="`/user/${userInfo.username}/upBlogList`" :class="{active:type === 'upBlogList'}">顶过
        ({{userInfo.upCount}})</router-link>
      <router-link :to="`/user/${userInfo.username}/downBlogList`" :class="{active:type === 'downBlogList'}">踩过
        ({{userInfo.downCount}})
      </router-link>
    </nav>
    <ListBlock :blog-list="blogList" />
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
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      vm.$store.dispatch("refresh").then((res) => {
        vm.$store.commit("refresh", res)

        vm.$axios.myRequest.getUserInfo(to.params.username).then((res) => {
          console.log(res)
          vm.userInfo = res.data.data

          const type = to.path.split("/")
          vm.type = type[type.length - 1]

          if (vm.type === "postBlogList") {
            vm.$axios.myRequest.getUserPostBlogList(to.params.username).then((res) => {
              console.log(res)
              vm.blogList = res.data.data
            })
          } else if (vm.type === "upBlogList") {
            vm.$axios.myRequest.getUserUpBlogList(to.params.username).then((res) => {
              console.log(res)
              vm.blogList = res.data.data
            })
          } else {
            vm.$axios.myRequest.getUserDownBlogList(to.params.username).then((res) => {
              console.log(res)
              vm.blogList = res.data.data
            })
          }
        })
      })
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

nav {
  width: 100%;
  height: 40px;
  display: flex;
  align-items: center;
  background-color: white;
  margin: 5px 0;
  padding: 0 20px;
  border-radius: 5px;

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