<template>
  <div class="my-block">
    <LoginRegister :isShowPopup="isShowPopup" :togglePopup="togglePopup" />

    <div :class="{face:true,show:!userInfo.isLogin}" @click="userInfo.isLogin? null:togglePopup()">
      <img :src="userInfo.info.avatar" alt="" width="50" height="50" />
      <span>
        <input :class="{edit: isEditNickname === true}" ref="editInput" :disabled="!isEditNickname" @blur="editNickname"
          v-model="userInfo.info.nickname" />
        <i @click="editNickname"></i>
      </span>
    </div>
    <nav class="my">
      <router-link to="/myBlog">
        <span>1000</span>
        <span>发布</span>
      </router-link>
      <router-link to="/myUp">
        <span>1000</span>
        <span>顶</span>
      </router-link>
      <router-link to="/myDown">
        <span>1000</span>
        <span>踩</span>
      </router-link>
      <router-link to="/myStar">
        <span>1000</span>
        <span>收藏</span>
      </router-link>
    </nav>
    <button @click="editBlog" class="edit-blog">写博客</button>
    <button v-if="userInfo.isLogin" @click="$store.commit('logout')" class="logout">退出登录</button>
  </div>
</template>

<script>
import LoginRegister from './LoginRegister.vue';
import { mapState } from "vuex";

export default {
  name: "MyBlock",
  components: { LoginRegister },
  data() {
    return {
      isShowPopup: false,
      isEditNickname: false,
    }
  },
  computed: { ...mapState(["userInfo"]) },
  methods: {
    editNickname() {
      this.isEditNickname = !this.isEditNickname;

      if (this.isEditNickname) {
        this.$refs.editInput.focus();
      }
    },
    editBlog() {
      if (this.userInfo.isLogin) {
        this.$router.push("/edit");
      } else {
        this.isShowPopup = true;
      }
    },
    togglePopup() {
      this.isShowPopup = !this.isShowPopup;
    }
  }
}
</script>

<style lang="less" scoped>
.my-block {
  width: 210px;
  padding: 20px;
  border-radius: 5px;
  background-color: white;

  .edit-blog,
  .logout {
    display: block;
    width: 100%;
    text-align: center;
    margin-top: 20px;
    font-size: 15px;
    background-color: white;
    color: @theme-color;
    border: 1px solid @theme-color;
    border-radius: 5px;
    padding: 5px 10px;
    cursor: pointer;
    transition: @transition-time;
  }

  .edit-blog:hover {
    background-color: @theme-color;
    color: white;
  }

  .logout {
    color: red;
    border-color: red;
  }

  .logout:hover {
    color: white;
    background-color: red;
  }
}

.face {
  display: flex;
  align-items: center;

  img {
    border-radius: 50%;
    position: relative;
  }

  span {
    margin-left: 20px;
    display: flex;
    align-items: center;
    cursor: pointer;

    input {
      border: none;
      outline: none;
      background-color: transparent;
      padding: 3px 0;
      width: 70px;
      border-bottom: 1px solid transparent;
      margin-right: 10px;
      transition: @transition-time;
    }

    input.edit {
      border-bottom-color: @gray-color-dep;
    }

    i {
      width: 15px;
      height: 15px;
      background-image: url(../../assets/img/logo.png);
      background-size: cover;
    }
  }
}

.face.show input{
  cursor: pointer;
}

.face.show:hover input {
  color: @theme-color;
}

.my {
  width: 170px;
  display: flex;
  justify-content: space-between;
  margin-top: 20px;

  a {
    display: inline-flex;
    flex-direction: column;
    transition: @transition-time;

    span {
      text-align: center;
    }

    span:nth-child(2) {
      color: @gray-color-dep;
      font-size: 13px;
    }
  }

  a:hover span {
    color: @theme-color;
  }
}
</style>