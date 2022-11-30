<template>
  <main class="container">
    <div class="user-info">
      <div class="avatar">
        <img :src="userInfo.avatar" width="50" height="50" />
        <input style="display:none" type="file" accept=".jpg,.png" ref="avatar" @change="uploadAvatar" />
        <i class="update" @click="isShowPopup = true"></i>
      </div>
      <input class="nickname" type="text" v-model="userInfo.nickname"
        @input="isChange = true; nickname = userInfo.nickname">
      <button class="edit-btn" v-if="isChange" @click="save">保存</button>

      <time class="register-time">入栈天数：{{ new Date(parseInt(userInfo.registerTime)).getDay() }}天</time>
      <button class="delete-btn" @click="deleteAccount">注销</button>
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

    <div v-show="isShowPopup" class="mask" @click="isShowPopup = false">
      <div class="dialog" @click.stop>
        <div class="title">
          <div>从这里选择你的头像或点击 &nbsp;</div>
          <div class="upload" @click="$refs.avatar.click()">
            <div>上传图片</div>
            <i></i>
          </div>
        </div>
        <div class="avatar">
          <img v-for="item of 49" :key="item" :class="{ active: selected == item }" @click="selected = item"
            :src="`/avatar/${item}.jpg`" width="50" height="50" alt="">
          <button class="confirm">确认</button>
        </div>
      </div>
    </div>
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
      type: null,
      isChange: false,
      nickname: undefined,
      selected: null,
      isShowPopup: false
    }
  },
  computed: {
    ...mapState(["userInfo"]),
  },
  created() {
    this.getMyInfo()
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
    save() {
      console.log(this.$refs.avatar.files[0])
      console.log(this.nickname)

      const data = new FormData()

      if (this.$refs.avatar.files[0] != null) {
        data.append("avatar", this.$refs.avatar.files[0])
      } else if (this.nickname != null) {
        data.append("nickname", this.nickname)
      }

      this.$axios.myRequest.updateMyInfo(data).then((res) => {
        console.log(res)
        if (res && res.code === 600) {
          this.$store.state.userInfo = res.data

          this.$xMessage.show({
            title: '保存成功！',
            message: res.msg,
            type: 'success',
            duration: 3000
          })
        }
      })
    },
    uploadAvatar(e) {
      this.userInfo.avatar = URL.createObjectURL(e.target.files[0])
      this.isChange = true
    }
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

  .avatar {
    position: relative;

    img {
      border-radius: 50%;
      border: 1px solid @border-color;
    }

    i.update {
      position: absolute;
      top: 0;
      left: 0;
      width: 50px;
      height: 50px;
      cursor: pointer;
      transition: @transition-time;
      opacity: 0;
      background-color: @gray-color;
      border-radius: 50%;
      background-image: url('@/assets/img/logo.png');
      background-repeat: no-repeat;
      background-position: 50%;
      background-size: 50%;
    }

    img:hover+i,
    i:hover {
      opacity: 1;
      background-color: #ecedeeb8;
    }
  }

  .nickname {
    margin-left: 20px;
    border: none;
    border-bottom: 1px solid @border-color;
    padding: 5px;
    outline: none;
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

.mask {
  position: fixed;
  z-index: 999;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  // background-color: red;

  .dialog {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    border-radius: 10px;
    box-shadow: @shadow-color;
    padding: 10px;
    background-color: white;

    .title {
      margin: 10px 0 10px 15px;
      display: flex;
      align-items: center;
      line-height: 25px;

      .upload {
        display: flex;
        align-items: center;
        color: @theme-color;
        cursor: pointer;

        i {
          display: block;
          width: 25px;
          height: 25px;
          background-image: url('@/assets/img/upload.png');
          background-repeat: no-repeat;
          background-size: cover;
        }
      }
    }

    .avatar {
      width: 550px;
      display: flex;
      flex-wrap: wrap;
      align-items: center;

      img {
        border-radius: 50%;
        margin: 5px;
        border: 2px solid transparent;
        transition: @transition-time;
      }

      img.active {
        border-color: @theme-color;
      }

      .confirm {
        border-radius: 5px;
        padding: 5px 30px;
        border: 1px solid @theme-color;
        color: white;
        background-color: @theme-color;
        margin-left: auto;
        margin-right: 15px;
      }
    }

  }
}
</style>