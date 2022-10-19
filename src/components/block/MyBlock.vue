<template>
  <div class="my-block">
    <router-link :to="`/user/${userInfo.username}/postBlogList`" class="face">
      <img :src="userInfo.avatar" alt="" width="50" height="50">
      <span>
        {{userInfo.nickname}}
      </span>
    </router-link>
    <nav class="my-count">
      <router-link :to="`/user/${userInfo.username}/postBlogList`">
        <span>{{userInfo.passCount}}</span>
        <span>发布</span>
      </router-link>
      <router-link :to="`/user/${userInfo.username}/upBlogList`">
        <span>{{userInfo.upCount}}</span>
        <span>顶过</span>
      </router-link>
      <router-link :to="`/user/${userInfo.username}/downBlogList`">
        <span>{{userInfo.downCount}}</span>
        <span>踩过</span>
      </router-link>
    </nav>
  </div>
</template>

<script>
export default {
  name: "MyBlock",
  props: {
    userInfo: {
      type: Object,
      default() {
        return {
          nickname: "用户昵称",
          avatar: "/",
          postCount: 100,
          upCount: 100,
          downCount: 100,
          starCount: 100,
        }
      },
      require: true
    }
  },
}
</script>

<style lang="less" scoped>
.my-block {
  width: 210px;
  padding: 20px 30px;
  border-radius: 5px;
  background-color: white;

  .edit-blog,
  .go-admin,
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

  .edit-blog {
    background-color: @theme-color;
    color: white;
  }

  .go-admin {
    background-color: white;
    border-color: #67C23A;
    color: #67C23A;
  }

  .go-admin:hover {
    background-color: #67C23A;
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

.face.show input {
  cursor: pointer;
}

.face.show:hover input {
  color: @theme-color;
}

.my-count {
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