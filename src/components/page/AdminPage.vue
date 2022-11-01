<template>
  <main class="admin-page">
    <el-aside width="200px">
      <el-menu :router="true" default-active="2" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose"
               background-color="#545c64" text-color="#fff" active-text-color="#ffd04b">
        <el-menu-item index="1">
          <template slot="title">
            <i class="el-icon-more-outline"></i>
            <span slot="title">公告管理</span>
          </template>
        </el-menu-item>
        <el-submenu index="2">
          <template slot="title">
            <i class="el-icon-user"></i>
            <span>用户管理</span>
          </template>
          <el-menu-item index="/admin/userList">用户列表</el-menu-item>
          <el-menu-item index="2-2">小黑屋</el-menu-item>
        </el-submenu>
        <el-submenu index="3">
          <template slot="title">
            <i class="el-icon-document"></i>
            <span>博客管理</span>
          </template>
          <el-menu-item index="/admin/blogList">审核博客</el-menu-item>
        </el-submenu>
        <el-submenu index="4">
          <template slot="title">
            <i class="el-icon-chat-dot-round"></i>
            <span>评论管理</span>
          </template>
          <el-menu-item index="4-1">评论</el-menu-item>
        </el-submenu>
      </el-menu>
    </el-aside>
    <el-container class="content">
      <router-view :isAdmin="true"></router-view>
    </el-container>
  </main>
</template>

<script>
export default {
  name: "AdminPage",
  data() {
    return {
      blogList: []
    }
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    getAuditingBlogList() {
      this.$router.push("/admin/blog/auditing")
      this.$axios.myRequest.getPostBlogList(null, 0, 100).then((res) => {
        console.log(res)
        this.$store.state.blogList = res.data.data
      })
    },
  }
}
</script>

<style lang="less" scoped>
.admin-page {
  margin-top: 70px;
  display: flex;
  height: calc(100vh - 80px);
}

.el-aside {
  background-color: #D3DCE6;
  color: #333;
  text-align: center;
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