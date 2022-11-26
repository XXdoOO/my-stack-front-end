<template>
  <main class="admin-page">
    <el-aside width="200px">
      <router-link class="logo" to="/">
        <img src="../../assets/img/logo.png" alt="" width="30" />
        <span>小破栈-后台管理</span>
      </router-link>
      <el-menu :router="true" :default-active="$route.path" class="el-menu-vertical-demo" background-color="#545c64"
        text-color="#fff" active-text-color="#ffd04b" @select="selectMenu">
        <el-menu-item v-for="item, index in menuList" :key="index" :index="item.path">
          <template slot="title">
            <i :class="item.icon"></i>
            <span>{{ item.name }}</span>
          </template>
        </el-menu-item>
      </el-menu>
    </el-aside>
    <el-container class="content">
      <el-header>
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item v-for="item in breadcrumbList" :key="item.path" :to="{ path: item.path }">{{ item.name }}
          </el-breadcrumb-item>
        </el-breadcrumb>

        <div class="userInfo">
          <el-avatar :src="userInfo.avatar"></el-avatar>
          <div class="nickname">{{ userInfo.nickname }}</div>
          <el-link type="primary" icon="el-icon-refresh" href="/" :underline="false">切换前台</el-link>
          <el-link type="danger" icon="el-icon-switch-button" :underline="false" @click="logout">退出登录
          </el-link>
        </div>
      </el-header>
      <router-view></router-view>
    </el-container>
  </main>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: "AdminPage",
  data() {
    return {
      menuList: [
        { path: "/admin/index", name: "数据监控", icon: "el-icon-s-platform" },
        { path: "/admin/blogList", name: "博客管理", icon: "el-icon-s-operation" },
        { path: "/admin/userList", name: "用户管理", icon: "el-icon-s-custom" },
      ],
      blogList: [],
      breadcrumbList: []
    }
  },
  computed: {
    ...mapState(["userInfo"])
  },
  methods: {
    selectMenu(index) {
      console.log(index)
      this.breadcrumbList = []

      this.menuList.map((item) => {
        if (item.path === index) {
          this.breadcrumbList.push(item)
        }
      })
    },
    logout() {
      this.$store.dispatch('logout', this)
    }
  },
  created() {
    this.selectMenu(this.$route.path)
  },
}
</script>

<style lang="less" scoped>
.logo {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 60px;

  span {
    margin-left: 10px;
    font-weight: bold;
  }
}

.admin-page {
  margin-top: 0 !important;
  display: flex;
}

.el-aside {
  background-color: #D3DCE6;
  position: sticky;
  top: 0;
  left: 0;
}

.el-header {
  background-color: #D3DCE6;
  display: flex;
  align-items: center;
  justify-content: space-between;

  .userInfo {
    display: flex;
    align-items: center;

    .nickname {
      margin-left: 10px;
    }

    a {
      margin-left: 20px;
      font-size: medium;
    }
  }
}

.el-main {
  background-color: #E9EEF3;
  color: #333;
  text-align: center;
}

.content {
  overflow: auto;
}
</style>