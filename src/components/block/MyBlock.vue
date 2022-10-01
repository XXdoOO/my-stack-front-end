<template>
  <div class="root">
    <div class="face">
      <img src="../../assets/img/cover.webp" alt="" width="50" height="50" />
      <span>
        <input :class="{edit: isEditNickname === true}" ref="editInput" :disabled="!isEditNickname" @blur="editNickname"
          value="昵称" />
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
    <router-link to="/edit" class="edit-blog">写博客</router-link>
  </div>
</template>

<script>
export default {
  name: "MyBlock",
  data() {
    return {
      isEditNickname: false
    }
  },
  methods: {
    editNickname() {
      this.isEditNickname = !this.isEditNickname;

      if(this.isEditNickname){
        this.$refs.editInput.focus();
      }
    }
  }
}
</script>

<style lang="less" scoped>
.root {
  width: 210px;
  padding: 20px;
  border-radius: 5px;
  border: 1px solid @gray-color;
  background-color: white;
  position: fixed;
  top: 100px;
  left: 40px;

  .edit-blog {
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
}

.face {
  display: flex;
  align-items: center;

  img {
    border-radius: 50%;
    position: relative;
  }

  img:after {
    content: "";
    display: block;
    position: absolute;
    width: 100%;
    height: 100%;
    background-image: url(../../assets/img/logo.png);
    background-size: cover;
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